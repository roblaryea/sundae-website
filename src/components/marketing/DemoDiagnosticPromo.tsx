"use client";

import Link from "next/link";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { getDiagnosticPack } from "@/lib/diagnostic/copy";
import { getLocalizedPathname } from "@/lib/i18n";

// Localized "want substance before the call" promo on /demo, pointing to the
// Operations Diagnostic. Copy lives in the diagnostic locale packs and makes
// no time or question-count promise.

export function DemoDiagnosticPromo() {
  const { locale } = useWebsiteI18n();
  const c = getDiagnosticPack(locale).promo;
  return (
    <section className="px-4 sm:px-6 lg:px-8 pb-16">
      <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-[var(--warm-coral)]/15 via-[var(--warm-coral)]/8 to-emerald-500/8 border border-[var(--warm-coral)]/30 p-6 md:p-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--warm-coral)]/15 border border-[var(--warm-coral)]/30 mb-4">
          <span className="eyebrow">
            {c.badge}
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3 text-balance">
          {c.title}
        </h2>
        <p className="text-base text-[var(--text-supporting)] mb-6 max-w-2xl mx-auto">
          {c.description}
        </p>
        <Link
          href={getLocalizedPathname("/diagnostic", locale)}
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[var(--warm-coral)] to-emerald-500 text-white font-bold rounded-xl shadow-xl shadow-[var(--warm-coral)]/20 hover:shadow-[var(--warm-coral)]/40 transition-all"
        >
          {c.cta}
          <span aria-hidden>→</span>
        </Link>
        <p className="text-[11px] text-[var(--text-muted)] mt-3">
          {c.disclaimer}
        </p>
      </div>
    </section>
  );
}
