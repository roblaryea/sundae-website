'use client';

// Mobile nav overlay: full-viewport scrim + scroll lock, consistent on all pages
// Refined mobile drawer with accordion sections, slide animation, and sticky CTA bar

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Button } from './ui/Button';
import Image from 'next/image';
import { useCta } from '@/lib/cta';
import { PRICING_URL } from '@/lib/links';
import { REPORT_APP_URL, SIGNUP_URL } from '@/lib/urls';
import { ThemeToggle } from './ui/ThemeToggle';
import { useWebsiteI18n } from './i18n/LocaleProvider';
import { LocaleSwitcher } from './i18n/LocaleSwitcher';

type NavbarLink = {
  name: string;
  href: string;
  description?: string;
};

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
    <div className="border-b border-[var(--border-default)]">
      <button
        type="button"
        id={headerId}
        onClick={onToggle}
        className="w-full flex items-center justify-between py-3 px-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
        aria-expanded={isExpanded}
        aria-controls={contentId}
      >
        <span className="text-xs font-semibold tracking-[0.08em] uppercase text-[var(--text-muted)]">
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
        ? 'text-[#60A5FA] hover:bg-[var(--surface-hover)]'
        : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]'
    }`}
    {...dataAttributes}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const { messages } = useWebsiteI18n();
  const nav = messages.navbar;
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

  // Six Intelligence Layers
  const pillars: ReadonlyArray<NavbarLink> = nav.pillars;

  // Product Tiers
  const plans: ReadonlyArray<NavbarLink> = nav.plansList;

  // Solutions organized by category
  const solutionsSegments: ReadonlyArray<NavbarLink> = nav.solutionsSegments;

  const solutionsRoles: ReadonlyArray<NavbarLink> = nav.solutionsRoles;

  const resources: ReadonlyArray<NavbarLink> = nav.resourcesList;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 backdrop-blur-md border-b ${
      isScrolled
        ? 'bg-[var(--navy-deep)]/90 border-[var(--border-default)] shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
        : 'bg-[var(--navy-deep)]/70 border-[var(--border-default)]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Left Aligned with Animation */}
          <Link href="/" className="flex items-center group">
            <div className="relative">
              <Image
                src="/logos/sundae-wordmark-white.svg"
                alt="Sundae – Decision Intelligence for Restaurants"
                width={160}
                height={46}
                className={`transition-all duration-300 ${
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
            <div className="relative group" onMouseLeave={() => setActiveDropdown(null)}>
              <button
                type="button"
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 font-medium cursor-pointer text-sm bg-transparent border-none p-0"
                onMouseEnter={() => setActiveDropdown('product')}
                onClick={() => setActiveDropdown(activeDropdown === 'product' ? null : 'product')}
                aria-haspopup="true"
                aria-expanded={activeDropdown === 'product'}
              >
                {nav.products}
              </button>

              {activeDropdown === 'product' && (
                <div
                  className="absolute top-full left-0 pt-2 w-[420px] z-50"
                  onMouseEnter={() => setActiveDropdown('product')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                <div className="bg-[var(--navy)]/95 backdrop-blur-xl rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.4)] border border-[var(--border-default)] px-6 py-6 animate-dropdown-in">
                  {/* Intelligence Pillars */}
                  <div className="mb-4">
                    <h3 className="eyebrow text-[var(--text-muted)] mb-3">
                      {nav.intelligence}
                    </h3>
                    <div className="grid grid-cols-2 gap-1">
                      {pillars.map((pillar) => (
                        <Link
                          key={pillar.name}
                          href={pillar.href}
                          className="block p-3 rounded-lg hover:bg-[var(--surface-hover)] transition-colors duration-200"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className="font-semibold text-[var(--text-primary)] text-sm leading-snug mb-0.5">
                            {pillar.name}
                          </div>
                          <div className="text-xs text-[var(--text-muted)] leading-snug">
                            {pillar.description}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="border-t border-[var(--border-default)] my-4"></div>

                  {/* Plans */}
                  <div>
                    <h3 className="eyebrow text-[var(--text-muted)] mb-3">
                      {nav.plans}
                    </h3>
                    <div className="grid grid-cols-2 gap-1 mb-3">
                      {plans.map((plan) => (
                        <Link
                          key={plan.name}
                          href={plan.href}
                          className="block p-3 rounded-lg hover:bg-[var(--surface-hover)] transition-colors duration-200"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className="font-semibold text-[var(--text-primary)] text-sm leading-snug mb-0.5">
                            {plan.name}
                          </div>
                          <div className="text-xs text-[var(--text-muted)] leading-snug">
                            {plan.description}
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 px-3">
                      <Link
                        href="/report-vs-core"
                        className="text-sm font-medium text-[var(--text-supporting)] hover:text-[var(--text-primary)] transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {nav.comparePlans}
                      </Link>
                      <a
                        href={REPORT_APP_URL}
                        className="text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {nav.startFree}
                      </a>
                    </div>
                  </div>
                </div>
                </div>
              )}
            </div>

            {/* Solutions Mega Menu */}
            <div className="relative group" onMouseLeave={() => setActiveDropdown(null)}>
              <button
                type="button"
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 font-medium cursor-pointer text-sm bg-transparent border-none p-0"
                onMouseEnter={() => setActiveDropdown('solutions')}
                onClick={() => setActiveDropdown(activeDropdown === 'solutions' ? null : 'solutions')}
                aria-haspopup="true"
                aria-expanded={activeDropdown === 'solutions'}
              >
                {nav.solutions}
              </button>
              
              {activeDropdown === 'solutions' && (
                <div
                  className="absolute top-full left-0 pt-2 w-[420px] z-50"
                  onMouseEnter={() => setActiveDropdown('solutions')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                <div className="bg-[var(--navy)]/95 backdrop-blur-xl rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.4)] border border-[var(--border-default)] px-6 py-6 animate-dropdown-in">
                  {/* Segments */}
                  <div className="mb-4">
                    <h3 className="eyebrow text-[var(--text-muted)] mb-3">
                      {nav.bySegment}
                    </h3>
                    <div className="grid grid-cols-2 gap-1">
                      {solutionsSegments.map((solution) => (
                        <Link
                          key={solution.name}
                          href={solution.href}
                          className="block p-3 rounded-lg hover:bg-[var(--surface-hover)] transition-colors duration-200"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className="font-semibold text-[var(--text-primary)] text-sm leading-snug">
                            {solution.name}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="border-t border-[var(--border-default)] my-4"></div>

                  {/* Roles */}
                  <div>
                    <h3 className="eyebrow text-[var(--text-muted)] mb-3">
                      {nav.byRole}
                    </h3>
                    <div className="grid grid-cols-2 gap-1">
                      {solutionsRoles.map((solution) => (
                        <Link
                          key={solution.name}
                          href={solution.href}
                          className="block p-3 rounded-lg hover:bg-[var(--surface-hover)] transition-colors duration-200"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className="font-semibold text-[var(--text-primary)] text-sm leading-snug">
                            {solution.name}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                </div>
              )}
            </div>

            <a href={PRICING_URL} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 font-medium text-sm">
              {nav.pricing}
            </a>

            <Link href="/about" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 font-medium text-sm">
              {nav.about}
            </Link>
            
            {/* Resources Dropdown */}
            <div className="relative group" onMouseLeave={() => setActiveDropdown(null)}>
              <button
                type="button"
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 font-medium cursor-pointer text-sm bg-transparent border-none p-0"
                onMouseEnter={() => setActiveDropdown('resources')}
                onClick={() => setActiveDropdown(activeDropdown === 'resources' ? null : 'resources')}
                aria-haspopup="true"
                aria-expanded={activeDropdown === 'resources'}
              >
                {nav.resources}
              </button>
              
              {activeDropdown === 'resources' && (
                <div
                  className="absolute top-full left-0 pt-2 w-[240px] z-50"
                  onMouseEnter={() => setActiveDropdown('resources')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                <div className="bg-[var(--navy)]/95 backdrop-blur-xl rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.4)] border border-[var(--border-default)] px-6 py-6 animate-dropdown-in">
                  <h3 className="eyebrow text-[var(--text-muted)] mb-3">
                    {nav.learn}
                  </h3>
                  <div className="space-y-1">
                    {resources.map((resource) => (
                      <Link
                        key={resource.name}
                        href={resource.href}
                        className="block p-3 rounded-lg hover:bg-[var(--surface-hover)] transition-colors duration-200"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <div className="font-semibold text-[var(--text-primary)] text-sm leading-snug">
                          {resource.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                </div>
              )}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <LocaleSwitcher />
            <ThemeToggle />
            <Button
              variant="outline"
              size="sm"
              onClick={() => cta("/sign-in", "sign_in_navbar", { location: "navbar" })}
              data-cta="sign_in_navbar"
              data-source="navbar"
            >
              {nav.signIn}
            </Button>
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => cta("/demo", "book_demo_navbar", { location: "navbar" })}
              data-cta="book_demo_navbar"
              data-source="navbar"
            >
              {nav.bookDemo}
            </Button>
          </div>

          {/* Mobile: Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-[var(--text-primary)] hover:bg-[var(--surface-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 relative z-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? nav.closeMenu : nav.openMenu}
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
        aria-label={nav.mobileNavigation}
      >
        {/* Backdrop Overlay */}
        <button
          type="button"
          className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMenuOpen(false)}
          aria-label={nav.closeNavigation}
          tabIndex={isMenuOpen ? 0 : -1}
        />

        {/* Slide-in Drawer Panel */}
        <nav
          id="mobile-menu"
          className={`absolute inset-y-0 right-0 w-full max-w-sm h-screen bg-[var(--navy)] shadow-[0_0_60px_rgba(0,0,0,0.5)] flex flex-col transform transition-transform duration-300 ease-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer Header with Close Button */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-[var(--border-default)] flex-shrink-0">
            <Image
              src="/logos/sundae-wordmark-white.svg"
              alt="Sundae"
              width={130}
              height={38}
              style={{ height: '36px', width: 'auto' }}
            />
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-[var(--surface-hover)] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label={nav.closeNavigation}
            >
              <svg
                className="w-6 h-6 text-[var(--text-supporting)]"
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
              title={nav.products}
              id="product"
              isExpanded={expandedSections.product}
              onToggle={() => toggleSection('product')}
            >
              <div className="px-4 pt-1 pb-1">
                <span className="eyebrow text-[var(--text-muted)]">{nav.intelligence}</span>
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
              <div className="border-t border-[var(--border-default)] my-2 mx-4"></div>
              <div className="px-4 pt-1 pb-1">
                <span className="eyebrow text-[var(--text-muted)]">{nav.plans}</span>
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
                {nav.comparePlans}
              </MobileNavLink>
              <a
                href={SIGNUP_URL}
                onClick={handleMobileNavClick}
                className="block py-2.5 px-4 text-sm font-medium transition-colors duration-150 text-[#60A5FA] hover:bg-[var(--surface-hover)]"
              >
                {nav.startFree}
              </a>
            </AccordionSection>

            {/* Solutions Section */}
            <AccordionSection
              title={nav.solutions}
              id="solutions"
              isExpanded={expandedSections.solutions}
              onToggle={() => toggleSection('solutions')}
            >
              <div className="px-4 pt-1 pb-1">
                <span className="eyebrow text-[var(--text-muted)]">{nav.bySegment}</span>
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
              <div className="border-t border-[var(--border-default)] my-2 mx-4"></div>
              <div className="px-4 pt-1 pb-1">
                <span className="eyebrow text-[var(--text-muted)]">{nav.byRole}</span>
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
              title={nav.resources}
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
              title={nav.company}
              id="company"
              isExpanded={expandedSections.company}
              onToggle={() => toggleSection('company')}
            >
              <a 
                href={PRICING_URL} 
                className="block py-2.5 px-4 text-sm font-medium transition-colors duration-150 text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
              >
                {nav.pricing}
              </a>
              <MobileNavLink href="/about" onClick={handleMobileNavClick}>
                {nav.about}
              </MobileNavLink>
            </AccordionSection>
          </div>

          {/* Sticky Bottom CTA Bar */}
          <div className="flex-shrink-0 sticky bottom-0 bg-[var(--navy)]/90 backdrop-blur border-t border-[var(--border-default)] px-4 py-3">
            <div className="flex items-center gap-3">
              <LocaleSwitcher />
              <ThemeToggle />
              <div className="flex flex-1 gap-3">
              <Link
                href="/sign-in"
                onClick={handleMobileNavClick}
                className="flex-1 py-2.5 px-4 text-center text-sm font-medium border border-[var(--border-emphasis)] rounded-lg text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] transition-colors"
                data-cta="sign_in_mobile_nav"
                data-source="mobile-nav"
              >
                {nav.signIn}
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
                {nav.bookDemo}
              </Button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
