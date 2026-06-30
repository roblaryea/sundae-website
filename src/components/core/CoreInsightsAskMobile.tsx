'use client';

/**
 * Faithful implementation of "Sundae Mobile Insights · Ask Sundae — inline
 * answer" (the answer-first surface: "Ask about this" on any chart → Sundae
 * Intelligence pre-seeded with the metric + scope → a one-line verdict, a
 * generated chart, ranked drivers, and "Act on this" follow-ups). DARK variant
 * only. Cool-slate token set shared with the Crew scheduling design. Sits inside
 * <PhoneFrame screenBg="#020617">. Pure markup.
 *
 * Source: scratchpad/core_ins_ask.html · "08 · Ask Sundae — inline answer".
 *
 * No money figures appear on this screen — the answer is driven by percentages,
 * percentage-point deltas, counts and durations, all of which stay numeric — so
 * crewMoney is intentionally not used here.
 */

import { useCrewScreen } from '../crew/crewI18n';
import { LOC } from './locales/CoreInsightsAskMobile.locales';

const EN = {
  // header
  agentName: 'Sundae Intelligence',
  scope: 'Scoped: Delivery · DIFC · 7d',
  // user question
  question: 'Why did delivery orders drop 12%?',
  // answer verdict (Talabat is a proper noun, kept verbatim)
  verdictLead: 'Two things, both in DIFC at dinner: a',
  verdictVisibility: 'Talabat visibility drop',
  verdictAnd: 'and',
  verdictPrep: 'prep times breaching SLA',
  verdictTail: '.',
  // generated chart
  chartTitle: 'Orders & prep time · 7d',
  generated: 'generated',
  legendOrders: 'Orders',
  legendPrep: 'Prep min',
  // ranked drivers
  driverVisibility: 'Listing visibility',
  driverPrep: 'Prep / SLA pauses',
  driverWeather: 'Weather',
  // act on this
  actOnThis: 'Act on this',
  actAlert: 'Set SLA alert · prep > 25 min',
  actLog: 'Log decision · weekend promo',
  actDrill: 'Drill by platform',
  // composer
  followUpPlaceholder: 'Ask a follow-up…',
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
  warnt: 'rgba(245,158,11,.14)',
  neg: '#ef4444',
  negk: '#f87171',
  negt: 'rgba(239,68,68,.16)',
  info: '#3b82f6',
  infok: '#60a5fa',
  infot: 'rgba(59,130,246,.16)',
  posk: '#4ade80',
  post: 'rgba(34,197,94,.14)',
  usr: '#3b82f6',
  trk: '#1e293b',
} as const;
const FONT = 'Inter, ui-sans-serif, system-ui, sans-serif';

/** Sundae sparkle mark, used in the header crest and answer avatar. */
function Sparkle({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <path
        d="M9 1.5l1.7 4.6 4.8.4-3.7 3 1.2 4.7L9 11.8 4.7 14.2l1.2-4.7L2.2 6.5l4.8-.4L9 1.5z"
        fill={T.acck}
      />
    </svg>
  );
}

function Driver({ delta, color, width, label }: { delta: string; color: string; width: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
      <span style={{ font: `700 11px ${FONT}`, color, width: 34 }}>{delta}</span>
      <div style={{ flex: 1, height: 7, borderRadius: 99, background: T.trk, overflow: 'hidden' }}>
        <div style={{ height: '100%', width, background: color, borderRadius: 99 }} />
      </div>
      <span style={{ font: `500 11px ${FONT}`, color: T.tx2, width: 96 }}>{label}</span>
    </div>
  );
}

function ActButton({ icon, label, tint }: { icon: React.ReactNode; label: string; tint: string }) {
  return (
    <button
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        background: T.surf,
        border: `1px solid ${T.bd}`,
        borderRadius: 12,
        padding: '11px 13px',
        cursor: 'pointer',
        textAlign: 'left',
      }}
    >
      <span
        style={{
          width: 26,
          height: 26,
          borderRadius: 8,
          background: tint,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 'none',
        }}
      >
        {icon}
      </span>
      <span style={{ font: `600 13px ${FONT}`, color: T.tx, flex: 1 }}>{label}</span>
      <span style={{ color: T.tx3 }}>›</span>
    </button>
  );
}

