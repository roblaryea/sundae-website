import { chromium } from 'playwright';
const routes = process.argv.slice(2);
const b = await chromium.launch();
const R = 'design-pilot/review';
for (const route of routes) {
  const slug = route === '/' ? 'home' : route.replace(/\//g, '_').replace(/^_/, '');
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const p = await ctx.newPage();
  try {
    await p.goto('http://localhost:3100' + route, { waitUntil: 'load', timeout: 60000 });
    await p.waitForTimeout(2200);
    // check horizontal overflow
    const ov = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, bodyW: document.body.scrollWidth }));
    const overflow = ov.sw > ov.cw + 1;
    const h = await p.evaluate(() => { window.scrollTo(0,0); return document.body.scrollHeight; });
    const vh = 844, max = Math.max(0, h - vh), n = Math.min(4, Math.max(1, Math.ceil(h / vh)));
    for (let i = 0; i < n; i++) {
      const y = n===1?0:Math.round(max*i/(n-1));
      await p.evaluate(yy => window.scrollTo(0, yy), y);
      await p.waitForTimeout(350);
      await p.screenshot({ path: `${R}/mob-${slug}-${i}.png` });
    }
    console.log(`${slug}: h=${h} segs=${n} ${overflow ? 'HORIZ-OVERFLOW sw='+ov.sw : 'ok'}`);
  } catch (e) { console.log(`${slug}: ERROR ${e.message}`); }
  await ctx.close();
}
await b.close();
