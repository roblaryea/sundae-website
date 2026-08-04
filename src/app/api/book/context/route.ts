/**
 * Booking context forwarder.
 *
 * GET /api/book/context?token=<leadToken>
 *
 * Server-side proxy to the Sundae backend booking-context endpoint. The site
 * CSP blocks the browser from reaching the backend directly, so the booking
 * page hits this route and we forward with the lead token as the credential.
 */

import { NextRequest, NextResponse } from 'next/server';
import { fetchBookingContext } from '@/lib/sundaeBookingClient';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token') ?? '';
  const result = await fetchBookingContext(token);
  return NextResponse.json(result, { status: result.status || 502 });
}
