'use client';

import { type ReactNode } from 'react';
import { PhoneCarousel } from '@/components/ui/PhoneCarousel';
import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';
import { coreMobileShowcaseLocales } from '@/lib/coreMobileShowcaseLocales';

/**
 * "On mobile" section for the Core product pages. Core is desktop-first decision
 * intelligence, so each page leads with its desktop dashboard mockups — this
 * section adds the complementary "…and it's a real mobile app too" proof: a
 * full-length, swipeable phone showing the genuine Decision-Intelligence mobile
 * surfaces (pulled faithfully from the Claude Design source), localized per locale.
 */
export function CoreMobileShowcase({ screens }: { screens: ReactNode[] }) {
  const { locale } = useWebsiteI18n();
  const c =
    coreMobileShowcaseLocales[locale as keyof typeof coreMobileShowcaseLocales] ??
    coreMobileShowcaseLocales.en;

  return (
    <section className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-mesh" />
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow mb-4">{c.eyebrow}</p>
          <h2 className="section-h2 mb-5 text-balance">{c.title}</h2>
          <p className="body-lg max-w-xl">{c.lede}</p>
        </div>
        <div className="flex justify-center lg:justify-end">
          <PhoneCarousel screens={screens} screenBg="#020617" hint={c.swipeHint} />
        </div>
      </div>
    </section>
  );
}
