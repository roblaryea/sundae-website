'use client';

/**
 * Faithful implementation of "01 · Mobile Home — daypart-aware state of the
 * business" (Decision Intelligence / Core) from the Claude Design source — the
 * "Glance & act" Home screen that answers one question: "What needs me right
 * now?" Daypart greeting, answer-first State-of-the-business card with a sales
 * pace bar, and a "Needs you" exception feed with inline act buttons. Same
 * cool-slate token set as the Crew screens. Sits inside
 * <PhoneFrame screenBg="#020617">. Pure markup, no phone chrome.
 *
 * Source: claude.ai/design · Core (Decision Intelligence) mobile · "Home / Glance".
 */

import { useCrewScreen } from '../crew/crewI18n';
import { crewMoney } from '../crew/crewCurrency';
import { LOC } from './locales/CoreHomeMobile.locales';

const EN = {
  daypart: 'Tue · Dinner service · 7:42 PM',
  greeting: 'Good evening, Dana',
  stateOfBusiness: 'State of the business',
  justNow: 'Just now',
  onTrack: 'On track',
  vsPlanUp: '▲ 4% vs plan',
  stateSummary: '118 covers seated, on pace for 184. Kitchen and bar healthy.',
  salesPace: 'Sales pace',
  needsYou: 'Needs you',
  watch: 'WATCH',
  labor: 'Labor',
  laborAgo: '5m ago',
  laborTitle: 'Labor % drifting to 31%',
  laborBody: 'Two servers clocked in early ahead of the 8 PM wave. Target band is 28%.',
  snooze: 'Snooze',
  assign: 'Assign',
  goodNews: 'GOOD NEWS',
  revenue: 'Revenue',
  revenueAgo: '12m ago',
  revenueTitle: 'Bar sales ▲ 18% tonight',
  revenueBody: 'The cocktail flight promo is converting well at the bar.',
  acknowledge: 'Acknowledge',
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
  pos: '#22c55e',
  posk: '#4ade80',
  warn: '#f59e0b',
  warnk: '#fbbf24',
  ctaTx: '#cbd5e1',
  paceTx: '#cbd5e1',
} as const;
const FONT = 'Inter, ui-sans-serif, system-ui, sans-serif';

