import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();

async function triggerReveals() {
  await page.evaluate(async () => {
    await new Promise((res) => {
      let y = 0;
      const step = () => {
        y += window.innerHeight * 0.75;
        window.scrollTo(0, y);
        if (y < document.body.scrollHeight) setTimeout(step, 140);
        else { window.scrollTo(0, 0); setTimeout(res, 500); }
      };
      step();
    });
  });
  await page.waitForTimeout(700);
}

async function shoot(url, slug) {
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(2200);
    await page.screenshot({ path: `/tmp/${slug}-hero.png` });
    await triggerReveals();
    await page.screenshot({ path: `/tmp/${slug}-full.png`, fullPage: true });
    console.log(`OK ${slug}`);
  } catch (e) {
    console.log(`FAIL ${slug}: ${e.message}`);
  }
}

await shoot('http://localhost:3100/en', 'real');
await shoot('file:///Users/robertlaryea/Documents/Dev/sundae-website/design-pilot/warm-signature-v2.html', 'v2');

await browser.close();
console.log('done');
