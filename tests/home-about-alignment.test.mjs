import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'

const locales = ['en', 'de', 'ar', 'fr', 'es', 'it', 'pt', 'nl', 'pl', 'ro', 'sv', 'tr', 'hi', 'bn', 'ur', 'zh-Hans', 'ja', 'ko', 'id', 'ms', 'vi', 'th']
const source = Object.fromEntries(locales.map(locale => [locale, JSON.parse(fs.readFileSync(`src/content/operator-workflows/${locale}.json`, 'utf8')).brand]))
const signature = JSON.parse(fs.readFileSync('src/content/brand-signature.json', 'utf8'))

test('Home and About alignment is authored for every marketing locale', () => {
  assert.deepEqual(Object.keys(source).sort(), [...locales].sort())
  const keys = ['homeHeadline', 'homeTagline', 'homeOutcome', 'eyebrow', 'sub', 'homeLiveTitleTop', 'homeLiveTitleBottom', 'homeLiveSupport', 'editorialHeadline', 'editorialSupport']
  for (const locale of locales) {
    for (const key of keys) {
      assert.equal(typeof source[locale][key], 'string', `${locale}.${key}`)
      assert.ok(source[locale][key].trim(), `${locale}.${key}`)
      assert.ok(!source[locale][key].includes('—'), `${locale}.${key} contains em dash`)
      if (locale !== 'en') assert.notEqual(source[locale][key], source.en[key], `${locale}.${key}: English fallback`)
    }
    assert.notEqual(source[locale].homeHeadline, source[locale].homeLiveTitleTop, `${locale}: hero/live duplicate`)
    assert.notEqual(source[locale].homeHeadline, source[locale].editorialHeadline, `${locale}: hero/editorial duplicate`)
    assert.notEqual(source[locale].homeLiveTitleTop, source[locale].editorialHeadline, `${locale}: live/editorial duplicate`)
  }
})

test('Home and generic metadata share the approved three-part signature in every locale', () => {
  assert.deepEqual(Object.keys(signature).sort(), [...locales].sort())
  assert.deepEqual(signature.en, {
    headline: 'Connected Operations.',
    decision: 'Informed Decisions.',
    outcome: 'Recovered Profit.',
    support: 'Sundae connects your teams, daily work and operating data with market context to explain what changed, guide action and measure what you recover.',
  })
  const generated = fs.readFileSync('src/content/operator-workflows/navigation.ts', 'utf8')
  const navigation = JSON.parse(generated.slice(generated.indexOf('{'), generated.lastIndexOf('}') + 1))
  for (const locale of locales) {
    const brand = source[locale]
    assert.equal(brand.homeHeadline, signature[locale].headline, `${locale}: connected operations`)
    assert.equal(brand.homeTagline, signature[locale].decision, `${locale}: informed decisions`)
    assert.equal(brand.homeOutcome, signature[locale].outcome, `${locale}: recovered profit`)
    assert.equal(brand.sub, signature[locale].support, `${locale}: support`)
    assert.equal(brand.description, signature[locale].support, `${locale}: generic metadata`)
    assert.deepEqual(navigation[locale].brand, brand, `${locale}: stale generated brand`)
  }
})
