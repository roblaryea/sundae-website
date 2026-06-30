'use client';

/**
 * Faithful implementation of "Sundae Intelligence · Ask — Conversation thread"
 * (the core surface — answer-first replies with inline evidence) from the Claude
 * Design source. DARK variant only. Cool-slate token set shared with the Crew
 * scheduling design. Sits inside <PhoneFrame screenBg="#020617">. Pure markup.
 *
 * Source: scratchpad/core_ask_thread.html · "2 · Conversation thread".
 */

import { useCrewScreen } from '../crew/crewI18n';
import { crewMoney } from '../crew/crewCurrency';
import { LOC } from './locales/CoreAskThreadMobile.locales';

const EN = {
  screenTitle: 'Revenue',
  // user questions
  q1: 'Why was revenue down yesterday?',
  q2: 'Top 5 items by margin',
  // answer 1
  a1HeadlineKey: 'Down 7%',
  a1HeadlineRest: 'driven by fewer covers, not lower spend.',
  a1Body: 'Covers fell 9% vs a typical Monday while average check held steady at',
  a1BodyEnd: '. The gap is almost entirely walk-ins during the 6–8 PM window.',
  netRevYesterday: 'Net Revenue · yesterday',
  vsPlanPrefix: 'vs',
  vsPlanSuffix: 'plan · DIFC',
  revenueByDay: 'Revenue by day',
  thisWeek: 'This week',
  a1Weather:
    'The dip lines up with heavy rain across DIFC on Monday evening — foot traffic was down across the area.',
  chipOutlet: 'Break down by outlet',
  chipCompareWeek: 'Compare to last week',
  chipLabor: 'What about labor?',
  // answer 2
  a2HeadlineLead: 'leads',
  a2HeadlineRest: 'at 71% gross margin.',
  covers: 'covers',
  chipShowAll: 'Show all items',
  chipByRevenue: 'By revenue instead',
  // footer actions
  copy: 'Copy',
  save: 'Save',
  provenance: 'Provenance',
  openDesktop: 'Open full analysis on desktop ↗',
  // composer
  askPlaceholder: 'Ask Sundae anything…',
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
  infok: '#60a5fa',
  posk: '#4ade80',
  usr: '#1d4ed8',
  usrtx: '#eff6ff',
} as const;
const FONT = 'Inter, ui-sans-serif, system-ui, sans-serif';

