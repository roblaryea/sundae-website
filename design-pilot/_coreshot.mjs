import { chromium } from 'playwright';
const b = await chromium.launch();
const c = await b.newContext({ viewport: { width: 1366, height: 820 } });
const p = await c.newPage();
await p.goto('http://localhost:5173/', { waitUntil: 'load', timeout: 60000 });
await p.waitForTimeout(3000);
try { await p.getByRole('button', { name: 'Core', exact: true }).first().click({ timeout: 3000 }); await p.waitForTimeout(1200); } catch (e) { console.log('no core click'); }
await p.screenshot({ path: 'design-pilot/review/_pricing-core.png', clip: { x: 0, y: 140, width: 1366, height: 580 } });
await b.close(); console.log('done');
