'use client';

/**
 * Faithful implementation of "Sundae Mobile Insights · Drill stack" — the
 * Detail · breakdown-stack drill level (dark variant) from the Claude Design
 * source. The cross-filter path travels with you as removable chips
 * (DIFC › Dinner › Talabat), a per-level hour bar chart, worst-hours rows
 * (each a drill target with a coloured severity rail), and a two-up thumb
 * action row — the detail always ends in an action.
 * Sits inside <PhoneFrame screenBg="#020617">. Pure markup.
 *
 * Source: claude.ai/design · "Sundae Mobile Insights" — section "05 · Drill
 * stack — Glance → Focus → Detail → Act", phone "Detail · breakdown stack · Dark".
 */

import { useCrewScreen } from '../crew/crewI18n';
import { LOC } from './locales/CoreInsightsDrillMobile.locales';

const EN = {
  headerTitle: 'Delivery · by hour',
  headerSub: 'Detail · drill level 3',
  path: 'Path',
  summaryScope: 'DIFC · Dinner · Talabat',
  summaryDelta: '▼ 19%',
  summaryValue: '412 orders',
  worstHours: 'Worst hours — tap to drill',
  row1Title: '9 PM — orders auto-paused',
  row1Sub: 'prep time hit 41 min · SLA breach',
  row1Delta: '▼ 38%',
  row1Count: '28 ord',
  row2Title: '10 PM — recovering',
  row2Sub: 'queue cleared, listing still low',
  row2Delta: '▼ 11%',
  row2Count: '44 ord',
  row3Title: '8 PM — healthy',
  row3Sub: 'on par with last week',
  row3Delta: '▲ 2%',
  row3Count: '96 ord',
  setSlaAlert: 'Set SLA alert',
  logDecision: 'Log decision',
} as const;

const T = {
  bg: '#020617',
  surf: '#0f172a',
  surf2: '#0b1424',
  bd: '#1e293b',
  tx: '#f1f5f9',
  tx2: '#94a3b8',
  tx3: '#64748b',
  acc: '#34d399',
  acck: '#04140c',
  pos: '#22c55e',
  posk: '#4ade80',
  post: 'rgba(34,197,94,.14)',
  warn: '#f59e0b',
  warnk: '#fbbf24',
  neg: '#ef4444',
  negk: '#f87171',
  info: '#3b82f6',
} as const;
const FONT = 'Inter, ui-sans-serif, system-ui, sans-serif';

/** One cross-filter path chip with a removable ✕. */
function PathChip({ label }: { label: string }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        flex: 'none',
        height: 28,
        padding: '0 10px',
        borderRadius: 99,
        background: T.post,
        border: `1px solid ${T.acc}`,
        color: T.tx,
        font: `600 11.5px ${FONT}`,
      }}
    >
      {label}
      <span style={{ color: T.tx3 }}>✕</span>
    </span>
  );
}

/** One worst-hour drill row: severity rail, title/sub, delta + order count. */
function HourRow({
  title,
  sub,
  delta,
  deltaColor,
  count,
  rail,
}: {
  title: string;
  sub: string;
  delta: string;
  deltaColor: string;
  count: string;
  rail: string;
}) {
  return (
    <button
      type="button"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        width: '100%',
        textAlign: 'left',
        background: T.surf,
        border: `1px solid ${T.bd}`,
        borderLeft: `3px solid ${rail}`,
        borderRadius: 13,
        padding: '13px 14px',
        cursor: 'pointer',
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ font: `600 14px ${FONT}`, color: T.tx }}>{title}</div>
        <div style={{ font: `500 11.5px ${FONT}`, color: T.tx3, marginTop: 2 }}>{sub}</div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ font: `700 14px ${FONT}`, color: deltaColor }}>{delta}</div>
        <div style={{ font: `500 11px ${FONT}`, color: T.tx3 }}>{count}</div>
      </div>
    </button>
  );
}

