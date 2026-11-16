import assert from 'node:assert/strict';
import { test, afterEach } from 'node:test';
import { registerHooks } from 'node:module';
registerHooks({ resolve(specifier, context, nextResolve) {
  try { return nextResolve(specifier, context); } catch (error) {
    if (error.code !== 'ERR_MODULE_NOT_FOUND' || !specifier.startsWith('.') || /\.[a-z]+$/i.test(specifier)) throw error;
    return nextResolve(`${specifier}.ts`, context);
  }
} });
const { getCampaignParams, appendCampaign } = await import('../src/lib/campaign.ts');
function browser(consent = 'accepted') {
  const data = new Map();
  const storage = { getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value), removeItem: key => data.delete(key) };
  globalThis.window = { location: new URL('https://www.sundae.io/restaurant-logbook?utm_source=linkedin&utm_medium=social&utm_campaign=handover'), sessionStorage: storage, localStorage: { getItem: () => consent } };
  globalThis.document = { cookie: '', referrer: '' };
  return data;
}
afterEach(() => { delete globalThis.window; delete globalThis.document; });

test('tagged landing → ordinary untagged pages → form retains one campaign', () => {
  browser();
  assert.equal(getCampaignParams().utm_source, 'linkedin');
  window.location = new URL('https://www.sundae.io/fr/crew');
  window.location = new URL('https://www.sundae.io/fr/demo');
  assert.deepEqual(getCampaignParams(), { utm_source: 'linkedin', utm_medium: 'social', utm_campaign: 'handover' });
  assert.equal(appendCampaign('/fr/diagnostic#start'), '/fr/diagnostic?utm_source=linkedin&utm_medium=social&utm_campaign=handover#start');
});
test('a new campaign replaces the old one without mixing fields or overriding tagged links', () => {
  browser(); getCampaignParams();
  window.location = new URL('https://www.sundae.io/?utm_source=partner');
  assert.deepEqual(getCampaignParams(), { utm_source: 'partner' });
  assert.equal(appendCampaign('/demo?utm_source=explicit'), '/demo?utm_source=explicit');
});
test('declined or pending consent neither reads nor writes campaign storage and clears prior tags', () => {
  const data = browser(); getCampaignParams();
  window.localStorage.getItem = () => 'declined';
  assert.deepEqual(getCampaignParams(), {}); assert.equal(data.size, 0);
  window.localStorage.getItem = () => null;
  assert.equal(appendCampaign('/demo'), '/demo'); assert.equal(data.size, 0);
});
test('blocked storage falls back to mirrored consent and the current URL without throwing', () => {
  browser();
  window.localStorage.getItem = () => { throw new Error('blocked'); };
  document.cookie = 'sundae_cookie_consent=accepted';
  window.sessionStorage = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); }, removeItem() { throw new Error('blocked'); } };
  assert.equal(getCampaignParams().utm_source, 'linkedin');
  window.location = new URL('https://www.sundae.io/demo');
  assert.deepEqual(getCampaignParams(), {});
});
test('private booking credentials and contact query parameters never enter campaign storage or outgoing links', () => {
  const data = browser();
  window.location = new URL('https://www.sundae.io/?utm_source=linkedin&email=private%40example.test&utm_content=private%40example.test&token=secret');
  assert.deepEqual(getCampaignParams(), {}); assert.equal(data.size, 0);
  window.location = new URL('https://www.sundae.io/?utm_source=linkedin&email=private%40example.test&utm_content=private%40example.test');
  assert.deepEqual(getCampaignParams(), { utm_source: 'linkedin' });
  for (const url of ['https://external.test/demo', '//external.test/demo', '/ar/book/host?token=private', '/personal-book/host', '/demo?verificationId=private', 'mailto:sales@example.test', '#section']) assert.equal(appendCampaign(url), url);
  window.location = new URL('https://www.sundae.io/ar/book/host?utm_source=linkedin');
  assert.deepEqual(getCampaignParams(), {}); assert.equal(data.size, 0);
  window.location = new URL('https://www.sundae.io/demo?utm_source=linkedin');
  document.referrer = 'https://www.sundae.io/book/manage?token=private';
  assert.deepEqual(getCampaignParams(), {});
});
test('server rendering has no storage or URL side effects', () => {
  assert.deepEqual(getCampaignParams(), {}); assert.equal(appendCampaign('/demo'), '/demo');
});
