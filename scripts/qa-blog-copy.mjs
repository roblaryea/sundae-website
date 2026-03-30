import fs from 'node:fs';
import path from 'node:path';

const blogDataPath = path.join(process.cwd(), 'src/lib/blogData.ts');
const source = fs.readFileSync(blogDataPath, 'utf8');

function countMatches(text, pattern) {
  return text.match(pattern)?.length ?? 0;
}

function analyzeText(text) {
  const issues = [];
  const emDashCount = countMatches(text, /[—–]/g);
  const contrastCount = countMatches(
    text,
    /\b(?:isn't|is not|aren't|are not|doesn't|does not|don't|do not|can't|cannot|won't|will not)\b[^.!?]{0,90}\bit'?s\b/gi,
  );
  const authorityCount = countMatches(
    text,
    /\b(?:the reality is|the truth is|the key is|what this means is|the difference between)\b/gi,
  );
  const hypeCount = countMatches(
    text,
    /\b(?:transformative|seamless|powerful|robust|comprehensive|unlock|elevate|revolutionize)\b/gi,
  );
  const colonCount = countMatches(text, /:/g);
  const paragraphs = text.split(/\n{2,}/).filter((chunk) => chunk.trim().length > 0).length;

  if (emDashCount >= 3) {
    issues.push(`long-dash overuse (${emDashCount})`);
  }
  if (contrastCount >= 1) {
    issues.push(`formulaic contrast pattern (${contrastCount})`);
  }
  if (authorityCount >= 2) {
    issues.push(`empty authority phrases (${authorityCount})`);
  }
  if (hypeCount >= 3) {
    issues.push(`generic hype terms (${hypeCount})`);
  }
  if (colonCount >= 8 && paragraphs <= Math.max(8, Math.ceil(colonCount / 2))) {
    issues.push(`colon-heavy scaffolding (${colonCount})`);
  }

  return issues;
}

function parsePosts(fileText) {
  const lines = fileText.split('\n');
  const posts = [];
  let current = null;
  let inContent = false;
  let contentLines = [];

  for (const line of lines) {
    if (inContent) {
      const closingTickIndex = line.lastIndexOf('`');
      if (closingTickIndex >= 0) {
        const beforeTick = line.slice(0, closingTickIndex);
        if (beforeTick) {
          contentLines.push(beforeTick);
        }
        current.content = contentLines.join('\n');
        inContent = false;
        contentLines = [];
        continue;
      }

      contentLines.push(line);
      continue;
    }

    const slugMatch = line.match(/slug:\s*"([^"]+)"/);
    if (slugMatch) {
      if (current?.slug) posts.push(current);
      current = { slug: slugMatch[1], title: '', summary: '', content: '' };
      continue;
    }

    if (!current) continue;

    const titleMatch = line.match(/title:\s*"([^"]+)"/);
    if (titleMatch) {
      current.title = titleMatch[1];
      continue;
    }

    const summaryMatch = line.match(/summary:\s*"([^"]+)"/);
    if (summaryMatch) {
      current.summary = summaryMatch[1];
      continue;
    }

    const contentMatch = line.match(/content:\s*`(.*)$/);
    if (contentMatch) {
      inContent = true;
      if (contentMatch[1]) {
        contentLines.push(contentMatch[1]);
      }
    }
  }

  if (current?.slug) posts.push(current);
  return posts.filter((post) => post.slug && post.title && post.summary && post.content);
}

const results = [];
for (const post of parsePosts(source)) {
  const issues = analyzeText(`${post.summary}\n\n${post.content}`);
  results.push({ slug: post.slug, title: post.title, issues });
}

const flagged = results.filter((post) => post.issues.length > 0);

console.log(`Scanned ${results.length} blog posts in ${path.relative(process.cwd(), blogDataPath)}.`);

if (flagged.length === 0) {
  console.log('No obvious AI-style copy flags found.');
  process.exit(0);
}

console.log(`Found ${flagged.length} posts with human-touch review flags:\n`);

for (const post of flagged) {
  console.log(`- ${post.slug}`);
  console.log(`  ${post.title}`);
  for (const issue of post.issues) {
    console.log(`  • ${issue}`);
  }
  console.log('');
}

console.log('Recommendation: run a human edit pass on flagged posts before publishing.');
