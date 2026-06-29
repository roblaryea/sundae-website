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
};

export const CREW_MODULES: CrewModule[] = [
  { slug: 'scheduling', name: 'Scheduling', tagline: 'Demand-aware shift planning', href: '/crew/scheduling', icon: 'time' },
  { slug: 'time-attendance', name: 'Time & Attendance', tagline: 'Clock-in, geofence, timesheets', href: '/crew/time-attendance', icon: 'device' },
  { slug: 'payroll', name: 'Payroll', tagline: 'Multi-region readiness & exports', href: '/crew/payroll', icon: 'finance' },
  { slug: 'people', name: 'People & HR', tagline: 'Hire-to-retire records', href: '/crew/people', icon: 'hr' },
  { slug: 'people-intelligence', name: 'People Intelligence', tagline: 'Workforce analytics', href: '/crew/people-intelligence', icon: 'labor' },
];

export const crewModule = (slug: CrewModuleSlug): CrewModule =>
  CREW_MODULES.find((m) => m.slug === slug) ?? CREW_MODULES[0];
