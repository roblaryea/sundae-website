'use client'

import { useRef, useState } from 'react'
import qrcode from 'qrcode-generator'
import { QrCode, X } from 'lucide-react'
import { trackCta } from '@/lib/cta'

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

/**
 * Shows this card's own QR code full screen, so someone standing next to you can scan it
 * straight from your phone, with no physical card. Uses the native <dialog> element for
 * focus handling, Escape to close and a backdrop. The code is drawn on white with dark
 * modules whatever the theme, because that is what scanners read best.
 */
export function ShowQr({
  handle,
  showLabel,
  title,
  closeLabel,
}: {
  handle: string
  showLabel: string
  title: string
  closeLabel: string
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [qr, setQr] = useState<Qr | null>(null)

  function open() {
    setQr(buildQr(`${window.location.origin}/${handle}`))
    trackCta('profile_card_show_qr', { handle })
    dialogRef.current?.showModal()
  }

  return (
    <>
      <button type="button" onClick={open} aria-label={showLabel} title={showLabel} className="pc-iconbtn">
        <QrCode className="h-[18px] w-[18px]" aria-hidden="true" />
      </button>
      <dialog
        ref={dialogRef}
        aria-labelledby={`pc-qr-title-${handle}`}
        className="pc-dialog"
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close()
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <p id={`pc-qr-title-${handle}`} className="pc-fg text-[16px] font-semibold leading-snug">
            {title}
          </p>
          <button type="button" onClick={() => dialogRef.current?.close()} aria-label={closeLabel} title={closeLabel} className="pc-iconbtn -mt-1 shrink-0" style={{ ['--pc-header-fg' as string]: 'var(--pc-fg)', ['--pc-header-chip' as string]: 'transparent' }}>
            <X className="h-[18px] w-[18px]" aria-hidden="true" />
          </button>
        </div>
        <div className="pc-qr mt-4">
          {qr && (
            <svg viewBox={qr.viewBox} shapeRendering="crispEdges" role="img" aria-label={title}>
              <path d={qr.path} fill="#171210" />
            </svg>
          )}
        </div>
      </dialog>
    </>
  )
}
