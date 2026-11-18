import marketingBuyerCopy from '@/content/buyer-depth/marketing.json';
import technologyBuyerCopy from '@/content/buyer-depth/technology.json';
import franchiseBuyerCopy from '@/content/buyer-depth/franchises.json';
import copy from '@/content/operator-audiences.json';
import type { WebsiteLocale } from '@/lib/i18n';

export function getOperatorAudienceCopy(locale: WebsiteLocale) {
  return copy[locale as keyof typeof copy];
}

const openingKeys = {
  '/solutions': 'solutions',
  '/solutions/regional-managers': 'regional',
  '/solutions/hospitality-operators': 'hospitality',
  '/solutions/finance-teams': 'finance',
  '/solutions/hr-teams': 'hr',
  '/solutions/cloud-kitchens': 'cloud',
  '/solutions/multi-location-groups': 'multi',
  '/crew/scheduling': 'scheduling',
  '/crew/time-attendance': 'attendance',
  '/crew/people': 'people',
  '/crew/people-intelligence': 'peopleIntelligence',
  '/crew/payroll': 'payroll',
  '/product/benchmarking': 'benchmarking',
  '/product/cross-intelligence': 'cross',
  '/4d-intelligence': 'fourD',
  '/architecture': 'architecture',
} as const;

export function getOperatorAudienceDescription(locale: WebsiteLocale, pathname: string) {
  const updated = pathname === '/solutions/marketing-teams' ? marketingBuyerCopy : pathname === '/solutions/technology-teams' ? technologyBuyerCopy : pathname === '/solutions/franchises' ? franchiseBuyerCopy : undefined;
  if (updated) return updated[locale as keyof typeof updated].description;
  const key = openingKeys[pathname as keyof typeof openingKeys];
  return key ? getOperatorAudienceCopy(locale)[key] : undefined;
}
