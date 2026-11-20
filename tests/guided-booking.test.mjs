// Guided booking: state machine, inference, payload, experiment split and the
// lead client's bookingToken contract. Pure modules only - no Next runtime.
import assert from 'node:assert/strict';
import test from 'node:test';

import {
  answer,
  back,
  buildBrief,
  buildContext,
  composeMessage,
  contextSignature,
  edit,
  isPlausibleName,
  nextPosition,
  previousStep,
  restore,
  serialize,
  start,
  storageKey,
  toClassicValues,
  toPayload,
  transcriptSteps,
} from '../src/lib/leadConversation/machine.ts';
import {
  companyFromDomain,
  companyFromEmail,
  emailDomain,
  FREE_MAIL_DOMAINS,
  findCountryByIso,
  focusFromPricingIntent,
  isFreeMailEmail,
  locationBucketFor,
  posOptionsForCountry,
  pricingPackageLabel,
  WORKFLOW_FOCUS,
} from '../src/lib/leadConversation/inference.ts';
import { FOCUS_FACTS, FOCUS_KEYS, orderFocusForAgenda } from '../src/lib/leadConversation/packageNotes.ts';
import { progressIndex } from '../src/lib/leadConversation/script.ts';
import {
  decideVariant,
  LEAD_VARIANT_COOKIE,
  parseGuidedBookingMode,
  parseGuidedBookingSurfaces,
  parseVariantCookie,
  parseVariantOverride,
  variantCookieString,
} from '../src/lib/leadConversation/variant.ts';
import { isPhoneRequiredForLead, isValidOptionalPhone } from '../src/lib/leadValidation.ts';
import { composeFullPhone, isValidLeadEmail, LOCATION_BUCKETS, normalizePhoneForStorage } from '../src/lib/leadFields.ts';

const NOW = 1_763_640_000_000;

const pricingIntent = {
  v: 2,
  layer: 'both',
  corePackage: 'core_growth',
  locations: 10,
  addOns: [],
  watchtowerModules: [],
  crewSkus: ['crew_scheduling', 'crew_operations'],
  crossIntelligence: 'none',
  billingCycle: 'monthly',
  operatingModels: [],
  employees: 120,
  payrollCountry: 'AE',
};

function must(result) {
  assert.equal(result.ok, true, `expected answer to be accepted, got ${result.error}`);
  return result.state;
}

/** Answer the whole default demo conversation with a work email. */
function completeDefault(context = buildContext({ mode: 'demo', suggestedCountryIso: 'AE' })) {
  let s = start(context, NOW);
  s = must(answer(s, 'name', 'Sara Haddad'));
  s = must(answer(s, 'email', 'Sara@HarborGroup.com'));
  s = must(answer(s, 'company', { value: 'Harborgroup', inferred: true }));
  s = must(answer(s, 'role', { key: 'operations' }));
  s = must(answer(s, 'locations', '11-25'));
  s = must(answer(s, 'focus', { keys: ['margin_performance', 'tasks_logbook'] }));
  s = must(answer(s, 'pos', { choice: 'listed', value: 'Oracle MICROS Simphony' }));
  s = must(answer(s, 'country', { iso: 'AE', inferred: true }));
  s = must(answer(s, 'brief', 'confirmed'));
  return s;
}

// ── inference ─────────────────────────────────────────────────────────

test('free-mail list matches spec 6.4 exactly (and the backend helper)', () => {
  assert.deepEqual([...FREE_MAIL_DOMAINS], [
    'gmail.com', 'googlemail.com', 'hotmail.com', 'hotmail.co.uk', 'hotmail.fr', 'outlook.com', 'live.com', 'msn.com',
    'yahoo.com', 'yahoo.co.uk', 'ymail.com', 'icloud.com', 'me.com', 'mac.com', 'aol.com', 'proton.me', 'protonmail.com',
    'gmx.com', 'gmx.de', 'yandex.com', 'mail.ru', 'qq.com', '163.com',
  ]);
  assert.equal(isFreeMailEmail('Omar.K@GMAIL.com'), true);
  assert.equal(isFreeMailEmail('omar@hotmail.co.uk'), true);
  // Exact domain match only: a work domain that merely contains a provider name is not free mail.
  assert.equal(isFreeMailEmail('ops@gmail.com.harbor.ae'), false);
  assert.equal(isFreeMailEmail('ops@mail.gmail.com'), false);
  assert.equal(isFreeMailEmail('ops@harborgroup.com'), false);
});

