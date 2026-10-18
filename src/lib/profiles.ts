import { COMPANY } from './company'
import { COMPANY_LEGAL_NAME, COMPANY_WEBSITE, PROFILES, type PersonProfile } from './profileData'
import { isProfileHandleCandidate } from './profileHandles'
import { cache } from 'react'
import { loadPublicProfile } from './publicProfileClient'

export * from './profileData'

// profileData.ts is dependency-free so it can be unit-tested; this keeps it honest
// against the single source of truth for company identity.
if (COMPANY_LEGAL_NAME !== COMPANY.legalName || COMPANY_WEBSITE !== COMPANY.website) {
  throw new Error('profileData company constants are out of sync with src/lib/company.ts')
}

/** Runtime directory: newly published staff cards require no website rebuild. */
export const getProfile = cache(async (handle: string): Promise<PersonProfile | null> => {
  const key = handle.toLowerCase()
  if (!isProfileHandleCandidate(key)) return null
  return (await loadPublicProfile(key)) ?? PROFILES[key] ?? null
})
