// Generates the link-preview image (1200 x 630) for each profile card into public/profile/<handle>-og.png.
// This is what WhatsApp, iMessage, LinkedIn and Slack show when the card link is shared.
//
//   node --no-warnings scripts/profile-og/generate.mjs [handle ...]
//
// Needs Playwright with a Chromium or Chrome browser available (not a project dependency:
//   npx playwright install chromium   or run it from any checkout that has Playwright).
// Re-run it, and commit the PNG, whenever a person's name or role changes.
import { createRequire } from 'node:module'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { PROFILES } from '../../src/lib/profileData.ts'
import { locationText, roleTitle } from '../../src/lib/profileCatalogue.ts'

const require = createRequire(import.meta.url)
let chromium
try {
  ;({ chromium } = require('playwright'))
} catch {
  console.error('Playwright is not installed. Run: npx playwright install chromium (or run this from a checkout that has it).')
  process.exit(1)
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const font = (file) => readFileSync(path.join(root, 'scripts/profile-og/fonts', file)).toString('base64')
const wordmark = readFileSync(path.join(root, 'public/logos/sundae-wordmark-card-cream.svg'), 'utf8')
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])

function html(profile) {
  const name = `${profile.givenName} ${profile.familyName}`
  return `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:F;src:url(data:font/woff2;base64,${font('fraunces-latin-var.woff2')}) format('woff2');font-weight:100 900}
@font-face{font-family:H;src:url(data:font/woff2;base64,${font('hanken-grotesk-latin-var.woff2')}) format('woff2');font-weight:100 900}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:#171210;color:#fbf8f4;font-family:H,sans-serif;position:relative;overflow:hidden}
.glow{position:absolute;inset:0;background:radial-gradient(620px 520px at 82% 46%,rgba(255,92,77,.22),transparent 65%),radial-gradient(460px 380px at 96% 8%,rgba(233,162,74,.18),transparent 66%)}
svg.art{position:absolute;width:640px;height:640px;right:-60px;top:6px}
.wm{position:absolute;left:84px;top:70px;width:200px}.wm svg{width:100%;height:auto;display:block}
.txt{position:absolute;left:84px;bottom:84px;width:720px}
.name{font:560 84px/1.02 F,serif;font-variation-settings:'opsz' 72,'SOFT' 0,'WONK' 0;letter-spacing:-.028em}
.role{margin-top:18px;font-size:34px;font-weight:600;color:#ff5c4d}
.meta{margin-top:12px;font-size:24px;color:#d8cbbd;white-space:nowrap}
.url{margin-top:34px;font-size:24px;font-weight:600;letter-spacing:.02em;color:#fbf8f4;display:inline-block;border-top:3px solid #ff5c4d;padding-top:14px}
</style><body><div class="glow"></div>
<svg class="art" viewBox="0 0 200 200"><defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F6F1E8"/><stop offset=".15" stop-color="#F6C66B"/><stop offset=".33" stop-color="#E9A24A"/><stop offset=".52" stop-color="#F7A088"/><stop offset=".68" stop-color="#FF5C4D"/><stop offset=".84" stop-color="#E03E48"/><stop offset="1" stop-color="#B23A1E"/></linearGradient><radialGradient id="c" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="#FF6E5E"/><stop offset="1" stop-color="#D8313C"/></radialGradient></defs><path d="M118,46 C100,41 72,45 72,74 C72,103 140,104 140,139 C140,171 74,172 69,149" fill="none" stroke="url(#s)" stroke-width="32" stroke-linecap="round"/><path d="M140,36 C145,24 153,20 160,12" stroke="#7d1f12" stroke-width="4.5" fill="none" stroke-linecap="round"/><circle cx="140" cy="50" r="16" fill="url(#c)"/></svg>
<div class="wm">${wordmark}</div>
<div class="txt"><div class="name">${esc(name)}</div><div class="role">${esc(roleTitle(profile.roleKey, profile.titleForm, 'en'))}</div><div class="meta">${esc(profile.company)} · ${esc(locationText(profile.cityKey, 'en'))}</div><div class="url">sundae.io/${esc(profile.handle)}</div></div></body>`
}

const wanted = process.argv.slice(2)
const handles = Object.keys(PROFILES).filter((h) => wanted.length === 0 || wanted.includes(h))
mkdirSync(path.join(root, 'public/profile'), { recursive: true })
const browser = await chromium.launch({ channel: 'chrome' }).catch(() => chromium.launch())
for (const handle of handles) {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
  const file = path.join(os.tmpdir(), `profile-og-${handle}.html`)
  writeFileSync(file, html(PROFILES[handle]))
  await page.goto(`file://${file}`)
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: path.join(root, `public/profile/${handle}-og.png`) })
  await page.close()
  console.log(`wrote public/profile/${handle}-og.png`)
}
await browser.close()
