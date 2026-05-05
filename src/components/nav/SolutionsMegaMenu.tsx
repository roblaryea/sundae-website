"use client";

import Link from "next/link";
import { ROLE_META, SEGMENT_META, type SolutionMeta } from "./solutionsMeta";
import { REPORT_APP_URL } from "@/lib/urls";

interface NavLink {
  name: string;
  href: string;
}

interface SolutionsMegaMenuProps {
  segments: ReadonlyArray<NavLink>;
  roles: ReadonlyArray<NavLink>;
  bySegmentLabel: string;
  byRoleLabel: string;
  comparePlansLabel: string;
  startFreeLabel: string;
  localizeHref: (href: string) => string;
  onClose: () => void;
}

/**
 * Desktop Solutions mega-menu. Card-based layout with icons + value-prop
 * descriptions per role/segment, footer CTAs for compare plans + free
 * benchmark. Width tuned to fit the segment column (4 items, 2×2) alongside
 * the role column (6 items, 2×3) without crowding.
 */
export function SolutionsMegaMenu({
  segments,
  roles,
  bySegmentLabel,
  byRoleLabel,
  comparePlansLabel,
  startFreeLabel,
  localizeHref,
  onClose,
}: SolutionsMegaMenuProps) {
  return (
    <div className="bg-[var(--navy)]/95 backdrop-blur-xl rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.4)] border border-[var(--border-default)] p-6 sm:p-7 animate-dropdown-in">
      <div className="grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-x-8">
        {/* By Segment */}
        <div>
          <div className="eyebrow text-[var(--text-muted)] mb-4">
            {bySegmentLabel}
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {segments.map((s) => {
              const meta = SEGMENT_META[s.href];
              if (!meta) return null;
              return (
                <SolutionCard
                  key={s.href}
                  href={localizeHref(s.href)}
                  name={s.name}
                  meta={meta}
                  onClose={onClose}
                />
              );
            })}
          </div>
        </div>

        {/* By Role */}
        <div>
          <div className="eyebrow text-[var(--text-muted)] mb-4">
            {byRoleLabel}
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {roles.map((r) => {
              const meta = ROLE_META[r.href];
              if (!meta) return null;
              return (
                <SolutionCard
                  key={r.href}
                  href={localizeHref(r.href)}
                  name={r.name}
                  meta={meta}
                  onClose={onClose}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer — Compare Plans + Free Benchmark */}
      <div className="mt-6 pt-5 border-t border-[var(--border-default)] flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <Link
          href={localizeHref("/report-vs-core")}
          onClick={onClose}
          className="text-sm font-medium text-[var(--text-supporting)] hover:text-[var(--text-primary)] transition-colors"
        >
          {comparePlansLabel}
        </Link>
        <a
          href={REPORT_APP_URL}
          onClick={onClose}
          className="text-sm font-semibold text-[var(--electric-blue)] hover:text-[var(--text-primary)] transition-colors"
        >
          {startFreeLabel} →
        </a>
      </div>
    </div>
  );
}

function SolutionCard({
  href,
  name,
  meta,
  onClose,
}: {
  href: string;
  name: string;
  meta: SolutionMeta;
  onClose: () => void;
}) {
  const { Icon, description } = meta;
  return (
    <Link
      href={href}
      onClick={onClose}
      className="group flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--surface-hover)] transition-all duration-200"
    >
      <div className="w-9 h-9 rounded-md bg-[var(--electric-blue)]/15 text-[var(--electric-blue)] flex items-center justify-center shrink-0 group-hover:bg-[var(--electric-blue)]/25 group-hover:text-white transition-colors duration-200">
        <Icon className="w-[18px] h-[18px]" strokeWidth={2.2} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-[var(--text-primary)] text-sm leading-snug">
          {name}
        </div>
        <div className="mt-0.5 text-[12.5px] text-[var(--text-supporting)] leading-snug">
          {description}
        </div>
      </div>
    </Link>
  );
}
