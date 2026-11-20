'use client';

import { BookDemoButton } from '@/components/ui/BookDemoButton';

import { Button } from '@/components/ui/Button';
import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';
import { GuidanceClose, GuidanceHero, GuidanceReveal } from '@/components/support/GuidanceLayout';
import { CoreCrewScope, SystemCloseActions, SystemSequence } from '@/components/support/SystemPresentation';
import { getLocalizedPathname } from '@/lib/i18n';
import copyByLocale from '@/content/support-system.json';
import guidanceByLocale from '@/content/support-guidance.json';

export default function ArchitecturePage() {
  const { locale } = useWebsiteI18n();
  const copy = copyByLocale[locale as keyof typeof copyByLocale];
  const guidance = guidanceByLocale[locale as keyof typeof guidanceByLocale];
  const local = (path: string) => getLocalizedPathname(path, locale);
  const stages = [
    { title: copy.a1t, body: copy.a1b }, { title: copy.a2t, body: copy.a2b },
    { title: copy.a3t, body: copy.a3b }, { title: copy.a4t, body: copy.a4b },
    { title: copy.a5t, body: copy.a5b },
  ];
  return (
    <div className="search-brand-page min-h-screen bg-[var(--navy-deep)]">
      <GuidanceHero label={copy.aLabel} lead={copy.aLead} emphasis={copy.aEm} description={copy.aBody} compactDescription>
        <BookDemoButton variant="cta" size="lg" href={local('/demo')} trackingLabel="architecture_hero_walkthrough" className="max-w-full whitespace-normal! text-start" />
        <Button variant="outline-light" size="lg" href={local('/integrations')} trackingLabel="architecture_connections" className="max-w-full whitespace-normal! text-start">{guidance.connectionsTitle}</Button>
      </GuidanceHero>
      <section id="operating-flow" className="px-6 py-16 sm:px-8 lg:px-12 lg:py-24" aria-labelledby="operating-flow-title">
        <div className="mx-auto max-w-7xl">
          <GuidanceReveal className="mb-12 max-w-4xl">
            <h2 id="operating-flow-title" className="font-display text-3xl leading-tight text-[var(--text-primary)] sm:text-5xl">{copy.aSharedTitle}</h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--text-supporting)]">{copy.aSharedBody}</p>
          </GuidanceReveal>
          <SystemSequence stages={stages} inputs={[copy.sourceLabel, copy.workLabel]} />
        </div>
      </section>
      <CoreCrewScope locale={locale} />
      <GuidanceClose title={copy.aCloseTitle} description={copy.aCloseBody}>
        <SystemCloseActions locale={locale} secondaryHref="/security" secondaryLabel={copy.securityCta} prefix="architecture_close" sample />
        <Button href={local('/blog/gdpr-data-privacy-restaurant-groups')} variant="ghost" trackingLabel="architecture_gdpr_guide" className="mt-6 max-w-full whitespace-normal! text-start">{copy.gdprCta}<span aria-hidden="true" className="rtl:rotate-180">→</span></Button>
      </GuidanceClose>
    </div>
  );
}
