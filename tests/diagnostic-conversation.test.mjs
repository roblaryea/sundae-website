// Guided Operations Diagnostic (Phase B): the conversation machine, the split
// helper and the route's booking-token rule (Phase C). Pure modules only.
import './helpers/ts-hooks.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const {
  answer,
  back,
  convoMetadata,
  currentTurn,
  DIAGNOSTIC_CONVO_VERSION,
  edit,
  fromClassic,
  GUIDED_DIAGNOSTIC_SOURCE,
  nextPosition,
  previousTurn,
  progressIndex,
  rebuildResponses,
  restore,
  serialize,
  skip,
  start,
  STORAGE_KEY,
  toClassicProgress,
  toCompletion,
  transcriptTurns,
  visibleTurns,
} = await import('../src/lib/diagnosticConversation/machine.ts');
const {
  decideDiagnosticVariant,
  DIAGNOSTIC_VARIANT_COOKIE,
  diagnosticVariantCookieString,
  parseDiagnosticVariantCookie,
  parseGuidedDiagnosticMode,
} = await import('../src/lib/diagnosticConversation/variant.ts');
const { LEAD_VARIANT_COOKIE, parseVariantCookie } = await import('../src/lib/leadConversation/variant.ts');
const { BOOKING_TOKEN_SOURCES, bookingTokenForSource } = await import('../src/lib/leadBookingToken.ts');
const { QUESTION_BANK_VERSION } = await import('../src/lib/diagnostic/questions.ts');

const NOW = 1_763_640_000_000;
const CONTEXT = { suggestedCountry: 'AE' };

const text = (value) => ({ kind: 'text', value });
const pick = (...values) => ({ kind: 'choices', values });

/** Answers turns in order; `script` maps turn id -> input (or 'skip'). */
function run(script, state = start(NOW)) {
  let current = state;
  let guard = 0;
  while (current.position !== 'complete' && guard++ < 40) {
    const id = current.position;
    const input = script[id];
    assert.ok(input, `no scripted answer for turn ${id}`);
    const result = input === 'skip' ? skip(current, id) : answer(current, id, input, CONTEXT);
    assert.ok(result.ok, `turn ${id}: ${result.error}`);
    current = result.state;
  }
  return current;
}

const CORE_ONLY = {
  name: text('Sara Haddad'),
  concepts: pick('casual'),
  locations: text('4'),
  countries: pick('AE'),
  team_size: pick('21_40'),
  paper_processes: pick('none'),
  money_leaks: pick('food_cost'),
  measure_fix: pick('spreadsheet'),
  pos: pick('foodics'),
  other_systems: 'skip',
  priority: text('Get food cost under control.'),
  email: text('Sara@Harbor-Group.test'),
  company: { kind: 'company', value: 'Harbor Group', inferred: true },
  role: pick('operations'),
};

const CREW_HEAVY = {
  ...CORE_ONLY,
  paper_processes: pick('payroll_prep', 'tips', 'checklists'),
  payroll_countries: pick('AE', 'SA'),
  team_costs: pick('overtime', 'no_shows'),
};

const turnNumbers = (state) => new Set(transcriptTurns(state).map((turn) => turn.number)).size;

test('the typical path is 15 turns or fewer and follows the bank order', () => {
  const core = run(CORE_ONLY);
  assert.equal(core.position, 'complete');
  assert.deepEqual(transcriptTurns(core).map((turn) => turn.id), [
    'name', 'concepts', 'locations', 'countries', 'team_size', 'paper_processes', 'money_leaks', 'measure_fix', 'pos', 'other_systems', 'priority', 'email', 'company', 'role',
  ]);
  assert.ok(turnNumbers(core) <= 15, `core path has ${turnNumbers(core)} turns`);
  const crew = run(CREW_HEAVY);
  assert.ok(turnNumbers(crew) <= 15, `longest path has ${turnNumbers(crew)} turns`);
  assert.equal(turnNumbers(crew), 15);
});

