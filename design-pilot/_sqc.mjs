import { chromium } from 'playwright';
const b = await chromium.launch();
const R = 'design-pilot/review';
for (const [slug, th] of [['sqc-dark','dark'],['sqc-light','light']]) {
  const c = await b.newContext({ viewport:{width:1366,height:900}, deviceScaleFactor:1.4 });
  if (th==='light') await c.addInitScript(()=>{try{localStorage.setItem('sundae-theme','light')}catch(e){}});
  const p = await c.newPage();
  await p.goto('http://localhost:3100/',{waitUntil:'load',timeout:60000}); await p.waitForTimeout(1500);
  await p.evaluate(async()=>{await new Promise(r=>{let y=0;const s=()=>{y+=innerHeight*0.7;scrollTo(0,y);y<8000?setTimeout(s,80):setTimeout(r,300);};s();});});
  await p.evaluate(()=>{const el=document.getElementById('sqc-headline');if(el)el.scrollIntoView({block:'start'});});
  await p.waitForTimeout(2500); // let orbit run
  await p.screenshot({path:`${R}/${slug}.png`, clip:{x:120,y:140,width:1120,height:680}});
  await c.close();
}
await b.close(); console.log('done');
