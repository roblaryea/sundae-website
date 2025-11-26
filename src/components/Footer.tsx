import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/Button';

const Footer = () => {
  const productLinks = [
    { name: 'Sundae Report', href: '/report' },
    { name: 'Sundae Nexus', href: '/nexus' },
    { name: 'Sundae Insights', href: '/insights' },
    { name: 'Sundae Canvas', href: '/canvas' },
  ];

  const architectureLinks = [
    { name: 'Scout', href: '/product/scout' },
    { name: 'Pulse', href: '/product/pulse' },
    { name: 'Forge', href: '/product/forge' },
    { name: 'Canvas Engine', href: '/product/canvas' },
    { name: 'Watchtower', href: '/product/watchtower' },
  ];

  const solutionLinks = [
    { name: 'Multi-location Restaurants', href: '/solutions/multi-location-groups' },
    { name: 'Franchises', href: '/solutions/franchises' },
    { name: 'Cloud Kitchens', href: '/solutions/cloud-kitchens' },
    { name: 'Enterprise Hospitality Groups', href: '/solutions/hospitality-operators' },
    { name: 'Operations Leaders', href: '/solutions/regional-managers' },
    { name: 'Finance & FP&A', href: '/solutions/finance-teams' },
    { name: 'Marketing Teams', href: '/solutions/marketing-teams' },
    { name: 'C-Suite & Owners', href: '/solutions/c-suite-executives' },
    { name: 'Data & Technology Teams', href: '/solutions/technology-teams' },
    { name: 'People & HR Teams', href: '/solutions/hr-teams' },
  ];

  const companyLinks = [
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Contact', href: '/contact' },
    { name: 'Demo', href: '/demo' },
  ];

  const learnLinks = [
    { name: 'Blog', href: '/blog' },
    { name: 'Documentation', href: '/docs' },
    { name: 'API Reference', href: '/api' },
    { name: 'Benchmarking', href: '/benchmarking' },
    { name: 'Case Studies', href: '/resources' },
  ];

  return (
    <footer className="bg-graphite-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logos/sundae-wordmark.png"
                alt="Sundae"
                width={120}
                height={28}
                className="brightness-0 invert"
              />
            </Link>
            <p className="text-muted-grey mb-6 max-w-md text-[15px] leading-relaxed">
              The AI-powered decision intelligence platform for restaurants, unifying every operational, 
              workforce, and market data source into a single intelligence layer.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-grey hover:text-electric-blue transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-muted-grey hover:text-electric-blue transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-bold mb-4 text-white text-[15px] tracking-[0.4px]">Product</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-grey hover:text-[#0A1E8C] transition-colors text-[14px] leading-[1.5]">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Architecture Links */}
          <div>
            <h3 className="font-bold mb-4 text-white text-[15px] tracking-[0.4px]">Architecture</h3>
            <ul className="space-y-3">
              {architectureLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-grey hover:text-[#0A1E8C] transition-colors text-[14px] leading-[1.5]">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold mb-4 text-white text-[15px] tracking-[0.4px]">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-grey hover:text-[#0A1E8C] transition-colors text-[14px] leading-[1.5]">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions Links */}
          <div>
            <h3 className="font-bold mb-4 text-white text-[15px] tracking-[0.4px]">Solutions</h3>
            <ul className="space-y-3">
              {solutionLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-grey hover:text-[#0A1E8C] transition-colors text-[14px] leading-[1.5]">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn Links */}
          <div>
            <h3 className="font-bold mb-4 text-white text-[15px] tracking-[0.4px]">Learn</h3>
            <ul className="space-y-3">
              {learnLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-grey hover:text-[#0A1E8C] transition-colors text-[14px] leading-[1.5]">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-divider-grey mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-grey text-[14px]">
            © 2024 Sundae. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-muted-grey hover:text-[#0A1E8C] text-[14px] transition-colors leading-[1.5]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-grey hover:text-[#0A1E8C] text-[14px] transition-colors leading-[1.5]">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
