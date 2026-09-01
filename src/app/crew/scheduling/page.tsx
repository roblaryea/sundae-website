'use client';

import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';
import { CrewModulePage } from '@/components/crew/CrewModulePage';
import { PhoneCarousel } from '@/components/ui/PhoneCarousel';
import { CrewSchedulingMobile } from '@/components/crew/CrewSchedulingMobile';
import { CrewSchedulingManagerMobile } from '@/components/crew/CrewSchedulingManagerMobile';
import { schedulingCopy } from './schedulingCopy';

import { getGeneratedLocalCopy } from '@/lib/generatedLocalCopy';
import { generatedLocalCopy } from '@/generated-locales/app_crew_scheduling_page';

export default function CrewSchedulingPage() {
  const { locale } = useWebsiteI18n();
  const copy = getGeneratedLocalCopy(schedulingCopy, generatedLocalCopy.copy, locale) ?? schedulingCopy.en;

  return (
    <CrewModulePage
      slug="scheduling"
      copy={copy}
      heroVisual={
        // One full-length phone the visitor swipes through: the employee
        // "My Schedule" surface and the manager "Team Scheduling" surface.
        <PhoneCarousel
          screenBg="#020617"
          time="3:00"
          screens={[
            <CrewSchedulingMobile key="me" />,
            <CrewSchedulingManagerMobile key="mgr" />,
          ]}
        />
      }
    />
  );
}
