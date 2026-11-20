// GET /api/diagnostic/geo -> { country: "AE" | null }
//
// The visitor's likely country from Vercel's edge header, used only to
// preselect "Where do you operate?". Nothing is stored.

import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export function GET(req: Request) {
  const raw = (req.headers.get('x-vercel-ip-country') ?? '').trim().toUpperCase();
  const country = /^[A-Z]{2}$/.test(raw) && raw !== 'XX' ? raw : null;
  return NextResponse.json({ country }, { headers: { 'Cache-Control': 'private, no-store' } });
}
