import type { Metadata } from 'next';
import { buildResolvedPageMetadata } from '@/lib/solutionPageMetadata';
import { cookies } from 'next/headers';
import { getWebsiteMessages, resolveWebsiteLocale, type WebsiteMessages } from '@/lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = resolveWebsiteLocale(cookieStore);
  const messages = getWebsiteMessages(locale) as WebsiteMessages;
  return {
    ...buildResolvedPageMetadata({ locale, pathname: '/sign-in', title: messages.pages.signIn.metadataTitle, description: messages.pages.signIn.metadataDescription }),
    robots: { index: false, follow: false },
  };
}

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
