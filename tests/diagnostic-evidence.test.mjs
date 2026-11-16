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
const priceBook = loadTypeScript('../src/lib/pricing/priceBook.ts');
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
