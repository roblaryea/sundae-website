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
  assert.ok(report.urls.includes('https://www.sundae.io/blog/restaurant-demand-forecasting-guide'))
  assert.ok(report.urls.includes('https://www.sundae.io/blog/real-time-restaurant-operations-guide'))
  assert.ok(report.urls.includes('https://www.sundae.io/blog/restaurant-competitor-intelligence-guide'))
  assert.ok(report.urls.every((value) => new URL(value).host === 'www.sundae.io'))
})

test('authority guides support distinct product intents and bidirectional internal links', () => {
  const source = fs.readFileSync(path.join(root, 'src/content/blog/en.ts'), 'utf8')
  const llms = fs.readFileSync(path.join(root, 'public/llms.txt'), 'utf8')
  const routes = [
    ['restaurant-demand-forecasting-guide', 'foresight'],
    ['real-time-restaurant-operations-guide', 'pulse'],
    ['restaurant-competitor-intelligence-guide', 'watchtower'],
  ]

  for (const [slug, product] of routes) {
    assert.match(source, new RegExp(`slug: "${slug}"`))
    assert.match(source, new RegExp(`\\]\\(\\/product\\/${product}\\)`))
    assert.match(llms, new RegExp(`https:\\/\\/www\\.sundae\\.io\\/blog\\/${slug}`))

    const productPage = fs.readFileSync(
      path.join(root, `src/app/product/${product}/page.tsx`),
      'utf8',
    )
    assert.match(productPage, new RegExp(`href="\\/blog\\/${slug}"`))
    assert.match(productPage, /locale === 'en'/)
  }
})

