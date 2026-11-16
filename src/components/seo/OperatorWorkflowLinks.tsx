'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useWebsiteI18n } from '@/components/i18n/LocaleProvider'
import { FadeUp } from '@/components/ui/PageAnimations'
import { getLocalizedPathname } from '@/lib/i18n'
import { operatorNavigationCopy } from '@/content/operator-workflows/navigation'

const destinations = [
  ['platform', '/restaurant-management-platform'],
  ['tasks', '/restaurant-task-management'],
  ['logbook', '/restaurant-logbook'],
  ['tips', '/restaurant-tip-management'],
  ['scheduling', '/crew/scheduling'],
  ['attendance', '/crew/time-attendance'],
] as const

/** A restrained editorial index, shared by the platform and workforce journeys. */
export function OperatorWorkflowLinks() {
  const { locale } = useWebsiteI18n()
  const copy = operatorNavigationCopy[locale as keyof typeof operatorNavigationCopy].links
  return (
    <section className="border-y border-[var(--border-default)] bg-[var(--navy-deep)] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <FadeUp>
          <p className="eyebrow mb-4">{copy.eyebrow}</p>
          <h2 className="section-h2 text-balance">{copy.title}</h2>
          <p className="body-lg mt-5 max-w-xl text-[var(--text-supporting)]">{copy.description}</p>
        </FadeUp>
        <nav aria-label={copy.eyebrow} className="divide-y divide-[var(--border-default)] border-y border-[var(--border-default)]">
          {destinations.map(([key, path]) => (
            <Link key={path} href={getLocalizedPathname(path, locale)} className="group flex! w-full min-h-16 items-center justify-between gap-6 px-0! py-5! text-lg font-medium text-[var(--text-primary)] transition-colors hover:text-[var(--warm-coral)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--warm-coral)]">
              <span>{copy[key]}</span>
              <ArrowUpRight aria-hidden className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-0.5 rtl:-scale-x-100" />
            </Link>
          ))}
        </nav>
      </div>
    </section>
  )
}
