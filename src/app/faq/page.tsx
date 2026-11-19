'use client';

import './faq.css';

import { Button } from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';
import { GuidanceClose, GuidanceHero, GuidanceReveal } from '@/components/support/GuidanceLayout';
import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';
import { trackCta, useCta } from '@/lib/cta';
import { appendCampaign } from '@/lib/campaign';
import { getLocalizedPathname } from '@/lib/i18n';
import { buildPricingSimulatorUrl } from '@/lib/pricingNavigation';
import { getCommercialCopy } from '@/lib/pricing/commercialCopy';
import { getLocalizedFaqSections } from '@/content/faqContent';
import sharedBuyerCopy from '@/content/buyer-clarity/shared.json';
import resourceCopy from '@/content/buyer-clarity/resources.json';
import faqCopyByLocale from '@/content/support-faq.json';
import guidanceCopyByLocale from '@/content/support-guidance.json';
import systemCopyByLocale from '@/content/support-system.json';

export default function FAQPage() {
  const cta = useCta();
  const { locale, messages } = useWebsiteI18n();
  const copy = messages.pages.faq;
  const faqCopy = faqCopyByLocale[locale as keyof typeof faqCopyByLocale];
  const guidance = guidanceCopyByLocale[locale as keyof typeof guidanceCopyByLocale];
  const system = systemCopyByLocale[locale as keyof typeof systemCopyByLocale];
  const commercial = getCommercialCopy(locale);
  const walkthrough = resourceCopy[locale as keyof typeof resourceCopy].primaryCta;
  const faqCategories = getLocalizedFaqSections(locale, copy.categories);
  const local = (path: string) => getLocalizedPathname(path, locale);
  const continuations: Record<string, { href: string; label: string }> = {
    'getting-started': { href: '/getting-started', label: guidance.planCta },
    'products-tiers': { href: '/core', label: guidance.coreCta },
    'data-integration': { href: '/integrations', label: guidance.connectionsCta },
    modules: { href: '/core', label: guidance.coreCta },
    watchtower: { href: '/product/watchtower', label: 'Watchtower' },
    'pricing-billing': { href: buildPricingSimulatorUrl(locale), label: commercial.viewEstimate },
    features: { href: '/architecture', label: system.architectureCta },
    support: { href: '/docs', label: guidance.docsLabel },
    security: { href: '/security', label: system.securityCta },
    enterprise: { href: '/contact', label: copy.contactUs },
    comparisons: { href: '/restaurant365-alternative', label: 'Sundae / Restaurant365' },
    'use-cases': { href: '/solutions', label: messages.navbar.solutions },
    crew: { href: '/crew', label: guidance.crewCta },
  };

  return (
    <div data-faq-page className="search-brand-page min-h-screen bg-[var(--navy-deep)]">
      <GuidanceHero label={copy.badge} lead={faqCopy.heroLead} emphasis={faqCopy.heroEm} description={faqCopy.heroBody} compactDescription>
        <a href="#faq-topics" className="inline-flex min-h-11 items-center gap-4 font-semibold text-[var(--text-primary)] underline decoration-[var(--accent-warm)] underline-offset-4 transition-colors hover:text-[var(--text-warm)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-warm)]">
          {faqCopy.browse}<span aria-hidden="true">↓</span>
        </a>
      </GuidanceHero>

      <section id="faq-topics" className="scroll-mt-28 px-6 py-12 sm:px-8 lg:px-12 lg:py-20" aria-label={faqCopy.allTopics}>
        <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] lg:gap-20">
          <nav aria-label={copy.jumpToCategory} className="min-w-0 lg:sticky lg:top-28">
            <p className="mb-4 text-sm font-medium text-[var(--text-warm)]">{copy.jumpToCategory}</p>
            <ul className="grid grid-cols-1 gap-x-5 min-[370px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-1">
              {faqCategories.map(category => (
                <li key={category.id} className="min-w-0">
                  <a href={`#${category.id}`} className="inline-flex min-h-11 w-full items-center py-2 text-sm leading-relaxed text-[var(--text-supporting)] transition-colors hover:text-[var(--text-warm)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-warm)] lg:text-base">
                    {category.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0 space-y-16 lg:space-y-20">
            {faqCategories.map((category, index) => {
              const continuation = continuations[category.id];
              const destination = continuation.href.startsWith('https:') ? continuation.href : local(continuation.href);
              return (
                <GuidanceReveal key={category.id}>
                  <section id={category.id} aria-labelledby={`${category.id}-title`} className="scroll-mt-28">
                    <div className="mb-6 flex items-baseline gap-4 sm:gap-6">
                      <span aria-hidden="true" className="font-display text-xl text-[var(--text-warm)]">{String(index + 1).padStart(2, '0')}</span>
                      <h2 id={`${category.id}-title`} className="min-w-0 font-display text-3xl leading-tight text-[var(--text-primary)] sm:text-4xl">{category.title}</h2>
                    </div>
                    <Accordion items={category.faqs} variant="editorial" />
                    <a
                      href={destination}
                      onClick={event => {
                        event.currentTarget.href = appendCampaign(destination);
                        trackCta('faq_category_continuation', { category: category.id, destination: continuation.href });
                      }}
                      className="group mt-4 inline-flex min-h-11 items-center gap-4 py-2 text-sm font-medium text-[var(--text-supporting)] underline decoration-[var(--accent-warm)] underline-offset-4 transition-colors hover:text-[var(--text-warm)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-warm)]"
                    >
                      {continuation.label}<span aria-hidden="true" className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none rtl:rotate-180 rtl:group-hover:-translate-x-1">→</span>
                    </a>
                  </section>
                </GuidanceReveal>
              );
            })}
          </div>
        </div>
      </section>

      <GuidanceClose title={guidance.closeTitle} description={faqCopy.closeBody}>
        <Button variant="cta" size="lg" onClick={() => cta('/demo', 'book_demo_from_faq', { page: '/faq' })} className="max-w-full whitespace-normal! text-start">{walkthrough}</Button>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-supporting)]">{commercial.sampleWalkthrough}</p>
        <div className="mt-6 flex flex-col items-start gap-x-8 sm:flex-row sm:flex-wrap">
          <Button href={buildPricingSimulatorUrl(locale)} variant="ghost" trackingLabel="faq_pricing" className="max-w-full whitespace-normal! text-start">{commercial.viewEstimate}</Button>
          <Button href={local('/results')} variant="ghost" trackingLabel="faq_public_evidence" className="max-w-full whitespace-normal! text-start">{sharedBuyerCopy[locale as keyof typeof sharedBuyerCopy].proofLink}</Button>
          <Button variant="ghost" onClick={() => cta('/contact', 'contact_from_faq', { page: '/faq' })} className="max-w-full whitespace-normal! text-start">{copy.contactUs}</Button>
        </div>
        <p className="mt-6 text-sm leading-relaxed text-[var(--text-supporting)]">
          {copy.emailSupportPrefix}{' '}<a href="mailto:support@sundae.io" className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-[var(--text-warm)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-warm)]">support@sundae.io</a>
        </p>
      </GuidanceClose>
    </div>
  );
}
