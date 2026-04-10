import { NextRequest, NextResponse } from 'next/server'
import {
  fetchPublishStatus,
  isTikTokSessionExpiring,
  publishTikTokVideoFromFile,
  refreshTikTokSession,
  sealTikTokSession,
  TIKTOK_SESSION_COOKIE,
  unsealTikTokSession,
} from '@/lib/tiktok'

export const dynamic = 'force-dynamic'

type PostingMode = 'direct' | 'draft'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const nextPath = sanitizeNextPath(readString(formData.get('next')) || '/tiktok-review')

  const mode: PostingMode = readString(formData.get('mode')) === 'draft' ? 'draft' : 'direct'
  const demo = readString(formData.get('demo')) === 'mock'
  const caption = readString(formData.get('caption')) || ''
  const privacy = mode === 'draft' ? 'SELF_ONLY' : readString(formData.get('privacy')) || ''
  const comments = readBoolean(formData.get('comments'))
  const duet = mode === 'direct' && readBoolean(formData.get('duet'))
  const stitch = mode === 'direct' && readBoolean(formData.get('stitch'))
  const consent = readBoolean(formData.get('consent'))

  if (demo) {
    if (!consent) {
      return NextResponse.redirect(buildReturnUrl(request, nextPath, baseParams({
        demo,
        mode,
        caption,
        privacy,
        comments,
        duet,
        stitch,
        consent,
        publish: 'error',
        error: 'Consent is required before sending content to TikTok.',
      })))
    }

    if (mode === 'direct' && !privacy) {
      return NextResponse.redirect(buildReturnUrl(request, nextPath, baseParams({
        demo,
        mode,
        caption,
        privacy,
        comments,
        duet,
        stitch,
        consent,
        publish: 'error',
        error: 'Choose a privacy level before direct posting.',
      })))
    }

    return NextResponse.redirect(buildReturnUrl(request, nextPath, baseParams({
      demo,
      mode,
      caption,
      privacy,
      comments,
      duet,
      stitch,
      consent,
      publish: 'success',
      publish_id: `mock_publish_${Date.now()}`,
      publish_status: mode === 'draft' ? 'DRAFT_UPLOADED' : 'PUBLISH_COMPLETE',
      post_id: mode === 'draft' ? '' : `mock_post_${Date.now().toString().slice(-6)}`,
    })))
  }

  const sessionCookie = request.cookies.get(TIKTOK_SESSION_COOKIE)?.value
  const existingSession = unsealTikTokSession(sessionCookie)

  if (!existingSession) {
    return NextResponse.redirect(buildReturnUrl(request, nextPath, baseParams({
      demo,
      mode,
      caption,
      privacy,
      comments,
      duet,
      stitch,
      consent,
      publish: 'error',
      error: 'Connect a TikTok sandbox account before publishing.',
    })))
  }

  if (!consent) {
    return NextResponse.redirect(buildReturnUrl(request, nextPath, baseParams({
      demo,
      mode,
      caption,
      privacy,
      comments,
      duet,
      stitch,
      consent,
      publish: 'error',
      error: 'Consent is required before sending content to TikTok.',
    })))
  }

  if (mode === 'direct' && !privacy) {
    return NextResponse.redirect(buildReturnUrl(request, nextPath, baseParams({
      demo,
      mode,
      caption,
      privacy,
      comments,
      duet,
      stitch,
      consent,
      publish: 'error',
      error: 'Choose a privacy level before direct posting.',
    })))
  }

  let session = existingSession
  let refreshed = false

  try {
    if (isTikTokSessionExpiring(session)) {
      session = await refreshTikTokSession(session)
      refreshed = true
    }

    const { publishId } = await publishTikTokVideoFromFile({
      accessToken: session.accessToken,
      caption,
      privacyLevel: privacy,
      disableComments: !comments,
      disableDuet: !duet,
      disableStitch: !stitch,
      draftMode: mode === 'draft',
    })

    let publishStatus = mode === 'draft' ? 'DRAFT_UPLOADED' : 'PUBLISH_INITIATED'
    let postId = ''

    try {
      const statusPayload = await fetchPublishStatus(session.accessToken, publishId)
      publishStatus = statusPayload.data?.status || publishStatus
      postId = statusPayload.data?.publicaly_available_post_id?.[0] || ''
    } catch {
      // Publish status can lag behind upload completion; the page will still show the publish id.
    }

    const response = NextResponse.redirect(buildReturnUrl(request, nextPath, baseParams({
      demo,
      mode,
      caption,
      privacy,
      comments,
      duet,
      stitch,
      consent,
      publish: 'success',
      publish_id: publishId,
      publish_status: publishStatus,
      post_id: postId,
    })))

    if (refreshed) {
      response.cookies.set(TIKTOK_SESSION_COOKIE, sealTikTokSession(session), buildCookieOptions(request, 60 * 60 * 24 * 7))
    }

    return response
  } catch (error) {
    const response = NextResponse.redirect(buildReturnUrl(request, nextPath, baseParams({
      demo,
      mode,
      caption,
      privacy,
      comments,
      duet,
      stitch,
      consent,
      publish: 'error',
      error: error instanceof Error ? error.message : 'TikTok publish failed.',
    })))

    if (refreshed) {
      response.cookies.set(TIKTOK_SESSION_COOKIE, sealTikTokSession(session), buildCookieOptions(request, 60 * 60 * 24 * 7))
    }

    return response
  }
}

function baseParams(values: {
  demo: boolean
  mode: PostingMode
  caption: string
  privacy: string
  comments: boolean
  duet: boolean
  stitch: boolean
  consent: boolean
  publish: 'success' | 'error'
  publish_id?: string
  publish_status?: string
  post_id?: string
  error?: string
}) {
  return {
    demo: values.demo ? 'mock' : '',
    auth: values.demo ? 'connected' : '',
    mode: values.mode,
    caption: values.caption,
    privacy: values.privacy,
    comments: values.comments ? '1' : '',
    duet: values.duet ? '1' : '',
    stitch: values.stitch ? '1' : '',
    consent: values.consent ? '1' : '',
    publish: values.publish,
    publish_id: values.publish_id || '',
    publish_status: values.publish_status || '',
    post_id: values.post_id || '',
    error: values.error || '',
  }
}

function readString(value: FormDataEntryValue | null) {
  return typeof value === 'string' ? value.trim() : ''
}

function readBoolean(value: FormDataEntryValue | null) {
  return typeof value === 'string' && value === '1'
}

function sanitizeNextPath(value?: string | null) {
  if (!value || !value.startsWith('/') || value.startsWith('//')) return '/tiktok-review'
  return value
}

function buildReturnUrl(request: NextRequest, nextPath: string, params: Record<string, string>) {
  const url = new URL(nextPath, request.nextUrl.origin)
  for (const [key, value] of Object.entries(params)) {
    if (value) {
      url.searchParams.set(key, value)
    }
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
