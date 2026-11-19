'use client';

import videoCopy from '@/content/product-walkthroughs.json';

// Mobile nav overlay: full-viewport scrim + scroll lock, consistent on all pages
// Refined mobile drawer with accordion sections, slide animation, and sticky CTA bar

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { Button } from './ui/Button';
import { SundaeLogotype } from './ui/SundaeLogotype';
import { useCta, trackCta } from '@/lib/cta';
import { PRICING_URL } from '@/lib/links';
import { appendCampaign } from '@/lib/campaign';
import { ThemeToggle } from './ui/ThemeToggle';
import { useWebsiteI18n } from './i18n/LocaleProvider';
import { LocaleSwitcher } from './i18n/LocaleSwitcher';
import { localizeWebsiteHref } from '@/lib/i18n';
import { crewNavLocales } from '@/lib/crewNavLocales';
import storyCopy from '@/content/platform-story.json';
import closerCopy from '@/content/positioning-closer.json';
import proofCopy from '@/content/workflow-proof.json';
import { getCoreNavigation } from '@/lib/coreNavigation';
import { operatorNavigationCopy } from '@/content/operator-workflows/navigation';

type NavbarLink = {
  name: string;
  href: string;
  description?: string;
};

const dropdownLinkClass =
  'block min-w-0 rounded-lg p-3 transition-colors duration-200 hover:bg-[var(--surface-hover)]';

const dropdownTitleClass =
  'font-semibold text-[var(--text-primary)] text-sm leading-snug break-words hyphens-auto';

