import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'
import vm from 'node:vm'
import ts from 'typescript'

const directory = 'src/content/operator-workflows'
const english = JSON.parse(fs.readFileSync(`${directory}/en.json`, 'utf8'))
const locales = ['en', 'ar', 'fr', 'es', 'de', 'nl', 'pt', 'hi', 'ur', 'it', 'pl', 'tr', 'zh-Hans', 'ja', 'ko', 'id', 'vi', 'ro', 'sv', 'bn', 'th', 'ms']
const brandEmphasis = JSON.parse(fs.readFileSync('src/content/brand-emphasis.json', 'utf8'))
const platformStory = JSON.parse(fs.readFileSync('src/content/platform-story.json', 'utf8'))

test('brand accents match authored phrases in every supported language', () => {
  assert.deepEqual(Object.keys(brandEmphasis).sort(), [...locales].sort())
  for (const locale of locales) {
    const copy = JSON.parse(fs.readFileSync(`${directory}/${locale}.json`, 'utf8'))
    const titles = ['restaurant-management-platform', 'restaurant-task-management', 'restaurant-logbook', 'restaurant-tip-management'].map(slug => copy.pages[slug].title)
    titles.push(copy.comparison.title, platformStory[locale].coreRole, platformStory[locale].crewRole, copy.brand.editorialHeadline)
    assert.equal(brandEmphasis[locale].length, titles.length, locale)
    titles.forEach((title, i) => assert.ok(brandEmphasis[locale][i] && title.includes(brandEmphasis[locale][i]), `${locale}.${i}: headline copy changed without reviewing its accent`))
  }
})
function compare(base, translated, key = '') {
  if (typeof base === 'string') {
    assert.equal(typeof translated, 'string', key)
    assert.ok(translated.trim(), key)
    if (base.startsWith('/')) assert.equal(translated, base, key)
    return
  }
  if (Array.isArray(base)) {
    assert.equal(translated.length, base.length, key)
    base.forEach((v, i) => compare(v, translated[i], `${key}.${i}`))
    return
  }
  assert.deepEqual(Object.keys(translated).sort(), Object.keys(base).sort(), key)
  for (const child of Object.keys(base)) compare(base[child], translated[child], `${key}.${child}`)
}
for (const locale of locales) {
  test(`${locale}: every workflow, FAQ, table, CTA and metadata entry is complete`, () => {
    const copy = JSON.parse(fs.readFileSync(`${directory}/${locale}.json`, 'utf8'))
    compare(english, copy)
    assert.equal((copy.shared.creamStatement.match(/\*/g) || []).length, 2)
    if (locale === 'en') return
    for (const slug of Object.keys(copy.pages)) {
      for (const field of ['title', 'description', 'metaTitle', 'metaDescription']) {
        assert.notEqual(copy.pages[slug][field], english.pages[slug][field], `${locale}.${slug}.${field}: English fallback`)
      }
      for (let i = 0; i < copy.pages[slug].questions.length; i++) {
        assert.notEqual(copy.pages[slug].questions[i].answer, english.pages[slug].questions[i].answer)
      }
    }
    for (const field of ['primaryCta', 'problemTitle', 'faqTitle', 'ctaTitle']) assert.notEqual(copy.shared[field], english.shared[field])
    for (const field of ['title', 'description', 'productMetaTitle', 'coreMetaTitle', 'crewMetaTitle']) assert.notEqual(copy.brand[field], english.brand[field])
    for (const [slug, page] of Object.entries(copy.pages)) {
      for (let i = 0; i < page.related.length; i++) {
        const base = english.pages[slug].related[i].label
        if (['Sundae', 'Sundae Crew', 'Ask Sundae', 'Profit Recovery'].includes(base)) continue
        assert.notEqual(page.related[i].label, base, `${locale}.${slug}.related.${i}: English descriptor`)
      }
    }
    copy.comparison.sourceLabels.forEach((label, i) => assert.notEqual(label, english.comparison.sourceLabels[i]))
    assert.notEqual(copy.comparison.title, english.comparison.title)
    assert.notEqual(copy.comparison.questions[0].body, english.comparison.questions[0].body)
  })
}

const depthCopy = JSON.parse(fs.readFileSync('src/content/operator-depth.json', 'utf8'))
const continuationModule = { exports: {} }
vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/lib/operatorWorkflowContinuation.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
}).outputText, { module: continuationModule, exports: continuationModule.exports, require: specifier => {
  assert.equal(specifier, '@/content/operator-depth.json')
  return depthCopy
} })
const { getWorkflowContinuation } = continuationModule.exports

test('shared task proof does not replace the broad management proposition', () => {
  for (const locale of locales) {
    const original = JSON.parse(fs.readFileSync(`${directory}/${locale}.json`, 'utf8')).shared
    const fallback = { title: original.connectedTitle, body: original.connectedDescription }
    for (const slug of ['restaurant-management-platform', 'restaurant365-alternative', '', 'toString']) {
      assert.equal(getWorkflowContinuation(locale, slug, fallback), fallback, `${locale}/${slug}`)
    }
  }
})

test('specific workflow continuations stay attached to their exact page in all locales', () => {
  for (const locale of locales) {
    for (const [slug, key] of [['restaurant-task-management', 'tasks'], ['restaurant-logbook', 'logbook'], ['restaurant-tip-management', 'tips']]) {
      const actual = getWorkflowContinuation(locale, slug, { title: 'fallback', body: 'fallback' })
      assert.equal(actual.title, depthCopy[locale][`${key}Title`], `${locale}/${slug}`)
      assert.equal(actual.body, depthCopy[locale][`${key}Body`], `${locale}/${slug}`)
    }
  }
})

test('every published locale has the Foresight facts without a Spanish fallback', () => {
  assert.deepEqual(Object.keys(depthCopy).sort(), [...locales].sort())
  for (const locale of locales) {
    const facts = depthCopy[locale].foresightFacts
    for (const value of ['22', '14', '365', '32']) assert.ok(facts.includes(value), `${locale}: ${value}`)
    if (locale !== 'es') assert.notEqual(facts, depthCopy.es.foresightFacts, locale)
  }
})
