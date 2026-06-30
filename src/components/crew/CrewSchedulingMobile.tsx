'use client';

/**
 * Faithful implementation of the "Sundae Crew Scheduling — My Schedule (employee)"
 * surface from the Claude Design project (Sundae Mobile PWA · Crew · Scheduling).
 * Ported from the design's own tokens + layout (cool-slate dark theme, Inter,
 * template-coloured shift stripes, green "today/act" accent). Sized to sit inside
 * <PhoneFrame screenBg="#020617">. Localized via useCrewScreen — proper nouns
 * (Sundae — DIFC) and pure date/time tokens stay verbatim.
 *
 * Source of truth: claude.ai/design 9d73e488 · "Sundae Crew Scheduling.dc.html".
 */

import { useCrewScreen } from './crewI18n';
import { LOC } from './locales/CrewSchedulingMobile.locales';

// English base strings (proper nouns + pure dates/times/numbers stay inline).
const EN = {
  shiftsLabel: 'shifts',
  nextShift: 'Next shift',
  startsIn: 'Starts in',
  roleServer: 'Server',
  section: 'Section',
  withYou: 'with you',
  acknowledge: 'Acknowledge',
  thisWeek: 'This week',
  dayWedAbbr: 'Wed',
  today: 'Today',
  upcoming: 'Upcoming',
  dayMon: 'M',
  dayTue: 'T',
  dayWed: 'W',
  dayThu: 'T',
  dayFri: 'F',
  daySat: 'S',
  daySun: 'S',
};

// Design tokens — dark theme (the app's signature mobile palette)
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
} as const;
// shift template colours
const C = { blue: '#3b82f6', amber: '#f59e0b', purple: '#8b5cf6', slate: '#475569' } as const;
const FONT = 'Inter, ui-sans-serif, system-ui, sans-serif';

