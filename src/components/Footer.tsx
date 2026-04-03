'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/Button';
import { useCta } from '@/lib/cta';
import { PRICING_URL } from '@/lib/links';
import { SIGNUP_URL } from '@/lib/urls';
import { useWebsiteI18n } from './i18n/LocaleProvider';
import { LocaleSwitcher } from './i18n/LocaleSwitcher';
import { localizeWebsiteHref } from '@/lib/i18n';

type FooterLink = {
  name: string;
  href: string;
  description?: string;
};

type FooterResourceLink = FooterLink & {
  tracked?: boolean;
};

const Footer = () => {
  const { locale, messages } = useWebsiteI18n();
  const footer = messages.footer;
  const nav = messages.navbar;
  const cta = useCta();
  const currentYear = new Date().getFullYear();
  const localizeHref = (href: string) => localizeWebsiteHref(href, locale);

  const pillarLinks = [
    ...nav.pillars.slice(0, 5).map((item) => ({ name: item.name, href: item.href })),
  ];

  const planLinks = [
    ...nav.plansList.map((item) => ({ name: item.name, href: item.href })),
    { name: nav.comparePlans.replace(' →', ''), href: '/report-vs-core' },
  ];

  const solutionsBySegment: ReadonlyArray<FooterLink> = nav.solutionsSegments;

  const solutionsByRole: ReadonlyArray<FooterLink> = nav.solutionsRoles;

  const resourceLinks: ReadonlyArray<FooterResourceLink> = [
    ...nav.resourcesList.slice(0, 4).map((item) => ({ name: item.name, href: item.href })),
    { name: nav.resourcesList[4].name, href: nav.resourcesList[4].href, tracked: true },
    ...footer.extraResources,
  ];

  const companyLinks: ReadonlyArray<FooterLink> = footer.companyLinks;

  return (
    <footer className="bg-[var(--navy-deep)] text-[var(--text-primary)]" role="contentinfo">
      {/* Pre-footer CTA Section */}
      <div className="border-b border-[var(--border-default)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">
            {footer.readyTitle}
          </h2>
          <p className="text-[var(--text-muted)] mb-8 max-w-xl mx-auto text-base">
            {footer.readyDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => cta(localizeHref("/demo"), "book_demo_footer", { location: "footer" })}
            >
              {footer.bookDemo}
            </Button>
            <Button
              variant="outline-light"
              size="lg"
              href={SIGNUP_URL}
            >
              {footer.startFree}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10">
          {/* Brand Section */}
          <div className="col-span-1 sm:col-span-2 md:col-span-4 lg:col-span-2">
            <Link href={localizeHref('/')} className="inline-block mb-4" aria-label="Sundae - Return to homepage">
              <Image
                src="/logos/sundae-wordmark-white.svg"
                alt="Sundae"
                width={110}
                height={26}
                style={{ height: '26px', width: 'auto' }}
              />
            </Link>
            <p className="text-[var(--text-muted)] mb-5 max-w-xs text-sm leading-relaxed">
              {footer.brandDescription}
            </p>
            <div className="flex items-center gap-3 text-[var(--text-muted)] text-xs mb-5">
              <span>{footer.global}</span>
              <span className="text-[var(--text-faint)]">·</span>
              <span>{footer.allCurrencies}</span>
              <span className="text-[var(--text-faint)]">·</span>
              <LocaleSwitcher />
            </div>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://x.com/sundae_io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                aria-label="Follow Sundae on X (formerly Twitter)"
              >
                <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/managewithsundae"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                aria-label="Follow Sundae on LinkedIn"
              >
                <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[var(--text-muted)] mb-3">{footer.sectionProduct}</h3>
            <ul className="space-y-2">
              {pillarLinks.map((link) => (
                <li key={link.name}>
                  <Link href={localizeHref(link.href)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-[var(--border-default)] my-3"></div>
            <ul className="space-y-2">
              {planLinks.map((link) => (
                <li key={link.name}>
                  <Link href={localizeHref(link.href)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <a href={PRICING_URL} target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-sm">
                  {footer.pricing}
                </a>
              </li>
            </ul>
          </div>

          {/* Solutions Column */}
          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[var(--text-muted)] mb-3">{footer.sectionSolutions}</h3>
            <ul className="space-y-2">
              {solutionsBySegment.map((link) => (
                <li key={link.name}>
                  <Link href={localizeHref(link.href)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-[var(--border-default)] my-3"></div>
            <ul className="space-y-2">
              {solutionsByRole.map((link) => (
                <li key={link.name}>
                  <Link href={localizeHref(link.href)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & Company */}
          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[var(--text-muted)] mb-3">{footer.sectionResources}</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  {link.tracked ? (
                    <button
                      onClick={() => cta(localizeHref(link.href), "view_tools_footer", { location: "footer" })}
                      className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-sm bg-transparent border-none cursor-pointer p-0 text-left"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <Link href={localizeHref(link.href)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-sm">
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="border-t border-[var(--border-default)] my-3"></div>
            <h3 className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[var(--text-muted)] mb-3">{footer.sectionCompany}</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={localizeHref(link.href)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[var(--border-default)] mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-[var(--text-muted)] text-sm text-center md:text-left">
              &copy; {currentYear} Sundae. {footer.copyrightSuffix}
            </p>
            <div className="flex items-center gap-5 text-xs">
              <Link href={localizeHref('/privacy')} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                {footer.privacy}
              </Link>
              <Link href={localizeHref('/terms')} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                {footer.terms}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
