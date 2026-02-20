/**
 * Centralized company identity — single source of truth for legal name,
 * address, jurisdiction, and contact details used across legal pages,
 * footer, metadata, and structured data.
 */

import { SITE_URL } from './urls';

export const COMPANY = {
  legalName: 'Sundae Technologies Inc.',
  tradingAs: 'Sundae',
  jurisdiction: 'Delaware, United States',
  governingLaw: 'the State of Delaware, United States',
  courts: 'the state and federal courts located in the State of Delaware',
  address: {
    line1: '1007 N Orange St',
    line2: '4th Floor, Suite 1382',
    city: 'Wilmington',
    state: 'DE',
    zip: '19801',
    country: 'United States',
  },
  registeredAgent: 'Firstbase Agent LLC',
  supportEmail: 'support@sundae.io',
  privacyEmail: 'privacy@sundae.io',
  legalEmail: 'legal@sundae.io',
  website: SITE_URL,
  /** All domains operated by Sundae Technologies Inc. */
  operatingDomains: [
    'sundae.io',
    'sundaetech.ai',
    'sundaetech.io',
    'sundaetechnologies.com',
  ],
} as const;

/** Formatted multi-line address string */
export function formatAddress(separator: string = '\n'): string {
  const a = COMPANY.address;
  return [a.line1, a.line2, `${a.city}, ${a.state} ${a.zip}`, a.country].join(separator);
}
