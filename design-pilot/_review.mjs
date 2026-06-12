import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1366, height: 820 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
async function capture(url, slug) {
  await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(1800);
  // trigger scroll-reveal animations
  await page.evaluate(async () => { await new Promise(r => { let y=0; const s=()=>{ y+=window.innerHeight*0.8; window.scrollTo(0,y); if(y<document.body.scrollHeight) setTimeout(s,120); else { window.scrollTo(0,0); setTimeout(r,400); } }; s(); }); });
  await page.waitForTimeout(800);
  const h = await page.evaluate(() => document.body.scrollHeight);
  const vh = 820; const steps = Math.min(Math.ceil(h/vh), 9);
  const shots = [];
  for (let i=0;i<steps;i++){
    await page.evaluate(y => window.scrollTo(0,y), i*vh);
    await page.waitForTimeout(350);
    const p = `design-pilot/review/${slug}-${String(i).padStart(2,'0')}.png`;
    await page.screenshot({ path: p });
    shots.push(p);
  }
  console.log(`${slug}: ${steps} shots (pageHeight=${h}px)`);
}
await capture('http://localhost:3100/insights', 'ins');
await capture('http://localhost:3100/', 'home');
await browser.close();
console.log('done');