test('company is suggested from the label before the public suffix', () => {
  assert.equal(emailDomain(' Sara@Harbor-Group.co.uk '), 'harbor-group.co.uk');
  assert.equal(companyFromDomain('harbor-group.co.uk'), 'Harbor Group');
  assert.equal(companyFromDomain('harborgroup.com'), 'Harborgroup');
  assert.equal(companyFromDomain('mail.harborgroup.com'), 'Harborgroup');
  assert.equal(companyFromDomain('al_bait.com.sa'), 'Al Bait');
  assert.equal(companyFromDomain('dubai.ae'), 'Dubai');
  assert.equal(companyFromDomain('gmail.com'), '');
  assert.equal(companyFromDomain('localhost'), '');
  assert.equal(companyFromEmail('omar@icloud.com'), '');
});

test('locations from a pricing estimate map to the stored buckets', () => {
  const expected = { 1: '1', 2: '2-5', 5: '2-5', 6: '6-10', 10: '6-10', 11: '11-25', 25: '11-25', 26: '26-50', 51: '51-100', 100: '51-100', 101: '101-200', 200: '101-200', 201: '200+', 5000: '200+' };
  for (const [count, bucket] of Object.entries(expected)) assert.equal(locationBucketFor(Number(count)), bucket);
  assert.equal(locationBucketFor(0), null);
  for (const bucket of LOCATION_BUCKETS) assert.ok(Object.values(expected).includes(bucket) || bucket === '200+');
});

test('context preselection: pricing layer and workflow page', () => {
  assert.deepEqual(focusFromPricingIntent({ layer: 'core' }), ['margin_performance']);
  assert.deepEqual(focusFromPricingIntent({ layer: 'crew' }), ['scheduling_attendance']);
  assert.deepEqual(focusFromPricingIntent({ layer: 'both' }), ['scheduling_attendance', 'margin_performance']);
  assert.equal(pricingPackageLabel(pricingIntent), 'Core Growth + Crew Manage');
  assert.equal(pricingPackageLabel({ ...pricingIntent, layer: 'core', crewSkus: [] }), 'Core Growth');
  assert.equal(WORKFLOW_FOCUS['restaurant-logbook'], 'tasks_logbook');
  assert.equal(WORKFLOW_FOCUS['restaurant-tip-management'], 'tips');
});

test('POS choices follow the visitor country and country lookup validates ISO codes', () => {
  assert.equal(posOptionsForCountry('AE')[0], 'Foodics');
  assert.equal(posOptionsForCountry('us')[0], 'Toast');
  assert.ok(posOptionsForCountry('IN').includes('Petpooja'));
  assert.ok(posOptionsForCountry(null).length >= 3);
  assert.equal(findCountryByIso('ae')?.name, 'United Arab Emirates');
  assert.equal(findCountryByIso('XX'), null);
  assert.equal(findCountryByIso('A1'), null);
});

// ── machine: contexts and branching ───────────────────────────────────

test('opening context: pricing beats workflow beats default; contact ignores pricing', () => {
  assert.equal(buildContext({ mode: 'demo' }).kind, 'default');
  const workflow = buildContext({ mode: 'demo', workflowKey: 'restaurant-logbook' });
  assert.equal(workflow.kind, 'workflow');
  assert.deepEqual(workflow.preselectedFocus, ['tasks_logbook']);
  assert.equal(buildContext({ mode: 'demo', workflowKey: 'not-a-page' }).kind, 'default');
  const pricing = buildContext({ mode: 'get-started', pricingIntent, workflowKey: 'restaurant-logbook' });
  assert.equal(pricing.kind, 'pricing');
  assert.equal(pricing.pricing.bucket, '6-10');
  assert.equal(buildContext({ mode: 'contact', pricingIntent }).kind, 'default');
  assert.equal(buildContext({ mode: 'demo', suggestedCountryIso: 'zz' }).suggestedCountryIso, undefined);
  assert.equal(buildContext({ mode: 'demo', suggestedCountryIso: 'de' }).suggestedCountryIso, 'DE');
});

