export const CONSENT_KEY = 'sundae_cookie_consent';
export type ConsentStatus = 'accepted' | 'declined' | null;

export function getConsentStatus(): ConsentStatus {
  if (typeof window === 'undefined') return null;
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    if (value === 'accepted' || value === 'declined') return value;
  } catch { /* Storage can be unavailable in private browsing. */ }
  const match = document.cookie.match(/(?:^|;\s*)sundae_cookie_consent=(accepted|declined)/);
  return match ? match[1] as ConsentStatus : null;
}

export function hasConsent(): boolean {
  return getConsentStatus() === 'accepted';
}
