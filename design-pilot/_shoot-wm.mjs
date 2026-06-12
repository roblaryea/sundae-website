import { chromium } from 'playwright';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const p = await ctx.newPage();
await p.goto('http://localhost:3100/en', { waitUntil: 'load', timeout: 60000 });
await p.waitForTimeout(2500);
try { await p.getByRole('button', { name: /^accept$/i }).click({ timeout: 3000 }); } catch (e) {}
await p.waitForTimeout(400);
// hero description (wordmark inline in body text)
try { const el = p.getByText('disconnected systems', { exact: false }).first(); await el.scrollIntoViewIfNeeded({ timeout: 8000 }); await p.waitForTimeout(700); await p.screenshot({ path: '/tmp/WM-hero.png', clip: { x: 280, y: 360, width: 880, height: 260 } }); console.log('hero'); } catch (e) { console.log('miss hero', e.message); }
// Old Way headline (wordmark inline in big headline)
try { const el = p.getByText('Reports tell you what happened', { exact: false }).first(); await el.scrollIntoViewIfNeeded({ timeout: 8000 }); await p.waitForTimeout(700); await p.screenshot({ path: '/tmp/WM-headline.png' }); console.log('headline'); } catch (e) { console.log('miss headline', e.message); }
await b.close();
console.log('done');
