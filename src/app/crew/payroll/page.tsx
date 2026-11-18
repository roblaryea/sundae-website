'use client';

import { getOperatorAudienceCopy } from '@/lib/operatorAudienceCopy';

import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';
import { CrewModulePage } from '@/components/crew/CrewModulePage';
import { PhoneCarousel } from '@/components/ui/PhoneCarousel';
import { CrewPayrollMobile } from '@/components/crew/CrewPayrollMobile';
import { CrewPayslipDetailMobile } from '@/components/crew/CrewPayslipDetailMobile';
import { CrewPayRunMobile } from '@/components/crew/CrewPayRunMobile';
import { payrollCopy } from '@/components/crew/moduleCopies';

import { getGeneratedLocalCopy } from '@/lib/generatedLocalCopy';
import { generatedLocalCopy } from '@/generated-locales/app_crew_payroll_page';

export default function Page() {
  const { locale } = useWebsiteI18n();
  const opening = getOperatorAudienceCopy(locale);
  const sourceOpeningCopy = getGeneratedLocalCopy(payrollCopy, generatedLocalCopy.copy, locale) ?? payrollCopy.en;
  const copy = { ...sourceOpeningCopy, description: opening.payroll };
  return (
    <CrewModulePage
      slug="payroll"
      copy={copy}
      heroVisual={
        <PhoneCarousel
          screenBg="#020617"
          time="3:00"
          screens={[
            <CrewPayrollMobile key="pay" />,
            <CrewPayslipDetailMobile key="payslip" />,
            <CrewPayRunMobile key="payrun" />,
          ]}
        />
      }
    />
  );
}
