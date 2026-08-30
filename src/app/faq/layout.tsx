import type { Metadata } from "next";
import Script from "next/script";
import { cookies } from "next/headers";
import { getWebsiteMessages, resolveWebsiteLocale, type WebsiteMessages } from "@/lib/i18n";
import { getLocalizedFaqSections } from "@/content/faqContent";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = resolveWebsiteLocale(cookieStore);
  const messages = (getWebsiteMessages(locale) as WebsiteMessages).pages.faq;
  return {
    title: messages.metadataTitle.replace(/\s*-\s*Sundae$/i, ""),
    description: messages.metadataDescription,
  };
}

function toPlainText(value: string): string {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`#>]/g, "")
    .replace(/^\s*[-•]\s*/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

export default async function FAQLayout({ children }: { children: React.ReactNode }) {
  const locale = resolveWebsiteLocale(await cookies());
  const messages = (getWebsiteMessages(locale) as WebsiteMessages).pages.faq;
  const sections = getLocalizedFaqSections(locale, messages.categories);
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: sections.flatMap((section) =>
      section.faqs.slice(0, 2).map((faq) => ({
        "@type": "Question",
        name: toPlainText(faq.title),
        acceptedAnswer: {
          "@type": "Answer",
          text: toPlainText(faq.content),
        },
      })),
    ),
  };

  return (
    <>
      <Script
        id="faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {children}
    </>
  );
}
