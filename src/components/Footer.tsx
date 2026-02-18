'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/Button';
import { useCta } from '@/lib/cta';
import { PRICING_URL } from '@/lib/links';
import { REPORT_APP_URL } from '@/lib/urls';

// SVG Icons for footer info
const GlobeIcon = () => (
  <svg className="w-4 h-4 text-muted-grey flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>
);

const CurrencyIcon = () => (
  <svg className="w-4 h-4 text-muted-grey flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
  </svg>
);

const LanguageIcon = () => (
  <svg className="w-4 h-4 text-muted-grey flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
  </svg>
);

const Footer = () => {
  const cta = useCta();
  const currentYear = new Date().getFullYear();
  
  const pillarLinks = [
    { name: 'Pulse', href: '/product/pulse' },
    { name: 'Benchmarks', href: '/benchmarking' },
    { name: 'Watchtower', href: '/product/watchtower' },
    { name: 'Insights', href: '/insights' },
    { name: 'Chat with Data', href: '/chat-with-data' },
  ];

  const planLinks = [
    { name: 'Sundae Report', href: '/report' },
    { name: 'Sundae Core', href: '/core' },
    { name: 'Compare Plans', href: '/report-vs-core' },
  ];

  const solutionsBySegment = [
    { name: 'Multi-location Restaurants', href: '/solutions/multi-location-groups' },
    { name: 'Franchises', href: '/solutions/franchises' },
    { name: 'Cloud Kitchens', href: '/solutions/cloud-kitchens' },
    { name: 'Hospitality Groups', href: '/solutions/hospitality-operators' },
  ];

  const solutionsByRole = [
    { name: 'Operations Leaders', href: '/solutions/regional-managers' },
    { name: 'Finance & FP&A', href: '/solutions/finance-teams' },
    { name: 'Marketing Teams', href: '/solutions/marketing-teams' },
    { name: 'C-Suite & Owners', href: '/solutions/c-suite-executives' },
    { name: 'Data & Technology', href: '/solutions/technology-teams' },
    { name: 'People & HR', href: '/solutions/hr-teams' },
  ];

  const resourceLinks = [
    { name: 'Blog', href: '/blog' },
    { name: 'Documentation', href: '/docs' },
    { name: 'Case Studies', href: '/resources' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Free Tools', href: '/tools', tracked: true },
    { name: 'Getting Started', href: '/getting-started' },
  ];

  const companyLinks = [
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
    { name: 'Security', href: '/security' },
    { name: 'Integrations', href: '/integrations' },
  ];


  return (
    <footer className="bg-graphite-black text-white" role="contentinfo">
      {/* Pre-footer CTA Section */}
      <div className="border-b border-divider-grey/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to transform your restaurant operations?
          </h2>
          <p className="text-muted-grey mb-6 max-w-2xl mx-auto text-base">
            Join operators who have moved from guessing to knowing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => cta("/demo", "book_demo_footer", { location: "footer" })}
            >
              Book a Demo
            </Button>
            <Button
              variant="outline-light"
              size="lg"
              href={REPORT_APP_URL}
            >
              Start Free with Report
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link href="/" className="inline-block mb-3" aria-label="Sundae - Return to homepage">
              <Image
                src="/logos/sundae-wordmark.png"
                alt="Sundae"
                width={120}
                height={28}
                className="brightness-0 invert"
              />
            </Link>
            <p className="text-muted-grey mb-4 max-w-xs text-sm leading-relaxed">
              Decision intelligence for restaurants. Understand performance, predict what&apos;s next, and act with confidence.
            </p>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1.5 text-muted-grey text-xs">
                <GlobeIcon />
                <span>Global</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-grey text-xs">
                <CurrencyIcon />
                <span>All currencies</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-grey text-xs">
                <LanguageIcon />
                <span>English</span>
              </div>
            </div>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://x.com/sundae_io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-grey hover:text-electric-blue transition-colors"
                aria-label="Follow Sundae on X (formerly Twitter)"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/managewithsundae"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-grey hover:text-electric-blue transition-colors"
                aria-label="Follow Sundae on LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h3 className="eyebrow text-white/60 mb-3">Product</h3>
            <ul className="space-y-2">
              {pillarLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-grey hover:text-electric-blue transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-white/10 my-3"></div>
            <ul className="space-y-2">
              {planLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-grey hover:text-electric-blue transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <a href={PRICING_URL} target="_blank" rel="noopener noreferrer" className="text-muted-grey hover:text-electric-blue transition-colors text-sm">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Solutions Column — compact 2-col grid on larger screens */}
          <div>
            <h3 className="eyebrow text-white/60 mb-3">Solutions</h3>
            <ul className="space-y-2">
              {solutionsBySegment.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-grey hover:text-electric-blue transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-white/10 my-3"></div>
            <ul className="space-y-2">
              {solutionsByRole.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-grey hover:text-electric-blue transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & Company — merged column */}
          <div>
            <h3 className="eyebrow text-white/60 mb-3">Resources</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  {link.tracked ? (
                    <button
                      onClick={() => cta(link.href, "view_tools_footer", { location: "footer" })}
                      className="text-muted-grey hover:text-electric-blue transition-colors text-sm bg-transparent border-none cursor-pointer p-0 text-left"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <Link href={link.href} className="text-muted-grey hover:text-electric-blue transition-colors text-sm">
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="border-t border-white/10 my-3"></div>
            <h3 className="eyebrow text-white/60 mb-3">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-grey hover:text-electric-blue transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-divider-grey/20 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-muted-grey text-sm text-center md:text-left">
              © {currentYear} Sundae. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs">
              <Link href="/privacy" className="text-muted-grey/60 hover:text-electric-blue transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-muted-grey/60 hover:text-electric-blue transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
