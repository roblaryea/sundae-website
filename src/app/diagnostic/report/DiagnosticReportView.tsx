"use client";

/**
 * App-styled, shareable diagnostic report. Renders as a self-contained
 * full-viewport surface (fixed inset-0) so it reads like an in-product Sundae
 * screen — independent of the marketing site's chrome/theme — with a frozen
 * section rail, an internally-scrolling report canvas, working light/dark, and
 * collapsible sections that the rail can open + scroll to.
 */

import { useState } from "react";
import {
  Sun, Moon, ChevronDown, TrendingDown, Gauge, Layers,
  CalendarClock, Sparkles, ArrowUpRight, Target, Wallet, CheckCircle2,
} from "lucide-react";
import type { WebsiteLocale } from "@/lib/i18n";
import { getDiagnosticCopy } from "@/lib/diagnostic/i18n";

type Leak = { title: string; detail: string; impactBand: "high" | "medium" | "low"; impactCopy: string };
export type DiagnosticReport = {
  profileLine: string;
  summary: string;
  topLeaks: Leak[];
  recommendedStack: { label: string; why: string; detail?: string }[];
  expectedImpact: { metric: string; range: string }[];
  quickWins: { horizon: "30" | "60" | "90"; title: string; detail: string }[];
  tierFit: string;
  economics?: {
    monthlyCost: { range: string; basis: string };
    monthlySavings: { range: string; basis: string };
    ebitdaUplift: { pctRange: string; amountRange: string; basis: string };
    softUplifts: { label: string; detail: string }[];
  };
};

const BAND = {
  light: {
    high: "bg-red-50 text-red-600 border-red-200",
    medium: "bg-blue-50 text-blue-600 border-blue-200",
    low: "bg-gray-100 text-gray-500 border-gray-200",
  },
  dark: {
    high: "bg-red-500/15 text-red-300 border-red-500/30",
    medium: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    low: "bg-white/5 text-slate-400 border-white/10",
  },
};

