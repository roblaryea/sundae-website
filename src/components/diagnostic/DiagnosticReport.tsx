"use client";

/**
 * The diagnostic report shown on the page right after the questions
 * (spec 3.3): your operation, where profit is most likely leaking, how
 * Sundae would close the loop, running the day, your starting package, your
 * first 90 days and the next step.
 *
 * The package, Crew option, add-ons and price always come from the rules
 * engine; only the summary, leak explanations, plan text and the Crew
 * sentence may be AI-written, after the guard.
 */

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Check,
  CheckCircle2,
  Layers,
  Printer,
  RefreshCcw,
  Sparkles,
  TrendingDown,
  Users,
} from "lucide-react";
import type { DiagnosticReport as DiagnosticReportType } from "@/lib/diagnostic/engine";
import type { DiagnosticResponses } from "@/lib/diagnostic/questions";
import type { WebsiteLocale } from "@/lib/i18n";
import { getDiagnosticCopy } from "@/lib/diagnostic/i18n";
import { fill } from "@/lib/diagnostic/copy";
import { trackEvent } from "@/lib/posthog";
import { EmailNextStep, type DiagnosticLeadData } from "@/components/diagnostic/DiagnosticNextStep";
import type { GuidedDelivery } from "@/components/diagnostic/GuidedNextStep";

export type { DiagnosticLeadData, GuidedDelivery };

// Guided visitors only: the inline booking card and the booking copy it uses.
const GuidedNextStep = dynamic(() => import("@/components/diagnostic/GuidedNextStep"), { ssr: false });

interface DiagnosticReportProps {
  report: DiagnosticReportType;
  locale: WebsiteLocale;
  responses: DiagnosticResponses;
  leadData: DiagnosticLeadData;
  /** Experiment properties added to every event (spec 6.4). */
  analytics?: Record<string, unknown>;
  /** Set for guided-diagnostic leads: delivery status and booking token (memory only). */
  guidedDelivery?: GuidedDelivery | null;
}

const card = "rounded-2xl border border-[var(--border-default)] bg-[var(--surface-subtle)]";
const eyebrow = "text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]";
const accent = "text-[var(--accent-warm)]";

function SectionTitle({ icon: Icon, title, id }: { icon: typeof Sparkles; title: string; id: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Icon className={`w-5 h-5 ${accent}`} aria-hidden />
      <h2 id={id} className="text-xl sm:text-2xl font-bold text-[var(--text-display)]">{title}</h2>
    </div>
  );
}

