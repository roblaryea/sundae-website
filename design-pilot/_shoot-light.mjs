import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
// Force light theme before any page script runs (ThemeScript reads this on load).
await ctx.addInitScript(() => { try { localStorage.setItem('sundae-theme', 'light'); } catch (e) {} });
const page = await ctx.newPage();

await page.goto('http://localhost:3100/en', { waitUntil: 'load', timeout: 60000 });
await page.waitForTimeout(2200);
await page.screenshot({ path: '/tmp/light-hero.png' });

await page.evaluate(async () => {
  await new Promise((res) => {
    let y = 0;
    const step = () => {
      y += window.innerHeight * 0.75;
      window.scrollTo(0, y);
      if (y < document.body.scrollHeight) setTimeout(step, 140);
      else { window.scrollTo(0, 0); setTimeout(res, 500); }
    };
    step();
  });
});
await page.waitForTimeout(700);
await page.screenshot({ path: '/tmp/light-full.png', fullPage: true });

await browser.close();
console.log('light done');
