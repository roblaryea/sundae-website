'use client'

import { useEffect, useRef, useState } from 'react'
import { Share2 } from 'lucide-react'
import { trackCta } from '@/lib/cta'

/**
 * Shares the card link with the native share sheet where available, otherwise copies
 * it. The confirmation is announced politely to screen readers.
 */
export function ShareButton({
  handle,
  title,
  shareLabel,
  copiedLabel,
}: {
  handle: string
  title: string
  shareLabel: string
  copiedLabel: string
}) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  async function onShare() {
    trackCta('profile_card_share', { handle })
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title, url })
        return
      }
      await navigator.clipboard.writeText(url)
      setCopied(true)
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 2200)
    } catch {
      /* The user dismissed the share sheet or clipboard access was denied. Nothing to do. */
    }
  }

  return (
    <div className="relative flex items-center gap-3">
      <span role="status" aria-live="polite" className={copied ? 'text-[13px] text-[#D8CBBD]' : 'sr-only'}>
        {copied ? copiedLabel : ''}
      </span>
      <button
        type="button"
        onClick={onShare}
        aria-label={shareLabel}
        title={shareLabel}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#FBF8F4]/25 bg-[#171210]/70 text-[#FBF8F4] transition hover:bg-[#FBF8F4]/15 active:scale-95"
      >
        <Share2 className="h-[18px] w-[18px]" aria-hidden="true" />
      </button>
    </div>
  )
}
