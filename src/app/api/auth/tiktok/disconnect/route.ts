import { NextRequest, NextResponse } from 'next/server'
import { revokeTikTokAccess, TIKTOK_NEXT_COOKIE, TIKTOK_SESSION_COOKIE, TIKTOK_STATE_COOKIE, unsealTikTokSession } from '@/lib/tiktok'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const nextPath = sanitizeNextPath(request.nextUrl.searchParams.get('next'))
  const session = unsealTikTokSession(request.cookies.get(TIKTOK_SESSION_COOKIE)?.value)

  if (session) {
    try {
      await revokeTikTokAccess(session.accessToken)
    } catch {
      // Best effort revoke. We still clear the local session.
    }
  }

  const response = NextResponse.redirect(buildReturnUrl(request, nextPath, { auth: 'disconnected' }))
  response.cookies.set(TIKTOK_SESSION_COOKIE, '', buildCookieOptions(request, 0))
  response.cookies.set(TIKTOK_STATE_COOKIE, '', buildCookieOptions(request, 0))
  response.cookies.set(TIKTOK_NEXT_COOKIE, '', buildCookieOptions(request, 0))
  return response
}

function sanitizeNextPath(value?: string | null) {
  if (!value || !value.startsWith('/') || value.startsWith('//')) return '/tiktok-review'
  return value
}

function buildReturnUrl(request: NextRequest, nextPath: string, params: Record<string, string>) {
  const url = new URL(nextPath, request.nextUrl.origin)
  for (const [key, value] of Object.entries(params)) {
    if (value) url.searchParams.set(key, value)
  }
  return url
}

function buildCookieOptions(request: NextRequest, maxAge: number) {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: request.nextUrl.protocol === 'https:',
    path: '/',
    maxAge,
  }
}
