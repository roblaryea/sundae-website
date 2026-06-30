'use client';

import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';
import { CrewModulePage } from '@/components/crew/CrewModulePage';
import { PhoneFrame } from '@/components/ui/PhoneFrame';
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
        // Two surfaces: employee My Schedule (front) + manager Team Scheduling
        // (behind-right). Only the employee phone shows on small screens.
        <div className="flex items-start justify-center">
          <div className="relative z-20">
            <PhoneFrame screenBg="#020617" time="3:00">
              <CrewSchedulingMobile />
            </PhoneFrame>
          </div>
          <div className="relative z-10 -ml-14 mt-12 hidden rotate-[6deg] scale-[0.88] opacity-95 lg:block">
            <PhoneFrame screenBg="#020617" time="5:30" glow={false}>
              <CrewSchedulingManagerMobile />
            </PhoneFrame>
          </div>
        </div>
      }
    />
  );
}
