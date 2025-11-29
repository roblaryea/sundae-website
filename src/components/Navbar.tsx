'use client';

// Mobile nav overlay: full-viewport scrim + scroll lock, consistent on all pages

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from './ui/Button';
import { DarkModeToggle } from './DarkModeToggle';
import Image from 'next/image';
import { useCta } from '@/lib/cta';

const Navbar = () => {
  const cta = useCta();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

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
      
      // Calculate scrollbar width to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
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

  // Official Sundae Products (4)
  const products = [
    { name: 'Sundae Report', description: 'Benchmarking Engine', href: '/report' },
    { name: 'Sundae Nexus', description: 'Decision Intelligence Platform', href: '/nexus' },
    { name: 'Sundae Insights', description: 'AI Insights & Recommendations', href: '/insights' },
    { name: 'Sundae Canvas', description: 'Visualization Intelligence', href: '/canvas' },
  ];

  // 4D Intelligence Feature
  const fourDIntelligence = { name: '4D Intelligence', description: 'See Your Business in 4D', href: '/4d-intelligence' };

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

  // Architecture organized by layer
  const dataLayer = [
    { name: 'Scout', description: 'Data Integration', href: '/product/scout' },
  ];

  const aiLayer = [
    { name: 'Pulse', description: 'Anomaly Detection', href: '/product/pulse' },
    { name: 'Forge', description: 'Conversational AI', href: '/product/forge' },
  ];

  const intelligenceLayer = [
    { name: 'Canvas Engine', description: 'Visualization Engine', href: '/product/canvas' },
    { name: 'Watchtower', description: 'Market Intelligence', href: '/product/watchtower' },
  ];

  const resources = [
    { name: 'Blog', href: '/blog' },
    { name: 'Documentation', href: '/docs' },
    { name: 'Case Studies', href: '/resources' },
    { name: 'Free Tools & Calculators', href: '/tools' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 dark:bg-graphite/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Left Aligned with Animation */}
          <Link href="/" className="flex items-center group">
            <div className="relative">
              <Image
                src="/logos/sundae-wordmark.png"
                alt="Sundae – Decision Intelligence for Restaurants"
                width={140}
                height={40}
                className={`h-10 w-auto transition-all duration-300 ${
                  isLogoHovered ? 'opacity-85' : 'opacity-100'
                }`}
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
          <div className="hidden md:flex items-center space-x-8">
            {/* Product Mega Menu */}
            <div className="relative group">
              <div
                className="text-[#1A1A1A] dark:text-white hover:text-[#0A1E8C] dark:hover:text-electric-blue transition-colors duration-200 font-medium cursor-pointer text-[15px]"
                onMouseEnter={() => setActiveDropdown('product')}
              >
                Product
              </div>
              
              {activeDropdown === 'product' && (
                <div 
                  className="absolute top-full left-0 mt-2 w-96 bg-white dark:bg-graphite rounded-xl shadow-2xl border border-gray-200 dark:border-deep-slate px-6 py-6 z-50"
                  onMouseEnter={() => setActiveDropdown('product')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {/* 4D Intelligence Feature Highlight */}
                  <Link
                    href={fourDIntelligence.href}
                    className="block p-4 mb-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <div className="font-bold text-white text-[16px] mb-1">
                      {fourDIntelligence.name}
                    </div>
                    <div className="text-[14px] text-white/90">
                      {fourDIntelligence.description}
                    </div>
                  </Link>

                  <div className="grid grid-cols-2 gap-2">
                    {products.map((product) => (
                      <Link
                        key={product.name}
                        href={product.href}
                        className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-deep-slate transition-colors duration-200"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <div className="font-semibold text-[#0A0A0A] dark:text-white text-[15px] leading-[1.4] mb-1">
                          {product.name}
                        </div>
                        <div className="text-[14px] text-[#6B7280] dark:text-gray-300 leading-[1.5]">
                          {product.description}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Solutions Mega Menu */}
            <div className="relative group">
              <div
                className="text-[#1A1A1A] dark:text-white hover:text-[#0A1E8C] dark:hover:text-electric-blue transition-colors duration-200 font-medium cursor-pointer text-[15px]"
                onMouseEnter={() => setActiveDropdown('solutions')}
              >
                Solutions
              </div>
              
              {activeDropdown === 'solutions' && (
                <div 
                  className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-graphite rounded-xl shadow-2xl border border-gray-200 dark:border-deep-slate px-6 py-6 z-50"
                  onMouseEnter={() => setActiveDropdown('solutions')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {/* Segments */}
                  <div className="mb-6">
                    <h3 className="text-[14px] font-bold text-[#595F6F] dark:text-gray-400 uppercase tracking-[0.4px] leading-[1.4] pt-4 first:pt-0 mb-2">
                      Segments
                    </h3>
                    <div className="space-y-2">
                      {solutionsSegments.map((solution) => (
                        <Link
                          key={solution.name}
                          href={solution.href}
                          className="block py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-deep-slate transition-colors duration-200 text-[15px] font-semibold text-[#0A0A0A] dark:text-white leading-[1.4]"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {solution.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Roles */}
                  <div>
                    <h3 className="text-[14px] font-bold text-[#595F6F] dark:text-gray-400 uppercase tracking-[0.4px] leading-[1.4] pt-4 mb-2">
                      Roles
                    </h3>
                    <div className="space-y-2">
                      {solutionsRoles.map((solution) => (
                        <Link
                          key={solution.name}
                          href={solution.href}
                          className="block py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-deep-slate transition-colors duration-200 text-[15px] font-semibold text-[#0A0A0A] dark:text-white leading-[1.4]"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {solution.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Architecture Mega Menu */}
            <div className="relative group">
              <div
                className="text-[#1A1A1A] dark:text-white hover:text-[#0A1E8C] dark:hover:text-electric-blue transition-colors duration-200 font-medium cursor-pointer text-[15px]"
                onMouseEnter={() => setActiveDropdown('architecture')}
              >
                Architecture
              </div>
              
              {activeDropdown === 'architecture' && (
                <div 
                  className="absolute top-full left-0 mt-2 w-96 bg-white dark:bg-graphite rounded-xl shadow-2xl border border-gray-200 dark:border-deep-slate px-6 py-6 z-50"
                  onMouseEnter={() => setActiveDropdown('architecture')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {/* Architecture Overview Button */}
                  <Link
                    href="/architecture"
                    className="block p-4 mb-6 rounded-xl bg-gradient-to-r from-electric-blue to-blue-600 hover:from-blue-600 hover:to-electric-blue transition-all duration-200 shadow-md hover:shadow-lg"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <div className="font-bold text-white text-[16px] mb-1">
                      View Architecture Overview
                    </div>
                    <div className="text-[14px] text-white/90">
                      See how all layers work together
                    </div>
                  </Link>

                  {/* Data Layer */}
                  <div className="mb-5">
                    <h3 className="text-[14px] font-bold text-[#595F6F] dark:text-gray-400 uppercase tracking-[0.4px] leading-[1.4] pt-4 first:pt-0 mb-2">
                      Data Layer
                    </h3>
                    <div className="space-y-2">
                      {dataLayer.map((module) => (
                        <Link
                          key={module.name}
                          href={module.href}
                          className="flex items-start py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-deep-slate transition-colors duration-200"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div>
                            <div className="font-semibold text-[#0A0A0A] dark:text-white text-[15px] leading-[1.4]">
                              {module.name}
                            </div>
                            <div className="text-[14px] text-[#6B7280] dark:text-gray-300 leading-[1.5]">
                              {module.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* AI Layer */}
                  <div className="mb-5">
                    <h3 className="text-[14px] font-bold text-[#595F6F] dark:text-gray-400 uppercase tracking-[0.4px] leading-[1.4] pt-4 mb-2">
                      AI Layer
                    </h3>
                    <div className="space-y-2">
                      {aiLayer.map((module) => (
                        <Link
                          key={module.name}
                          href={module.href}
                          className="flex items-start py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-deep-slate transition-colors duration-200"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div>
                            <div className="font-semibold text-[#0A0A0A] dark:text-white text-[15px] leading-[1.4]">
                              {module.name}
                            </div>
                            <div className="text-[14px] text-[#6B7280] dark:text-gray-300 leading-[1.5]">
                              {module.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Intelligence Layer */}
                  <div>
                    <h3 className="text-[14px] font-bold text-[#595F6F] dark:text-gray-400 uppercase tracking-[0.4px] leading-[1.4] pt-4 mb-2">
                      Intelligence Layer
                    </h3>
                    <div className="space-y-2">
                      {intelligenceLayer.map((module) => (
                        <Link
                          key={module.name}
                          href={module.href}
                          className="flex items-start py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-deep-slate transition-colors duration-200"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div>
                            <div className="font-semibold text-[#0A0A0A] dark:text-white text-[15px] leading-[1.4]">
                              {module.name}
                            </div>
                            <div className="text-[14px] text-[#6B7280] dark:text-gray-300 leading-[1.5]">
                              {module.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <Link href="/pricing" className="text-[#1A1A1A] dark:text-white hover:text-[#0A1E8C] dark:hover:text-electric-blue transition-colors duration-200 font-medium text-[15px]">
              Pricing
            </Link>
            
            <Link href="/about" className="text-[#1A1A1A] dark:text-white hover:text-[#0A1E8C] dark:hover:text-electric-blue transition-colors duration-200 font-medium text-[15px]">
              About
            </Link>
            
            {/* Resources Dropdown */}
            <div className="relative group">
              <div
                className="text-[#1A1A1A] dark:text-white hover:text-[#0A1E8C] dark:hover:text-electric-blue transition-colors duration-200 font-medium cursor-pointer text-[15px]"
                onMouseEnter={() => setActiveDropdown('resources')}
              >
                Resources
              </div>
              
              {activeDropdown === 'resources' && (
                <div 
                  className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-graphite rounded-xl shadow-2xl border border-gray-200 dark:border-deep-slate px-6 py-6 z-50"
                  onMouseEnter={() => setActiveDropdown('resources')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <div className="space-y-2">
                    {resources.map((resource) => (
                      <Link
                        key={resource.name}
                        href={resource.href}
                        className="block py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-deep-slate transition-colors duration-200 text-[15px] font-semibold text-[#0A0A0A] dark:text-white leading-[1.4]"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {resource.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CTA Buttons & Dark Mode Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <DarkModeToggle />
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => cta("/sign-in", "sign_in_navbar", { location: "navbar" })}
            >
              Sign In
            </Button>
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => cta("/demo", "book_demo_navbar", { location: "navbar" })}
            >
              Book Demo
            </Button>
          </div>

          {/* Mobile menu button - Enhanced visibility */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 relative z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close main menu" : "Open main menu"}
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

      {/* Mobile Menu Modal - Portal-like fixed container */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[60] md:hidden"
          aria-modal="true"
          role="dialog"
          aria-label="Mobile navigation"
        >
          {/* Backdrop Overlay */}
          <button
            type="button"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close navigation"
          />

          {/* Drawer */}
          <nav
            id="mobile-menu"
            className="absolute inset-y-0 right-0 w-[85%] max-w-sm bg-white dark:bg-graphite shadow-2xl"
          >
            <div className="flex h-full flex-col">
        {/* Mobile Menu Header with Close Button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-deep-slate flex-shrink-0">
            <div className="flex items-center">
              <Image
                src="/logos/sundae-wordmark.png"
                alt="Sundae"
                width={120}
                height={34}
                className="h-8 w-auto"
              />
            </div>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-deep-slate transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              aria-label="Close navigation menu"
            >
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Scrollable Menu Content */}
          <div className="flex-1 overflow-y-auto py-4">
            <div className="flex flex-col space-y-4 px-4">
              {/* Product Links */}
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2 px-2 font-bold">Product</p>
                <Link 
                  href={fourDIntelligence.href} 
                  className="block text-blue-600 dark:text-blue-400 py-2 px-2 text-[15px] font-bold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {fourDIntelligence.name} →
                </Link>
                {products.map((product) => (
                  <Link 
                    key={product.name}
                    href={product.href} 
                    className="block text-deep-slate dark:text-white py-2 px-2 text-[15px] font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {product.name}
                  </Link>
                ))}
              </div>
              
              {/* Solutions */}
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2 px-2 font-bold">Solutions</p>
                {[...solutionsSegments, ...solutionsRoles].map((solution) => (
                  <Link 
                    key={solution.name}
                    href={solution.href} 
                    className="block text-deep-slate dark:text-white py-2 px-2 text-[15px] font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {solution.name}
                  </Link>
                ))}
              </div>
              
              {/* Architecture */}
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2 px-2 font-bold">Architecture</p>
                <Link href="/architecture" className="block text-blue-600 dark:text-blue-400 py-2 px-2 text-[15px] font-bold" onClick={() => setIsMenuOpen(false)}>
                  View Architecture Overview →
                </Link>
                {[...dataLayer, ...aiLayer, ...intelligenceLayer].map((module) => (
                  <Link 
                    key={module.name}
                    href={module.href} 
                    className="block text-deep-slate dark:text-white py-2 px-2 text-[15px] font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {module.name}
                  </Link>
                ))}
              </div>
              
              <Link href="/pricing" className="text-deep-slate dark:text-white font-medium py-2 px-2 text-[15px]" onClick={() => setIsMenuOpen(false)}>
                Pricing
              </Link>
              <Link href="/about" className="text-deep-slate dark:text-white font-medium py-2 px-2 text-[15px]" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              
              {/* Resources */}
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2 px-2 font-bold">Resources</p>
                {resources.map((resource) => (
                  <Link 
                    key={resource.name}
                    href={resource.href} 
                    className="block text-deep-slate dark:text-white py-2 px-2 text-[15px] font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {resource.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Menu Footer with CTAs */}
          <div className="flex-shrink-0 p-4 bg-white dark:bg-graphite border-t border-gray-200 dark:border-deep-slate">
            <div className="flex flex-col space-y-2">
              <DarkModeToggle />
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => {
                  cta("/sign-in", "sign_in_mobile_nav", { location: "mobile-nav" });
                  setIsMenuOpen(false);
                }}
              >
                Sign In
              </Button>
              <Button 
                variant="primary" 
                size="sm" 
                className="w-full"
                onClick={() => {
                  cta("/demo", "book_demo_mobile_nav", { location: "mobile-nav" });
                  setIsMenuOpen(false);
                }}
              >
                Book Demo
              </Button>
            </div>
          </div>
            </div>
          </nav>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
