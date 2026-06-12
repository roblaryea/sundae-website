import { chromium } from 'playwright';
const b = await chromium.launch();
// light hero
const c1 = await b.newContext({ viewport:{width:1366,height:820}, deviceScaleFactor:1 });
await c1.addInitScript(()=>{try{localStorage.setItem('sundae-theme','light')}catch(e){}});
const p1 = await c1.newPage();
await p1.goto('http://localhost:3100/',{waitUntil:'load',timeout:60000}); await p1.waitForTimeout(2000);
await p1.screenshot({path:'design-pilot/review/v2-lighthero.png'}); await c1.close();
// dark six-layers
const c2 = await b.newContext({ viewport:{width:1366,height:820} });
const p2 = await c2.newPage();
await p2.goto('http://localhost:3100/',{waitUntil:'load',timeout:60000}); await p2.waitForTimeout(1800);
await p2.evaluate(async()=>{await new Promise(r=>{let y=0;const s=()=>{y+=innerHeight*0.8;scrollTo(0,y);y<7200?setTimeout(s,90):setTimeout(r,300);};s();});});
await p2.waitForTimeout(500);
// find the six-layers heading and scroll it into view
await p2.evaluate(()=>{const els=[...document.querySelectorAll('h2,h3')];const t=els.find(e=>/one truth|six layers/i.test(e.textContent||''));if(t)t.scrollIntoView({block:'start'});});
await p2.waitForTimeout(600); await p2.screenshot({path:'design-pilot/review/v2-sixlayers.png'});
await b.close(); console.log('done');
