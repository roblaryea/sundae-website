import fs from 'node:fs/promises'
import assert from 'node:assert/strict'
import { chromium } from '@playwright/test'

const base = process.env.SMOKE_BASE_URL || 'http://localhost:3149'
const locales = ['en', 'ar', 'fr', 'es', 'de', 'nl', 'pt', 'hi', 'ur', 'it', 'pl', 'tr', 'zh-Hans', 'ja', 'ko', 'id', 'vi', 'ro', 'sv', 'bn', 'th', 'ms']
const browser = await chromium.launch()
const results = []
const jobs = []
for (const locale of locales) {
  const copy = JSON.parse(await fs.readFile(`src/content/operator-workflows/${locale}.json`, 'utf8'))
  for (const [slug, page] of [...Object.entries(copy.pages), ['restaurant365-alternative', copy.comparison]]) {
    jobs.push({ locale, slug, page, shared: copy.shared })
  }
}
try {
  await Promise.all(Array.from({ length: 3 }, async () => {
    while (jobs.length) {
      const { locale, slug, page: copy, shared } = jobs.shift()
      const path = `${locale === 'en' ? '' : `/${locale}`}/${slug}`
      const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' })
      const errors = []
      page.on('pageerror', (error) => errors.push(error.message))
      await page.context().addCookies([{ name: 'sundae_cookie_consent', value: 'declined', url: base }])
      const response = await page.goto(`${base}${path}`, { waitUntil: 'domcontentloaded', timeout: 30000 })
      assert.equal(response.status(), 200, path)
      await page.locator('h1').waitFor({ state: 'visible' })
      await page.waitForTimeout(700)
      assert.equal(await page.locator('h1').innerText(), copy.title, path)
      assert.equal(await page.title(), copy.metaTitle, path)
      assert.equal(await page.locator('html').getAttribute('lang'), locale, path)
      assert.equal(await page.locator('html').getAttribute('dir'), ['ar', 'ur'].includes(locale) ? 'rtl' : 'ltr', path)
      assert.equal(new URL(await page.locator('link[rel="canonical"]').getAttribute('href')).pathname, path)
      const faq = await page.locator('script[type="application/ld+json"]').evaluateAll(nodes => nodes.map(n => JSON.parse(n.textContent)).find(s => s['@type'] === 'FAQPage'))
      assert.equal(faq.mainEntity[0].name, copy.questions[0].question || copy.questions[0].title)
      assert.equal(faq.mainEntity[0].acceptedAnswer.text, copy.questions[0].answer || copy.questions[0].body)
      const demo = page.locator(`a[href="${locale === 'en' ? '' : `/${locale}`}/demo"]`).filter({ hasText: slug === 'restaurant365-alternative' ? copy.primaryCta : shared.primaryCta }).first()
      assert.equal(await demo.locator('button').count(), 0, 'CTA is one semantic anchor')
      const box = await demo.boundingBox()
      assert.ok(box && box.x >= -1 && box.x + box.width <= 391, `${path}: CTA clips`)
      const clippedActions = await page.locator('a').evaluateAll(nodes => nodes.filter(n => n.className.includes('rounded-xl') && n.getBoundingClientRect().width && n.scrollWidth > n.clientWidth + 1).map(n => n.textContent))
      assert.deepEqual(clippedActions, [], `${path}: action text overflows`)
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${path}: horizontal overflow`)
      assert.deepEqual(errors, [], path)
      results.push({ path, status: response.status(), locale, title: copy.metaTitle, errors })
      await page.close()
    }
  }))
  await fs.mkdir('output/playwright', { recursive: true })
  await fs.writeFile('output/playwright/operator-workflows-smoke.json', JSON.stringify({ base, checkedAt: new Date().toISOString(), pages: results.length, results }, null, 2))
  console.log(`${results.length} rendered workflow routes passed: body, metadata, schema, local links, mobile CTAs, RTL and browser errors.`)
} finally { await browser.close() }
