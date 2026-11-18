import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const traceRoot = path.resolve('.next');
const traceFiles = [];

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const current = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await walk(current);
    } else if (entry.name.endsWith('.nft.json')) {
      traceFiles.push(current);
    }
  }
}

await walk(traceRoot);

const tracedFiles = new Set();
for (const traceFile of traceFiles) {
  const trace = JSON.parse(await readFile(traceFile, 'utf8'));
  for (const file of trace.files ?? []) tracedFiles.add(file.replaceAll('\\', '/'));
}

const hasSentryRuntime = ['client', 'server', 'edge'].every((target) =>
  [...tracedFiles].some((file) =>
    new RegExp(`node_modules/@sentry/nextjs/build/cjs/${target}/index\\.js$`).test(file),
  ),
);
const forbiddenBuildPackages = [...tracedFiles].filter((file) =>
  /node_modules\/(?:@rollup\/plugin-commonjs|@rollup\/pluginutils|fdir|tinyglobby|picomatch)(?:\/|$)/.test(file),
);

if (!hasSentryRuntime) {
  throw new Error('Production trace is missing the Sentry client/server/edge runtime');
}
if (forbiddenBuildPackages.length > 0) {
  throw new Error(
    `Production trace contains build-only packages: ${forbiddenBuildPackages.slice(0, 10).join(', ')}`,
  );
}

console.log(
  `Production trace boundary passed: ${traceFiles.length} traces retain Sentry runtime and exclude Rollup/glob matcher packages`,
);
