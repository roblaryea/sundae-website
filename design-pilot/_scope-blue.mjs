import fs from 'fs';
import path from 'path';
const ROOT = '/Users/robertlaryea/Documents/Dev/sundae-website/src';
const skip = new Set(['node_modules','.next','.git','design-pilot','generated-locales','home']);
const reBlue = /1C47FF|28,\s*71,\s*255|60A5FA|3B82F6|0A1E8C|93C5FD|2563EB|electric-blue|--color-core\b|(?:text|bg|border|from|to|via)-blue-\d|5B8DEF/gi;
const areas = {};
let totalFiles = 0, totalHits = 0;
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.isDirectory()) { if (!skip.has(e.name)) walk(path.join(d, e.name)); continue; }
    if (!/\.(tsx|ts)$/.test(e.name)) continue;
    const p = path.join(d, e.name);
    const m = fs.readFileSync(p, 'utf8').match(reBlue);
    if (m) { totalFiles++; totalHits += m.length; const rel = p.slice(ROOT.length + 1); const area = rel.split('/').slice(0, 2).join('/'); areas[area] = (areas[area] || 0) + m.length; }
  }
})(ROOT);
console.log('files with blue chrome:', totalFiles, '| total hits:', totalHits, '\n--- by area (top 30) ---');
Object.entries(areas).sort((a,b)=>b[1]-a[1]).slice(0,30).forEach(([a,n])=>console.log(String(n).padStart(5), a));
