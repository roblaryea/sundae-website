'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'
import { trackCta } from '@/lib/cta'
import type { ProductWalkthrough } from '@/lib/productWalkthroughs'

type Props = {
  film: ProductWalkthrough
  title: string
  watchLabel: string
  errorLabel: string
  retryLabel: string
  priority?: boolean
}

/** Mount media only after an explicit play request. The customer Academy is never queried. */
export function WalkthroughPlayer({ film, title, watchLabel, errorLabel, retryLabel, priority = false }: Props) {
  const [requested, setRequested] = useState(false)
  const [failed, setFailed] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!requested || failed) return
    const video = videoRef.current
    if (!video) return
    const pauseForAnotherFilm = (event: Event) => {
      const other = event.target
      if (other instanceof HTMLVideoElement && other !== video && other.hasAttribute('data-native-video')) video.pause()
    }
    document.addEventListener('play', pauseForAnotherFilm, true)
    video.focus({ preventScroll: true })
    // This follows a visitor's Watch action. A browser may still require its native Play control.
    void video.play().catch(() => {})
    return () => {
      document.removeEventListener('play', pauseForAnotherFilm, true)
      video.pause()
    }
  }, [requested, failed])

  const watch = () => {
    setFailed(false)
    setRequested(true)
    trackCta('product_walkthrough_watch', { section: film.id, location: 'product_walkthroughs' })
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--border-emphasis)] bg-[var(--navy)]" data-walkthrough-player={film.id}>
      <div className="relative aspect-video" dir="ltr">
        {!requested || failed ? <button type="button" onClick={watch} className="group relative block h-full w-full cursor-pointer overflow-hidden text-start focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--text-display)]" aria-label={`${failed ? retryLabel : watchLabel}: ${title}`} data-watch-button={film.id}>
          <Image src={film.poster} alt="" fill sizes="(max-width: 1024px) 100vw, 760px" preload={priority} className="object-contain transition-transform duration-300 motion-safe:group-hover:scale-[1.015] motion-reduce:transition-none" />
          <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" aria-hidden />
          <span className="absolute bottom-4 left-4 right-4 flex items-center gap-3 text-sm font-semibold text-white sm:bottom-5 sm:left-5 sm:right-5 sm:text-base" aria-hidden>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FBF8F4] text-[#1E1711] shadow-md">{failed ? <RotateCcw className="h-5 w-5" /> : <Play className="ms-0.5 h-5 w-5 fill-current" />}</span>
            <span>{failed ? retryLabel : watchLabel}</span>
          </span>
        </button> : <video ref={videoRef} controls playsInline preload="none" poster={film.poster} src={film.source} width={1920} height={1080} aria-label={title} tabIndex={0} onError={() => setFailed(true)} className="h-full w-full bg-black object-contain focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-white" data-native-video={film.id}>
          <track kind="captions" src={film.captions} srcLang="en" label="English" default />
          <a href={film.source}>{watchLabel}</a>
        </video>}
      </div>
      {failed && <p role="status" className="border-t border-[var(--border-default)] px-5 py-4 text-sm leading-relaxed text-[var(--text-primary)]">{errorLabel}</p>}
    </div>
  )
}
