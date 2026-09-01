/**
 * Booking cancel forwarder.
 *
 * POST /api/book/:id/cancel?token=<managementToken>   body { reason? }
 *
 * Server-side proxy to the Sundae backend cancel endpoint. Uses the per-booking
 * MANAGEMENT token (returned as booking.manageToken at creation), NOT the
 * original lead token.
 */

import { NextRequest, NextResponse } from 'next/server';
import { cancelBooking } from '@/lib/sundaeBookingClient';

export const runtime = 'nodejs';

export async function POST(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const token = request.nextUrl.searchParams.get('token') ?? '';

  let body: { reason?: string } = {};
  try {
    body = await request.json();
  } catch {
    // empty / non-JSON body - leave defaults
  }

  const reason = typeof body.reason === 'string' ? body.reason : undefined;
  const result = await cancelBooking(token, id, reason);
  return NextResponse.json(result, { status: result.status || 502 });
}
