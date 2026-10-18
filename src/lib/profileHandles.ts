/**
 * Handles that resolve to a Sundae profile card at sundae.io/<handle>.
 *
 * Kept in its own tiny module (no personal data) because the website chrome reads it
 * on every page to decide whether to hide the marketing navigation. The full profile
 * records live in profiles.ts and are only bundled by the profile routes.
 * profiles.ts types its registry as Record<ProfileHandle, ...>, so a handle added
 * here without a matching profile fails the type check.
 */
export const PROFILE_HANDLES = ['robert'] as const

export type ProfileHandle = string

// Existing marketing routes retain their own layout and routing. Unknown root
// handles may resolve dynamically, but never consume an established site path.
const RESERVED = new Set('4d-intelligence about api architecture blog book brand careers chat-with-data contact core crew demo diagnostic docs faq getting-started integrations modules p preview pricing privacy product resources security sign-in signin solutions terms tiktok-review tools why-sundae admin auth login logout signup sign-up sitemap robots'.split(' '))
export function isProfileHandleCandidate(value: string): boolean {
  return /^[a-z][a-z0-9-]{2,63}$/.test(value) && !value.endsWith('-') && !RESERVED.has(value)
}

export function isProfileHandle(value: string): value is ProfileHandle {
  return (PROFILE_HANDLES as readonly string[]).includes(value)
}

/** True for /<handle> and /<handle>/... (locale prefix already removed). */
export function isProfileCardPath(pathname: string): boolean {
  const first = pathname.split('/').filter(Boolean)[0]
  const segments = pathname.split('/').filter(Boolean)
  return first !== undefined && isProfileHandleCandidate(first.toLowerCase()) && (segments.length === 1 || (segments.length === 2 && segments[1] === 'contact.vcf'))
}
