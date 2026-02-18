'use client';

// Mobile nav overlay: full-viewport scrim + scroll lock, consistent on all pages
// Refined mobile drawer with accordion sections, slide animation, and sticky CTA bar

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Button } from './ui/Button';
import { DarkModeToggle } from './DarkModeToggle';
import Image from 'next/image';
import { useCta } from '@/lib/cta';
import { PRICING_URL } from '@/lib/links';
import { REPORT_APP_URL } from '@/lib/urls';

// Chevron Icon Component
const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

// Mobile Accordion Section Component
interface AccordionSectionProps {
  title: string;
  id: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const AccordionSection = ({ title, id, isExpanded, onToggle, children }: AccordionSectionProps) => {
  const headerId = `accordion-header-${id}`;
  const contentId = `accordion-content-${id}`;
  
  return (
    <div className="border-b border-slate-200/70 dark:border-slate-800">
      <button
        type="button"
        id={headerId}
        onClick={onToggle}
        className="w-full flex items-center justify-between py-3 px-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
        aria-expanded={isExpanded}
        aria-controls={contentId}
      >
        <span className="text-xs font-semibold tracking-[0.08em] uppercase text-slate-500 dark:text-slate-400">
          {title}
        </span>
        <ChevronIcon isOpen={isExpanded} />
      </button>
      {/* Grid-based expand/collapse for smooth animation without clipping */}
      <div
        id={contentId}
        role="region"
        aria-labelledby={headerId}
        className="grid transition-all duration-200 ease-out"
        style={{
          gridTemplateRows: isExpanded ? '1fr' : '0fr',
        }}
        aria-hidden={!isExpanded}
      >
        <div className="overflow-hidden">
          <div className="pb-2">{children}</div>
        </div>
      </div>
    </div>
  );
};

// Mobile Nav Link Component
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
  isHighlighted?: boolean;
  dataAttributes?: Record<string, string>;
}

