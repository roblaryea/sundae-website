'use client';

/**
 * Faithful implementation of "Crew People Intelligence · B · No-show risk"
 * (DARK variant) from the Claude Design project — answers "which shifts might go
 * uncovered tonight?": an amber count verdict, then each at-risk shift with the
 * person, the time, the plain-language drivers behind the risk, and one-tap
 * cover. Same cool-slate token set as Workforce Health; warn/red tones carry
 * risk. Sits inside <PhoneFrame screenBg="#020617">. Pure markup.
 *
 * Source: claude.ai/design 9d73e488 ·
 * "Sundae Crew People Intelligence.dc.html · B · No-show risk" (dark variant).
 *
 * Localized via useCrewScreen (EN base + per-locale overrides). This screen
 * shows percentages, not money — strings localize; %/times/counts stay numeric.
 * Proper nouns (people, JBR, DIFC, "Sundae — DIFC") are kept verbatim.
 */

import { useCrewScreen } from './crewI18n';
import { LOC } from './locales/CrewNoShowRiskMobile.locales';

const EN = {
  // header
  orgName: 'Sundae — DIFC',
  // title
  title: 'No-show risk',
  tonight: 'Tonight',
  allOutlets: 'all outlets',
  // verdict
  riskEyebrow: 'Risk',
  tonightLower: 'tonight',
  shifts: 'shifts',
  verdictBody: 'Two shifts likely to go uncovered tonight — line up cover early.',
  // section
  atRiskShifts: 'At-risk shifts',
  // risk badge suffix ("68% risk")
  riskSuffix: 'risk',
  // roles
  roleBar: 'Bar',
  roleServer: 'Server',
  // drivers
  driverNoClockIn: 'No clock-in last {n}',
  driverLateThisMonth: 'Late {n}× this month',
  driverSwappedTwice: 'Swapped twice',
  driverOpenRequest: 'Open request pending',
  // CTAs
  lineUpCover: 'Line up cover',
  lineUpCoverTonight: 'Line up cover for tonight',
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
  negk: '#f87171',
} as const;
const FONT = 'Inter, ui-sans-serif, system-ui, sans-serif';

