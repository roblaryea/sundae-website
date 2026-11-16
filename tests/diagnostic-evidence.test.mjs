import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import test from 'node:test';
import ts from 'typescript';

// Exercise the real engine and price book, resolving only its framework alias
// boundary. A rich intake must never turn a concern into a claimed pilot result.
const require = createRequire(import.meta.url);
function loadTypeScript(file, aliases = {}) {
  const fixtureModule = { exports: {} };
  const source = fs.readFileSync(new URL(file, import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  vm.runInNewContext(compiled, {
    module: fixtureModule, exports: fixtureModule.exports,
    require: name => name in aliases ? aliases[name] : require(name),
    console,
  }, { filename: file });
  return fixtureModule.exports;
}
const priceBook = loadTypeScript('../src/lib/pricing/priceBook.ts', { './catalogSnapshot.json': { default: JSON.parse(fs.readFileSync(new URL('../src/lib/pricing/catalogSnapshot.json', import.meta.url), 'utf8')) } });
const questions = loadTypeScript('../src/lib/diagnostic/questions.ts');
const fallback = loadTypeScript('../src/lib/diagnostic/fallbackFindings.ts');
const { runDiagnostic } = loadTypeScript('../src/lib/diagnostic/engine.ts', {
  '@/lib/i18n': { normalizeWebsiteLocale: value => value || 'en' },
  '@/lib/pricing/priceBook': priceBook,
  './questions': questions,
  './fallbackFindings': fallback,
});

test('rich diagnostic answers produce validation measures and exact list pricing, never invented returns', () => {
  const result = runDiagnostic({
    segment: ['casual'], outlets: '6_15', region: ['uae'],
    labor_pain: ['overstaffing', 'ot_leakage'],
    kpis_wished: ['real_time_margin', 'guest_retention', 'forecast_per_outlet'],
    scheduling_tool: ['manual'], forecasting: 'lyear_gut', pos: ['micros'],
    avg_unit_volume: '1m_2m', budget_band: '100_250k', tech_headcount: 'two_three',
    priority: 'Improve shift handovers.',
  });
  const outcomes = JSON.stringify({ findings: result.topLeaks, measures: result.expectedImpact, currentSpend: result.economics.currentSpend, benefit: result.economics.ebitdaUplift });
  assert.doesNotMatch(outcomes, /\d+\s*(?:-|–|to)\s*\d+\s*%|margin points|across pilots|similar profiles|typically recover/i);
  assert.match(result.economics.currentSpend.net, /No saving is established/);
  assert.equal(result.economics.ebitdaUplift.pctRange, 'Not estimated');
  assert.match(result.economics.monthlyCost.range, /at list$/);
  assert.equal(result.expectedImpact.length >= 2, true);
  assert.equal(result.expectedImpact.length <= 4, true);
});

test('sparse diagnostic answers still provide two measurements without forecasting a result', () => {
  const result = runDiagnostic({segment: ['cafe'], outlets: '1', region: ['uae'], labor_pain: ['none'], priority: 'Establish a shared operating view.'});
  assert.equal(result.expectedImpact.length >= 2, true);
  assert.doesNotMatch(JSON.stringify(result.expectedImpact), /\d+%/);
  assert.equal(result.economics.ebitdaUplift.pctRange, 'Not estimated');
});

test('Crew scales with locations and Performance does not charge again for included Foresight', () => {
  const result = runDiagnostic({ outlets: '6_15', labor_pain: ['overstaffing'], scheduling_tool: ['manual'],
    kpis_wished: ['real_time_margin', 'guest_retention'], forecasting: 'none', priority: 'Control labor and retain guests.' });
  assert.equal(result.recommendedStack[0].detail, 'Core Performance');
  // 10 locations: Core 2980 + 9×409, Crew Schedule 179 + 9×39.
  // Foresight is in Performance's included module IDs, so it adds no second fee.
  assert.equal(result.economics.monthlyCost.range, '$7,191 / mo at list');
  assert.doesNotMatch(result.recommendedStack[0].why, /eleven|replaces.*entirely/i);
  assert.match(result.economics.monthlyCost.basis, /before discounts, implementation fees, taxes/);
});

test('published larger-group bands and per-product ceilings are respected', () => {
  const foundation = priceBook.CORE_PACKAGES_BY_ID.core_foundation;
  const fifty = priceBook.bandedMonthlyTotal(foundation, 50).monthlyTotal;
  assert.equal(priceBook.bandedMonthlyTotal(foundation, 51).monthlyTotal - fifty, 115);
  assert.equal(priceBook.bandedMonthlyTotal(foundation, 250).beyondBandedRange, true);
  assert.equal(priceBook.bandedMonthlyTotal(priceBook.FORESIGHT_AND_ACTION, 101).beyondBandedRange, true);
  assert.deepEqual(Array.from(foundation.includedModuleIds), ['labor', 'profit', 'revenue_assurance', 'pulse']);
});
