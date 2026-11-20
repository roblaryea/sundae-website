// Operations Diagnostic rules (spec section 4) against fixed operator profiles,
// plus the price match with the pricing calculator (spec 4.4, acceptance 5).
import './helpers/ts-hooks.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { test } from 'node:test';

const { runDiagnosticWithRules } = await import('../src/lib/diagnostic/engine.ts');
const { decodePricingIntent, normalizeCrewSelection } = await import('../src/lib/pricingIntent.ts');
const { CORE_PACKAGE_FACTS } = await import('../src/lib/diagnostic/productFacts.ts');
const { LEAK_CORE_NEEDS, pickCorePackage } = await import('../src/lib/diagnostic/rules.ts');

const catalog = JSON.parse(fs.readFileSync(new URL('../src/lib/pricing/catalogSnapshot.json', import.meta.url), 'utf8'));

const base = {
  name: 'Test',
  concepts: ['casual'],
  locations: '3',
  countries: ['AE'],
  team_size: '21_40',
  paper_processes: ['none'],
  money_leaks: ['not_sure'],
  measure_fix: 'next_pnl',
  pos: ['foodics'],
  priority: 'Get overtime under control.',
  role: 'operations',
};
const run = (overrides, locale = 'en') => runDiagnosticWithRules({ ...base, ...overrides }, locale);
const crewNames = (rec) => rec.crew?.products ?? [];

// ── An independent copy of the pricing calculator's arithmetic ──────────
// (sundae-pricing src/lib/crewPricing.ts cheapestPlan + calculateBandedTotal),
// written against the raw catalogue rather than the website's price book.
function banded(rawBands, units) {
  let total = rawBands[0][1];
  for (let index = 1; index < rawBands.length; index += 1) {
    const from = rawBands[index - 1][0] + 1;
    const to = rawBands[index][0];
    if (units < from) break;
    total += (Math.min(units, to) - from + 1) * rawBands[index][1];
  }
  return total;
}
const moduleBands = Object.fromEntries(catalog.modules.map((item) => [item.id, item.locationBands]));
const bundles = catalog.bundles.map((bundle) => ({ id: bundle.id, skus: bundle.moduleIds, bands: bundle.locationBands }));
const entitlements = (skus) => {
  const granted = new Set(skus);
  if (granted.has('crew_operations')) granted.add('crew_scheduling');
  return granted;
};
function calculatorCrewMonthly(selected, locations) {
  if (selected.length === 1 && selected[0] === 'crew_lite') return banded(moduleBands.crew_lite, Math.min(locations, 5));
  const selection = new Set(selected);
  let best = null;
  for (let mask = 0; mask < 1 << bundles.length; mask += 1) {
    const chosen = bundles.filter((_, index) => mask & (1 << index));
    const covered = new Set();
    for (const bundle of chosen) for (const sku of entitlements(bundle.skus)) covered.add(sku);
    const standalone = selected.filter((id) => !covered.has(id));
    const monthly =
      chosen.reduce((sum, bundle) => sum + banded(bundle.bands, locations), 0) +
      standalone.reduce((sum, id) => sum + (id === 'crew_scheduling' && selection.has('crew_operations') ? 0 : banded(moduleBands[id], locations)), 0);
    if (best === null || monthly < best) best = monthly;
  }
  return best;
}
function calculatorListSubtotal(calculatorUrl) {
  const intent = decodePricingIntent(new URL(calculatorUrl).searchParams.get('cfg'));
  assert.ok(intent, 'calculator link must carry a valid pricing intent');
  const tier = catalog.tiers.find((item) => `core_${item.id}` === intent.corePackage);
  const core = intent.layer === 'crew' ? 0 : banded(tier.locationBands, intent.locations);
  const crew = intent.layer === 'core' ? 0 : calculatorCrewMonthly(normalizeCrewSelection(intent.crewSkus), intent.locations);
  return { intent, total: core + crew };
}

function assertPriceMatchesCalculator({ report, recommendation }) {
  const { intent, total } = calculatorListSubtotal(report.startingPackage.calculatorUrl);
  assert.equal(intent.locations, recommendation.locations);
  assert.equal(intent.corePackage, recommendation.corePackage);
  assert.deepEqual(intent.addOns, []);
  assert.deepEqual(intent.watchtowerModules, []);
  if (recommendation.price.kind === 'list') assert.equal(recommendation.price.total, total);
}

