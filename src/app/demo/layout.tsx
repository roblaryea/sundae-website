import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getWebsiteMessages, resolveWebsiteLocale, type WebsiteMessages } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = resolveWebsiteLocale(cookieStore);
  const messages = (getWebsiteMessages(locale) as WebsiteMessages).pages.demo;
  return {
    title: messages.metadataTitle,
    description: messages.metadataDescription,
  };
}

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
