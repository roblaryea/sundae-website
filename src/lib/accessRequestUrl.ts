import { localizeWebsiteHref, websiteLocales, type WebsiteLocale } from './i18n';
import { decodePricingIntent, encodePricingIntent } from './pricingIntent';

/** Recover a validated pricing basket from old sign-in links without forwarding arbitrary destinations. */
export function accessRequestUrl(returnUrl: unknown, locale: WebsiteLocale): string {
  const base = localizeWebsiteHref('/get-started', locale);
  if (typeof returnUrl !== 'string' || returnUrl.length > 6000 || !returnUrl.startsWith('/onboarding?')) return base;
  try {
    const url = new URL(returnUrl, 'https://app.sundaetech.ai');
    if (url.pathname !== '/onboarding') return base;
    const intent = decodePricingIntent(url.searchParams.get('cfg') ?? '');
    if (!intent) return base;
    const requestedLocale = url.searchParams.get('lang');
    const target = requestedLocale && websiteLocales.includes(requestedLocale as WebsiteLocale) ? localizeWebsiteHref('/get-started', requestedLocale as WebsiteLocale) : base;
    return `${target}?${new URLSearchParams({ cfg: encodePricingIntent(intent), source: 'pricing-configurator' })}`;
  } catch { return base; }
}
