'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { FadeUp } from '@/components/ui/PageAnimations'
import { useWebsiteI18n } from '@/components/i18n/LocaleProvider'
import { getLocalizedPathname } from '@/lib/i18n'
import { crewNavLocales } from '@/lib/crewNavLocales'
import { operatorNavigationCopy } from '@/content/operator-workflows/navigation'
import storyCopy from '@/content/platform-story.json'
import { getCommercialCopy } from '@/lib/pricing/commercialCopy'
import { trackCta } from '@/lib/cta'
import { getCoreNavigation } from '@/lib/coreNavigation'

/** Two peer offerings. Product capabilities stay within their parent offering. */
export function PlatformOfferings({ showIntro = true }: { showIntro?: boolean }) {
  const { locale, messages } = useWebsiteI18n()
  const { brand, links } = operatorNavigationCopy[locale as keyof typeof operatorNavigationCopy]
  const copy = storyCopy[locale as keyof typeof storyCopy]
  const crew = crewNavLocales[locale as keyof typeof crewNavLocales]
  const offerings = [
    { id: 'core', name: 'Sundae Core', role: copy.coreRole, description: brand.coreDescription, links: getCoreNavigation(messages.navbar.pillars, locale) },
    { id: 'crew', name: 'Sundae Crew', role: copy.crewRole, description: brand.crewDescription, links: [
      ...crew.crewList,
      { name: links.tasks, href: '/restaurant-task-management' },
      { name: links.logbook, href: '/restaurant-logbook' },
      { name: links.tips, href: '/restaurant-tip-management' },
    ] },
  ]

  return (
    <section className="bg-[var(--navy-deep)] px-4 py-20 sm:px-6 lg:px-8 lg:py-28" data-platform-offerings>
      <div className="mx-auto max-w-6xl">
        {showIntro && <FadeUp className="mb-14 max-w-3xl">
          <p className="eyebrow mb-4">Sundae Core · Sundae Crew</p>
          <h2 className="section-h2 text-balance">{brand.productTitle}</h2>
          <p className="body-lg mt-5 max-w-2xl text-[var(--text-supporting)]">{brand.productDescription}</p>
        </FadeUp>}
        <div className="grid gap-14 md:grid-cols-2 md:gap-0">
          {offerings.map((offering, index) => (
            <FadeUp key={offering.id} delay={index * 0.1} className={`flex flex-col border-t border-[var(--border-default)] pt-8 ${index === 0 ? 'md:pe-12' : 'md:border-s md:ps-12'}`}>
              <article className="flex h-full flex-col" data-offering={offering.id}>
                <p className="eyebrow mb-4">{offering.name}</p>
                <h3 className="font-display text-3xl font-semibold leading-tight tracking-tight text-[var(--text-display)] sm:text-4xl">{offering.role}</h3>
                <p className="mt-5 text-base leading-relaxed text-[var(--text-supporting)]">{offering.description}</p>
                <ul className="my-8 grid grid-cols-2 gap-x-5 gap-y-4">
                  {offering.links.map(link => <li key={link.href} className="min-w-0">
                    <Link href={getLocalizedPathname(link.href, locale)} className="text-sm font-medium leading-snug break-words hyphens-auto text-[var(--text-primary)] underline decoration-[var(--border-emphasis)] underline-offset-4 transition-colors hover:text-[var(--warm-coral)]">{link.name}</Link>
                  </li>)}
                </ul>
                <Link href={getLocalizedPathname(`/${offering.id}`, locale)} onClick={() => trackCta(offering.id === 'core' ? 'view_core_product_card' : 'view_crew_product', { destination: `/${offering.id}`, location: 'platform_offerings' })} className="group mt-auto inline-flex w-fit items-center gap-3 border-b border-[var(--text-muted)] pb-2 text-base font-semibold text-[var(--text-primary)] transition-colors hover:text-[var(--warm-coral)]">{offering.name}<ArrowUpRight aria-hidden className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 rtl:-scale-x-100" /></Link>
              </article>
            </FadeUp>
          ))}
        </div>
        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">{getCommercialCopy(locale).packageScope}</p>
      </div>
    </section>
  )
}
