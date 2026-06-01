"use client";

/**
 * Commercial Hubs strip — regional commercial presence signal.
 *
 * Two-row structure:
 *   • Operating today: cities/countries where Sundae has live commercial activity
 *   • Coming soon: strategic expansion markets with explicit "coming soon" markers
 *
 * Sits below the technical trust signals (SectionTrustStrip) and complements
 * it: trust = "we're enterprise-grade", hubs = "we're commercially present
 * where you operate". Addresses the marketing-feedback critique about the
 * site reading as "globally vague" without regional commercial anchors.
 *
 * Copy is English-only by design — translations come through the i18n
 * pipeline workstream once copy is locked.
 */

import { FadeUp } from "@/components/ui/PageAnimations";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";

type Hub = {
  city: string;
  region: string;
  /**
   * If true, hub is on the active commercial footprint.
   * If false, hub is a coming-soon strategic anchor.
   */
  active: boolean;
};

const HUBS: Hub[] = [
  // Operating today
  { city: "Amsterdam", region: "Europe", active: true },
  { city: "United States", region: "Americas", active: true },
  { city: "Toronto", region: "Canada", active: true },
  { city: "Dubai", region: "MEA", active: true },
  // Coming soon — strategic expansion markets
  { city: "Singapore", region: "APAC", active: false },
  { city: "Tokyo", region: "APAC", active: false },
  { city: "Mexico City", region: "LATAM", active: false },
  { city: "São Paulo", region: "LATAM", active: false },
];

const sectionIcons: Record<string, SundaeIconName> = {
  Europe: "balance",
  Americas: "chart",
  Canada: "chart",
  MEA: "watchtower",
  APAC: "speed",
  LATAM: "performance",
};

export function SectionCommercialHubs() {
  const activeHubs = HUBS.filter((h) => h.active);
  const comingHubs = HUBS.filter((h) => !h.active);

  return (
    <section
      aria-labelledby="commercial-hubs-headline"
      className="relative py-14 px-4 sm:px-6 lg:px-8 border-y border-[var(--border-default)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(28,71,255,0.03),transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <FadeUp className="text-center mb-8">
          <p className="eyebrow mb-3">COMMERCIAL PRESENCE</p>
          <h3
            id="commercial-hubs-headline"
            className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] text-balance"
          >
            Where Sundae meets you.
          </h3>
          <p className="text-sm text-[var(--text-muted)] mt-2 max-w-2xl mx-auto">
            Live commercial coverage today, with a clear expansion path into the
            world&rsquo;s busiest hospitality regions.
          </p>
        </FadeUp>

        {/* Operating today */}
        <div className="mb-7">
          <p className="eyebrow text-center mb-4 text-[var(--text-muted)]">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 align-middle" />
            Operating today
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
            {activeHubs.map((hub) => (
              <div
                key={hub.city}
                className="text-center p-4 rounded-xl bg-white/[0.025] border border-[var(--border-default)] hover:border-emerald-500/30 transition-colors"
              >
                <div className="inline-flex w-8 h-8 rounded-lg bg-emerald-500/12 border border-emerald-500/20 items-center justify-center mb-2">
                  <SundaeIcon
                    name={sectionIcons[hub.region] ?? "data"}
                    size="sm"
                    className="text-emerald-300"
                  />
                </div>
                <div className="text-sm font-bold text-[var(--text-primary)] mb-0.5 leading-tight">
                  {hub.city}
                </div>
                <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                  {hub.region}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coming soon */}
        <div>
          <p className="eyebrow text-center mb-4 text-[var(--text-muted)]">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] mr-2 align-middle" />
            Coming soon<span className="text-[#60A5FA]">*</span>
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
            {comingHubs.map((hub) => (
              <div
                key={hub.city}
                className="text-center p-4 rounded-xl bg-white/[0.015] border border-dashed border-[var(--border-default)] hover:border-[rgba(28,71,255,0.25)] transition-colors"
              >
                <div className="inline-flex w-8 h-8 rounded-lg bg-[rgba(28,71,255,0.08)] border border-[rgba(28,71,255,0.15)] items-center justify-center mb-2">
                  <SundaeIcon
                    name={sectionIcons[hub.region] ?? "data"}
                    size="sm"
                    className="text-[#60A5FA]/70"
                  />
                </div>
                <div className="text-sm font-bold text-[var(--text-secondary)] mb-0.5 leading-tight">
                  {hub.city}
                  <span className="text-[#60A5FA] ml-0.5">*</span>
                </div>
                <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                  {hub.region}
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-center text-[var(--text-muted)] mt-4 italic">
            <span className="text-[#60A5FA]">*</span> Coming soon — strategic
            expansion markets on the 2026 roadmap.
          </p>
        </div>
      </div>
    </section>
  );
}