const MobileNavLink = ({ href, children, onClick, isHighlighted = false, dataAttributes = {} }: NavLinkProps) => (
  <Link
    href={href}
    onClick={onClick}
    className={`block py-2.5 px-4 text-sm font-medium transition-colors duration-150 ${
      isHighlighted
        ? 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800/60'
        : 'text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/60'
    }`}
    {...dataAttributes}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const cta = useCta();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  
  // Mobile accordion state - Product and Solutions expanded by default
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    product: true,
    solutions: true,
    resources: false,
    company: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open - works globally on all pages
  useEffect(() => {
    if (isMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      const originalPosition = document.body.style.position;
      const originalTop = document.body.style.top;
      const originalWidth = document.body.style.width;
      const scrollY = window.scrollY;
      
      // Calculate scrollbar width to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Lock scroll and preserve position
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
        document.body.style.position = originalPosition;
        document.body.style.top = originalTop;
        document.body.style.width = originalWidth;
        window.scrollTo(0, scrollY);
      };
    }
  }, [isMenuOpen]);

  // Close mobile menu on ESC key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isMenuOpen]);

  // Toggle accordion section
  const toggleSection = useCallback((section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }, []);

  // Close menu and navigate
  const handleMobileNavClick = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Five Intelligence Pillars
  const pillars = [
    { name: 'Pulse', description: 'Intraday operations monitor', href: '/product/pulse' },
    { name: 'Benchmarks', description: 'Competitive intelligence', href: '/benchmarking' },
    { name: 'Watchtower', description: 'External market signals', href: '/product/watchtower' },
    { name: 'Insights', description: 'Specialized analytics modules', href: '/insights' },
    { name: 'Chat with Data', description: 'Conversational analytics', href: '/chat-with-data' },
  ];

  // Product Tiers
  const plans = [
    { name: 'Sundae Report', description: 'Free, historical analysis', href: '/report' },
    { name: 'Sundae Core', description: 'Real-time operations', href: '/core' },
  ];

  // Solutions organized by category
  const solutionsSegments = [
    { name: 'Multi-location Restaurants', href: '/solutions/multi-location-groups' },
    { name: 'Franchises', href: '/solutions/franchises' },
    { name: 'Cloud Kitchens', href: '/solutions/cloud-kitchens' },
    { name: 'Enterprise Hospitality Groups', href: '/solutions/hospitality-operators' },
  ];

  const solutionsRoles = [
    { name: 'Operations Leaders', href: '/solutions/regional-managers' },
    { name: 'Finance & FP&A Teams', href: '/solutions/finance-teams' },
    { name: 'Marketing Teams', href: '/solutions/marketing-teams' },
    { name: 'C-Suite & Owners', href: '/solutions/c-suite-executives' },
    { name: 'Data & Technology Teams', href: '/solutions/technology-teams' },
    { name: 'People & HR Teams', href: '/solutions/hr-teams' },
  ];

  const resources = [
    { name: 'Blog', href: '/blog' },
    { name: 'Documentation', href: '/docs' },
    { name: 'Case Studies', href: '/resources' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Free Tools & Calculators', href: '/tools' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 backdrop-blur-sm border-b ${
      isScrolled 
        ? 'bg-white/95 dark:bg-slate-900/95 border-slate-200/80 dark:border-slate-700 shadow-lg'
        : 'bg-white/80 dark:bg-slate-900/80 border-slate-200/60 dark:border-slate-700/60'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Left Aligned with Animation */}
          <Link href="/" className="flex items-center group">
            <div className="relative">
              <Image
                src="/logos/sundae-wordmark.png"
                alt="Sundae – Decision Intelligence for Restaurants"
                width={160}
                height={46}
                className={`transition-all duration-300 dark:invert dark:hue-rotate-180 ${
                  isLogoHovered ? 'opacity-85' : 'opacity-100'
                }`}
                style={{ height: '46px', width: 'auto' }}
                onMouseEnter={() => setIsLogoHovered(true)}
                onMouseLeave={() => setIsLogoHovered(false)}
                priority
              />
              {/* Subtle shimmer effect on hover */}
              <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-600 ease-out ${
                isLogoHovered ? 'translate-x-full opacity-15' : '-translate-x-full opacity-0'
              }`}></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Products Mega Menu */}
            <div className="relative group">
              <div
                className="text-gray-900 dark:text-white hover:text-deep-blue dark:hover:text-electric-blue transition-colors duration-200 font-medium cursor-pointer text-sm"
                onMouseEnter={() => setActiveDropdown('product')}
              >
                Products
              </div>
              
              {activeDropdown === 'product' && (
                <div
                  className="absolute top-full left-0 mt-2 w-[420px] bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 px-6 py-6 z-50 animate-dropdown-in"
                  onMouseEnter={() => setActiveDropdown('product')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {/* Intelligence Pillars */}
                  <div className="mb-4">
                    <h3 className="eyebrow text-slate-500 dark:text-gray-400 mb-3">
                      Intelligence
                    </h3>
                    <div className="grid grid-cols-2 gap-1">
                      {pillars.map((pillar) => (
                        <Link
                          key={pillar.name}
                          href={pillar.href}
                          className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-200"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className="font-semibold text-gray-900 dark:text-white text-sm leading-snug mb-0.5">
                            {pillar.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 leading-snug">
                            {pillar.description}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="border-t border-gray-200 dark:border-slate-700 my-4"></div>

                  {/* Plans */}
                  <div>
                    <h3 className="eyebrow text-slate-500 dark:text-gray-400 mb-3">
                      Plans
                    </h3>
                    <div className="grid grid-cols-2 gap-1 mb-3">
                      {plans.map((plan) => (
                        <Link
                          key={plan.name}
                          href={plan.href}
                          className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-200"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className="font-semibold text-gray-900 dark:text-white text-sm leading-snug mb-0.5">
                            {plan.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 leading-snug">
                            {plan.description}
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 px-3">
                      <Link
                        href="/report-vs-core"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-electric-blue transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        Compare Plans →
                      </Link>
                      <a
                        href={REPORT_APP_URL}
                        className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        Start Free →
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Solutions Mega Menu */}
            <div className="relative group">
              <div
                className="text-gray-900 dark:text-white hover:text-deep-blue dark:hover:text-electric-blue transition-colors duration-200 font-medium cursor-pointer text-sm"
                onMouseEnter={() => setActiveDropdown('solutions')}
              >
                Solutions
              </div>
              
              {activeDropdown === 'solutions' && (
                <div
                  className="absolute top-full left-0 mt-2 w-[420px] bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 px-6 py-6 z-50 animate-dropdown-in"
                  onMouseEnter={() => setActiveDropdown('solutions')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {/* Segments */}
                  <div className="mb-4">
                    <h3 className="eyebrow text-slate-500 dark:text-gray-400 mb-3">
                      By Segment
                    </h3>
                    <div className="grid grid-cols-2 gap-1">
                      {solutionsSegments.map((solution) => (
                        <Link
                          key={solution.name}
                          href={solution.href}
                          className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-200"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className="font-semibold text-gray-900 dark:text-white text-sm leading-snug">
                            {solution.name}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="border-t border-gray-200 dark:border-slate-700 my-4"></div>

                  {/* Roles */}
                  <div>
                    <h3 className="eyebrow text-slate-500 dark:text-gray-400 mb-3">
                      By Role
                    </h3>
                    <div className="grid grid-cols-2 gap-1">
                      {solutionsRoles.map((solution) => (
                        <Link
                          key={solution.name}
                          href={solution.href}
                          className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-200"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className="font-semibold text-gray-900 dark:text-white text-sm leading-snug">
                            {solution.name}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a href={PRICING_URL} className="text-gray-900 dark:text-white hover:text-deep-blue dark:hover:text-electric-blue transition-colors duration-200 font-medium text-sm">
              Pricing
            </a>
            
            <Link href="/about" className="text-gray-900 dark:text-white hover:text-deep-blue dark:hover:text-electric-blue transition-colors duration-200 font-medium text-sm">
              About
            </Link>
            
            {/* Resources Dropdown */}
            <div className="relative group">
              <div
                className="text-gray-900 dark:text-white hover:text-deep-blue dark:hover:text-electric-blue transition-colors duration-200 font-medium cursor-pointer text-sm"
                onMouseEnter={() => setActiveDropdown('resources')}
              >
                Resources
              </div>
              
              {activeDropdown === 'resources' && (
                <div
                  className="absolute top-full left-0 mt-2 w-[240px] bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 px-6 py-6 z-50 animate-dropdown-in"
                  onMouseEnter={() => setActiveDropdown('resources')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <h3 className="eyebrow text-slate-500 dark:text-gray-400 mb-3">
                    Learn
                  </h3>
                  <div className="space-y-1">
                    {resources.map((resource) => (
                      <Link
                        key={resource.name}
                        href={resource.href}
                        className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-200"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <div className="font-semibold text-gray-900 dark:text-white text-sm leading-snug">
                          {resource.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CTA Buttons & Dark Mode Toggle */}
          <div className="hidden lg:flex items-center space-x-4">
            <DarkModeToggle />
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => cta("/sign-in", "sign_in_navbar", { location: "navbar" })}
              data-cta="sign_in_navbar"
              data-source="navbar"
            >
              Sign In
            </Button>
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => cta("/demo", "book_demo_navbar", { location: "navbar" })}
              data-cta="book_demo_navbar"
              data-source="navbar"
            >
              Book Demo
            </Button>
          </div>

          {/* Mobile: Dark Mode Toggle + Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <DarkModeToggle />
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 relative z-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Full-Screen Drawer */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-modal="true"
        role="dialog"
        aria-label="Mobile navigation"
      >
        {/* Backdrop Overlay */}
        <button
          type="button"
          className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close navigation"
          tabIndex={isMenuOpen ? 0 : -1}
        />

        {/* Slide-in Drawer Panel */}
        <nav
          id="mobile-menu"
          className={`absolute inset-y-0 right-0 w-full max-w-sm h-screen bg-white dark:bg-slate-900 shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer Header with Close Button */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-slate-200/70 dark:border-slate-800 flex-shrink-0">
            <Image
              src="/logos/sundae-wordmark.png"
              alt="Sundae"
              width={130}
              height={38}
              className="dark:invert dark:hue-rotate-180"
              style={{ height: '36px', width: 'auto' }}
            />
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label="Close navigation"
            >
              <svg
                className="w-6 h-6 text-slate-600 dark:text-slate-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Scrollable Menu Content - iOS momentum scrolling */}
          <div 
            className="flex-1 overflow-y-auto overscroll-contain"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {/* Products Section */}
            <AccordionSection
              title="Products"
              id="product"
              isExpanded={expandedSections.product}
              onToggle={() => toggleSection('product')}
            >
              <div className="px-4 pt-1 pb-1">
                <span className="eyebrow text-slate-400">Intelligence</span>
              </div>
              {pillars.map((pillar) => (
                <MobileNavLink
                  key={pillar.name}
                  href={pillar.href}
                  onClick={handleMobileNavClick}
                >
                  {pillar.name}
                </MobileNavLink>
              ))}
              <div className="border-t border-slate-200 dark:border-slate-800 my-2 mx-4"></div>
              <div className="px-4 pt-1 pb-1">
                <span className="eyebrow text-slate-400">Plans</span>
              </div>
              {plans.map((plan) => (
                <MobileNavLink
                  key={plan.name}
                  href={plan.href}
                  onClick={handleMobileNavClick}
                >
                  {plan.name}
                </MobileNavLink>
              ))}
              <MobileNavLink
                href="/report-vs-core"
                onClick={handleMobileNavClick}
              >
                Compare Plans →
              </MobileNavLink>
              <a
                href={REPORT_APP_URL}
                onClick={handleMobileNavClick}
                className="block py-2.5 px-4 text-sm font-medium transition-colors duration-150 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800/60"
              >
                Start Free →
              </a>
            </AccordionSection>

            {/* Solutions Section */}
            <AccordionSection
              title="Solutions"
              id="solutions"
              isExpanded={expandedSections.solutions}
              onToggle={() => toggleSection('solutions')}
            >
              <div className="px-4 pt-1 pb-1">
                <span className="eyebrow text-slate-400">By Segment</span>
              </div>
              {solutionsSegments.map((solution) => (
                <MobileNavLink
                  key={solution.name}
                  href={solution.href}
                  onClick={handleMobileNavClick}
                >
                  {solution.name}
                </MobileNavLink>
              ))}
              <div className="border-t border-slate-200 dark:border-slate-800 my-2 mx-4"></div>
              <div className="px-4 pt-1 pb-1">
                <span className="eyebrow text-slate-400">By Role</span>
              </div>
              {solutionsRoles.map((solution) => (
                <MobileNavLink
                  key={solution.name}
                  href={solution.href}
                  onClick={handleMobileNavClick}
                >
                  {solution.name}
                </MobileNavLink>
              ))}
            </AccordionSection>

            {/* Resources Section */}
            <AccordionSection
              title="Resources"
              id="resources"
              isExpanded={expandedSections.resources}
              onToggle={() => toggleSection('resources')}
            >
              {resources.map((resource) => (
                <MobileNavLink
                  key={resource.name}
                  href={resource.href}
                  onClick={handleMobileNavClick}
                >
                  {resource.name}
                </MobileNavLink>
              ))}
            </AccordionSection>

            {/* Company Section */}
            <AccordionSection
              title="Company"
              id="company"
              isExpanded={expandedSections.company}
              onToggle={() => toggleSection('company')}
            >
              <a 
                href={PRICING_URL} 
                className="block py-2.5 px-4 text-sm font-medium transition-colors duration-150 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/60"
              >
                Pricing
              </a>
              <MobileNavLink href="/about" onClick={handleMobileNavClick}>
                About
              </MobileNavLink>
            </AccordionSection>
          </div>

          {/* Sticky Bottom CTA Bar */}
          <div className="flex-shrink-0 sticky bottom-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur border-t border-slate-200/70 dark:border-slate-800 px-4 py-3">
            <div className="flex gap-3">
              <Link
                href="/sign-in"
                onClick={handleMobileNavClick}
                className="flex-1 py-2.5 px-4 text-center text-sm font-medium border border-slate-300 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                data-cta="sign_in_mobile_nav"
                data-source="mobile-nav"
              >
                Sign In
              </Link>
              <Button
                variant="primary"
                size="sm"
                className="flex-1"
                onClick={() => {
                  cta("/demo", "book_demo_mobile_nav", { location: "mobile-nav" });
                  setIsMenuOpen(false);
                }}
                data-cta="book_demo_mobile_nav"
                data-source="mobile-nav"
              >
                Book a Demo
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
