"use client";

/**
 * App-styled, shareable diagnostic report (the page the report email links
 * to). A self-contained full-viewport surface with a frozen section rail, a
 * scrolling canvas, light/dark, and collapsible sections the rail can open.
 *
 * Renders the v2 report (spec 3.3). Reports stored before v2 still open:
 * their summary, hypotheses, measures, setup and plan are shown, and their
 * old money tiles are not.
 */

import { SundaeLogotype } from "@/components/ui/SundaeLogotype";
import { useState } from "react";
import {
  ArrowUpRight, CalendarClock, Check, ChevronDown, Gauge, Layers, Moon,
  RefreshCcw, Sparkles, Sun, Target, TrendingDown, Users,
} from "lucide-react";
import type { WebsiteLocale } from "@/lib/i18n";
import type { DiagnosticReport as ReportV2 } from "@/lib/diagnostic/engine";
import { getDiagnosticCopy } from "@/lib/diagnostic/i18n";
import { fill } from "@/lib/diagnostic/copy";

type LegacyReport = {
  version?: undefined;
  profileLine: string;
  summary: string;
  topLeaks: { title: string; detail: string; impactCopy?: string }[];
  recommendedStack?: { label: string; why: string; detail?: string }[];
  expectedImpact?: { metric: string; range: string }[];
  quickWins: { horizon: "30" | "60" | "90"; title: string; detail: string }[];
  tierFit: string;
};

export type SharedDiagnosticReport = ReportV2 | LegacyReport;

const isV2 = (report: SharedDiagnosticReport): report is ReportV2 =>
  report.version === 2 && typeof (report as ReportV2).startingPackage === "object";

