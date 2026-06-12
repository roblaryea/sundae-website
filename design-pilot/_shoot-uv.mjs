import { chromium } from 'playwright';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1000, height: 900 }, deviceScaleFactor: 1 });
const p = await ctx.newPage();
await p.goto('http://localhost:3100/en', { waitUntil: 'load', timeout: 60000 });
await p.waitForTimeout(2500);
try { await p.getByRole('button', { name: /^accept$/i }).click({ timeout: 3000 }); } catch (e) {}
await p.waitForTimeout(400);
try {
  const el = p.getByText('One decision surface', { exact: false }).first();
  await el.scrollIntoViewIfNeeded({ timeout: 8000 });
  await p.evaluate(() => window.scrollBy(0, -180));
  await p.waitForTimeout(600);
  await p.screenshot({ path: '/tmp/UV.png', clip: { x: 180, y: 140, width: 640, height: 620 } });
  console.log('ok');
} catch (e) { console.log('miss', e.message); }
await b.close(); console.log('done');
