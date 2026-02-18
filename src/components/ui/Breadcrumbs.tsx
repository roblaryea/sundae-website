'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE_URL } from '@/lib/urls';

const LABEL_MAP: Record<string, string> = {
  product: 'Products',
  solutions: 'Solutions',
  report: 'Sundae Report',
  core: 'Sundae Core',
  watchtower: 'Watchtower',
  blog: 'Blog',
  company: 'Company',
  about: 'About',
  pricing: 'Pricing',
  security: 'Security',
  integrations: 'Integrations',
  contact: 'Contact',
  faq: 'FAQ',
  'technology-teams': 'Technology Teams',
  'hr-teams': 'HR Teams',
  'operations-leaders': 'Operations Leaders',
  'finance-teams': 'Finance Teams',
  'franchise-operators': 'Franchise Operators',
  'independent-operators': 'Independent Operators',
  architecture: 'Architecture',
  scout: 'Scout',
  pulse: 'Pulse',
  forge: 'Forge',
  canvas: 'Canvas',
};

function formatSegment(segment: string): string {
  return LABEL_MAP[segment] || segment
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function Breadcrumbs({ className = '' }: { className?: string }) {
  const pathname = usePathname();

  // Don't render on homepage
  if (pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);
  const crumbs = segments.map((seg, i) => ({
    label: formatSegment(seg),
    href: '/' + segments.slice(0, i + 1).join('/'),
  }));

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      ...crumbs.map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: crumb.label,
        item: `${SITE_URL}${crumb.href}`,
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className={`text-sm ${className}`}>
        <ol className="flex items-center gap-1.5 flex-wrap">
          <li>
            <Link
              href="/"
              className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Home
            </Link>
          </li>
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-1.5">
                <span className="text-gray-400 dark:text-gray-500" aria-hidden="true">/</span>
                {isLast ? (
                  <span className="text-gray-900 dark:text-white font-medium" aria-current="page">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
