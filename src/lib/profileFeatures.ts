/**
 * Switches for profile-card features that need a business decision before they go live.
 *
 * PROFILE_CARD_LEAD_FORM=on enables "Share your details" (the page section and its API route).
 * It is OFF unless set to exactly "on", so shipping the page and Save contact never
 * starts collecting visitors' personal data by accident. Turn it on in the hosting
 * environment only after the consent wording and privacy-policy coverage are approved.
 */
export function isLeadFormEnabled(env: Record<string, string | undefined> = process.env): boolean {
  return env.PROFILE_CARD_LEAD_FORM === 'on'
}
