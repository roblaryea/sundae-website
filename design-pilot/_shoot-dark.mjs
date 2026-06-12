import { chromium } from 'playwright';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const p = await ctx.newPage();
await p.goto('http://localhost:3100/en', { waitUntil: 'load', timeout: 60000 });
await p.waitForTimeout(2500);
try { await p.getByRole('button', { name: /^accept$/i }).click({ timeout: 3000 }); } catch (e) {}
await p.waitForTimeout(400);
async function shotAt(text, slug, extra = 0) {
  try {
    const el = p.getByText(text, { exact: false }).first();
    await el.scrollIntoViewIfNeeded({ timeout: 8000 });
    if (extra) await p.evaluate((y) => window.scrollBy(0, y), extra);
    await p.waitForTimeout(800);
    await p.screenshot({ path: `/tmp/${slug}.png` });
    console.log('shot', slug);
  } catch (e) { console.log('miss', slug, e.message); }
}
await shotAt('old tradeoff', 'D-tradeoff');
await shotAt('becomes a decision', 'D-4d');
await shotAt('Know where you stand', 'D-moats');
await shotAt('Every role', 'D-persona');
await shotAt('actually trusts', 'D-cream2');
await b.close();
console.log('done');
