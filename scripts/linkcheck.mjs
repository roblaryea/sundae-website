#!/usr/bin/env node

/**
 * Link Checker for Sundae marketing site.
 *
 * Usage:
 *   node scripts/linkcheck.mjs                                    # static-only (no server needed)
 *   SITE_BASE_URL=http://localhost:3000 node scripts/linkcheck.mjs # static + live probe
 *
 * Two complementary checks:
 *   1. Static route audit — compares href references in source code
 *      against page.tsx files on disk to find missing routes.
 *   2. Live probe — probes each discovered route against a running
 *      server and records HTTP status codes. Handles auth-redirect walls.
 *
 * Outputs:
 *   reports/linkcheck-report.json
 *   reports/linkcheck-report.md
 */

import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { join, relative, resolve } from "node:path";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const BASE_URL = (
  process.env.SITE_BASE_URL || "http://localhost:3000"
).replace(/\/$/, "");
const MAX_DEPTH = Number(process.env.LINKCHECK_MAX_DEPTH) || 4;
const MAX_PAGES = Number(process.env.LINKCHECK_MAX_PAGES) || 500;
const CONCURRENCY = Number(process.env.LINKCHECK_CONCURRENCY) || 8;
const REQUEST_TIMEOUT_MS = 10_000;

const PROJECT_ROOT = resolve(import.meta.dirname, "..");
const APP_DIR = join(PROJECT_ROOT, "src", "app");
const REPORTS_DIR = join(PROJECT_ROOT, "reports");

const SKIP_EXTENSIONS = new Set([
  ".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp",
  ".css", ".js", ".mjs", ".cjs",
  ".ico", ".mp4", ".webm", ".pdf", ".woff", ".woff2", ".ttf", ".eot",
]);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function shouldSkipHref(href) {
  if (!href) return true;
  if (href.startsWith("#")) return true;
  if (href.startsWith("mailto:")) return true;
  if (href.startsWith("tel:")) return true;
  if (href.startsWith("javascript:")) return true;
  if (href.startsWith("/_next/")) return true;
  const lower = href.toLowerCase();
  for (const ext of SKIP_EXTENSIONS) {
    if (lower.endsWith(ext)) return true;
  }
  return false;
}

function normalizeUrl(rawHref, pageUrl) {
  try {
    const url = new URL(rawHref, pageUrl);
    const base = new URL(BASE_URL);
    if (url.origin !== base.origin) return null;
    url.hash = "";
    url.search = "";
    let path = url.pathname.replace(/\/+$/, "") || "/";
    url.pathname = path;
    return url.href;
  } catch {
    return null;
  }
}

/** Extract href values from rendered HTML. */
function extractHtmlLinks(html) {
  const hrefs = new Set();
  const regex = /href\s*=\s*["']([^"']+)["']/gi;
  let m;
  while ((m = regex.exec(html)) !== null) {
    hrefs.add(m[1]);
  }
  return [...hrefs];
}

/** Concurrency pool. */
function createPool(concurrency) {
  let active = 0;
  const queue = [];
  function next() {
    if (queue.length === 0 || active >= concurrency) return;
    active++;
    const { fn, res, rej } = queue.shift();
    fn().then(res, rej).finally(() => { active--; next(); });
  }
  return function run(fn) {
    return new Promise((res, rej) => { queue.push({ fn, res, rej }); next(); });
  };
}

// ---------------------------------------------------------------------------
// Part 1 — Static Route Audit
// ---------------------------------------------------------------------------

