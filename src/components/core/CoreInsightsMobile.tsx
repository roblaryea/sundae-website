'use client';

/**
 * Faithful implementation of "03 · Insights — What changed" (the Glance state)
 * from the Claude Design Core / Decision Intelligence phone mockups — replaces
 * the 18-module grid with a ranked delta feed answering "what moved since I last
 * looked, and why?". Executive-summary health ring + ranked biggest-changes
 * cards, each handing off to desktop. Same cool-slate token set as the crew
 * screens. Sits inside <PhoneFrame screenBg="#020617">. Pure markup.
 *
 * Source: claude.ai/design · Core mobile slice, Row 03 "Insights" (dark variant).
 */

import { useCrewScreen } from '../crew/crewI18n';
import { crewMoney } from '../crew/crewCurrency';
import { LOC } from './locales/CoreInsightsMobile.locales';

const EN = {
  headerTitle: 'Insights',
  headerSub: '· What changed',
  execSummary: 'Executive summary',
  timeAgo: '2h ago',
  healthLabel: 'HEALTH',
  avgHealthScore: 'Avg health score',
  healthBody: 'Healthy across modules.',
  alertsNeedAttention: 'alerts need attention.',
  biggestChanges: 'Biggest changes',
  kpiAvgCheck: 'Average Check',
  vsLastWeek: 'vs last week',
  avgCheckBody: 'Larger parties and dessert attach are both up tonight.',
  kpiLaborPct: 'Labor %',
  watch: 'WATCH',
  band: 'band',
  laborPctBody: 'Overlap at the 8 PM shift change ran longer than scheduled.',
  kpiRevpash: 'RevPASH',
  perSeatHr: '/ seat-hr',
  revpashBody: 'Slower bar turns in the early evening pulled it down.',
  openOnDesktop: 'Open on desktop ↗',
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
  warn: '#f59e0b',
  warnk: '#fbbf24',
  neg: '#f87171',
  info: '#3b82f6',
  link: '#60a5fa',
  linkBd: '#1e3a5f',
  rankBg: '#cbd5e1',
  rankTx: '#0b1220',
  bodyTx: '#94a3b8',
  scoreTx: '#cbd5e1',
} as const;
const FONT = 'Inter, ui-sans-serif, system-ui, sans-serif';

