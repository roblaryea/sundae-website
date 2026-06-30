'use client';

/**
 * Composed (no design slice) "Core · Benchmarks — Where you rank" glance for the
 * Sundae website Core product pages, in the established cool-slate mobile design
 * language (same token set + conventions as CrewWorkforceHealthMobile and the
 * other Core phone screens). Answer-first percentile verdict, a "how you compare"
 * section of metric rows each with a your-value-vs-market-median bar + marker, a
 * one-line biggest-gap note, and a thumb-zone hand-off action.
 * Sits inside <PhoneFrame screenBg="#020617">. Pure markup.
 *
 * Source: composed to spec in the Core mobile design language (no slice).
 */

import { useCrewScreen } from '../crew/crewI18n';
import { crewMoney } from '../crew/crewCurrency';
import { LOC } from './locales/CoreBenchmarkMobile.locales';

const EN = {
  headerTitle: 'Benchmarks',
  headerSub: '· vs your market',
  verdict: 'Where you rank',
  topPercentile: 'Top 12%',
  inMarket: 'in Dubai casual dining',
  upPlaces: '▲ up 4 places this month',
  vsPeers: 'vs 48 peers',
  howYouCompare: 'How you compare',
  you: 'You',
  median: 'Median',
  metricRevPerCover: 'Revenue / cover',
  metricLaborPct: 'Labor %',
  metricRevpash: 'RevPASH',
  ahead: 'ahead',
  behind: 'behind',
  market: 'market',
  biggestGapLabel: 'Biggest gap',
  biggestGapBody: 'RevPASH trails the top quartile — slow early-evening bar turns.',
  seeFullBenchmarks: 'See full benchmarks',
} as const;

const T = {
  bg: '#020617',
  surf: '#0f172a',
  surf2: '#0b1424',
  bd: '#1e293b',
  tx: '#f1f5f9',
  tx2: '#94a3b8',
  tx3: '#64748b',
  tx4: '#475569',
  acc: '#34d399',
  acck: '#04140c',
  posk: '#4ade80',
  warn: '#f59e0b',
  warnk: '#fbbf24',
  neg: '#f87171',
  info: '#3b82f6',
  track: '#172033',
  bodyTx: '#cbd5e1',
} as const;
const FONT = 'Inter, ui-sans-serif, system-ui, sans-serif';

/**
 * One comparison row: metric label + delta chip, your value vs market median,
 * and a thin track with the market-median tick and the your-position marker.
 * `pos` and `medianPos` are 0–100 positions along the track.
 */
function CompareRow({
  label,
  youValue,
  medianValue,
  youLabel,
  medianLabel,
  deltaText,
  good,
  pos,
  medianPos,
}: {
  label: string;
  youValue: string;
  medianValue: string;
  youLabel: string;
  medianLabel: string;
  deltaText: string;
  good: boolean;
  pos: number;
  medianPos: number;
}) {
  const markerColor = good ? T.acc : T.warnk;
  return (
    <div style={{ padding: '12px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ font: `600 13px ${FONT}`, color: T.tx }}>{label}</span>
        <span style={{ font: `700 11px ${FONT}`, color: markerColor }}>{deltaText}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 5 }}>
        <span style={{ font: `700 16px ${FONT}`, color: T.tx }}>{youValue}</span>
        <span style={{ font: `500 11px ${FONT}`, color: T.tx3 }}>{youLabel}</span>
        <span style={{ font: `500 11px ${FONT}`, color: T.tx4, marginLeft: 'auto' }}>
          {medianLabel} {medianValue}
        </span>
      </div>
      {/* track with median tick + your-position marker */}
      <div style={{ position: 'relative', height: 8, marginTop: 9 }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 3, height: 3, borderRadius: 999, background: T.track }} />
        {/* filled portion from median to your position */}
        <div
          style={{
            position: 'absolute',
            top: 3,
            height: 3,
            borderRadius: 999,
            background: markerColor,
            opacity: 0.5,
            left: `${Math.min(pos, medianPos)}%`,
            width: `${Math.abs(pos - medianPos)}%`,
          }}
        />
        {/* median tick */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: `${medianPos}%`,
            width: 2,
            height: 9,
            borderRadius: 1,
            background: T.tx3,
            transform: 'translateX(-1px)',
          }}
        />
        {/* your marker */}
        <div
          style={{
            position: 'absolute',
            top: -1,
            left: `${pos}%`,
            width: 11,
            height: 11,
            borderRadius: '50%',
            background: markerColor,
            border: `2px solid ${T.surf}`,
            transform: 'translateX(-50%)',
          }}
        />
      </div>
    </div>
  );
}

