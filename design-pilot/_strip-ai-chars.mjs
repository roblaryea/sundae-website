import fs from 'fs';
import path from 'path';
const exts = new Set(['.ts','.tsx','.js','.jsx','.mjs','.cjs','.json','.md','.mdx','.yml','.yaml','.html','.css']);
const skipDirs = new Set(['node_modules','.next','.git','design-pilot','test-results','coverage','dist','build','.vercel','playwright-report']);
const skipFiles = new Set(['package-lock.json','pnpm-lock.yaml','yarn.lock']);
const repl = [
  [/—/g, '-'], [/–/g, '-'], [/…/g, '...'],
  [/[​‌‍﻿⁠]/g, ''],
];
const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.isDirectory()) { if (!skipDirs.has(e.name)) walk(path.join(d, e.name)); }
    else if (exts.has(path.extname(e.name)) && !skipFiles.has(e.name)) files.push(path.join(d, e.name));
  }
})('src');
let total = 0; const changed = [];
for (const f of files) {
  let s = fs.readFileSync(f, 'utf8'); const o = s; let n = 0;
  for (const [re, to] of repl) s = s.replace(re, () => { n++; return to; });
  if (s !== o) { fs.writeFileSync(f, s); changed.push([f, n]); total += n; }
}
console.log('scanned:', files.length, '| changed this run:', changed.length, '| replacements:', total);
changed.slice(0, 20).forEach(([f, n]) => console.log(String(n).padStart(4), f.replace('src/', '')));
console.log('--- remaining em/en/ellipsis anywhere in src (any ext): ---');
let remaining = 0;
(function rescan(d){ for (const e of fs.readdirSync(d,{withFileTypes:true})){ if(e.isDirectory()){ if(!skipDirs.has(e.name)) rescan(path.join(d,e.name)); } else { const s=fs.readFileSync(path.join(d,e.name),'utf8'); const m=(s.match(/[—–…]/g)||[]).length; if(m){ remaining+=m; console.log(String(m).padStart(4), path.join(d,e.name).replace('src/','')); } } } })('src');
console.log('remaining total:', remaining);
