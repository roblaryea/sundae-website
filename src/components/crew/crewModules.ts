import type { SundaeIconName } from '@/components/icons';
import { CREW_SKUS } from '@/lib/pricing/priceBook';

/**
 * Canonical Crew module set — single source of truth for the per-module marketing
 * pages, the navbar "Sundae Crew" group, and the related-module cross-links.
 *
 * PRICING: each marketing module maps to exactly one v1.7 Crew SKU, and the
 * monthly price is read from the price book rather than restated here. Crew SKUs
 * are FLAT monthly in v1.7 — the old `pricePerLocation` adder is the retired
 * v1.6 mechanic and is gone, not zeroed, so nothing can render it again.
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
  /** v1.7 Crew SKU id this marketing page sells. */
  skuId: string;
  /** Flat monthly USD, resolved from the price book. */
  monthly: number;
};

const skuMonthly = (id: string): number => {
  const sku = CREW_SKUS.find((s) => s.id === id);
  if (!sku) throw new Error(`Unknown Crew SKU "${id}" — price book v1.7 has no such entry.`);
  return sku.monthly;
};

export const CREW_MODULES: CrewModule[] = [
  { slug: 'scheduling', name: 'Scheduling', tagline: 'Demand-aware shift planning', href: '/crew/scheduling', icon: 'time', skuId: 'crew_schedule', monthly: skuMonthly('crew_schedule') },
  { slug: 'time-attendance', name: 'Time & Attendance', tagline: 'Clock-in, geofence, timesheets', href: '/crew/time-attendance', icon: 'device', skuId: 'crew_time', monthly: skuMonthly('crew_time') },
  { slug: 'payroll', name: 'Payroll', tagline: 'Multi-region readiness & exports', href: '/crew/payroll', icon: 'finance', skuId: 'crew_pay', monthly: skuMonthly('crew_pay') },
  { slug: 'people', name: 'People & HR', tagline: 'Hire-to-retire records', href: '/crew/people', icon: 'hr', skuId: 'crew_manage', monthly: skuMonthly('crew_manage') },
  { slug: 'people-intelligence', name: 'People Intelligence', tagline: 'Workforce analytics', href: '/crew/people-intelligence', icon: 'labor', skuId: 'crew_people', monthly: skuMonthly('crew_people') },
];

export const crewModule = (slug: CrewModuleSlug): CrewModule =>
  CREW_MODULES.find((m) => m.slug === slug) ?? CREW_MODULES[0];
