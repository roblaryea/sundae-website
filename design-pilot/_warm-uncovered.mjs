import fs from 'fs';
const ROOT = '/Users/robertlaryea/Documents/Dev/sundae-website/';
const map = [
  ['text-blue-300','text-[#FFB59E]'], ['text-blue-400','text-[#FF8473]'],
  ['bg-blue-500','bg-[#FF5C4D]'], ['bg-blue-600','bg-[#FF5C4D]'],
  ['from-blue-400','from-[#FF8473]'], ['from-blue-500','from-[#FF5C4D]'],
  ['to-blue-600','to-[#E03E48]'], ['border-blue-200','border-[#FFD3C8]'],
  ['ring-blue-400','ring-[#FF8473]'], ['ring-blue-500','ring-[#FF5C4D]'], ['ring-blue-600','ring-[#FF5C4D]'],
  ['#60A5FA','#FF8473'],
];
const files = ['src/app/sign-in/page.tsx','src/app/security/page.tsx','src/app/not-found.tsx','src/app/loading.tsx','src/app/layout.tsx','src/components/CookieConsent.tsx','src/components/Navbar.tsx','src/app/intelligence/page.tsx'];
let total = 0;
for (const f of files) {
  const p = ROOT + f; let s = fs.readFileSync(p, 'utf8'); const o = s; let n = 0;
  for (const [a, b] of map) { const parts = s.split(a); n += parts.length - 1; s = parts.join(b); }
  if (s !== o) { fs.writeFileSync(p, s); total += n; console.log(String(n).padStart(3), f); }
}
console.log('total warmed:', total);