test('golden path visits every step in order and validates each answer', () => {
  const context = buildContext({ mode: 'demo', suggestedCountryIso: 'AE' });
  let s = start(context, NOW);
  assert.equal(s.position, 'name');
  assert.deepEqual(answer(s, 'name', ' S '), { ok: false, error: 'nameShort' });
  assert.deepEqual(answer(s, 'email', 'x@y.com'), { ok: false, error: 'notCurrent' });
  s = must(answer(s, 'name', '  Sara   Haddad '));
  assert.equal(s.answers.name, 'Sara Haddad');
  assert.equal(s.position, 'email');
  assert.deepEqual(answer(s, 'email', 'sara@harbor'), { ok: false, error: 'emailInvalid' });
  s = must(answer(s, 'email', 'Sara@HarborGroup.com'));
  assert.equal(s.answers.email, 'sara@harborgroup.com');
  assert.equal(s.position, 'company', 'work email skips the personal-address prompt');
  assert.deepEqual(answer(s, 'company', { value: '  ', inferred: false }), { ok: false, error: 'companyRequired' });
  s = must(answer(s, 'company', { value: 'Harborgroup', inferred: true }));
  assert.deepEqual(answer(s, 'role', { key: 'other', other: '' }), { ok: false, error: 'roleRequired' });
  s = must(answer(s, 'role', { key: 'finance' }));
  assert.equal(s.answers.role.label, 'Finance');
  s = must(answer(s, 'locations', '26-50'));
  assert.equal(s.position, 'focus');
  assert.deepEqual(answer(s, 'focus', { keys: [] }), { ok: false, error: 'focusRequired' });
  s = must(answer(s, 'focus', { keys: ['forecasting', 'payroll', 'forecasting'], note: '  Two brands, one kitchen  ' }));
  assert.deepEqual(s.answers.focus, ['forecasting', 'payroll']);
  assert.equal(s.answers.note, 'Two brands, one kitchen');
  assert.deepEqual(answer(s, 'pos', { choice: 'other', value: ' ' }), { ok: false, error: 'posRequired' });
  s = must(answer(s, 'pos', { choice: 'not_sure' }));
  assert.equal(s.answers.pos.value, 'Not sure');
  assert.deepEqual(answer(s, 'country', { iso: 'QQ', inferred: false }), { ok: false, error: 'countryRequired' });
  s = must(answer(s, 'country', { iso: 'GB', inferred: false }));
  assert.equal(s.answers.country.dialCode, '+44');
  assert.equal(s.position, 'brief');
  s = must(answer(s, 'brief', 'confirmed'));
  assert.equal(s.position, 'phone');
  assert.deepEqual(answer(s, 'phone', { dialCode: '+44', number: '12' }), { ok: false, error: 'phoneInvalid' });
  s = must(answer(s, 'phone', { dialCode: '+44', number: '20 7946 0958' }));
  assert.equal(s.answers.phone.value, '+442079460958');
  assert.equal(s.position, 'ready');
});

test('the name step rejects email addresses and digit-only input with nameInvalid', () => {
  const context = buildContext({ mode: 'contact' });
  const s = start(context, NOW);
  for (const value of ['omar@harborgroup.com', 'omar\uFF20harborgroup.com', 'Omar @ Harbor', '0501234567', '+971 50 123 4567', '(050) 123-4567', '\uFF10\uFF15\uFF10']) {
    assert.deepEqual(answer(s, 'name', value), { ok: false, error: 'nameInvalid' }, value);
  }
  // Phone numbers typed in local numerals (ar, ur, hi, bn, th visitors).
  for (const value of ['٠٥٠١٢٣٤٥٦٧', '+٩٧١ ٥٠ ١٢٣ ٤٥٦٧', '۰۳۰۰۱۲۳۴۵۶۷', '९८७६५ ४३२१०', '০১৭১১-২২৩৩৪৪', '๐๘๑ ๒๓๔ ๕๖๗๘']) {
    assert.deepEqual(answer(s, 'name', value), { ok: false, error: 'nameInvalid' }, value);
  }
  for (const value of ['Sara Haddad', "Anne-Marie O'Neil", 'محمد', '李雷', 'Sara 2', 'राहुल 2', 'Omar ٢']) {
    assert.equal(answer(s, 'name', value).ok, true, value);
  }
  assert.deepEqual(answer(s, 'name', 'S'), { ok: false, error: 'nameShort' });
  assert.equal(isPlausibleName('omar@x'), false);
  // The same rule guards refresh-resume: a stored email-as-name is dropped.
  const raw = JSON.stringify({ v: 1, sig: contextSignature(context), startedAt: NOW, answerCount: 1, answers: { name: 'omar@harborgroup.com' } });
  assert.equal(restore(raw, context).answers.name, undefined);
  assert.equal(restore(raw, context).position, 'name');
});

