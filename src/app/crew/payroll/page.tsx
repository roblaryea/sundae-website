'use client';

import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';
import { CrewModulePage } from '@/components/crew/CrewModulePage';
import { PhoneFrame } from '@/components/ui/PhoneFrame';
import { CrewPayrollMobile } from '@/components/crew/CrewPayrollMobile';
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
        <PhoneFrame screenBg="#020617" time="3:00">
          <CrewPayrollMobile />
        </PhoneFrame>
      }
    />
  );
}