export function CoreBenchmarkMobile() {
  const { t, locale } = useCrewScreen(EN, LOC);
  return (
    <div style={{ background: T.bg, color: T.tx, fontFamily: FONT, padding: '8px 14px 16px' }}>
      {/* header: org chip + bell */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            background: T.surf,
            border: `1px solid ${T.bd}`,
            borderRadius: 999,
            padding: '5px 10px 5px 5px',
          }}
        >
          <span
            style={{
              width: 20,
              height: 20,
              borderRadius: 6,
              background: T.acc,
              color: T.acck,
              font: `800 10px ${FONT}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            S
          </span>
          <span style={{ font: `600 12px ${FONT}`, color: T.tx }}>Sundae — DIFC</span>
          <svg width="11" height="11" viewBox="0 0 15 15" fill="none">
            <path d="M4 6l3.5 3.5L11 6" stroke={T.tx3} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path d="M5 8a5 5 0 0110 0c0 4 1.5 5 1.5 5h-13S5 12 5 8z" stroke={T.tx2} strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M8.5 16a1.6 1.6 0 003 0" stroke={T.tx2} strokeWidth="1.5" />
        </svg>
      </div>

      {/* title */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '14px 2px 0' }}>
        <span style={{ font: `700 20px ${FONT}`, letterSpacing: '-.02em' }}>{t.headerTitle}</span>
        <span style={{ font: `500 12px ${FONT}`, color: T.tx3 }}>{t.headerSub}</span>
      </div>

      {/* answer-first verdict */}
      <div
        style={{
          marginTop: 12,
          background: `linear-gradient(135deg, rgba(52,211,153,.16), transparent)`,
          border: `1px solid ${T.bd}`,
          borderRadius: 18,
          padding: 16,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: T.acc }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ font: `700 10px ${FONT}`, letterSpacing: '.09em', textTransform: 'uppercase', color: T.tx3 }}>
            {t.verdict}
          </span>
          <span
            style={{
              font: `600 10px ${FONT}`,
              color: T.tx2,
              background: T.surf,
              border: `1px solid ${T.bd}`,
              borderRadius: 999,
              padding: '3px 9px',
            }}
          >
            {t.vsPeers}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 9, marginTop: 8 }}>
          <span style={{ font: `700 30px ${FONT}`, color: T.posk, letterSpacing: '-.02em', lineHeight: 1 }}>
            {t.topPercentile}
          </span>
          <span style={{ font: `500 12px ${FONT}`, color: T.tx2 }}>{t.inMarket}</span>
        </div>
        <div style={{ font: `600 12px ${FONT}`, color: T.posk, marginTop: 9 }}>{t.upPlaces}</div>
      </div>

      {/* how you compare */}
      <div
        style={{
          font: `600 11px ${FONT}`,
          letterSpacing: '.1em',
          textTransform: 'uppercase',
          color: T.tx2,
          margin: '20px 4px 2px',
        }}
      >
        {t.howYouCompare}
      </div>

      <div style={{ background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 16, padding: '4px 15px' }}>
        <CompareRow
          label={t.metricRevPerCover}
          youValue={crewMoney(locale, 38)}
          medianValue={crewMoney(locale, 31)}
          youLabel={t.you}
          medianLabel={t.median}
          deltaText={`+23% ${t.ahead}`}
          good
          pos={74}
          medianPos={50}
        />
        <div style={{ height: 1, background: T.bd }} />
        <CompareRow
          label={t.metricLaborPct}
          youValue="28%"
          medianValue="31%"
          youLabel={t.you}
          medianLabel={t.median}
          deltaText={`3 pts ${t.ahead}`}
          good
          pos={66}
          medianPos={50}
        />
        <div style={{ height: 1, background: T.bd }} />
        <CompareRow
          label={t.metricRevpash}
          youValue={crewMoney(locale, 14)}
          medianValue={crewMoney(locale, 12)}
          youLabel={t.you}
          medianLabel={t.median}
          deltaText={`+17% ${t.ahead}`}
          good
          pos={61}
          medianPos={50}
        />
      </div>

      {/* biggest gap note */}
      <div
        style={{
          marginTop: 12,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 10,
          background: T.surf,
          border: `1px solid ${T.bd}`,
          borderRadius: 14,
          padding: '12px 14px',
        }}
      >
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: T.warn, flex: 'none', marginTop: 4 }} />
        <div style={{ flex: 1 }}>
          <div style={{ font: `700 10px ${FONT}`, letterSpacing: '.08em', textTransform: 'uppercase', color: T.tx3 }}>
            {t.biggestGapLabel}
          </div>
          <div style={{ font: `400 12px ${FONT}`, lineHeight: 1.5, color: T.bodyTx, marginTop: 3 }}>
            {t.biggestGapBody}
          </div>
        </div>
      </div>

      {/* thumb-zone action */}
      <button
        type="button"
        style={{
          width: '100%',
          minHeight: 48,
          marginTop: 14,
          border: 'none',
          borderRadius: 14,
          background: T.acc,
          color: T.acck,
          font: `700 14px ${FONT}`,
          cursor: 'pointer',
        }}
      >
        {t.seeFullBenchmarks}
      </button>
    </div>
  );
}
