import type { CityKey, RoleKey, TitleForm } from '@/lib/profileCatalogue'
import type { ProfileHandle } from './profileHandles'

/**
 * Public contact profiles served at sundae.io/<handle> (the destination of the QR code
 * on Sundae business cards). Everything here is published on the page and in the
 * downloadable contact file, so only add details the person has agreed to make public.
 *
 * Pure data (no runtime imports) so it can be unit-tested directly. profiles.ts adds a
 * consistency check against the company record.
 *
 * Adding a person: see docs/profile-cards.md.
 */
export type PersonProfile = {
  handle: ProfileHandle
  givenName: string
  familyName: string
  /** Key into ROLE_TITLES; the title is shown in the visitor's language. */
  roleKey: RoleKey
  /** Grammatical form of the title in languages that have one. Chosen by the card owner. */
  titleForm: TitleForm
  /** Legal entity name, shown as written in every language. */
  company: string
  /** E.164, used for tel: links and the contact file. */
  phone: string
  /** Human-readable form shown on the page. */
  phoneDisplay: string
  email: string
  /** Canonical https URL. */
  website: string
  linkedin?: string
  /** Key into CITIES; the city and country are shown in the visitor's language. */
  cityKey: CityKey
}

export const COMPANY_LEGAL_NAME = 'Sundae Technologies Inc.'
export const COMPANY_WEBSITE = 'https://www.sundae.io'

export const PROFILES: Record<ProfileHandle, PersonProfile> = {
  robert: {
    handle: 'robert',
    givenName: 'Robert',
    familyName: 'Laryea',
    roleKey: 'founder-ceo',
    // The card owner's choice for gendered languages. Confirm with the owner; change here.
    titleForm: 'masculine',
    company: COMPANY_LEGAL_NAME,
    phone: '+971555459842',
    phoneDisplay: '+971 55 545 9842',
    email: 'robert@sundaetech.ai',
    website: COMPANY_WEBSITE,
    linkedin: 'https://www.linkedin.com/in/robertalaryea',
    cityKey: 'dubai',
  },
}

export function profileFullName(profile: PersonProfile): string {
  return `${profile.givenName} ${profile.familyName}`
}

/** "sundae.io" from "https://www.sundae.io" for display. */
export function displayHost(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '')
}

/** "robertalaryea" from a linkedin.com/in/... URL. */
export function linkedinHandle(url: string): string {
  return url.replace(/\/$/, '').split('/').pop() ?? url
}