test('free-mail email asks to confirm; "Add a work email" re-asks and drops the address', () => {
  let s = start(buildContext({ mode: 'demo' }), NOW);
  s = must(answer(s, 'name', 'Omar'));
  s = must(answer(s, 'email', 'omar.k@gmail.com'));
  assert.equal(s.position, 'email_confirm');
  s = must(answer(s, 'email_confirm', 'work'));
  assert.equal(s.position, 'email');
  assert.equal(s.answers.email, undefined);
  s = must(answer(s, 'email', 'omar@harborgroup.ae'));
  assert.equal(s.position, 'company');
  // Use it anyway: the personal address is kept and the company is asked directly.
  let p = start(buildContext({ mode: 'demo' }), NOW);
  p = must(answer(p, 'name', 'Omar'));
  p = must(answer(p, 'email', 'omar.k@gmail.com'));
  p = must(answer(p, 'email_confirm', 'use'));
  assert.equal(p.position, 'company');
  assert.deepEqual(transcriptSteps(p), ['name', 'email', 'email_confirm']);
});

test('pricing context skips locations and preselects focus', () => {
  const context = buildContext({ mode: 'demo', pricingIntent });
  let s = start(context, NOW);
  assert.deepEqual(s.answers.locations, { bucket: '6-10', inferred: true });
  s = must(answer(s, 'name', 'Lina'));
  s = must(answer(s, 'email', 'lina@harborgroup.com'));
  s = must(answer(s, 'company', { value: 'Harborgroup', inferred: true }));
  s = must(answer(s, 'role', { key: 'owner_ceo' }));
  assert.equal(s.position, 'focus', 'locations already known from the estimate');
  assert.deepEqual(context.preselectedFocus, ['scheduling_attendance', 'margin_performance']);
  assert.equal(transcriptSteps(s).includes('locations'), false);
});

test('contact mode: topic branches to focus, message or support', () => {
  const context = buildContext({ mode: 'contact' });
  let base = start(context, NOW);
  base = must(answer(base, 'name', 'Ana'));
  base = must(answer(base, 'email', 'ana@harborgroup.com'));
  base = must(answer(base, 'company', { value: 'Harborgroup', inferred: true }));
  base = must(answer(base, 'role', { key: 'tech_data' }));
  base = must(answer(base, 'locations', '2-5'));
  assert.equal(base.position, 'topic');
  const walk = must(answer(base, 'topic', 'walkthrough'));
  assert.equal(walk.position, 'focus');
  const pricing = must(answer(base, 'topic', 'pricing'));
  assert.equal(pricing.position, 'message');
  assert.deepEqual(answer(pricing, 'message', 'x'), { ok: false, error: 'messageRequired' });
  let m = must(answer(pricing, 'message', 'Do you price per location?'));
  assert.equal(m.position, 'pos');
  m = must(answer(m, 'pos', { choice: 'listed', value: 'Toast' }));
  m = must(answer(m, 'country', { iso: 'US', inferred: false }));
  assert.equal(m.position, 'brief');
  const brief = buildBrief(m);
  assert.equal(brief.kind, 'contact');
  assert.equal(brief.topic, 'A pricing question');
  assert.equal(brief.message, 'Do you price per location?');
  assert.match(composeMessage(m), /^Do you price per location\?\n\nTopic: A pricing question\. Source: guided booking \(contact\)\.$/);
  const support = must(answer(base, 'topic', 'support'));
  assert.equal(support.position, 'support');
  assert.equal(previousStep(support), 'topic');
  // Changing the topic back to a walkthrough drops the message.
  const switched = must(answer(edit(m, 'topic'), 'topic', 'walkthrough'));
  assert.equal(switched.answers.message, undefined);
  assert.equal(switched.position, 'focus');
});

test('progress uses the 8-segment line', () => {
  assert.equal(progressIndex('name'), 0);
  assert.equal(progressIndex('email_confirm'), 1);
  assert.equal(progressIndex('focus'), 5);
  assert.equal(progressIndex('country'), 7);
  assert.equal(progressIndex('ready'), 8);
});

// ── machine: back and edit ────────────────────────────────────────────

test('back rewinds one step and keeps the answer to prefill', () => {
  let s = start(buildContext({ mode: 'demo' }), NOW);
  assert.equal(back(s), s, 'nothing before the first question');
  s = must(answer(s, 'name', 'Sara'));
  s = must(answer(s, 'email', 'sara@harborgroup.com'));
  s = back(s);
  assert.equal(s.position, 'email');
  assert.equal(s.answers.email, 'sara@harborgroup.com');
  assert.deepEqual(transcriptSteps(s), ['name']);
  s = must(answer(s, 'email', 'sara@harborgroup.com'));
  assert.equal(s.position, 'company', 'resumes where the visitor was');
});

