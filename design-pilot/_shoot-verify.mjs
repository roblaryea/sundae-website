import { chromium } from 'playwright';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await ctx.addInitScript(() => { try { localStorage.setItem('sundae-theme', 'light'); } catch (e) {} });
const p = await ctx.newPage();
await p.goto('http://localhost:3100/en', { waitUntil: 'load', timeout: 60000 });
await p.waitForTimeout(2600);
await p.screenshot({ path: '/tmp/V-nav.png', clip: { x: 0, y: 0, width: 460, height: 88 } });
try {
  const el = p.getByText('every shift is a', { exact: false }).first();
  await el.scrollIntoViewIfNeeded({ timeout: 8000 });
  await p.waitForTimeout(800);
  await p.screenshot({ path: '/tmp/V-cream1.png' });
} catch (e) { console.log('miss cream1', e.message); }
await b.close();
console.log('done');
