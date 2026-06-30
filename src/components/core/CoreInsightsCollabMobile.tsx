'use client';

/**
 * Faithful implementation of "Sundae Mobile Insights · Collaborate" — the
 * Thread · Detail (dark variant) from the Claude Design source. A discussion
 * anchored to a visual: a header with the thread question + people/status, an
 * "attached view" source chip that deep-links back to the exact filtered view
 * (Open view ↗), a vertical comment thread with avatars and timestamps, two
 * messages tagged with their inbound channel (via Slack / via Telegram), an
 * @mention plus an image annotation attachment (listing-page3.png), and a
 * sticky composer row (reply field · Resolve · send).
 * Sits inside <PhoneFrame screenBg="#020617">. Pure markup.
 *
 * Source: claude.ai/design · "Sundae Mobile Insights" — section "07 · Collaborate
 * — threads anchored to a visual", phone "Thread · Detail · Dark".
 */

import { useCrewScreen } from '../crew/crewI18n';
import { LOC } from './locales/CoreInsightsCollabMobile.locales';

const EN = {
  threadTitle: 'Why is delivery down in DIFC?',
  threadMeta: '3 people · open',
  attachedScope: 'Delivery · DIFC · Jul 1–7 · Talabat',
  attachedView: 'attached view',
  openView: 'Open view ↗',
  msg1Time: '12m',
  msg1Body:
    'Marcus — Talabat slipped to page 3 and 9pm orders auto-paused. Can we expedite the rating fix?',
  msg2Time: '9m',
  viaSlack: 'via Slack',
  msg2Body:
    'On it. Ops flagged the rating dip to Talabat — ETA tomorrow AM. Bumping prep priority tonight.',
  msg3Time: '4m',
  viaTelegram: 'via Telegram',
  msg3Pre: 'Let’s also push a 15% delivery code for DIFC this weekend to recover the listing.',
  msg3Mention: '@Dana',
  msg3Post: 'can you set it up?',
  attachmentName: 'listing-page3.png',
  composerPlaceholder: 'Reply, @mention…',
  resolve: 'Resolve',
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
  warn: '#f59e0b',
  warnk: '#fbbf24',
  neg: '#ef4444',
  negk: '#f87171',
  negt: 'rgba(239,68,68,.16)',
  info: '#3b82f6',
  infok: '#60a5fa',
  infot: 'rgba(59,130,246,.16)',
  // person-avatar colours kept verbatim from the design
  avBlue: '#3b82f6',
  avPurple: '#8b5cf6',
  avGreen: '#22c55e',
  slate: '#a78bfa',
  slateBg: 'rgba(139,92,246,.16)',
} as const;
const FONT = 'Inter, ui-sans-serif, system-ui, sans-serif';

