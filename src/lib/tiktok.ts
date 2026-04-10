import { createCipheriv, createDecipheriv, createHash, randomBytes, timingSafeEqual } from 'node:crypto'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'

export const TIKTOK_AUTH_URL = 'https://www.tiktok.com/v2/auth/authorize/'
export const TIKTOK_API_BASE = 'https://open.tiktokapis.com/v2'
export const TIKTOK_SESSION_COOKIE = 'sundae_tiktok_session'
export const TIKTOK_STATE_COOKIE = 'sundae_tiktok_oauth_state'
export const TIKTOK_NEXT_COOKIE = 'sundae_tiktok_oauth_next'

export interface TikTokSession {
  accessToken: string
  accessTokenExpiresAt: number
  refreshToken: string
  refreshTokenExpiresAt: number
  openId: string
  scope: string
  tokenType: string
}

export interface TikTokUserProfile {
  open_id: string
  avatar_url?: string
  display_name?: string
  follower_count?: number
  following_count?: number
  likes_count?: number
  video_count?: number
}

export interface TikTokVideo {
  id: string
  title?: string
  video_description?: string
  duration?: number
  cover_image_url?: string
  embed_link?: string
  view_count?: number
  like_count?: number
  comment_count?: number
  share_count?: number
}

export interface TikTokCreatorInfo {
  creator_avatar_url?: string
  creator_username?: string
  creator_nickname?: string
  privacy_level_options?: string[]
  comment_disabled?: boolean
  duet_disabled?: boolean
  stitch_disabled?: boolean
  max_video_post_duration_sec?: number
}

export function isTikTokSessionExpiring(session: TikTokSession, withinMs = 5 * 60 * 1000) {
  return session.accessTokenExpiresAt <= Date.now() + withinMs
}

export function getTikTokConfig() {
  const clientKey = process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY || process.env.TIKTOK_CLIENT_KEY || ''
  const clientSecret = process.env.TIKTOK_CLIENT_SECRET || ''
  const redirectUri = process.env.TIKTOK_REDIRECT_URI || process.env.NEXT_PUBLIC_TIKTOK_REDIRECT_URI || ''
  const scopes =
    process.env.NEXT_PUBLIC_TIKTOK_SCOPES ||
    process.env.TIKTOK_SCOPES ||
    'user.info.basic,user.info.stats,video.list,video.publish,video.upload'
  const loginScopes = process.env.NEXT_PUBLIC_TIKTOK_LOGIN_SCOPES || process.env.TIKTOK_LOGIN_SCOPES || scopes

  if (!clientKey || !clientSecret || !redirectUri) {
    throw new Error('TikTok integration env vars are missing')
  }

  return { clientKey, clientSecret, redirectUri, scopes, loginScopes }
}

function getEncryptionKey() {
  const { clientSecret } = getTikTokConfig()
  return createHash('sha256').update(clientSecret).digest()
}

export function sealTikTokSession(session: TikTokSession) {
  const key = getEncryptionKey()
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', key, iv)
  const payload = Buffer.from(JSON.stringify(session), 'utf8')
  const encrypted = Buffer.concat([cipher.update(payload), cipher.final()])
  const tag = cipher.getAuthTag()
  return `${iv.toString('base64url')}.${tag.toString('base64url')}.${encrypted.toString('base64url')}`
}

export function unsealTikTokSession(cookieValue?: string | null): TikTokSession | null {
  if (!cookieValue) return null
  const [ivB64, tagB64, encryptedB64] = cookieValue.split('.')
  if (!ivB64 || !tagB64 || !encryptedB64) return null

  try {
    const decipher = createDecipheriv(
      'aes-256-gcm',
      getEncryptionKey(),
      Buffer.from(ivB64, 'base64url')
    )
    decipher.setAuthTag(Buffer.from(tagB64, 'base64url'))
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(encryptedB64, 'base64url')),
      decipher.final(),
    ])
    return JSON.parse(decrypted.toString('utf8')) as TikTokSession
  } catch {
    return null
  }
}

export function createOAuthState() {
  return randomBytes(24).toString('hex')
}