export function DiagnosticReport({ report, leadData, locale, analytics, guidedDelivery }: DiagnosticReportProps) {
  const copy = getDiagnosticCopy(locale);
  const firstName = leadData.name.trim().split(/\s+/)[0] ?? "";
  const pkg = report.startingPackage;

  const handlePrint = () => {
    trackEvent("diagnostic_report_print", { locale, tierFit: report.tierFit, ...analytics });
    window.print();
  };

  const fadeIn = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.4 },
  });

  return (
    <div id="diagnostic-report" className="min-h-screen bg-[var(--navy-deep)] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <style>{`@media print {
        body { background:#fff !important; }
        .dgx-no-print { display:none !important; }
        #diagnostic-report { background:#fff !important; padding-top:8px !important; }
        #diagnostic-report, #diagnostic-report * { color:#1a1a1a !important; box-shadow:none !important; }
        #diagnostic-report [class*="border"] { border-color:#e2e2e2 !important; }
      }`}</style>
      <div className="max-w-5xl mx-auto">
        <div className="dgx-no-print flex justify-end mb-2">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[var(--text-supporting)] border border-[var(--border-default)] hover:text-[var(--text-primary)] transition-colors"
          >
            <Printer className="w-3.5 h-3.5" aria-hidden />
            {copy.report.print}
          </button>
        </div>

        {/* Your operation */}
        <motion.header {...fadeIn(0)} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--warm-coral)]/12 border border-[var(--warm-coral)]/30 mb-4">
            <Sparkles className={`w-3.5 h-3.5 ${accent}`} aria-hidden />
            <span className={`text-[11px] font-bold uppercase tracking-[0.16em] ${accent}`}>{copy.report.eyebrow}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-display)] mb-3 text-balance">
            {firstName ? fill(copy.report.title, { name: firstName }) : copy.share.title}
          </h1>
          <p className={eyebrow}>{copy.report.operationTitle}</p>
          <p className="text-base sm:text-lg text-[var(--text-supporting)] max-w-3xl mx-auto mt-1">{report.profileLine}</p>
        </motion.header>

        <motion.div {...fadeIn(0.05)} className="rounded-2xl border border-[var(--warm-coral)]/30 bg-[var(--warm-coral)]/[0.06] p-6 md:p-8 mb-10">
          <p className="text-base md:text-lg text-[var(--text-primary)] leading-relaxed">{report.summary}</p>
        </motion.div>

        {/* Where profit is most likely leaking */}
        <motion.section {...fadeIn(0.1)} className="mb-10" aria-labelledby="dgx-leaks">
          <SectionTitle icon={TrendingDown} title={copy.report.leaksTitle} id="dgx-leaks" />
          <p className="text-sm text-[var(--text-muted)] mb-4">{copy.report.leaksNote}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {report.topLeaks.map((leak, index) => (
              <article key={leak.id} className={`${card} p-5`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`flex-shrink-0 w-6 h-6 rounded-full border border-[var(--warm-coral)]/40 text-xs font-bold flex items-center justify-center ${accent}`}>
                    {index + 1}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-[var(--border-emphasis)] text-[var(--text-muted)]">
                    {copy.report.hypothesis}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">{leak.title}</h3>
                <p className="text-sm text-[var(--text-supporting)] leading-relaxed">{leak.detail}</p>
              </article>
            ))}
          </div>
        </motion.section>

        {/* How Sundae would close the loop */}
        <motion.section {...fadeIn(0.15)} className="mb-10" aria-labelledby="dgx-recovery">
          <SectionTitle icon={RefreshCcw} title={copy.report.recoveryTitle} id="dgx-recovery" />
          <p className="text-sm text-[var(--text-supporting)] mb-4">{report.recovery.intro}</p>
          <div className="space-y-3">
            {report.recovery.items.map((item) => (
              <article key={item.leakId} className={`${card} p-5`}>
                <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3">{item.title}</h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                  {[
                    [copy.report.recoveryWatch, item.watch],
                    [copy.report.recoveryData, item.data],
                    [copy.report.recoveryOwner, item.owner],
                    [copy.report.recoveryMeasure, item.measure],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className={eyebrow}>{label}</dt>
                      <dd className="text-[var(--text-supporting)] mt-0.5">{value}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-3 italic">{report.recovery.note}</p>
        </motion.section>

        {/* Running the day */}
        {report.crew && (
          <motion.section {...fadeIn(0.2)} className="mb-10" aria-labelledby="dgx-crew">
            <SectionTitle icon={Users} title={copy.report.crewTitle} id="dgx-crew" />
            <div className={`${card} p-5 space-y-4`}>
              <p className="text-sm text-[var(--text-primary)] leading-relaxed">{report.crew.sentence}</p>
              <div>
                <p className={eyebrow}>{copy.report.crewFlagged}</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {report.crew.flagged.map((item) => (
                    <li key={item} className="text-xs px-2.5 py-1 rounded-full border border-[var(--border-default)] text-[var(--text-supporting)]">{item}</li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className={eyebrow}>{copy.report.crewCoveredBy}</p>
                  <p className="text-base font-bold text-[var(--text-primary)] mt-1">{report.crew.packageName}</p>
                </div>
                <div>
                  <p className={eyebrow}>{copy.report.crewCovers}</p>
                  <ul className="mt-1 space-y-1">
                    {report.crew.covers.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-[var(--text-supporting)]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {report.crew.notes.length > 0 && (
                <ul className="space-y-1 pt-3 border-t border-[var(--border-default)]">
                  {report.crew.notes.map((note) => (
                    <li key={note} className="text-xs text-[var(--text-muted)]">{note}</li>
                  ))}
                </ul>
              )}
            </div>
          </motion.section>
        )}

        {/* Your starting package */}
        <motion.section {...fadeIn(0.25)} className="mb-10" aria-labelledby="dgx-package">
          <SectionTitle icon={Layers} title={copy.report.packageTitle} id="dgx-package" />
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4">
            <div className="space-y-4">
              <div className={`${card} p-5`}>
                <p className={eyebrow}>{copy.report.corePackage}</p>
                <p className="text-lg font-bold text-[var(--text-primary)] mt-1">{pkg.core.name}</p>
                <p className={`${eyebrow} mt-3`}>{copy.report.coreCovers}</p>
                <p className="text-sm text-[var(--text-supporting)] mt-1">{pkg.core.covers.join(" · ")}</p>
              </div>
              <div className={`${card} p-5`}>
                <p className={eyebrow}>{copy.report.includedTitle}</p>
                <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pkg.included.map((item) => (
                    <li key={item.name} className="flex gap-2">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" aria-hidden />
                      <span>
                        <span className="block text-sm font-semibold text-[var(--text-primary)]">{item.name}</span>
                        <span className="block text-xs text-[var(--text-supporting)]">{item.description}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              {pkg.crew && (
                <div className={`${card} p-5`}>
                  <p className={eyebrow}>{copy.report.crewPackage}</p>
                  <p className="text-lg font-bold text-[var(--text-primary)] mt-1">{pkg.crew.name}</p>
                  <p className="text-sm text-[var(--text-supporting)] mt-1">{pkg.crew.covers.join(" · ")}</p>
                </div>
              )}
              {pkg.addOns.length > 0 && (
                <div className={`${card} p-5`}>
                  <p className={eyebrow}>{copy.report.addOnsTitle}</p>
                  <ul className="mt-2 space-y-2">
                    {pkg.addOns.map((addOn) => (
                      <li key={addOn.name} className="text-sm">
                        <span className="font-semibold text-[var(--text-primary)]">{addOn.name}</span>
                        {addOn.price && <span className={`ms-2 font-semibold ${accent}`}>{addOn.price}</span>}
                        <span className="block text-[var(--text-supporting)]">{addOn.detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {pkg.concepts.length > 0 && (
                <div className={`${card} p-5`}>
                  <p className={eyebrow}>{copy.report.conceptsTitle}</p>
                  <p className="text-sm font-semibold text-[var(--text-primary)] mt-1">{pkg.concepts.join(" · ")}</p>
                </div>
              )}
              {pkg.notes.length > 0 && (
                <ul className="space-y-1 px-1">
                  {pkg.notes.map((note) => (
                    <li key={note} className="text-xs text-[var(--text-muted)]">{note}</li>
                  ))}
                </ul>
              )}
            </div>

            <aside className="rounded-2xl border-2 border-[var(--warm-coral)]/35 bg-[var(--warm-coral)]/[0.05] p-5 h-fit" aria-label={copy.report.priceTitle}>
              <p className={eyebrow}>{copy.report.priceTitle}</p>
              <p className="text-sm text-[var(--text-supporting)] mt-1">{pkg.price.locationsLabel}</p>
              {pkg.price.kind === "list" ? (
                <>
                  <dl className="mt-4 space-y-2">
                    {pkg.price.lines.map((line) => (
                      <div key={line.label} className="flex items-baseline justify-between gap-3 text-sm">
                        <dt className="text-[var(--text-supporting)]">{line.label}</dt>
                        <dd className="font-semibold text-[var(--text-primary)] tabular-nums whitespace-nowrap">{line.amount}</dd>
                      </div>
                    ))}
                    <div className="flex items-baseline justify-between gap-3 pt-3 border-t border-[var(--border-default)]">
                      <dt className="text-sm font-bold text-[var(--text-primary)]">{copy.report.priceTotal}</dt>
                      <dd className="text-2xl font-bold text-[var(--text-display)] tabular-nums whitespace-nowrap">{pkg.price.total}</dd>
                    </div>
                  </dl>
                  <p className="text-[11px] text-[var(--text-muted)] mt-3 leading-snug">{pkg.price.basis}</p>
                </>
              ) : (
                <>
                  <p className="text-2xl font-bold text-[var(--text-display)] mt-4">{pkg.price.label}</p>
                  <p className="text-[11px] text-[var(--text-muted)] mt-2 leading-snug">{pkg.price.basis}</p>
                </>
              )}
              <a
                href={pkg.calculatorUrl}
                target="_blank"
                rel="noopener"
                onClick={() => trackEvent("diagnostic_cta_click", { cta: "pricing_calculator", locale, ...analytics })}
                className="dgx-no-print mt-4 flex items-center justify-center gap-2 rounded-xl border-2 border-[var(--warm-coral)]/50 px-4 py-2.5 text-sm font-bold text-[var(--text-primary)] hover:bg-[var(--warm-coral)]/10 transition-colors"
              >
                {copy.report.calculator}
                <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden />
              </a>
            </aside>
          </div>
        </motion.section>

        {/* Your first 90 days */}
        <motion.section {...fadeIn(0.3)} className="mb-12" aria-labelledby="dgx-plan">
          <SectionTitle icon={Calendar} title={copy.report.planTitle} id="dgx-plan" />
          <ol className="space-y-3">
            {report.quickWins.map((win) => (
              <li key={win.horizon} className={`${card} flex gap-4 items-start p-4`}>
                <div className="flex-shrink-0 min-w-14 h-14 px-2 rounded-xl bg-[var(--warm-coral)]/12 border border-[var(--warm-coral)]/30 flex items-center justify-center">
                  <span className={`text-xs font-bold text-center leading-tight ${accent}`}>{fill(copy.report.dayLabel, { day: win.horizon })}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">{win.title}</h3>
                  <p className="text-sm text-[var(--text-supporting)] leading-relaxed">{win.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </motion.section>

        {/* Next step: inline booking for guided leads with a token, otherwise the email ending. */}
        {guidedDelivery ? (
          <GuidedNextStep report={report} leadData={leadData} locale={locale} analytics={analytics} delivery={guidedDelivery} />
        ) : (
          <EmailNextStep report={report} leadData={leadData} locale={locale} analytics={analytics} />
        )}
      </div>
    </div>
  );
}
