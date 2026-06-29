'use client';

import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';
import { CrewModulePage } from '@/components/crew/CrewModulePage';
import { ThemedShot } from '@/components/ui/ThemedShot';
import { peopleCopy } from '@/components/crew/moduleCopies';

export default function Page() {
  const { locale } = useWebsiteI18n();
  const copy = peopleCopy[locale as keyof typeof peopleCopy] ?? peopleCopy.en;
  return (
    <CrewModulePage
      slug="people"
      copy={copy}
      heroVisual={
        <ThemedShot
          framed
          dark="/images/product/2026-fresh/crew-people-dark.png"
          light="/images/product/2026-fresh/crew-people.png"
          alt="Sundae Crew — People & HR: hire-to-retire workforce records on one governed surface"
          width={1600}
          height={1000}
          priority
        />
      }
    />
  );
}