test('branching: payroll countries only with payroll prep or tips; team costs skipped on "none"', () => {
  let state = start(NOW);
  const upTo = (stop, script) => {
    while (state.position !== stop) {
      const result = answer(state, state.position, script[state.position], CONTEXT);
      assert.ok(result.ok, `${state.position}: ${result.error}`);
      state = result.state;
    }
  };
  state = start(NOW);
  upTo('paper_processes', CREW_HEAVY);
  const none = answer(state, 'paper_processes', pick('none'), CONTEXT);
  assert.equal(none.state.position, 'money_leaks');
  assert.equal(visibleTurns(none.state.responses).some((turn) => turn.id === 'payroll_countries' || turn.id === 'team_costs'), false);

  const schedulesOnly = answer(state, 'paper_processes', pick('schedules'), CONTEXT);
  assert.equal(schedulesOnly.state.position, 'team_costs');

  for (const trigger of ['payroll_prep', 'tips']) {
    const withTrigger = answer(state, 'paper_processes', pick(trigger), CONTEXT);
    assert.equal(withTrigger.state.position, 'payroll_countries');
  }
  // "None" with anything else stands alone.
  const mixed = answer(state, 'paper_processes', pick('tips', 'none'), CONTEXT);
  assert.deepEqual(mixed.state.responses.paper_processes, ['none']);
});

test('validation comes from the bank and the booking name check', () => {
  const s = start(NOW);
  assert.equal(answer(s, 'name', text('a'), CONTEXT).error, 'nameShort');
  assert.equal(answer(s, 'name', text('sara@harbor.test'), CONTEXT).error, 'nameInvalid');
  assert.equal(answer(s, 'name', text('٠٥٠١٢٣٤٥٦٧'), CONTEXT).error, 'nameInvalid');
  assert.equal(answer(s, 'concepts', pick('casual'), CONTEXT).error, 'notCurrent');
  let state = answer(s, 'name', text('  Sara   Haddad '), CONTEXT).state;
  assert.equal(state.responses.name, 'Sara Haddad');
  assert.equal(answer(state, 'concepts', pick(), CONTEXT).error, 'choiceRequired');
  assert.equal(answer(state, 'concepts', pick('casual', 'spaceship'), CONTEXT).error, 'choiceRequired');
  state = answer(state, 'concepts', pick('casual', 'bar'), CONTEXT).state;
  for (const bad of ['0', '10000', '6-15', 'twelve']) assert.equal(answer(state, 'locations', text(bad), CONTEXT).error, 'numberInvalid');
  state = answer(state, 'locations', text('1.200'), CONTEXT).state;
  assert.equal(state.responses.locations, '1200');
  assert.equal(answer(state, 'countries', pick('XX'), CONTEXT).error, 'choiceRequired');
  state = answer(state, 'countries', pick('AE'), CONTEXT).state;
  assert.equal(state.inferred.countries, true, 'accepting the IP guess unchanged is recorded');
});

test('skip is offered only on optional turns, and edit brings a skipped turn back', () => {
  const s = run({ ...CORE_ONLY, role: pick('operations') });
  assert.deepEqual(s.skipped, ['other_systems']);
  const atPos = edit(s, 'pos');
  assert.equal(skip(atPos, 'pos').ok, false, 'POS is not optional');
  const editSkipped = edit(s, 'other_systems');
  assert.equal(editSkipped.position, 'other_systems');
  const answered = answer(editSkipped, 'other_systems', pick('hr_payroll'), CONTEXT).state;
  assert.deepEqual(answered.skipped, []);
  assert.deepEqual(answered.responses.other_systems, ['hr_payroll']);
});

test('edit: a new branch is asked at the first gap; a closed branch drops its answers', () => {
  const crew = run(CREW_HEAVY);
  // Remove the payroll trigger: payroll countries and their answers go.
  let state = edit(crew, 'paper_processes');
  assert.equal(state.position, 'paper_processes');
  assert.deepEqual(transcriptTurns(state).map((turn) => turn.id), ['name', 'concepts', 'locations', 'countries', 'team_size']);
  state = answer(state, 'paper_processes', pick('checklists'), CONTEXT).state;
  assert.equal(state.responses.payroll_countries, undefined);
  assert.equal(state.position, 'complete');

  // Add tips to a Core-only path: payroll countries is asked next, then team costs.
  const core = run(CORE_ONLY);
  state = answer(edit(core, 'paper_processes'), 'paper_processes', pick('tips'), CONTEXT).state;
  assert.equal(state.position, 'payroll_countries');
  state = answer(state, 'payroll_countries', pick('AE'), CONTEXT).state;
  assert.equal(state.position, 'team_costs');
  state = answer(state, 'team_costs', pick('none'), CONTEXT).state;
  assert.equal(state.position, 'complete', 'later answers were kept');
});

