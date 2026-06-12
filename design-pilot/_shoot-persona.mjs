import { chromium } from 'playwright';
const b = await chromium.launch();
async function cap(theme) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  if (theme === 'light') await ctx.addInitScript(() => { try { localStorage.setItem('sundae-theme', 'light'); } catch (e) {} });
  const p = await ctx.newPage();
  await p.goto('http://localhost:3100/en', { waitUntil: 'load', timeout: 60000 });
  await p.waitForTimeout(2400);
  try { await p.getByRole('button', { name: /^accept$/i }).click({ timeout: 3000 }); } catch (e) {}
  await p.waitForTimeout(400);
  try {
    const el = p.getByText('every restaurant at once', { exact: false }).first();
    await el.scrollIntoViewIfNeeded({ timeout: 8000 });
    await p.evaluate(() => window.scrollBy(0, 120));
    await p.waitForTimeout(900);
    await p.screenshot({ path: `/tmp/F-persona-${theme}.png` });
    console.log('shot', theme);
  } catch (e) { console.log('miss', theme, e.message); }
  await ctx.close();
}
await cap('dark');
await cap('light');
await b.close();
console.log('done');
