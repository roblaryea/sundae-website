import { chromium } from 'playwright';

const browser = await chromium.launch();
// retina scale so I can actually judge photo quality / contrast
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await ctx.addInitScript(() => { try { localStorage.setItem('sundae-theme', 'light'); } catch (e) {} });
const page = await ctx.newPage();
await page.goto('http://localhost:3100/en', { waitUntil: 'load', timeout: 60000 });
await page.waitForTimeout(2500);
// dismiss cookie banner so it doesn't block the lower viewport
try { await page.getByRole('button', { name: /^accept$/i }).click({ timeout: 3000 }); } catch (e) {}
await page.waitForTimeout(500);

await page.screenshot({ path: '/tmp/L1-hero.png' });

async function shotAt(text, slug, extra = 0) {
  try {
    const el = page.getByText(text, { exact: false }).first();
    await el.scrollIntoViewIfNeeded({ timeout: 8000 });
    if (extra) await page.evaluate((y) => window.scrollBy(0, y), extra);
    await page.waitForTimeout(800);
    await page.screenshot({ path: `/tmp/${slug}.png` });
    console.log('shot', slug);
  } catch (e) { console.log('miss', slug, e.message); }
}

await shotAt('gaps costing you money', 'L2-problem');
await shotAt('gaps costing you money', 'L3-band1', 840);   // editorial photo band just below problem
await shotAt('Decisions, not dashboards', 'L4-cream1');     // cream + macro trio
await shotAt('Six layers', 'L5-sixlayers');
await shotAt('actually trusts', 'L6-cream2');
await shotAt('Stop running on yesterday', 'L7-closer');
await browser.close();
console.log('done');
