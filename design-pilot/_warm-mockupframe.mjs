import fs from 'fs';
const p = '/Users/robertlaryea/Documents/Dev/sundae-website/src/components/ui/MockupFrame.tsx';
const map = [
  ['#1C47FF','#FF5C4D'], ['#3B82F6','#E9A24A'], ['#0A1E8C','#C2410C'],
  ['#2563EB','#FF5C4D'], ['#60A5FA','#FF8473'], ['#93C5FD','#FFB59E'],
  ['rgba(28,71,255,','rgba(255,92,77,'], ['rgba(28, 71, 255,','rgba(255, 92, 77,'],
];
let s = fs.readFileSync(p,'utf8'); const o=s; let n=0;
for (const [a,b] of map){ const parts=s.split(a); n+=parts.length-1; s=parts.join(b); }
fs.writeFileSync(p,s); console.log('MockupFrame: warmed', n, 'blue refs');
