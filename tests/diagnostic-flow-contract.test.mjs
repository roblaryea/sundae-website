// The diagnostic question bank and step rules (spec 3.2, 6.1, 9 "Script").
import './helpers/ts-hooks.mjs';
import assert from 'node:assert/strict';
import { test } from 'node:test';

const { QUESTIONS, QUESTION_BANK_VERSION, orderPosOptions } = await import('../src/lib/diagnostic/questions.ts');
const {
  canAdvanceDiagnosticQuestion, filterDiagnosticOptions, isDiagnosticComplete, isPlausibleName,
  pruneHiddenAnswers, toggleDiagnosticMultiValue, visibleQuestions,
} = await import('../src/lib/diagnostic/flowLogic.ts');
const { parseLocationCount } = await import('../src/lib/diagnostic/rules.ts');
const { parseProgress } = await import('../src/lib/diagnostic/progress.ts');
const { sanitizeDiagnosticResponses } = await import('../src/lib/diagnostic/sanitize.ts');
const { isPhoneRequiredForLead, isValidOptionalPhone } = await import('../src/lib/leadValidation.ts');

const byId = Object.fromEntries(QUESTIONS.map((question) => [question.id, question]));
const ids = (responses) => visibleQuestions(responses).map((question) => question.id);

test('the bank follows the spec script: name first, contact and role last, five parts', () => {
  assert.deepEqual(QUESTIONS.map((question) => question.id), [
    'name', 'concepts', 'locations', 'countries', 'team_size',
    'paper_processes', 'payroll_countries', 'team_costs',
    'money_leaks', 'measure_fix',
    'pos', 'other_systems',
    'priority', 'contact', 'role',
  ]);
  assert.deepEqual([...new Set(QUESTIONS.map((question) => question.part))], ['operation', 'crew', 'core', 'systems', 'report']);
  for (const retired of ['avg_unit_volume', 'budget_band', 'tech_headcount', 'decision_data', 'blind_spot', 'timeline', 'decision_lag', 'kpis_measured', 'kpis_wished', 'scenario_wish', 'forecasting', 'scheduling_tool', 'region', 'outlets', 'labor_pain', 'ops_tools']) {
    assert.equal(byId[retired], undefined, `${retired} is retired`);
  }
});

test('payroll countries are asked only with payroll prep or tips', () => {
  assert.equal(ids({ paper_processes: ['schedules'] }).includes('payroll_countries'), false);
  assert.equal(ids({ paper_processes: ['payroll_prep'] }).includes('payroll_countries'), true);
  assert.equal(ids({ paper_processes: ['tips'] }).includes('payroll_countries'), true);
});

test('team costs are skipped when nothing runs on paper', () => {
  assert.equal(ids({ paper_processes: ['none'] }).includes('team_costs'), false);
  assert.equal(ids({ paper_processes: ['schedules'] }).includes('team_costs'), true);
});

test('answers to questions that disappear are pruned', () => {
  const pruned = pruneHiddenAnswers({ paper_processes: ['none'], payroll_countries: ['AE'], team_costs: ['overtime'] });
  assert.equal(pruned.payroll_countries, undefined);
  assert.equal(pruned.team_costs, undefined);
});

test('the typical path is 15 turns or fewer', () => {
  const longest = { paper_processes: ['payroll_prep', 'schedules'] };
  assert.ok(ids(longest).length <= 15);
  assert.ok(ids({ paper_processes: ['none'] }).length <= 13);
});

test('only other systems is optional and can be skipped', () => {
  assert.deepEqual(QUESTIONS.filter((question) => question.optional).map((question) => question.id), ['other_systems']);
  assert.equal(canAdvanceDiagnosticQuestion(byId.other_systems, {}), true);
  assert.equal(canAdvanceDiagnosticQuestion(byId.money_leaks, {}), false);
});

test('locations take an exact whole number from 1 to 9999, in any digits', () => {
  assert.equal(parseLocationCount('12'), 12);
  assert.equal(parseLocationCount(' 1,200 '), 1200);
  assert.equal(parseLocationCount('٣٠'), 30);
  assert.equal(parseLocationCount('२५'), 25);
  for (const invalid of ['0', '10000', '2.5', '6-15', 'ten', '', '-3']) assert.equal(parseLocationCount(invalid), null, invalid);
  assert.equal(canAdvanceDiagnosticQuestion(byId.locations, { locations: '6-15' }), false);
  assert.deepEqual([...byId.locations.quickPicks], [1, 5, 10, 25]);
});

test('names use the guided booking check', () => {
  assert.equal(isPlausibleName('Sara'), true);
  assert.equal(isPlausibleName('张伟'), true);
  for (const invalid of ['S', 'sara@example.test', '12345', '+971 50']) assert.equal(isPlausibleName(invalid), false, invalid);
});

