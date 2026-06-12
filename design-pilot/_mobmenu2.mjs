import { chromium } from 'playwright';
const b = await chromium.launch();
const R = 'design-pilot/review';
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const p = await ctx.newPage();
await p.goto('http://localhost:3100/', { waitUntil: 'load', timeout: 60000 });
await p.waitForTimeout(2000);
// enumerate header buttons with visibility + box
const info = await p.evaluate(() => {
  const hdr = document.querySelector('header');
  return [...hdr.querySelectorAll('button')].map(btn => {
    const r = btn.getBoundingClientRect();
    const s = getComputedStyle(btn);
    return { label: (btn.getAttribute('aria-label')||btn.textContent||'').trim().slice(0,20), x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), vis: s.display!=='none' && r.width>0 };
  });
});
console.log(JSON.stringify(info));
// click the visible button near top-right (hamburger)
const hb = await p.evaluate(() => {
  const hdr = document.querySelector('header');
  const btns = [...hdr.querySelectorAll('button')].filter(b=>{const r=b.getBoundingClientRect();return r.width>0 && r.x>200;});
  if (btns.length){ btns[btns.length-1].click(); return true; } return false;
});
await p.waitForTimeout(900);
await p.screenshot({ path: `${R}/mob-menu2.png` });
console.log('clicked:', hb);
await b.close();
