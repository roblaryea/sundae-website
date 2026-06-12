// Warm leftover cold BRAND-CHROME colors (gradient pairs + solid icon boxes).
// Categorical single colors (bg-*-500/400/300 used in charts/matrices) are NOT touched.
// Usage: node design-pilot/_warm-chrome.mjs            (dry run, reports counts)
//        node design-pilot/_warm-chrome.mjs --apply    (writes changes)
import fs from 'fs';
import path from 'path';

const APPLY = process.argv.includes('--apply');

// Each entry: [regex, replacement]. (?![0-9]) guards stop bg-purple-50 from
// eating bg-purple-500 etc. Order is irrelevant (tokens are distinct).
const MAP = [
  // --- gradient PAIRS (always icon-box / card / step chrome) ---
  [/from-blue-500 to-blue-600/g,     'from-[#FF7E6F] to-[#FF5C4D]'],
  [/from-blue-500 to-indigo-600/g,   'from-[#FF7E6F] to-[#E03E48]'],
  [/from-indigo-500 to-indigo-600/g, 'from-[#FF6B5B] to-[#E03E48]'],
  [/from-pink-500 to-pink-600/g,     'from-[#FF8473] to-[#FF5C4D]'],
  [/from-purple-500 to-purple-600/g, 'from-[#F2B45C] to-[#C2410C]'],
  [/from-violet-500 to-purple-600/g, 'from-[#F4A259] to-[#C2410C]'],
  [/from-cyan-500 to-cyan-600/g,     'from-[#F2C078] to-[#E9A24A]'],
  [/from-cyan-500 to-blue-600/g,     'from-[#E9A24A] to-[#FF5C4D]'],
  [/from-purple-500 to-pink-600/g,   'from-[#E9A24A] to-[#FF5C4D]'],
  [/from-purple-500 to-cyan-600/g,   'from-[#E9A24A] to-[#F2C078]'],
  [/from-indigo-500 to-purple-600/g, 'from-[#FF6B5B] to-[#C2410C]'],
  [/from-purple-500 to-indigo-600/g, 'from-[#F2B45C] to-[#E03E48]'],
  // --- soft pastel section backgrounds (cold half only) ---
  [/from-indigo-50 to-orange-50/g, 'from-[#FFF1EC] to-orange-50'],
  [/from-purple-50 to-orange-50/g, 'from-[#FFF1EC] to-orange-50'],
  // --- solid icon-box backgrounds ---
  [/bg-indigo-600(?![0-9])/g, 'bg-[#FF5C4D]'],
  [/bg-purple-600(?![0-9])/g, 'bg-[#FF5C4D]'],
  // --- paired accent text / tint (4d-intelligence, architecture) ---
  [/text-purple-600(?![0-9])/g, 'text-[#C2410C]'],
  [/bg-purple-50(?![0-9])/g,    'bg-[#FF5C4D]/10'],
  // --- stray gradient tail (getting-started line ~469) ---
  [/to-purple-400(?![0-9])/g, 'to-[#F2B45C]'],
];

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(tsx?|ts)$/.test(e.name)) out.push(p);
  }
  return out;
}

const targets = [
  ...walk('src/app'),
  ...walk('src/generated-locales'),
];

let totalFiles = 0, totalHits = 0;
for (const file of targets) {
  let src = fs.readFileSync(file, 'utf8');
  let hits = 0;
  for (const [re, rep] of MAP) {
    src = src.replace(re, (m) => { hits++; return rep; });
  }
  if (hits > 0) {
    totalFiles++; totalHits += hits;
    console.log(`${String(hits).padStart(4)}  ${file}`);
    if (APPLY) fs.writeFileSync(file, src);
  }
}
console.log(`\n${APPLY ? 'APPLIED' : 'DRY RUN'}: ${totalHits} replacements across ${totalFiles} files`);
