import type { Metadata } from "next";
import { buildResolvedPageMetadata } from "@/lib/solutionPageMetadata";
import { cookies } from "next/headers";
import { getWebsiteMessages, resolveWebsiteLocale, type WebsiteMessages } from "@/lib/i18n";
import systemByLocale from '@/content/support-system.json';

export async function generateMetadata(): Promise<Metadata> {
 const cookieStore = await cookies();
 const locale = resolveWebsiteLocale(cookieStore);
 const messages = (getWebsiteMessages(locale) as WebsiteMessages).pages.integrations;
 return buildResolvedPageMetadata({ locale, pathname: "/integrations", title: messages.metadataTitle, description: systemByLocale[locale as keyof typeof systemByLocale].iBody });
}

export default function IntegrationsLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return children;
}
