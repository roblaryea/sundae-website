/**
 * Booking creation forwarder.
 *
 * POST /api/book?token=<leadToken>   body { slotStart, idempotencyKey? }
 *
 * Server-side proxy to the Sundae backend create-booking endpoint. The site CSP
 * blocks the browser from reaching the backend directly, so the booking page
 * posts the chosen slot here and we forward with the lead token as the
 * credential (plus the visitor IP + UA for the backend's audit trail).
 *
 * Rate limited per IP (in-memory) to blunt abuse of the public token.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createBooking } from '@/lib/sundaeBookingClient';

export const runtime = 'nodejs';

// ------------------------------------
// Rate limiting (in-memory, per IP)
// ------------------------------------
const attempts = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 10;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const times = attempts.get(ip)?.filter(t => now - t < RATE_LIMIT_WINDOW_MS) || [];
  if (times.length >= RATE_LIMIT_MAX) {
    attempts.set(ip, times);
    return true;
  }
  times.push(now);
  attempts.set(ip, times);
  return false;
}

export async function POST(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, status: 429, error: 'rate_limited' },
      { status: 429, headers: { 'Retry-After': '3600' } }
    );
  }

  const token = request.nextUrl.searchParams.get('token') ?? '';

  let body: { slotStart?: string; idempotencyKey?: string } = {};
  try {
    body = await request.json();
  } catch {
    // empty / non-JSON body - leave defaults
  }

  const slotStart = typeof body.slotStart === 'string' ? body.slotStart : '';
  if (!slotStart) {
    return NextResponse.json({ ok: false, status: 400, error: 'slot_start_required' }, { status: 400 });
  }

  const ua = request.headers.get('user-agent') ?? undefined;
  const result = await createBooking(token, slotStart, {
    idempotencyKey: body.idempotencyKey,
    ip,
    ua,
  });

  return NextResponse.json(result, { status: result.status || 502 });
}
