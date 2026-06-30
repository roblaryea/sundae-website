'use client';

/**
 * Faithful implementation of Sundae Intelligence "Ask — Welcome / empty state"
 * (dark variant) from the Claude Design source — a warm opener with a scope chip,
 * pulsing Sundae mark, tappable starter prompts with topic tags, and the command
 * bar (mic · text · send) pinned in the thumb zone. Same cool-slate token set as
 * the Crew screens. Sits inside <PhoneFrame screenBg="#020617">. Pure markup.
 *
 * Source: claude.ai/design · Core "Ask — Welcome" screen (Welcome · Dark).
 */

import { useCrewScreen } from '../crew/crewI18n';
import { LOC } from './locales/CoreAskWelcomeMobile.locales';

const EN = {
  ask: 'Ask',
  headlineL1: 'Ask Sundae anything',
  headlineL2: 'about your business',
  subhead:
    'Revenue, labor, menu, guests — in plain language. Answers come with the evidence and a next step.',
  tryAsking: 'Try asking',
  q1: 'Why was revenue down yesterday?',
  q1Tag: 'Revenue · DIFC',
  q2: 'Top 5 items by margin',
  q2Tag: 'Menu',
  q3: 'Labor vs target this week',
  q3Tag: 'Labor',
  q4: 'Which outlet is most profitable?',
  q4Tag: 'Portfolio',
  inputPlaceholder: 'Ask Sundae anything…',
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
  info: '#3b82f6',
  infok: '#60a5fa',
  barbg: 'rgba(2,6,23,.92)',
} as const;
const FONT = 'Inter, ui-sans-serif, system-ui, sans-serif';

function PromptButton({ q, tag }: { q: string; tag: string }) {
  return (
    <button
      type="button"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        width: '100%',
        textAlign: 'left',
        minHeight: 52,
        background: T.surf,
        border: `1px solid ${T.bd}`,
        borderRadius: 15,
        padding: '11px 14px',
        cursor: 'pointer',
      }}
    >
      <span
        style={{
          width: 32,
          height: 32,
          borderRadius: 9,
          background: T.surf2,
          border: `1px solid ${T.bd}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 'none',
        }}
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <path
            d="M3 7.5h9M8 3.5l4 4-4 4"
            stroke={T.infok}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span style={{ flex: 1, font: `600 13.5px ${FONT}`, color: T.tx }}>{q}</span>
      <span
        style={{
          font: `600 9px ${FONT}`,
          letterSpacing: '.05em',
          textTransform: 'uppercase',
          color: T.tx3,
        }}
      >
        {tag}
      </span>
    </button>
  );
}

export function CoreAskWelcomeMobile() {
  const { t } = useCrewScreen(EN, LOC);

  return (
    <div style={{ background: T.bg, color: T.tx, fontFamily: FONT, padding: '8px 14px 16px' }}>
      {/* header: scope chip · Ask · menu */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '6px 4px 12px',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: T.surf,
            border: `1px solid ${T.bd}`,
            borderRadius: 99,
            padding: '5px 11px 5px 6px',
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
          <span style={{ font: `600 11.5px ${FONT}`, color: T.tx, whiteSpace: 'nowrap' }}>
            Sundae — DIFC
          </span>
          <span style={{ font: `600 10px ${FONT}`, color: T.tx3 }}>▾</span>
        </span>
        <span style={{ font: `600 15px ${FONT}`, color: T.tx }}>{t.ask}</span>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path
            d="M5 6.5h12M5 11h12M5 15.5h8"
            stroke={T.tx2}
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* hero: pulsing mark + headline + subhead */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '28px 10px 0',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: 74,
            height: 74,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 24,
              background: T.acc,
              opacity: 0.18,
            }}
          />
          <span
            style={{
              width: 60,
              height: 60,
              borderRadius: 19,
              background: T.acc,
              color: T.acck,
              font: `700 26px ${FONT}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            S
          </span>
        </div>
        <div
          style={{
            font: `700 23px ${FONT}`,
            lineHeight: 1.25,
            letterSpacing: '-.01em',
            color: T.tx,
            marginTop: 22,
          }}
        >
          {t.headlineL1}
          <br />
          {t.headlineL2}
        </div>
        <div
          style={{
            font: `400 13.5px ${FONT}`,
            lineHeight: 1.55,
            color: T.tx2,
            marginTop: 10,
            maxWidth: 280,
          }}
        >
          {t.subhead}
        </div>
      </div>

      {/* suggested prompts */}
      <div style={{ marginTop: 30 }}>
        <span
          style={{
            font: `700 11px ${FONT}`,
            letterSpacing: '.09em',
            textTransform: 'uppercase',
            color: T.tx3,
          }}
        >
          {t.tryAsking}
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
          <PromptButton q={t.q1} tag={t.q1Tag} />
          <PromptButton q={t.q2} tag={t.q2Tag} />
          <PromptButton q={t.q3} tag={t.q3Tag} />
          <PromptButton q={t.q4} tag={t.q4Tag} />
        </div>
      </div>

      {/* command bar: mic · input · send */}
      <div
        style={{
          marginTop: 20,
          background: T.barbg,
          backdropFilter: 'blur(18px)',
          border: `1px solid ${T.bd}`,
          borderRadius: 24,
          padding: '10px 12px',
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
            <path
              d="M4 8a4.5 4.5 0 0 0 9 0M8.5 12.5V15"
              stroke={T.tx2}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
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
          <span style={{ font: `400 14px ${FONT}`, color: T.tx3 }}>{t.inputPlaceholder}</span>
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
            <path
              d="M8.5 14V4M4 7.5L8.5 3l4.5 4.5"
              stroke={T.tx3}
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}
