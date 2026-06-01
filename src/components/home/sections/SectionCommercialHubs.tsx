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

type HubKind = "physical" | "footprint" | "expanding";

type Hub = {
  city: string;
  region: string;
  kind: HubKind;
};

const HUBS: Hub[] = [
  // Physical operations — team on the ground
  { city: "Amsterdam", region: "Europe", kind: "physical" },
  { city: "Dubai",     region: "MEA",    kind: "physical" },
  // Legal & commercial footprint — entities, contracts, partner networks
  { city: "United States", region: "Delaware C-Corp", kind: "footprint" },
  { city: "Canada",        region: "Operating base",  kind: "footprint" },
  // Expansion markets — coming soon, strategic priority
  { city: "Singapore",   region: "APAC",  kind: "expanding" },
  { city: "Tokyo",       region: "APAC",  kind: "expanding" },
  { city: "Mexico City", region: "LATAM", kind: "expanding" },
  { city: "São Paulo",   region: "LATAM", kind: "expanding" },
];

const sectionIcons: Record<string, SundaeIconName> = {
  Europe: "balance",
  Americas: "chart",
  Canada: "chart",
  MEA: "watchtower",
  APAC: "speed",
  LATAM: "performance",
};

const KIND_META: Record<HubKind, {
  label: string;
  dot: string;
  cardBg: string;
  cardBorder: string;
  cardBorderHover: string;
  iconBg: string;
  iconBorder: string;
  iconColor: string;
  textColor: string;
}> = {
  physical: {
    label: "Physical team",
    dot: "bg-emerald-400",
    cardBg: "bg-white/[0.025]",
    cardBorder: "border-[var(--border-default)]",
    cardBorderHover: "hover:border-emerald-500/30",
    iconBg: "bg-emerald-500/12",
    iconBorder: "border-emerald-500/20",
    iconColor: "text-emerald-300",
    textColor: "text-[var(--text-primary)]",
  },
  footprint: {
    label: "Legal & commercial footprint",
    dot: "bg-[#60A5FA]",
    cardBg: "bg-white/[0.02]",
    cardBorder: "border-[var(--border-default)]",
    cardBorderHover: "hover:border-[#60A5FA]/30",
    iconBg: "bg-[#60A5FA]/12",
    iconBorder: "border-[#60A5FA]/20",
    iconColor: "text-[#60A5FA]",
    textColor: "text-[var(--text-primary)]",
  },
  expanding: {
    label: "Expanding into",
    dot: "bg-[var(--text-muted)]",
    cardBg: "bg-white/[0.015]",
    cardBorder: "border-dashed border-[var(--border-default)]",
    cardBorderHover: "hover:border-[rgba(28,71,255,0.25)]",
    iconBg: "bg-[rgba(28,71,255,0.08)]",
    iconBorder: "border-[rgba(28,71,255,0.15)]",
    iconColor: "text-[#60A5FA]/70",
    textColor: "text-[var(--text-secondary)]",
  },
};

export function SectionCommercialHubs() {
  const physical = HUBS.filter((h) => h.kind === "physical");
  const footprint = HUBS.filter((h) => h.kind === "footprint");
  const expanding = HUBS.filter((h) => h.kind === "expanding");

  const renderRow = (hubs: Hub[], kind: HubKind, showAsterisk = false) => {
    const meta = KIND_META[kind];
    return (
      <div className="mb-6">
        <p className="eyebrow text-center mb-3 text-[var(--text-muted)]">
          <span className={`inline-block w-1.5 h-1.5 rounded-full ${meta.dot} mr-2 align-middle`} />
          {meta.label}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
          {hubs.map((hub) => (
            <div
              key={hub.city}
              className={`text-center p-4 rounded-xl border transition-colors ${meta.cardBg} ${meta.cardBorder} ${meta.cardBorderHover}`}
            >
              <div className={`inline-flex w-8 h-8 rounded-lg border items-center justify-center mb-2 ${meta.iconBg} ${meta.iconBorder}`}>
                <SundaeIcon
                  name={sectionIcons[hub.region] ?? "data"}
                  size="sm"
                  className={meta.iconColor}
                />
              </div>
              <div className={`text-sm font-bold mb-0.5 leading-tight ${meta.textColor}`}>
                {hub.city}
                {showAsterisk && <span className="text-[#60A5FA] ml-0.5">*</span>}
              </div>
              <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                {hub.region}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section
      aria-labelledby="commercial-hubs-headline"
      className="relative py-14 px-4 sm:px-6 lg:px-8 border-y border-[var(--border-default)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(28,71,255,0.03),transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <FadeUp className="text-center mb-8">
          <p className="eyebrow mb-3">WHERE SUNDAE SHOWS UP</p>
          <h3
            id="commercial-hubs-headline"
            className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] text-balance"
          >
            Built across continents, operating where it counts.
          </h3>
          <p className="text-sm text-[var(--text-muted)] mt-2 max-w-2xl mx-auto">
            Two operating hubs today, a legal &amp; commercial footprint
            spanning North America, with strategic expansion underway across
            APAC and LATAM.
          </p>
        </FadeUp>

        {renderRow(physical, "physical")}
        {renderRow(footprint, "footprint")}
        {renderRow(expanding, "expanding", true)}

        <p className="text-[10px] text-center text-[var(--text-muted)] mt-2 italic max-w-2xl mx-auto">
          <span className="text-[#60A5FA]">*</span> Expansion markets are
          strategic priorities on the roadmap; engagement begins from existing
          hubs. Legal &amp; commercial footprint reflects entity registration
          and partner network, not on-the-ground team.
        </p>
      </div>
    </section>
  );
}
