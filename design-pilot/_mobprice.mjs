import { chromium } from 'playwright';
const b = await chromium.launch();
const R = 'design-pilot/review';
for (const [slug, th] of [['mob-price-d','dark'],['mob-price-l','light']]) {
  const c = await b.newContext({ viewport:{width:390,height:844}, deviceScaleFactor:2, isMobile:true, hasTouch:true });
  if (th==='light') await c.addInitScript(()=>{try{localStorage.setItem('sundae-theme','light');document.documentElement.classList.add('light')}catch(e){}});
  const p = await c.newPage();
  await p.goto('http://localhost:5173/',{waitUntil:'load',timeout:60000}); await p.waitForTimeout(3500);
  const ov = await p.evaluate(()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth}));
  await p.screenshot({path:`${R}/${slug}-0.png`});
  await p.evaluate(()=>window.scrollTo(0,700)); await p.waitForTimeout(500);
  await p.screenshot({path:`${R}/${slug}-1.png`});
  console.log(slug, ov.sw>ov.cw+1?('OVERFLOW sw='+ov.sw):'ok');
  await c.close();
}
await b.close();
