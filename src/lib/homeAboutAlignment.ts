import { operatorNavigationCopy } from '@/content/operator-workflows/navigation';
import openings from '@/content/operator-openings.json';
import type { WebsiteLocale } from '@/lib/i18n';

export function getHomeAboutAlignment(locale: WebsiteLocale) {
  const brand = operatorNavigationCopy[locale].brand;
  const opening = openings[locale as keyof typeof openings];
  return {
    primaryHeadline: brand.homeHeadline,
    primaryTagline: brand.homeTagline,
    eyebrow: brand.eyebrow,
    primarySupport: brand.sub,
    liveTitleTop: brand.homeLiveTitleTop,
    liveTitleBottom: brand.homeLiveTitleBottom,
    liveSupport: brand.homeLiveSupport,
    editorialHeadline: brand.editorialHeadline,
    editorialSupport: brand.editorialSupport,
    sharedDescription: opening.sharedDescription,
    coreDescription: opening.coreDescription,
    crewDescription: opening.crewDescription,
  };
}
