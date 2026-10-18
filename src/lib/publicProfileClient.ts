import type { PersonProfile } from './profileData'

/** Only 404 permits the caller to use its legacy printed-card record. */
export async function loadPublicProfile(key: string): Promise<PersonProfile | undefined> {
  const base = (process.env.SUNDAE_BACKEND_URL || 'https://api.sundaetech.ai').replace(/\/$/, '')
  const response = await fetch(`${base}/api/v1/public/team-profiles/${encodeURIComponent(key)}`, {
    cache: 'no-store', signal: AbortSignal.timeout(5000),
  })
  // Transitional compatibility for the existing printed card until its directory
  // record is created. A paused record is a 200 tombstone and never falls back.
  if (response.status === 404) return undefined
  if (!response.ok) throw new Error('Public profile directory unavailable')
  const { profile } = await response.json()
  if (!profile || profile.handle !== key || typeof profile.active !== 'boolean') throw new Error('Invalid public profile')
  if (!profile.active) return { handle: key, active: false, givenName: '', familyName: '', titleForm: 'masculine', company: '', phone: '', phoneDisplay: '', email: '', website: '' }
  for (const field of ['givenName','familyName','title','company','phone','phoneDisplay','email','website','city','countryCode']) {
    if (typeof profile[field] !== 'string' || !profile[field].trim() || /[\u0000-\u001f\u007f]/.test(profile[field])) throw new Error('Invalid public profile')
  }
  if (!/^\+[1-9]\d{6,14}$/.test(profile.phone) || !/^[A-Z]{2}$/.test(profile.countryCode)) throw new Error('Invalid public profile')
  const site = new URL(profile.website)
  if (site.protocol !== 'https:' || !['sundae.io','www.sundae.io'].includes(site.hostname) || site.username || site.password) throw new Error('Invalid public profile')
  if (profile.linkedin) {
    const linkedin = new URL(profile.linkedin)
    if (linkedin.protocol !== 'https:' || !['linkedin.com','www.linkedin.com'].includes(linkedin.hostname) || linkedin.username || linkedin.password || !linkedin.pathname.startsWith('/in/')) throw new Error('Invalid public profile')
  }
  return { handle: key, active: true, givenName: profile.givenName, familyName: profile.familyName, title: profile.title, company: profile.company, phone: profile.phone, phoneDisplay: profile.phoneDisplay, email: profile.email, website: profile.website, city: profile.city, countryCode: profile.countryCode, linkedin: profile.linkedin, bookingSlug: profile.bookingSlug, titleTranslations: profile.titleTranslations, cityTranslations: profile.cityTranslations, titleForm: 'masculine' }
}
