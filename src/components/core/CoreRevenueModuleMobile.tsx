'use client';

/**
 * Faithful implementation of "02 · Module overview — the scalable template ·
 * Revenue Intelligence" (the Revenue module deep-dive) from the Claude Design
 * Core / Decision Intelligence phone mockups — dark variant. Answer-first health
 * verdict, a 4-up KPI matrix (label · value · delta · spark · why), a full-bleed
 * revenue-trend chart card (answer line + this-week-vs-prior area chart + a
 * Drill / Discuss / Expand thumb row + visual pager), and a "where it came from"
 * daypart breakdown. Same cool-slate token set as the crew screens.
 * Sits inside <PhoneFrame screenBg="#020617">. Pure markup.
 *
 * Source: claude.ai/design · Core mobile slice, Row 02 "Revenue module" (dark variant).
 *
 * Money: the slice is authored in AED. We render the locale's own currency at
 * runtime via crewMoney (GBP base integers, FX-converted). The daypart column is
 * a summing column, so its parts use crewConv and the verdict/headline total is
 * derived with crewFmt to stay reconciled. Percentages, counts and the "why"
 * micro-notes stay numeric; arrow glyphs (▲▼) are kept verbatim.
 */

import { useCrewScreen } from '../crew/crewI18n';
import { crewMoney, crewConv, crewFmt, crewCurrencyCode } from '../crew/crewCurrency';
import { LOC } from './locales/CoreRevenueModuleMobile.locales';

const EN = {
  moduleTitle: 'Revenue Intelligence',
  scopeMeta: 'Marina Social · 7 days',
  verdictHealthy: 'Healthy',
  verdictBody: 'this week, ahead of plan. Bar & mains carried it; delivery dragged.',
  kpiNetRevenue: 'Net revenue',
  kpiAvgCheck: 'Avg check',
  kpiCovers: 'Covers',
  kpiRevpash: 'RevPASH',
  whyBar: 'why: bar ▲18%',
  whyMainsUpsell: 'why: mains upsell',
  whyWeekendFull: 'why: weekend full',
  whySlowTurns: 'why: slow turns',
  chartAnswerLead: 'Revenue is pacing',
  chartAnswerTail: '— ▲6.4% on last week, led by the bar.',
  satPeak: 'Sat ·',
  axisMon: 'Mon',
  axisWed: 'Wed',
  axisFri: 'Fri',
  axisSun: 'Sun',
  legendThisWeek: 'This week',
  legendPriorWeek: 'Prior week',
  drill: 'Drill',
  discuss: 'Discuss',
  pagerCaption: 'Revenue trend · 1 / 7',
  whereItCameFrom: 'Where it came from',
  byDaypart: 'by daypart',
  dpDinner: 'Dinner',
  dpLunch: 'Lunch',
  dpBar: 'Bar',
  dpDelivery: 'Delivery',
  setRevenueAlert: 'Set a revenue alert',
} as const;

const T = {
  bg: '#020617',
  surf: '#0f172a',
  surf2: '#0b1424',
  bd: '#1e293b',
  tx: '#f1f5f9',
  tx2: '#94a3b8',
  tx3: '#64748b',
  pos: '#22c55e',
  posk: '#4ade80',
  post: 'rgba(34,197,94,.14)',
  warn: '#f59e0b',
  warnk: '#fbbf24',
  neg: '#ef4444',
  negk: '#f87171',
  info: '#3b82f6',
  acc: '#34d399',
  acck: '#04140c',
  trk: '#1e293b',
  violet: '#8b5cf6',
} as const;
const FONT = 'Inter, ui-sans-serif, system-ui, sans-serif';

