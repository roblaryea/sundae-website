import { chromium } from 'playwright';
const b = await chromium.launch();
const R = 'design-pilot/review';
// 1. menu open (clean)
const c1 = await b.newContext({ viewport:{width:390,height:844}, deviceScaleFactor:2, isMobile:true, hasTouch:true });
const p1 = await c1.newPage();
await p1.goto('http://localhost:3100/', {waitUntil:'load',timeout:60000}); await p1.waitForTimeout(2000);
await p1.evaluate(()=>{const h=document.querySelector('header');const o=[...h.querySelectorAll('button')].find(b=>/open menu/i.test(b.getAttribute('aria-label')||''));if(o)o.click();});
await p1.waitForTimeout(800);
await p1.screenshot({path:`${R}/mob-menuopen-clean.png`});
// expand Products accordion
await p1.evaluate(()=>{const b=[...document.querySelectorAll('button')].find(x=>/^Products$/.test((x.textContent||'').trim()) && x.getBoundingClientRect().width>200);if(b)b.click();});
await p1.waitForTimeout(600);
await p1.screenshot({path:`${R}/mob-menu-products.png`});
await c1.close();
// 2. light-mode mobile home + overflow on more pages
for (const route of ['/','/modules','/integrations','/about']) {
  const slug = route==='/'?'lhome':route.replace(/\//g,'_').replace(/^_/,'');
  const c = await b.newContext({ viewport:{width:390,height:844}, deviceScaleFactor:2, isMobile:true, hasTouch:true });
  await c.addInitScript(()=>{try{localStorage.setItem('sundae-theme','light')}catch(e){}});
  const p = await c.newPage();
  await p.goto('http://localhost:3100'+route,{waitUntil:'load',timeout:60000}); await p.waitForTimeout(2000);
  const ov = await p.evaluate(()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth}));
  await p.screenshot({path:`${R}/mob-${slug}-0.png`});
  console.log(slug, ov.sw>ov.cw+1?('OVERFLOW sw='+ov.sw+' cw='+ov.cw):'ok');
  await c.close();
}
await b.close();
