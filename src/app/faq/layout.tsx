import type { Metadata } from "next";
import { buildResolvedPageMetadata } from '@/lib/solutionPageMetadata';
import faqCopyByLocale from '@/content/support-faq.json';
import messagingCopy from '@/content/messaging-feature.json';
import { cookies } from "next/headers";
import { getWebsiteMessages, resolveWebsiteLocale, type WebsiteMessages } from "@/lib/i18n";
import { getLocalizedFaqSections } from "@/content/faqContent";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = resolveWebsiteLocale(cookieStore);
  const messages = (getWebsiteMessages(locale) as WebsiteMessages).pages.faq;
  return buildResolvedPageMetadata({
    locale,
    pathname: '/faq',
    title: messages.metadataTitle,
    description: faqCopyByLocale[locale as keyof typeof faqCopyByLocale].heroBody,
  });
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
  const messaging = messagingCopy[locale as keyof typeof messagingCopy];
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: sections.flatMap((section) =>
      section.faqs.filter((faq, index) => index < 2 || (section.id === 'crew' && faq.title === messaging.faqQuestion)).map((faq) => ({
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
      <script
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
