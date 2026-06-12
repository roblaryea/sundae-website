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
  async function shot(text, slug) {
    try { const el = p.getByText(text, { exact: false }).first(); await el.scrollIntoViewIfNeeded({ timeout: 8000 }); await p.waitForTimeout(800); await p.screenshot({ path: `/tmp/${slug}.png` }); console.log('shot', slug); }
    catch (e) { console.log('miss', slug, e.message); }
  }
  await shot('Operations Leaders', `F-persona-${theme}`);
  await shot('what your team actually sees', `F-preview-${theme}`);
  await ctx.close();
}
await cap('dark');
await cap('light');
await b.close();
console.log('done');
