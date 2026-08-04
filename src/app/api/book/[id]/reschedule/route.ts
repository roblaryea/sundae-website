/**
 * Booking reschedule forwarder.
 *
 * POST /api/book/:id/reschedule?token=<managementToken>   body { slotStart }
 *
 * Server-side proxy to the Sundae backend reschedule endpoint. Uses the
 * per-booking MANAGEMENT token (returned as booking.manageToken at creation),
 * NOT the original lead token.
 */

import { NextRequest, NextResponse } from 'next/server';
import { rescheduleBooking } from '@/lib/sundaeBookingClient';

export const runtime = 'nodejs';

export async function POST(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const token = request.nextUrl.searchParams.get('token') ?? '';

  let body: { slotStart?: string } = {};
  try {
    body = await request.json();
  } catch {
    // empty / non-JSON body - leave defaults
  }

  const slotStart = typeof body.slotStart === 'string' ? body.slotStart : '';
  if (!slotStart) {
    return NextResponse.json({ ok: false, status: 400, error: 'slot_start_required' }, { status: 400 });
  }

  const result = await rescheduleBooking(token, id, slotStart);
  return NextResponse.json(result, { status: result.status || 502 });
}