function RiskShift({
  initials,
  avatar,
  name,
  role,
  risk,
  time,
  drivers,
  ctaLabel,
}: {
  initials: string;
  avatar: string;
  name: string;
  role: string;
  risk: string;
  time: string;
  drivers: string[];
  ctaLabel: string;
}) {
  return (
    <div style={{ marginTop: 12, background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 18, padding: 15 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
        <span
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: avatar,
            color: '#fff',
            font: `700 13.9px ${FONT}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 'none',
            border: `2px solid ${T.surf}`,
          }}
        >
          {initials}
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ font: `600 14px ${FONT}`, color: T.tx }}>{name}</div>
          <div style={{ font: `500 11.5px ${FONT}`, color: T.tx3, marginTop: 1 }}>{role}</div>
        </div>
        <span
          style={{
            font: `700 10px ${FONT}`,
            letterSpacing: '.04em',
            textTransform: 'uppercase',
            background: T.warnt,
            color: T.warnk,
            borderRadius: 7,
            padding: '5px 9px',
            flex: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {risk}
        </span>
      </div>
      <div style={{ font: `600 12.5px ${FONT}`, color: T.tx2, marginTop: 11 }}>{time}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 10 }}>
        {drivers.map((d) => (
          <span
            key={d}
            style={{
              font: `600 10.5px ${FONT}`,
              background: T.surf2,
              color: T.tx2,
              border: `1px solid ${T.bd}`,
              borderRadius: 7,
              padding: '5px 9px',
              flex: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {d}
          </span>
        ))}
      </div>
      <button
        style={{
          width: '100%',
          minHeight: 42,
          marginTop: 13,
          border: 'none',
          borderRadius: 12,
          background: T.acc,
          color: T.acck,
          font: `700 13px ${FONT}`,
          cursor: 'pointer',
        }}
      >
        {ctaLabel}
      </button>
    </div>
  );
}

export function CrewNoShowRiskMobile() {
  const { t } = useCrewScreen(EN, LOC);

  return (
    <div style={{ background: T.bg, color: T.tx, fontFamily: FONT, padding: '8px 14px 16px' }}>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 2px 0' }}>
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
          <span style={{ font: `600 11.5px ${FONT}`, color: T.tx, whiteSpace: 'nowrap' }}>{t.orgName}</span>
          <span style={{ font: `600 10px ${FONT}`, color: T.tx3 }}>▾</span>
        </button>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <svg width="21" height="21" viewBox="0 0 20 20" fill="none">
            <path d="M10 3a5 5 0 0 0-5 5c0 4-1.5 5-1.5 5h13S15 12 15 8a5 5 0 0 0-5-5Z" stroke={T.tx2} strokeWidth="1.5" />
            <path d="M8.5 16a1.6 1.6 0 0 0 3 0" stroke={T.tx2} strokeWidth="1.5" />
          </svg>
          <span style={{ width: 30, height: 30, borderRadius: '50%', background: T.surf2, border: `1px solid ${T.bd}` }} />
        </div>
      </div>

      {/* title */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', margin: '16px 2px 4px' }}>
        <div>
          <h1 style={{ font: `700 23px ${FONT}`, letterSpacing: '-.02em', color: T.tx, margin: 0 }}>{t.title}</h1>
          <div style={{ font: `500 12.5px ${FONT}`, color: T.tx3, marginTop: 3 }}>
            {t.tonight} · {t.allOutlets}
          </div>
        </div>
      </div>

      {/* verdict */}
      <div
        style={{
          marginTop: 12,
          background: 'linear-gradient(135deg,rgba(245,158,11,.18),transparent)',
          border: `1px solid ${T.bd}`,
          borderRadius: 20,
          padding: 17,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 5, background: T.warn }} />
        <div style={{ font: `700 11px ${FONT}`, letterSpacing: '.09em', textTransform: 'uppercase', color: T.tx3 }}>
          {t.riskEyebrow} · {t.tonightLower}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 9 }}>
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: T.warn, boxShadow: '0 0 0 4px rgba(245,158,11,.18)' }} />
          <span style={{ font: `700 28px ${FONT}`, letterSpacing: '-.02em', color: T.warnk }}>2 {t.shifts}</span>
        </div>
        <div style={{ font: `500 13px/1.5 ${FONT}`, color: T.tx2, marginTop: 9 }}>{t.verdictBody}</div>
      </div>

      {/* at-risk shifts */}
      <div style={{ font: `700 11px ${FONT}`, letterSpacing: '.09em', textTransform: 'uppercase', color: T.tx3, margin: '18px 2px 8px' }}>
        {t.atRiskShifts}
      </div>

      <RiskShift
        initials="JD"
        avatar={T.negk}
        name="Jonas Dietrich"
        role={`${t.roleBar} · JBR`}
        risk={`68% ${t.riskSuffix}`}
        time="8:00 PM – 2:00 AM · JBR"
        drivers={[t.driverNoClockIn.replace('{n}', '2'), t.driverLateThisMonth.replace('{n}', '3')]}
        ctaLabel={t.lineUpCover}
      />

      <RiskShift
        initials="MA"
        avatar={T.warn}
        name="Mona Aziz"
        role={`${t.roleServer} · DIFC`}
        risk={`54% ${t.riskSuffix}`}
        time="6:00 PM – 12:00 AM · DIFC"
        drivers={[t.driverSwappedTwice, t.driverOpenRequest]}
        ctaLabel={t.lineUpCover}
      />

      {/* bottom CTA */}
      <button
        style={{
          width: '100%',
          minHeight: 48,
          marginTop: 18,
          border: 'none',
          borderRadius: 14,
          background: T.acc,
          color: T.acck,
          font: `700 14px ${FONT}`,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        {t.lineUpCoverTonight}
      </button>
    </div>
  );
}
