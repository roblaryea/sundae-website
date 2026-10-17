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

export type ProfileHandle = (typeof PROFILE_HANDLES)[number]

export function isProfileHandle(value: string): value is ProfileHandle {
  return (PROFILE_HANDLES as readonly string[]).includes(value)
}

/** True for /<handle> and /<handle>/... (locale prefix already removed). */
export function isProfileCardPath(pathname: string): boolean {
  const first = pathname.split('/').filter(Boolean)[0]
  return first !== undefined && isProfileHandle(first.toLowerCase())
}
