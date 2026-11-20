/**
 * Deterministic inference for guided booking: personal-address detection,
 * company-from-domain, country lookup, location buckets from a pricing
 * estimate and context-driven preselection. No network, no AI.
 *
 * Pure module with relative `.ts` imports so `node --test` can load it.
 */

import { COUNTRY_CODES, type CountryCode } from '../countryCodes.ts';
import { LOCATION_BUCKETS, type LocationBucket } from '../leadFields.ts';
import { pricingOfferNames } from '../pricingHandoffCopy.ts';
import type { PricingIntent } from '../pricingIntent.ts';
import type { FocusKey } from './packageNotes.ts';

// The free-mail list and company-from-domain live in one small module shared
// with the Operations Diagnostic (spec D13); re-exported here unchanged.
export {
  companyFromDomain,
  companyFromEmail,
  emailDomain,
  FREE_MAIL_DOMAINS,
  isFreeMailDomain,
  isFreeMailEmail,
} from '../freeMail.ts';

export function findCountryByIso(iso?: string | null): CountryCode | null {
  if (!iso || !/^[A-Za-z]{2}$/.test(iso)) return null;
  const upper = iso.toUpperCase();
  return COUNTRY_CODES.find((country) => country.iso === upper) ?? null;
}

export function findCountryByName(name?: string | null): CountryCode | null {
  if (!name) return null;
  return COUNTRY_CODES.find((country) => country.name === name) ?? null;
}

/** Map an exact location count to the stored bucket. */
export function locationBucketFor(count: number): LocationBucket | null {
  if (!Number.isFinite(count) || count < 1) return null;
  if (count === 1) return '1';
  if (count <= 5) return '2-5';
  if (count <= 10) return '6-10';
  if (count <= 25) return '11-25';
  if (count <= 50) return '26-50';
  if (count <= 100) return '51-100';
  if (count <= 200) return '101-200';
  return '200+';
}

export function isLocationBucket(value: unknown): value is LocationBucket {
  return typeof value === 'string' && (LOCATION_BUCKETS as readonly string[]).includes(value);
}

/** Preselected focus from the priced layer (Core, Crew or both). */
export function focusFromPricingIntent(intent: Pick<PricingIntent, 'layer'>): FocusKey[] {
  if (intent.layer === 'core') return ['margin_performance'];
  if (intent.layer === 'crew') return ['scheduling_attendance'];
  return ['scheduling_attendance', 'margin_performance'];
}

/** Workflow pages that link to the lead forms with `?workflow=<key>`. */
export const WORKFLOW_FOCUS = {
  'restaurant-management-platform': 'scheduling_attendance',
  'restaurant-task-management': 'tasks_logbook',
  'restaurant-logbook': 'tasks_logbook',
  'restaurant-tip-management': 'tips',
} as const satisfies Record<string, FocusKey>;
export type WorkflowKey = keyof typeof WORKFLOW_FOCUS;

export function isWorkflowKey(value: unknown): value is WorkflowKey {
  return typeof value === 'string' && Object.hasOwn(WORKFLOW_FOCUS, value);
}

const CREW_PRIORITY = [
  'crew_people_intelligence',
  'crew_payroll',
  'crew_operations',
  'crew_tna',
  'crew_scheduling',
  'crew_lite',
] as const;

/** Product names for the pricing-context opening ("You priced Core Growth"). */
export function pricingPackageLabel(intent: Pick<PricingIntent, 'layer' | 'corePackage' | 'crewSkus'>): string {
  const core = pricingOfferNames[intent.corePackage] ?? 'Sundae Core';
  const crewSku = CREW_PRIORITY.find((sku) => intent.crewSkus.includes(sku));
  const crew = crewSku ? pricingOfferNames[crewSku] ?? 'Sundae Crew' : 'Sundae Crew';
  if (intent.layer === 'core') return core;
  if (intent.layer === 'crew') return crew;
  return `${core} + ${crew}`;
}

const GCC_MENA = new Set(['AE', 'SA', 'QA', 'BH', 'OM', 'KW', 'EG', 'JO', 'LB', 'IQ', 'MA', 'TN', 'DZ']);
const NORTH_AMERICA = new Set(['US', 'CA']);
const UK_IE = new Set(['GB', 'IE']);
const EUROPE = new Set([
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
  'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'NO', 'CH', 'IS', 'TR',
]);
const SOUTH_ASIA = new Set(['IN', 'PK', 'BD', 'LK', 'NP']);
const ASIA_PACIFIC = new Set(['AU', 'NZ', 'SG', 'MY', 'ID', 'TH', 'VN', 'PH', 'JP', 'KR', 'HK', 'TW', 'CN']);

/**
 * POS choices most relevant to the visitor's country (from the integrations
 * we support). Product names are never translated. "Other" and "Not sure"
 * are added by the conversation.
 */
export function posOptionsForCountry(iso?: string | null): string[] {
  const code = (iso ?? '').toUpperCase();
  if (GCC_MENA.has(code)) return ['Foodics', 'Oracle MICROS Simphony', 'Lightspeed', 'Revel'];
  if (NORTH_AMERICA.has(code)) return ['Toast', 'Square', 'Oracle MICROS Simphony', 'NCR Aloha', 'Clover', 'Lightspeed'];
  if (UK_IE.has(code)) return ['Lightspeed', 'Oracle MICROS Simphony', 'Square', 'Toast'];
  if (EUROPE.has(code)) return ['Lightspeed', 'Oracle MICROS Simphony', 'Square', 'Untill'];
  if (SOUTH_ASIA.has(code)) return ['Petpooja', 'POSist / Restroworks', 'Oracle MICROS Simphony'];
  if (ASIA_PACIFIC.has(code)) return ['Square', 'Lightspeed', 'Oracle MICROS Simphony', 'Loyverse'];
  return ['Oracle MICROS Simphony', 'Toast', 'Square', 'Lightspeed'];
}

/** First name for friendly lines ("Nice to meet you, Sara"). */
export function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] ?? '';
}
