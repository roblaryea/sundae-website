import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1366, height: 820 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
async function cap(url, slug, n=6){
  await page.goto(url,{waitUntil:'load',timeout:60000}); await page.waitForTimeout(1700);
  await page.evaluate(async()=>{await new Promise(r=>{let y=0;const s=()=>{y+=innerHeight*0.8;scrollTo(0,y);y<document.body.scrollHeight?setTimeout(s,100):(scrollTo(0,0),setTimeout(r,400));};s();});});
  await page.waitForTimeout(600);
  const h=await page.evaluate(()=>document.body.scrollHeight); const maxY=h-820;
  for(let i=0;i<n;i++){await page.evaluate(y=>scrollTo(0,y),Math.round(maxY*(i/(n-1))));await page.waitForTimeout(280);await page.screenshot({path:`design-pilot/review/${slug}-${i}.png`});}
  console.log(`${slug}: ${h}px`);
}
await cap('http://localhost:3100/product','pr');
await cap('http://localhost:3100/about','ab');
await cap('http://localhost:3100/solutions/finance-teams','so');
await browser.close(); console.log('done');