test('back rewinds one turn with the answer kept; progress follows the five parts', () => {
  let state = start(NOW);
  assert.equal(previousTurn(state), null);
  assert.equal(back(state), state);
  assert.equal(progressIndex(state), 0);
  for (const id of ['name', 'concepts', 'locations', 'countries', 'team_size']) state = answer(state, id, CORE_ONLY[id], CONTEXT).state;
  assert.equal(currentTurn(state).part, 'crew');
  assert.equal(progressIndex(state), 1);
  const rewound = back(state);
  assert.equal(rewound.position, 'team_size');
  assert.equal(rewound.responses.team_size, '21_40');
  assert.equal(progressIndex(rewound), 0);
  assert.equal(nextPosition(rewound), 'paper_processes');
  assert.equal(progressIndex(run(CORE_ONLY)), 5);
});

test('email and company: work email infers the company; a changed email drops an inferred company', () => {
  let state = edit(run(CORE_ONLY), 'email');
  assert.equal(state.inferred.company, true);
  state = answer(state, 'email', text('sara@another-group.test'), CONTEXT).state;
  assert.equal(state.responses.company, undefined);
  assert.equal(state.position, 'company');
  state = answer(state, 'company', { kind: 'company', value: '  Harbor   Hospitality ', inferred: false }, CONTEXT).state;
  assert.equal(state.responses.company, 'Harbor Hospitality');
  assert.equal(state.inferred.company, false);
  assert.equal(answer(edit(state, 'email'), 'email', text('not-an-email'), CONTEXT).error, 'emailInvalid');
});

test('resume: versioned sessionStorage key, answers only, every value re-validated', () => {
  assert.equal(STORAGE_KEY, `sundae_diag_convo_v${DIAGNOSTIC_CONVO_VERSION}`);
  const crew = run(CREW_HEAVY);
  const stored = serialize(crew);
  const parsed = JSON.parse(stored);
  assert.deepEqual(Object.keys(parsed).sort(), ['answerCount', 'bank', 'inferred', 'responses', 'skipped', 'startedAt', 'v']);
  assert.equal(parsed.bank, QUESTION_BANK_VERSION);
  assert.equal(/token/i.test(stored), false);

  const restored = restore(stored, CONTEXT, NOW + 1000);
  assert.deepEqual(restored.responses, crew.responses);
  assert.deepEqual(restored.skipped, ['other_systems']);
  assert.equal(restored.position, 'complete');

  // Older versions and other banks are discarded, not half-read.
  assert.equal(restore(JSON.stringify({ ...parsed, v: 0 }), CONTEXT), null);
  assert.equal(restore(JSON.stringify({ ...parsed, bank: QUESTION_BANK_VERSION - 1 }), CONTEXT), null);
  assert.equal(restore('{not json', CONTEXT), null);
  assert.equal(restore(null, CONTEXT), null);

  // Tampered values are dropped and the conversation resumes at the first gap.
  const tampered = JSON.stringify({
    ...parsed,
    responses: { ...parsed.responses, locations: '1e9', money_leaks: ['steal'], name: 'x@y.z', extra: 'ignored' },
    skipped: ['pos', 'other_systems', 42],
  });
  const fixed = restore(tampered, CONTEXT, NOW);
  assert.equal(fixed.position, 'name');
  assert.equal(fixed.responses.locations, undefined);
  assert.equal(fixed.responses.money_leaks, undefined);
  assert.equal(fixed.responses.extra, undefined);
  assert.deepEqual(fixed.skipped, ['other_systems']);
});

test('classic form carry-over, conversation to classic', () => {
  let state = start(NOW);
  for (const id of ['name', 'concepts', 'locations', 'countries']) state = answer(state, id, CORE_ONLY[id], CONTEXT).state;
  assert.deepEqual(toClassicProgress(state), { responses: state.responses, questionId: 'team_size' });
  assert.equal(toClassicProgress(edit(run(CORE_ONLY), 'email')).questionId, 'contact');
  assert.equal(toClassicProgress(edit(run(CORE_ONLY), 'company')).questionId, 'contact');
  assert.equal(toClassicProgress(run(CORE_ONLY)).questionId, 'role');
});

