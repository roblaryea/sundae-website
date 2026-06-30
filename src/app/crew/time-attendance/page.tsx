'use client';

import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';
import { CrewModulePage } from '@/components/crew/CrewModulePage';
import { PhoneCarousel } from '@/components/ui/PhoneCarousel';
import { CrewClockInMobile } from '@/components/crew/CrewClockInMobile';
import { timeAttendanceCopy } from '@/components/crew/moduleCopies';

import { getGeneratedLocalCopy } from '@/lib/generatedLocalCopy';
import { generatedLocalCopy } from '@/generated-locales/app_crew_time_attendance_page';

export default function Page() {
  const { locale } = useWebsiteI18n();
  const copy = getGeneratedLocalCopy(timeAttendanceCopy, generatedLocalCopy.copy, locale) ?? timeAttendanceCopy.en;
  return (
    <CrewModulePage
      slug="time-attendance"
      copy={copy}
      heroVisual={
        <PhoneCarousel screenBg="#020617" time="5:18" screens={[<CrewClockInMobile key="clock" />]} />
      }
    />
  );
}
