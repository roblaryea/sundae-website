// Batch capture: node design-pilot/_capture.mjs <theme> <slug:route> [slug:route ...]
// theme = light|dark. Captures viewport segments spanning the page into review/<slug>-<theme>-NN.png
import { chromium } from 'playwright';
import fs from 'fs';

const theme = process.argv[2] || 'dark';
const jobs = process.argv.slice(3).map(s => {
  const i = s.indexOf(':');
  return { slug: s.slice(0, i), route: s.slice(i + 1) };
});
const OUT = 'design-pilot/review';
fs.mkdirSync(OUT, { recursive: true });

const b = await chromium.launch();
for (const { slug, route } of jobs) {
  const ctx = await b.newContext({ viewport: { width: 1366, height: 820 }, deviceScaleFactor: 1 });
  if (theme === 'light') await ctx.addInitScript(() => { try { localStorage.setItem('sundae-theme', 'light'); } catch (e) {} });
  const p = await ctx.newPage();
  try {
    await p.goto('http://localhost:3100' + route, { waitUntil: 'load', timeout: 60000 });
    await p.waitForTimeout(1500);
    // trigger scroll reveals: scroll to bottom in steps, then back to top
    const h = await p.evaluate(async () => {
      await new Promise(r => { let y = 0; const s = () => { y += innerHeight * 0.8; scrollTo(0, y); y < document.body.scrollHeight ? setTimeout(s, 80) : setTimeout(r, 300); }; s(); });
      window.scrollTo(0, 0);
      return document.body.scrollHeight;
    });
    await p.waitForTimeout(500);
    const vh = 820;
    const maxScroll = Math.max(0, h - vh);
    // sample up to 8 evenly-spaced viewport segments across the FULL page height
    const n = Math.min(8, Math.max(1, Math.ceil(h / vh)));
    for (let i = 0; i < n; i++) {
      const y = n === 1 ? 0 : Math.round((maxScroll * i) / (n - 1));
      await p.evaluate(yy => window.scrollTo(0, yy), y);
      await p.waitForTimeout(350);
      await p.screenshot({ path: `${OUT}/${slug}-${theme}-${String(i).padStart(2, '0')}.png` });
    }
    console.log(`${slug} (${theme}): ${n} segments, h=${h}`);
  } catch (e) {
    console.log(`${slug} (${theme}): ERROR ${e.message}`);
  }
  await ctx.close();
}
await b.close();
