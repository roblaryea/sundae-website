"use client";

/**
 * App-styled, shareable diagnostic report. Deliberately reads like an
 * in-product Sundae surface (top bar, section rail, collapsible cards,
 * light/dark) rather than a marketing page — it's the full depth the teaser
 * email links to. Self-contained light/dark toggle so it works standalone.
 */

import { useState } from "react";
import {
  Sun, Moon, ChevronDown, TrendingDown, Gauge, Layers,
  CalendarClock, Sparkles, ArrowUpRight, Target,
} from "lucide-react";

type Leak = { title: string; detail: string; impactBand: "high" | "medium" | "low"; impactCopy: string };
export type DiagnosticReport = {
  profileLine: string;
  summary: string;
  topLeaks: Leak[];
  recommendedStack: { label: string; why: string; detail?: string }[];
  expectedImpact: { metric: string; range: string }[];
  quickWins: { horizon: "30" | "60" | "90"; title: string; detail: string }[];
  tierFit: string;
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
  id, icon: Icon, title, subtitle, dark, defaultOpen = false, children,
}: {
  id: string; icon: typeof TrendingDown; title: string; subtitle?: string;
  dark: boolean; defaultOpen?: boolean; children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section id={id} className="scroll-mt-24">
      <div
        className={`rounded-2xl border overflow-hidden transition-colors ${
          dark ? "border-white/10 bg-white/[0.02]" : "border-gray-200 bg-white"
        }`}
      >
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center gap-3 px-5 py-4 text-left"
          aria-expanded={open}
        >
          <span className={`grid place-items-center w-9 h-9 rounded-lg ${dark ? "bg-blue-500/15 text-blue-300" : "bg-blue-50 text-blue-600"}`}>
            <Icon className="w-4 h-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className={`block text-sm font-bold ${dark ? "text-slate-100" : "text-gray-900"}`}>{title}</span>
            {subtitle && <span className={`block text-xs mt-0.5 ${dark ? "text-slate-400" : "text-gray-500"}`}>{subtitle}</span>}
          </span>
          <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${open ? "rotate-180" : ""} ${dark ? "text-slate-500" : "text-gray-400"}`} />
        </button>
        {open && <div className={`px-5 pb-5 pt-1 ${dark ? "" : ""}`}>{children}</div>}
      </div>
    </section>
  );
}

export function DiagnosticReportView({
  report, company, name,
}: {
  report: DiagnosticReport; company?: string | null; name?: string | null;
}) {
  const [dark, setDark] = useState(true);
  const band = dark ? BAND.dark : BAND.light;
  const muted = dark ? "text-slate-400" : "text-gray-500";
  const body = dark ? "text-slate-300" : "text-gray-600";
  const heading = dark ? "text-slate-100" : "text-gray-900";
  const rule = dark ? "border-white/10" : "border-gray-200";

  const navItems = [
    { id: "summary", label: "Summary" },
    { id: "leaks", label: "Margin leaks" },
    { id: "impact", label: "What it's worth" },
    { id: "stack", label: "Recommended stack" },
    { id: "plan", label: "30 / 60 / 90" },
  ];

  return (
    <div className={dark ? "dark" : ""}>
      <div className={`min-h-screen transition-colors ${dark ? "bg-[#020617] text-slate-100" : "bg-gray-50 text-gray-900"}`}>
        {/* App top bar */}
        <header className={`sticky top-0 z-20 backdrop-blur border-b ${dark ? "bg-[#020617]/80 border-white/10" : "bg-white/80 border-gray-200"}`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="text-lg font-extrabold tracking-tight">sundae<span className="text-blue-500">.</span></span>
              <span className={`hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${dark ? "bg-blue-500/15 text-blue-300" : "bg-blue-50 text-blue-600"}`}>
                <Sparkles className="w-3 h-3" /> Operations Diagnostic
              </span>
            </div>
            <button
              onClick={() => setDark((d) => !d)}
              className={`grid place-items-center w-9 h-9 rounded-lg border transition-colors ${dark ? "border-white/10 hover:bg-white/5 text-slate-300" : "border-gray-200 hover:bg-gray-100 text-gray-600"}`}
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-[200px_minmax(0,1fr)] gap-8">
          {/* Section rail */}
          <nav className="hidden lg:block">
            <div className="sticky top-20 space-y-1">
              {navItems.map((n) => (
                <a key={n.id} href={`#${n.id}`} className={`block px-3 py-2 rounded-lg text-sm transition-colors ${dark ? "text-slate-400 hover:text-slate-100 hover:bg-white/5" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"}`}>
                  {n.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Report canvas */}
          <main className="space-y-4 min-w-0">
            {/* Hero */}
            <div>
              <p className={`text-xs font-semibold uppercase tracking-wider ${muted}`}>{company || "Your operation"}</p>
              <h1 className={`text-2xl sm:text-3xl font-bold mt-1 ${heading}`}>Operations Diagnostic</h1>
              <p className={`text-sm mt-1.5 ${body}`}>{report.profileLine}</p>
            </div>

            {/* Summary (always open) */}
            <section id="summary" className="scroll-mt-24">
              <div className={`rounded-2xl border p-5 ${dark ? "border-white/10 bg-gradient-to-br from-blue-500/[0.07] to-transparent" : "border-gray-200 bg-white"}`}>
                <p className={`text-[15px] leading-relaxed ${dark ? "text-slate-200" : "text-gray-700"}`}>{report.summary}</p>
                <div className={`mt-4 pt-4 border-t flex flex-wrap items-center gap-2 ${rule}`}>
                  <Target className={`w-4 h-4 ${dark ? "text-blue-300" : "text-blue-600"}`} />
                  <span className={`text-xs font-semibold uppercase tracking-wider ${muted}`}>Recommended tier</span>
                  <span className={`text-sm font-bold ${heading}`}>{report.tierFit}</span>
                </div>
              </div>
            </section>

            {/* Leaks (open) */}
            <Section id="leaks" icon={TrendingDown} title="Where the margin is leaking" subtitle={`${report.topLeaks.length} prioritised hypotheses`} dark={dark} defaultOpen>
              <div className="space-y-3 mt-2">
                {report.topLeaks.map((l, i) => (
                  <div key={i} className={`rounded-xl border p-4 ${rule} ${dark ? "bg-white/[0.02]" : "bg-gray-50/50"}`}>
                    <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border mb-2 ${band[l.impactBand]}`}>
                      {l.impactBand} impact
                    </span>
                    <h3 className={`text-sm font-bold mb-1 ${heading}`}>{l.title}</h3>
                    <p className={`text-sm leading-relaxed mb-2.5 ${body}`}>{l.detail}</p>
                    <p className={`text-xs pt-2.5 border-t ${rule} ${muted}`}>
                      <span className={`font-semibold ${dark ? "text-slate-300" : "text-gray-700"}`}>Typical range:</span> {l.impactCopy}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Expected impact */}
            <Section id="impact" icon={Gauge} title="What it's worth" subtitle="Directional ranges from comparable operators" dark={dark}>
              <dl className={`divide-y mt-1 ${dark ? "divide-white/10" : "divide-gray-100"}`}>
                {report.expectedImpact.map((row, i) => (
                  <div key={i} className="py-2.5">
                    <dt className={`text-sm font-semibold ${dark ? "text-slate-200" : "text-gray-800"}`}>{row.metric}</dt>
                    <dd className={`text-sm mt-0.5 ${muted}`}>{row.range}</dd>
                  </div>
                ))}
              </dl>
            </Section>

            {/* Recommended stack */}
            <Section id="stack" icon={Layers} title="Recommended stack" subtitle={`${report.recommendedStack.length} layers`} dark={dark}>
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

            {/* 30/60/90 */}
            <Section id="plan" icon={CalendarClock} title="Your 30 / 60 / 90 plan" subtitle="Sequenced for fastest payback" dark={dark}>
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

            {/* Footer CTA + disclaimer */}
            <div className={`rounded-2xl border p-5 text-center ${dark ? "border-white/10 bg-white/[0.02]" : "border-gray-200 bg-white"}`}>
              <p className={`text-sm ${body}`}>Want to see these surfaces on your real data?</p>
              <a href="https://www.sundae.io/contact" className="inline-flex items-center gap-1.5 mt-3 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors">
                Book a walkthrough <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
            <p className={`text-[11px] leading-relaxed text-center ${dark ? "text-slate-600" : "text-gray-400"}`}>
              Generated by Sundae AI from {name ? `${name.split(" ")[0]}'s` : "your"} diagnostic answers. Directional ranges from comparable operator engagements — not customer-specific projections.
            </p>
          </main>
        </div>
      </div>
    </div>
  );
}
