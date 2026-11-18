import { readFile, readdir, realpath, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

// The Next SDK contains both build tooling and runtime code. Audit the emitted
// package inventory AND the declared Sentry runtime closure, including code
// bundled into chunks rather than left in the file traces. These four direct
// SDK dependencies are build tools; the separate trace gate must exclude them.
const buildOnlySentryRoots = new Set([
  '@rollup/plugin-commonjs', '@sentry/bundler-plugins', '@sentry/webpack-plugin', 'rollup',
]);

export async function requestAdvisories(packages) {
  if (!Object.keys(packages).length) throw new Error('Runtime audit inventory is empty');
  const response = await fetch('https://registry.npmjs.org/-/npm/v1/security/advisories/bulk', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(packages),
    signal: AbortSignal.timeout(60_000),
  });
  if (!response.ok) throw new Error(`Runtime advisory service returned HTTP ${response.status}`);
  return response.json();
}

export function classifyAdvisories(advisories, packages) {
  if (!advisories || typeof advisories !== 'object' || Array.isArray(advisories)) {
    throw new Error('Invalid runtime advisory response');
  }
  const findings = [];
  for (const [name, entries] of Object.entries(advisories)) {
    if (!Object.hasOwn(packages, name) || !Array.isArray(entries)) {
      throw new Error(`Invalid advisory inventory for ${name}`);
    }
    for (const entry of entries) {
      if (!entry || !['info', 'low', 'moderate', 'high', 'critical'].includes(entry.severity)
          || typeof entry.vulnerable_versions !== 'string') {
        throw new Error(`Invalid advisory for ${name}`);
      }
      findings.push({ name, versions: packages[name], severity: entry.severity,
        title: entry.title, url: entry.url, vulnerableVersions: entry.vulnerable_versions });
    }
  }
  return { findings, blocking: findings.filter(f => ['high', 'critical'].includes(f.severity)) };
}

export async function reportBuildAudit(root = process.cwd()) {
  const full = spawnSync('npm', ['audit', '--include=dev', '--json'], {
    cwd: root, encoding: 'utf8', timeout: 180_000, maxBuffer: 10 * 1024 * 1024,
  });
  const buildReport = JSON.parse(full.stdout || '{}');
  if (full.error || ![0, 1].includes(full.status) || buildReport.error
      || !buildReport.metadata?.vulnerabilities) {
    throw new Error('Unable to obtain complete build dependency audit: '
      + (full.error?.message || buildReport.error?.summary || full.stderr?.slice(-1000) || `exit ${full.status}`));
  }
  await mkdir(path.join(root, 'output/seo'), { recursive: true });
  await writeFile(path.join(root, 'output/seo/build-dependency-audit.json'), JSON.stringify(buildReport, null, 2) + '\n');
  console.log('Complete build/development audit (reported separately): ' + JSON.stringify(buildReport.metadata.vulnerabilities));
  console.log(JSON.stringify(buildReport, null, 2));
}

export async function auditRuntime(root = process.cwd()) {
  const traces = [];
  async function walk(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const current = path.join(directory, entry.name);
      if (entry.isDirectory()) await walk(current);
      else if (entry.name.endsWith('.nft.json')) traces.push(current);
    }
  }
  await walk(path.join(root, '.next'));
  if (!traces.length) throw new Error('No emitted production traces found');
  const manifestPaths = new Set();
  for (const trace of traces) {
    const data = JSON.parse(await readFile(trace, 'utf8'));
    if (!Array.isArray(data.files)) throw new Error(`Invalid production trace: ${trace}`);
    for (const file of data.files) {
      const absolute = path.resolve(path.dirname(trace), file);
      const normalized = absolute.replaceAll('\\', '/');
      const index = normalized.lastIndexOf('/node_modules/');
      if (index < 0) continue;
      const parts = normalized.slice(index + '/node_modules/'.length).split('/');
      const name = parts[0].startsWith('@') ? parts.slice(0, 2).join('/') : parts[0];
      manifestPaths.add(normalized.slice(0, index) + '/node_modules/' + name + '/package.json');
      if (file.endsWith('/package.json')) manifestPaths.add(absolute);
    }
  }

  const versions = new Map(), seen = new Set();
  async function record(manifest) {
    const resolved = await realpath(manifest);
    const data = JSON.parse(await readFile(resolved, 'utf8'));
    if (typeof data.name !== 'string' || typeof data.version !== 'string') {
      // Next's vendored modules can carry a name-only manifest. The containing
      // versioned Next package is audited; do not invent a vendored version.
      return null;
    }
    if (!versions.has(data.name)) versions.set(data.name, new Set());
    versions.get(data.name).add(data.version);
    return { resolved, data };
  }
  for (const manifest of manifestPaths) await record(manifest);

  async function resolveDependency(from, name) {
    let directory = from;
    while (true) {
      const manifest = path.join(directory, 'node_modules', name, 'package.json');
      try { return await realpath(manifest); } catch (error) {
        if (error.code !== 'ENOENT' && error.code !== 'ENOTDIR') throw error;
      }
      const parent = path.dirname(directory);
      if (parent === directory) throw new Error(`Cannot inventory runtime dependency ${name} from ${from}`);
      directory = parent;
    }
  }
  async function runtimeClosure(manifest, sdkRoot = false) {
    const current = await record(manifest);
    if (!current) throw new Error(`Unversioned runtime dependency: ${manifest}`);
    if (seen.has(current.resolved)) return;
    seen.add(current.resolved);
    for (const name of Object.keys(current.data.dependencies || {})) {
      if (sdkRoot && buildOnlySentryRoots.has(name)) continue;
      await runtimeClosure(await resolveDependency(path.dirname(current.resolved), name));
    }
  }
  await runtimeClosure(await resolveDependency(root, '@sentry/nextjs'), true);
  if (!versions.has('next') || !versions.has('@sentry/nextjs')) {
    throw new Error('Runtime audit is missing Next or Sentry');
  }
  // npm's bulk endpoint filters advisories against the submitted versions; it
  // does not reintroduce dependencies that are absent from this inventory.
  const packages = Object.fromEntries([...versions].sort(([a], [b]) => a.localeCompare(b))
    .map(([name, values]) => [name, [...values].sort()]));
  const result = classifyAdvisories(await requestAdvisories(packages), packages);
  const report = { checkedAt: new Date().toISOString(), traces: traces.length,
    packages, ...result };
  await mkdir(path.join(root, 'output/seo'), { recursive: true });
  await writeFile(path.join(root, 'output/seo/deployed-runtime-audit.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(`Deployed runtime audit: ${Object.keys(packages).length} packages, ${result.blocking.length} high/critical findings, ${result.findings.length} total advisories`);
  if (result.blocking.length) {
    for (const finding of result.blocking) console.error(`${finding.severity}: ${finding.name} ${finding.url}`);
    throw new Error('Deployed runtime security audit failed');
  }
  return report;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  // The security workflow retains the full build/development report. Deploys
  // always run the emitted-runtime audit; an informational full-tree report
  // need not repeat npm's expensive metadata calculation on each deployment.
  if (process.argv.includes('--build-report')) await reportBuildAudit();
  else await auditRuntime();
}
