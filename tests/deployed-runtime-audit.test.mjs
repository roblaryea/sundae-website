import assert from 'node:assert/strict';
import test from 'node:test';
import { classifyAdvisories, requestAdvisories } from '../scripts/audit-deployed-runtime.mjs';

test('runtime SDK advisories remain blocking regardless of dependency classification', () => {
  const packages = { '@sentry/nextjs': ['10.76.2'] };
  const result = classifyAdvisories({ '@sentry/nextjs': [
    { severity: 'high', vulnerable_versions: '<=10.76.2', url: 'https://example.test/high' },
    { severity: 'critical', vulnerable_versions: '<=10.76.2', url: 'https://example.test/critical' },
  ] }, packages);
  assert.equal(result.blocking.length, 2);
  assert.equal(result.blocking[0].name, '@sentry/nextjs');
});

test('moderate findings remain reported under the existing high/critical release policy', () => {
  const result = classifyAdvisories({ next: [
    { severity: 'moderate', vulnerable_versions: '*', url: 'https://example.test/moderate' },
  ] }, { next: ['16.4.6'] });
  assert.equal(result.findings.length, 1);
  assert.equal(result.blocking.length, 0);
});

test('invalid or unbound registry responses cannot produce a successful audit', () => {
  for (const input of [null, [], { next: {} }, { unexpected: [] },
    { next: [{ severity: 'unknown', vulnerable_versions: '*' }] },
    { next: [{ severity: 'high' }] }]) {
    assert.throws(() => classifyAdvisories(input, { next: ['16.4.6'] }), /Invalid/);
  }
});

test('an empty inventory is refused before contacting the advisory service', async () => {
  await assert.rejects(requestAdvisories({}), /inventory is empty/);
});
