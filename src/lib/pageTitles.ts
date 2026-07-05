import type { WebsiteLocale } from '@/lib/i18n';
import { generatedLocalCopy } from '@/generated-locales/lib_page_titles';

/**
 * Central per-route <title> map.
 *
 * Many routes previously fell back to the single generic root title
 * ("Sundae - Decision Intelligence for Restaurants"), which is bad for SEO and
 * browser-tab clarity. Rather than add a metadata-bearing layout.tsx to each of
 * ~36 routes, the root layout's generateMetadata resolves the title centrally
 * from this map (see src/app/layout.tsx). Any route that ships its OWN title via
 * its page/layout metadata still overrides this - Next.js metadata merges child
 * over parent - so this only fills the gaps.
 *
 * Keys are NORMALISED, de-localised route paths (no locale prefix, no trailing
 * slash), e.g. "/product/foresight". English lives here; the 21 non-English
 * transcreations live in generated-locales/lib_page_titles.ts. Product / plan
 * names (Sundae, Pulse, Watchtower, Foresight, Insights, Crew, Report, Core,
 * Intelligence, Benchmarking, Cross-Intelligence) are protected glossary terms -
 * kept literal across locales; only the descriptor transcreates.
 */
export const pageTitlesEn: Record<string, string> = {
  '/product': 'The Sundae Platform - Six Layers of Restaurant Decision Intelligence',
  '/product/benchmarking': 'Sundae Benchmarking - Compare Every Location Against the Market',
  '/product/foresight': 'Sundae Foresight - Predictive Forecasting & Scenario Planning',
  '/product/insights': 'Sundae Insights - 12 Deep Analytics Modules for Restaurants',
  '/product/intelligence': 'Sundae Intelligence - Ask Your Restaurant Data Anything',
  '/core': 'Sundae Core - The Decision Intelligence Workspace',
  '/4d-intelligence': 'The 4D Intelligence Model - How Sundae Reads Your Business',
  '/architecture': 'Platform Architecture - How Sundae Unifies Your Data',
  '/modules': 'Sundae Modules - 12 Analytics Modules, One Platform',
  '/report-vs-core': 'Sundae Report vs Core - Which Plan Fits Your Group',
  '/crew': 'Sundae Crew - Workforce Operations Built for Restaurants',
  '/crew/scheduling': 'Sundae Crew Scheduling - Demand-Aware Shift Planning',
  '/crew/time-attendance': 'Sundae Crew Time & Attendance - Clock-In, Geofence, Timesheets',
  '/crew/payroll': 'Sundae Crew Payroll - Multi-Region Payroll Readiness',
  '/crew/people': 'Sundae Crew People - Hire-to-Retire HR Records',
  '/crew/people-intelligence': 'Sundae Crew People Intelligence - Workforce Analytics',
  '/careers': 'Careers at Sundae - Build the Decision Layer for Restaurants',
  '/security': 'Security at Sundae - How We Protect Your Data',
  '/privacy': 'Privacy Policy - Sundae',
  '/terms': 'Terms of Service - Sundae',
  '/resources': 'Resources - Guides, Tools & Playbooks from Sundae',
  '/docs': 'Sundae Docs - Product Documentation & Guides',
  '/diagnostic': 'Free Operations Diagnostic - See Where Sundae Helps',
  '/blog': 'The Sundae Blog - Restaurant Intelligence & Operations',
  '/tools': 'Free Restaurant Tools & Calculators - Sundae',
  '/tools/benchmark-readiness': 'Benchmark Readiness Score - Free Restaurant Tool',
  '/tools/breakeven-covers': 'Break-Even Covers Calculator - Free Restaurant Tool',
  '/tools/daypart-margin-leak': 'Daypart Margin Leak Finder - Free Restaurant Tool',
  '/tools/labor-analyzer': 'Labor Cost Analyzer - Free Restaurant Tool',
  '/tools/labor-cost': 'Labor Cost Calculator - Free Restaurant Tool',
  '/tools/menu-margin': 'Menu Margin Calculator - Free Restaurant Tool',
  '/tools/multi-location-uplift': 'Multi-Location Uplift Calculator - Free Restaurant Tool',
  '/tools/upsell-opportunity-index': 'Upsell Opportunity Index - Free Restaurant Tool',
  '/tiktok-review': 'Creator Review - Sundae',
};

type PageTitleOverrides = Record<string, Partial<Record<string, string>>>;

/**
 * Resolve the localized <title> for a normalized route path, or null if the
 * route has no central entry (caller then keeps the generic default).
 */
export function resolvePageTitle(path: string, locale: WebsiteLocale): string | null {
  const en = pageTitlesEn[path];
  if (!en) return null;
  if (locale === 'en') return en;
  const overrides = (generatedLocalCopy as { pageTitles?: PageTitleOverrides }).pageTitles;
  return overrides?.[locale]?.[path] ?? en;
}