test('edit rewinds to a step, keeps later answers that are still valid, then returns to the brief', () => {
  let s = completeDefault();
  assert.equal(s.position, 'phone');
  s = edit(s, 'role');
  assert.equal(s.position, 'role');
  assert.equal(s.answers.brief, undefined, 'the brief is confirmed again after any edit');
  assert.deepEqual(transcriptSteps(s), ['name', 'email', 'company']);
  s = must(answer(s, 'role', { key: 'other', other: 'Head of F&B' }));
  assert.equal(s.position, 'brief', 'later answers were kept, so the visitor goes straight back to the brief');
  assert.equal(s.answers.locations.bucket, '11-25');
  // Editing the email to a different domain invalidates an inferred company.
  let e = edit(completeDefault(), 'email');
  e = must(answer(e, 'email', 'sara@otherco.com'));
  assert.equal(e.answers.company, undefined);
  assert.equal(e.position, 'company');
  // ...but keeps a company the visitor typed themselves.
  let t = start(buildContext({ mode: 'demo' }), NOW);
  t = must(answer(t, 'name', 'Sara'));
  t = must(answer(t, 'email', 'sara@harborgroup.com'));
  t = must(answer(t, 'company', { value: 'Harbor Hospitality', inferred: false }));
  t = must(answer(edit(t, 'email'), 'email', 'sara@otherco.com'));
  assert.equal(t.answers.company.value, 'Harbor Hospitality');
  // "Change something" on the brief rewinds to the focus step.
  assert.equal(edit(completeDefault(), 'focus').position, 'focus');
  assert.equal(edit(completeDefault(), 'email_confirm').position, 'email');
});

// ── payload ───────────────────────────────────────────────────────────

test('payload matches the classic form fields plus source and metadata.convo', () => {
  const s = must(answer(completeDefault(), 'phone', { skipped: true }));
  const payload = toPayload(s, { ctaLabel: 'Book a walkthrough', sourcePage: '/demo', locale: 'en', now: NOW + 42_000, utmSource: 'newsletter' });
  assert.deepEqual(Object.keys(payload).sort(), [
    'company', 'country', 'countryCode', 'ctaLabel', 'email', 'locale', 'message', 'metadata', 'name', 'numberOfLocations',
    'phone', 'primaryPOS', 'role', 'source', 'sourcePage', 'utmSource',
  ].sort());
  assert.equal(payload.name, 'Sara Haddad');
  assert.equal(payload.email, 'sara@harborgroup.com');
  assert.equal(payload.company, 'Harborgroup');
  assert.equal(payload.role, 'Operations', 'English label, whatever the visitor language');
  assert.equal(payload.country, 'United Arab Emirates', 'English country name, as the classic form stores it');
  assert.equal(payload.countryCode, '+971');
  assert.equal(payload.phone, '', 'phone is optional for guided booking (D1)');
  assert.equal(payload.numberOfLocations, '11-25');
  assert.equal(payload.primaryPOS, 'Oracle MICROS Simphony');
  assert.equal(payload.source, 'guided-booking');
  assert.equal(payload.message, 'Walkthrough focus: Tasks and logbook, Margin and performance. Source: guided booking (default).');
  const convo = payload.metadata.convo;
  assert.equal(convo.version, 1);
  assert.equal(convo.mode, 'demo');
  assert.equal(convo.context, 'default');
  assert.deepEqual(convo.focus, ['tasks_logbook', 'margin_performance'], 'Crew items first, then Core');
  assert.equal(convo.roleKey, 'operations');
  assert.deepEqual(convo.inferred, { company: true, locations: false, country: true });
  assert.equal(convo.steps, 10);
  assert.equal(convo.durationMs, 42_000);
  assert.deepEqual(convo.brief.agenda.map((item) => item.line), [
    'Opening checklist, shift logbook and handover',
    'A live shift, a margin leak, and the measured recovery',
  ]);
  assert.deepEqual(convo.brief.notes, ['Tasks and the logbook are in Crew Manage, Crew Operating and Crew Complete.']);
  assert.equal(convo.brief.pos, 'Oracle MICROS Simphony');
  // No tokens or keys ever travel in the payload.
  assert.doesNotMatch(JSON.stringify(payload), /token|idempotency/i);
});

