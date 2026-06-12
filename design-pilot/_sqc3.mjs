import { chromium } from 'playwright';
const b = await chromium.launch();
const R = 'design-pilot/review';
// light mode
const c = await b.newContext({ viewport:{width:1366,height:900}, deviceScaleFactor:1.5 });
await c.addInitScript(()=>{try{localStorage.setItem('sundae-theme','light')}catch(e){}});
const p = await c.newPage();
await p.goto('http://localhost:3100/',{waitUntil:'load',timeout:60000}); await p.waitForTimeout(1500);
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const s=()=>{y+=innerHeight*0.7;scrollTo(0,y);y<8000?setTimeout(s,80):setTimeout(r,300);};s();});});
await p.evaluate(()=>{const el=document.getElementById('sqc-headline');if(el)el.scrollIntoView({block:'start'});});
await p.waitForTimeout(3000);
await p.screenshot({path:`${R}/sqc3-light.png`, clip:{x:120,y:150,width:1120,height:660}});
await c.close();
// reduced-motion safety
const c2 = await b.newContext({ viewport:{width:1366,height:900}, deviceScaleFactor:1.3, reducedMotion:'reduce' });
const p2 = await c2.newPage();
await p2.goto('http://localhost:3100/',{waitUntil:'load',timeout:60000}); await p2.waitForTimeout(1500);
await p2.evaluate(()=>{const el=document.getElementById('sqc-headline');if(el)el.scrollIntoView({block:'start'});});
await p2.waitForTimeout(1500);
const rmOk = await p2.evaluate(()=>!!document.getElementById('sqc-headline'));
await p2.screenshot({path:`${R}/sqc3-rm.png`, clip:{x:120,y:150,width:1120,height:660}});
console.log('reduced-motion renders:', rmOk);
await b.close();
