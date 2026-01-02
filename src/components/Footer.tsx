'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCta } from '@/lib/cta';
import { PRICING_URL } from '@/lib/links';

const Footer = () => {
  const cta = useCta();
  const currentYear = new Date().getFullYear();
  
  const productLinks = [
    { name: 'Sundae Report', href: '/report', description: 'Historical analysis & benchmarking' },
    { name: 'Sundae Core', href: '/core', description: 'Real-time operations & predictions' },
    { name: 'Watchtower', href: '/product/watchtower', description: 'Market intelligence' },
    { name: 'Modules', href: '/modules', description: 'Specialized add-ons' },
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
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
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
            <button
              onClick={() => cta("/demo", "book_demo_footer", { location: "footer" })}
              className="btn-primary"
              data-cta="book_demo_footer"
              data-source="footer"
            >
              Book a Demo
            </button>
            <Link
              href="/report"
              className="btn-tertiary !border-white/30 !text-white hover:!bg-white/10"
            >
              Start Free with Report
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10">
          {/* Brand Section - spans 2 columns on mobile */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="inline-block mb-4" aria-label="Sundae - Return to homepage">
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
            <div className="text-muted-grey text-xs space-y-1 mb-6">
              <p>🌍 Available globally</p>
              <p>💳 All currencies supported</p>
              <p>🗣️ English (more languages coming soon)</p>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a 
                href="https://x.com/sundae_io" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-grey hover:text-electric-blue transition-colors p-2 -m-2"
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
                className="text-muted-grey hover:text-electric-blue transition-colors p-2 -m-2"
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
            <h3 className="font-semibold text-white text-sm tracking-wide uppercase mb-4">
              Products
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-muted-grey hover:text-electric-blue transition-colors text-sm block py-0.5"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <a 
                  href={PRICING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-grey hover:text-electric-blue transition-colors text-sm block py-0.5"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Solutions Column */}
          <div>
            <h3 className="font-semibold text-white text-sm tracking-wide uppercase mb-4">
              Solutions
            </h3>
            <ul className="space-y-3">
              {solutionsBySegment.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-muted-grey hover:text-electric-blue transition-colors text-sm block py-0.5"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Roles sub-section */}
            <h4 className="font-semibold text-white/70 text-xs tracking-wide uppercase mt-6 mb-3">
              By Role
            </h4>
            <ul className="space-y-2">
              {solutionsByRole.slice(0, 4).map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-muted-grey hover:text-electric-blue transition-colors text-sm block py-0.5"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-semibold text-white text-sm tracking-wide uppercase mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  {link.tracked ? (
                    <button
                      onClick={() => cta(link.href, "view_tools_footer", { location: "footer" })}
                      className="text-muted-grey hover:text-electric-blue transition-colors text-sm block py-0.5 bg-transparent border-none cursor-pointer p-0 text-left"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <Link 
                      href={link.href} 
                      className="text-muted-grey hover:text-electric-blue transition-colors text-sm block py-0.5"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-white text-sm tracking-wide uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-muted-grey hover:text-electric-blue transition-colors text-sm block py-0.5"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Legal sub-section */}
            <h4 className="font-semibold text-white/70 text-xs tracking-wide uppercase mt-6 mb-3">
              Legal
            </h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-muted-grey hover:text-electric-blue transition-colors text-sm block py-0.5"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-divider-grey/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-grey text-sm text-center md:text-left">
              © {currentYear} Sundae. All rights reserved.
            </p>
            <p className="text-muted-grey/60 text-xs text-center md:text-right">
              Built for restaurant operators, by people who understand the business.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