export function statesMatch(expected?: string | null, actual?: string | null) {
  if (!expected || !actual) return false
  const expectedBuffer = Buffer.from(expected)
  const actualBuffer = Buffer.from(actual)
  if (expectedBuffer.length !== actualBuffer.length) return false
  return timingSafeEqual(expectedBuffer, actualBuffer)
}

export function buildTikTokAuthUrl(state: string, scopeOverride?: string) {
  const { clientKey, redirectUri, loginScopes } = getTikTokConfig()
  const params = new URLSearchParams({
    client_key: clientKey,
    scope: scopeOverride || loginScopes,
    response_type: 'code',
    redirect_uri: redirectUri,
    state,
  })
  return `${TIKTOK_AUTH_URL}?${params.toString()}`
}

async function readJson<T>(response: Response): Promise<T> {
  const text = await response.text()
  if (!text) return {} as T
  return JSON.parse(text) as T
}

async function readError(response: Response) {
  try {
    const body = await readJson<Record<string, unknown>>(response)
    return body.error_description || body.message || JSON.stringify(body)
  } catch {
    return `TikTok API error (${response.status})`
  }
}

export async function exchangeCodeForSession(code: string) {
  const { clientKey, clientSecret, redirectUri } = getTikTokConfig()
  const body = new URLSearchParams({
    client_key: clientKey,
    client_secret: clientSecret,
    code,
    grant_type: 'authorization_code',
    redirect_uri: redirectUri,
  })

  const response = await fetch(`${TIKTOK_API_BASE}/oauth/token/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'no-cache',
    },
    body,
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(String(await readError(response)))
  }

  const payload = await readJson<{
    access_token: string
    expires_in: number
    refresh_token: string
    refresh_expires_in: number
    open_id: string
    scope: string
    token_type: string
  }>(response)

  return {
    accessToken: payload.access_token,
    accessTokenExpiresAt: Date.now() + payload.expires_in * 1000,
    refreshToken: payload.refresh_token,
    refreshTokenExpiresAt: Date.now() + payload.refresh_expires_in * 1000,
    openId: payload.open_id,
    scope: payload.scope,
    tokenType: payload.token_type,
  } satisfies TikTokSession
}

export async function refreshTikTokSession(session: TikTokSession) {
  const { clientKey, clientSecret } = getTikTokConfig()
  const body = new URLSearchParams({
    client_key: clientKey,
    client_secret: clientSecret,
    grant_type: 'refresh_token',
    refresh_token: session.refreshToken,
  })

  const response = await fetch(`${TIKTOK_API_BASE}/oauth/token/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'no-cache',
    },
    body,
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(String(await readError(response)))
  }

  const payload = await readJson<{
    access_token: string
    expires_in: number
    refresh_token?: string
    refresh_expires_in?: number
    open_id: string
    scope: string
    token_type: string
  }>(response)

  return {
    accessToken: payload.access_token,
    accessTokenExpiresAt: Date.now() + payload.expires_in * 1000,
    refreshToken: payload.refresh_token || session.refreshToken,
    refreshTokenExpiresAt: payload.refresh_expires_in
      ? Date.now() + payload.refresh_expires_in * 1000
      : session.refreshTokenExpiresAt,
    openId: payload.open_id,
    scope: payload.scope,
    tokenType: payload.token_type,
  } satisfies TikTokSession
}

export async function revokeTikTokAccess(accessToken: string) {
  const { clientKey, clientSecret } = getTikTokConfig()
  const body = new URLSearchParams({
    client_key: clientKey,
    client_secret: clientSecret,
    token: accessToken,
  })

  const response = await fetch(`${TIKTOK_API_BASE}/oauth/revoke/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'no-cache',
    },
    body,
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(String(await readError(response)))
  }
}

export async function fetchTikTokUserProfile(accessToken: string, includeStats = true) {
  const fields = includeStats
    ? [
        'open_id',
        'avatar_url',
        'display_name',
        'follower_count',
        'following_count',
        'likes_count',
        'video_count',
      ].join(',')
    : ['open_id', 'avatar_url', 'display_name'].join(',')

  const response = await fetch(`${TIKTOK_API_BASE}/user/info/?fields=${encodeURIComponent(fields)}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(String(await readError(response)))
  }

  const payload = await readJson<{ data?: { user?: TikTokUserProfile } }>(response)
  return payload.data?.user || null
}

