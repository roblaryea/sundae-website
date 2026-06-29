'use client';

import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';
import { CrewModulePage } from '@/components/crew/CrewModulePage';
import { ThemedShot } from '@/components/ui/ThemedShot';
import { timeAttendanceCopy } from '@/components/crew/moduleCopies';

export default function Page() {
  const { locale } = useWebsiteI18n();
  const copy = timeAttendanceCopy[locale as keyof typeof timeAttendanceCopy] ?? timeAttendanceCopy.en;
  return (
    <CrewModulePage
      slug="time-attendance"
      copy={copy}
      heroVisual={
        <ThemedShot
          framed
          dark="/images/product/2026-fresh/crew-attendance-dark.png"
          light="/images/product/2026-fresh/crew-attendance.png"
          alt="Sundae Crew — Time & Attendance: verified mobile punching with geofence and timesheet approvals"
          width={1600}
          height={1000}
          priority
        />
      }
    />
  );
}
