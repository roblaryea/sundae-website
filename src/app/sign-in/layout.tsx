import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getWebsiteMessages, resolveWebsiteLocale, type WebsiteMessages } from '@/lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = resolveWebsiteLocale(cookieStore);
  const messages = getWebsiteMessages(locale) as WebsiteMessages;
  return {
    title: messages.pages.signIn.metadataTitle,
    description: messages.pages.signIn.metadataDescription,
  };
}

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