export async function fetchTikTokVideos(accessToken: string, maxCount = 6) {
  const fields = [
    'id',
    'title',
    'video_description',
    'duration',
    'cover_image_url',
    'embed_link',
    'view_count',
    'like_count',
    'comment_count',
    'share_count',
  ].join(',')

  const response = await fetch(`${TIKTOK_API_BASE}/video/list/?fields=${encodeURIComponent(fields)}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ max_count: maxCount }),
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(String(await readError(response)))
  }

  const payload = await readJson<{ data?: { videos?: TikTokVideo[] } }>(response)
  return payload.data?.videos || []
}

export async function fetchTikTokCreatorInfo(accessToken: string) {
  const response = await fetch(`${TIKTOK_API_BASE}/post/publish/creator_info/query/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({}),
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(String(await readError(response)))
  }

  const payload = await readJson<{
    data?: TikTokCreatorInfo
    error?: { code?: string; message?: string }
  }>(response)

  if (payload.error?.code && payload.error.code !== 'ok') {
    throw new Error(payload.error.message || payload.error.code)
  }

  return payload.data || null
}

export async function publishTikTokVideoFromFile(options: {
  accessToken: string
  caption: string
  privacyLevel: string
  disableComments: boolean
  disableDuet: boolean
  disableStitch: boolean
  draftMode: boolean
  filePath?: string
}) {
  const filePath = options.filePath || path.resolve(process.cwd(), 'public/videos/tiktok-review-demo.mp4')
  const fileStats = await stat(filePath)
  const fileBuffer = await readFile(filePath)

  const initEndpoint = options.draftMode
    ? `${TIKTOK_API_BASE}/post/publish/inbox/video/init/`
    : `${TIKTOK_API_BASE}/post/publish/video/init/`

  const initBody = options.draftMode
    ? {
        source_info: {
          source: 'FILE_UPLOAD',
          video_size: fileStats.size,
          chunk_size: fileStats.size,
          total_chunk_count: 1,
        },
      }
    : {
        post_info: {
          title: options.caption,
          privacy_level: options.privacyLevel,
          disable_comment: options.disableComments,
          disable_duet: options.disableDuet,
          disable_stitch: options.disableStitch,
        },
        source_info: {
          source: 'FILE_UPLOAD',
          video_size: fileStats.size,
          chunk_size: fileStats.size,
          total_chunk_count: 1,
        },
      }

  const initResponse = await fetch(initEndpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${options.accessToken}`,
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(initBody),
    cache: 'no-store',
  })

  if (!initResponse.ok) {
    throw new Error(String(await readError(initResponse)))
  }

  const initPayload = await readJson<{
    data?: { publish_id?: string; upload_url?: string }
    error?: { code?: string; message?: string }
  }>(initResponse)

  if (initPayload.error?.code && initPayload.error.code !== 'ok') {
    throw new Error(initPayload.error.message || initPayload.error.code)
  }

  const publishId = initPayload.data?.publish_id
  const uploadUrl = initPayload.data?.upload_url
  if (!publishId || !uploadUrl) {
    throw new Error('TikTok did not return a publish_id or upload_url')
  }

  const uploadResponse = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Range': `bytes 0-${fileStats.size - 1}/${fileStats.size}`,
      'Content-Length': String(fileStats.size),
      'Content-Type': 'video/mp4',
    },
    body: fileBuffer,
    cache: 'no-store',
  })

  if (!uploadResponse.ok) {
    throw new Error(`TikTok upload failed (${uploadResponse.status})`)
  }

  return { publishId }
}

export async function fetchPublishStatus(accessToken: string, publishId: string) {
  const response = await fetch(`${TIKTOK_API_BASE}/post/publish/status/fetch/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({ publish_id: publishId }),
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(String(await readError(response)))
  }

  return readJson<{
    data?: { status?: string; publicaly_available_post_id?: string[] }
    error?: { code?: string; message?: string }
  }>(response)
}
