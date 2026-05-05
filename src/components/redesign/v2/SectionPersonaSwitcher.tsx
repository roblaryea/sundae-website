"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  PulseDashboardMockup,
  RevenueIntelligenceMockup,
  IntelligenceChatMockup,
  InsightsModuleMockup,
  LaborOpsMockup,
  IntegrationsHubMockup,
} from "@/components/ui/MockupFrame";

/**
 * Section 2 — Persona Switcher (homepage-spec-v1.1).
 *
 * Conversion job: personalize by role. Six personas. Tab switching cross-fades
 * the content card and mockup so the buyer sees "their" view of Sundae within
 * 5 seconds of self-identifying.
 *
 * Reduced-motion fallback: instant content swap on tab change. No transition.
 *
 * Mockup mapping:
 *   COO         → PulseDashboardMockup (existing — live ops)
 *   CFO         → RevenueIntelligenceMockup (bespoke — Insights:Revenue, channel mix, variance)
 *   CEO         → IntelligenceChatMockup (existing — executive briefing)
 *   Marketing   → InsightsModuleMockup (existing — modular ROI)
 *   HR/People   → LaborOpsMockup (bespoke — labor variance, OT risk)
 *   Tech/Data   → IntegrationsHubMockup (bespoke — data health, sources)
 *
 * Claims used: CLM-401 through CLM-406 (all observational, APPROVED PUBLIC).
 */

interface Persona {
  id: string;
  shortLabel: string;     // tab text
  pluralLabel: string;    // for the H2 — "See Sundae for [Plural]"
  pain: string;           // pain headline
  painCopy: string;
  outcome: string;        // outcome headline
  outcomeCopy: string;
  intelLayers: string[];  // chip text
  Mockup: React.ComponentType;
}

const personas: Persona[] = [
  {
    id: "coo",
    shortLabel: "COO",
    pluralLabel: "Operations Leaders",
    pain: "You can't be in every restaurant at once.",
    painCopy:
      "By the time the weekly recap lands, the bad shift is over and the margin is gone.",
    outcome: "Live visibility into every shift.",
    outcomeCopy:
      "Pulse shows you which location needs help right now — pacing, labor, leakage, all updated through the shift.",
    intelLayers: ["Pulse", "Watchtower"],
    Mockup: PulseDashboardMockup,
  },
  {
    id: "cfo",
    shortLabel: "CFO",
    pluralLabel: "Finance & FP&A Leads",
    pain: "Three days to close the books is three days too many.",
    painCopy:
      "Variance shows up in last month's P&L. By then the costs have already been booked.",
    outcome: "Margin variance, the day it happens.",
    outcomeCopy:
      "Shift-level labor cost, food cost variance, void rates — connected to the events that caused them. Close faster, explain more.",
    intelLayers: ["Insights", "Foresight"],
    Mockup: RevenueIntelligenceMockup,
  },
  {
    id: "ceo",
    shortLabel: "CEO",
    pluralLabel: "CEOs and Owners",
    pain: "Your worst location is invisible until Thursday's recap.",
    painCopy: "By the time you see it, three more days of margin have leaked.",
    outcome: "Portfolio truth, every morning.",
    outcomeCopy:
      "Daily AI briefings across every brand and location. Where you're winning, where you're leaking, what the market did to you, what to do today.",
    intelLayers: ["Sundae Intelligence", "Benchmarks"],
    Mockup: IntelligenceChatMockup,
  },
  {
    id: "marketing",
    shortLabel: "Marketing",
    pluralLabel: "Marketing Leads",
    pain: "By the time you measure the campaign, the budget is already spent.",
    painCopy:
      "ROI lands a week late. Next month's plan goes in before this month's data does.",
    outcome: "Campaign ROI, day-by-day.",
    outcomeCopy:
      "Tie campaign spend to covers, average check, and net margin — within 24 hours of activation. Re-allocate while the campaign is still running.",
    intelLayers: ["Insights", "Sundae Intelligence"],
    Mockup: InsightsModuleMockup,
  },
  {
    id: "hr",
    shortLabel: "HR / People",
    pluralLabel: "HR and People Leads",
    pain: "Labor variance shows up too late.",
    painCopy:
      "Schedule changes happen on instinct. By the time the report comes back, the OT is already paid.",
    outcome: "Labor variance, in the moment.",
    outcomeCopy:
      "Pulse shows live labor% by location, server productivity, and overtime risk — by shift, not by month.",
    intelLayers: ["Pulse", "Insights"],
    Mockup: LaborOpsMockup,
  },
  {
    id: "tech",
    shortLabel: "Tech",
    pluralLabel: "Tech and Data Leads",
    pain: "Twelve vendor APIs. Five data formats. Zero unified schema.",
    painCopy:
      "Every new dashboard request becomes a six-week integration project.",
    outcome: "One platform, twelve domains, zero plumbing.",
    outcomeCopy:
      "POS, labor, inventory, delivery, accounting, reservations — unified into 179 governed data models. RBAC, audit trails, public API, webhooks. Out of the box.",
    intelLayers: ["All layers"],
    Mockup: IntegrationsHubMockup,
  },
];

