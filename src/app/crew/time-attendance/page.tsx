'use client';

import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';
import { CrewModulePage } from '@/components/crew/CrewModulePage';
import { PhoneFrame } from '@/components/ui/PhoneFrame';
import { CrewClockInMobile } from '@/components/crew/CrewClockInMobile';
import { timeAttendanceCopy } from '@/components/crew/moduleCopies';

export default function Page() {
  const { locale } = useWebsiteI18n();
  const copy = timeAttendanceCopy[locale as keyof typeof timeAttendanceCopy] ?? timeAttendanceCopy.en;
  return (
    <CrewModulePage
      slug="time-attendance"
      copy={copy}
      heroVisual={
        <PhoneFrame screenBg="#020617" time="5:18">
          <CrewClockInMobile />
        </PhoneFrame>
      }
    />
  );
}
