"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FadeUp } from "@/components/ui/PageAnimations";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { crewBandCopy } from "./crewBandCopy";

/**
 * Homepage Crew band - surfaces the operational substrate (scheduling, time &
 * attendance, payroll readiness, hire-to-retire HR ops) as the layer that FEEDS
 * the decision intelligence. Secondary to the Decision-Intelligence narrative;
 * deep-links to /crew. Fully localized (22 locales) via crewBandCopy.
 */
export function SectionCrewSubstrate() {
  const { locale } = useWebsiteI18n();
  const copy = crewBandCopy[locale as keyof typeof crewBandCopy] ?? crewBandCopy.en;

  return (
    <section
      className="relative overflow-hidden border-y border-[var(--border-default)] bg-[var(--navy-deep)] px-4 py-24 sm:px-6 sm:py-28 lg:px-8"
      style={{
        background:
          "radial-gradient(120% 80% at 85% 0%, rgba(255,92,77,0.10), transparent 55%), radial-gradient(90% 70% at 0% 100%, rgba(233,162,74,0.08), transparent 55%), var(--navy-deep)",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <FadeUp className="max-w-3xl">
          <p className="eyebrow mb-4">{copy.eyebrow}</p>
          <h2
            className="text-3xl font-bold tracking-tight text-[var(--text-display)] sm:text-4xl lg:text-[2.6rem] lg:leading-[1.1]"
            aria-label={`${copy.headline} ${copy.accent}`}
          >
            <span>{copy.headline}</span>{" "}
            <span className="italic text-[var(--warm-coral)]">{copy.accent}</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--text-supporting)] sm:text-lg">
            {copy.sub}
          </p>
        </FadeUp>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--border-default)] sm:grid-cols-2 lg:grid-cols-4">
          {copy.pillars.map((pillar, i) => (
            <FadeUp
              key={i}
              delay={i * 0.08}
              className="flex flex-col gap-2 bg-[var(--navy-deep)] p-6"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--warm-coral)]/80">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base font-semibold text-[var(--text-primary)]">{pillar.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--text-supporting)]">{pillar.desc}</p>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.1} className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm text-[var(--text-muted)]">{copy.optionalNote}</p>
          <Link
            href="/crew"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-[var(--border-emphasis)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--warm-coral)]/50 hover:bg-[var(--surface-hover)]"
          >
            {copy.cta}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}

export default SectionCrewSubstrate;
