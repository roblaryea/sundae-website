import { chromium } from 'playwright';
const b = await chromium.launch();
async function shot(theme){
  const ctx = await b.newContext({ viewport:{width:1366,height:820}, deviceScaleFactor:1 });
  if(theme==='light') await ctx.addInitScript(()=>{try{localStorage.setItem('sundae-theme','light')}catch(e){}});
  const p = await ctx.newPage();
  await p.goto('http://localhost:3100/insights',{waitUntil:'load',timeout:60000}); await p.waitForTimeout(1800);
  await p.evaluate(y=>scrollTo(0,650), 0); await p.waitForTimeout(500);
  await p.screenshot({path:`design-pilot/review/verify-ins-${theme}.png`});
  await ctx.close();
}
await shot('light'); await shot('dark');
// home six-layers dark
const ctx = await b.newContext({ viewport:{width:1366,height:820} });
const p = await ctx.newPage();
await p.goto('http://localhost:3100/',{waitUntil:'load',timeout:60000}); await p.waitForTimeout(1800);
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const s=()=>{y+=innerHeight*0.8;scrollTo(0,y);y<7500?setTimeout(s,90):(setTimeout(r,300));};s();});});
await p.waitForTimeout(500); await p.screenshot({path:'design-pilot/review/verify-sixlayers.png'});
await b.close(); console.log('verify shots done');
