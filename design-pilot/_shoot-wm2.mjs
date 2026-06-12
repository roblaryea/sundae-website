import { chromium } from 'playwright';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const p = await ctx.newPage();
await p.goto('http://localhost:3100/en', { waitUntil: 'load', timeout: 60000 });
await p.waitForTimeout(2500);
try { await p.getByRole('button', { name: /^accept$/i }).click({ timeout: 3000 }); } catch (e) {}
await p.waitForTimeout(400);
try {
  const heroP = p.locator('p', { hasText: 'disconnected systems' }).first();
  await heroP.scrollIntoViewIfNeeded({ timeout: 8000 });
  await p.waitForTimeout(500);
  await heroP.screenshot({ path: '/tmp/WM-hero.png' });
  console.log('hero ok');
} catch (e) { console.log('miss hero', e.message); }
try {
  const h2 = p.locator('h2', { hasText: 'tells you what to do next' }).first();
  await h2.scrollIntoViewIfNeeded({ timeout: 8000 });
  await p.waitForTimeout(500);
  await h2.screenshot({ path: '/tmp/WM-headline.png' });
  console.log('headline ok');
} catch (e) { console.log('miss headline', e.message); }
await b.close();
console.log('done');
