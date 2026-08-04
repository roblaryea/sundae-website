/**
 * Booking slots forwarder.
 *
 * GET /api/book/slots?token=<leadToken>&tz=<IANA>&from=<ISO>&to=<ISO>
 *
 * Server-side proxy to the Sundae backend availability endpoint. Returns the
 * bookable slots + day groupings for the visitor's timezone. The lead token is
 * the credential.
 */

import { NextRequest, NextResponse } from 'next/server';
import { fetchSlots } from '@/lib/sundaeBookingClient';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const token = params.get('token') ?? '';
  const tz = params.get('tz') ?? '';
  const from = params.get('from') ?? '';
  const to = params.get('to') ?? '';

  const result = await fetchSlots(token, tz, from, to);
  return NextResponse.json(result, { status: result.status || 502 });
}
