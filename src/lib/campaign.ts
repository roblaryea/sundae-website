import { containsBookingData, isBookingUrl } from './booking/privacy';
import { hasConsent } from './consent';

const CAMPAIGN_KEY = 'sundae_campaign_session';
const CAMPAIGN_FIELDS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;
type Campaign = Partial<Record<typeof CAMPAIGN_FIELDS[number], string>>;

function readCampaign(value: unknown): Campaign {
  if (!value || typeof value !== 'object') return {};
  return Object.fromEntries(CAMPAIGN_FIELDS.flatMap(key => {
    const text = (value as Record<string, unknown>)[key];
    // Campaign slugs only: never persist URL credentials, contact details or
    // arbitrary query fields. Keep the same allowlist at every boundary.
    return typeof text === 'string' && /^[\p{L}\p{N}_.~ +%-]{1,200}$/u.test(text)
      ? [[key, text]] : [];
  }));
}

/** Last tagged campaign for this consented tab, surviving ordinary links. */
export function getCampaignParams(): Campaign {
  if (typeof window === 'undefined') return {};
  const clear = () => {
    try { window.sessionStorage.removeItem(CAMPAIGN_KEY); } catch { /* Optional storage. */ }
  };
  if (!hasConsent() || isBookingUrl(window.location.href) ||
      containsBookingData(window.location.href) || containsBookingData(document.referrer)) {
    clear();
    return {};
  }
  const current = readCampaign(Object.fromEntries(new URLSearchParams(window.location.search)));
  if (Object.keys(current).length) {
    // A new campaign replaces the old one; do not mix fields from two campaigns.
    try { window.sessionStorage.setItem(CAMPAIGN_KEY, JSON.stringify(current)); } catch { /* Use the URL. */ }
    return current;
  }
  try { return readCampaign(JSON.parse(window.sessionStorage.getItem(CAMPAIGN_KEY) || '{}')); }
  catch { clear(); return {}; }
}

/** Propagate only to same-origin public pages, preserving explicit target tags. */
export function appendCampaign(url: string): string {
  if (typeof window === 'undefined') return url;
  const campaign = getCampaignParams();
  try {
    const target = new URL(url, window.location.href);
    if (target.origin !== window.location.origin || isBookingUrl(target.href) ||
        containsBookingData(target.href) || url.startsWith('#') ||
        [...target.searchParams.keys()].some(key => key.startsWith('utm_'))) return url;
    for (const [key, value] of Object.entries(campaign)) target.searchParams.set(key, value);
    return /^https?:\/\//.test(url) ? target.href : `${target.pathname}${target.search}${target.hash}`;
  } catch { return url; }
}
