import { NextRequest, NextResponse } from 'next/server';
import { callBackend } from '@/lib/sundaeBookingClient';

export const runtime = 'nodejs';
const slug = /^[a-z][a-z0-9-]{2,63}$/;
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
async function forward(request: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  const manage = path[0] === 'manage';
  const action = path[manage ? 2 : 1];
  const identity = path[manage ? 1 : 0];
  const actions = request.method === 'GET' ? ['context', 'slots'] : manage ? ['reschedule', 'cancel'] : ['verification', 'book'];
  if (path.length !== (manage ? 3 : 2) || !(manage ? uuid : slug).test(identity || '') || !actions.includes(action))
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
  return NextResponse.json(result.ok ? { ok: true, ...result.body } : { ok: false, error: result.status ? result.error : 'scheduler_unavailable' }, {
    status: result.status || 503, headers: { 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer', ...(result.status === 429 ? { 'Retry-After': '3600' } : {}) },
  });
}
export const GET = forward;
export const POST = forward;