function Section({
  id, icon: Icon, title, subtitle, dark, open, onToggle, children,
}: {
  id: string; icon: typeof TrendingDown; title: string; subtitle?: string;
  dark: boolean; open: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-4">
      <div className={`rounded-2xl border overflow-hidden transition-colors ${dark ? "border-white/10 bg-white/[0.02]" : "border-gray-200 bg-white"}`}>
        <button onClick={onToggle} className="w-full flex items-center gap-3 px-5 py-4 text-left" aria-expanded={open}>
          <span className={`grid place-items-center w-9 h-9 rounded-lg ${dark ? "bg-blue-500/15 text-blue-300" : "bg-blue-50 text-blue-600"}`}>
            <Icon className="w-4 h-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className={`block text-sm font-bold ${dark ? "text-slate-100" : "text-gray-900"}`}>{title}</span>
            {subtitle && <span className={`block text-xs mt-0.5 ${dark ? "text-slate-400" : "text-gray-500"}`}>{subtitle}</span>}
          </span>
          <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${open ? "rotate-180" : ""} ${dark ? "text-slate-500" : "text-gray-400"}`} />
        </button>
        {open && <div className="px-5 pb-5 pt-1">{children}</div>}
      </div>
    </section>
  );
}

export function DiagnosticReportView({
  report, company, name, locale,
}: {
  report: DiagnosticReport;
  company?: string | null;
  name?: string | null;
  locale: WebsiteLocale;
}) {
  const copy = getDiagnosticCopy(locale);
  const [dark, setDark] = useState(true);
  // Collapsible section state lifted here so the rail can open + scroll to a
  // section. Summary is always open (not collapsible). Leaks open by default.
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set(["leaks"]));

  const toggle = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const goTo = (id: string) => {
    setOpenIds((prev) => new Set(prev).add(id));
    // let the section expand first, then scroll it into view within the canvas
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 70);
  };

  const band = dark ? BAND.dark : BAND.light;
  const muted = dark ? "text-slate-400" : "text-gray-500";
  const body = dark ? "text-slate-300" : "text-gray-600";
  const heading = dark ? "text-slate-100" : "text-gray-900";
  const rule = dark ? "border-white/10" : "border-gray-200";

  const navItems = [
    { id: "summary", label: copy.share.navSummary },
    { id: "leaks", label: copy.share.navLeaks },
    { id: "impact", label: copy.share.navImpact },
    { id: "stack", label: copy.share.navStack },
    { id: "plan", label: copy.share.navPlan },
  ];
  if (report.economics) navItems.push({ id: "economics", label: copy.share.navEconomics });

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col transition-colors ${dark ? "bg-[#020617] text-slate-100" : "bg-gray-50 text-gray-900"}`}
      style={{ colorScheme: dark ? "dark" : "light" }}
      lang={locale}
      dir={copy.dir}
    >
      {/* App top bar */}
      <header className={`shrink-0 border-b ${dark ? "bg-[#020617] border-white/10" : "bg-white border-gray-200"}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-lg font-extrabold tracking-tight">sundae<span className="text-blue-500">.</span></span>
            <span className={`hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${dark ? "bg-blue-500/15 text-blue-300" : "bg-blue-50 text-blue-600"}`}>
              <Sparkles className="w-3 h-3" /> {copy.share.title}
            </span>
          </div>
          <button
            onClick={() => setDark((d) => !d)}
            className={`grid place-items-center w-9 h-9 rounded-lg border transition-colors ${dark ? "border-white/10 hover:bg-white/5 text-slate-300" : "border-gray-200 hover:bg-gray-100 text-gray-600"}`}
            aria-label={copy.share.darkToggle}
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Body: frozen rail + scrolling canvas */}
      <div className="flex-1 min-h-0 w-full max-w-6xl mx-auto flex">
        {/* Frozen section rail */}
        <nav className={`hidden lg:flex flex-col gap-1 w-[210px] shrink-0 overflow-y-auto px-4 py-8 border-r ${dark ? "border-white/10" : "border-gray-200"}`}>
          {navItems.map((n) => (
            <button
              key={n.id}
              onClick={() => goTo(n.id)}
              className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${dark ? "text-slate-400 hover:text-slate-100 hover:bg-white/5" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"}`}
            >
              {n.label}
            </button>
          ))}
          <a
            href="https://www.sundae.io/contact"
            className="mt-3 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
          >
            {copy.share.book} <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </nav>

        {/* Scrolling report canvas */}
        <main className="flex-1 min-w-0 overflow-y-auto px-4 sm:px-6 py-8 space-y-4">
          {/* Hero */}
          <div>
            <p className={`text-xs font-semibold uppercase tracking-wider ${muted}`}>{company || copy.share.operationFallback}</p>
            <h1 className={`text-2xl sm:text-3xl font-bold mt-1 ${heading}`}>{copy.share.title}</h1>
            <p className={`text-sm mt-1.5 ${body}`}>{report.profileLine}</p>
          </div>

          {/* Summary (always open) */}
          <section id="summary" className="scroll-mt-4">
            <div className={`rounded-2xl border p-5 ${dark ? "border-white/10 bg-gradient-to-br from-blue-500/[0.07] to-transparent" : "border-gray-200 bg-white"}`}>
              <p className={`text-[15px] leading-relaxed ${dark ? "text-slate-200" : "text-gray-700"}`}>{report.summary}</p>
              <div className={`mt-4 pt-4 border-t flex flex-wrap items-center gap-2 ${rule}`}>
                <Target className={`w-4 h-4 ${dark ? "text-blue-300" : "text-blue-600"}`} />
                <span className={`text-xs font-semibold uppercase tracking-wider ${muted}`}>{copy.share.recommendedTier}</span>
                <span className={`text-sm font-bold ${heading}`}>{report.tierFit}</span>
              </div>
            </div>
          </section>

          <Section id="leaks" icon={TrendingDown} title={copy.share.leaksTitle} subtitle={copy.share.leaksSubtitle(report.topLeaks.length)} dark={dark} open={openIds.has("leaks")} onToggle={() => toggle("leaks")}>
            <div className="space-y-3 mt-2">
              {report.topLeaks.map((l, i) => (
                <div key={i} className={`rounded-xl border p-4 ${rule} ${dark ? "bg-white/[0.02]" : "bg-gray-50/50"}`}>
                  <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border mb-2 ${band[l.impactBand]}`}>
                    {l.impactBand} {copy.report.impactSuffix}
                  </span>
                  <h3 className={`text-sm font-bold mb-1 ${heading}`}>{l.title}</h3>
                  <p className={`text-sm leading-relaxed mb-2.5 ${body}`}>{l.detail}</p>
                  <p className={`text-xs pt-2.5 border-t ${rule} ${muted}`}>
                    <span className={`font-semibold ${dark ? "text-slate-300" : "text-gray-700"}`}>{copy.share.typicalRange}</span> {l.impactCopy}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="impact" icon={Gauge} title={copy.share.impactTitle} subtitle={copy.share.impactSubtitle} dark={dark} open={openIds.has("impact")} onToggle={() => toggle("impact")}>
            <dl className={`divide-y mt-1 ${dark ? "divide-white/10" : "divide-gray-100"}`}>
              {report.expectedImpact.map((row, i) => (
                <div key={i} className="py-2.5">
                  <dt className={`text-sm font-semibold ${dark ? "text-slate-200" : "text-gray-800"}`}>{row.metric}</dt>
                  <dd className={`text-sm mt-0.5 ${muted}`}>{row.range}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section id="stack" icon={Layers} title={copy.share.stackTitle} subtitle={copy.share.stackSubtitle(report.recommendedStack.length)} dark={dark} open={openIds.has("stack")} onToggle={() => toggle("stack")}>
            <div className="space-y-3 mt-1">
              {report.recommendedStack.map((s, i) => (
                <div key={i} className={`pb-3 ${i < report.recommendedStack.length - 1 ? `border-b ${rule}` : ""}`}>
                  <p className={`text-sm font-bold ${dark ? "text-blue-300" : "text-blue-700"}`}>{s.label}</p>
                  <p className={`text-sm mt-0.5 ${body}`}>{s.why}</p>
                  {s.detail && <p className={`text-xs mt-1 ${muted}`}>{s.detail}</p>}
                </div>
              ))}
            </div>
          </Section>

          <Section id="plan" icon={CalendarClock} title={copy.share.planTitle} subtitle={copy.share.planSubtitle} dark={dark} open={openIds.has("plan")} onToggle={() => toggle("plan")}>
            <div className="space-y-3 mt-1">
              {report.quickWins.map((w, i) => (
                <div key={i} className="flex gap-3">
                  <span className={`shrink-0 inline-flex h-7 min-w-[2.75rem] items-center justify-center rounded-full text-xs font-bold px-2 ${dark ? "bg-blue-500/15 text-blue-300" : "bg-blue-50 text-blue-700"}`}>{w.horizon}d</span>
                  <div className="min-w-0">
                    <p className={`text-sm font-semibold ${heading}`}>{w.title}</p>
                    <p className={`text-sm mt-0.5 ${body}`}>{w.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {report.economics && (
            <Section id="economics" icon={Wallet} title={copy.share.economicsTitle} subtitle={copy.share.economicsSubtitle} dark={dark} open={openIds.has("economics")} onToggle={() => toggle("economics")}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1">
                {[
                  { label: copy.report.monthlyCost, value: report.economics.monthlyCost.range, basis: report.economics.monthlyCost.basis },
                  { label: copy.report.monthlySavings, value: report.economics.monthlySavings.range, basis: report.economics.monthlySavings.basis },
                  { label: copy.report.ebitdaUplift, value: report.economics.ebitdaUplift.amountRange, sub: report.economics.ebitdaUplift.pctRange, basis: report.economics.ebitdaUplift.basis },
                ].map((c) => (
                  <div key={c.label} className={`rounded-xl border p-3.5 ${dark ? "border-white/10 bg-white/[0.02]" : "border-gray-200 bg-gray-50"}`}>
                    <p className={`text-[11px] font-bold uppercase tracking-wide ${muted}`}>{c.label}</p>
                    <p className={`text-base font-bold mt-1 ${heading}`}>{c.value}</p>
                    {c.sub && <p className={`text-xs font-semibold mt-0.5 ${dark ? "text-blue-300" : "text-blue-700"}`}>{c.sub}</p>}
                    <p className={`text-[11px] mt-1.5 ${muted}`}>{c.basis}</p>
                  </div>
                ))}
              </div>
              {report.economics.softUplifts.length > 0 && (
                <div className={`mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2`}>
                  {report.economics.softUplifts.map((u, i) => (
                    <div key={i} className="flex gap-2">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${dark ? "text-emerald-400" : "text-emerald-600"}`} />
                      <div>
                        <p className={`text-sm font-semibold ${heading}`}>{u.label}</p>
                        <p className={`text-xs ${body}`}>{u.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Section>
          )}

          {/* Footer CTA — mobile only (the frozen rail carries it on desktop, so it never duplicates) */}
          <div className={`lg:hidden rounded-2xl border p-5 text-center ${dark ? "border-white/10 bg-white/[0.02]" : "border-gray-200 bg-white"}`}>
            <p className={`text-sm ${body}`}>{copy.share.mobileCta}</p>
            <a href="https://www.sundae.io/contact" className="inline-flex items-center gap-1.5 mt-3 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors">
              {copy.share.book} <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
          <p className={`text-[11px] leading-relaxed text-center pb-4 ${dark ? "text-slate-600" : "text-gray-400"}`}>
            {copy.share.footer(name)}
          </p>
        </main>
      </div>
    </div>
  );
}