export function CoreInsightsDrillMobile() {
  const { t } = useCrewScreen(EN, LOC);

  // Per-level hour bars (% heights + colours), matching the design's mini chart.
  const bars: { h: number; bg: string; opacity: number }[] = [
    { h: 32, bg: T.info, opacity: 0.6 },
    { h: 44, bg: T.info, opacity: 0.6 },
    { h: 58, bg: T.info, opacity: 0.7 },
    { h: 90, bg: T.neg, opacity: 1 },
    { h: 40, bg: T.warn, opacity: 0.7 },
    { h: 30, bg: T.info, opacity: 0.5 },
  ];
  const hourTicks: { label: string; danger?: boolean }[] = [
    { label: '6p' },
    { label: '7p' },
    { label: '8p' },
    { label: '9p ✕', danger: true },
    { label: '10p' },
    { label: '11p' },
  ];

  return (
    <div style={{ background: T.bg, color: T.tx, fontFamily: FONT, padding: '8px 14px 16px' }}>
      {/* header: back affordance + title/sub */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          type="button"
          style={{
            flex: 'none',
            width: 34,
            height: 34,
            borderRadius: 11,
            border: `1px solid ${T.bd}`,
            background: T.surf,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <svg width="9" height="15" viewBox="0 0 9 15" fill="none">
            <path d="M7 2L2 7.5l5 5.5" stroke={T.tx2} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ font: `700 16px ${FONT}`, color: T.tx }}>{t.headerTitle}</div>
          <div style={{ font: `500 11px ${FONT}`, color: T.tx3 }}>{t.headerSub}</div>
        </div>
      </div>

      {/* cross-filter path chips */}
      <div style={{ paddingBottom: 10, marginTop: 10, borderBottom: `1px solid ${T.bd}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, overflowX: 'auto' }}>
          <span style={{ font: `500 10.5px ${FONT}`, color: T.tx3, flex: 'none' }}>{t.path}</span>
          <PathChip label="DIFC" />
          <span style={{ color: T.tx3, flex: 'none' }}>›</span>
          <PathChip label="Dinner" />
          <span style={{ color: T.tx3, flex: 'none' }}>›</span>
          <PathChip label="Talabat" />
        </div>
      </div>

      {/* summary card: scope + delta + value + hour bar chart */}
      <div style={{ marginTop: 14, background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 16, padding: '14px 15px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <span style={{ font: `600 11px ${FONT}`, letterSpacing: '.06em', textTransform: 'uppercase', color: T.tx3 }}>
            {t.summaryScope}
          </span>
          <span style={{ font: `700 13px ${FONT}`, color: T.negk }}>{t.summaryDelta}</span>
        </div>
        <div style={{ font: `700 22px ${FONT}`, color: T.tx, marginTop: 6 }}>{t.summaryValue}</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 64, marginTop: 12 }}>
          {bars.map((b, i) => (
            <div
              key={i}
              style={{ flex: 1, height: `${b.h}%`, background: b.bg, opacity: b.opacity, borderRadius: '3px 3px 0 0' }}
            />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
          {hourTicks.map((h, i) => (
            <span key={i} style={{ font: `500 10px ${FONT}`, color: h.danger ? T.negk : T.tx3 }}>
              {h.label}
            </span>
          ))}
        </div>
      </div>

      {/* worst hours — drill rows */}
      <div
        style={{
          font: `600 11px ${FONT}`,
          letterSpacing: '.08em',
          textTransform: 'uppercase',
          color: T.tx3,
          margin: '18px 4px 9px',
        }}
      >
        {t.worstHours}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <HourRow
          title={t.row1Title}
          sub={t.row1Sub}
          delta={t.row1Delta}
          deltaColor={T.negk}
          count={t.row1Count}
          rail={T.neg}
        />
        <HourRow
          title={t.row2Title}
          sub={t.row2Sub}
          delta={t.row2Delta}
          deltaColor={T.warnk}
          count={t.row2Count}
          rail={T.warn}
        />
        <HourRow
          title={t.row3Title}
          sub={t.row3Sub}
          delta={t.row3Delta}
          deltaColor={T.posk}
          count={t.row3Count}
          rail={T.pos}
        />
      </div>

      {/* thumb action row — detail always ends in an action */}
      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <button
          type="button"
          style={{
            flex: 1,
            minHeight: 52,
            border: 'none',
            borderRadius: 16,
            background: T.acc,
            color: T.acck,
            font: `700 14px ${FONT}`,
            boxShadow: '0 14px 30px -8px rgba(52,211,153,.45)',
            cursor: 'pointer',
          }}
        >
          {t.setSlaAlert}
        </button>
        <button
          type="button"
          style={{
            flex: 1,
            minHeight: 52,
            border: `1px solid ${T.bd}`,
            borderRadius: 16,
            background: T.surf,
            color: T.tx,
            font: `700 14px ${FONT}`,
            cursor: 'pointer',
          }}
        >
          {t.logDecision}
        </button>
      </div>
    </div>
  );
}
