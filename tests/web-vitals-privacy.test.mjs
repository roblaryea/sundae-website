import assert from 'node:assert/strict';
import { test } from 'node:test';
import { isPublicWebVitalsUrl, sanitizeWebVitalsProperties } from '../src/lib/webVitalsPrivacy.ts';

test('web vitals only allow public production marketing routes', () => {
  assert.equal(isPublicWebVitalsUrl('https://www.sundae.io/', 'website'), true);
  assert.equal(isPublicWebVitalsUrl('https://www.sundae.io/nl/crew?utm_source=internal_qa', 'website'), true);
  for (const path of ['/sign-in', '/get-started', '/book/demo', '/diagnostic/report', '/preview/light', '/tiktok-review', '/api/health']) {
    assert.equal(isPublicWebVitalsUrl(`https://www.sundae.io${path}`, 'website'), false, path);
  }
  assert.equal(isPublicWebVitalsUrl('https://pricing.sundae.io/', 'pricing'), true);
  assert.equal(isPublicWebVitalsUrl('https://pricing.sundae.io/simulator', 'pricing'), true);
  assert.equal(isPublicWebVitalsUrl('http://pricing.sundae.io/', 'pricing'), false);
  assert.equal(isPublicWebVitalsUrl('https://pricing.sundae.io/faq', 'pricing'), false);
});

test('sanitization keeps metric scalars while removing query strings, entries and DOM data', () => {
  const result = sanitizeWebVitalsProperties({
    '$current_url': 'https://www.sundae.io/demo?email=private@example.com#form',
    '$referrer': 'https://search.example/?q=private',
    utm_source: 'internal_qa',
    '$web_vitals_LCP_value': 1820,
    '$web_vitals_LCP_event': {
      name: 'LCP', value: 1820, delta: 120, timestamp: 12, rating: 'good',
      '$current_url': 'https://www.sundae.io/demo?email=private@example.com',
      entries: [{ startTime: 1, element: '<h1>private</h1>' }],
      attribution: { interactionTargetElement: '<input value="private">' },
      unexpected: 'drop me',
    },
    '$web_vitals_FCP_value': 0,
    '$web_vitals_FCP_event': { name: 'FCP', value: 0, '$current_url': 'https://www.sundae.io/demo' },
  }, 'website');
  assert.deepEqual(result, {
    '$current_url': 'https://www.sundae.io/demo',
    '$referrer': 'https://search.example/',
    utm_source: 'internal_qa',
    '$web_vitals_LCP_value': 1820,
    '$web_vitals_LCP_event': { name: 'LCP', value: 1820, delta: 120, timestamp: 12, rating: 'good', '$current_url': 'https://www.sundae.io/demo' },
    '$web_vitals_FCP_value': 0,
    '$web_vitals_FCP_event': { name: 'FCP', value: 0, '$current_url': 'https://www.sundae.io/demo' },
  });
});

test('a buffered metric from a private route is rejected', () => {
  assert.equal(sanitizeWebVitalsProperties({
    '$current_url': 'https://www.sundae.io/demo',
    '$web_vitals_LCP_value': 100,
    '$web_vitals_LCP_event': { name: 'LCP', value: 100, '$current_url': 'https://www.sundae.io/book/manage/token' },
  }, 'website'), null);
});
