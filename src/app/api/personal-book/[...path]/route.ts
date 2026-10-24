import { NextRequest, NextResponse } from 'next/server';
import { callBackend } from '@/lib/sundaeBookingClient';

export const runtime = 'nodejs';
const slug = /^[a-z][a-z0-9-]{2,63}$/;
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
async function forward(request: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  const manage = path[0] === 'manage';
  // The host's approval page: requests/:id/(details GET | approve | decline POST). 'requests' is a
  // reserved slug on the backend, so it can never be a booking page.
  const decision = path[0] === 'requests';
  const keyed = manage || decision;
  const action = path[keyed ? 2 : 1];
  const identity = path[keyed ? 1 : 0];
  const post = request.method === 'POST';
  // Public pages: context|slots (GET), verification|request|book and verification/resend (POST).
  // Private management: manage/:id/(slots|context) (GET), reschedule|cancel (POST).
  const resend = !keyed && post && path[1] === 'verification' && path[2] === 'resend';
  const actions = request.method === 'GET'
    ? (decision ? ['details'] : ['context', 'slots'])
    : decision ? ['approve', 'decline'] : manage ? ['reschedule', 'cancel'] : ['verification', 'request', 'book'];
  if (!(keyed ? uuid : slug).test(identity || '') || !actions.includes(action) || (path.length !== (keyed ? 3 : 2) && !(resend && path.length === 3)))
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  // Next may normalize nextUrl.hostname to localhost behind its server. The
  // received Host is the browser-facing authority (and includes the port).
  const sameOrigin = `${request.nextUrl.protocol}//${request.headers.get('host') || ''}`;
  if (request.method === 'POST' && request.headers.get('origin') !== sameOrigin)
    return NextResponse.json({ error: 'invalid_origin' }, { status: 403 });
  let body: string | undefined;
  if (request.method === 'POST') {
    // Content-Length alone is not trusted. Limit the actual streamed body too.
    const reader = request.body?.getReader();
    const chunks: Uint8Array[] = []; let size = 0;
    if (!reader) return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
    while (true) {
      const { done, value } = await reader.read(); if (done) break;
      size += value.length;
      if (size > 16_384) { await reader.cancel(); return NextResponse.json({ error: 'request_too_large' }, { status: 413 }); }
      chunks.push(value);
    }
    body = Buffer.concat(chunks).toString('utf8');
  }
  const query = new URLSearchParams();
  for (const key of ['token', 'eventType', 'tz', 'from', 'to', 'durationMinutes']) {
    const value = request.nextUrl.searchParams.get(key); if (value !== null) query.set(key, value);
  }
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const result = await callBackend(`/api/v1/public/scheduling/${path.map(encodeURIComponent).join('/')}?${query}`, {
    method: request.method, headers: { 'Content-Type': 'application/json',
      ...(forwarded ? { 'X-Forwarded-For': forwarded } : {}),
      'User-Agent': request.headers.get('user-agent') || 'Sundae booking website' }, body,
  }, 40_000);
  // A rate-limited caller is told the real wait (seconds), not a fixed hour.
  const retryAfter = result.status === 429 ? waitSeconds((result.body as { retryAfterSeconds?: unknown }).retryAfterSeconds) : null;
  return NextResponse.json(result.ok ? { ok: true, ...result.body } : { ok: false, error: result.status ? result.error : 'scheduler_unavailable',
    ...(retryAfter ? { retryAfterSeconds: retryAfter } : {}),
    ...(result.status === 409 ? alternativesOf(result.body) : {}) }, {
    status: result.status || 503, headers: { 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer', ...(result.status === 429 ? { 'Retry-After': String(retryAfter ?? 3600) } : {}) },
  });
}
/** Free times offered to the host when the requested time was taken; shape-checked, never passed through raw. */
function alternativesOf(body: unknown): { alternatives?: Array<{ startUtc: string; label: string }> } {
  const raw = (body as { alternatives?: unknown } | null)?.alternatives;
  if (!Array.isArray(raw)) return {};
  const alternatives = raw.slice(0, 6).flatMap((item) => {
    const entry = item as { startUtc?: unknown; label?: unknown };
    return typeof entry?.startUtc === 'string' && !Number.isNaN(Date.parse(entry.startUtc))
      ? [{ startUtc: entry.startUtc, label: typeof entry.label === 'string' ? entry.label.slice(0, 80) : entry.startUtc }] : [];
  });
  return { alternatives };
}
function waitSeconds(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) && value > 0 ? Math.min(Math.ceil(value), 86_400) : null;
}
export const GET = forward;
export const POST = forward;
