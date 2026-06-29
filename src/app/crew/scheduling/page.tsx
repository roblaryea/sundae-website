'use client';

import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';
import { CrewModulePage } from '@/components/crew/CrewModulePage';
import { PhoneFrame } from '@/components/ui/PhoneFrame';
import { CrewSchedulingMobile } from '@/components/crew/CrewSchedulingMobile';
import { schedulingCopy } from './schedulingCopy';

export default function CrewSchedulingPage() {
  const { locale } = useWebsiteI18n();
  const copy = schedulingCopy[locale as keyof typeof schedulingCopy] ?? schedulingCopy.en;

  return (
    <CrewModulePage
      slug="scheduling"
      copy={copy}
      heroVisual={
        <PhoneFrame screenBg="#020617" time="3:00">
          <CrewSchedulingMobile />
        </PhoneFrame>
      }
    />
  );
}
