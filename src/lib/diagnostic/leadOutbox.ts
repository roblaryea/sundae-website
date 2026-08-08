const STORAGE_KEY = "sundae-diagnostic-lead-outbox-v1";
const BASE_RETRY_DELAY_MS = 2_000;
const MAX_RETRY_DELAY_MS = 60_000;
const REQUEST_TIMEOUT_MS = 15_000;

export interface PendingDiagnosticLead {
  idempotencyKey: string;
  payload: Record<string, unknown>;
  attempts: number;
  nextAttemptAt: number;
  createdAt: number;
}

let volatileQueue: PendingDiagnosticLead[] = [];
let activeRunners = 0;
let retryTimer: ReturnType<typeof setTimeout> | null = null;
let flushPromise: Promise<void> | null = null;
let forceRetryRequested = false;

function isPendingDiagnosticLead(value: unknown): value is PendingDiagnosticLead {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<PendingDiagnosticLead>;
  return (
    typeof candidate.idempotencyKey === "string" &&
    /^[A-Za-z0-9._:-]{8,160}$/.test(candidate.idempotencyKey) &&
    !!candidate.payload &&
    typeof candidate.payload === "object" &&
    !Array.isArray(candidate.payload) &&
    typeof candidate.attempts === "number" &&
    Number.isInteger(candidate.attempts) &&
    candidate.attempts >= 0 &&
    typeof candidate.nextAttemptAt === "number" &&
    typeof candidate.createdAt === "number"
  );
}

function readPersistedQueue(): PendingDiagnosticLead[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isPendingDiagnosticLead) : [];
  } catch {
    return [];
  }
}

function readQueue(): PendingDiagnosticLead[] {
  const byKey = new Map<string, PendingDiagnosticLead>();
  for (const item of [...readPersistedQueue(), ...volatileQueue]) {
    byKey.set(item.idempotencyKey, item);
  }
  return [...byKey.values()].sort((a, b) => a.createdAt - b.createdAt);
}

function persistQueue(queue: PendingDiagnosticLead[]): boolean {
  if (typeof window === "undefined") return false;

  try {
    if (queue.length === 0) {
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
    }
    volatileQueue = [];
    return true;
  } catch {
    // Keep retrying for the lifetime of this page. The caller deliberately
    // retains the diagnostic draft when durable browser storage is unavailable.
    volatileQueue = queue;
    return false;
  }
}

export function getDiagnosticLeadRetryDelay(attempts: number): number {
  const exponent = Math.max(0, Math.min(attempts - 1, 30));
  return Math.min(BASE_RETRY_DELAY_MS * 2 ** exponent, MAX_RETRY_DELAY_MS);
}

export function getPendingDiagnosticLeads(): PendingDiagnosticLead[] {
  return readQueue();
}

/**
 * Adds a completed diagnostic to the browser-local outbox before its draft is
 * cleared. Reusing a key is safe and does not create a second queued lead.
 */
export function queueDiagnosticLead(
  payload: Record<string, unknown>,
  idempotencyKey: string,
): boolean {
  const queue = readQueue();
  if (!queue.some((item) => item.idempotencyKey === idempotencyKey)) {
    const now = Date.now();
    queue.push({ idempotencyKey, payload, attempts: 0, nextAttemptAt: now, createdAt: now });
  }

  const persisted = persistQueue(queue);
  requestFlush(true);
  return persisted;
}

function clearRetryTimer(): void {
  if (retryTimer !== null) {
    clearTimeout(retryTimer);
    retryTimer = null;
  }
}

function scheduleNextFlush(force = false): void {
  clearRetryTimer();
  if (activeRunners === 0 || typeof window === "undefined") return;

  const queue = readQueue();
  if (queue.length === 0 || window.navigator.onLine === false) return;

  const waitMs = force
    ? 0
    : Math.max(0, Math.min(...queue.map((item) => item.nextAttemptAt)) - Date.now());
  retryTimer = setTimeout(() => {
    retryTimer = null;
    void flushPendingDiagnosticLeads(force);
  }, waitMs);
}

function requestFlush(force = false): void {
  if (activeRunners === 0) return;
  if (flushPromise) {
    forceRetryRequested ||= force;
    return;
  }
  scheduleNextFlush(force);
}

function updateAfterFailure(idempotencyKey: string): void {
  const queue = readQueue();
  const next = queue.map((item) => {
    if (item.idempotencyKey !== idempotencyKey) return item;
    const attempts = item.attempts + 1;
    return {
      ...item,
      attempts,
      nextAttemptAt: Date.now() + getDiagnosticLeadRetryDelay(attempts),
    };
  });
  persistQueue(next);
}

function acknowledge(idempotencyKey: string): void {
  persistQueue(readQueue().filter((item) => item.idempotencyKey !== idempotencyKey));
}

export async function flushPendingDiagnosticLeads(force = false): Promise<void> {
  if (typeof window === "undefined" || window.navigator.onLine === false) return;
  if (flushPromise) {
    forceRetryRequested ||= force;
    return flushPromise;
  }

  const now = Date.now();
  const item = readQueue().find((candidate) => force || candidate.nextAttemptAt <= now);
  if (!item) {
    scheduleNextFlush();
    return;
  }

  flushPromise = (async () => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const response = await window.fetch("/api/cta/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": item.idempotencyKey,
        },
        body: JSON.stringify(item.payload),
        signal: controller.signal,
      });

      if (response.ok) {
        acknowledge(item.idempotencyKey);
      } else {
        updateAfterFailure(item.idempotencyKey);
      }
    } catch {
      updateAfterFailure(item.idempotencyKey);
    } finally {
      clearTimeout(timeout);
    }
  })();

  try {
    await flushPromise;
  } finally {
    flushPromise = null;
    const retryImmediately = forceRetryRequested;
    forceRetryRequested = false;
    scheduleNextFlush(retryImmediately);
  }
}

function handleOnline(): void {
  requestFlush(true);
}

/** Starts the outbox runner and returns a React-effect-friendly cleanup. */
export function startDiagnosticLeadOutbox(): () => void {
  if (typeof window === "undefined") return () => {};

  activeRunners += 1;
  if (activeRunners === 1) {
    window.addEventListener("online", handleOnline);
  }
  requestFlush(true);

  return () => {
    activeRunners = Math.max(0, activeRunners - 1);
    if (activeRunners === 0) {
      window.removeEventListener("online", handleOnline);
      clearRetryTimer();
    }
  };
}
