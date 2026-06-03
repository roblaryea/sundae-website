import { readFile, stat } from 'node:fs/promises'

import { TIKTOK_API_BASE } from './tiktok'

const demoVideoUrl = new URL('../../public/videos/tiktok-review-demo.mp4', import.meta.url)

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

export async function publishTikTokVideoFromFile(options: {
  accessToken: string
  caption: string
  privacyLevel: string
  disableComments: boolean
  disableDuet: boolean
  disableStitch: boolean
  draftMode: boolean
}) {
  const fileStats = await stat(demoVideoUrl)
  const fileBuffer = await readFile(demoVideoUrl)

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