export function CoreInsightsAskMobile() {
  const { t } = useCrewScreen(EN, LOC);

  return (
    <div style={{ background: T.bg, color: T.tx, fontFamily: FONT, padding: '8px 14px 16px' }}>
      {/* header: agent crest · name · scope */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '4px 2px 12px',
          borderBottom: `1px solid ${T.bd}`,
        }}
      >
        <span
          style={{
            flex: 'none',
            width: 32,
            height: 32,
            borderRadius: 10,
            background: `linear-gradient(135deg, ${T.acc}, ${T.info})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Sparkle size={16} />
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ font: `700 15px ${FONT}`, color: T.tx }}>{t.agentName}</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, font: `500 10.5px ${FONT}`, color: T.tx3 }}>
            <span style={{ width: 6, height: 6, borderRadius: 2, background: T.acc }} />
            {t.scope}
          </div>
        </div>
      </div>

      {/* user question */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '16px 0' }}>
        <div
          style={{
            maxWidth: '78%',
            background: T.usr,
            color: '#fff',
            borderRadius: '16px 16px 4px 16px',
            padding: '11px 14px',
            font: `500 13.5px/1.45 ${FONT}`,
          }}
        >
          {t.question}
        </div>
      </div>

      {/* answer */}
      <div style={{ display: 'flex', gap: 9 }}>
        <span
          style={{
            flex: 'none',
            width: 28,
            height: 28,
            borderRadius: 9,
            background: `linear-gradient(135deg, ${T.acc}, ${T.info})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 2,
          }}
        >
          <Sparkle size={13} />
        </span>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              background: T.surf,
              border: `1px solid ${T.bd}`,
              borderRadius: '4px 16px 16px 16px',
              padding: 14,
            }}
          >
            {/* verdict */}
            <div style={{ font: `600 14.5px/1.45 ${FONT}`, color: T.tx }}>
              {t.verdictLead} <span style={{ color: T.negk }}>{t.verdictVisibility}</span> {t.verdictAnd}{' '}
              <span style={{ color: T.warnk }}>{t.verdictPrep}</span>
              {t.verdictTail}
            </div>

            {/* generated chart */}
            <div style={{ marginTop: 13, background: T.bg, border: `1px solid ${T.bd}`, borderRadius: 12, padding: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ font: `600 11px ${FONT}`, color: T.tx2 }}>{t.chartTitle}</span>
                <span style={{ font: `600 9.5px ${FONT}`, color: T.acc }}>{t.generated}</span>
              </div>
              <div style={{ position: 'relative', height: 78 }}>
                <svg width="100%" height="78" viewBox="0 0 320 78" preserveAspectRatio="none" fill="none">
                  <path d="M0 20 L64 24 L128 22 L192 40 L256 52 L320 60 L320 78 L0 78 Z" fill={T.neg} fillOpacity="0.1" />
                  <path
                    d="M0 20 L64 24 L128 22 L192 40 L256 52 L320 60"
                    stroke={T.neg}
                    strokeWidth="2.2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M0 56 L64 52 L128 50 L192 34 L256 22 L320 14"
                    stroke={T.warn}
                    strokeWidth="2.2"
                    strokeDasharray="5 4"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div style={{ display: 'flex', gap: 14, marginTop: 6 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: `500 10.5px ${FONT}`, color: T.tx2 }}>
                  <span style={{ width: 11, height: 3, borderRadius: 2, background: T.neg }} />
                  {t.legendOrders}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: `500 10.5px ${FONT}`, color: T.tx2 }}>
                  <span style={{ width: 11, height: 0, borderTop: `2px dashed ${T.warn}` }} />
                  {t.legendPrep}
                </span>
              </div>
            </div>

            {/* ranked drivers */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
              <Driver delta="−7pt" color={T.negk} width="62%" label={t.driverVisibility} />
              <Driver delta="−4pt" color={T.warnk} width="36%" label={t.driverPrep} />
              <Driver delta="−1pt" color={T.tx3} width="12%" label={t.driverWeather} />
            </div>
          </div>

          {/* act on this */}
          <div
            style={{
              font: `600 10px ${FONT}`,
              letterSpacing: '.06em',
              textTransform: 'uppercase',
              color: T.tx3,
              margin: '14px 2px 8px',
            }}
          >
            {t.actOnThis}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <ActButton
              tint={T.negt}
              label={t.actAlert}
              icon={
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 2a4 4 0 0 0-4 4c0 4-1.5 5-1.5 5h11S12 10 12 6a4 4 0 0 0-4-4z"
                    stroke={T.negk}
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
            <ActButton
              tint={T.infot}
              label={t.actLog}
              icon={
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path d="M3 2.5h8l2 2v9H3z" stroke={T.infok} strokeWidth="1.4" strokeLinejoin="round" />
                </svg>
              }
            />
            <ActButton
              tint={T.post}
              label={t.actDrill}
              icon={
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path d="M2 11l4-5 3 3 5-6" stroke={T.posk} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            />
          </div>
        </div>
      </div>

      {/* composer */}
      <div
        style={{
          marginTop: 18,
          paddingTop: 12,
          borderTop: `1px solid ${T.bd}`,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <div
          style={{
            flex: 1,
            height: 44,
            borderRadius: 14,
            background: T.surf2,
            border: `1px solid ${T.bd}`,
            display: 'flex',
            alignItems: 'center',
            padding: '0 14px',
            font: `400 13px ${FONT}`,
            color: T.tx3,
          }}
        >
          {t.followUpPlaceholder}
        </div>
        <button
          style={{
            flex: 'none',
            width: 44,
            height: 44,
            borderRadius: 14,
            border: 'none',
            background: T.acc,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
            <path d="M3 9h11M9 4l5 5-5 5" stroke={T.acck} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