/** Recursively list all page.tsx files. */
async function findPageFiles(dir) {
  const results = [];
  let entries;
  try { entries = await readdir(dir, { withFileTypes: true }); } catch { return results; }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await findPageFiles(full)));
    } else if (/^page\.(tsx|ts|jsx|js)$/.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

/** Convert page file path to URL route. */
function pageFileToRoute(filePath) {
  let rel = relative(APP_DIR, filePath);
  rel = rel.replace(/[/\\]page\.(tsx|ts|jsx|js)$/, "");
  if (/^page\.(tsx|ts|jsx|js)$/.test(rel)) return "/";
  if (rel.includes("[")) return null; // dynamic segments
  if (rel === "") return "/";
  return "/" + rel.replace(/\\/g, "/");
}

/** Recursively find source files. */
async function findSourceFiles(dir) {
  const results = [];
  let entries;
  try { entries = await readdir(dir, { withFileTypes: true }); } catch { return results; }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith(".") && entry.name !== "node_modules") {
      results.push(...(await findSourceFiles(full)));
    } else if (/\.(tsx?|jsx?)$/.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

/**
 * Extract internal route references from source code.
 * Handles JSX attributes (href="/path"), object literals (href: '/path'),
 * redirects, and router navigation.
 */
function extractStaticHrefs(source) {
  const hrefs = new Set();

  const patterns = [
    // JSX: href="/path" or href={"/path"} or to="/path"
    /(?:href|to)\s*=\s*["'](\/[\w\-\/]*)["']/g,
    /(?:href|to)\s*=\s*\{\s*["'](\/[\w\-\/]*)["']\s*\}/g,
    // Object literal: href: '/path' or href: "/path"
    /href:\s*["'](\/[\w\-\/]*)["']/g,
    // redirect("/path") or redirect('/path')
    /redirect\(\s*["'](\/[\w\-\/]*)["']/g,
    // router.push("/path") or router.replace("/path")
    /router\.(?:push|replace)\(\s*["'](\/[\w\-\/]*)["']/g,
    // window.location.href = '/path'
    /window\.location\.href\s*=\s*["'](\/[\w\-\/]*)["']/g,
  ];

  for (const regex of patterns) {
    let m;
    while ((m = regex.exec(source)) !== null) {
      let path = m[1].replace(/\/+$/, "") || "/";
      if (path.includes("[") || path.includes("{")) continue;
      if (path.startsWith("/_next")) continue;
      if (path === "/api" || path.startsWith("/api/")) continue;
      hrefs.add(path);
    }
  }
  return [...hrefs];
}

/** Parse next.config.ts for redirect sources and destinations. */
async function parseNextConfigRedirects() {
  const redirects = new Map(); // source -> destination
  try {
    const content = await readFile(join(PROJECT_ROOT, "next.config.ts"), "utf-8");
    const blocks = content.matchAll(
      /\{\s*source:\s*['"]([^'"]+)['"]\s*,\s*destination:\s*['"]([^'"]+)['"]/g
    );
    for (const m of blocks) {
      const src = m[1].replace(/\/:\w+\*?$/, "");
      const dest = m[2];
      if (src) redirects.set(src, dest);
    }
  } catch { /* no config */ }
  return redirects;
}

async function staticRouteAudit() {
  console.log("\n--- Static Route Audit ---\n");

  // 1. Enumerate routes on disk
  const pageFiles = await findPageFiles(APP_DIR);
  const diskRoutes = new Set();
  const diskRouteFiles = new Map();
  for (const f of pageFiles) {
    const route = pageFileToRoute(f);
    if (route) {
      diskRoutes.add(route);
      diskRouteFiles.set(route, relative(PROJECT_ROOT, f));
    }
  }
  console.log(`  Routes on disk: ${diskRoutes.size}`);

  // 2. Extract href references from all source files
  const srcDir = join(PROJECT_ROOT, "src");
  const sourceFiles = await findSourceFiles(srcDir);
  const referencedRoutes = new Map();

  for (const f of sourceFiles) {
    const content = await readFile(f, "utf-8");
    const hrefs = extractStaticHrefs(content);
    for (const href of hrefs) {
      if (!referencedRoutes.has(href)) referencedRoutes.set(href, []);
      referencedRoutes.get(href).push(relative(PROJECT_ROOT, f));
    }
  }
  console.log(`  Unique routes referenced in code: ${referencedRoutes.size}`);

  // 3. Parse redirect config
  const configRedirects = await parseNextConfigRedirects();
  console.log(`  Configured redirects: ${configRedirects.size}`);

  // 4. Missing: referenced but no page on disk and not a redirect source
  const missing = [];
  for (const [route, files] of referencedRoutes.entries()) {
    if (route === "/" || route === "#") continue;
    if (!diskRoutes.has(route) && !configRedirects.has(route)) {
      missing.push({ route, referencedIn: files });
    }
  }

  // 5. Unreferenced: on disk but never linked
  const unreferenced = [];
  for (const route of diskRoutes) {
    if (route === "/") continue;
    if (!referencedRoutes.has(route)) {
      // Skip redirect sources (e.g., /signin -> /sign-in) and destinations
      const isRedirectSource = configRedirects.has(route);
      const isRedirectDest = [...configRedirects.values()].some(
        (d) => d === route || d.startsWith(route)
      );
      if (!isRedirectDest && !isRedirectSource) {
        unreferenced.push(route);
      }
    }
  }

  console.log(`  MISSING (referenced but no page): ${missing.length}`);
  console.log(`  UNREFERENCED (page exists, no link): ${unreferenced.length}`);

  return {
    diskRoutes: [...diskRoutes].sort(),
    diskRouteFiles: Object.fromEntries(diskRouteFiles),
    referencedRoutes: Object.fromEntries(referencedRoutes),
    configRedirects: Object.fromEntries(configRedirects),
    missing: missing.sort((a, b) => a.route.localeCompare(b.route)),
    unreferenced: unreferenced.sort(),
  };
}

// ---------------------------------------------------------------------------
// Part 2 — Live Probe
// ---------------------------------------------------------------------------

async function liveProbe(auditResults) {
  console.log(`\n--- Live Probe: ${BASE_URL} ---\n`);

  // Routes to check: union of disk routes + referenced routes + well-known paths
  const routesToCheck = new Set([
    "/",
    ...auditResults.diskRoutes,
    ...Object.keys(auditResults.referencedRoutes),
    // Well-known routes a marketing site should have
    "/support", "/help", "/status", "/changelog",
  ]);

  // Detect auth-redirect wall
  let authRedirectDetected = false;
  try {
    const resp = await fetch(BASE_URL + "/", { redirect: "manual" });
    const loc = resp.headers.get("location") || "";
    if (resp.status === 307 && loc.includes("sign-in")) {
      authRedirectDetected = true;
      console.log("  Auth-redirect wall detected (307 -> /sign-in).");
      console.log("  Live probe can only verify auth-exempt routes (e.g., /sign-in).");
      console.log("  Static analysis is the primary source of truth.\n");
    }
  } catch { /* continue */ }

  const results = new Map();
  const pool = createPool(CONCURRENCY);

  const tasks = [...routesToCheck].map((route) =>
    pool(async () => {
      const url = BASE_URL + route;
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

        const resp = await fetch(url, {
          method: "GET",
          redirect: "manual",
          signal: controller.signal,
          headers: { "User-Agent": "SundaeLinkChecker/1.0" },
        });
        clearTimeout(timer);

        const status = resp.status;
        const location = resp.headers.get("location") || "";

        let classification;
        if (status === 200) {
          classification = "ok";
        } else if (authRedirectDetected && status === 307 && location.includes("sign-in")) {
          classification = "auth-redirect";
        } else if (status >= 300 && status < 400) {
          classification = "redirect";
        } else if (status >= 400) {
          classification = "broken";
        } else {
          classification = "ok";
        }

        const icon =
          classification === "broken" ? "✗" :
          classification === "redirect" ? "→" :
          classification === "auth-redirect" ? "~" : "✓";
        const extra = location && classification !== "auth-redirect" ? `  -> ${location}` : "";
        console.log(`  ${icon} ${status}  ${route}${extra}`);

        results.set(route, { status, location, classification });
      } catch (err) {
        console.log(`  ✗ ERR  ${route}  (${err.message})`);
        results.set(route, { status: 0, error: err.message, classification: "error" });
      }
    })
  );

  await Promise.all(tasks);
  return results;
}

// ---------------------------------------------------------------------------
// Part 3 — Report Generation
// ---------------------------------------------------------------------------

async function generateReports(auditResults, probeResults) {
  await mkdir(REPORTS_DIR, { recursive: true });

  const broken = [];
  const redirects = [];
  const authRedirects = [];
  const probeOk = [];
  const probeErrors = [];

  if (probeResults) {
    for (const [route, data] of probeResults.entries()) {
      const entry = { route, ...data };
      switch (data.classification) {
        case "broken": broken.push(entry); break;
        case "redirect": redirects.push(entry); break;
        case "auth-redirect": authRedirects.push(entry); break;
        case "error": probeErrors.push(entry); break;
        default: probeOk.push(entry);
      }
    }
    broken.sort((a, b) => a.route.localeCompare(b.route));
    redirects.sort((a, b) => a.route.localeCompare(b.route));
  }

  const summary = {
    baseUrl: BASE_URL,
    timestamp: new Date().toISOString(),
    probeTotal: probeResults ? probeResults.size : 0,
    probeOk: probeOk.length,
    probeBroken: broken.length,
    probeRedirects: redirects.length,
    probeAuthRedirects: authRedirects.length,
    probeErrors: probeErrors.length,
    diskRoutes: auditResults.diskRoutes.length,
    referencedRoutes: Object.keys(auditResults.referencedRoutes).length,
    missingStaticRoutes: auditResults.missing.length,
    unreferencedRoutes: auditResults.unreferenced.length,
  };

  // JSON
  const jsonReport = {
    summary,
    missingRoutes: auditResults.missing,
    unreferencedRoutes: auditResults.unreferenced,
    brokenProbes: broken,
    redirectProbes: redirects,
    probeErrors,
    configRedirects: auditResults.configRedirects,
    diskRoutes: auditResults.diskRoutes,
  };

  const jsonPath = join(REPORTS_DIR, "linkcheck-report.json");
  await writeFile(jsonPath, JSON.stringify(jsonReport, null, 2));
  console.log(`\nJSON report: ${relative(PROJECT_ROOT, jsonPath)}`);

  // Markdown
  let md = `# Link Check Report\n\n`;
  md += `**Base URL:** ${BASE_URL}  \n`;
  md += `**Date:** ${summary.timestamp}  \n\n`;

  md += `## Summary\n\n`;
  md += `| Metric | Count |\n|---|---|\n`;
  md += `| Routes on disk | ${summary.diskRoutes} |\n`;
  md += `| Routes referenced in code | ${summary.referencedRoutes} |\n`;
  md += `| **Missing routes (likely 404)** | **${summary.missingStaticRoutes}** |\n`;
  md += `| Unreferenced routes (orphans) | ${summary.unreferencedRoutes} |\n`;
  if (probeResults) {
    md += `| Live probes total | ${summary.probeTotal} |\n`;
    md += `| Live probes OK | ${summary.probeOk} |\n`;
    md += `| Live probes broken | ${summary.probeBroken} |\n`;
    md += `| Live probes redirected | ${summary.probeRedirects} |\n`;
    if (summary.probeAuthRedirects > 0) {
      md += `| Live probes auth-walled | ${summary.probeAuthRedirects} |\n`;
    }
  }
  md += "\n";

  if (auditResults.missing.length > 0) {
    md += `## Missing Routes (referenced in code but NO page on disk)\n\n`;
    md += `These will return **404** in production.\n\n`;
    md += `| Route | Referenced In |\n|---|---|\n`;
    for (const m of auditResults.missing) {
      const files = m.referencedIn.slice(0, 3).map((f) => `\`${f}\``).join(", ");
      const more = m.referencedIn.length > 3 ? ` (+${m.referencedIn.length - 3} more)` : "";
      md += `| \`${m.route}\` | ${files}${more} |\n`;
    }
    md += "\n";
  }

  if (broken.length > 0) {
    md += `## Broken Pages (HTTP >= 400 from live probe)\n\n`;
    md += `| Route | Status |\n|---|---|\n`;
    for (const b of broken) {
      md += `| \`${b.route}\` | ${b.status} |\n`;
    }
    md += "\n";
  }

  if (redirects.length > 0) {
    md += `## Redirects (from live probe)\n\n`;
    md += `| Route | Status | Location |\n|---|---|---|\n`;
    for (const r of redirects) {
      md += `| \`${r.route}\` | ${r.status} | \`${r.location}\` |\n`;
    }
    md += "\n";
  }

  if (Object.keys(auditResults.configRedirects).length > 0) {
    md += `## Configured Redirects (next.config.ts)\n\n`;
    md += `| Source | Destination |\n|---|---|\n`;
    for (const [src, dest] of Object.entries(auditResults.configRedirects)) {
      md += `| \`${src}\` | \`${dest}\` |\n`;
    }
    md += "\n";
  }

  if (auditResults.unreferenced.length > 0) {
    md += `## Unreferenced Routes (page exists but no internal link)\n\n`;
    md += `These pages exist but aren't linked from any navigation or content.\n\n`;
    for (const u of auditResults.unreferenced) {
      md += `- \`${u}\`\n`;
    }
    md += "\n";
  }

  md += `## All Disk Routes (${auditResults.diskRoutes.length})\n\n`;
  for (const r of auditResults.diskRoutes) {
    md += `- \`${r}\`\n`;
  }
  md += "\n";

  const mdPath = join(REPORTS_DIR, "linkcheck-report.md");
  await writeFile(mdPath, md);
  console.log(`MD report:   ${relative(PROJECT_ROOT, mdPath)}`);

  return { summary, broken };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("===========================================");
  console.log("  Sundae Link Checker");
  console.log("===========================================");

  // 1. Static analysis (always runs, no server needed)
  const auditResults = await staticRouteAudit();

  // 2. Live probe (needs running server)
  let probeResults = null;
  try {
    const probe = await fetch(BASE_URL, { redirect: "manual" }).catch(() => null);
    if (probe) {
      probeResults = await liveProbe(auditResults);
    } else {
      console.log(`\n  Server not reachable at ${BASE_URL} — skipping live probe.`);
      console.log("  Run 'pnpm dev' first for live checks.\n");
    }
  } catch (err) {
    console.error(`\n  Live probe failed: ${err.message}\n`);
  }

  // 3. Generate reports
  const { summary, broken } = await generateReports(auditResults, probeResults);

  // 4. Console summary
  console.log("\n===========================================");
  console.log("  RESULTS");
  console.log("===========================================");
  console.log(`  Routes on disk:         ${summary.diskRoutes}`);
  console.log(`  Referenced in code:     ${summary.referencedRoutes}`);
  console.log(`  MISSING ROUTES:         ${summary.missingStaticRoutes}`);
  console.log(`  Unreferenced pages:     ${summary.unreferencedRoutes}`);
  if (probeResults) {
    console.log(`  ---`);
    console.log(`  Live probes:            ${summary.probeTotal}`);
    console.log(`  Probe OK:               ${summary.probeOk}`);
    console.log(`  Probe broken:           ${summary.probeBroken}`);
    console.log(`  Probe redirects:        ${summary.probeRedirects}`);
    if (summary.probeAuthRedirects > 0) {
      console.log(`  Probe auth-walled:      ${summary.probeAuthRedirects}`);
    }
  }
  console.log("===========================================\n");

  if (auditResults.missing.length > 0) {
    console.log("MISSING ROUTES (will 404 in production):");
    for (const m of auditResults.missing) {
      console.log(`  ✗ ${m.route}`);
      for (const f of m.referencedIn.slice(0, 2)) {
        console.log(`      referenced in: ${f}`);
      }
    }
    console.log();
  }

  if (broken.length > 0) {
    console.log("BROKEN (live probe returned 4xx/5xx):");
    for (const b of broken) {
      console.log(`  ✗ ${b.status}  ${b.route}`);
    }
    console.log();
  }

  if (auditResults.unreferenced.length > 0) {
    console.log("UNREFERENCED PAGES (exist on disk but no link found):");
    for (const u of auditResults.unreferenced) {
      console.log(`  ? ${u}`);
    }
    console.log();
  }

  // Exit code 1 if missing or broken routes
  if (auditResults.missing.length > 0 || broken.length > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(2);
});