export function CoreHomeMobile() {
  const { t, locale } = useCrewScreen(EN, LOC);

  return (
    <div style={{ background: T.bg, color: T.tx, fontFamily: FONT, padding: '8px 14px 16px' }}>
      {/* greeting */}
      <div style={{ padding: '4px 4px 0' }}>
        <div style={{ font: `600 11px ${FONT}`, letterSpacing: '.12em', textTransform: 'uppercase', color: T.tx3 }}>
          {t.daypart}
        </div>
        <div style={{ font: `600 22px/1.2 ${FONT}`, color: T.tx, marginTop: 6 }}>{t.greeting}</div>
      </div>

      {/* state of the business */}
      <div style={{ marginTop: 16, background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 20, padding: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ font: `600 11px ${FONT}`, letterSpacing: '.1em', textTransform: 'uppercase', color: T.tx3 }}>
            {t.stateOfBusiness}
          </span>
          <span style={{ font: `500 11px ${FONT}`, color: T.tx4 }}>{t.justNow}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 12 }}>
          <span style={{ font: `700 32px ${FONT}`, letterSpacing: '-.02em', color: T.acc }}>{t.onTrack}</span>
          <span style={{ font: `600 14px ${FONT}`, color: T.pos }}>{t.vsPlanUp}</span>
        </div>
        <div style={{ font: `400 13px/1.5 ${FONT}`, color: T.tx2, marginTop: 6 }}>{t.stateSummary}</div>

        {/* sales pace bar */}
        <div style={{ marginTop: 16 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              font: `600 11px ${FONT}`,
              letterSpacing: '.04em',
              textTransform: 'uppercase',
              color: T.tx3,
            }}
          >
            <span>{t.salesPace}</span>
            <span style={{ color: T.paceTx }}>
              {crewMoney(locale, 9240)} / {crewMoney(locale, 9000)}
            </span>
          </div>
          <div
            style={{
              marginTop: 8,
              height: 9,
              borderRadius: 99,
              background: T.bd,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: '100%',
                background: 'linear-gradient(90deg,#15803d,#34d399)',
                borderRadius: 99,
              }}
            />
          </div>
          <div style={{ position: 'relative', height: 0 }}>
            <div style={{ position: 'absolute', top: -13, left: '97%', width: 2, height: 13, background: '#e2e8f0' }} />
          </div>
        </div>
      </div>

      {/* needs you header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '22px 4px 10px' }}>
        <span style={{ font: `600 11px ${FONT}`, letterSpacing: '.1em', textTransform: 'uppercase', color: T.tx2 }}>
          {t.needsYou}
        </span>
        <span
          style={{
            font: `600 11px ${FONT}`,
            color: T.tx3,
            background: T.bd,
            borderRadius: 99,
            padding: '3px 9px',
          }}
        >
          2
        </span>
      </div>

      {/* exception card — labor (WATCH) */}
      <div
        style={{
          background: T.surf,
          border: `1px solid ${T.bd}`,
          borderRadius: 18,
          overflow: 'hidden',
          marginBottom: 12,
        }}
      >
        <div style={{ padding: '14px 16px 13px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                font: `700 10px ${FONT}`,
                letterSpacing: '.08em',
                background: 'rgba(245,158,11,.14)',
                color: T.warnk,
                borderRadius: 6,
                padding: '3px 7px',
              }}
            >
              {t.watch}
            </span>
            <span style={{ font: `600 11px ${FONT}`, letterSpacing: '.06em', textTransform: 'uppercase', color: T.tx3 }}>
              {t.labor}
            </span>
            <span style={{ marginLeft: 'auto', font: `500 11px ${FONT}`, color: T.tx4 }}>{t.laborAgo}</span>
          </div>
          <div style={{ font: `600 16px ${FONT}`, color: T.tx, marginTop: 10 }}>{t.laborTitle}</div>
          <div style={{ font: `400 13px/1.5 ${FONT}`, color: T.tx2, marginTop: 4 }}>{t.laborBody}</div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: 8,
            padding: '11px 14px 13px',
            borderTop: `1px solid ${T.bd}`,
            background: T.surf2,
          }}
        >
          <button
            style={{
              flex: 1,
              minHeight: 44,
              border: 'none',
              borderRadius: 12,
              background: T.bd,
              color: T.ctaTx,
              font: `600 13px ${FONT}`,
              cursor: 'pointer',
            }}
          >
            {t.snooze}
          </button>
          <button
            style={{
              flex: 1,
              minHeight: 44,
              border: 'none',
              borderRadius: 12,
              background: T.acc,
              color: T.acck,
              font: `700 13px ${FONT}`,
              cursor: 'pointer',
            }}
          >
            {t.assign}
          </button>
        </div>
      </div>

      {/* exception card — revenue (GOOD NEWS) */}
      <div style={{ background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 18, overflow: 'hidden' }}>
        <div style={{ padding: '14px 16px 13px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                font: `700 10px ${FONT}`,
                letterSpacing: '.08em',
                background: 'rgba(34,197,94,.14)',
                color: T.posk,
                borderRadius: 6,
                padding: '3px 7px',
              }}
            >
              {t.goodNews}
            </span>
            <span style={{ font: `600 11px ${FONT}`, letterSpacing: '.06em', textTransform: 'uppercase', color: T.tx3 }}>
              {t.revenue}
            </span>
            <span style={{ marginLeft: 'auto', font: `500 11px ${FONT}`, color: T.tx4 }}>{t.revenueAgo}</span>
          </div>
          <div style={{ font: `600 16px ${FONT}`, color: T.tx, marginTop: 10 }}>{t.revenueTitle}</div>
          <div style={{ font: `400 13px/1.5 ${FONT}`, color: T.tx2, marginTop: 4 }}>{t.revenueBody}</div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: 8,
            padding: '11px 14px 13px',
            borderTop: `1px solid ${T.bd}`,
            background: T.surf2,
          }}
        >
          <button
            style={{
              flex: 1,
              minHeight: 44,
              border: 'none',
              borderRadius: 12,
              background: T.bd,
              color: T.ctaTx,
              font: `600 13px ${FONT}`,
              cursor: 'pointer',
            }}
          >
            {t.acknowledge}
          </button>
        </div>
      </div>
    </div>
  );
}
