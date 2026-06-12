import { chromium } from 'playwright';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 1000 }, deviceScaleFactor: 1 });
const p = await ctx.newPage();
await p.goto('http://localhost:3100/en', { waitUntil: 'load', timeout: 60000 });
await p.waitForTimeout(2500);
try { await p.getByRole('button', { name: /^accept$/i }).click({ timeout: 3000 }); } catch (e) {}
await p.waitForTimeout(400);
try {
  const sec = p.locator('section[aria-label="One source of truth"]').first();
  await sec.scrollIntoViewIfNeeded({ timeout: 8000 });
  await p.waitForTimeout(900);
  await sec.screenshot({ path: '/tmp/CREAM2.png' });
  console.log('ok');
} catch (e) { console.log('miss', e.message); }
await b.close();
console.log('done');
