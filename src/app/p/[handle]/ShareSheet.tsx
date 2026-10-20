'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import qrcode from 'qrcode-generator'
import { Check, Copy, Mail, MessageCircle, MessageSquareText, Share2, X, type LucideIcon } from 'lucide-react'
import { trackCta } from '@/lib/cta'
import type { ProfileCardCopy } from '@/lib/profileCardCopy'

type Qr = { viewBox: string; path: string }

function buildQr(url: string): Qr {
  const qr = qrcode(0, 'H')
  qr.addData(url)
  qr.make()
  const n = qr.getModuleCount()
  const quiet = 2
  let path = ''
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (qr.isDark(y, x)) path += `M${x + quiet} ${y + quiet}h1v1h-1z`
    }
  }
  const size = n + quiet * 2
  return { viewBox: `0 0 ${size} ${size}`, path }
}

const subscribeNever = () => () => {}
/** The device's own share menu. Server snapshot is false, so there is no hydration mismatch. */
function detectNativeShare(): boolean {
  return typeof navigator !== 'undefined' && typeof navigator.share === 'function'
}

type Target = { key: string; label: string; Icon: LucideIcon; href: string; external?: boolean }

/**
 * Everything about handing this card to someone else, in one sheet: a QR they can scan straight
 * from your phone, plus the channels people actually use (text, email, WhatsApp, copy link, and
 * the device's own share menu where the browser has one). The link is the clean card address,
 * without a language parameter, so the recipient sees it in their own language.
 *
 * Uses the native <dialog> element for focus handling, Escape to close and a backdrop. The code is
 * drawn on white with dark modules whatever the theme, because that is what scanners read best.
 */
export function ShareSheet({ handle, name, copy }: { handle: string; name: string; copy: ProfileCardCopy }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [qr, setQr] = useState<Qr | null>(null)
  const [url, setUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const canNativeShare = useSyncExternalStore(subscribeNever, detectNativeShare, () => false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    [],
  )

  function open() {
    const link = `${window.location.origin}/${handle}`
    setUrl(link)
    setQr(buildQr(link))
    setCopied(false)
    trackCta('profile_card_share_open', { handle })
    dialogRef.current?.showModal()
  }

  async function copyLink() {
    trackCta('profile_card_share_copy', { handle })
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 2200)
    } catch {
      /* Clipboard access was denied. The other channels still work. */
    }
  }

  async function nativeShare() {
    trackCta('profile_card_share_native', { handle })
    try {
      await navigator.share({ title: name, url })
    } catch {
      /* The visitor dismissed the share menu. */
    }
  }

  const text = encodeURIComponent(`${name} - Sundae ${url}`)
  const targets: Target[] = [
    { key: 'sms', label: copy.shareBySms, Icon: MessageSquareText, href: `sms:?&body=${text}` },
    { key: 'email', label: copy.shareByEmail, Icon: Mail, href: `mailto:?subject=${encodeURIComponent(name)}&body=${encodeURIComponent(url)}` },
    { key: 'whatsapp', label: copy.shareByWhatsApp, Icon: MessageCircle, href: `https://wa.me/?text=${text}`, external: true },
  ]
  const rowClass = 'pc-row flex min-h-[56px] w-full items-center gap-4 px-1 text-start text-[16px] font-medium'

  return (
    <>
      <button type="button" onClick={open} aria-label={copy.share} title={copy.share} className="pc-iconbtn">
        <Share2 className="h-[18px] w-[18px]" aria-hidden="true" />
      </button>
      <dialog
        ref={dialogRef}
        aria-labelledby={`pc-share-title-${handle}`}
        className="pc-sheet"
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close()
        }}
      >
        <div className="pc-sheet-grip" aria-hidden="true" />
        <div className="flex items-start justify-between gap-4">
          <h2 id={`pc-share-title-${handle}`} className="pc-sheet-title">
            {copy.qrTitle}
          </h2>
          <button type="button" onClick={() => dialogRef.current?.close()} aria-label={copy.close} title={copy.close} className="pc-iconbtn -mt-1 shrink-0" style={{ ['--pc-header-fg' as string]: 'var(--pc-fg)', ['--pc-header-chip' as string]: 'transparent' }}>
            <X className="h-[18px] w-[18px]" aria-hidden="true" />
          </button>
        </div>
        <div className="pc-qr mt-4">
          {qr && (
            <svg viewBox={qr.viewBox} shapeRendering="crispEdges" role="img" aria-label={copy.qrTitle}>
              <path d={qr.path} fill="#171210" />
            </svg>
          )}
        </div>

        <ul className="pc-share-list mt-4">
          <li>
            <button type="button" onClick={copyLink} className={rowClass}>
              {copied ? <Check className="pc-icon h-5 w-5 shrink-0" aria-hidden="true" /> : <Copy className="pc-icon h-5 w-5 shrink-0" aria-hidden="true" />}
              <span className="flex-1">{copied ? copy.linkCopied : copy.copyLink}</span>
            </button>
            <span role="status" aria-live="polite" className="sr-only">
              {copied ? copy.linkCopied : ''}
            </span>
          </li>
          {targets.map(({ key, label, Icon, href, external }) => (
            <li key={key}>
              <a
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                onClick={() => trackCta(`profile_card_share_${key}`, { handle })}
                className={rowClass}
              >
                <Icon className="pc-icon h-5 w-5 shrink-0" aria-hidden="true" />
                <span className="flex-1">{label}</span>
              </a>
            </li>
          ))}
          {canNativeShare && (
            <li>
              <button type="button" onClick={nativeShare} className={rowClass}>
                <Share2 className="pc-icon h-5 w-5 shrink-0" aria-hidden="true" />
                <span className="flex-1">{copy.shareMore}</span>
              </button>
            </li>
          )}
        </ul>
      </dialog>
    </>
  )
}
