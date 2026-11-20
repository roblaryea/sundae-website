import type { WebsiteLocale } from '@/lib/i18n'
import messagingCopy from '@/content/messaging-feature.json'

/** A connected workflow across Core and Crew, rather than another platform family. */
export function MessagingFeature({ locale, compact = false }: { locale: WebsiteLocale; compact?: boolean }) {
  const copy = messagingCopy[locale as keyof typeof messagingCopy]
  return (
    <section id="messaging" aria-labelledby="messaging-title" data-messaging-feature={compact ? 'summary' : 'detail'} className={`brand-editorial-wash border-y border-[var(--border-default)] px-6 sm:px-8 lg:px-12 ${compact ? 'py-12 lg:py-16' : 'py-16 lg:py-24'}`}>
      <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div className="min-w-0">
          <p className="eyebrow mb-4 text-[var(--text-warm)]">{copy.eyebrow}</p>
          <h2 id="messaging-title" className={`${compact ? 'section-h3' : 'section-h2'} max-w-xl text-balance break-words`}>
            <span className="block">{copy.titleLead}</span>{' '}
            <span className="mt-1 block font-normal italic text-[var(--text-warm)]">{copy.titleEmphasis}</span>
          </h2>
        </div>
        <div className="min-w-0">
          <p className="body-lg max-w-2xl text-[var(--text-supporting)]">{copy.description}</p>
          {!compact && <ul className="mt-7 grid gap-x-8 sm:grid-cols-2">
            {copy.features.map(feature => <li key={feature} className="min-w-0 border-t border-[var(--border-default)] py-4 text-base font-medium leading-relaxed text-[var(--text-primary)]">{feature}</li>)}
          </ul>}
          <p className="mt-5 text-sm leading-relaxed text-[var(--text-supporting)]">{copy.scope}</p>
        </div>
      </div>
    </section>
  )
}