function UserBubble({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '14px 0' }}>
      <div
        style={{
          maxWidth: '78%',
          background: T.usr,
          color: T.usrtx,
          borderRadius: '18px 18px 6px 18px',
          padding: '11px 14px',
          font: `500 14px/1.45 ${FONT}`,
        }}
      >
        {text}
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <span
      style={{
        width: 26,
        height: 26,
        borderRadius: 8,
        background: T.acc,
        color: T.acck,
        font: `700 12px ${FONT}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 'none',
      }}
    >
      S
    </span>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        minHeight: 34,
        padding: '0 13px',
        borderRadius: 99,
        background: T.surf2,
        border: `1px solid ${T.bd}`,
        font: `600 12.5px ${FONT}`,
        color: T.infok,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
}

function Footer({ t, desktop }: { t: typeof EN; desktop?: boolean }) {
  const action = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    font: `500 11.5px ${FONT}`,
    color: T.tx3,
  } as const;
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginTop: 13,
          paddingTop: 11,
          borderTop: `1px solid ${T.bd}`,
        }}
      >
        <span style={action}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
            <path
              d="M5 3V2.2A1 1 0 0 1 6 1.2h5A1 1 0 0 1 12 2.2v5a1 1 0 0 1-1 1h-.8"
              stroke="currentColor"
              strokeWidth="1.3"
            />
          </svg>
          {t.copy}
        </span>
        <span style={action}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M4 2h6a1 1 0 0 1 1 1v9l-4-2.5L3 12V3a1 1 0 0 1 1-1Z"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
          </svg>
          {t.save}
        </span>
        <button
          style={{
            marginLeft: 'auto',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            font: `600 11.5px ${FONT}`,
            color: T.infok,
          }}
        >
          {t.provenance}
        </button>
      </div>
      {desktop && (
        <button
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            marginTop: 10,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            font: `600 12px ${FONT}`,
            color: T.infok,
          }}
        >
          {t.openDesktop}
        </button>
      )}
    </>
  );
}

export function CoreAskThreadMobile() {
  const { t, locale } = useCrewScreen(EN, LOC);

  // GBP base integers (design renders the ar/AED locale: 1 GBP ≈ 4.66 AED).
  const belowPlanGbp = 730; // AED 3,400
  const avgCheckGbp = 13; // AED 59 (average check)
  const netRevGbp = 9571; // AED 44,600
  const planGbp = 10300; // AED 48,000

  const items = [
    { name: 'Garden Salad', pct: '71%', covers: 196, priceGbp: 9 }, // AED 42
    { name: 'Truffle Burger', pct: '64%', covers: 312, priceGbp: 18 }, // AED 84
    { name: 'Wagyu Sliders', pct: '58%', covers: 248, priceGbp: 21 }, // AED 96
  ];

  return (
    <div style={{ background: T.bg, color: T.tx, fontFamily: FONT, padding: '8px 14px 16px' }}>
      {/* header: org chip · title · menu */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 4px 12px' }}>
        <button
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: T.surf,
            border: `1px solid ${T.bd}`,
            borderRadius: 99,
            padding: '5px 11px 5px 6px',
            cursor: 'pointer',
          }}
        >
          <span
            style={{
              width: 20,
              height: 20,
              borderRadius: 6,
              background: T.acc,
              color: T.acck,
              font: `700 10px ${FONT}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            S
          </span>
          <span style={{ font: `600 11.5px ${FONT}`, color: T.tx, whiteSpace: 'nowrap' }}>Sundae — DIFC</span>
          <span style={{ font: `600 10px ${FONT}`, color: T.tx3 }}>▾</span>
        </button>
        <span style={{ font: `600 15px ${FONT}`, color: T.tx }}>{t.screenTitle}</span>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M5 6.5h12M5 11h12M5 15.5h8" stroke={T.tx2} strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      </div>

      {/* ── Q1 ── */}
      <UserBubble text={t.q1} />

      {/* ── A1 ── */}
      <div style={{ display: 'flex', gap: 9, margin: '14px 0' }}>
        <Avatar />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ font: `600 16px/1.4 ${FONT}`, color: T.tx, marginBottom: 4 }}>
            <span style={{ color: T.warnk, fontWeight: 700 }}>{t.a1HeadlineKey}</span>
            {' — '}
            {crewMoney(locale, belowPlanGbp)} {t.a1HeadlineRest}
          </div>
          <div style={{ font: `400 13.5px/1.55 ${FONT}`, color: T.tx2, margin: '8px 0' }}>
            {t.a1Body} {crewMoney(locale, avgCheckGbp)}
            {t.a1BodyEnd}
          </div>

          {/* KPI callout */}
          <div style={{ background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 14, padding: '13px 15px', margin: '10px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ font: `700 11px ${FONT}`, letterSpacing: '.09em', textTransform: 'uppercase', color: T.tx3 }}>
                {t.netRevYesterday}
              </span>
              <span style={{ font: `600 12px ${FONT}`, color: T.warnk }}>▼ 7.0%</span>
            </div>
            <div style={{ font: `700 26px ${FONT}`, letterSpacing: '-.01em', color: T.tx, marginTop: 5 }}>
              {crewMoney(locale, netRevGbp)}
            </div>
            <div style={{ font: `400 11.5px ${FONT}`, color: T.tx3, marginTop: 3 }}>
              {t.vsPlanPrefix} {crewMoney(locale, planGbp)} {t.vsPlanSuffix}
            </div>
          </div>

          {/* trend chart */}
          <div style={{ background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 14, padding: 14, margin: '10px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ font: `700 11px ${FONT}`, letterSpacing: '.09em', textTransform: 'uppercase', color: T.tx3 }}>
                {t.revenueByDay}
              </span>
              <span style={{ font: `500 10px ${FONT}`, color: T.tx3 }}>{t.thisWeek}</span>
            </div>
            <svg
              width="100%"
              height="84"
              viewBox="0 0 320 84"
              preserveAspectRatio="none"
              style={{ display: 'block', marginTop: 12, color: T.info }}
            >
              <line x1="0" y1="66" x2="320" y2="66" stroke={T.bd} strokeWidth="1" />
              <path
                d="M0,60 L36,56 L72,48 L108,52 L144,36 L180,40 L216,24 L252,30 L288,14 L320,20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path
                d="M0,60 L36,56 L72,48 L108,52 L144,36 L180,40 L216,24 L252,30 L288,14 L320,20 L320,80 L0,80 Z"
                fill="currentColor"
                fillOpacity="0.12"
              />
            </svg>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 7, font: `500 10px ${FONT}`, color: T.tx3 }}>
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
              <span>Sun</span>
            </div>
          </div>

          <div style={{ font: `400 13.5px/1.55 ${FONT}`, color: T.tx2, margin: '8px 0' }}>{t.a1Weather}</div>

          {/* follow-up chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
            <Chip label={t.chipOutlet} />
            <Chip label={t.chipCompareWeek} />
            <Chip label={t.chipLabor} />
          </div>

          <Footer t={t} desktop />
        </div>
      </div>

      {/* ── Q2 ── */}
      <UserBubble text={t.q2} />

      {/* ── A2 ── */}
      <div style={{ display: 'flex', gap: 9, margin: '14px 0' }}>
        <Avatar />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ font: `600 16px/1.4 ${FONT}`, color: T.tx, marginBottom: 4 }}>
            <span style={{ color: T.posk, fontWeight: 700 }}>Garden Salad {t.a2HeadlineLead}</span> {t.a2HeadlineRest}
          </div>

          {/* card-stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: '10px 0' }}>
            {items.map((it) => (
              <div key={it.name} style={{ background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 12, padding: '11px 13px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ font: `600 13px ${FONT}`, color: T.tx }}>{it.name}</span>
                  <span style={{ font: `600 13px ${FONT}`, color: T.posk }}>{it.pct}</span>
                </div>
                <div style={{ font: `500 11px ${FONT}`, color: T.tx3, marginTop: 3 }}>
                  {it.covers} {t.covers} · {crewMoney(locale, it.priceGbp)}
                </div>
              </div>
            ))}
          </div>

          {/* follow-up chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
            <Chip label={t.chipShowAll} />
            <Chip label={t.chipByRevenue} />
          </div>

          <Footer t={t} />
        </div>
      </div>

      {/* composer */}
      <div
        style={{
          marginTop: 6,
          background: T.surf2,
          borderTop: `1px solid ${T.bd}`,
          padding: '10px 0 0',
          display: 'flex',
          alignItems: 'center',
          gap: 9,
        }}
      >
        <span
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: T.surf2,
            border: `1px solid ${T.bd}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 'none',
          }}
        >
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
            <rect x="6" y="2" width="5" height="8" rx="2.5" stroke={T.tx2} strokeWidth="1.5" />
            <path d="M4 8a4.5 4.5 0 0 0 9 0M8.5 12.5V15" stroke={T.tx2} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            minHeight: 40,
            background: T.surf2,
            border: `1px solid ${T.bd}`,
            borderRadius: 21,
            padding: '0 14px',
          }}
        >
          <span style={{ font: `400 14px ${FONT}`, color: T.tx3 }}>{t.askPlaceholder}</span>
        </div>
        <span
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: T.surf2,
            border: `1px solid ${T.bd}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 'none',
          }}
        >
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
            <path d="M8.5 14V4M4 7.5L8.5 3l4.5 4.5" stroke={T.tx3} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </div>
  );
}
