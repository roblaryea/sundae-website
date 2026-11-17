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
const { buildWatchtowerPricingUrl, WATCHTOWER_OPTIONS } = load('src/lib/pricingNavigation.ts')
const catalogue = load('src/lib/pricing/catalogSnapshot.json')
const { getLocalizedFaqSections } = load('src/content/faqContent.ts')
const commercial = load('src/content/commercial-copy.json')
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