// ── Fixtures ────────────────────────────────────────────────────────────
const fixtures = [
  {
    name: '1 café, 8 staff, schedules only -> Crew Starter',
    answers: { concepts: ['cafe_bakery'], locations: '1', team_size: 'up_to_15', paper_processes: ['schedules'] },
    core: 'core_foundation', crew: ['crew_starter'], total: 1195 + 99,
  },
  {
    name: '3 outlets, payroll + tasks -> Crew Operating',
    answers: { locations: '3', paper_processes: ['payroll_prep', 'checklists'], team_costs: ['none'], payroll_countries: ['AE'] },
    core: 'core_foundation', crew: ['crew_operating'], total: 1195 + 2 * 175 + 499 + 2 * 99,
  },
  {
    name: '12 outlets, food cost + guests -> Core Performance',
    answers: { locations: '12', money_leaks: ['food_cost', 'guest_retention'] },
    core: 'core_performance', crew: [], total: 2980 + 9 * 409 + 2 * 348,
  },
  {
    name: '40 outlets, competitors with Growth -> Watchtower scoped',
    answers: { locations: '40', money_leaks: ['guest_retention', 'competitors'] },
    core: 'core_growth', crew: [], watchtower: 'scoped', total: 1925 + 9 * 260 + 15 * 225 + 15 * 190,
  },
  {
    name: '300 outlets -> quoted',
    answers: { locations: '300', money_leaks: ['labor_vs_demand'], paper_processes: ['schedules'], team_costs: ['overtime'] },
    core: 'core_foundation', crew: ['crew_schedule_time'], quoted: true,
  },
  {
    name: 'delivery commissions alone -> Core Margin',
    answers: { money_leaks: ['delivery_commissions'] },
    core: 'core_margin', crew: [],
  },
  {
    name: 'reservations and no-shows only -> Core Growth',
    answers: { money_leaks: ['reservations_noshows'] },
    core: 'core_growth', crew: [],
  },
  {
    name: 'supplier prices + competitors with Margin -> Watchtower not offered, note shown',
    answers: { locations: '20', money_leaks: ['supplier_prices', 'competitors'] },
    core: 'core_margin', crew: [], watchtower: 'unavailable',
  },
  {
    name: 'Growth with competitors at 4 locations -> no Watchtower',
    answers: { locations: '4', money_leaks: ['guest_retention', 'competitors'] },
    core: 'core_growth', crew: [], watchtower: null,
  },
  {
    name: 'planning with Foundation -> Foresight & Action optional, priced separately',
    answers: { locations: '5', money_leaks: ['labor_vs_demand', 'planning'] },
    core: 'core_foundation', crew: [], foresight: 'optional', total: 1195 + 4 * 175,
  },
  {
    name: 'planning with Performance -> Foresight included',
    answers: { locations: '8', money_leaks: ['food_cost', 'reservations_noshows', 'planning'] },
    core: 'core_performance', crew: [], foresight: 'included',
  },
  {
    name: 'time clock only at 10 locations -> Schedule & Time',
    answers: { locations: '10', paper_processes: ['time_attendance'], team_costs: ['none'] },
    core: 'core_foundation', crew: ['crew_schedule_time'],
  },
  {
    name: 'training alone -> Crew Manage + Crew People, cheaper than Crew Complete',
    answers: { locations: '1', paper_processes: ['training', 'schedules'], team_costs: ['none'] },
    core: 'core_foundation', crew: ['crew_manage', 'crew_people'], total: 1195 + 399 + 249,
  },
  {
    name: 'training + payroll -> Crew Complete',
    answers: { locations: '6', paper_processes: ['training', 'payroll_prep'], team_costs: ['none'], payroll_countries: ['AE'] },
    core: 'core_foundation', crew: ['crew_complete'], total: 1195 + 5 * 175 + 699 + 5 * 129,
  },
  {
    name: 'tips only -> Crew Operating (payroll needs Crew Manage)',
    answers: { locations: '2', paper_processes: ['tips'], team_costs: ['none'], payroll_countries: ['GB'] },
    core: 'core_foundation', crew: ['crew_operating'],
  },
  {
    name: 'checklists only -> Crew Manage, the lowest list price that covers it',
    answers: { locations: '1', paper_processes: ['checklists'], team_costs: ['none'] },
    core: 'core_foundation', crew: ['crew_manage'], total: 1195 + 399,
  },
  {
    name: 'schedules only at 6 locations -> Crew Schedule (Starter caps exceeded)',
    answers: { locations: '6', team_size: 'up_to_15', paper_processes: ['schedules'], team_costs: ['none'] },
    core: 'core_foundation', crew: ['crew_schedule'],
  },
  {
    name: 'schedules only, 3 locations, 21-40 people -> Crew Schedule (Starter team cap)',
    answers: { locations: '3', team_size: '21_40', paper_processes: ['schedules'], team_costs: ['none'] },
    core: 'core_foundation', crew: ['crew_schedule'],
  },
  {
    name: 'schedules + staff turnover -> turnover adds no module',
    answers: { locations: '2', team_size: 'up_to_15', paper_processes: ['schedules'], team_costs: ['turnover'] },
    core: 'core_foundation', crew: ['crew_starter'],
  },
];

