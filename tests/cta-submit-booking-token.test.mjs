// /api/cta/submit returns the backend's booking token only to the two guided
// sources, with no-store / no-referrer headers; every other caller's response
// is unchanged. The backend is mocked; nothing leaves the process.
import './helpers/ts-hooks.mjs';
import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import test from 'node:test';

// Next's CommonJS entry points ('next/server') have no ESM export map.
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === 'next/server') return nextResolve('next/server.js', context);
    return nextResolve(specifier, context);
  },
});

process.env.SUNDAE_BACKEND_URL = 'http://backend.test';
process.env.MARKETING_LEAD_HMAC_SECRET = 'route-test-secret';
const { POST } = await import('../src/app/api/cta/submit/route.ts');
const { NextRequest } = await import('next/server');

const originalFetch = globalThis.fetch;
const originalLog = console.log;
let ip = 0;

async function submit(source, backendBody = { ok: true, leadId: 'lead-1', leadNumber: 'SL-1', bookingToken: 'tkn-123' }) {
  const sent = [];
  globalThis.fetch = async (url, init) => {
    sent.push({ url: String(url), body: JSON.parse(init.body) });
    return new Response(JSON.stringify(backendBody), { status: 201, headers: { 'content-type': 'application/json' } });
  };
  console.log = () => {};
  try {
    const request = new NextRequest('http://localhost/api/cta/submit', {
      method: 'POST',
      // A fresh address per call keeps clear of the per-IP rate limit.
      headers: { 'content-type': 'application/json', 'x-forwarded-for': `203.0.113.${++ip}`, 'idempotency-key': `route-test-${ip}-key` },
      body: JSON.stringify({
        name: 'Sara Haddad', email: 'sara@harbor-group.test', company: 'Harbor Group', role: 'Operations', country: 'United Arab Emirates',
        countryCode: 'AE', numberOfLocations: '12', primaryPOS: 'Foodics', message: 'Diagnostic submitted.', ctaLabel: 'Operations Diagnostic',
        sourcePage: '/diagnostic', locale: 'en', ...(source === undefined ? {} : { source }), metadata: { convo: { version: 1 } },
      }),
    });
    const response = await POST(request);
    return { response, json: await response.json(), sent };
  } finally {
    globalThis.fetch = originalFetch;
    console.log = originalLog;
  }
}

for (const source of ['guided-booking', 'guided-diagnostic']) {
  test(`${source}: the token reaches the browser with no-store and no-referrer`, async () => {
    const { response, json, sent } = await submit(source);
    assert.equal(response.status, 200);
    assert.equal(json.bookingToken, 'tkn-123');
    assert.equal(response.headers.get('cache-control'), 'no-store');
    assert.equal(response.headers.get('referrer-policy'), 'no-referrer');
    assert.equal(sent.length, 1);
    assert.deepEqual(sent[0].body.metadata.convo, { version: 1 }, 'metadata.convo reaches the backend');
  });
}

for (const source of [undefined, 'diagnostic-call-request', 'diagnostic', 'contact']) {
  test(`${source ?? 'classic diagnostic (no source)'}: no token, response unchanged`, async () => {
    const { response, json } = await submit(source);
    assert.equal(response.status, 200);
    assert.equal('bookingToken' in json, false);
    assert.equal(response.headers.get('referrer-policy'), null);
    assert.equal(json.success, true);
    assert.equal(json.leadId, 'lead-1');
  });
}

test('guided-diagnostic without a backend token: no token key at all', async () => {
  const { json, response } = await submit('guided-diagnostic', { ok: true, leadId: 'lead-2', leadNumber: 'SL-2' });
  assert.equal('bookingToken' in json, false);
  assert.equal(response.headers.get('cache-control'), null);
});
