'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useWebsiteI18n } from '@/components/i18n/LocaleProvider'
import { getLocalizedPathname } from '@/lib/i18n'
import closerCopy from '@/content/positioning-closer.json'
import storyCopy from '@/content/platform-story.json'

/** Explain the homepage promise before asking a buyer to interpret the live example. */
export function OperatingContext() {
  const { locale } = useWebsiteI18n()
  const copy = closerCopy[locale as keyof typeof closerCopy]
  const story = storyCopy[locale as keyof typeof storyCopy]
  return (
    <section className="border-y border-[var(--border-default)] bg-[var(--navy-deep)] px-6 py-12 sm:py-16 lg:px-8" data-operating-context>
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-[var(--text-primary)] sm:text-4xl">{copy.truthTitle}</h2>
        <div>
          <p className="text-base leading-relaxed text-[var(--text-supporting)]">{copy.truthBody}</p>
          <p className="mt-3 text-xs leading-relaxed text-[var(--text-muted)]">{copy.freshness}</p>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
            {[['Core', story.coreRole], ['Crew', story.crewRole]].map(([name, role]) => <Link key={name} href={getLocalizedPathname(`/${name.toLowerCase()}`, locale)} className="group flex items-center gap-3 text-sm text-[var(--text-primary)] underline decoration-[var(--border-emphasis)] underline-offset-4">
              <span><strong className="font-semibold">Sundae {name}</strong><span className="mt-1 block text-xs text-[var(--text-muted)]">{role}</span></span>
              <ArrowUpRight aria-hidden className="h-4 w-4 shrink-0 text-[var(--warm-coral)] transition-transform group-hover:-translate-y-0.5 rtl:-scale-x-100" />
            </Link>)}
          </div>
        </div>
      </div>
    </section>
  )
}
