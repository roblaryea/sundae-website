'use client';

import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { SundaeIcon } from "@/components/icons";
import { FadeUp } from "@/components/ui/PageAnimations";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { useCta } from "@/lib/cta";
import { REPORT_APP_URL, PRICING_URL } from "@/lib/urls";
import { getLocalizedFaqSections } from "@/content/faqContent";

export default function FAQPage() {
  const cta = useCta();
  const { locale, messages } = useWebsiteI18n();
  const copy = messages.pages.faq;
  const faqCategories = getLocalizedFaqSections(locale, copy.categories);

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp>
            <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <SundaeIcon name="conversation" size="sm" />
              <span>{copy.badge}</span>
            </div>
            <h1 className="hero-h1 text-[var(--text-primary)] mb-6">
              {copy.title}
            </h1>
            <p className="body-xl text-[var(--text-supporting)] mb-8 max-w-3xl mx-auto">
              {copy.description}
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)] border-b">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-sm text-[var(--text-supporting)] mb-4">{copy.jumpToCategory}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  const element = document.getElementById(category.id);
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 bg-[var(--surface-subtle)] hover:bg-blue-500/20 text-[var(--text-secondary)] hover:text-blue-400 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                <SundaeIcon name={category.icon} size="sm" />
                <span>{category.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-16">
          {faqCategories.map((category, index) => (
            <FadeUp key={category.id} delay={index * 0.05}>
              <div id={category.id} className="scroll-mt-24">
                <div className="mb-8">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <SundaeIcon name={category.icon} size="lg" className="text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-[var(--text-primary)]">{category.title}</h2>
                  </div>
                  <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                </div>
                <Accordion items={category.faqs} />
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 text-[var(--text-primary)] mb-6">
            {copy.stillHaveQuestions}
          </h2>
          <p className="body-xl mb-8 text-[var(--text-supporting)]">
            {copy.helpDescription}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button
              variant="cta"
              size="lg"
              onClick={() => cta(REPORT_APP_URL, "start_free_from_faq", { page: "/faq" })}
            >
              {copy.startFree}
            </Button>
            <a href={PRICING_URL} target="_blank" rel="noopener noreferrer" className="block">
              <Button variant="outline-light" size="lg" className="w-full">
                {copy.seePricing}
              </Button>
            </a>
            <Button
              variant="outline-light"
              size="lg"
              onClick={() => cta("/demo", "book_demo_from_faq", { page: "/faq" })}
            >
              {copy.bookDemo}
            </Button>
            <Button
              variant="outline-light"
              size="lg"
              onClick={() => cta("/contact", "contact_from_faq", { page: "/faq" })}
            >
              {copy.contactUs}
            </Button>
          </div>
          <p className="text-sm text-[var(--text-muted)] mt-6">
            {copy.emailSupportPrefix}{" "}
            <a href="mailto:support@sundae.io" className="text-blue-400 hover:underline">
              support@sundae.io
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
