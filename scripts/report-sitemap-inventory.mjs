const DEFAULT_SITEMAP_URL = 'https://www.sundae.io/sitemap.xml'
const sitemapUrl = new URL(process.env.SITEMAP_URL || process.argv[2] || DEFAULT_SITEMAP_URL)
const knownLocales = new Set([
  'ar', 'fr', 'es', 'de', 'nl', 'pt', 'hi', 'ur', 'it', 'pl', 'tr', 'zh-Hans',
  'ja', 'ko', 'id', 'vi', 'ro', 'sv', 'bn', 'th', 'ms',
])

function decodeXml(value) {
  return value.replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>')
}

function increment(record, key) {
  record[key] = (record[key] || 0) + 1
}

const response = await fetch(sitemapUrl, { cache: 'no-store' })
if (!response.ok) throw new Error(`Unable to fetch ${sitemapUrl}: HTTP ${response.status}`)

const xml = await response.text()
const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => decodeXml(match[1]))
const uniqueUrls = new Set(urls)
const byLocale = {}
const byType = {}
const failures = []

for (const value of urls) {
  const url = new URL(value)
  if (url.host !== sitemapUrl.host) failures.push(`off-host URL: ${value}`)
  if (url.protocol !== 'https:') failures.push(`non-HTTPS URL: ${value}`)

  const segments = url.pathname.split('/').filter(Boolean)
  const locale = knownLocales.has(segments[0]) ? segments.shift() : 'en'
  const first = segments[0]
  const type = first === 'blog'
    ? 'blog'
    : first === 'product'
      ? 'product'
      : first === 'solutions'
        ? 'solutions'
        : first === 'tools'
          ? 'tools'
          : first === 'crew'
            ? 'crew'
            : 'core'

  increment(byLocale, locale)
  increment(byType, type)
}

if (urls.length !== uniqueUrls.size) failures.push(`${urls.length - uniqueUrls.size} duplicate URL(s)`)
if (Object.keys(byLocale).length !== 22) failures.push(`expected 22 locales, found ${Object.keys(byLocale).length}`)
if (!urls.includes('https://www.sundae.io/product/recovery')) failures.push('missing priority URL: /product/recovery')
if (!urls.includes('https://www.sundae.io/diagnostic')) failures.push('missing priority URL: /diagnostic')

const report = {
  checkedAt: new Date().toISOString(),
  sitemap: sitemapUrl.toString(),
  total: urls.length,
  unique: uniqueUrls.size,
  byLocale: Object.fromEntries(Object.entries(byLocale).sort(([a], [b]) => a.localeCompare(b))),
  byType: Object.fromEntries(Object.entries(byType).sort(([a], [b]) => a.localeCompare(b))),
  failures,
}

console.log(JSON.stringify(report, null, 2))
if (failures.length) process.exit(1)
