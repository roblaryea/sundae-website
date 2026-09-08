import Link from "next/link";
import { SundaeIcon } from "@/components/icons";
import type { ApprovedPolicySection } from "@/lib/legal/approved-policies";

type ApprovedPolicyPageProps = {
  badge: string;
  title: string;
  description: string;
  notice?: string;
  effectiveDate: string;
  version: string;
  sections: readonly ApprovedPolicySection[];
  alternateHref: "/privacy" | "/terms";
  alternateLabel: string;
  contactEmail: string;
};

export function ApprovedPolicyPage({
  badge,
  title,
  description,
  notice,
  effectiveDate,
  version,
  sections,
  alternateHref,
  alternateLabel,
  contactEmail,
}: ApprovedPolicyPageProps) {
  return (
    <main className="min-h-screen bg-[var(--navy-deep)]">
      <header className="px-4 pb-8 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#FF5C4D]/20 px-4 py-2 text-sm font-medium text-[#FF8473]">
            <SundaeIcon name="document" size="md" />
            <span>{badge}</span>
          </div>
          <h1 className="mb-5 text-4xl font-bold text-[var(--text-display)] sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-[var(--text-supporting)]">
            {description}
          </p>
          <p className="mt-4 text-sm text-[var(--text-supporting)]">
            Effective {effectiveDate} · Version {version}
          </p>
        </div>
      </header>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {notice ? (
            <div className="mb-10 border-l-4 border-[#FF8473] bg-[rgba(255,92,77,0.1)] p-6">
              <p className="text-sm leading-6 text-[#FF8473] [html.light_&]:text-[#C8392A]">
                {notice}
              </p>
            </div>
          ) : null}

          <article className="space-y-10" aria-label={title}>
            {sections.map((section) => (
              <section
                key={section.title}
                aria-labelledby={`section-${section.title.split(".")[0]}`}
              >
                <h2
                  id={`section-${section.title.split(".")[0]}`}
                  className="mb-4 text-2xl font-bold text-[var(--text-primary)]"
                >
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="leading-7 text-[var(--text-secondary)]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </article>

          <footer className="mt-16 border-t border-white/10 pt-8 text-center">
            <p className="text-[var(--text-supporting)]">
              Questions? Email{" "}
              <a
                className="font-medium text-[#FF8473] underline underline-offset-2 hover:text-[#FFB0A6]"
                href={`mailto:${contactEmail}`}
              >
                {contactEmail}
              </a>
              .
            </p>
            <Link
              href={alternateHref}
              className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg border border-white/20 px-5 py-2 font-medium text-[var(--text-primary)] transition-colors hover:border-[#FF8473] hover:text-[#FF8473]"
            >
              {alternateLabel}
            </Link>
          </footer>
        </div>
      </section>
    </main>
  );
}