for (const fixture of fixtures) {
  test(`rules: ${fixture.name}`, () => {
    const result = run(fixture.answers);
    const { recommendation: rec, report } = result;
    assert.equal(rec.corePackage, fixture.core);
    assert.deepEqual(crewNames(rec), fixture.crew);
    if ('watchtower' in fixture) assert.equal(rec.watchtower, fixture.watchtower);
    if ('foresight' in fixture) assert.equal(rec.foresight, fixture.foresight);
    if (fixture.quoted) {
      assert.equal(rec.price.kind, 'quoted');
      assert.equal(report.startingPackage.price.kind, 'quoted');
      assert.equal(report.startingPackage.price.label, 'Quoted for your estate');
    } else {
      assert.equal(rec.price.kind, 'list');
      if (fixture.total !== undefined) assert.equal(rec.price.total, fixture.total);
    }
    // Every report shows the four capabilities included with every Core package.
    assert.deepEqual(report.startingPackage.included.map((item) => item.name), ['Pulse', 'Benchmarks', 'Ask Sundae', 'Profit Recovery']);
    // Watchtower only with Growth/Performance, a competitor signal and 6+ locations (acceptance 3).
    const hasWatchtower = report.startingPackage.addOns.some((addOn) => addOn.name === 'Watchtower');
    assert.equal(hasWatchtower, rec.watchtower === 'scoped');
    if (hasWatchtower) {
      assert.ok(['core_growth', 'core_performance'].includes(rec.corePackage));
      assert.ok(rec.locations >= 6);
    }
    // Optional add-ons never enter the headline price.
    if (report.startingPackage.price.kind === 'list') {
      assert.equal(report.startingPackage.price.lines.length, rec.crew ? 2 : 1);
    }
    assertPriceMatchesCalculator(result);
  });
}

test('rules: every package covers every module its chips need', () => {
  const chips = Object.keys(LEAK_CORE_NEEDS);
  for (let mask = 1; mask < 1 << chips.length; mask += 1) {
    const selected = chips.filter((_, index) => mask & (1 << index));
    const needs = new Set(selected.flatMap((chip) => LEAK_CORE_NEEDS[chip]));
    const pkg = CORE_PACKAGE_FACTS[pickCorePackage(needs)];
    for (const need of needs) {
      if (need === 'watchtower') continue;
      if (need === 'foresight' && !pkg.includedModuleIds.includes('foresight')) continue; // offered as an add-on
      assert.ok(pkg.includedModuleIds.includes(need), `${pkg.name} must include ${need} for ${selected.join('+')}`);
    }
  }
});

test('rules: price comes from the exact location count, never a band midpoint', () => {
  for (const count of [1, 2, 7, 15, 16, 33, 50, 51, 100, 101, 249]) {
    const result = run({ locations: String(count), paper_processes: ['schedules', 'payroll_prep'], team_costs: ['overtime'], money_leaks: ['food_cost'] });
    assert.equal(result.recommendation.locations, count);
    assert.equal(result.recommendation.price.kind, 'list');
    assertPriceMatchesCalculator(result);
  }
  assert.equal(run({ locations: '250' }).recommendation.price.kind, 'quoted');
  // Local digits are read as the same exact count.
  assert.equal(run({ locations: '١٢' }).recommendation.locations, 12);
});

test('rules: Foresight & Action above its published bands is quoted, not extrapolated', () => {
  const { report } = run({ locations: '120', money_leaks: ['labor_vs_demand', 'planning'] });
  const foresight = report.startingPackage.addOns.find((addOn) => addOn.name === 'Foresight & Action');
  assert.equal(foresight.price, null);
  assert.match(foresight.detail, /quoted/i);
});

test('rules: concept modules are listed but never priced in the headline', () => {
  const { report, recommendation } = run({ concepts: ['hotel_fb', 'franchise', 'catering', 'central_kitchen', 'cloud_kitchen'], locations: '4' });
  assert.deepEqual(new Set(report.startingPackage.concepts), new Set(['Hotel F&B', 'Franchise', 'Catering', 'Production', 'Cloud Kitchen']));
  assert.equal(recommendation.price.total, 1195 + 3 * 175);
  const intent = decodePricingIntent(new URL(report.startingPackage.calculatorUrl).searchParams.get('cfg'));
  assert.deepEqual(intent.addOns, []);
  assert.deepEqual(new Set(intent.operatingModels), new Set(['hotel_fb', 'franchise', 'catering', 'production', 'cloud_kitchen']));
});

test('rules: no Crew needs and an HR system -> no Crew line, Crew is optional', () => {
  const { report } = run({ paper_processes: ['none'], other_systems: ['hr_payroll'] });
  assert.equal(report.crew, null);
  assert.equal(report.startingPackage.crew, null);
  assert.ok(report.startingPackage.notes.some((note) => /Crew is optional - you can keep your HR system/.test(note)));
});

