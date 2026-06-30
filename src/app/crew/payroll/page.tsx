'use client';

import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';
import { CrewModulePage } from '@/components/crew/CrewModulePage';
import { ThemedShot } from '@/components/ui/ThemedShot';
import { payrollCopy } from '@/components/crew/moduleCopies';

import { getGeneratedLocalCopy } from '@/lib/generatedLocalCopy';
import { generatedLocalCopy } from '@/generated-locales/app_crew_payroll_page';

export default function Page() {
  const { locale } = useWebsiteI18n();
  const copy = getGeneratedLocalCopy(payrollCopy, generatedLocalCopy.copy, locale) ?? payrollCopy.en;
  return (
    <CrewModulePage
      slug="payroll"
      copy={copy}
      heroVisual={
        <ThemedShot
          framed
          dark="/images/product/2026-fresh/crew-payroll-dark.png"
          light="/images/product/2026-fresh/crew-payroll.png"
          alt="Sundae Crew — Payroll: multi-region payroll readiness, statutory exports and year-end forms"
          width={1600}
          height={1000}
          priority
        />
      }
    />
  );
}
