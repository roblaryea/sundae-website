import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1366, height: 820 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
async function capture(url, slug, n) {
  await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(1800);
  await page.evaluate(async () => { await new Promise(r => { let y=0; const s=()=>{ y+=window.innerHeight*0.8; window.scrollTo(0,y); if(y<document.body.scrollHeight) setTimeout(s,110); else { window.scrollTo(0,0); setTimeout(r,400); } }; s(); }); });
  await page.waitForTimeout(700);
  const h = await page.evaluate(() => document.body.scrollHeight);
  const maxY = h - 820;
  for (let i=0;i<n;i++){
    const y = Math.round(maxY * (i/(n-1)));
    await page.evaluate(y => window.scrollTo(0,y), y);
    await page.waitForTimeout(320);
    await page.screenshot({ path: `design-pilot/review/${slug}-${String(i).padStart(2,'0')}.png` });
  }
  console.log(`${slug}: ${n} shots spanning ${h}px`);
}
await capture('http://localhost:3100/insights', 'ix', 8);
await capture('http://localhost:3100/', 'hm', 8);
await browser.close(); console.log('done');
