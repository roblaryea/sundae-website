/** Live technical availability, not a Google indexing or ranking measurement. */
const canonicalOrigin = 'https://www.sundae.io'
const fetchOrigin = new URL(process.env.SEARCH_HEALTH_SITE_URL || canonicalOrigin).origin
const intents = [
  '/restaurant-management-platform',
  '/restaurant365-alternative',
  '/product/intelligence',
]
const paths = [
  '/', ...intents, '/restaurant-task-management', '/restaurant-logbook',
  ...['nl', 'ar'].flatMap(locale => intents.map(path => `/${locale}${path}`)),
]

function decode(value) {
  return value.replace(/&(?:amp|quot|apos|lt|gt|#39|#x[\da-f]+|#\d+);/gi, entity => {
    const named = { '&amp;': '&', '&quot;': '"', '&apos;': "'", '&lt;': '<', '&gt;': '>', '&#39;': "'" }
    const name = entity.toLowerCase()
    if (named[name]) return named[name]
    const number = name.startsWith('&#x') ? parseInt(name.slice(3, -1), 16) : parseInt(name.slice(2, -1), 10)
    return number > 0 && number <= 0x10ffff ? String.fromCodePoint(number) : entity
  })
}

function attributes(tag) {
  const result = {}
  for (const match of tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) {
    result[match[1].toLowerCase()] = decode(match[2] ?? match[3])
  }
  return result
}

async function check(path) {
  const failures = []
  const url = new URL(path, fetchOrigin).href
  try {
    const response = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(30_000) })
    if (response.status !== 200) return { path, status: response.status, failures: ['Expected HTTP 200 without a redirect'] }
    const html = await response.text()
    const canonicalTags = [...html.matchAll(/<link\b[^>]*>/gi)]
      .map(match => attributes(match[0])).filter(tag => tag.rel?.toLowerCase() === 'canonical')
    const expected = new URL(path, canonicalOrigin).href
    const canonical = canonicalTags[0]?.href
    let canonicalMatches = false
    try { canonicalMatches = new URL(canonical).href === expected } catch { /* Missing or malformed canonical. */ }
    if (canonicalTags.length !== 1 || !canonicalMatches) failures.push(`Expected one self-canonical: ${expected}`)
    const meta = [...html.matchAll(/<meta\b[^>]*>/gi)].map(match => attributes(match[0]))
    const robots = [response.headers.get('x-robots-tag') || '', ...meta.filter(tag => /^(robots|googlebot|bingbot)$/i.test(tag.name || '')).map(tag => tag.content || '')].join(', ')
    if (/\b(noindex|none|nofollow)\b/i.test(robots)) failures.push('Priority page restricts indexing or link following')
    const titles = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)]
    const title = decode(titles[0]?.[1] || '').trim()
    if (titles.length !== 1 || !title) failures.push('Expected one nonempty title')
    if (!meta.some(tag => tag.name?.toLowerCase() === 'description' && tag.content?.trim())) failures.push('Missing meta description')
    const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)]
    const h1 = decode((headings[0]?.[1] || '').replace(/<[^>]*>/g, '')).trim()
    if (headings.length !== 1 || !h1) failures.push('Expected one nonempty server-rendered H1')
    let structuredDataCount = 0
    for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
      if (attributes(match[1]).type !== 'application/ld+json') continue
      structuredDataCount += 1
      try { JSON.parse(match[2]) } catch { failures.push('Invalid structured-data JSON') }
    }
    if (!structuredDataCount) failures.push('Missing structured data')
    return { path, status: response.status, canonical, title, h1, structuredDataCount, failures }
  } catch (error) {
    return { path, failures: [error.message] }
  }
}

const pages = []
// Bound concurrency so the audit stays lightweight on production.
for (let start = 0; start < paths.length; start += 3) {
  pages.push(...await Promise.all(paths.slice(start, start + 3).map(check)))
}
const failures = pages.flatMap(page => page.failures.map(message => `${page.path}: ${message}`))
console.log(JSON.stringify({ checkedAt: new Date().toISOString(), fetchOrigin, scope: 'Live technical availability only; does not establish indexing, rank, rich-result eligibility or AI citations', pages, failures }, null, 2))
if (failures.length) process.exitCode = 1
