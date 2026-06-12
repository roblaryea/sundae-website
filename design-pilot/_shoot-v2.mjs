import { chromium } from 'playwright';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const p = await ctx.newPage();
await p.goto('http://localhost:3100/en', { waitUntil: 'load', timeout: 60000 });
await p.waitForTimeout(2500);
try { await p.getByRole('button', { name: /^accept$/i }).click({ timeout: 3000 }); } catch (e) {}
await p.waitForTimeout(400);
async function shotAt(text, slug) {
  try { const el = p.getByText(text, { exact: false }).first(); await el.scrollIntoViewIfNeeded({ timeout: 8000 }); await p.waitForTimeout(800); await p.screenshot({ path: `/tmp/${slug}.png` }); console.log('shot', slug); }
  catch (e) { console.log('miss', slug, e.message); }
}
await shotAt('From signal to action', 'V2-proof');
await shotAt('Start making every day a Sundae', 'V2-closer');
await b.close();
console.log('done');
