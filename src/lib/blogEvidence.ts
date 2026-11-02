/**
 * Legacy articles held out of discovery until their proprietary data claims
 * have an approved evidence record. Direct visits are redirected to the
 * published benchmarking methodology instead of serving unsupported figures.
 */
export const blogEvidenceReviewSlugs = new Set([
  '2026-state-of-restaurant-intelligence',
  'gcc-restaurant-benchmarks-2026',
  'labor-benchmarks-gcc',
]);

export const BLOG_EVIDENCE_REVIEW_REDIRECT = '/blog/restaurant-benchmarking-methodology';

export function requiresBlogEvidenceReview(slug: string): boolean {
  return blogEvidenceReviewSlugs.has(slug);
}