/** One KPI cell: uppercase label, big value, delta chip + sparkline, "why" note. */
function Kpi({
  label,
  value,
  delta,
  deltaColor,
  spark,
  sparkColor,
  why,
}: {
  label: string;
  value: string;
  delta: string;
  deltaColor: string;
  spark: string;
  sparkColor: string;
  why: string;
}) {
  return (
    <div style={{ background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 14, padding: 12 }}>
      <div style={{ font: `600 10.5px ${FONT}`, letterSpacing: '.06em', textTransform: 'uppercase', color: T.tx3 }}>
        {label}
      </div>
      <div style={{ font: `700 19px ${FONT}`, color: T.tx, marginTop: 4 }}>{value}</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
        <span style={{ font: `600 11.5px ${FONT}`, color: deltaColor }}>{delta}</span>
        <svg width="56" height="20" viewBox="0 0 56 20" fill="none">
          <polyline
            points={spark}
            stroke={sparkColor}
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div style={{ font: `500 10.5px ${FONT}`, color: T.tx3, marginTop: 6 }}>{why}</div>
    </div>
  );
}

/** One daypart row: label + amount·delta, then a fill bar. */
function DaypartRow({
  label,
  amount,
  delta,
  deltaColor,
  width,
  barColor,
}: {
  label: string;
  amount: string;
  delta: string;
  deltaColor: string;
  width: number;
  barColor: string;
}) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ font: `600 12.5px ${FONT}`, color: T.tx }}>{label}</span>
        <span style={{ font: `600 12.5px ${FONT}`, color: deltaColor }}>
          {amount} · {delta}
        </span>
      </div>
      <div style={{ height: 8, borderRadius: 99, background: T.trk, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${width}%`, borderRadius: 99, background: barColor }} />
      </div>
    </div>
  );
}

export function CoreRevenueModuleMobile() {
  const { t, locale } = useCrewScreen(EN, LOC);

  // Daypart parts (GBP base, FX-converted) — summing column → crewConv parts,
  // crewFmt for the derived total so dayparts reconcile to the verdict/headline.
  const dpDinner = crewConv(locale, 134000);
  const dpLunch = crewConv(locale, 68000);
  const dpBar = crewConv(locale, 40000);
  const dpDelivery = crewConv(locale, 17000);
  const totalRevenue = dpDinner + dpLunch + dpBar + dpDelivery;
  const totalRevenueFmt = crewFmt(locale, totalRevenue);

  return (
    <div style={{ background: T.bg, color: T.tx, fontFamily: FONT, padding: '8px 14px 16px' }}>
      {/* header: back · title + scope · discuss bell */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          paddingBottom: 10,
          borderBottom: `1px solid ${T.bd}`,
        }}
      >
        <button
          type="button"
          aria-label="Back"
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
          <div style={{ font: `700 16px ${FONT}`, color: T.tx }}>{t.moduleTitle}</div>
          <div style={{ font: `500 11px ${FONT}`, color: T.tx3 }}>
            {/* currency code follows the locale (AED on the en/ar demo tenant) */}
            {t.scopeMeta} · {crewCurrencyCode(locale)}
          </div>
        </div>
        <button
          type="button"
          aria-label="Discuss"
          style={{
            position: 'relative',
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
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 3.5h10v7H7l-3 2.5V10.5H3v-7z" stroke={T.tx2} strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          <span
            style={{
              position: 'absolute',
              top: 5,
              right: 5,
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: T.neg,
              border: `1.5px solid ${T.surf}`,
            }}
          />
        </button>
      </div>

      {/* verdict */}
      <div
        style={{
          marginTop: 14,
          borderRadius: 18,
          border: `1px solid ${T.bd}`,
          background: `linear-gradient(180deg, ${T.post}, transparent 70%), ${T.surf}`,
          padding: '15px 16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <span style={{ font: `700 24px ${FONT}`, letterSpacing: '-.02em', color: T.posk, lineHeight: 1 }}>
            {t.verdictHealthy}
          </span>
          <span style={{ font: `600 14px ${FONT}`, color: T.pos }}>▲ 6.4%</span>
        </div>
        <div style={{ font: `400 13px ${FONT}`, lineHeight: 1.5, color: T.tx2, marginTop: 7 }}>
          {totalRevenueFmt} {t.verdictBody}
        </div>
      </div>

      {/* KPI matrix */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9, marginTop: 13 }}>
        <Kpi
          label={t.kpiNetRevenue}
          value={crewMoney(locale, 260000)}
          delta="▲ 6.4%"
          deltaColor={T.posk}
          spark="0,16 9,14 18,15 27,10 36,11 45,6 56,3"
          sparkColor={T.pos}
          why={t.whyBar}
        />
        <Kpi
          label={t.kpiAvgCheck}
          value={crewMoney(locale, 46)}
          delta="▲ 4.1%"
          deltaColor={T.posk}
          spark="0,15 9,13 18,12 27,12 36,9 45,8 56,5"
          sparkColor={T.pos}
          why={t.whyMainsUpsell}
        />
        <Kpi
          label={t.kpiCovers}
          value="5,648"
          delta="▲ 1.9%"
          deltaColor={T.tx2}
          spark="0,12 9,13 18,10 27,11 36,10 45,9 56,9"
          sparkColor={T.tx2}
          why={t.whyWeekendFull}
        />
        <Kpi
          label={t.kpiRevpash}
          value={crewMoney(locale, 9)}
          delta="▼ 0.8%"
          deltaColor={T.warnk}
          spark="0,8 9,9 18,8 27,11 36,10 45,12 56,12"
          sparkColor={T.warn}
          why={t.whySlowTurns}
        />
      </div>

      {/* chart card */}
      <div style={{ marginTop: 18, background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 18, overflow: 'hidden' }}>
        {/* answer line + discuss */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, padding: '14px 15px 8px' }}>
          <div style={{ flex: 1, minWidth: 0, font: `600 15px ${FONT}`, lineHeight: 1.35, color: T.tx }}>
            {t.chartAnswerLead} <span style={{ color: T.posk }}>{crewMoney(locale, 260000)}</span> {t.chartAnswerTail}
          </div>
          <button
            type="button"
            aria-label="Discuss"
            style={{
              position: 'relative',
              flex: 'none',
              width: 30,
              height: 30,
              borderRadius: 9,
              border: `1px solid ${T.bd}`,
              background: T.surf2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M3 3.5h10v7H7l-3 2.5V10.5H3v-7z" stroke={T.tx2} strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            <span
              style={{
                position: 'absolute',
                top: -3,
                right: -3,
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: T.neg,
                color: '#fff',
                font: `700 8px ${FONT}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1.5px solid ${T.surf}`,
              }}
            >
              2
            </span>
          </button>
        </div>

        {/* area chart: this-week solid + prior-week dashed + Sat marker */}
        <div style={{ padding: '2px 12px 6px' }}>
          <div style={{ position: 'relative', height: 132 }}>
            <svg width="100%" height="132" viewBox="0 0 360 132" preserveAspectRatio="none" fill="none">
              <line x1="0" y1="34" x2="360" y2="34" stroke={T.bd} strokeWidth="1" strokeDasharray="3 5" />
              <line x1="0" y1="74" x2="360" y2="74" stroke={T.bd} strokeWidth="1" strokeDasharray="3 5" />
              <path d="M0 96 L52 88 L104 92 L156 70 L208 74 L260 52 L312 40 L360 30 L360 132 L0 132 Z" fill={T.acc} fillOpacity="0.13" />
              <path
                d="M0 96 L52 88 L104 92 L156 70 L208 74 L260 52 L312 40 L360 30"
                stroke={T.acc}
                strokeWidth="2.4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M0 104 L52 100 L104 102 L156 98 L208 100 L260 92 L312 90 L360 86"
                stroke={T.tx3}
                strokeWidth="1.6"
                strokeDasharray="4 4"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            <div style={{ position: 'absolute', left: '72%', top: 0, bottom: 18, width: 1.5, background: T.acc, opacity: 0.5 }} />
            <div
              style={{
                position: 'absolute',
                left: '72%',
                top: 30,
                transform: 'translate(-50%,-115%)',
                background: T.bg,
                border: `1px solid ${T.acc}`,
                borderRadius: 8,
                padding: '4px 8px',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ font: `700 11px ${FONT}`, color: T.tx }}>
                {t.satPeak} {crewMoney(locale, 46000)}
              </span>
            </div>
          </div>
          {/* x-axis */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 2px 0' }}>
            <span style={{ font: `500 10px ${FONT}`, color: T.tx3 }}>{t.axisMon}</span>
            <span style={{ font: `500 10px ${FONT}`, color: T.tx3 }}>{t.axisWed}</span>
            <span style={{ font: `500 10px ${FONT}`, color: T.tx3 }}>{t.axisFri}</span>
            <span style={{ font: `500 10px ${FONT}`, color: T.tx3 }}>{t.axisSun}</span>
          </div>
          {/* legend */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 8, padding: '0 2px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: `500 11px ${FONT}`, color: T.tx2 }}>
              <span style={{ width: 14, height: 3, borderRadius: 2, background: T.acc }} />
              {t.legendThisWeek}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: `500 11px ${FONT}`, color: T.tx3 }}>
              <span style={{ width: 14, height: 0, borderTop: `2px dashed ${T.tx3}` }} />
              {t.legendPriorWeek}
            </span>
          </div>
        </div>

        {/* thumb row: Drill / Discuss / Expand */}
        <div style={{ display: 'flex', gap: 7, padding: '11px 12px 12px', borderTop: `1px solid ${T.bd}`, background: T.surf2 }}>
          <button
            type="button"
            style={{
              flex: 1,
              minHeight: 40,
              borderRadius: 11,
              border: 'none',
              background: T.acc,
              color: T.acck,
              font: `700 12.5px ${FONT}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              cursor: 'pointer',
            }}
          >
            {t.drill} <span style={{ fontSize: 14 }}>↗</span>
          </button>
          <button
            type="button"
            style={{
              flex: 1,
              minHeight: 40,
              borderRadius: 11,
              border: `1px solid ${T.bd}`,
              background: T.surf,
              color: T.tx2,
              font: `600 12.5px ${FONT}`,
              cursor: 'pointer',
            }}
          >
            {t.discuss}
          </button>
          <button
            type="button"
            aria-label="Expand"
            style={{
              flex: 'none',
              width: 44,
              minHeight: 40,
              borderRadius: 11,
              border: `1px solid ${T.bd}`,
              background: T.surf,
              color: T.tx2,
              font: `700 15px ${FONT}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            ⤢
          </button>
        </div>

        {/* visual pager */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px 0 12px' }}>
          <span style={{ width: 16, height: 5, borderRadius: 3, background: T.acc }} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <span key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: T.bd }} />
          ))}
          <span style={{ font: `500 10.5px ${FONT}`, color: T.tx3, marginLeft: 5 }}>{t.pagerCaption}</span>
        </div>
      </div>

      {/* where it came from · by daypart */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '20px 4px 11px' }}>
        <span style={{ font: `600 11px ${FONT}`, letterSpacing: '.1em', textTransform: 'uppercase', color: T.tx2 }}>
          {t.whereItCameFrom}
        </span>
        <span style={{ font: `600 11px ${FONT}`, color: T.tx3 }}>{t.byDaypart}</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 11,
          background: T.surf,
          border: `1px solid ${T.bd}`,
          borderRadius: 16,
          padding: '14px 15px',
        }}
      >
        <DaypartRow label={t.dpDinner} amount={crewFmt(locale, dpDinner)} delta="▲9%" deltaColor={T.tx2} width={82} barColor={T.acc} />
        <DaypartRow label={t.dpLunch} amount={crewFmt(locale, dpLunch)} delta="▲3%" deltaColor={T.tx2} width={48} barColor={T.info} />
        <DaypartRow label={t.dpBar} amount={crewFmt(locale, dpBar)} delta="▲18%" deltaColor={T.tx2} width={32} barColor={T.violet} />
        <DaypartRow label={t.dpDelivery} amount={crewFmt(locale, dpDelivery)} delta="▼12%" deltaColor={T.negk} width={16} barColor={T.warn} />
      </div>

      {/* thumb-zone action */}
      <button
        type="button"
        style={{
          width: '100%',
          minHeight: 52,
          marginTop: 16,
          border: 'none',
          borderRadius: 16,
          background: T.acc,
          color: T.acck,
          font: `700 15px ${FONT}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 9,
          boxShadow: '0 14px 30px -8px rgba(52,211,153,.45)',
          cursor: 'pointer',
        }}
      >
        {t.setRevenueAlert}
      </button>
    </div>
  );
}
