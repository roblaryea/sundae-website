'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import { Breadcrumbs } from './ui/Breadcrumbs';
import { parseWebsiteLocaleFromPathname } from '@/lib/i18n';

/** Root layouts persist across client navigation, so chrome must follow the live route. */
export function WebsiteChrome({ children }: { children: ReactNode }) {
  const { pathname } = parseWebsiteLocaleFromPathname(usePathname());
  if (pathname === '/book' || pathname.startsWith('/book/')) {
    return <div id="main-content" className="min-h-screen">{children}</div>;
  }
  return <>
    <header role="banner"><Navbar /></header>
    <main id="main-content" className="relative min-h-screen overflow-x-hidden" role="main">
      <Breadcrumbs className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-2" />
      {children}
    </main>
    <Footer />
  </>;
}
