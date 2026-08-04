/**
 * Sundae backend public-booking client.
 *
 * Server-only typed forwarders for the customer self-service booking flow.
 * The marketing site CSP blocks the browser from reaching the backend, so every
 * call goes through a Next route handler which delegates here. This module talks
 * to the Sundae AdonisJS backend public booking endpoints under
 * `/api/v1/public/marketing/bookings/*`.
 *
 * These endpoints are token-authenticated — the token IS the credential, so
 * there is NO HMAC and NO cookie. Two token kinds flow through here:
 *   - LEAD token       → context / slots / create (carried by the /book link)
 *   - MANAGEMENT token  → reschedule / cancel (returned as booking.manageToken)
 *
 * Env contract:
 *   SUNDAE_BACKEND_URL   e.g. https://api.sundaetech.ai
 */

export interface BookingSummary {
  id: string;
  status: string;
  startAt: string | null;
  endAt: string | null;
  timezone: string;
  joinUrl: string | null;
}

export interface BookingContext {
  name: string;
  company: string | null;
  email: string;
  durationMinutes: number | null;
  teamTimezone: string | null;
  locale: string | null;
  offering: string;
  activeBooking: BookingSummary | null;
}

export interface Slot {
  startUtc: string;
  endUtc: string;
  startLocal: string;
  label: string;
  dayKey: string;
}

export interface BookingDay {
  date: string;
  weekdayLabel: string;
  slots: Slot[];
}

export interface BookingConfirmation {
  booking: BookingSummary;
  joinUrl: string;
  manageToken: string | null;
  ics: string;
}

const DEFAULT_BACKEND_URL = 'https://api.sundaetech.ai';
const REQUEST_TIMEOUT_MS = 15_000;

export function getBackendUrl(): string {
  return (process.env.SUNDAE_BACKEND_URL || DEFAULT_BACKEND_URL).replace(/\/$/, '');
}

interface BackendResult<T> {
  ok: boolean;
  status: number;
  body: T;
  error?: string;
}

/**
 * Low-level backend call. Always `cache: 'no-store'`, always aborts after
 * REQUEST_TIMEOUT_MS. Never throws — transport failures resolve to
 * `{ ok: false, status: 0, error }`, mirroring sundaeLeadClient.
 */
async function callBackend<T = Record<string, unknown>>(
  path: string,
  init?: RequestInit
): Promise<BackendResult<T>> {
  const url = `${getBackendUrl()}${path}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const resp = await fetch(url, {
      ...init,
      cache: 'no-store',
      signal: controller.signal,
    });

    let body = {} as T;
    try {
      body = (await resp.json()) as T;
    } catch {
      // empty / non-JSON body - leave defaults
    }

    if (!resp.ok) {
      const error = (body as { error?: string })?.error ?? `backend_status_${resp.status}`;
      return { ok: false, status: resp.status, body, error };
    }
    return { ok: true, status: resp.status, body };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      body: {} as T,
      error: err instanceof Error ? err.message : 'unknown_error',
    };
  } finally {
    clearTimeout(timer);
  }
}

function tokenQuery(token: string): string {
  return `token=${encodeURIComponent(token)}`;
}

export async function fetchBookingContext(
  token: string
): Promise<{ ok: boolean; status: number; context?: BookingContext; error?: string }> {
  const result = await callBackend<BookingContext>(
    `/api/v1/public/marketing/bookings/context?${tokenQuery(token)}`
  );

  if (!result.ok) {
    return { ok: false, status: result.status, error: result.error };
  }
  return { ok: true, status: result.status, context: result.body };
}

interface SlotsBackendResponse {
  slots: Slot[];
  days: BookingDay[];
  visitorTimezone: string;
  teamTimezone: string;
  durationMinutes: number;
  firstAvailableUtc: string | null;
  graphDegraded: boolean;
}

export async function fetchSlots(
  token: string,
  tz: string,
  from: string,
  to: string
): Promise<{
  ok: boolean;
  status: number;
  slots?: Slot[];
  days?: BookingDay[];
  teamTimezone?: string;
  visitorTimezone?: string;
  durationMinutes?: number;
  firstAvailableUtc?: string | null;
  graphDegraded?: boolean;
  error?: string;
}> {
  const query = new URLSearchParams({ token, tz, from, to }).toString();
  const result = await callBackend<SlotsBackendResponse>(
    `/api/v1/public/marketing/bookings/slots?${query}`
  );

  if (!result.ok) {
    return { ok: false, status: result.status, error: result.error };
  }

  const body = result.body;
  return {
    ok: true,
    status: result.status,
    slots: body.slots,
    days: body.days,
    teamTimezone: body.teamTimezone,
    visitorTimezone: body.visitorTimezone,
    durationMinutes: body.durationMinutes,
    firstAvailableUtc: body.firstAvailableUtc,
    graphDegraded: body.graphDegraded,
  };
}

export async function createBooking(
  token: string,
  slotStart: string,
  opts?: { idempotencyKey?: string; ip?: string; ua?: string }
): Promise<{
  ok: boolean;
  status: number;
  booking?: BookingSummary;
  joinUrl?: string;
  manageToken?: string | null;
  ics?: string;
  error?: string;
}> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (opts?.ip) headers['X-Forwarded-For'] = opts.ip;
  if (opts?.ua) headers['User-Agent'] = opts.ua;

  const result = await callBackend<BookingConfirmation>(
    `/api/v1/public/marketing/bookings?${tokenQuery(token)}`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({
        slotStart,
        ...(opts?.idempotencyKey ? { idempotencyKey: opts.idempotencyKey } : {}),
      }),
    }
  );

  if (!result.ok) {
    return { ok: false, status: result.status, error: result.error };
  }

  const body = result.body;
  return {
    ok: true,
    status: result.status,
    booking: body.booking,
    joinUrl: body.joinUrl,
    manageToken: body.manageToken,
    ics: body.ics,
  };
}

export async function rescheduleBooking(
  manageToken: string,
  id: string,
  slotStart: string
): Promise<{
  ok: boolean;
  status: number;
  booking?: BookingSummary;
  joinUrl?: string;
  ics?: string;
  error?: string;
}> {
  const result = await callBackend<{ booking: BookingSummary; joinUrl: string; ics: string }>(
    `/api/v1/public/marketing/bookings/${encodeURIComponent(id)}/reschedule?${tokenQuery(manageToken)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slotStart }),
    }
  );

  if (!result.ok) {
    return { ok: false, status: result.status, error: result.error };
  }

  const body = result.body;
  return {
    ok: true,
    status: result.status,
    booking: body.booking,
    joinUrl: body.joinUrl,
    ics: body.ics,
  };
}

export async function cancelBooking(
  manageToken: string,
  id: string,
  reason?: string
): Promise<{ ok: boolean; status: number; booking?: BookingSummary; error?: string }> {
  const result = await callBackend<{ booking: BookingSummary }>(
    `/api/v1/public/marketing/bookings/${encodeURIComponent(id)}/cancel?${tokenQuery(manageToken)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reason ? { reason } : {}),
    }
  );

  if (!result.ok) {
    return { ok: false, status: result.status, error: result.error };
  }
  return { ok: true, status: result.status, booking: result.body.booking };
}
