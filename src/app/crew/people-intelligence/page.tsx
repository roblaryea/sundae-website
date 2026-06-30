'use client';

import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';
import { CrewModulePage } from '@/components/crew/CrewModulePage';
import { ThemedShot } from '@/components/ui/ThemedShot';
import { peopleIntelligenceCopy } from '@/components/crew/moduleCopies';

import { getGeneratedLocalCopy } from '@/lib/generatedLocalCopy';
import { generatedLocalCopy } from '@/generated-locales/app_crew_people_intelligence_page';

export default function Page() {
  const { locale } = useWebsiteI18n();
  const copy = getGeneratedLocalCopy(peopleIntelligenceCopy, generatedLocalCopy.copy, locale) ?? peopleIntelligenceCopy.en;
  return (
    <CrewModulePage
      slug="people-intelligence"
      copy={copy}
      heroVisual={
        <ThemedShot
          framed
          dark="/images/product/2026-fresh/crew-benefits-dark.png"
          light="/images/product/2026-fresh/crew-benefits.png"
          alt="Sundae Crew — People Intelligence: workforce health, no-show risk and labor-cost trend in Labor Intelligence"
          width={1600}
          height={1000}
          priority
        />
      }
    />
  );
}
