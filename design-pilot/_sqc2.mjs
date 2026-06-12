import { chromium } from 'playwright';
const b = await chromium.launch();
const R = 'design-pilot/review';
const c = await b.newContext({ viewport:{width:1366,height:900}, deviceScaleFactor:1.5 });
const p = await c.newPage();
await p.goto('http://localhost:3100/',{waitUntil:'load',timeout:60000}); await p.waitForTimeout(1500);
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const s=()=>{y+=innerHeight*0.7;scrollTo(0,y);y<8000?setTimeout(s,80):setTimeout(r,300);};s();});});
await p.evaluate(()=>{const el=document.getElementById('sqc-headline');if(el)el.scrollIntoView({block:'start'});});
// capture several frames across the orbit to catch trail + lit edges + burst
for (let i=0;i<5;i++){ await p.waitForTimeout(1700); await p.screenshot({path:`${R}/sqc2-${i}.png`, clip:{x:120,y:150,width:1120,height:660}}); }
await b.close(); console.log('done');