test('classic form carry-over, classic back to the conversation', () => {
  // The classic form left "other systems" blank (Skip) and is now on priority.
  const classic = {
    name: 'Sara', concepts: ['casual'], locations: '12', countries: ['AE'], team_size: '21_40', paper_processes: ['schedules'],
    team_costs: ['overtime'], money_leaks: ['labor_vs_demand'], measure_fix: 'baseline', pos: ['other'], pos_other: 'Our own till',
    email: 'sara@harbor-group.test', company: 'Harbor Group',
  };
  const previous = run(CORE_ONLY);
  const state = fromClassic(classic, 'priority', previous, CONTEXT, NOW + 5);
  assert.equal(state.position, 'priority');
  assert.deepEqual(state.skipped, ['other_systems']);
  assert.equal(state.responses.pos_other, 'Our own till');
  assert.equal(state.startedAt, previous.startedAt);
  // Without a resume point, optional blanks count as skipped and the first gap is asked.
  const fresh = fromClassic({ name: 'Sara' }, null, null, CONTEXT, NOW);
  assert.equal(fresh.position, 'concepts');
  assert.equal(fresh.startedAt, NOW);
  // Bad classic values never come through.
  assert.deepEqual(rebuildResponses({ name: 'Sara', locations: 'lots', role: 'pilot' }), { name: 'Sara' });
});

test('completion and metadata.convo carry answers by key, never contact details', () => {
  const crew = run(CREW_HEAVY);
  const completion = toCompletion(crew);
  assert.equal(completion.email, 'sara@harbor-group.test');
  assert.equal(completion.company, 'Harbor Group');
  assert.equal(completion.role, 'operations');
  const convo = convoMetadata(crew, NOW + 90_000);
  assert.equal(convo.version, DIAGNOSTIC_CONVO_VERSION);
  assert.equal(convo.variant, 'guided');
  assert.equal(convo.questionBankVersion, QUESTION_BANK_VERSION);
  assert.equal(convo.turns, 15);
  assert.equal(convo.durationMs, 90_000);
  assert.equal(convo.freeMail, false);
  assert.deepEqual(convo.inferred, { company: true, countries: true });
  assert.deepEqual(convo.answers.payroll_countries, ['AE', 'SA']);
  const flat = JSON.stringify(convo);
  for (const personal of ['Sara', 'Haddad', 'harbor-group', 'Harbor Group', '@']) assert.equal(flat.includes(personal), false, personal);
  assert.equal(GUIDED_DIAGNOSTIC_SOURCE, 'guided-diagnostic');
  const gmail = convoMetadata(answer(edit(crew, 'email'), 'email', text('sara@gmail.com'), CONTEXT).state, NOW);
  assert.equal(gmail.freeMail, true);
});

test('split: off by default, its own cookie and ?guided override, independent of guided booking', () => {
  assert.equal(parseGuidedDiagnosticMode(undefined), 'off');
  assert.equal(parseGuidedDiagnosticMode(''), 'off');
  assert.equal(parseGuidedDiagnosticMode('Split'), 'split');
  assert.equal(parseGuidedDiagnosticMode('on'), 'on');
  assert.equal(parseGuidedDiagnosticMode('yes'), 'off');

  const base = { override: null, cookie: null, random: 0.1 };
  assert.deepEqual(decideDiagnosticVariant({ ...base, mode: 'off' }), { variant: 'classic', assign: null });
  assert.deepEqual(decideDiagnosticVariant({ ...base, mode: 'off', override: 'guided' }), { variant: 'guided', assign: null });
  assert.deepEqual(decideDiagnosticVariant({ ...base, mode: 'on' }), { variant: 'guided', assign: null });
  assert.deepEqual(decideDiagnosticVariant({ ...base, mode: 'on', override: 'classic' }), { variant: 'classic', assign: null });
  assert.deepEqual(decideDiagnosticVariant({ ...base, mode: 'split' }), { variant: 'guided', assign: 'guided' });
  assert.deepEqual(decideDiagnosticVariant({ ...base, mode: 'split', random: 0.7 }), { variant: 'classic', assign: 'classic' });
  assert.deepEqual(decideDiagnosticVariant({ ...base, mode: 'split', cookie: 'classic' }), { variant: 'classic', assign: null });

  assert.equal(DIAGNOSTIC_VARIANT_COOKIE, 'sundae_diag_variant');
  assert.notEqual(DIAGNOSTIC_VARIANT_COOKIE, LEAD_VARIANT_COOKIE);
  const both = 'sundae_lead_variant=guided; sundae_diag_variant=classic';
  assert.equal(parseDiagnosticVariantCookie(both), 'classic');
  assert.equal(parseVariantCookie(both), 'guided', 'the booking still reads only its own cookie');
  assert.equal(parseDiagnosticVariantCookie('sundae_diag_variant=maybe'), null);
  assert.equal(diagnosticVariantCookieString('guided', true), 'sundae_diag_variant=guided; path=/; max-age=7776000; samesite=lax; secure');
  assert.equal(diagnosticVariantCookieString('classic', false), 'sundae_diag_variant=classic; path=/; max-age=7776000; samesite=lax');
});

