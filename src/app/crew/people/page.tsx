'use client';

import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';
import { CrewModulePage } from '@/components/crew/CrewModulePage';
import { PhoneFrame } from '@/components/ui/PhoneFrame';
import { CrewTimeOffMobile } from '@/components/crew/CrewTimeOffMobile';
import { peopleCopy } from '@/components/crew/moduleCopies';

import { getGeneratedLocalCopy } from '@/lib/generatedLocalCopy';
import { generatedLocalCopy } from '@/generated-locales/app_crew_people_page';

export default function Page() {
  const { locale } = useWebsiteI18n();
  const copy = getGeneratedLocalCopy(peopleCopy, generatedLocalCopy.copy, locale) ?? peopleCopy.en;
  return (
    <CrewModulePage
      slug="people"
      copy={copy}
      heroVisual={
        <PhoneFrame screenBg="#020617" time="3:00">
          <CrewTimeOffMobile />
        </PhoneFrame>
      }
    />
  );
}
