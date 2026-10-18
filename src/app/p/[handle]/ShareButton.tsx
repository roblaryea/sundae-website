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
    <>
      <span role="status" aria-live="polite" className={copied ? 'pc-chip-text text-[13px]' : 'sr-only'} style={copied ? { color: 'var(--pc-header-fg)' } : undefined}>
        {copied ? copiedLabel : ''}
      </span>
      <button type="button" onClick={onShare} aria-label={shareLabel} title={shareLabel} className="pc-iconbtn">
        <Share2 className="h-[18px] w-[18px]" aria-hidden="true" />
      </button>
    </>
  )
}