test('blog copy QA scans the source catalogue rather than its re-export shim', () => {
  const qa = fs.readFileSync(path.join(root, 'scripts/qa-blog-copy.mjs'), 'utf8')
  assert.match(qa, /src\/content\/blog\/en\.ts/)
  assert.doesNotMatch(qa, /src\/lib\/blogData\.ts/)
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

test('localized solution routes derive metadata from their translated page copy', () => {
  const routes = [
    '',
    'cloud-kitchens',
    'finance-teams',
    'franchises',
    'hospitality-operators',
    'hr-teams',
    'marketing-teams',
    'regional-managers',
    'technology-teams',
  ]

  for (const route of routes) {
    const layoutPath = path.join(root, 'src/app/solutions', route, 'layout.tsx')
    const source = fs.readFileSync(layoutPath, 'utf8')

    assert.doesNotMatch(source, /export const metadata/)
    assert.match(source, /export async function generateMetadata/)
    assert.match(source, /resolveWebsiteLocale\(await cookies\(\)\)/)
    assert.match(source, /buildSolutionPageMetadata/)
    assert.match(source, /generatedLocalCopy: generatedLocalCopy\.localizedCopy/)
  }
})

test('every localized solution layout emits page-specific social metadata', () => {
  for (const route of ['c-suite-executives', 'multi-location-groups']) {
    const source = fs.readFileSync(
      path.join(root, 'src/app/solutions', route, 'layout.tsx'),
      'utf8',
    )

    assert.match(source, /buildResolvedPageMetadata/)
    assert.match(source, new RegExp(`pathname: ["']\\/solutions\\/${route}["']`))
  }
})

test('Crew workforce pages expose localized metadata and AI discovery links', () => {
  const routes = ['', 'scheduling', 'time-attendance', 'payroll', 'people', 'people-intelligence']
  const llms = fs.readFileSync(path.join(root, 'public/llms.txt'), 'utf8')

  for (const route of routes) {
    const layoutPath = path.join(root, 'src/app/crew', route, 'layout.tsx')
    const source = fs.readFileSync(layoutPath, 'utf8')
    const pathname = route ? `/crew/${route}` : '/crew'

    assert.match(source, /buildCrewPageMetadata/)
    assert.match(source, /resolveWebsiteLocale\(await cookies\(\)\)/)
    assert.match(source, /generatedLocalCopy:/)
    assert.match(llms, new RegExp(`https:\\/\\/www\\.sundae\\.io${pathname.replaceAll('/', '\\/')}(?:\\)|:)`))
  }
})

test('AI discovery maps every decision-intelligence product and trust surface', () => {
  const llms = fs.readFileSync(path.join(root, 'public/llms.txt'), 'utf8')
  const routes = [
    '/core',
    '/product/pulse',
    '/product/benchmarking',
    '/product/foresight',
    '/product/watchtower',
    '/product/insights',
    '/product/cross-intelligence',
    '/product/recovery',
    '/product/intelligence',
    '/integrations',
    '/architecture',
    '/security',
    '/4d-intelligence',
  ]

  for (const route of routes) {
    assert.match(llms, new RegExp(`https:\\/\\/www\\.sundae\\.io${route.replaceAll('/', '\\/')}(?:\\)|:)`))
  }
})

test('central metadata gives discovery routes specific descriptions and social titles', () => {
  const titles = fs.readFileSync(path.join(root, 'src/lib/pageTitles.ts'), 'utf8')
  const layout = fs.readFileSync(path.join(root, 'src/app/layout.tsx'), 'utf8')

  for (const route of [
    '/product',
    '/product/foresight',
    '/product/insights',
    '/product/benchmarking',
    '/core',
    '/4d-intelligence',
    '/architecture',
    '/modules',
    '/security',
    '/resources',
    '/docs',
  ]) {
    assert.match(titles, new RegExp(`['"]${route.replaceAll('/', '\\/')}['"]:\\s*`))
  }

  assert.match(layout, /openGraph:[\s\S]*?title: routeTitle \?\? messages\.metadata\.title/)
  assert.match(layout, /twitter:[\s\S]*?title: routeTitle \?\? messages\.metadata\.title/)
  assert.match(titles, /resolveLocalizedPageDescription\(path, locale\) \?\? englishDescription/)
})

test('structured data connects the platform to its shipped product entities', () => {
  const layout = fs.readFileSync(path.join(root, 'src/app/layout.tsx'), 'utf8')

  assert.match(layout, /const softwareId = new URL\("\/product#software"/)
  assert.match(layout, /hasPart: productEntities\.map/)
  assert.match(layout, /isPartOf: \{ "@id": softwareId \}/)
  for (const name of [
    'Sundae Pulse',
    'Sundae Benchmarking',
    'Sundae Foresight',
    'Sundae Watchtower',
    'Sundae Insights',
    'Sundae Cross-Intelligence',
    'Sundae Profit Recovery',
    'Ask Sundae',
    'Sundae Crew',
  ]) {
    assert.match(layout, new RegExp(`name: ["']${name}["']`))
  }
})

test('documentation renders its localized client hook on the client boundary', () => {
  const docs = fs.readFileSync(path.join(root, 'src/app/docs/page.tsx'), 'utf8')

  assert.match(docs, /^['"]use client['"];/)
  assert.match(docs, /useWebsiteI18n\(\)/)
})

test('Crew conversion paths expose stable PostHog labels', () => {
  const hub = fs.readFileSync(path.join(root, 'src/app/crew/page.tsx'), 'utf8')
  const modulePage = fs.readFileSync(path.join(root, 'src/components/crew/CrewModulePage.tsx'), 'utf8')

  for (const label of ['crew_hub_hero_primary', 'crew_hub_closing_primary']) {
    assert.match(hub, new RegExp(`trackingLabel="${label}"`))
  }
  for (const label of ['crew_module_hero_primary', 'crew_module_closing_primary']) {
    assert.match(modulePage, new RegExp(`trackingLabel="${label}"`))
  }
})

test('shared solution CTAs expose stable conversion labels and context', () => {
  const source = fs.readFileSync(
    path.join(root, 'src/components/solutions/SolutionPageLayout.tsx'),
    'utf8',
  )

  for (const label of [
    'solution_hero_primary',
    'solution_hero_secondary',
    'solution_crew_crosslink',
    'solution_closing_primary',
  ]) {
    assert.match(source, new RegExp(`trackingLabel="${label}"`))
  }

  assert.match(source, /trackingMetadata=\{\{ section: "hero", destination: primaryCtaHref \}\}/)
  assert.match(source, /trackingMetadata=\{\{ section: "closing", destination: ctaButtonHref \}\}/)
})
