import { COMPANY } from './company'
import { COMPANY_LEGAL_NAME, COMPANY_WEBSITE, PROFILES, type PersonProfile } from './profileData'
import { isProfileHandle } from './profileHandles'

export * from './profileData'

// profileData.ts is dependency-free so it can be unit-tested; this keeps it honest
// against the single source of truth for company identity.
if (COMPANY_LEGAL_NAME !== COMPANY.legalName || COMPANY_WEBSITE !== COMPANY.website) {
  throw new Error('profileData company constants are out of sync with src/lib/company.ts')
}

export function getProfile(handle: string): PersonProfile | null {
  const key = handle.toLowerCase()
  return isProfileHandle(key) ? PROFILES[key] : null
}
