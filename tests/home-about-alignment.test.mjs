import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'

const locales = ['en', 'de', 'ar', 'fr', 'es', 'it', 'pt', 'nl', 'pl', 'ro', 'sv', 'tr', 'hi', 'bn', 'ur', 'zh-Hans', 'ja', 'ko', 'id', 'ms', 'vi', 'th']
const source = Object.fromEntries(locales.map(locale => [locale, JSON.parse(fs.readFileSync(`src/content/operator-workflows/${locale}.json`, 'utf8')).brand]))

test('Home and About alignment is authored for every marketing locale', () => {
  assert.deepEqual(Object.keys(source).sort(), [...locales].sort())
  const keys = ['homeHeadline', 'homeTagline', 'eyebrow', 'sub', 'homeLiveTitleTop', 'homeLiveTitleBottom', 'homeLiveSupport', 'editorialHeadline', 'editorialSupport']
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
