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

test("delivery measurement only acknowledges an accepted request, once after a retry", async () => {
  let status = 503;
  let delivered = 0;
  window.fetch = async () => new Response(null, { status });
  setOnline(false);
  queueDiagnosticLead({ email: 'qa@example.com' }, 'diagnostic:delivery-qa');
  stopRunner = startDiagnosticLeadOutbox(() => { delivered += 1; });
  setOnline(true);
  await flushPendingDiagnosticLeads(true);
  assert.equal(delivered, 0);
  assert.equal(getPendingDiagnosticLeads().length, 1);
  status = 201;
  await flushPendingDiagnosticLeads(true);
  await flushPendingDiagnosticLeads(true);
  assert.equal(delivered, 1);
  assert.equal(getPendingDiagnosticLeads().length, 0);
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

// Phase C: the delivery response reaches the page that queued the lead, and
// the short-lived booking token stays in memory only.
test("passes the lead key and booking token to the listener and never stores the token", async () => {
  const token = "guided-diagnostic-token-abc123";
  const writes = [];
  const storage = window.localStorage;
  const setItem = storage.setItem.bind(storage);
  storage.setItem = (key, value) => {
    writes.push(String(value));
    setItem(key, value);
  };
  window.fetch = async () => new Response(JSON.stringify({ success: true, bookingToken: token }), { status: 200 });
  const deliveries = [];
  setOnline(false);
  queueDiagnosticLead({ email: "ops@harbor-group.test", source: "guided-diagnostic" }, "diagnostic:token-key");
  stopRunner = startDiagnosticLeadOutbox((delivery) => deliveries.push(delivery));
  setOnline(true);
  await flushPendingDiagnosticLeads(true);

  assert.deepEqual(deliveries, [{ leadKey: "diagnostic:token-key", bookingToken: token }]);
  assert.equal(getPendingDiagnosticLeads().length, 0);
  assert.ok(writes.length > 0, "the queue was persisted");
  for (const value of writes) assert.equal(value.includes(token), false);
  for (const key of storage.values.keys()) assert.equal(String(storage.values.get(key)).includes(token), false);
});

test("a delivery without a token, or with a malformed one, reaches the listener without one", async () => {
  const deliveries = [];
  stopRunner = startDiagnosticLeadOutbox((delivery) => deliveries.push(delivery));
  const replies = [
    new Response(JSON.stringify({ success: true }), { status: 201 }),
    new Response(JSON.stringify({ success: true, bookingToken: 42 }), { status: 201 }),
    new Response(JSON.stringify({ success: true, bookingToken: "x".repeat(2049) }), { status: 201 }),
    new Response("not json", { status: 201 }),
  ];
  for (const [index, reply] of replies.entries()) {
    window.fetch = async () => reply;
    queueDiagnosticLead({ email: "ops@example.test" }, `diagnostic:no-token-${index}`);
    await flushPendingDiagnosticLeads(true);
  }
  assert.deepEqual(deliveries.map((delivery) => Object.keys(delivery)), [["leadKey"], ["leadKey"], ["leadKey"], ["leadKey"]]);
});

test("failed attempts are reported to the failure listener and retried with the same key", async () => {
  const failures = [];
  const deliveries = [];
  let status = 503;
  window.fetch = async () => new Response(JSON.stringify(status < 300 ? { bookingToken: "later-token" } : { error: "unavailable" }), { status });
  setOnline(false);
  queueDiagnosticLead({ email: "flaky@harborgroup.test" }, "diagnostic:flaky-key");
  stopRunner = startDiagnosticLeadOutbox((delivery) => deliveries.push(delivery), (leadKey) => failures.push(leadKey));
  setOnline(true);
  await flushPendingDiagnosticLeads(true);
  assert.deepEqual(failures, ["diagnostic:flaky-key"]);
  assert.equal(deliveries.length, 0);
  status = 201;
  await flushPendingDiagnosticLeads(true);
  assert.deepEqual(deliveries, [{ leadKey: "diagnostic:flaky-key", bookingToken: "later-token" }]);
});

test("a stopped listener hears nothing more", async () => {
  const deliveries = [];
  window.fetch = async () => new Response(JSON.stringify({ bookingToken: "t" }), { status: 201 });
  const stop = startDiagnosticLeadOutbox((delivery) => deliveries.push(delivery));
  stop();
  stopRunner = startDiagnosticLeadOutbox();
  queueDiagnosticLead({ email: "ops@example.test" }, "diagnostic:stopped-key");
  await flushPendingDiagnosticLeads(true);
  assert.equal(deliveries.length, 0);
});
