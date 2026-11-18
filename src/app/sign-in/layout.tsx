import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getWebsiteMessages, resolveWebsiteLocale, type WebsiteMessages } from '@/lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = resolveWebsiteLocale(cookieStore);
  const messages = getWebsiteMessages(locale) as WebsiteMessages;
  return {
    title: { absolute: messages.pages.signIn.metadataTitle },
    description: messages.pages.signIn.metadataDescription,
    robots: { index: false, follow: false },
    openGraph: { title: messages.pages.signIn.metadataTitle, description: messages.pages.signIn.metadataDescription, images: [{ url: "/logos/og-card.png", width: 1200, height: 630, alt: messages.pages.signIn.metadataTitle }] },
  };
}

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
