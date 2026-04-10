import { NextRequest, NextResponse } from 'next/server'
import {
  buildTikTokAuthUrl,
  createOAuthState,
  TIKTOK_NEXT_COOKIE,
  TIKTOK_STATE_COOKIE,
} from '@/lib/tiktok'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const nextPath = sanitizeNextPath(request.nextUrl.searchParams.get('next'))
  const authScopes = resolveAuthScopes(request.nextUrl.searchParams.get('scopeSet'))

  try {
    const state = createOAuthState()
    const response = NextResponse.redirect(buildTikTokAuthUrl(state, authScopes))

    response.cookies.set(TIKTOK_STATE_COOKIE, state, buildCookieOptions(request, 60 * 10))
    response.cookies.set(TIKTOK_NEXT_COOKIE, nextPath, buildCookieOptions(request, 60 * 10))

    return response
  } catch (error) {
    return NextResponse.redirect(buildReturnUrl(request, nextPath, {
      auth: 'error',
      error: error instanceof Error ? error.message : 'TikTok auth is not configured',
    }))
  }
}

function resolveAuthScopes(scopeSet?: string | null) {
  if (scopeSet === 'minimal') return 'user.info.basic'
  if (scopeSet === 'upload-review') return 'user.info.basic,video.upload'
  if (scopeSet === 'analytics') return 'user.info.basic,user.info.stats,video.list'
  if (scopeSet === 'posting') return 'user.info.basic,video.publish'
  if (scopeSet === 'posting-only') return 'video.publish'
  return undefined
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