test('contact needs a valid email and a company', () => {
  assert.equal(canAdvanceDiagnosticQuestion(byId.contact, { email: 'ops@harbor.test', company: 'Harbor' }), true);
  assert.equal(canAdvanceDiagnosticQuestion(byId.contact, { email: 'ops@harbor', company: 'Harbor' }), false);
  assert.equal(canAdvanceDiagnosticQuestion(byId.contact, { email: 'ops@harbor.test', company: ' ' }), false);
});

test('"none" and "not sure" are exclusive', () => {
  const options = byId.paper_processes.options;
  assert.deepEqual(toggleDiagnosticMultiValue(['schedules', 'tips'], 'none', options), ['none']);
  assert.deepEqual(toggleDiagnosticMultiValue(['none'], 'tips', options), ['tips']);
  assert.deepEqual(toggleDiagnosticMultiValue(['food_cost'], 'not_sure', byId.money_leaks.options), ['not_sure']);
});

test('"Other" POS needs the system name', () => {
  assert.equal(canAdvanceDiagnosticQuestion(byId.pos, { pos: ['other'] }), false);
  assert.equal(canAdvanceDiagnosticQuestion(byId.pos, { pos: ['other'], pos_other: 'Ziosk' }), true);
});

test('POS options lead with brands relevant to the operator\'s countries', () => {
  assert.equal(orderPosOptions(['AE'])[0].value, 'foodics');
  assert.equal(orderPosOptions(['US'])[0].value, 'toast');
  assert.equal(orderPosOptions(['IN'])[0].value, 'petpooja');
  assert.deepEqual(orderPosOptions(['AE']).slice(-2).map((option) => option.value), ['other', 'not_sure']);
});

test('options can be searched by localized label, value or alias', () => {
  const options = orderPosOptions([]);
  assert.deepEqual(filterDiagnosticOptions(options, (value) => value, 'simphony').map((option) => option.value), ['micros']);
  const label = (value) => ({ AE: 'Émirats arabes unis' })[value] ?? value;
  assert.deepEqual(filterDiagnosticOptions([{ value: 'AE' }, { value: 'SA' }], label, 'emirats').map((option) => option.value), ['AE']);
});

test('a complete answer set passes and a missing answer does not', () => {
  const complete = {
    name: 'Sara', concepts: ['casual'], locations: '4', countries: ['AE'], team_size: '16_20',
    paper_processes: ['tips'], payroll_countries: ['AE'], team_costs: ['none'], money_leaks: ['food_cost'],
    measure_fix: 'baseline', pos: ['foodics'], priority: 'Fix food cost.', email: 'sara@harbor.test', company: 'Harbor', role: 'owner_ceo',
  };
  assert.equal(isDiagnosticComplete(complete), true);
  assert.equal(isDiagnosticComplete({ ...complete, payroll_countries: [] }), false);
});

test('saved progress from an older question bank is discarded, current progress resumes', () => {
  const now = Date.now();
  const current = JSON.stringify({ version: QUESTION_BANK_VERSION, responses: { name: 'Sara' }, questionId: 'concepts', savedAt: now });
  assert.equal(parseProgress(current, now)?.questionId, 'concepts');
  const legacy = JSON.stringify({ responses: { segment: ['casual'], outlets: '6_15' }, step: 3, questionId: 'region', showCapture: false, capture: {}, savedAt: now });
  assert.equal(parseProgress(legacy, now), null);
  const stale = JSON.stringify({ version: QUESTION_BANK_VERSION, responses: {}, questionId: 'name', savedAt: now - 8 * 24 * 3600 * 1000 });
  assert.equal(parseProgress(stale, now), null);
  assert.equal(parseProgress('{not json', now), null);
});

test('answers sent to the model and lead metadata carry no contact details', () => {
  const clean = sanitizeDiagnosticResponses({ name: 'Sara', email: 'sara@harbor.test', company: 'Harbor', priority: 'x'.repeat(500), money_leaks: ['food_cost', 7], unknown: 'y' });
  assert.equal(clean.name, undefined);
  assert.equal(clean.email, undefined);
  assert.equal(clean.company, undefined);
  assert.equal(clean.unknown, undefined);
  assert.equal(clean.priority.length, 280);
  assert.deepEqual(clean.money_leaks, ['food_cost']);
});

test('phone stays required on contact forms but is optional for the diagnostic', () => {
  assert.equal(isPhoneRequiredForLead('/contact', undefined), true);
  assert.equal(isPhoneRequiredForLead('/diagnostic', undefined), false);
  assert.equal(isPhoneRequiredForLead(undefined, 'diagnostic-call-request'), false);
  assert.equal(isValidOptionalPhone(''), true);
});
