// Retired product URLs still appear in Google's localized crawl inventory.
// Only explicit successors redirect; unrelated or malformed paths stay 404s.
const destinations: Readonly<Record<string, string>> = {
  '/insights': '/product/insights',
  '/intelligence': '/product/intelligence',
  '/chat-with-data': '/product/intelligence',
  '/benchmarking': '/product/benchmarking',
  '/report': '/product/benchmarking',
  '/report-vs-core': '/product',
  '/product/sundae-report': '/product/benchmarking',
};

export function getLegacyMarketingDestination(pathname: string): string | null {
  return destinations[pathname.replace(/\/$/, '')] ?? null;
}
