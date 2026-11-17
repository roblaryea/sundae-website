import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import test from 'node:test'
import ts from 'typescript'

// Exercise the actual message merge: generated locale arrays previously restored retired products.
const loaded = new Map()
function load(file) {
  file = path.resolve(file)
  if (loaded.has(file)) return loaded.get(file)
  if (file.endsWith('.json')) return JSON.parse(fs.readFileSync(file, 'utf8'))
  const compiledModule = { exports: {} }
  loaded.set(file, compiledModule.exports)
  const requireLocal = specifier => {
    let target = specifier.startsWith('@/') ? path.resolve('src', specifier.slice(2)) : path.resolve(path.dirname(file), specifier)
    if (!path.extname(target)) target += '.ts'
    return load(target)
  }
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true, target: ts.ScriptTarget.ES2022 },
  }).outputText, { module: compiledModule, exports: compiledModule.exports, require: requireLocal, Intl, URL, URLSearchParams, TextEncoder, TextDecoder, btoa, atob, process: { env: {} } }, { filename: file })
  return compiledModule.exports
}
const { getWebsiteMessages, websiteLocales } = load('src/lib/i18n.ts')
const { decodePricingIntent } = load('src/lib/pricingIntent.ts')
const { buildWatchtowerPricingUrl, WATCHTOWER_OPTIONS, buildCrewCoverageUrl, buildCrewCapabilityUrl, buildCoreCoverageUrl } = load('src/lib/pricingNavigation.ts')
const { getCoreCoverageSummary } = load('src/lib/pricing/commercialCopy.ts')
const { crewWorkflowScope } = load('src/lib/crewWorkflowCoverage.ts')
const catalogue = load('src/lib/pricing/catalogSnapshot.json')
const { getLocalizedFaqSections } = load('src/content/faqContent.ts')
const commercial = load('src/content/commercial-copy.json')
test('Core coverage preserves distinct Margin/Growth domains and Delivery coverage', () => {
  const modules = Object.fromEntries(catalogue.tiers.map(t => [t.id, t.includedModuleIds]))
  assert.deepEqual(modules.foundation, ['labor', 'profit', 'revenue_assurance', 'pulse'])
  for (const id of ['margin', 'performance']) assert.ok(modules[id].includes('inventory') && modules[id].includes('purchasing'))
  assert.ok(!modules.growth.includes('inventory') && !modules.growth.includes('purchasing'))
  for (const id of ['margin', 'growth', 'performance']) assert.ok(modules[id].includes('delivery'))
  for (const id of ['foundation', 'margin', 'growth']) assert.ok(!modules[id].includes('foresight'))
  assert.ok(modules.performance.includes('foresight'))
})
test('Core package links select the exact package; optional Foresight is not charged again in Performance', () => {
  for (const tier of catalogue.tiers) for (const foresight of [false, true]) {
    const url = new URL(buildCoreCoverageUrl(`core_${tier.id}`, foresight))
    const intent = decodePricingIntent(url.searchParams.get('cfg'))
    assert.equal(intent.corePackage, `core_${tier.id}`)
    assert.equal(intent.layer, 'core')
    assert.equal(intent.locations, 1)
    assert.equal(intent.billingCycle, 'monthly')
    assert.equal(intent.crewSkus.length + intent.watchtowerModules.length, 0)
    assert.deepEqual([...intent.addOns], foresight && tier.id !== 'performance' ? ['foresight_action'] : [])
  }
})
test('Core package FAQs use the same localized coverage, common capabilities and limits', () => {
  for (const locale of websiteLocales) {
    const summary = getCoreCoverageSummary(locale)
    const sections = getLocalizedFaqSections(locale, [])
    assert.equal(sections.find(s => s.id === 'getting-started').faqs[3].content, summary)
    assert.equal(sections.find(s => s.id === 'products-tiers').faqs[1].content, summary)
    assert.equal(sections.find(s => s.id === 'use-cases').faqs[0].content, commercial[locale].coreLocationScope)
    assert.ok(!sections.find(s => s.id === 'use-cases').faqs[0].content.includes('same eleven modules'))
    for (const name of ['Pulse', 'Benchmarks', 'Ask Sundae', 'Profit Recovery', 'Core Foundation', 'Core Margin', 'Core Growth', 'Core Performance']) assert.ok(summary.includes(name))
    assert.ok(summary.includes(commercial[locale].coreUsageNote))
    if (locale !== 'en') assert.notEqual(commercial[locale].coreGrowthCoverage, commercial.en.coreGrowthCoverage)
  }
})
test('Crew feature estimates contain prerequisites rather than quoting an isolated component', () => {
  const cases = {
    crew_scheduling: ['crew_scheduling'],
    crew_tna: ['crew_scheduling', 'crew_tna'],
    crew_operations: ['crew_operations', 'crew_scheduling'],
    crew_payroll: ['crew_operations', 'crew_payroll', 'crew_scheduling'],
    crew_people_intelligence: ['crew_operations', 'crew_people_intelligence', 'crew_scheduling'],
  }
  for (const [sku, expected] of Object.entries(cases)) {
    const url = new URL(buildCrewCapabilityUrl(sku))
    const intent = decodePricingIntent(url.searchParams.get('cfg'))
    assert.equal(intent.layer, 'crew')
    assert.deepEqual([...intent.crewSkus].sort(), expected)
    assert.equal(intent.locations, 1)
    assert.equal(intent.billingCycle, 'monthly')
    assert.equal(intent.watchtowerModules.length + intent.addOns.length, 0)
  }
})
test('Crew workflow ownership does not follow reused product screenshots', () => {
  assert.equal(crewWorkflowScope('restaurant-task-management'), 'operations')
  assert.equal(crewWorkflowScope('restaurant-logbook'), 'operations')
  assert.equal(crewWorkflowScope('restaurant-tip-management'), 'payroll')
  for (const slug of ['restaurant-management-platform', 'restaurant365-alternative', 'core', '']) {
    assert.equal(crewWorkflowScope(slug), null)
  }
})
test('Crew coverage estimates match current bundles and include the Scheduling entitlement', () => {
  for (const option of ['operations', 'operating', 'complete']) {
    const url = new URL(buildCrewCoverageUrl(option))
    const intent = decodePricingIntent(url.searchParams.get('cfg'))
    assert.equal(url.origin, 'https://pricing.sundae.io')
    assert.equal(url.pathname, '/simulator')
    assert.equal(intent.layer, 'crew')
    assert.equal(intent.locations, 1)
    assert.equal(intent.billingCycle, 'monthly')
    assert.equal(intent.addOns.length + intent.watchtowerModules.length, 0)
    const expected = option === 'operations' ? ['crew_operations'] : catalogue.bundles.find(b => b.id === (option === 'complete' ? 'crew_complete_bundle' : 'crew_suite_bundle')).moduleIds
    assert.deepEqual([...intent.crewSkus].sort(), [...expected, 'crew_scheduling'].sort())
    assert.ok(intent.crewSkus.includes('crew_operations'))
    assert.equal(intent.crewSkus.includes('crew_payroll'), option !== 'operations')
    assert.equal(intent.crewSkus.includes('crew_people_intelligence'), option === 'complete')
  }
})
test('all languages retain the package names, exclusions and Payroll prerequisite', () => {
  for (const locale of websiteLocales) {
    const c = commercial[locale]
    for (const key of ['crewOperationsCoverage', 'crewPayrollCoverage']) {
      assert.ok(c[key].includes('Crew Operating') && c[key].includes('Crew Complete'))
      assert.ok(c[key].includes('Crew Operations'))
      if (locale !== 'en') assert.notEqual(c[key], commercial.en[key])
    }
    assert.ok(c.crewCoverageExclusions.includes('Crew Starter') && c.crewCoverageExclusions.includes('Schedule & Time'))
    assert.ok(c.crewHandoverCoverage.includes('Crew Operations'))
    assert.ok(c.crewEstimateNote.trim())
  }
})
test('all localized Watchtower FAQs state paid eligibility and preserve individual/bundle choice', () => {
  for (const locale of websiteLocales) {
    const section = getLocalizedFaqSections(locale, []).find(section => section.id === 'watchtower')
    assert.equal(section.faqs[1].content, commercial[locale].watchtowerEligibility)
    assert.equal(section.faqs[3].content, commercial[locale].watchtowerChoice)
    assert.equal(section.faqs[4].content, commercial[locale].watchtowerEligibility)
    if (locale !== 'en') assert.notEqual(commercial[locale].watchtowerEligibility, commercial.en.watchtowerEligibility)
  }
})
test('Watchtower links select a paid signal on an actually eligible Core package', () => {
  assert.deepEqual(catalogue.tiers.filter(tier => tier.allowsWatchtower).map(tier => tier.id), ['growth', 'performance'])
  for (const option of WATCHTOWER_OPTIONS) {
    const url = new URL(buildWatchtowerPricingUrl(option))
    assert.equal(url.origin, 'https://pricing.sundae.io')
    assert.equal(url.pathname, '/simulator')
    const intent = decodePricingIntent(url.searchParams.get('cfg'))
    assert.equal(intent.corePackage, 'core_growth')
    assert.equal(intent.layer, 'core')
    assert.deepEqual(Array.from(intent.watchtowerModules), [option])
    assert.equal(intent.crewSkus.length, 0)
  }
})
for (const locale of websiteLocales) test(`${locale}: pricing entries retain current product identities after translation overrides`, () => {
  const plans = getWebsiteMessages(locale).navbar.plansList
  for (const [index, layer] of ['core', 'crew'].entries()) {
    const url = new URL(plans[index].href)
    assert.equal(url.origin, 'https://pricing.sundae.io')
    assert.equal(url.pathname, '/simulator')
    const selection = decodePricingIntent(url.searchParams.get('cfg'))
    assert.equal(selection.layer, layer)
    assert.equal(selection.locations, 1)
    assert.equal(selection.billingCycle, 'monthly')
    assert.equal(selection.crewSkus.length > 0, layer === 'crew')
    if (layer === 'crew') assert.deepEqual(Array.from(selection.crewSkus), ['crew_operations', 'crew_scheduling', 'crew_tna', 'crew_payroll'])
  }
  assert.equal(plans[2].href, '/product/foresight')
  assert.deepEqual(Array.from(plans, entry => entry.name), ['Sundae Core', 'Sundae Crew', 'Foresight & Action'])
  assert.ok(plans.every(entry => typeof entry.description === 'string' && entry.description.trim()))
  assert.ok(plans.every(entry => !/Sundae Report/i.test(entry.name)))
})