/** Round avatar with initials. */
function Avatar({ initials, bg, size = 30 }: { initials: string; bg: string; size?: number }) {
  return (
    <span
      style={{
        flex: 'none',
        width: size,
        height: size,
        borderRadius: '50%',
        background: bg,
        color: '#fff',
        font: `700 ${Math.round(size * 0.37)}px ${FONT}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {initials}
    </span>
  );
}

/** Inbound-channel pill (e.g. "via Slack", "via Telegram"). */
function ChannelChip({ label, color, bg }: { label: string; color: string; bg: string }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        font: `600 9px ${FONT}`,
        color,
        background: bg,
        borderRadius: 5,
        padding: '2px 6px',
      }}
    >
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: color }} />
      {label}
    </span>
  );
}

export function CoreInsightsCollabMobile() {
  const { t } = useCrewScreen(EN, LOC);

  return (
    <div style={{ background: T.bg, color: T.tx, fontFamily: FONT, padding: '8px 14px 16px' }}>
      {/* grabber */}
      <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 8 }}>
        <span style={{ width: 38, height: 4, borderRadius: 99, background: T.bd }} />
      </div>

      {/* header: back affordance + thread title/meta */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          paddingBottom: 12,
          borderBottom: `1px solid ${T.bd}`,
        }}
      >
        <button
          type="button"
          style={{
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
          <svg width="9" height="15" viewBox="0 0 9 15" fill="none">
            <path d="M7 2L2 7.5l5 5.5" stroke={T.tx2} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ font: `700 15px ${FONT}`, color: T.tx }}>{t.threadTitle}</div>
          <div style={{ font: `500 10.5px ${FONT}`, color: T.tx3 }}>{t.threadMeta}</div>
        </div>
      </div>

      {/* attached-view source chip — deep-link back to the exact filtered view */}
      <div
        style={{
          marginTop: 10,
          padding: '10px 12px',
          background: T.bg,
          border: `1px solid ${T.info}`,
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span
          style={{
            flex: 'none',
            width: 30,
            height: 30,
            borderRadius: 8,
            background: T.infot,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <path d="M2 11l4-5 3 3 5-6" stroke={T.info} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ font: `600 12px ${FONT}`, color: T.tx }}>{t.attachedScope}</div>
          <div style={{ font: `500 10px ${FONT}`, color: T.tx3 }}>{t.attachedView}</div>
        </div>
        <button
          type="button"
          style={{
            flex: 'none',
            height: 30,
            padding: '0 11px',
            borderRadius: 9,
            border: 'none',
            background: T.info,
            color: '#fff',
            font: `700 11px ${FONT}`,
            cursor: 'pointer',
          }}
        >
          {t.openView}
        </button>
      </div>

      {/* comment thread */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, margin: '14px 0 16px' }}>
        {/* message 1 — Dana Habib */}
        <div style={{ display: 'flex', gap: 10 }}>
          <Avatar initials="DH" bg={T.avBlue} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ font: `600 12.5px ${FONT}`, color: T.tx }}>Dana Habib</span>
              <span style={{ font: `500 10px ${FONT}`, color: T.tx3 }}>{t.msg1Time}</span>
            </div>
            <div
              style={{
                marginTop: 4,
                background: T.surf2,
                border: `1px solid ${T.bd}`,
                borderRadius: 12,
                borderTopLeftRadius: 3,
                padding: '10px 12px',
                font: `400 13px/1.45 ${FONT}`,
                color: T.tx,
              }}
            >
              {t.msg1Body}
            </div>
          </div>
        </div>

        {/* message 2 — Marcus R. (via Slack) */}
        <div style={{ display: 'flex', gap: 10 }}>
          <Avatar initials="MR" bg={T.avPurple} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ font: `600 12.5px ${FONT}`, color: T.tx }}>Marcus R.</span>
              <span style={{ font: `500 10px ${FONT}`, color: T.tx3 }}>{t.msg2Time}</span>
              <ChannelChip label={t.viaSlack} color={T.slate} bg={T.slateBg} />
            </div>
            <div
              style={{
                marginTop: 4,
                background: T.surf2,
                border: `1px solid ${T.bd}`,
                borderRadius: 12,
                borderTopLeftRadius: 3,
                padding: '10px 12px',
                font: `400 13px/1.45 ${FONT}`,
                color: T.tx,
              }}
            >
              {t.msg2Body}
            </div>
          </div>
        </div>

        {/* message 3 — Sara Khan (via Telegram) + @mention + image annotation */}
        <div style={{ display: 'flex', gap: 10 }}>
          <Avatar initials="SK" bg={T.avGreen} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ font: `600 12.5px ${FONT}`, color: T.tx }}>Sara Khan</span>
              <span style={{ font: `500 10px ${FONT}`, color: T.tx3 }}>{t.msg3Time}</span>
              <ChannelChip label={t.viaTelegram} color={T.infok} bg={T.infot} />
            </div>
            <div
              style={{
                marginTop: 4,
                background: T.surf2,
                border: `1px solid ${T.bd}`,
                borderRadius: 12,
                borderTopLeftRadius: 3,
                padding: '10px 12px',
                font: `400 13px/1.45 ${FONT}`,
                color: T.tx,
              }}
            >
              {t.msg3Pre} <span style={{ color: T.infok }}>{t.msg3Mention}</span> {t.msg3Post}
            </div>
            {/* image annotation attachment */}
            <div
              style={{
                marginTop: 7,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: T.bg,
                border: `1px solid ${T.bd}`,
                borderRadius: 9,
                padding: '8px 10px',
              }}
            >
              <span
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  background: T.negt,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path d="M2 4h10v8H2z" stroke={T.negk} strokeWidth="1.3" />
                </svg>
              </span>
              <span style={{ font: `600 11px ${FONT}`, color: T.tx2 }}>{t.attachmentName}</span>
            </div>
          </div>
        </div>
      </div>

      {/* composer row: reply field · Resolve · send */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div
          style={{
            flex: 1,
            height: 42,
            borderRadius: 13,
            background: T.surf2,
            border: `1px solid ${T.bd}`,
            display: 'flex',
            alignItems: 'center',
            padding: '0 13px',
            font: `400 13px ${FONT}`,
            color: T.tx3,
          }}
        >
          {t.composerPlaceholder}
        </div>
        <button
          type="button"
          style={{
            flex: 'none',
            height: 42,
            padding: '0 14px',
            borderRadius: 13,
            border: `1px solid ${T.bd}`,
            background: T.surf2,
            color: T.posk,
            font: `700 12px ${FONT}`,
            cursor: 'pointer',
          }}
        >
          {t.resolve}
        </button>
        <button
          type="button"
          aria-label="Send"
          style={{
            flex: 'none',
            width: 42,
            height: 42,
            borderRadius: 13,
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
