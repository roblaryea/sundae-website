// POST /api/diagnostic/report/resend   Body: { token }
//
// Asks the backend to email a fresh report link for an expired one. The
// answer is always the same 202 {"ok":true}, whatever happened, so the page
// can't be used to learn whether a lead exists. Tokens are never logged.

import { NextResponse } from 'next/server';
import { getClientIp, isSameOrigin } from '@/lib/diagnostic/abuse-guard';
import { isPlausibleReportToken, reportBackendUrl } from '@/lib/diagnostic/reportLink';

export const runtime = 'nodejs';

const WINDOW_MS = 60 * 60 * 1000;
const PER_IP_MAX = 10;
const hits = new Map<string, number[]>();

function allow(ip: string, now: number): boolean {
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= PER_IP_MAX) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  return true;
}

const accepted = () =>
  NextResponse.json({ ok: true }, { status: 202, headers: { 'Cache-Control': 'no-store' } });

export async function POST(req: Request) {
  if (!isSameOrigin(req)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  let token: unknown;
  try {
    token = ((await req.json()) as { token?: unknown })?.token;
  } catch {
    return accepted();
  }
  const ip = getClientIp(req);
  if (!isPlausibleReportToken(token) || !allow(ip, Date.now())) return accepted();

  try {
    const response = await fetch(`${reportBackendUrl()}/api/v1/public/marketing/leads/report/resend`, {
      method: 'POST',
      // The backend applies its own per-lead and per-IP limits.
      headers: { 'Content-Type': 'application/json', ...(ip !== 'unknown' ? { 'X-Forwarded-For': ip } : {}) },
      body: JSON.stringify({ token }),
      cache: 'no-store',
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok && response.status !== 404) {
      console.warn('[diagnostic] report re-send answered', response.status);
    }
  } catch (error) {
    console.warn('[diagnostic] report re-send failed:', error instanceof Error ? error.name : 'unknown');
  }
  return accepted();
}
