import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getWebsiteMessages, resolveWebsiteLocale, type WebsiteMessages } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
 const cookieStore = await cookies();
 const locale = resolveWebsiteLocale(cookieStore);
 const messages = (getWebsiteMessages(locale) as WebsiteMessages).pages.integrations;
 return {
  title: { absolute: messages.metadataTitle },
  description: messages.description,
  openGraph: { title: messages.metadataTitle, description: messages.description, images: [{ url: "/logos/og-card.png", width: 1200, height: 630, alt: messages.metadataTitle }] },
 };
}

export default function IntegrationsLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return children;
}
