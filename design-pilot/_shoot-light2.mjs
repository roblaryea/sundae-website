import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await ctx.addInitScript(() => { try { localStorage.setItem('sundae-theme', 'light'); } catch (e) {} });
const page = await ctx.newPage();
await page.goto('http://localhost:3100/en', { waitUntil: 'load', timeout: 60000 });
await page.waitForTimeout(2000);

async function shotAt(text, slug) {
  try {
    const el = page.getByText(text, { exact: false }).first();
    await el.scrollIntoViewIfNeeded({ timeout: 8000 });
    await page.waitForTimeout(900);
    await page.screenshot({ path: `/tmp/${slug}.png` });
    console.log('shot', slug);
  } catch (e) {
    console.log('miss', slug, e.message);
  }
}

await shotAt('Decisions, not dashboards', 'light-cream1');
await shotAt('actually trusts', 'light-cream2');
await shotAt('The old tradeoff', 'light-tradeoff');
await shotAt('Stop running on yesterday', 'light-closer');
await browser.close();
console.log('done');
