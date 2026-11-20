// Expired report links (spec 7, website half): the page tells a valid-but-
// expired link (410) apart from anything else, and keeps today's not-found
// view when the backend predates expiry and answers 404.
import './helpers/ts-hooks.mjs';
import assert from 'node:assert/strict';
import { test } from 'node:test';

const { classifyReportResponse, isPlausibleReportToken } = await import('../src/lib/diagnostic/reportLink.ts');

const response = (status, body) => ({ status, ok: status >= 200 && status < 300, json: async () => body });
const isReport = (data) => Boolean(data?.report?.topLeaks);

test('200 with a report opens it', async () => {
  const lookup = await classifyReportResponse(response(200, { report: { topLeaks: [] } }), isReport);
  assert.equal(lookup.status, 'ok');
});

test('410 report_link_expired offers a new link', async () => {
  assert.deepEqual(await classifyReportResponse(response(410, { error: 'report_link_expired' }), isReport), { status: 'expired' });
});

test('anything else is not found, including 404 from a backend without expiry', async () => {
  for (const [status, body] of [[404, { error: 'not_found' }], [410, { error: 'other' }], [500, null], [200, { report: null }], [200, 'not json']]) {
    assert.deepEqual(await classifyReportResponse(response(status, body), isReport), { status: 'not_found' }, `${status}`);
  }
});

test('only token-shaped values are forwarded', () => {
  assert.equal(isPlausibleReportToken('YWJjZGVmZ2hpams.1767225600.c2lnbmF0dXJl'), true);
  for (const invalid of ['', 'short', 'has spaces in it', 'a'.repeat(3000), null, 42, '../../etc/passwd']) {
    assert.equal(isPlausibleReportToken(invalid), false, String(invalid));
  }
});