test('payload carries workflow context, the optional note and the priced selection', () => {
  const context = buildContext({ mode: 'demo', workflowKey: 'restaurant-tip-management', suggestedCountryIso: 'US' });
  let s = start(context, NOW);
  s = must(answer(s, 'name', 'Jo'));
  s = must(answer(s, 'email', 'jo@tipsco.com'));
  s = must(answer(s, 'company', { value: 'Tipsco', inferred: true }));
  s = must(answer(s, 'role', { key: 'hr_people' }));
  s = must(answer(s, 'locations', '1'));
  s = must(answer(s, 'focus', { keys: ['tips'], note: 'Pooled tips across two sites' }));
  s = must(answer(s, 'pos', { choice: 'listed', value: 'Toast' }));
  s = must(answer(s, 'country', { iso: 'US', inferred: true }));
  s = must(answer(s, 'brief', 'confirmed'));
  s = must(answer(s, 'phone', { dialCode: '+1', number: '(415) 555-0100' }));
  const payload = toPayload(s, { ctaLabel: 'Book', sourcePage: '/demo', locale: 'en', pricingIntent, now: NOW });
  assert.equal(payload.phone, '+14155550100');
  assert.equal(payload.metadata.convo.workflowKey, 'restaurant-tip-management');
  assert.equal(payload.metadata.convo.context, 'workflow');
  assert.match(payload.message, /^Walkthrough focus: Tips\. Source: guided booking \(workflow: restaurant-tip-management\)\.\n\nPooled tips across two sites\n\nPricing selection \(recheck pricing and eligibility before activation\): \{/);
});

test('switching to the classic form carries answers in its field shapes', () => {
  const s = must(answer(completeDefault(), 'phone', { dialCode: '+971', number: '50 123 4567' }));
  const values = toClassicValues(s, composeMessage(s));
  assert.equal(values.name, 'Sara Haddad');
  assert.equal(values.countryCode, '+971');
  assert.equal(values.phone, '501234567', 'national part beside the dial-code select');
  assert.equal(values.numberOfLocations, '11-25');
  assert.equal(values.role, 'Operations');
  assert.match(values.message, /^Walkthrough focus:/);
  const early = toClassicValues(must(answer(start(buildContext({ mode: 'demo' }), NOW), 'name', 'Sam')));
  assert.equal(early.name, 'Sam');
  assert.equal('message' in early, false, 'the classic default message applies until focus is chosen');
});

// ── resume ────────────────────────────────────────────────────────────

test('refresh-resume restores answers for the same entry only, re-validated, without the brief', () => {
  const context = buildContext({ mode: 'demo', suggestedCountryIso: 'AE' });
  const s = completeDefault(context);
  assert.equal(storageKey('demo'), 'sundae_convo_demo_v1');
  const raw = serialize(s);
  assert.doesNotMatch(raw, /token/i);
  const restored = restore(raw, context);
  assert.equal(restored.position, 'brief', 'the brief is always confirmed again');
  assert.equal(restored.answers.email, 'sara@harborgroup.com');
  assert.equal(restored.startedAt, NOW);
  assert.equal(restore(raw, buildContext({ mode: 'demo', workflowKey: 'restaurant-logbook' })), null, 'different entry starts fresh');
  assert.equal(restore('{not json', context), null);
  assert.equal(restore(null, context), null);
  const tampered = JSON.parse(raw);
  tampered.answers.email = 'not-an-email';
  tampered.answers.focus = ['margin_performance', 'nope'];
  tampered.answers.role = { key: 'admin', label: 'x' };
  const fixed = restore(JSON.stringify(tampered), context);
  assert.equal(fixed.answers.email, undefined);
  assert.equal(fixed.answers.role, undefined);
  assert.deepEqual(fixed.answers.focus, ['margin_performance']);
  assert.equal(fixed.position, 'email');
  assert.notEqual(contextSignature(context), contextSignature(buildContext({ mode: 'contact' })));
});

test('next position is stable for a fully answered conversation', () => {
  const s = must(answer(completeDefault(), 'phone', { skipped: true }));
  assert.equal(nextPosition(s.context, s.answers), 'ready');
  assert.equal(back(s).position, 'phone');
});

// ── package facts ─────────────────────────────────────────────────────

test('package facts: agenda order and notes come from one constants file', () => {
  assert.deepEqual(orderFocusForAgenda(['competitors_market', 'tips', 'margin_performance', 'scheduling_attendance']), [
    'scheduling_attendance', 'tips', 'margin_performance', 'competitors_market',
  ]);
  assert.deepEqual(FOCUS_KEYS.filter((key) => FOCUS_FACTS[key].note), ['payroll', 'tasks_logbook', 'tips', 'forecasting', 'competitors_market']);
  assert.equal(FOCUS_FACTS.competitors_market.note, 'Watchtower is available with Core Growth and Core Performance.');
});

// ── experiment split (D4) ─────────────────────────────────────────────

test('split configuration defaults to off and all surfaces', () => {
  assert.equal(parseGuidedBookingMode(undefined), 'off');
  assert.equal(parseGuidedBookingMode(''), 'off');
  assert.equal(parseGuidedBookingMode('ON'), 'on');
  assert.equal(parseGuidedBookingMode('split'), 'split');
  assert.equal(parseGuidedBookingMode('yes'), 'off');
  assert.deepEqual(parseGuidedBookingSurfaces(undefined), ['demo', 'contact', 'get-started']);
  assert.deepEqual(parseGuidedBookingSurfaces('contact, demo'), ['demo', 'contact']);
  assert.deepEqual(parseGuidedBookingSurfaces('nothing'), []);
});

test('variant decision: override, off, on, sticky cookie and 50/50 assignment', () => {
  const base = { mode: 'split', surfaces: ['demo', 'contact', 'get-started'], surface: 'demo', override: null, cookie: null };
  assert.deepEqual(decideVariant({ ...base, mode: 'off', random: 0.1 }), { variant: 'classic', assign: null });
  assert.deepEqual(decideVariant({ ...base, mode: 'off', override: 'guided', random: 0.9 }), { variant: 'guided', assign: null }, '?guided=1 works with the variable unset');
  assert.deepEqual(decideVariant({ ...base, mode: 'on', random: 0.9 }), { variant: 'guided', assign: null });
  assert.deepEqual(decideVariant({ ...base, mode: 'on', override: 'classic', random: 0.1 }), { variant: 'classic', assign: null });
  assert.deepEqual(decideVariant({ ...base, mode: 'on', surfaces: ['contact'], random: 0.1 }), { variant: 'classic', assign: null });
  assert.deepEqual(decideVariant({ ...base, random: 0.2 }), { variant: 'guided', assign: 'guided' });
  assert.deepEqual(decideVariant({ ...base, random: 0.7 }), { variant: 'classic', assign: 'classic' });
  assert.deepEqual(decideVariant({ ...base, cookie: 'classic', random: 0.2 }), { variant: 'classic', assign: null }, 'kept across visits');
  assert.deepEqual(decideVariant({ ...base, cookie: 'guided', override: 'classic', random: 0.2 }), { variant: 'classic', assign: null }, 'override does not touch the cookie');
});

test('variant cookie and override parsing', () => {
  assert.equal(parseVariantOverride('?guided=1&x=2'), 'guided');
  assert.equal(parseVariantOverride('?guided=0'), 'classic');
  assert.equal(parseVariantOverride('?guided=yes'), null);
  assert.equal(parseVariantCookie(`a=1; ${LEAD_VARIANT_COOKIE}=guided; b=2`), 'guided');
  assert.equal(parseVariantCookie(`${LEAD_VARIANT_COOKIE}=other`), null);
  assert.equal(variantCookieString('classic', true), 'sundae_lead_variant=classic; path=/; max-age=7776000; samesite=lax; secure');
});

// ── submit contract ───────────────────────────────────────────────────

test('phone is optional only for guided booking and the diagnostic flows (D1)', () => {
  assert.equal(isPhoneRequiredForLead('/demo', undefined), true);
  assert.equal(isPhoneRequiredForLead('/demo', 'guided-booking'), false);
  assert.equal(isPhoneRequiredForLead('/contact', 'guided-booking'), false);
  assert.equal(isPhoneRequiredForLead('/contact', 'classic'), true);
  assert.equal(isValidOptionalPhone(''), true);
});

test('shared lead field rules match the classic form', () => {
  assert.equal(isValidLeadEmail('a@b.co'), true);
  assert.equal(isValidLeadEmail('a@b'), false);
  assert.equal(normalizePhoneForStorage('00 44 (20) 7946-0958'), '+442079460958');
  assert.equal(composeFullPhone('+1-242', '555 0100'), '+1-242555 0100');
  assert.equal(normalizePhoneForStorage(composeFullPhone('+1-242', '555 0100')), '+12425550100');
  assert.equal(composeFullPhone('+971', '+44 20'), '+44 20');
});

test('lead client passes bookingToken through only when the backend sends one', async () => {
  const original = { fetch: globalThis.fetch, url: process.env.SUNDAE_BACKEND_URL, secret: process.env.MARKETING_LEAD_HMAC_SECRET };
  process.env.SUNDAE_BACKEND_URL = 'http://backend.test';
  process.env.MARKETING_LEAD_HMAC_SECRET = 'unit-secret';
  const { submitLeadToSundae } = await import('../src/lib/sundaeLeadClient.ts');
  const reply = (body, status = 201) => async () => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
  try {
    globalThis.fetch = reply({ ok: true, leadId: 'l1', leadNumber: 'SL-1', bookingToken: 'tkn' });
    assert.deepEqual(await submitLeadToSundae({ fullName: 'A', email: 'a@b.co' }, 'key-12345678'), { ok: true, status: 201, leadId: 'l1', leadNumber: 'SL-1', bookingToken: 'tkn' });
    globalThis.fetch = reply({ ok: true, leadId: 'l2', leadNumber: 'SL-2' });
    const without = await submitLeadToSundae({ fullName: 'A', email: 'a@b.co' }, 'key-12345678');
    assert.equal('bookingToken' in without, false);
    globalThis.fetch = reply({ ok: true, leadId: 'l3', bookingToken: 42 });
    assert.equal('bookingToken' in (await submitLeadToSundae({ fullName: 'A', email: 'a@b.co' }, 'key-12345678')), false);
  } finally {
    globalThis.fetch = original.fetch;
    if (original.url === undefined) delete process.env.SUNDAE_BACKEND_URL; else process.env.SUNDAE_BACKEND_URL = original.url;
    if (original.secret === undefined) delete process.env.MARKETING_LEAD_HMAC_SECRET; else process.env.MARKETING_LEAD_HMAC_SECRET = original.secret;
  }
});

test('booking overlay pause drops every event and replay, resumes after, and never bypasses consent', async () => {
  const { registerHooks } = await import('node:module');
  const savedEnv = { key: process.env.NEXT_PUBLIC_POSTHOG_KEY, mode: process.env.NODE_ENV };
  process.env.NEXT_PUBLIC_POSTHOG_KEY = 'qa-public-project-key';
  process.env.NODE_ENV = 'production';
  let consent = 'accepted';
  let config;
  const calls = { capture: 0, stop: 0, start: 0 };
  globalThis.__guidedSdkMock = {
    init(_key, value) { config = value; },
    has_opted_out_capturing() { return false; },
    sessionRecordingStarted() { return true; },
    stopSessionRecording() { calls.stop += 1; },
    startSessionRecording() { calls.start += 1; },
    capture() { calls.capture += 1; },
  };
  globalThis.window = { location: new URL('https://www.sundae.io/demo'), localStorage: { getItem() { return consent; } } };
  globalThis.document = { cookie: '' };
  const hooks = registerHooks({ resolve(specifier, context, nextResolve) {
    if (specifier === 'posthog-js') return { url: 'data:text/javascript,export default globalThis.__guidedSdkMock', shortCircuit: true };
    try { return nextResolve(specifier, context); } catch (error) {
      if (error.code !== 'ERR_MODULE_NOT_FOUND' || !specifier.startsWith('.') || /\.[a-z]+$/i.test(specifier)) throw error;
      return nextResolve(`${specifier}.ts`, context);
    }
  } });
  try {
    const { initPostHog, setBookingOverlayOpen, trackEvent } = await import('../src/lib/posthog.ts');
    initPostHog();
    const event = { uuid: 'qa', event: 'guided_booking_step_answered', properties: { stepId: 'name', $current_url: 'https://www.sundae.io/demo' } };
    const vitals = { uuid: 'qa-v', event: '$web_vitals', properties: { $current_url: 'https://www.sundae.io/demo', $web_vitals_LCP_value: 900 } };
    assert.equal(config.before_send(event), event);
    trackEvent('guided_booking_started', { variant: 'guided' });
    assert.equal(calls.capture, 1);

    setBookingOverlayOpen(true);
    assert.equal(config.before_send(event), null, 'autocapture and custom events are dropped while the booking screen is open');
    assert.equal(config.before_send(vitals), null, 'web vitals are dropped too');
    trackEvent('guided_booking_booked', { variant: 'guided' });
    assert.equal(calls.capture, 1, 'trackEvent is a no-op while open');
    assert.equal(calls.stop, 1, 'session replay is paused');

    setBookingOverlayOpen(false);
    assert.equal(calls.start, 1, 'replay resumes only because it was running before');
    assert.equal(config.before_send(event), event);
    assert.ok(config.before_send(vitals), 'consented vitals flow again after the pause');
    consent = 'declined';
    assert.equal(config.before_send(event), null, 'closing the overlay never re-admits events without consent');
  } finally {
    hooks.deregister();
    delete globalThis.__guidedSdkMock;
    delete globalThis.window;
    delete globalThis.document;
    if (savedEnv.key === undefined) delete process.env.NEXT_PUBLIC_POSTHOG_KEY; else process.env.NEXT_PUBLIC_POSTHOG_KEY = savedEnv.key;
    if (savedEnv.mode === undefined) delete process.env.NODE_ENV; else process.env.NODE_ENV = savedEnv.mode;
  }
});
