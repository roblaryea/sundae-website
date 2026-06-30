/**
 * Faithful implementation of "Crew Payroll · Pay run dashboard (admin)" from the
 * Claude Design project (Sundae Mobile PWA · Crew · Payroll) — cycle status,
 * multi-country readiness meter, totals, and per-country Ready/Review status.
 * Same cool-slate token set as the scheduling design. Sits inside
 * <PhoneFrame screenBg="#020617">. Pure markup.
 *
 * Source: claude.ai/design 9d73e488 · "Sundae Crew Payroll.dc.html" · C · Pay run dashboard.
 */

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
  // status
  posk: '#4ade80',
  post: 'rgba(34,197,94,.14)',
  warn: '#f59e0b',
  warnk: '#fbbf24',
  warnt: 'rgba(245,158,11,.14)',
} as const;
const FONT = 'Inter, ui-sans-serif, system-ui, sans-serif';

type Country = {
  flag: string;
  name: string;
  sub: string;
  subWarn?: boolean;
  amount: string;
  status: 'Ready' | 'Review';
};

const COUNTRIES: Country[] = [
  { flag: '🇺🇸', name: 'United States', sub: '38 people', amount: '$96,400', status: 'Ready' },
  { flag: '🇬🇧', name: 'United Kingdom', sub: '41 people', amount: '£148,200', status: 'Ready' },
  { flag: '🇪🇺', name: 'European Union', sub: '26 people', amount: '€72,300', status: 'Ready' },
  { flag: '🇨🇦', name: 'Canada', sub: '19 people', amount: '$58,100', status: 'Ready' },
  { flag: '🇦🇪', name: 'GCC', sub: 'Needs review · tax', subWarn: true, amount: '—', status: 'Review' },
];

export function CrewPayRunMobile() {
  return (
    <div style={{ background: T.bg, color: T.tx, fontFamily: FONT, padding: '8px 14px 16px' }}>
      {/* header: org switcher + bell + avatar */}
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
          <span style={{ font: `600 11.5px ${FONT}`, color: T.tx, whiteSpace: 'nowrap' }}>Sundae — DIFC</span>
          <span style={{ font: `600 10px ${FONT}`, color: T.tx3 }}>▾</span>
        </button>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <svg width="21" height="21" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 3a5 5 0 0 0-5 5c0 4-1.5 5-1.5 5h13S15 12 15 8a5 5 0 0 0-5-5Z"
              stroke={T.tx2}
              strokeWidth="1.5"
            />
            <path d="M8.5 16a1.6 1.6 0 0 0 3 0" stroke={T.tx2} strokeWidth="1.5" />
          </svg>
          <span style={{ width: 30, height: 30, borderRadius: '50%', background: T.surf2, border: `1px solid ${T.bd}` }} />
        </div>
      </div>

      {/* title */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', margin: '16px 2px 4px' }}>
        <div>
          <h1 style={{ font: `700 23px ${FONT}`, letterSpacing: '-.02em', color: T.tx, margin: 0 }}>Pay run</h1>
          <div style={{ font: `500 12.5px ${FONT}`, color: T.tx3, marginTop: 3 }}>March · pays 28 Mar</div>
        </div>
      </div>

      {/* readiness hero */}
      <div
        style={{
          marginTop: 12,
          background: 'linear-gradient(135deg, rgba(52,211,153,.16), transparent)',
          border: `1px solid ${T.bd}`,
          borderRadius: 20,
          padding: 17,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 5, background: T.acc }} />
        <div style={{ font: `700 11px ${FONT}`, letterSpacing: '.09em', textTransform: 'uppercase', color: T.tx3 }}>
          Pay run readiness
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 8 }}>
          <span style={{ font: `700 26px ${FONT}`, letterSpacing: '-.01em', color: T.posk }}>Run ready</span>
          <span style={{ font: `600 13px ${FONT}`, color: T.tx2 }}>4 of 5 countries</span>
        </div>
        <div style={{ marginTop: 14 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {([T.acc, T.acc, T.acc, T.acc, T.warn] as const).map((c, i) => (
              <span key={i} style={{ flex: 1, height: 8, borderRadius: 99, background: c }} />
            ))}
          </div>
        </div>
        <div style={{ font: `500 12px ${FONT}`, color: T.tx3, marginTop: 11 }}>
          1 country needs a quick review before you send.
        </div>
      </div>

      {/* totals grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
        <div style={{ background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 16, padding: 14 }}>
          <div style={{ font: `500 11px ${FONT}`, color: T.tx3 }}>Total to pay</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 7 }}>
            <span style={{ font: `700 22px ${FONT}`, letterSpacing: '-.01em', color: T.tx }}>£412,800</span>
          </div>
          <div style={{ font: `500 11px ${FONT}`, color: T.tx3, marginTop: 4 }}>142 people</div>
        </div>
        <div style={{ background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 16, padding: 14 }}>
          <div style={{ font: `500 11px ${FONT}`, color: T.tx3 }}>Next pay date</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 7 }}>
            <span style={{ font: `700 22px ${FONT}`, letterSpacing: '-.01em', color: T.tx }}>28 Mar</span>
          </div>
          <div style={{ font: `500 11px ${FONT}`, color: T.tx3, marginTop: 4 }}>in 3 days</div>
        </div>
      </div>

      {/* countries */}
      <div
        style={{
          font: `700 11px ${FONT}`,
          letterSpacing: '.09em',
          textTransform: 'uppercase',
          color: T.tx3,
          margin: '18px 2px 8px',
        }}
      >
        Countries
      </div>
      <div style={{ background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 18, padding: 0 }}>
        {COUNTRIES.map((c, i) => {
          const ready = c.status === 'Ready';
          return (
            <div
              key={c.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                borderTop: i === 0 ? undefined : `1px solid ${T.bd}`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  flex: 1,
                  minWidth: 0,
                  padding: '13px 15px',
                }}
              >
                <span style={{ fontSize: 22, lineHeight: 1, flex: 'none' }}>{c.flag}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ font: `600 14px ${FONT}`, color: T.tx }}>{c.name}</div>
                  <div style={{ font: `500 11.5px ${FONT}`, color: c.subWarn ? T.warnk : T.tx3, marginTop: 2 }}>
                    {c.sub}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ font: `700 13px ${FONT}`, color: T.tx }}>{c.amount}</span>
                  <span
                    style={{
                      font: `700 10px ${FONT}`,
                      letterSpacing: '.04em',
                      textTransform: 'uppercase',
                      background: ready ? T.post : T.warnt,
                      color: ready ? T.posk : T.warnk,
                      borderRadius: 7,
                      padding: '5px 9px',
                      flex: 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {c.status}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* coverage pill */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 14 }}>
        <span
          style={{
            font: `500 11px ${FONT}`,
            color: T.tx3,
            background: T.surf2,
            border: `1px solid ${T.bd}`,
            borderRadius: 99,
            padding: '7px 14px',
            textAlign: 'center',
          }}
        >
          39+ countries · 100+ states, provinces &amp; cities
        </span>
      </div>

      {/* thumb-zone action */}
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
        Review GCC
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M5 3l5 5-5 5" stroke={T.acck} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
