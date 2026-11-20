import assert from 'node:assert/strict';
import { test } from 'node:test';
import './helpers/ts-hooks.mjs';
const { buildPricingSimUrl } = await import('../src/lib/diagnostic/pricingLink.ts');
const { recommend } = await import('../src/lib/diagnostic/rules.ts');
const { decodePricingIntent } = await import('../src/lib/pricingIntent.ts');
const { appAuthUrl, SIGNIN_URL, SIGNUP_URL } = await import('../src/lib/urls.ts');

test('website sign-in and sign-up preserve the reviewed pricing intent and locale', () => {
  const answers = { locations: '10', money_leaks: ['guest_retention'], paper_processes: ['payroll_prep'], payroll_countries: ['AE'] };
  const pricing = new URL(buildPricingSimUrl(recommend(answers), answers));
  const returnUrl = `/onboarding?lang=ru&cfg=${pricing.searchParams.get('cfg')}`;
  for (const authUrl of [SIGNIN_URL, SIGNUP_URL]) {
    const link = new URL(appAuthUrl(authUrl, returnUrl));
    assert.equal(link.searchParams.get('returnUrl'), returnUrl);
    const received = new URL(link.searchParams.get('returnUrl'), link.origin);
    assert.equal(received.searchParams.get('lang'), 'ru');
    assert.deepEqual(decodePricingIntent(received.searchParams.get('cfg')), decodePricingIntent(pricing.searchParams.get('cfg')));
    assert.deepEqual([...link.searchParams.keys()], ['returnUrl']);
  }
});

test('website auth handoff rejects external, ambiguous and malformed destinations', () => {
  for (const invalid of [undefined, null, [], ['/onboarding'], 'https://evil.test', '//evil.test', '/\\evil.test', '/%2f%2fevil.test', '/%5cevil.test', '/%0aevil.test', '/bad%path', '/'+ 'a'.repeat(6000)]) {
    assert.equal(appAuthUrl(SIGNIN_URL, invalid), SIGNIN_URL);
  }
  assert.equal(new URL(appAuthUrl(SIGNIN_URL, '/core?tab=overview')).searchParams.get('returnUrl'), '/core?tab=overview');
});

test('diagnostic pricing preserves the actual package and Crew selection without contact details', () => {
  const answers = { locations: '10', money_leaks: ['guest_retention', 'competitors'], paper_processes: ['payroll_prep', 'checklists'], payroll_countries: ['AE'], email: 'private@example.test', name: 'Private Buyer', company: 'Private Group' };
  const url = new URL(buildPricingSimUrl(recommend(answers), answers));
  const intent = decodePricingIntent(url.searchParams.get('cfg'));
  assert.equal(intent.layer,'both');
  assert.equal(intent.corePackage,'core_growth');
  assert.equal(intent.locations,10);
  // Watchtower is scoped separately and stays out of the priced selection.
  assert.deepEqual(intent.watchtowerModules,[]);
  assert.deepEqual(new Set(intent.crewSkus),new Set(['crew_operations','crew_scheduling','crew_tna','crew_payroll']));
  assert.equal(intent.payrollCountry,'AE');
  assert.equal(url.toString().includes('private'),false);
  assert.equal(JSON.stringify(intent).includes('Private'),false);
  assert.deepEqual([...url.searchParams.keys()],['cfg']);
});
test('Core-only recommendations carry no Crew or payroll data', () => {
  const answers = { locations: '1', money_leaks: ['food_cost'], paper_processes: ['none'], payroll_countries: ['AE'] };
  const intent = decodePricingIntent(new URL(buildPricingSimUrl(recommend(answers), answers)).searchParams.get('cfg'));
  assert.equal(intent.layer,'core');
  assert.equal(intent.corePackage,'core_margin');
  assert.deepEqual(intent.crewSkus,[]);
  assert.equal(intent.payrollCountry,'');
});