export function SectionPersonaSwitcher() {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string>(personas[0].id);
  const active = personas.find((p) => p.id === activeId) ?? personas[0];
  const ActiveMockup = active.Mockup;

  return (
    <section
      aria-labelledby="persona-headline"
      className="relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
          <div className="eyebrow mb-4">ONE PLATFORM. EVERY ROLE.</div>
          <h2 id="persona-headline" className="section-h2 text-balance">
            See Sundae for{" "}
            <span className="text-[var(--electric-blue)]">
              {active.pluralLabel}
            </span>
            .
          </h2>
        </div>

        {/* Tab list */}
        <div
          role="tablist"
          aria-label="Choose your role"
          className="flex flex-wrap justify-center gap-2 mb-10 sm:mb-12 overflow-x-auto pb-2"
        >
          {personas.map((p) => {
            const isActive = p.id === activeId;
            return (
              <button
                key={p.id}
                role="tab"
                type="button"
                id={`persona-tab-${p.id}`}
                aria-selected={isActive}
                aria-controls={`persona-panel-${p.id}`}
                onClick={() => setActiveId(p.id)}
                className={`
                  px-4 sm:px-5 py-2.5 rounded-full text-sm font-semibold
                  whitespace-nowrap transition-all duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--electric-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--navy-deep)]
                  ${
                    isActive
                      ? "bg-[var(--electric-blue)] text-white shadow-[0_0_20px_rgba(28,71,255,0.4)]"
                      : "bg-[var(--surface-subtle)] border border-[var(--border-default)] text-[var(--text-supporting)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] hover:border-[var(--border-emphasis)]"
                  }
                `}
              >
                {p.shortLabel}
              </button>
            );
          })}
        </div>

        {/* Active panel — content card + mockup */}
        <div
          role="tabpanel"
          id={`persona-panel-${active.id}`}
          aria-labelledby={`persona-tab-${active.id}`}
          className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-8 lg:gap-12 items-center max-w-6xl mx-auto"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${active.id}-card`}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-subtle)] p-6 sm:p-8 lg:p-10"
            >
              {/* Pain */}
              <div className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-semibold mb-2">
                Today
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] leading-tight mb-2">
                {active.pain}
              </h3>
              <p className="body-base mb-6">{active.painCopy}</p>

              {/* Outcome */}
              <div className="pt-5 border-t border-[var(--border-default)]">
                <div className="text-[11px] uppercase tracking-wider text-[var(--electric-blue)] font-bold mb-2">
                  With Sundae
                </div>
                <h4 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] leading-tight mb-2">
                  {active.outcome}
                </h4>
                <p className="body-base mb-5">{active.outcomeCopy}</p>

                {/* Intel layer chips */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-semibold">
                    Intelligence:
                  </span>
                  {active.intelLayers.map((layer) => (
                    <span
                      key={layer}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-[var(--electric-blue)]/15 text-[var(--electric-blue)] border border-[var(--electric-blue)]/25"
                    >
                      {layer}
                    </span>
                  ))}
                </div>

                <Button href="/demo" variant="primary" size="md">
                  See the {active.shortLabel} demo →
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mockup */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${active.id}-mock`}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ActiveMockup />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