const dropdownDescriptionClass =
  'mt-0.5 text-xs text-[var(--text-muted)] leading-snug break-words hyphens-auto';

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
        className="w-full flex items-center justify-between py-3 px-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FF5C4D]"
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
        inert={!isExpanded}
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
        ? 'text-[#FF8473] hover:bg-[var(--surface-hover)]'
        : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]'
    }`}
    {...dataAttributes}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const { locale, messages } = useWebsiteI18n();
  const nav = messages.navbar;
  // Crew + Core nav labels come from a per-locale source (the i18n.ts navbar
  // blocks predate these fields), so every locale gets them translated.
  const cn = crewNavLocales[locale as keyof typeof crewNavLocales] ?? crewNavLocales.en;
  const workflow = operatorNavigationCopy[locale as keyof typeof operatorNavigationCopy].links;
  const story = storyCopy[locale as keyof typeof storyCopy];
  const cta = useCta();
  // Wordmark is CSS theme-swapped in the markup below (driven by the .light class,
  // which is set before hydration) - no JS state, so no flash and no stale-src caching.
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileDialogRef = useRef<HTMLDivElement>(null);
  const mobileCloseRef = useRef<HTMLButtonElement>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  
  // Product overview starts open; capability and other groups are deliberate choices.
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    product: true,
    solutions: false,
    resources: false,
    core: false,
    crew: false,
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
      // Flag the open drawer so lower-stacked fixed UI (e.g. the cookie banner,
      // which sits above the drawer) hides while the full-screen menu is open.
      document.body.classList.add('mobile-menu-open');

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
        document.body.style.position = originalPosition;
        document.body.style.top = originalTop;
        document.body.style.width = originalWidth;
        document.body.classList.remove('mobile-menu-open');
        window.scrollTo(0, scrollY);
      };
    }
  }, [isMenuOpen]);

  // Keep keyboard focus in the modal and return it to the opener on close.
  useEffect(() => {
    if (!isMenuOpen) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const frame = requestAnimationFrame(() => mobileCloseRef.current?.focus({ preventScroll: true }));
    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const dialog = mobileDialogRef.current;
      if (!dialog) return;
      const controls = Array.from(dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'))
        .filter(el => el.tabIndex >= 0 && el.getClientRects().length > 0 && !el.closest('[inert], [aria-hidden="true"]'));
      const first = controls[0];
      const last = controls.at(-1);
      const outside = !dialog.contains(document.activeElement);
      if (first && ((!event.shiftKey && (document.activeElement === last || outside)) || (event.shiftKey && (document.activeElement === first || outside)))) {
        event.preventDefault();
        (event.shiftKey ? last : first)?.focus({ preventScroll: true });
      }
    };
    const desktop = window.matchMedia('(min-width: 1280px)');
    const closeOnDesktop = () => { if (desktop.matches) setIsMenuOpen(false); };
    document.addEventListener('keydown', handleTab, true);
    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('keydown', handleTab, true);
      desktop.removeEventListener('change', closeOnDesktop);
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [isMenuOpen]);

  // Close mobile menu on ESC key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isMenuOpen) setIsMenuOpen(false);
        if (activeDropdown) setActiveDropdown(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [activeDropdown, isMenuOpen]);

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
  const pillars: ReadonlyArray<NavbarLink> = getCoreNavigation(nav.pillars, locale);

  // Sundae Crew operational modules (Product → Sundae Crew group)
  const crewLinks: ReadonlyArray<NavbarLink> = cn.crewList.map(link =>
    link.href === '/crew/payroll' ? { ...link, description: undefined } : link,
  );
  const workflowLinks = [
    { name: workflow.tasks, href: '/restaurant-task-management' },
    { name: workflow.logbook, href: '/restaurant-logbook' },
    { name: workflow.tips, href: '/restaurant-tip-management' },
  ];

  // Solutions organized by category
  const solutionsSegments: ReadonlyArray<NavbarLink> = nav.solutionsSegments;

  const solutionsRoles: ReadonlyArray<NavbarLink> = nav.solutionsRoles;

  const resources: ReadonlyArray<NavbarLink> = [{ name: videoCopy[locale as keyof typeof videoCopy].label, href: '/resources/product-walkthroughs' }, { name: nav.about, href: '/about' }, ...nav.resourcesList.filter(item => item.href !== '/about')];
  const localizeHref = (href: string) => localizeWebsiteHref(href, locale);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-shadow duration-300 border-b border-[var(--border-default)] ${
      isScrolled ? 'shadow-[0_4px_30px_rgba(0,0,0,0.3)]' : ''
    }`}>
      {/* The blur + tint live on this layer, NOT on <nav>. `backdrop-filter` makes
          an element a containing block for its `position: fixed` descendants, so
          while it sat on <nav> the mobile drawer's `fixed inset-0` scrim resolved
          against the 80px-tall nav instead of the viewport - tap-outside-to-close
          only worked in the top strip. It is also the documented cause of fixed
          headers detaching and drifting during momentum scroll on iOS Safari. */}
      <div
        aria-hidden
        className={`absolute inset-0 backdrop-blur-md transition-colors duration-300 ${
          isScrolled ? 'bg-[var(--navy-deep)]/90' : 'bg-[var(--navy-deep)]/70'
        }`}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Left Aligned with Animation */}
          {/* Inner flex span: `nav a { display:inline-block }` (accessibility.css,
              unlayered) overrides Tailwind's flex on the anchor itself, so the
              approved wordmark uses an inner flex element. */}
          <Link href={localizeHref('/')} className="group" aria-label={operatorNavigationCopy[locale as keyof typeof operatorNavigationCopy].brand.title}>
            <span
              className="flex items-center gap-2.5"
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            >
              <span className="relative inline-block">
                {/* Approved Fraunces artwork: white on dark, ink on light */}
                <SundaeLogotype
                  className={`text-[27px] text-[#FBF8F4] [html.light_&]:text-[#2A2320] transition-opacity duration-300 ${
                    isLogoHovered ? 'opacity-80' : 'opacity-100'
                  }`}
                />
              </span>
            </span>
          </Link>

          {/* Desktop Navigation - tighter spacing (space-x-6) so the right-side
              CTA cluster doesn't collide with the Resources dropdown at narrow
              widths; min-w-0 lets the row shrink instead of overflow */}
          <div data-site-navigation="desktop" className="hidden xl:flex items-center space-x-5 min-w-0 whitespace-nowrap">
            {/* Products Mega Menu */}
            <div className="relative group" onMouseLeave={() => setActiveDropdown(null)}>
              <button
                type="button"
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 font-medium cursor-pointer text-sm bg-transparent border-none p-0"
                onMouseEnter={() => setActiveDropdown('product')}
                onFocus={() => setActiveDropdown('product')}
                onClick={() => setActiveDropdown('product')}
                aria-haspopup="true"
                aria-expanded={activeDropdown === 'product'}
              >
                {nav.products}
              </button>

              {activeDropdown === 'product' && (
                <div
                  className="absolute top-full start-0 z-50 w-[min(56rem,calc(100vw-2rem))] pt-2"
                  onMouseEnter={() => setActiveDropdown('product')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                <div className="max-h-[calc(100dvh-6rem)] overflow-y-auto whitespace-normal bg-[var(--navy)]/95 backdrop-blur-xl rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.4)] border border-[var(--border-default)] px-6 py-6 animate-dropdown-in">
                  <Link href={localizeHref('/product')} onClick={() => setActiveDropdown(null)} className="mb-4 block border-b border-[var(--border-default)] px-3 pb-4 text-sm font-semibold text-[var(--text-primary)]">
                    {workflow.platform} →
                  </Link>
                  <div className="grid grid-cols-2 divide-x divide-[var(--border-default)] rtl:divide-x-reverse" data-desktop-product-groups>
                    {[
                      { id: 'core', name: 'Sundae Core', role: story.coreRole, links: pillars },
                      { id: 'crew', name: 'Sundae Crew', role: story.crewRole, links: [...crewLinks, ...workflowLinks] },
                    ].map((group, index) => (
                      <div key={group.id} className={index === 0 ? 'pe-5' : 'ps-5'} data-nav-offering={group.id}>
                        <Link href={localizeHref(`/${group.id}`)} onClick={() => setActiveDropdown(null)} className="mb-4 block rounded-lg px-3 py-2 transition-colors hover:bg-[var(--surface-hover)]">
                          <h3 className="text-base font-semibold text-[var(--text-primary)]">{group.name} →</h3>
                          <p className="mt-1 text-xs leading-relaxed text-[var(--text-muted)]">{group.role}</p>
                        </Link>
                        <div className="grid grid-cols-2 gap-1">
                          {group.links.map(link => <Link key={link.href} href={localizeHref(link.href)} className={dropdownLinkClass} onClick={() => setActiveDropdown(null)}>
                            <div className={dropdownTitleClass}>{link.name}</div>
                            {group.id === 'core' && 'description' in link && link.description && <div className={dropdownDescriptionClass}>{link.description}</div>}
                          </Link>)}
                        </div>
                      </div>
                    ))}
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
                onFocus={() => setActiveDropdown('solutions')}
                onClick={() => setActiveDropdown('solutions')}
                aria-haspopup="true"
                aria-expanded={activeDropdown === 'solutions'}
              >
                {nav.solutions}
              </button>
              
              {activeDropdown === 'solutions' && (
                <div
                  className="absolute top-full left-0 z-50 w-[min(46rem,calc(100vw-2rem))] pt-2"
                  onMouseEnter={() => setActiveDropdown('solutions')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                <div className="bg-[var(--navy)]/95 backdrop-blur-xl rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.4)] border border-[var(--border-default)] px-6 py-6 animate-dropdown-in">
                  <Link href={localizeHref('/solutions')} onClick={() => setActiveDropdown(null)} className="mb-5 flex items-center justify-between gap-4 border-b border-[var(--border-default)] pb-4 text-base font-semibold text-[var(--text-primary)] transition-colors hover:text-[var(--text-display)] focus-visible:text-[var(--text-display)]" data-solutions-overview="desktop">
                    {closerCopy[locale as keyof typeof closerCopy].overview}<span aria-hidden className="rtl:-scale-x-100">↗</span>
                  </Link>
                  {/* Segments */}
                  <div className="mb-4">
                    <h3 className="eyebrow text-[var(--text-muted)] mb-3">
                      {nav.bySegment}
                    </h3>
                    <div className="grid grid-cols-2 gap-1">
                      {solutionsSegments.map((solution) => (
                        <Link
                          key={solution.name}
                          href={localizeHref(solution.href)}
                          className={dropdownLinkClass}
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className={dropdownTitleClass}>
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
                          href={localizeHref(solution.href)}
                          className={dropdownLinkClass}
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className={dropdownTitleClass}>
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

            <a
              href={PRICING_URL}
              data-pricing-link="desktop"
              onClick={(event) => { event.currentTarget.href = appendCampaign(PRICING_URL); trackCta('nav_pricing', { destination: PRICING_URL, placement: 'desktop' }); }}
              onMouseEnter={() => setActiveDropdown(null)}
              onFocus={() => setActiveDropdown(null)}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 font-medium text-sm"
            >
              {nav.pricing}
            </a>

            <Link href={localizeHref('/why-sundae')} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 font-medium text-sm">
              {proofCopy[locale as keyof typeof proofCopy].whySundae}
            </Link>
            
            {/* Resources Dropdown */}
            <div className="relative group" onMouseLeave={() => setActiveDropdown(null)}>
              <button
                type="button"
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 font-medium cursor-pointer text-sm bg-transparent border-none p-0"
                onMouseEnter={() => setActiveDropdown('resources')}
                onFocus={() => setActiveDropdown('resources')}
                onClick={() => setActiveDropdown('resources')}
                aria-haspopup="true"
                aria-expanded={activeDropdown === 'resources'}
              >
                {nav.resources}
              </button>
              
              {activeDropdown === 'resources' && (
                <div
                  className="absolute top-full right-0 z-50 w-[min(28rem,calc(100vw-2rem))] pt-2"
                  onMouseEnter={() => setActiveDropdown('resources')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                <div className="bg-[var(--navy)]/95 backdrop-blur-xl rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.4)] border border-[var(--border-default)] px-6 py-6 animate-dropdown-in">
                  <h3 className="eyebrow text-[var(--text-muted)] mb-3">
                    {nav.learn}
                  </h3>
                  <div className="flex flex-col gap-1">
                    {resources.map((resource) => (
                      <Link
                        key={resource.name}
                        href={localizeHref(resource.href)}
                        className={dropdownLinkClass}
                        onClick={() => setActiveDropdown(null)}
                      >
                        <div className={dropdownTitleClass}>
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

          {/* CTA Buttons - flex-shrink-0 + ml-6 so they don't collide with the
              nav links section; whitespace-nowrap on every button so
              "Sign In" / "Book a Demo" stay on one line at all widths */}
          <div className="hidden xl:flex items-center space-x-2.5 flex-shrink-0 ml-4">
            <LocaleSwitcher />
            <ThemeToggle />
            <Button
              variant="outline"
              size="sm"
              className="whitespace-nowrap"
              onClick={() => cta(localizeHref("/sign-in"), "sign_in_navbar", { location: "navbar" })}
              data-cta="sign_in_navbar"
              data-source="navbar"
            >
              {nav.signIn}
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="whitespace-nowrap"
              onClick={() => cta(localizeHref("/demo"), "book_demo_navbar", { location: "navbar" })}
              data-cta="book_demo_navbar"
              data-source="navbar"
            >
              {nav.bookDemo}
            </Button>
          </div>

          {/* Mobile / tablet: Menu Button (inline nav shows at xl+) */}
          <div className="xl:hidden flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-[var(--text-primary)] hover:bg-[var(--surface-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5C4D] relative z-50"
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
        ref={mobileDialogRef}
        className={`fixed inset-0 z-[60] xl:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-modal="true"
        role="dialog"
        aria-label={nav.mobileNavigation}
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
      >
        {/* Backdrop Overlay */}
        <button
          type="button"
          className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMenuOpen(false)}
          aria-label={nav.closeNavigation}
          tabIndex={-1}
          aria-hidden="true"
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
            <span className="flex items-center gap-2.5">
              <SundaeLogotype className="text-[24px] text-[#FBF8F4] [html.light_&]:text-[#2A2320]" />
            </span>
            <button
              ref={mobileCloseRef}
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-[var(--surface-hover)] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5C4D]"
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
              <MobileNavLink href={localizeHref('/product')} onClick={handleMobileNavClick} isHighlighted>
                {workflow.platform}
              </MobileNavLink>
              {[
                { id: 'core', name: 'Sundae Core', role: story.coreRole, links: pillars },
                { id: 'crew', name: 'Sundae Crew', role: story.crewRole, links: [...crewLinks, ...workflowLinks] },
              ].map(group => (
                <div key={group.id} className="border-b border-[var(--border-default)]" data-mobile-nav-offering={group.id}>
                  <div className="flex items-center gap-2 pe-3">
                    <Link href={localizeHref(`/${group.id}`)} onClick={handleMobileNavClick} className="min-w-0 flex-1 px-4 py-4 text-sm font-semibold text-[var(--text-primary)]">
                      <span className="block">{group.name} →</span>
                      <span className="mt-1 block text-xs font-normal leading-relaxed text-[var(--text-muted)]">{group.role}</span>
                    </Link>
                    <button type="button" id={`accordion-header-${group.id}`} aria-label={group.name} aria-expanded={expandedSections[group.id]} aria-controls={`accordion-content-${group.id}`} onClick={() => toggleSection(group.id)} className="rounded-lg p-3 text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-hover)] focus-visible:outline-2 focus-visible:outline-[var(--warm-coral)]">
                      <ChevronIcon isOpen={expandedSections[group.id]} />
                    </button>
                  </div>
                  <div id={`accordion-content-${group.id}`} hidden={!expandedSections[group.id]} inert={!expandedSections[group.id]}>
                    {group.links.map(link => <MobileNavLink key={link.href} href={localizeHref(link.href)} onClick={handleMobileNavClick}>{link.name}</MobileNavLink>)}
                  </div>
                </div>
              ))}
            </AccordionSection>

            {/* Solutions Section */}
            <AccordionSection
              title={nav.solutions}
              id="solutions"
              isExpanded={expandedSections.solutions}
              onToggle={() => toggleSection('solutions')}
            >
              <MobileNavLink href={localizeHref('/solutions')} onClick={handleMobileNavClick}>
                {closerCopy[locale as keyof typeof closerCopy].overview}
              </MobileNavLink>
              <div className="px-4 pt-1 pb-1">
                <span className="eyebrow text-[var(--text-muted)]">{nav.bySegment}</span>
              </div>
              {solutionsSegments.map((solution) => (
                <MobileNavLink
                  key={solution.name}
                  href={localizeHref(solution.href)}
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
                  href={localizeHref(solution.href)}
                  onClick={handleMobileNavClick}
                >
                  {solution.name}
                </MobileNavLink>
              ))}
            </AccordionSection>

            <a href={PRICING_URL} data-pricing-link="mobile" onClick={(event) => { event.currentTarget.href = appendCampaign(PRICING_URL); trackCta('nav_pricing', { destination: PRICING_URL, placement: 'mobile' }); handleMobileNavClick(); }} className="block py-2.5 px-4 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-hover)]">
              {nav.pricing}
            </a>

            <MobileNavLink href={localizeHref('/why-sundae')} onClick={handleMobileNavClick}>
              {proofCopy[locale as keyof typeof proofCopy].whySundae}
            </MobileNavLink>

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
                  href={localizeHref(resource.href)}
                  onClick={handleMobileNavClick}
                >
                  {resource.name}
                </MobileNavLink>
              ))}
            </AccordionSection>
          </div>

          {/* Sticky Bottom CTA Bar */}
          <div className="flex-shrink-0 sticky bottom-0 bg-[var(--navy)]/90 backdrop-blur border-t border-[var(--border-default)] px-4 py-3">
            <div className="grid gap-3">
              <div className="flex items-center justify-between gap-3">
                <div className="inline-flex min-h-11 shrink-0 rounded-lg focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--text-display)] [&>label]:min-h-11">
                  <LocaleSwitcher />
                </div>
                <ThemeToggle className="min-h-11 min-w-11 shrink-0" />
              </div>
              <div className="grid min-w-0 grid-cols-2 gap-3">
              <Link
                href={localizeHref('/sign-in')}
                onClick={handleMobileNavClick}
                className="flex min-h-11 min-w-0 items-center justify-center rounded-lg border border-[var(--border-emphasis)] px-3 py-2.5 text-center text-sm font-medium leading-snug text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-hover)]"
                data-cta="sign_in_mobile_nav"
                data-source="mobile-nav"
              >
                {nav.signIn}
              </Link>
              <Button
                variant="primary"
                size="sm"
                className="h-auto min-h-11 min-w-0 whitespace-normal! px-3 py-2.5 leading-snug"
                onClick={() => {
                  cta(localizeHref("/demo"), "book_demo_mobile_nav", { location: "mobile-nav" });
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
