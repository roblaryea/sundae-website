import { cookies } from 'next/headers';
import type { Metadata } from 'next';
import Link from 'next/link';
import { LeadCaptureForm } from '@/components/marketing/LeadCaptureForm';
import { getAccessRequestCopy } from '@/lib/accessRequestCopy';
import { getWebsiteMessages, resolveWebsiteLocale } from '@/lib/i18n';
import { decodePricingIntent } from '@/lib/pricingIntent';
import { SIGNIN_URL } from '@/lib/urls';
import { buildResolvedPageMetadata } from '@/lib/solutionPageMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveWebsiteLocale(await cookies());
  const copy = getAccessRequestCopy(locale);
  return {
    ...buildResolvedPageMetadata({ locale, pathname: '/get-started', title: copy.title, description: copy.description }),
    robots: { index: false, follow: false },
  };
}

export default async function GetStartedPage({ searchParams }: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const locale = resolveWebsiteLocale(await cookies());
  const copy = getAccessRequestCopy(locale);
  const signIn = getWebsiteMessages(locale).pages.signIn;
  const pricingIntent = typeof params.cfg === 'string' ? decodePricingIntent(params.cfg) : null;
  return (
    <section className="min-h-screen bg-[var(--navy-deep)] px-6 pb-20 pt-32">
      <div className="mx-auto max-w-3xl">
        <header className="mb-10 max-w-2xl">
          <h1 className="hero-h1 mb-5 text-[var(--text-primary)]">{copy.title}</h1>
          <p className="body-lg text-[var(--text-supporting)]">{copy.description}</p>
          <Link href={SIGNIN_URL} className="mt-5 inline-flex min-h-11 items-center font-semibold text-[var(--text-primary)] underline underline-offset-4">{signIn.headingTitle}</Link>
        </header>
        <LeadCaptureForm ctaLabel={copy.title} defaultMessage={copy.title} pricingIntent={pricingIntent ?? undefined} />
      </div>
    </section>
  );
}
