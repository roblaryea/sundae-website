'use client';

import buyerBodyCopy from '@/content/buyer-depth/workforce.json';

import { getOperatorAudienceCopy } from '@/lib/operatorAudienceCopy';

import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';
import { CrewModulePage } from '@/components/crew/CrewModulePage';
import { PhoneCarousel } from '@/components/ui/PhoneCarousel';
import { CrewWorkforceHealthMobile } from '@/components/crew/CrewWorkforceHealthMobile';
import { CrewNoShowRiskMobile } from '@/components/crew/CrewNoShowRiskMobile';
import { CrewLaborCostMobile } from '@/components/crew/CrewLaborCostMobile';
import { peopleIntelligenceCopy } from '@/components/crew/moduleCopies';

import { getGeneratedLocalCopy, mergeGeneratedCopy } from '@/lib/generatedLocalCopy';
import { generatedLocalCopy } from '@/generated-locales/app_crew_people_intelligence_page';

export default function Page() {
  const { locale } = useWebsiteI18n();
  const opening = getOperatorAudienceCopy(locale);
  const sourceOpeningCopy = getGeneratedLocalCopy(peopleIntelligenceCopy, generatedLocalCopy.copy, locale) ?? peopleIntelligenceCopy.en;
  const copy = { ...sourceOpeningCopy, description: opening.peopleIntelligence };
  return (
    <CrewModulePage
      slug="people-intelligence"
      copy={mergeGeneratedCopy(copy, buyerBodyCopy[locale as keyof typeof buyerBodyCopy].peopleIntelligence)}
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
