import type { SundaeIconName } from '@/components/icons';

/**
 * Canonical Crew module set — single source of truth for the per-module marketing
 * pages, the navbar "Sundae Crew" group, and the related-module cross-links.
 * Mirrors the Crew SKUs (scheduling / T&A / payroll / people / people-intelligence).
 */
export type CrewModuleSlug =
  | 'scheduling'
  | 'time-attendance'
  | 'payroll'
  | 'people'
  | 'people-intelligence';

export type CrewModule = {
  slug: CrewModuleSlug;
  name: string;
  tagline: string;
  href: string;
  icon: SundaeIconName;
  /** Monthly org-license base + per-location price (USD). Source of truth:
   *  sundae-backend/config/pricing_master.ts. Surfaced as a soft "From …" line;
   *  the pricing micro-site (PRICING_URL) is the authority for tiers + deps. */
  priceBase: number;
  pricePerLocation: number;
};

export const CREW_MODULES: CrewModule[] = [
  { slug: 'scheduling', name: 'Scheduling', tagline: 'Demand-aware shift planning', href: '/crew/scheduling', icon: 'time', priceBase: 179, pricePerLocation: 39 },
  { slug: 'time-attendance', name: 'Time & Attendance', tagline: 'Clock-in, geofence, timesheets', href: '/crew/time-attendance', icon: 'device', priceBase: 99, pricePerLocation: 19 },
  { slug: 'payroll', name: 'Payroll', tagline: 'Multi-region readiness & exports', href: '/crew/payroll', icon: 'finance', priceBase: 129, pricePerLocation: 29 },
  { slug: 'people', name: 'People & HR', tagline: 'Hire-to-retire records', href: '/crew/people', icon: 'hr', priceBase: 399, pricePerLocation: 79 },
  { slug: 'people-intelligence', name: 'People Intelligence', tagline: 'Workforce analytics', href: '/crew/people-intelligence', icon: 'labor', priceBase: 249, pricePerLocation: 39 },
];

export const crewModule = (slug: CrewModuleSlug): CrewModule =>
  CREW_MODULES.find((m) => m.slug === slug) ?? CREW_MODULES[0];
