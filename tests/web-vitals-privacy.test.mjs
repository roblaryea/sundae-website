import assert from 'node:assert/strict';
import { test } from 'node:test';
import { isPublicWebVitalsUrl, sanitizeWebVitalsProperties } from '../src/lib/webVitalsPrivacy.ts';

test('web vitals only allow public production marketing routes', () => {
  assert.equal(isPublicWebVitalsUrl('https://www.sundae.io/', 'website'), true);
  assert.equal(isPublicWebVitalsUrl('https://www.sundae.io/getting-started', 'website'), true);
  assert.equal(isPublicWebVitalsUrl('https://www.sundae.io/ar/blog/restaurant-operations', 'website'), true);
  assert.equal(isPublicWebVitalsUrl('https://www.sundae.io/nl/crew?utm_source=internal_qa', 'website'), true);
  for (const path of ['/sign-in', '/get-started', '/book/demo', '/diagnostic/report', '/preview/light', '/tiktok-review', '/api/health', '/p/alice', '/alice', '/ru/crew', '/unknown-route', '/ar/p/alice']) {
    assert.equal(isPublicWebVitalsUrl(`https://www.sundae.io${path}`, 'website'), false, path);
  }
  assert.equal(isPublicWebVitalsUrl('https://pricing.sundae.io/', 'pricing'), true);
  assert.equal(isPublicWebVitalsUrl('https://pricing.sundae.io/simulator', 'pricing'), true);
  assert.equal(isPublicWebVitalsUrl('http://pricing.sundae.io/', 'pricing'), false);
  assert.equal(isPublicWebVitalsUrl('https://pricing.sundae.io/faq', 'pricing'), false);
});

test('sanitization keeps metric scalars while removing query strings, entries and DOM data', () => {
  const result = sanitizeWebVitalsProperties({
    '$current_url': 'https://www.sundae.io/demo?email=private@example.com&utm_source=internal_qa#form',
    '$referrer': 'https://search.example/?q=private',
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
  assert.equal(sanitizeWebVitalsProperties({ '$current_url': 'https://www.sundae.io/', '$referrer': '$direct' }, 'website').$referrer, '$direct');
  assert.deepEqual(result, {
    '$current_url': 'https://www.sundae.io/demo',
    utm_source: 'internal_qa',
    '$referrer': 'https://search.example/',
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

test('actual website before_send preserves SDK transport/identity and blocks withdrawal/private visits', async () => {
  const { registerHooks } = await import('node:module');
  const savedEnv = { key: process.env.NEXT_PUBLIC_POSTHOG_KEY, mode: process.env.NODE_ENV };
  process.env.NEXT_PUBLIC_POSTHOG_KEY = 'qa-public-project-key'; process.env.NODE_ENV = 'production';
  let consent = null; let optedOut = false; let config;
  globalThis.__vitalsSdkMock = {
    init(_key, value) { config = value; },
    has_opted_out_capturing() { return optedOut; },
    stopSessionRecording() {},
  };
  globalThis.window = { location: new URL('https://www.sundae.io/'), localStorage: { getItem() { return consent; } } };
  globalThis.document = { cookie: '' };
  const hooks = registerHooks({ resolve(specifier, context, nextResolve) {
    if (specifier === 'posthog-js') return { url: 'data:text/javascript,export default globalThis.__vitalsSdkMock', shortCircuit: true };
    try { return nextResolve(specifier, context); } catch (error) {
      if (error.code !== 'ERR_MODULE_NOT_FOUND' || !specifier.startsWith('.') || /\.[a-z]+$/i.test(specifier)) throw error;
      return nextResolve(`${specifier}.ts`, context);
    }
  } });
  try {
    const { initPostHog } = await import('../src/lib/posthog.ts');
    initPostHog(); assert.equal(config, undefined, 'no initialization before consent');
    consent = 'accepted'; initPostHog();
    assert.deepEqual(config.capture_performance, { network_timing: false, web_vitals: true, web_vitals_attribution: false, web_vitals_allowed_metrics: ['LCP', 'CLS', 'FCP', 'INP'] });
    const event = { uuid: 'qa-uuid', event: '$web_vitals', properties: {
      token: 'qa-public-project-key', distinct_id: 'qa-anonymous', '$device_id': 'qa-device', '$process_person_profile': false, '$is_identified': false,
      '$current_url': 'https://www.sundae.io/?utm_source=internal_qa&email=private',
      '$web_vitals_LCP_value': 1500,
      '$web_vitals_LCP_event': { name: 'LCP', value: 1500, '$current_url': 'https://www.sundae.io/?utm_source=internal_qa', entries: [{ element: 'private' }] },
    } };
    const sent = config.before_send(event);
    assert.equal(sent.properties.token, event.properties.token);
    assert.equal(sent.properties.$process_person_profile, false);
    assert.equal(sent.properties.$is_identified, false);
    assert.equal(sent.properties.$device_id, 'qa-device');
    assert.equal(sent.properties.utm_source, 'internal_qa');
    assert.equal(sent.properties.$current_url, 'https://www.sundae.io/');
    assert.equal('entries' in sent.properties.$web_vitals_LCP_event, false);
    consent = 'declined'; assert.equal(config.before_send(event), null);
    consent = 'accepted'; optedOut = true; assert.equal(config.before_send(event), null); optedOut = false;
    window.location = new URL('https://www.sundae.io/preview/light'); assert.equal(config.before_send(event), null);
    window.location = new URL('https://www.sundae.io/book/manage'); assert.equal(config.before_send(event), null);
    window.location = new URL('https://www.sundae.io/'); assert.equal(config.before_send(event), null, 'private visit remains suppressed');
  } finally {
    hooks.deregister(); delete globalThis.__vitalsSdkMock; delete globalThis.window; delete globalThis.document;
    if (savedEnv.key === undefined) delete process.env.NEXT_PUBLIC_POSTHOG_KEY; else process.env.NEXT_PUBLIC_POSTHOG_KEY = savedEnv.key;
    if (savedEnv.mode === undefined) delete process.env.NODE_ENV; else process.env.NODE_ENV = savedEnv.mode;
  }
});
