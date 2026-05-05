"use client";

import {
  MockupFrame,
  MockupKPI,
  MockupPaceBar,
  MockupAlert,
} from "@/components/ui/MockupFrame";
import { HeroLiveKPI } from "./HeroLiveKPI";

/**
 * Hero mockup — Pulse "shift command" view at 11:14am Tuesday, Downtown.
 *
 * Aligns with homepage-spec-v1.1 §1 mockup spec and threads the same
 * operational scene picked up by the §6 4D scroll-scene later in the page.
 *
 * Animation discipline: ONE live tile (Revenue Today) ticks every 6s with a
 * 200–600ms green flash. Reduced-motion fallback disables the tick and the
 * green status dot, leaving the initial composed state visible.
 */
export function HeroPulseMockup() {
  return (
    <MockupFrame label="Pulse — Lunch Service · Downtown" glow>
      <div className="space-y-4">
        {/* Header — context + live indicator */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-semibold">
              Tuesday · 11:14 AM
            </div>
            <div className="text-sm font-semibold text-[var(--text-primary)] mt-0.5">
              218 covers · pacing +6% vs target
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#22C55E]/15 text-[#22C55E] text-[10px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
            LIVE
          </span>
        </div>

        {/* KPI row — Revenue Today is the live ticker */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <HeroLiveKPI
            label="Revenue today"
            initialValue={14820}
            prefix="$"
            trend="+6% vs target"
            trendUp
          />
          <MockupKPI
            label="Labor cost"
            value="28.4%"
            trend="On baseline"
            trendUp
            color="#22C55E"
          />
          <MockupKPI label="Covers" value="218" trend="vs 196 LW" trendUp color="#1C47FF" />
          <MockupKPI
            label="Pacing index"
            value="1.04"
            trend="Above plan"
            trendUp
            color="#22C55E"
          />
        </div>

        {/* Pace bar — revenue progress vs lunch target */}
        <MockupPaceBar
          label="Lunch revenue pacing"
          current={14820}
          target={18000}
          unit="$"
        />

        {/* Exception list — Watchtower + server upsell */}
        <div className="space-y-2">
          <MockupAlert type="warning">
            <span className="font-semibold">Server #4 upsell -22%</span> this
            shift — pair with senior server for the next two tables.
          </MockupAlert>
          <MockupAlert type="info">
            <span className="font-semibold">Watchtower:</span> 2-block office
            tower has a fire drill scheduled 11–12. Expect a brief dip.
          </MockupAlert>
        </div>

        {/* Sundae Coach card — adjusted v1.1 copy (no "cut" language) */}
        <MockupAlert type="coach">
          <span className="font-semibold">Sundae Coach:</span> adjust one
          line-cook shift from 11–2 if coverage allows. Push the $11.99 lunch
          combo via your loyalty app. <span className="opacity-80">Projected
          impact: recover part of the gap if executed before lunch peak.</span>
        </MockupAlert>
      </div>
    </MockupFrame>
  );
}
