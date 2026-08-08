import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";

import {
  flushPendingDiagnosticLeads,
  getDiagnosticLeadRetryDelay,
  getPendingDiagnosticLeads,
  queueDiagnosticLead,
  startDiagnosticLeadOutbox,
} from "../src/lib/diagnostic/leadOutbox.ts";

class MemoryStorage {
  values = new Map();

  getItem(key) {
    return this.values.get(key) ?? null;
  }

  setItem(key, value) {
    this.values.set(key, value);
  }

  removeItem(key) {
    this.values.delete(key);
  }
}

const originalWindow = globalThis.window;
let dispatchOnline;
let setOnline;
let stopRunner;

beforeEach(() => {
  const navigator = { onLine: true };
  let onlineListener;
  const fakeWindow = {
    localStorage: new MemoryStorage(),
    navigator,
    fetch: async () => new Response(null, { status: 204 }),
    addEventListener: (type, listener) => {
      if (type === "online" && typeof listener === "function") onlineListener = listener;
    },
    removeEventListener: (type, listener) => {
      if (type === "online" && onlineListener === listener) onlineListener = undefined;
    },
  };
  Object.defineProperty(globalThis, "window", { configurable: true, value: fakeWindow });
  dispatchOnline = () => onlineListener?.();
  setOnline = (online) => {
    navigator.onLine = online;
  };
});

afterEach(() => {
  stopRunner?.();
  stopRunner = undefined;
  Object.defineProperty(globalThis, "window", { configurable: true, value: originalWindow });
});

test("keeps one durable item when the same idempotency key is queued twice", () => {
  const key = "diagnostic:test-key";

  assert.equal(queueDiagnosticLead({ email: "first@example.com" }, key), true);
  assert.equal(queueDiagnosticLead({ email: "second@example.com" }, key), true);

  const queued = getPendingDiagnosticLeads();
  assert.equal(queued.length, 1);
  assert.equal(queued[0]?.idempotencyKey, key);
  assert.deepEqual(queued[0]?.payload, { email: "first@example.com" });
});

test("reuses the stable key and only acknowledges a 2xx response", async () => {
  const requests = [];
  let status = 503;
  window.fetch = async (_input, init) => {
    requests.push(init ?? {});
    return new Response(null, { status });
  };

  const key = "diagnostic:stable-key";
  queueDiagnosticLead({ email: "operator@example.com" }, key);

  await flushPendingDiagnosticLeads(true);
  assert.equal(getPendingDiagnosticLeads().length, 1);
  assert.equal(getPendingDiagnosticLeads()[0]?.attempts, 1);

  status = 202;
  await flushPendingDiagnosticLeads(true);
  assert.equal(getPendingDiagnosticLeads().length, 0);
  assert.equal(requests.length, 2);
  assert.equal(requests[0]?.headers["Idempotency-Key"], key);
  assert.equal(requests[1]?.headers["Idempotency-Key"], key);
});

test("backs off exponentially up to a bounded delay", () => {
  assert.equal(getDiagnosticLeadRetryDelay(1), 2_000);
  assert.equal(getDiagnosticLeadRetryDelay(2), 4_000);
  assert.equal(getDiagnosticLeadRetryDelay(20), 60_000);
});

test("resumes a pending submission when the browser comes back online", async () => {
  let requests = 0;
  window.fetch = async () => {
    requests += 1;
    return new Response(null, { status: 204 });
  };

  setOnline(false);
  queueDiagnosticLead({ email: "offline@example.com" }, "diagnostic:offline-key");
  stopRunner = startDiagnosticLeadOutbox();
  await new Promise((resolve) => setTimeout(resolve, 5));
  assert.equal(requests, 0);

  setOnline(true);
  dispatchOnline();
  await new Promise((resolve) => setTimeout(resolve, 5));

  assert.equal(requests, 1);
  assert.equal(getPendingDiagnosticLeads().length, 0);
});