test('route: the booking token is returned only for the two guided sources', () => {
  assert.deepEqual([...BOOKING_TOKEN_SOURCES], ['guided-booking', 'guided-diagnostic']);
  assert.equal(bookingTokenForSource('guided-booking', 'tkn'), 'tkn');
  assert.equal(bookingTokenForSource('guided-diagnostic', 'tkn'), 'tkn');
  for (const source of [undefined, null, '', 'diagnostic', 'diagnostic-call-request', 'Guided-Diagnostic', 'guided-diagnostic ', ['guided-diagnostic'], 42]) {
    assert.equal(bookingTokenForSource(source, 'tkn'), undefined, String(source));
  }
  assert.equal(bookingTokenForSource('guided-diagnostic', undefined), undefined);
  assert.equal(bookingTokenForSource('guided-diagnostic', ''), undefined);
  const route = fs.readFileSync(new URL('../src/app/api/cta/submit/route.ts', import.meta.url), 'utf8');
  assert.match(route, /bookingTokenForSource\(source, sundaeResult\.bookingToken\)/);
  assert.match(route, /'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer'/);
});

test('one free-mail list: the diagnostic uses the booking list that matches the backend (D13)', async () => {
  assert.equal(fs.existsSync(new URL('../src/lib/diagnostic/enrich.ts', import.meta.url)), false);
  const shared = await import('../src/lib/freeMail.ts');
  const booking = await import('../src/lib/leadConversation/inference.ts');
  assert.equal(booking.FREE_MAIL_DOMAINS, shared.FREE_MAIL_DOMAINS, 'guided booking re-exports the same list');
  assert.equal(booking.companyFromEmail, shared.companyFromEmail);
  assert.equal(shared.FREE_MAIL_DOMAINS.length, 23);
  for (const file of ['../src/components/diagnostic/DiagnosticFlow.tsx', '../src/lib/diagnosticConversation/machine.ts', '../src/components/diagnostic/DiagnosticConversation.tsx']) {
    const source = fs.readFileSync(new URL(file, import.meta.url), 'utf8');
    assert.match(source, /lib\/freeMail|\.\.\/freeMail\.ts/);
    assert.doesNotMatch(source, /FREE_MAIL\s*=\s*new Set/);
  }
  assert.equal(shared.isFreeMailEmail('ops@gmail.com'), true);
  assert.equal(shared.isFreeMailEmail('ops@harbor-group.test'), false);
  assert.equal(shared.companyFromEmail('sara@harbor-e2e.test'), 'Harbor E2e', 'the classic form keeps its company prefill');
});

test('role "Other" takes a short detail, as in the classic form, and survives resume and carry-over', () => {
  const atRole = edit(run(CORE_ONLY), 'role');
  assert.equal(answer(atRole, 'role', pick('other'), CONTEXT).error, 'otherRequired');
  const done = answer(atRole, 'role', { kind: 'choices', values: ['other'], other: '  Head   of growth ' }, CONTEXT).state;
  assert.equal(done.position, 'complete');
  assert.equal(done.responses.role, 'other');
  assert.equal(done.responses.role_other, 'Head of growth');
  // Another role drops the detail.
  const changed = answer(edit(done, 'role'), 'role', pick('finance'), CONTEXT).state;
  assert.equal(changed.responses.role_other, undefined);
  // Resume and the classic form's answers keep the detail.
  assert.equal(restore(serialize(done), CONTEXT).responses.role_other, 'Head of growth');
  assert.equal(fromClassic({ ...done.responses }, 'role', null, CONTEXT).position, 'complete');
});

test('an accepted IP guess stays recorded after a refresh, before the guess is fetched again', () => {
  const core = run(CORE_ONLY);
  assert.equal(core.inferred.countries, true);
  assert.equal(restore(serialize(core), {}).inferred.countries, true, 'guess not known yet at mount');
  assert.equal(restore(serialize(core), { suggestedCountry: 'DE' }).inferred.countries, false, 'a different guess contradicts it');
  const changed = answer(edit(core, 'countries'), 'countries', pick('AE', 'SA'), CONTEXT).state;
  assert.equal(changed.inferred.countries, false);
});
