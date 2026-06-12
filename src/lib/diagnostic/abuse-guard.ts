// Anti-abuse guards for the expensive /api/diagnostic endpoint.
//
// Every diagnostic call hits a paid LLM (claude-sonnet-4-6 / gpt-5), so an
// unprotected endpoint is a direct line to burning AI credits - scrapers,
// crawlers, and scripted abuse all cost real money per request. These guards
// run BEFORE any model call so rejected traffic costs ~nothing:
//
//   1. Same-origin check - the request's Origin/Referer host must match the
//      deployment Host. Browsers always send Origin on a same-origin POST fetch;
//      naive bots/crawlers that POST the API directly send none → blocked.
//      Domain-agnostic: works for prod, every preview URL, and localhost.
//   2. Rate limiting - per-IP cap + a global hourly circuit-breaker that caps
//      total spend even under a distributed/IP-rotating attack.
//
// Vercel BotID (applied in the route via checkBotId) is the third layer - it
// classifies bots/crawlers that DO spoof a same-origin header.
//
// NOTE: the rate-limit state is in-memory, so it is per-instance (Vercel Fluid
// Compute reuses instances but scales horizontally). It is a strong speed-bump,
// not an airtight global limiter - BotID + the global circuit-breaker are the
// real backstops. For a hard global cap, move this to Vercel KV / Upstash.

const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const PER_IP_MAX = 5; // diagnostics per IP per hour
const GLOBAL_MAX = 120; // diagnostics across ALL IPs per hour (spend circuit-breaker)

const ipHits = new Map<string, number[]>();
let globalHits: number[] = [];

export function getClientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  return fwd?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';
}

/**
 * True when the request originates from the site itself (same-origin browser
 * fetch). Rejects requests with no Origin/Referer (typical of scripted bots)
 * and cross-site requests. Domain-agnostic - compares against the request's
 * own Host header rather than a hard-coded allowlist.
 */
export function isSameOrigin(req: Request): boolean {
  const host = req.headers.get('host');
  const candidate = req.headers.get('origin') || req.headers.get('referer');
  if (!host || !candidate) return false;
  try {
    return new URL(candidate).host === host;
  } catch {
    return false;
  }
}

type RateResult = { ok: true } | { ok: false; scope: 'ip' | 'global'; retryAfter: number };

/**
 * Sliding-window rate limit. Checks the global circuit-breaker first, then the
 * per-IP cap. Only records a hit when the request is allowed through.
 */
export function checkRateLimit(ip: string, now: number): RateResult {
  globalHits = globalHits.filter((t) => now - t < RATE_WINDOW_MS);
  if (globalHits.length >= GLOBAL_MAX) {
    return { ok: false, scope: 'global', retryAfter: 3600 };
  }

  const hits = (ipHits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (hits.length >= PER_IP_MAX) {
    ipHits.set(ip, hits);
    return { ok: false, scope: 'ip', retryAfter: 3600 };
  }

  hits.push(now);
  ipHits.set(ip, hits);
  globalHits.push(now);
  return { ok: true };
}