/** A ranked "biggest change" card with a desktop hand-off footer. */
function DeltaCard({
  rank,
  name,
  badge,
  topMeta,
  delta,
  deltaColor,
  meta,
  body,
  ctaLabel,
}: {
  rank: number;
  name: string;
  badge?: { label: string; bg: string; color: string };
  topMeta?: string;
  delta: string;
  deltaColor: string;
  meta: string;
  body: string;
  ctaLabel: string;
}) {
  return (
    <div style={{ background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 18, overflow: 'hidden', marginBottom: 12 }}>
      <div style={{ padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <span
            style={{
              font: `700 11px ${FONT}`,
              color: T.rankTx,
              background: T.rankBg,
              borderRadius: 6,
              width: 20,
              height: 20,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 'none',
            }}
          >
            {rank}
          </span>
          <span style={{ font: `600 14px ${FONT}`, color: T.tx }}>{name}</span>
          {badge ? (
            <span
              style={{
                marginLeft: 'auto',
                font: `700 10px ${FONT}`,
                letterSpacing: '.06em',
                background: badge.bg,
                color: badge.color,
                borderRadius: 6,
                padding: '3px 7px',
              }}
            >
              {badge.label}
            </span>
          ) : (
            <span style={{ marginLeft: 'auto', font: `500 11px ${FONT}`, color: T.tx4 }}>{topMeta}</span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 11 }}>
          <span style={{ font: `700 24px ${FONT}`, color: deltaColor }}>{delta}</span>
          <span style={{ font: `500 12px ${FONT}`, color: T.tx3 }}>{meta}</span>
        </div>
        <div style={{ font: `400 13px ${FONT}`, lineHeight: 1.5, color: T.bodyTx, marginTop: 5 }}>{body}</div>
      </div>
      <div style={{ padding: '11px 14px 13px', borderTop: `1px solid ${T.bd}`, background: T.surf2 }}>
        <button
          type="button"
          style={{
            width: '100%',
            minHeight: 44,
            border: `1px solid ${T.linkBd}`,
            borderRadius: 12,
            background: 'transparent',
            color: T.link,
            font: `600 13px ${FONT}`,
            cursor: 'pointer',
          }}
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}

export function CoreInsightsMobile() {
  const { t, locale } = useCrewScreen(EN, LOC);
  return (
    <div style={{ background: T.bg, color: T.tx, fontFamily: FONT, padding: '8px 14px 16px' }}>
      {/* header: back chevron + title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '2px 4px 0' }}>
        <svg width="9" height="16" viewBox="0 0 9 16" fill="none">
          <path d="M7 2L2 8l5 6" stroke={T.tx3} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ font: `600 18px ${FONT}`, color: T.tx }}>{t.headerTitle}</span>
        <span style={{ font: `500 12px ${FONT}`, color: T.tx3, marginTop: 3 }}>{t.headerSub}</span>
      </div>

      {/* executive summary */}
      <div style={{ marginTop: 12, background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 20, padding: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ font: `600 11px ${FONT}`, letterSpacing: '.1em', textTransform: 'uppercase', color: T.tx3 }}>
            {t.execSummary}
          </span>
          <span style={{ font: `500 11px ${FONT}`, color: T.tx4 }}>{t.timeAgo}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 14 }}>
          {/* health ring 82% */}
          <div
            style={{
              position: 'relative',
              width: 92,
              height: 92,
              borderRadius: '50%',
              background: `conic-gradient(${T.acc} 0 82%, ${T.bd} 82%)`,
              flex: 'none',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 9,
                borderRadius: '50%',
                background: T.surf,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ font: `700 26px ${FONT}`, color: T.tx, lineHeight: 1 }}>82</span>
              <span style={{ font: `600 9px ${FONT}`, letterSpacing: '.08em', color: T.tx3, marginTop: 2 }}>
                {t.healthLabel}
              </span>
            </div>
          </div>
          <div>
            <div style={{ font: `600 11px ${FONT}`, letterSpacing: '.06em', textTransform: 'uppercase', color: T.tx3 }}>
              {t.avgHealthScore}
            </div>
            <div style={{ font: `400 13px ${FONT}`, lineHeight: 1.5, color: T.scoreTx, marginTop: 5 }}>
              {t.healthBody} <span style={{ color: T.warnk, fontWeight: 600 }}>3 {t.alertsNeedAttention}</span>
            </div>
          </div>
        </div>
      </div>

      {/* biggest changes */}
      <div
        style={{
          font: `600 11px ${FONT}`,
          letterSpacing: '.1em',
          textTransform: 'uppercase',
          color: T.tx2,
          margin: '22px 4px 10px',
        }}
      >
        {t.biggestChanges}
      </div>

      <DeltaCard
        rank={1}
        name={t.kpiAvgCheck}
        topMeta={t.timeAgo}
        meta={`${crewMoney(locale, 58, 2)} · ${t.vsLastWeek}`}
        delta="▲ 6.2%"
        deltaColor={T.acc}
        body={t.avgCheckBody}
        ctaLabel={t.openOnDesktop}
      />

      <DeltaCard
        rank={2}
        name={t.kpiLaborPct}
        badge={{ label: t.watch, bg: 'rgba(245,158,11,.14)', color: T.warnk }}
        meta={`30.1% · ${t.band} 28%`}
        delta="▲ 2.1 pts"
        deltaColor={T.warnk}
        body={t.laborPctBody}
        ctaLabel={t.openOnDesktop}
      />

      <DeltaCard
        rank={3}
        name={t.kpiRevpash}
        topMeta={t.timeAgo}
        meta={`${crewMoney(locale, 41, 2)} ${t.perSeatHr}`}
        delta="▼ 3.4%"
        deltaColor={T.warnk}
        body={t.revpashBody}
        ctaLabel={t.openOnDesktop}
      />
    </div>
  );
}
