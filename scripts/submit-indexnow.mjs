import { sitemapStaticRoutes } from '../src/lib/sitemapInventory.mjs'

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'
const INDEXNOW_KEY = '408c48955561055aa412e31d996a7526'
const DEFAULT_SITE_URL = 'https://www.sundae.io'

const args = new Set(process.argv.slice(2))
const siteUrl = new URL(process.env.INDEXNOW_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL)
const keyLocation = new URL(`/${INDEXNOW_KEY}.txt`, siteUrl).toString()

function decodeXml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
}

async function waitForKey() {
  const attempts = Number(process.env.INDEXNOW_KEY_CHECK_ATTEMPTS || 30)

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(keyLocation, { cache: 'no-store' })
      const body = (await response.text()).trim()
      if (response.ok && body === INDEXNOW_KEY) return
    } catch {
      // Production may still be switching aliases. Retry below.
    }

    if (attempt < attempts) await new Promise((resolve) => setTimeout(resolve, 10_000))
  }

  throw new Error(`IndexNow key was not available at ${keyLocation}`)
}

async function sitemapUrls() {
  const sitemapUrl = new URL('/sitemap.xml', siteUrl)
  const response = await fetch(sitemapUrl, { cache: 'no-store' })
  if (!response.ok) throw new Error(`Unable to fetch ${sitemapUrl}: HTTP ${response.status}`)

  const xml = await response.text()
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => decodeXml(match[1]))
}

function priorityUrls() {
  const additionalPriorityPaths = [
    '/',
    '/blog/restaurant-benchmarking-methodology',
  ]
  return [...new Set([...additionalPriorityPaths, ...sitemapStaticRoutes])]
    .map((path) => new URL(path || '/', siteUrl).toString())
}

function validateUrls(urls) {
  const uniqueUrls = [...new Set(urls)]
  if (uniqueUrls.length === 0) throw new Error('No URLs selected for IndexNow submission')
  if (uniqueUrls.length > 10_000) throw new Error(`IndexNow accepts at most 10,000 URLs; received ${uniqueUrls.length}`)

  for (const value of uniqueUrls) {
    const url = new URL(value)
    if (url.host !== siteUrl.host) throw new Error(`Off-host URL cannot be submitted: ${value}`)
    if (url.protocol !== 'https:') throw new Error(`Only HTTPS production URLs may be submitted: ${value}`)
  }

  return uniqueUrls
}

if (args.has('--wait-for-key')) await waitForKey()

const urls = validateUrls(args.has('--all') ? await sitemapUrls() : priorityUrls())

if (args.has('--dry-run')) {
  console.log(JSON.stringify({ host: siteUrl.host, keyLocation, urlCount: urls.length, urls }, null, 2))
  process.exit(0)
}

const response = await fetch(INDEXNOW_ENDPOINT, {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: siteUrl.host,
    key: INDEXNOW_KEY,
    keyLocation,
    urlList: urls,
  }),
})

if (![200, 202].includes(response.status)) {
  const body = await response.text()
  throw new Error(`IndexNow submission failed with HTTP ${response.status}: ${body.slice(0, 500)}`)
}

console.log(`IndexNow accepted ${urls.length} Sundae URL(s) with HTTP ${response.status}.`)
