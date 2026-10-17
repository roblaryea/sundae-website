/**
 * Reads a request body while counting the bytes actually received, so a limit holds even when
 * Content-Length is missing or understated. Kept free of runtime imports so it can be unit-tested.
 */
export class BodyTooLargeError extends Error {
  constructor() {
    super('body too large')
  }
}

export async function readTextLimited(request: Request, maxBytes: number): Promise<string> {
  const declared = Number(request.headers.get('content-length') ?? 0)
  if (declared > maxBytes) throw new BodyTooLargeError()
  const reader = request.body?.getReader()
  if (!reader) return ''
  const chunks: Uint8Array[] = []
  let total = 0
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    total += value.byteLength
    if (total > maxBytes) {
      await reader.cancel().catch(() => {})
      throw new BodyTooLargeError()
    }
    chunks.push(value)
  }
  const bytes = new Uint8Array(total)
  let offset = 0
  for (const chunk of chunks) {
    bytes.set(chunk, offset)
    offset += chunk.byteLength
  }
  return new TextDecoder().decode(bytes)
}
