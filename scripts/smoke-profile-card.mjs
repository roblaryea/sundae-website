// Post-deploy smoke test for profile cards. Run it against the live site before printing
// cards that carry the link, and after any deploy that touches them:
//
//   npm run smoke:profile-card -- https://www.sundae.io [handle ...]
//
// It only reads, plus one deliberately invalid form post that is rejected before anything is
// stored, so it never creates a lead.
import { PROFILE_HANDLES } from '../src/lib/profileHandles.ts'

const base = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '')
const handles = process.argv.slice(3).length ? process.argv.slice(3) : [...PROFILE_HANDLES]
let failed = 0
const check = (name, ok, detail = '') => {
  if (!ok) failed += 1
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? `  (${detail})` : ''}`)
}
const get = (path, init = {}) => fetch(base + path, { redirect: 'manual', ...init })

console.log(`Profile card smoke test against ${base}\n`)
for (const handle of handles) {
  console.log(`-- /${handle}`)
  const page = await get(`/${handle}`)
  const html = await page.text()
  check('page returns 200 HTML', page.status === 200 && (page.headers.get('content-type') || '').includes('text/html'), `status ${page.status}`)
  check('page is noindex', /<meta name="robots" content="noindex/.test(html))
  check('page offers Save contact', html.includes(`/${handle}/contact.vcf`))
  check('page names a link-preview image', html.includes(`/profile/${handle}-og.png`))

  const vcf = await get(`/${handle}/contact.vcf`)
  const card = await vcf.text()
  check('contact file is a vCard', vcf.status === 200 && (vcf.headers.get('content-type') || '').startsWith('text/vcard') && card.startsWith('BEGIN:VCARD') && card.includes('END:VCARD'))
  check('contact file has a structured name, phone and email', /\r\nN:[^;\r\n]+;[^;\r\n]+;;;/.test(card) && /\r\nTEL[^:]*:\+\d{8,}/.test(card) && /\r\nEMAIL[^:]*:\S+@\S+/.test(card))
  const arabic = await (await get(`/${handle}/contact.vcf?lang=ar`)).text()
  const title = (text) => (text.match(/\r\nTITLE:([^\r\n]*)/) || [])[1]
  check('contact file follows ?lang= for the job title', Boolean(title(arabic)) && title(arabic) !== title(card), `${title(card)} / ${title(arabic)}`)

  const og = await get(`/profile/${handle}-og.png`)
  check('link-preview image is served', og.status === 200 && (og.headers.get('content-type') || '').includes('image/png'))

  const upper = await get(`/${handle[0].toUpperCase()}${handle.slice(1)}`)
  check('capitalised handle redirects to lowercase', upper.status === 308 && (upper.headers.get('location') || '').endsWith(`/${handle}`))
  const internal = await get(`/p/${handle}`)
  check('internal /p/ path redirects to the public URL', internal.status === 308 && (internal.headers.get('location') || '').endsWith(`/${handle}`))

  const post = await get('/api/profile-card/connect', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ handle, name: 'Smoke Test', email: 'smoke@example.com', consent: false, website: '', startedAt: Date.now() - 60_000 }),
  })
  // 404 means the lead form is switched off (PROFILE_CARD_LEAD_FORM is not "on"): expected until it is approved.
  check('lead form endpoint is off, or on and rejecting input without consent', post.status === 404 || post.status === 400, post.status === 404 ? 'switched off' : `status ${post.status}`)
}

console.log('\n-- rest of the site')
const unknown = await get(`/no-such-card-${Date.now()}`)
check('unknown URLs still return a real 404', unknown.status === 404, `status ${unknown.status}`)
const home = await get('/')
check('home page still returns 200', home.status === 200, `status ${home.status}`)

console.log(failed ? `\n${failed} check(s) FAILED` : '\nAll checks passed')
process.exit(failed ? 1 : 0)