function Avatar({ initials, bg }: { initials: string; bg: string }) {
  return (
    <span
      style={{
        width: 24,
        height: 24,
        borderRadius: '50%',
        background: bg,
        color: '#fff',
        font: `700 9px ${FONT}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 'none',
        border: `2px solid ${T.surf}`,
        marginRight: -8,
      }}
    >
      {initials}
    </span>
  );
}

function Day({ d, n, dot, active }: { d: string; n: string; dot?: string; active?: boolean }) {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5,
        padding: '6px 0',
        borderRadius: 11,
        background: active ? T.acc : 'transparent',
      }}
    >
      <span style={{ font: `600 9px ${FONT}`, letterSpacing: '.04em', color: active ? T.acck : T.tx3 }}>{d}</span>
      <span style={{ font: `700 13px ${FONT}`, color: active ? T.acck : T.tx }}>{n}</span>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: active ? T.acck : dot || 'transparent' }} />
    </div>
  );
}

export function CrewSchedulingMobile() {
  const { t } = useCrewScreen(EN, LOC);
  return (
    <div style={{ background: T.bg, color: T.tx, fontFamily: FONT, padding: '6px 14px 16px' }}>
      {/* header: location switcher + bell + avatar */}
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
              borderRadius: '50%',
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 8a5 5 0 0110 0c0 4 1.5 5 1.5 5h-13S5 12 5 8z"
              stroke={T.tx2}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path d="M8.5 16a1.6 1.6 0 003 0" stroke={T.tx2} strokeWidth="1.5" />
          </svg>
          <span style={{ width: 26, height: 26, borderRadius: '50%', background: T.surf2, border: `1px solid ${T.bd}` }} />
        </div>
      </div>

      {/* week nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '14px 2px 0' }}>
        <span style={{ width: 30, height: 30, borderRadius: 9, background: T.surf, border: `1px solid ${T.bd}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="13" height="13" viewBox="0 0 15 15" fill="none"><path d="M9 3L5 7.5l4 4.5" stroke={T.tx2} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <div style={{ textAlign: 'center' }}>
          <div style={{ font: `700 14px ${FONT}`, color: T.tx }}>Jun 22 – 28</div>
          <div style={{ font: `500 10px ${FONT}`, color: T.tx3, marginTop: 1 }}>4 {t.shiftsLabel} · 30h</div>
        </div>
        <span style={{ width: 30, height: 30, borderRadius: 9, background: T.surf, border: `1px solid ${T.bd}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="13" height="13" viewBox="0 0 15 15" fill="none"><path d="M6 3l4 4.5L6 12" stroke={T.tx2} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </div>

      {/* week strip */}
      <div style={{ display: 'flex', gap: 3, marginTop: 11 }}>
        <Day d={t.dayMon} n="22" dot={C.blue} />
        <Day d={t.dayTue} n="23" />
        <Day d={t.dayWed} n="24" active />
        <Day d={t.dayThu} n="25" />
        <Day d={t.dayFri} n="26" dot={C.amber} />
        <Day d={t.daySat} n="27" dot={C.purple} />
        <Day d={t.daySun} n="28" />
      </div>

      {/* next shift hero */}
      <div
        style={{
          marginTop: 13,
          background: `linear-gradient(135deg, ${C.purple}29, transparent)`,
          border: `1px solid ${T.bd}`,
          borderRadius: 17,
          padding: 14,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: C.purple }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ font: `700 10px ${FONT}`, letterSpacing: '.09em', textTransform: 'uppercase', color: T.tx3 }}>{t.nextShift}</span>
          <span style={{ font: `600 10px ${FONT}`, color: T.tx3 }}>{t.startsIn} 2h 40m</span>
        </div>
        <div style={{ font: `700 20px ${FONT}`, letterSpacing: '-.01em', color: T.tx, marginTop: 8 }}>5:30 – 11:00 PM</div>
        <div style={{ font: `500 11.5px ${FONT}`, color: T.tx2, marginTop: 4 }}>Sundae — DIFC · {t.roleServer} · {t.section} 3</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 13 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <div style={{ display: 'flex' }}>
              <Avatar initials="LM" bg={C.purple} />
              <Avatar initials="AR" bg={C.blue} />
              <Avatar initials="KS" bg={C.amber} />
              <Avatar initials="+2" bg={C.slate} />
            </div>
            <span style={{ font: `600 11px ${FONT}`, color: T.tx2, whiteSpace: 'nowrap' }}>4 {t.withYou}</span>
          </div>
          <button
            style={{
              minHeight: 34,
              border: 'none',
              borderRadius: 10,
              background: T.acc,
              color: T.acck,
              font: `700 12px ${FONT}`,
              padding: '0 14px',
            }}
          >
            {t.acknowledge}
          </button>
        </div>
      </div>

      {/* this week */}
      <div style={{ margin: '18px 2px 9px' }}>
        <span style={{ font: `700 10px ${FONT}`, letterSpacing: '.09em', textTransform: 'uppercase', color: T.tx3 }}>{t.thisWeek}</span>
      </div>
      <div style={{ font: `600 10px ${FONT}`, color: T.tx3, margin: '0 2px 6px' }}>{t.dayWedAbbr} 24 Jun · {t.today}</div>
      <div style={{ display: 'flex', background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 15, overflow: 'hidden' }}>
        <span style={{ width: 4, background: C.purple, flex: 'none' }} />
        <div style={{ flex: 1, padding: '12px 12px 12px 11px', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ font: `700 13px ${FONT}`, color: T.tx, whiteSpace: 'nowrap' }}>5:30 – 11:00 PM</span>
            <span style={{ font: `700 9px ${FONT}`, letterSpacing: '.04em', textTransform: 'uppercase', background: 'rgba(96,165,250,.16)', color: '#93c5fd', borderRadius: 6, padding: '3px 7px', whiteSpace: 'nowrap' }}>{t.upcoming}</span>
          </div>
          <div style={{ font: `500 11px ${FONT}`, color: T.tx2, marginTop: 4 }}>Sundae — DIFC · {t.roleServer}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 11px' }}>
          <span style={{ width: 32, height: 32, borderRadius: 10, background: T.surf2, border: `1px solid ${T.bd}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.tx2 }}>
            <svg width="15" height="15" viewBox="0 0 17 17" fill="none"><path d="M4 9l3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
        </div>
      </div>
    </div>
  );
}
