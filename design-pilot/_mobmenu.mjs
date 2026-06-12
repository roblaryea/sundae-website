import { chromium } from 'playwright';
const b = await chromium.launch();
const R = 'design-pilot/review';
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const p = await ctx.newPage();
await p.goto('http://localhost:3100/', { waitUntil: 'load', timeout: 60000 });
await p.waitForTimeout(1800);
// trigger reveals: scroll to bottom in steps then back
await p.evaluate(async () => { await new Promise(r => { let y=0; const s=()=>{ y+=innerHeight*0.7; scrollTo(0,y); y<document.body.scrollHeight?setTimeout(s,90):setTimeout(r,400);}; s(); }); window.scrollTo(0,0); });
await p.waitForTimeout(600);
// capture a mid section (now revealed)
await p.evaluate(() => window.scrollTo(0, 2600));
await p.waitForTimeout(500);
await p.screenshot({ path: `${R}/mob-reveal-mid.png` });
// open hamburger menu
await p.evaluate(() => window.scrollTo(0,0)); await p.waitForTimeout(400);
const btn = await p.$('header button[aria-label*="enu" i], header button:has-text("Menu"), button[aria-label*="open" i]') || (await p.$$('header button')).slice(-1)[0];
let opened = false;
try { const hb = (await p.$$('header button')); await hb[hb.length-1].click({ timeout: 3000 }); await p.waitForTimeout(700); opened = true; } catch(e){ console.log('menu click failed', e.message); }
await p.screenshot({ path: `${R}/mob-menu-open.png` });
console.log('menu opened:', opened);
await b.close();
