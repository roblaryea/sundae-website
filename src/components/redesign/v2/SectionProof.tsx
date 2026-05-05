/**
 * Section 7 — Proof (homepage-spec-v1.1).
 *
 * Conversion job: NONE. Stats render in final state — animating credibility
 * numbers undermines them and hides them in screenshot capture. No motion at
 * all in this section. Server-renders, never animates.
 *
 * Stats-only per user direction (CLM-901 deferred, CLM-902 conditional).
 * No pilot quote ships in v1.1. Logo wall is conditionally hidden when
 * zero approved logos exist — at homepage launch this section ships as
 * stats-only and degrades cleanly.
 *
 * Claims used:
 *   CLM-001 (12 data domains) APPROVED PUBLIC
 *   CLM-002 (179 data models) APPROVED PUBLIC
 *   CLM-003 (30+ modules · 14 specialized in current bundle) APPROVED PUBLIC
 *   CLM-004 (Built with inputs from operators representing 250+ locations) APPROVED PUBLIC
 *   CLM-005 (5-min refresh on Core Pro) CAPABILITY CLAIM ONLY · FN-1
 *   CLM-009 (6 intelligence layers) APPROVED PUBLIC — derived from locked taxonomy
 *
 * Excluded:
 *   CLM-901 pilot quote — deferred until named operator approves
 *   CLM-902 logo wall — deferred until at least one approved logo
 */

const stats = [
  {
    value: "12",
    label: "data domains unified",
  },
  {
    value: "179+",
    label: "restaurant-specific data models",
  },
  {
    value: "30+",
    label: "analytics modules",
    footnoteMarker: "†",
  },
  {
    value: "5-min",
    label: "shift refresh on Core Pro",
    footnoteMarker: "*",
  },
];

export function SectionProof() {
  return (
    <section aria-labelledby="proof-headline" className="relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-20 lg:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <div className="eyebrow mb-4">WHAT&apos;S ALREADY SHIPPING</div>
          <h2 id="proof-headline" className="section-h2 text-balance mb-5">
            Built with operators across 500+ restaurant locations.
          </h2>
          <p className="body-lg max-w-2xl mx-auto">
            QSR, casual dining, fine dining, cloud kitchens, and hospitality
            groups helped shape the intelligence layer restaurants actually
            need.
          </p>
        </div>

        <div className="mt-10 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {stats.map((s) => (
            <div
              key={s.label}
              className="text-center p-5 sm:p-7 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border-default)]"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] tabular-nums">
                {s.value}
                {s.footnoteMarker && (
                  <sup className="text-base text-[var(--text-muted)] ml-0.5">
                    {s.footnoteMarker}
                  </sup>
                )}
              </div>
              <div className="mt-2 text-sm sm:text-base text-[var(--text-supporting)]">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-[11px] text-[var(--text-muted)] italic max-w-3xl mx-auto leading-relaxed">
          *Refresh frequency varies by Core tier. See pricing for details.
          {" "}
          †30+ analytics modules across the platform; 14 specialized modules
          included in the current pricing bundle.
        </p>
      </div>
    </section>
  );
}
