'use client';

import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';
import { CrewModulePage } from '@/components/crew/CrewModulePage';
import { PhoneCarousel } from '@/components/ui/PhoneCarousel';
import { CrewWorkforceHealthMobile } from '@/components/crew/CrewWorkforceHealthMobile';
import { CrewNoShowRiskMobile } from '@/components/crew/CrewNoShowRiskMobile';
import { CrewLaborCostMobile } from '@/components/crew/CrewLaborCostMobile';
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
        <PhoneCarousel
          screenBg="#020617"
          time="3:00"
          screens={[
            <CrewWorkforceHealthMobile key="wfh" />,
            <CrewNoShowRiskMobile key="noshow" />,
            <CrewLaborCostMobile key="laborcost" />,
          ]}
        />
      }
    />
  );
}
