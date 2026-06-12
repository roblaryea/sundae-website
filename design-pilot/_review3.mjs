import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1366, height: 820 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto('http://localhost:3100/insights', { waitUntil: 'load', timeout: 60000 });
await page.waitForTimeout(1800);
await page.evaluate(async () => { await new Promise(r => { let y=0; const s=()=>{ y+=window.innerHeight*0.8; window.scrollTo(0,y); if(y<document.body.scrollHeight) setTimeout(s,110); else { window.scrollTo(0,0); setTimeout(r,400); } }; s(); }); });
await page.waitForTimeout(700);
const h = await page.evaluate(() => document.body.scrollHeight); const maxY = h-820; const n=8;
for (let i=0;i<n;i++){ await page.evaluate(y=>window.scrollTo(0,y), Math.round(maxY*(i/(n-1)))); await page.waitForTimeout(320); await page.screenshot({ path: `design-pilot/review/iy-${String(i).padStart(2,'0')}.png` }); }
await browser.close(); console.log(`insights re-shot: ${n} spanning ${h}px`);
