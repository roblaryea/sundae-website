import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'

const root = process.cwd()
const indexNowKey = '408c48955561055aa412e31d996a7526'

test('IndexNow key is publicly verifiable and priority submission stays on the canonical host', () => {
  const keyFile = fs.readFileSync(path.join(root, `public/${indexNowKey}.txt`), 'utf8').trim()
  assert.equal(keyFile, indexNowKey)

  const output = execFileSync(
    process.execPath,
    ['scripts/submit-indexnow.mjs', '--dry-run'],
    { cwd: root, encoding: 'utf8' },
  )
  const report = JSON.parse(output)

  assert.equal(report.host, 'www.sundae.io')
  assert.equal(report.keyLocation, `https://www.sundae.io/${indexNowKey}.txt`)
  assert.ok(report.urls.includes('https://www.sundae.io/product/recovery'))
  assert.ok(report.urls.includes('https://www.sundae.io/blog/restaurant-benchmarking-methodology'))
  assert.ok(report.urls.every((value) => new URL(value).host === 'www.sundae.io'))
})

test('search discovery workflow monitors production and notifies IndexNow', () => {
  const workflow = fs.readFileSync(path.join(root, '.github/workflows/search-discovery.yml'), 'utf8')
  assert.match(workflow, /schedule:/)
  assert.match(workflow, /report-sitemap-inventory\.mjs/)
  assert.match(workflow, /submit-indexnow\.mjs --wait-for-key/)
})

test('benchmark methodology article links evidence to the relevant product and readiness tool', () => {
  const source = fs.readFileSync(path.join(root, 'src/content/blog/en.ts'), 'utf8')
  const llms = fs.readFileSync(path.join(root, 'public/llms.txt'), 'utf8')
  assert.match(source, /slug: "restaurant-benchmarking-methodology"/)
  assert.match(source, /\[free Benchmark Readiness Score\]\(\/tools\/benchmark-readiness\)/)
  assert.match(source, /\[Sundae restaurant benchmarking software\]\(\/product\/benchmarking\)/)
  assert.match(llms, /https:\/\/www\.sundae\.io\/blog\/restaurant-benchmarking-methodology/)
})

test('unsupported legacy research is withdrawn from discovery and redirected to methodology', () => {
  const evidencePolicy = fs.readFileSync(path.join(root, 'src/lib/blogEvidence.ts'), 'utf8')
  const translations = fs.readFileSync(path.join(root, 'src/lib/blogTranslations.ts'), 'utf8')
  const articlePage = fs.readFileSync(path.join(root, 'src/app/blog/[slug]/page.tsx'), 'utf8')
  const proxy = fs.readFileSync(path.join(root, 'src/proxy.ts'), 'utf8')

  for (const slug of [
    '2026-state-of-restaurant-intelligence',
    'gcc-restaurant-benchmarks-2026',
    'labor-benchmarks-gcc',
  ]) {
    assert.match(evidencePolicy, new RegExp(`['"]${slug}['"]`))
  }

  assert.match(evidencePolicy, /BLOG_EVIDENCE_REVIEW_REDIRECT = '\/blog\/restaurant-benchmarking-methodology'/)
  assert.match(translations, /filter\(\(post\) => !requiresBlogEvidenceReview\(post\.slug\)\)/)
  assert.match(articlePage, /permanentRedirect\(getLocalizedPathname\(BLOG_EVIDENCE_REVIEW_REDIRECT, locale\)\)/)
  assert.match(proxy, /requiresBlogEvidenceReview\(blogSlug\)/)
  assert.match(proxy, /NextResponse\.redirect\(redirectUrl, 308\)/)
})