test('rules: Crew notes reuse the shared package wording', () => {
  const { report } = run({ paper_processes: ['tips', 'logbook', 'payroll_prep'], team_costs: ['none'], payroll_countries: ['AE'], other_systems: ['hr_payroll'] });
  assert.deepEqual(report.crew.notes, [
    'Payroll availability is confirmed for your country before setup.',
    'Tip workflows are in Crew Operating and Crew Complete, or with Crew Payroll.',
    'Tasks and the logbook are in Crew Operating and Crew Complete.',
    'Crew is optional - you can keep your HR system.',
  ]);
  assert.match(report.startingPackage.notes.join(' '), /standard staff allowance per location/);
});

test('rules: a hidden answer cannot change the recommendation', () => {
  // team_costs is not asked when nothing runs on paper; a stale answer is ignored.
  const { recommendation } = run({ paper_processes: ['none'], team_costs: ['overtime', 'payroll_errors'] });
  assert.equal(recommendation.crew, null);
});

test('rules: hypotheses come from turns 8-9, at most three, defaults when none', () => {
  const flagged = run({ paper_processes: ['schedules'], team_costs: ['overtime'], money_leaks: ['supplier_prices', 'voids_discounts', 'menu_margins'] }).report;
  assert.deepEqual(flagged.topLeaks.map((leak) => leak.id), ['voids_discounts', 'overtime', 'supplier_prices']);
  assert.equal(flagged.recovery.items.length, 3);
  const none = run({}).report;
  assert.deepEqual(none.topLeaks.map((leak) => leak.id), ['labor_vs_demand', 'voids_discounts']);
});

test('rules: Profit Recovery is explained for every hypothesis without an amount', () => {
  for (const measure of ['next_pnl', 'spreadsheet', 'baseline', 'dont_know']) {
    const { report } = run({ measure_fix: measure, money_leaks: ['labor_vs_demand', 'food_cost', 'delivery_commissions'] });
    assert.equal(report.recovery.items.length, report.topLeaks.length);
    for (const item of report.recovery.items) {
      for (const field of ['watch', 'data', 'owner', 'measure']) assert.ok(item[field].length > 10, `${item.leakId}.${field}`);
    }
    const text = JSON.stringify(report.recovery);
    assert.doesNotMatch(text, /[$€£%]|\d+\s?(k|m)\b/i);
  }
  assert.match(run({ measure_fix: 'next_pnl' }).report.recovery.intro, /^Today you check next month's P&L\./);
});

test('rules: report text never carries placeholder money tiles or soft uplifts', () => {
  const { report } = run({ locations: '12', money_leaks: ['food_cost', 'guest_retention'], paper_processes: ['schedules'], team_costs: ['turnover'] });
  assert.equal('economics' in report, false);
  assert.doesNotMatch(JSON.stringify(report), /EBITDA|Current spend|uplift|cuts churn|Signal-to-action/i);
});

test('rules: every locale gets a complete, localized rules report', async () => {
  const { websiteLocales } = await import('../src/lib/i18n.ts');
  const answers = { locations: '12', money_leaks: ['food_cost', 'guest_retention', 'planning'], paper_processes: ['schedules', 'tips'], team_costs: ['overtime'], payroll_countries: ['AE'] };
  const english = run(answers, 'en').report;
  for (const locale of websiteLocales) {
    const { report } = run(answers, locale);
    assert.equal(report.locale, locale);
    assert.equal(report.tierFit, english.tierFit);
    assert.equal(report.topLeaks.length, english.topLeaks.length);
    assert.ok(report.summary.length > 20);
    if (locale !== 'en') assert.notEqual(report.topLeaks[0].title, english.topLeaks[0].title, `${locale} should not fall back to English`);
  }
});

test('rules: Foresight in Core Performance is shown as included, not as an optional add-on', () => {
  const { report } = run({ locations: '8', money_leaks: ['food_cost', 'reservations_noshows', 'planning'] });
  assert.equal(report.startingPackage.foresight, 'included');
  assert.equal(report.startingPackage.addOns.some((addOn) => addOn.name === 'Foresight & Action'), false);
  assert.ok(report.startingPackage.core.covers.includes('Foresight'));
  assert.ok(report.startingPackage.notes.includes('Foresight & Action: Included in Core Performance.'));
});

test('rules: a quoted priority never ends in a doubled full stop', () => {
  const { report } = run({ priority: 'Get overtime under control.' });
  assert.match(report.summary, /"Get overtime under control" - sets the first step\./);
  assert.doesNotMatch(report.quickWins[0].detail, /\.\"\./);
});
