/**
 * Legacy articles held out of discovery until their proprietary data claims
 * have an approved evidence record. Direct visits are redirected to the
 * published benchmarking methodology instead of serving unsupported figures.
 */
export const blogEvidenceReviewSlugs = new Set([
  '2026-state-of-restaurant-intelligence',
  'gcc-restaurant-benchmarks-2026',
  'inside-sundae-canvas',
  'labor-benchmarks-gcc',
  'why-nexus-replaces-dashboard-suite',
]);

export const BLOG_EVIDENCE_REVIEW_REDIRECT = '/blog/restaurant-benchmarking-methodology';

const blogEvidenceReviewRedirects = new Map([
  ['inside-sundae-canvas', '/core'],
  ['why-nexus-replaces-dashboard-suite', '/product/intelligence'],
]);

export function getBlogEvidenceReviewRedirect(slug: string): string | null {
  if (!blogEvidenceReviewSlugs.has(slug)) return null;
  return blogEvidenceReviewRedirects.get(slug) ?? BLOG_EVIDENCE_REVIEW_REDIRECT;
}

export function requiresBlogEvidenceReview(slug: string): boolean {
  return getBlogEvidenceReviewRedirect(slug) !== null;
}
