/** Retire the duplicate marketing pricing pages without losing a buyer's language or quote. */
export function legacyPricingRedirect(
  internalPathname: string,
  locale: string | null,
  search: string,
  pricingUrl: string,
): URL | null {
  if (internalPathname !== '/pricing' && !internalPathname.startsWith('/pricing/')) return null;

  const target = new URL(pricingUrl);
  target.pathname = `${target.pathname.replace(/\/$/, '')}${internalPathname.slice('/pricing'.length) || '/'}`;
  target.search = search;
  if (locale) target.searchParams.set('lang', locale);
  return target;
}
