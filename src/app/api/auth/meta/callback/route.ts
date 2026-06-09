import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const ADMIN_OAUTH_RELAY_BASE = process.env.ADMIN_OAUTH_RELAY_BASE || 'https://dev.sundaetech.ai'

export async function GET(request: NextRequest) {
  return NextResponse.redirect(buildAdminRelayUrl(request, 'meta'))
}

function buildAdminRelayUrl(request: NextRequest, provider: 'meta') {
  const url = new URL(`/api/auth/${provider}/callback`, ADMIN_OAUTH_RELAY_BASE)
  for (const key of ['code', 'state', 'error', 'error_description']) {
    const value = request.nextUrl.searchParams.get(key)
    if (value) url.searchParams.set(key, value)
  }
  return url
}
