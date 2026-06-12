import { chromium } from 'playwright';
const b = await chromium.launch();
const routes = ['/','/product','/pricing','/crew','/insights','/report-vs-core','/4d-intelligence','/architecture','/solutions/finance-teams','/modules','/benchmarking','/about','/integrations','/careers'];
const ctx = await b.newContext({ viewport:{width:320,height:720}, deviceScaleFactor:1, isMobile:true, hasTouch:true });
for (const route of routes) {
  const p = await ctx.newPage();
  try {
    await p.goto('http://localhost:3100'+route,{waitUntil:'load',timeout:60000}); await p.waitForTimeout(1600);
    const ov = await p.evaluate(()=>{
      const docW = document.documentElement.clientWidth;
      // find elements wider than viewport (real overflow culprits)
      const wide = [...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>docW+2 && r.right>docW+2 && getComputedStyle(e).position!=='fixed';}).slice(0,3).map(e=>e.tagName+'.'+(e.className&&e.className.toString?e.className.toString().slice(0,40):''));
      return {sw:document.documentElement.scrollWidth,cw:docW,wide};
    });
    console.log(route.padEnd(28), ov.sw>ov.cw+1?('OVERFLOW sw='+ov.sw+' :: '+ov.wide.join(' | ')):'ok');
  } catch(e){ console.log(route, 'ERR', e.message); }
  await p.close();
}
await b.close();
