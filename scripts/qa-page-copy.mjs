import fs from 'node:fs';
import path from 'node:path';

const pageFiles = [
  'src/app/page.tsx',
  'src/app/about/page.tsx',
  'src/app/architecture/page.tsx',
  'src/app/benchmarking/page.tsx',
  'src/app/canvas/page.tsx',
  'src/app/careers/page.tsx',
  'src/app/faq/page.tsx',
  'src/app/insights/page.tsx',
  'src/app/modules/page.tsx',
  'src/app/pricing/page.tsx',
  'src/app/product/cross-intelligence/page.tsx',
  'src/app/product/pulse/page.tsx',
];

function countMatches(text, pattern) {
  return text.match(pattern)?.length ?? 0;
}

function stripCodeNoise(text) {
  return text
    .replace(/import[\s\S]*?;\n/g, '')
    .replace(/className=\{`[\s\S]*?`\}/g, '')
    .replace(/className="[^"]*"/g, '')
    .replace(/className='[^']*'/g, '')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/\/\/.*$/gm, '');
}

function extractEnglishSlice(source) {
  const englishBlock = source.match(/\ben:\s*\{[\s\S]*?(?=\n\s{2}(?:ar|fr|es):\s*\{|\n\}\s+as const|\n\};)/);
  return stripCodeNoise(englishBlock ? englishBlock[0] : source);
}

function analyzeText(text) {
  const issues = [];
  const emDashCount = countMatches(text, /[—–]/g);
  const contrastCount = countMatches(
    text,
    /\b(?:isn't|is not|aren't|are not|doesn't|does not|don't|do not|can't|cannot|won't|will not)\b[^.!?\n]{0,90}\bit'?s\b/gi,
  );
  const authorityCount = countMatches(
    text,
    /\b(?:the reality is|the truth is|the key is|what this means is)\b/gi,
  );
  const hypeCount = countMatches(
    text,
    /\b(?:seamless|powerful|robust|comprehensive|revolutionize|game-changer|category-defining|more than just|not just)\b/gi,
  );

  if (emDashCount >= 6) {
    issues.push(`long-dash overuse (${emDashCount})`);
  }
  if (contrastCount >= 1) {
    issues.push(`formulaic contrast pattern (${contrastCount})`);
  }
  if (authorityCount >= 1) {
    issues.push(`empty authority phrase (${authorityCount})`);
  }
  if (hypeCount >= 3) {
    issues.push(`generic hype terms (${hypeCount})`);
  }

  return issues;
}

const results = pageFiles.map((filePath) => {
  const absolutePath = path.join(process.cwd(), filePath);
  const source = fs.readFileSync(absolutePath, 'utf8');
  const issues = analyzeText(extractEnglishSlice(source));
  return { filePath, issues };
});

const flagged = results.filter((result) => result.issues.length > 0);

console.log(`Scanned ${results.length} core marketing pages for AI-style copy flags.`);

if (flagged.length === 0) {
  console.log('No obvious human-touch review flags found.');
  process.exit(0);
}

console.log(`Found ${flagged.length} pages with human-touch review flags:\n`);

for (const page of flagged) {
  console.log(`- ${page.filePath}`);
  for (const issue of page.issues) {
    console.log(`  • ${issue}`);
  }
  console.log('');
}

console.log('Recommendation: run a human edit pass on flagged pages before publishing.');
process.exit(1);