function Section({
  id, icon: Icon, title, dark, open, onToggle, children,
}: {
  id: string; icon: typeof TrendingDown; title: string;
  dark: boolean; open: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-4">
      <div className={`rounded-2xl border overflow-hidden transition-colors ${dark ? "border-white/10 bg-white/[0.02]" : "border-gray-200 bg-white"}`}>
        <button type="button" onClick={onToggle} className="w-full flex items-center gap-3 px-5 py-4 text-start" aria-expanded={open} aria-controls={`${id}-body`}>
          <span className={`grid place-items-center w-9 h-9 rounded-lg ${dark ? "bg-[#FF5C4D]/15 text-[#FF8473]" : "bg-[#FF5C4D]/10 text-[#C2410C]"}`}>
            <Icon className="w-4 h-4" aria-hidden />
          </span>
          <span className={`min-w-0 flex-1 text-sm font-bold ${dark ? "text-stone-100" : "text-gray-900"}`}>{title}</span>
          <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${open ? "rotate-180" : ""} ${dark ? "text-stone-500" : "text-gray-400"}`} aria-hidden />
        </button>
        {open && <div id={`${id}-body`} className="px-5 pb-5 pt-1">{children}</div>}
      </div>
    </section>
  );
}

export function DiagnosticReportView({
  report, company, locale,
}: {
  report: SharedDiagnosticReport;
  company?: string | null;
  locale: WebsiteLocale;
}) {
  const copy = getDiagnosticCopy(locale);
  const [dark, setDark] = useState(true);
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set(["leaks", "recovery", "package"]));
  const v2 = isV2(report) ? report : null;

  const toggle = (id: string) =>
    setOpenIds((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const goTo = (id: string) => {
    setOpenIds((previous) => new Set(previous).add(id));
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 70);
  };

  const muted = dark ? "text-stone-400" : "text-gray-500";
  const body = dark ? "text-stone-300" : "text-gray-600";
  const heading = dark ? "text-stone-100" : "text-gray-900";
  const rule = dark ? "border-white/10" : "border-gray-200";
  const label = `text-[11px] font-bold uppercase tracking-wide ${muted}`;
  const inner = `rounded-xl border p-4 ${rule} ${dark ? "bg-white/[0.02]" : "bg-gray-50/60"}`;
  const accent = dark ? "text-[#FF8473]" : "text-[#C2410C]";

  const navItems = v2
    ? [
        { id: "summary", label: copy.share.navSummary },
        { id: "leaks", label: copy.share.navLeaks },
        { id: "recovery", label: copy.share.navRecovery },
        ...(v2.crew ? [{ id: "crew", label: copy.share.navCrew }] : []),
        { id: "package", label: copy.share.navPackage },
        { id: "plan", label: copy.share.navPlan },
      ]
    : [
        { id: "summary", label: copy.share.navSummary },
        { id: "leaks", label: copy.share.navLeaks },
        { id: "measures", label: copy.share.legacyMeasuresTitle },
        { id: "stack", label: copy.share.legacyStackTitle },
        { id: "plan", label: copy.share.navPlan },
      ];

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col transition-colors ${dark ? "bg-[#020617] text-stone-100" : "bg-gray-50 text-gray-900"}`}
      style={{ colorScheme: dark ? "dark" : "light" }}
      lang={locale}
      dir={copy.dir}
    >
      <header className={`shrink-0 border-b ${dark ? "bg-[#020617] border-white/10" : "bg-white border-gray-200"}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <SundaeLogotype tone={dark ? "cream" : "ink"} className="text-[25px]" />
            <span className={`hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${dark ? "bg-[#FF5C4D]/15 text-[#FF8473]" : "bg-[#FF5C4D]/10 text-[#C2410C]"}`}>
              <Sparkles className="w-3 h-3" aria-hidden /> {copy.share.title}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setDark((value) => !value)}
            className={`grid place-items-center w-9 h-9 rounded-lg border transition-colors ${dark ? "border-white/10 hover:bg-white/5 text-stone-300" : "border-gray-200 hover:bg-gray-100 text-gray-600"}`}
            aria-label={copy.share.darkToggle}
          >
            {dark ? <Sun className="w-4 h-4" aria-hidden /> : <Moon className="w-4 h-4" aria-hidden />}
          </button>
        </div>
      </header>

      <div className="flex-1 min-h-0 w-full max-w-6xl mx-auto flex">
        <nav className={`hidden lg:flex flex-col gap-1 w-[210px] shrink-0 overflow-y-auto px-4 py-8 border-e ${rule}`} aria-label={copy.share.title}>
          {navItems.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => goTo(item.id)}
              className={`text-start px-3 py-2 rounded-lg text-sm transition-colors ${dark ? "text-stone-400 hover:text-stone-100 hover:bg-white/5" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"}`}
            >
              {item.label}
            </button>
          ))}
          <a href="https://www.sundae.io/demo" className="mt-3 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-[#FF5C4D] hover:bg-[#C2410C] text-white text-sm font-semibold transition-colors">
            {copy.share.book} <ArrowUpRight className="w-3.5 h-3.5 rtl:-scale-x-100" aria-hidden />
          </a>
        </nav>

        <main className="flex-1 min-w-0 overflow-y-auto px-4 sm:px-6 py-8 space-y-4">
          <div>
            <p className={`text-xs font-semibold uppercase tracking-wider ${muted}`}>{company || copy.share.operationFallback}</p>
            <h1 className={`text-2xl sm:text-3xl font-bold mt-1 ${heading}`}>{copy.share.title}</h1>
            <p className={`text-sm mt-1.5 ${body}`}>{report.profileLine}</p>
          </div>

          <section id="summary" className="scroll-mt-4">
            <div className={`rounded-2xl border p-5 ${dark ? "border-white/10 bg-gradient-to-br from-[#FF5C4D]/[0.07] to-transparent" : "border-gray-200 bg-white"}`}>
              <p className={`text-[15px] leading-relaxed ${dark ? "text-stone-200" : "text-gray-700"}`}>{report.summary}</p>
              <div className={`mt-4 pt-4 border-t flex flex-wrap items-center gap-2 ${rule}`}>
                <Target className={`w-4 h-4 ${accent}`} aria-hidden />
                <span className={`text-xs font-semibold uppercase tracking-wider ${muted}`}>{copy.report.packageTitle}</span>
                <span className={`text-sm font-bold ${heading}`}>{report.tierFit}</span>
              </div>
            </div>
          </section>

          <Section id="leaks" icon={TrendingDown} title={copy.report.leaksTitle} dark={dark} open={openIds.has("leaks")} onToggle={() => toggle("leaks")}>
            <p className={`text-xs mb-3 ${muted}`}>{copy.report.leaksNote}</p>
            <div className="space-y-3">
              {report.topLeaks.map((leak, index) => (
                <div key={index} className={inner}>
                  <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border mb-2 ${rule} ${muted}`}>{copy.report.hypothesis}</span>
                  <h3 className={`text-sm font-bold mb-1 ${heading}`}>{leak.title}</h3>
                  <p className={`text-sm leading-relaxed ${body}`}>{leak.detail}</p>
                  {!v2 && leak.impactCopy && <p className={`text-xs mt-2.5 pt-2.5 border-t ${rule} ${muted}`}>{leak.impactCopy}</p>}
                </div>
              ))}
            </div>
          </Section>

          {v2 && (
            <Section id="recovery" icon={RefreshCcw} title={copy.report.recoveryTitle} dark={dark} open={openIds.has("recovery")} onToggle={() => toggle("recovery")}>
              <p className={`text-sm mb-3 ${body}`}>{v2.recovery.intro}</p>
              <div className="space-y-3">
                {v2.recovery.items.map((item) => (
                  <div key={item.leakId} className={inner}>
                    <h3 className={`text-sm font-bold mb-2 ${heading}`}>{item.title}</h3>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2 text-sm">
                      {[
                        [copy.report.recoveryWatch, item.watch],
                        [copy.report.recoveryData, item.data],
                        [copy.report.recoveryOwner, item.owner],
                        [copy.report.recoveryMeasure, item.measure],
                      ].map(([term, value]) => (
                        <div key={term}>
                          <dt className={label}>{term}</dt>
                          <dd className={`mt-0.5 ${body}`}>{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
              <p className={`text-xs mt-3 italic ${muted}`}>{v2.recovery.note}</p>
            </Section>
          )}

          {v2?.crew && (
            <Section id="crew" icon={Users} title={copy.report.crewTitle} dark={dark} open={openIds.has("crew")} onToggle={() => toggle("crew")}>
              <p className={`text-sm ${body}`}>{v2.crew.sentence}</p>
              <p className={`${label} mt-4`}>{copy.report.crewFlagged}</p>
              <p className={`text-sm mt-1 ${body}`}>{v2.crew.flagged.join(" · ")}</p>
              <p className={`${label} mt-4`}>{copy.report.crewCoveredBy}</p>
              <p className={`text-sm font-bold mt-1 ${accent}`}>{v2.crew.packageName}</p>
              <ul className="mt-2 space-y-1">
                {v2.crew.covers.map((item) => (
                  <li key={item} className={`flex gap-2 text-sm ${body}`}>
                    <Check className={`w-4 h-4 shrink-0 mt-0.5 ${dark ? "text-emerald-400" : "text-emerald-600"}`} aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              {v2.crew.notes.map((note) => (
                <p key={note} className={`text-xs mt-2 ${muted}`}>{note}</p>
              ))}
            </Section>
          )}

          {v2 && (
            <Section id="package" icon={Layers} title={copy.report.packageTitle} dark={dark} open={openIds.has("package")} onToggle={() => toggle("package")}>
              <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-3">
                <div className="space-y-3">
                  <div className={inner}>
                    <p className={label}>{copy.report.corePackage}</p>
                    <p className={`text-base font-bold mt-1 ${heading}`}>{v2.startingPackage.core.name}</p>
                    <p className={`text-sm mt-1 ${body}`}>{v2.startingPackage.core.covers.join(" · ")}</p>
                  </div>
                  <div className={inner}>
                    <p className={label}>{copy.report.includedTitle}</p>
                    <ul className="mt-2 space-y-2">
                      {v2.startingPackage.included.map((item) => (
                        <li key={item.name} className="flex gap-2 text-sm">
                          <Check className={`w-4 h-4 shrink-0 mt-0.5 ${dark ? "text-emerald-400" : "text-emerald-600"}`} aria-hidden />
                          <span><span className={`font-semibold ${heading}`}>{item.name}</span> <span className={body}>{item.description}</span></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {v2.startingPackage.crew && (
                    <div className={inner}>
                      <p className={label}>{copy.report.crewPackage}</p>
                      <p className={`text-base font-bold mt-1 ${heading}`}>{v2.startingPackage.crew.name}</p>
                    </div>
                  )}
                  {v2.startingPackage.addOns.length > 0 && (
                    <div className={inner}>
                      <p className={label}>{copy.report.addOnsTitle}</p>
                      {v2.startingPackage.addOns.map((addOn) => (
                        <p key={addOn.name} className={`text-sm mt-1.5 ${body}`}>
                          <span className={`font-semibold ${heading}`}>{addOn.name}</span>
                          {addOn.price && <span className={`ms-2 font-semibold ${accent}`}>{addOn.price}</span>} - {addOn.detail}
                        </p>
                      ))}
                    </div>
                  )}
                  {v2.startingPackage.concepts.length > 0 && (
                    <div className={inner}>
                      <p className={label}>{copy.report.conceptsTitle}</p>
                      <p className={`text-sm mt-1 font-semibold ${heading}`}>{v2.startingPackage.concepts.join(" · ")}</p>
                    </div>
                  )}
                  {v2.startingPackage.notes.map((note) => (
                    <p key={note} className={`text-xs ${muted}`}>{note}</p>
                  ))}
                </div>
                <div className={`rounded-xl border-2 p-4 h-fit ${dark ? "border-[#FF5C4D]/40 bg-[#FF5C4D]/[0.05]" : "border-[#FF5C4D]/30 bg-[#FF5C4D]/[0.03]"}`}>
                  <p className={label}>{copy.report.priceTitle}</p>
                  <p className={`text-sm mt-1 ${body}`}>{v2.startingPackage.price.locationsLabel}</p>
                  {v2.startingPackage.price.kind === "list" ? (
                    <>
                      <dl className="mt-3 space-y-1.5 text-sm">
                        {v2.startingPackage.price.lines.map((line) => (
                          <div key={line.label} className="flex justify-between gap-3">
                            <dt className={body}>{line.label}</dt>
                            <dd className={`font-semibold tabular-nums whitespace-nowrap ${heading}`}>{line.amount}</dd>
                          </div>
                        ))}
                        <div className={`flex justify-between gap-3 pt-2 border-t ${rule}`}>
                          <dt className={`font-bold ${heading}`}>{copy.report.priceTotal}</dt>
                          <dd className={`text-lg font-bold tabular-nums whitespace-nowrap ${heading}`}>{v2.startingPackage.price.total}</dd>
                        </div>
                      </dl>
                      <p className={`text-[11px] mt-2 ${muted}`}>{v2.startingPackage.price.basis}</p>
                    </>
                  ) : (
                    <>
                      <p className={`text-lg font-bold mt-3 ${heading}`}>{v2.startingPackage.price.label}</p>
                      <p className={`text-[11px] mt-2 ${muted}`}>{v2.startingPackage.price.basis}</p>
                    </>
                  )}
                  <a href={v2.startingPackage.calculatorUrl} target="_blank" rel="noopener" className={`mt-3 flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-semibold ${dark ? "border-white/15 hover:bg-white/5" : "border-gray-300 hover:bg-gray-100"}`}>
                    {copy.report.calculator} <ArrowUpRight className="w-3.5 h-3.5 rtl:-scale-x-100" aria-hidden />
                  </a>
                </div>
              </div>
            </Section>
          )}

          {!v2 && (report.expectedImpact?.length ?? 0) > 0 && (
            <Section id="measures" icon={Gauge} title={copy.share.legacyMeasuresTitle} dark={dark} open={openIds.has("measures")} onToggle={() => toggle("measures")}>
              <dl className={`divide-y ${dark ? "divide-white/10" : "divide-gray-100"}`}>
                {report.expectedImpact!.map((row, index) => (
                  <div key={index} className="py-2.5">
                    <dt className={`text-sm font-semibold ${heading}`}>{row.metric}</dt>
                    <dd className={`text-sm mt-0.5 ${muted}`}>{row.range}</dd>
                  </div>
                ))}
              </dl>
            </Section>
          )}

          {!v2 && (report.recommendedStack?.length ?? 0) > 0 && (
            <Section id="stack" icon={Layers} title={copy.share.legacyStackTitle} dark={dark} open={openIds.has("stack")} onToggle={() => toggle("stack")}>
              <div className="space-y-3">
                {report.recommendedStack!.map((item, index) => (
                  <div key={index}>
                    <p className={`text-sm font-bold ${accent}`}>{item.label}</p>
                    <p className={`text-sm mt-0.5 ${body}`}>{item.why}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          <Section id="plan" icon={CalendarClock} title={copy.report.planTitle} dark={dark} open={openIds.has("plan")} onToggle={() => toggle("plan")}>
            <div className="space-y-3">
              {report.quickWins.map((win) => (
                <div key={win.horizon} className="flex gap-3">
                  <span className={`shrink-0 inline-flex h-7 items-center justify-center rounded-full text-xs font-bold px-2.5 ${dark ? "bg-[#FF5C4D]/15 text-[#FF8473]" : "bg-[#FF5C4D]/10 text-[#C2410C]"}`}>
                    {fill(copy.report.dayLabel, { day: win.horizon })}
                  </span>
                  <div className="min-w-0">
                    <p className={`text-sm font-semibold ${heading}`}>{win.title}</p>
                    <p className={`text-sm mt-0.5 ${body}`}>{win.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <div className={`lg:hidden rounded-2xl border p-5 text-center ${dark ? "border-white/10 bg-white/[0.02]" : "border-gray-200 bg-white"}`}>
            <p className={`text-sm ${body}`}>{copy.share.mobileCta}</p>
            <a href="https://www.sundae.io/demo" className="inline-flex items-center gap-1.5 mt-3 px-5 py-2.5 rounded-xl bg-[#FF5C4D] hover:bg-[#C2410C] text-white text-sm font-bold transition-colors">
              {copy.share.book} <ArrowUpRight className="w-4 h-4 rtl:-scale-x-100" aria-hidden />
            </a>
          </div>
          <p className={`text-[11px] leading-relaxed text-center pb-4 ${dark ? "text-stone-500" : "text-gray-500"}`}>{copy.share.footer}</p>
        </main>
      </div>
    </div>
  );
}
