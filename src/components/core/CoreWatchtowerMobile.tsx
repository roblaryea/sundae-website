'use client';

/**
 * Composed implementation of "Core · Watchtower — Market signals" (the "Glance"
 * dark frame) in the established cool-slate mobile design language. External
 * intelligence at a glance: an answer-first verdict ("3 signals to act on"), a
 * ranked list of competitor / event / market-trend signals — each with a tone
 * dot, a one-line "what it means", and a tone pill — and a thumb-zone "Open
 * Watchtower" action. There is no design slice for this screen; it is composed
 * faithfully against the Crew/Core mobile token + layout system.
 * Sits inside <PhoneFrame screenBg="#020617">. Pure markup.
 *
 * Style reference: src/components/crew/CrewWorkforceHealthMobile.tsx
 * (cool-slate tokens, org-chip + bell header, answer-first verdict card).
 */

import { useCrewScreen } from '../crew/crewI18n';
import { crewMoney } from '../crew/crewCurrency';
import { LOC } from './locales/CoreWatchtowerMobile.locales';

const EN = {
  orgChip: 'Sundae — DIFC',
  headerTitle: 'Watchtower',
  headerSub: '· market signals',
  verdict: 'Verdict · near you',
  signalsToAct: '3 signals to act on',
  verdictSub: 'competitors, events & demand near you',
  signals: 'Signals',

  // Signal 1 — competitor (warn)
  sig1Title: 'Competitor dropped lunch price',
  sig1Meaning: 'a nearby rival cut a set-menu to',
  sig1Action: 'consider a counter-offer',
  pillWatch: 'Watch',

  // Signal 2 — event (info)
  sig2Title: 'Big event Friday — DIFC',
  sig2Meaning: 'concert 400m away, expect +18% covers',
  sig2Action: 'staff up + prep stock',
  pillOpportunity: 'Opportunity',

  // Signal 3 — market trend (info)
  sig3Title: 'Market trend: brunch demand ▲',
  sig3Meaning: 'category searches up 12% in your area this month',
  pillTrend: 'Trend',

  openWatchtower: 'Open Watchtower',
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
  warn: '#f59e0b',
  warnk: '#fbbf24',
  neg: '#f87171',
  info: '#3b82f6',
  // extra tokens the composition needs
  infok: '#60a5fa',
  cardTx: '#cbd5e1',
  warnPillBg: 'rgba(245,158,11,.14)',
  infoPillBg: 'rgba(59,130,246,.16)',
} as const;
const FONT = 'Inter, ui-sans-serif, system-ui, sans-serif';

/** One market-signal card: tone dot, title, "what it means", tone pill. */
function SignalCard({
  dot,
  title,
  meaning,
  action,
  pill,
  pillBg,
  pillColor,
}: {
  dot: string;
  title: string;
  meaning: React.ReactNode;
  action?: string;
  pill: string;
  pillBg: string;
  pillColor: string;
}) {
  return (
    <div style={{ background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 16, padding: '13px 14px', marginBottom: 9 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: dot, flex: 'none', marginTop: 4 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
            <span style={{ font: `600 13.5px ${FONT}`, color: T.tx, letterSpacing: '-.01em' }}>{title}</span>
            <span style={{ flex: 'none', font: `700 9.5px ${FONT}`, letterSpacing: '.04em', textTransform: 'uppercase', background: pillBg, color: pillColor, borderRadius: 7, padding: '4px 8px' }}>{pill}</span>
          </div>
          <div style={{ font: `400 11.5px/1.45 ${FONT}`, color: T.cardTx, marginTop: 4 }}>{meaning}</div>
          {action && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 7 }}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke={pillColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ font: `600 11px ${FONT}`, color: pillColor }}>{action}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function CoreWatchtowerMobile() {
  const { t, locale } = useCrewScreen(EN, LOC);
  return (
    <div style={{ background: T.bg, color: T.tx, fontFamily: FONT, padding: '8px 14px 16px' }}>
      {/* header: org chip + bell */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 999, padding: '5px 10px 5px 5px' }}>
          <span style={{ width: 20, height: 20, borderRadius: 6, background: T.acc, color: T.acck, font: `800 10px ${FONT}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>S</span>
          <span style={{ font: `600 12px ${FONT}`, color: T.tx }}>{t.orgChip}</span>
          <svg width="11" height="11" viewBox="0 0 15 15" fill="none"><path d="M4 6l3.5 3.5L11 6" stroke={T.tx3} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M5 8a5 5 0 0110 0c0 4 1.5 5 1.5 5h-13S5 12 5 8z" stroke={T.tx2} strokeWidth="1.5" strokeLinejoin="round" /><path d="M8.5 16a1.6 1.6 0 003 0" stroke={T.tx2} strokeWidth="1.5" /></svg>
          <span style={{ width: 26, height: 26, borderRadius: '50%', background: T.surf2, border: `1px solid ${T.bd}` }} />
        </div>
      </div>

      {/* title */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '14px 2px 0' }}>
        <span style={{ font: `700 20px ${FONT}`, letterSpacing: '-.02em' }}>{t.headerTitle}</span>
        <span style={{ font: `500 12px ${FONT}`, color: T.tx3 }}>{t.headerSub}</span>
      </div>

      {/* answer-first verdict (info/amber tone) */}
      <div style={{ marginTop: 12, background: `linear-gradient(135deg, rgba(245,158,11,.14), rgba(59,130,246,.10), transparent)`, border: `1px solid ${T.bd}`, borderRadius: 18, padding: 15, position: 'relative', overflow: 'hidden' }}>
        <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: T.warn }} />
        <div style={{ font: `700 10px ${FONT}`, letterSpacing: '.09em', textTransform: 'uppercase', color: T.tx3 }}>{t.verdict}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: T.warn }} />
          <span style={{ font: `700 23px ${FONT}`, color: T.warnk, letterSpacing: '-.01em' }}>{t.signalsToAct}</span>
        </div>
        <div style={{ font: `500 12px ${FONT}`, color: T.tx2, marginTop: 7 }}>{t.verdictSub}</div>
      </div>

      {/* signals list */}
      <div style={{ font: `700 10px ${FONT}`, letterSpacing: '.08em', textTransform: 'uppercase', color: T.tx3, margin: '15px 2px 9px' }}>{t.signals}</div>

      <SignalCard
        dot={T.warn}
        title={t.sig1Title}
        meaning={<>{t.sig1Meaning} {crewMoney(locale, 18)}</>}
        action={t.sig1Action}
        pill={t.pillWatch}
        pillBg={T.warnPillBg}
        pillColor={T.warnk}
      />
      <SignalCard
        dot={T.info}
        title={t.sig2Title}
        meaning={t.sig2Meaning}
        action={t.sig2Action}
        pill={t.pillOpportunity}
        pillBg={T.infoPillBg}
        pillColor={T.infok}
      />
      <SignalCard
        dot={T.info}
        title={t.sig3Title}
        meaning={t.sig3Meaning}
        pill={t.pillTrend}
        pillBg={T.infoPillBg}
        pillColor={T.infok}
      />

      {/* thumb-zone action */}
      <button style={{ width: '100%', minHeight: 48, marginTop: 5, border: 'none', borderRadius: 14, background: T.acc, color: T.acck, font: `700 14px ${FONT}`, letterSpacing: '-.01em', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
        {t.openWatchtower}
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke={T.acck} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
    </div>
  );
}
