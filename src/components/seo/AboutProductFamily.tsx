import Link from 'next/link'
import { getLocalizedPathname, type WebsiteLocale } from '@/lib/i18n'

type Capability = { name: string; description: string; href: string }

/** Core and Crew share one visual and semantic hierarchy on the company story. */
export function AboutProductFamily({ family, role, intro, capabilities, scope, locale }: {
  family: 'core' | 'crew'
  role: string
  intro: string
  capabilities: Capability[]
  scope: string[]
  locale: WebsiteLocale
}) {
  return (
    <div data-about-family={family} className="border-t border-[var(--border-default)] py-10 lg:py-14">
      <div className="mb-8 grid gap-5 lg:grid-cols-[minmax(0,0.5fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <p className="eyebrow mb-3">{role}</p>
          <h3 className="section-h3"><Link href={getLocalizedPathname(`/${family}`, locale)} className="brand-action-link">Sundae {family === 'core' ? 'Core' : 'Crew'} →</Link></h3>
        </div>
        <p className="body-lg max-w-3xl text-[var(--text-supporting)]">{intro}</p>
      </div>
      <ol className="grid gap-x-12 sm:grid-cols-2">
        {capabilities.map((item, index) => (
          <li key={item.href} data-about-capability={item.href} className="flex gap-5 border-t border-[var(--border-default)] py-5">
            <span aria-hidden="true" className="pt-2.5 font-display text-lg italic text-[var(--text-warm)]">{new Intl.NumberFormat(locale, { minimumIntegerDigits: 2 }).format(index + 1)}</span>
            <div className="min-w-0">
              <h4 className="mb-1 text-base font-semibold"><Link href={getLocalizedPathname(item.href, locale)} className="brand-action-link inline-flex min-h-11 items-center">{item.name} →</Link></h4>
              <p className="text-sm leading-relaxed text-[var(--text-supporting)]">{item.description}</p>
            </div>
          </li>
        ))}
      </ol>
      <div data-about-family-scope className="mt-5 max-w-5xl space-y-3 border-s-2 border-[var(--trust-border)] ps-5 text-sm leading-relaxed text-[var(--text-muted)]">
        {scope.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </div>
  )
}
