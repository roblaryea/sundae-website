/**
 * Faithful implementation of the employee "clock-in" surface from the Claude
 * Design "Sundae Mobile" project — greeting, next-shift card, the big green
 * Clock-in button, and the last-payslip card. Same cool-slate token set as the
 * scheduling design. Sits inside <PhoneFrame screenBg="#020617">. Pure markup.
 *
 * Source: claude.ai/design 9d73e488 · "Sundae Mobile.dc.html" (employee home).
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
} as const;
const FONT = 'Inter, ui-sans-serif, system-ui, sans-serif';

export function CrewClockInMobile() {
  return (
    <div style={{ background: T.bg, color: T.tx, fontFamily: FONT, padding: '8px 16px 16px', minHeight: 470 }}>
      <div style={{ font: `600 10px ${FONT}`, letterSpacing: '.12em', textTransform: 'uppercase', color: T.tx3 }}>
        Tuesday · 5:18 PM
      </div>
      <div style={{ font: `600 21px ${FONT}`, color: T.tx, marginTop: 6 }}>Hi, Priya</div>

      {/* next shift */}
      <div style={{ marginTop: 16, background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 18, padding: 15 }}>
        <div style={{ font: `600 10px ${FONT}`, letterSpacing: '.1em', textTransform: 'uppercase', color: T.tx3 }}>Next shift</div>
        <div style={{ font: `600 17px ${FONT}`, color: T.tx, marginTop: 6 }}>Tonight · 5:30 – 11:00 PM</div>
        <div style={{ font: `500 12px ${FONT}`, color: T.tx2, marginTop: 3 }}>Server · Section 3 · with Leo &amp; Ana</div>
      </div>

      {/* clock-in button */}
      <button
        style={{
          marginTop: 16,
          width: '100%',
          border: 'none',
          borderRadius: 24,
          background: 'linear-gradient(180deg,#34d399,#22c55e)',
          boxShadow: '0 14px 30px -8px rgba(34,197,94,.5)',
          padding: '22px 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 9,
        }}
      >
        <span style={{ width: 46, height: 46, borderRadius: '50%', background: 'rgba(4,20,12,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="9.5" stroke={T.acck} strokeWidth="2" />
            <path d="M14 9v5l3.2 2" stroke={T.acck} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span style={{ font: `700 20px ${FONT}`, color: T.acck, letterSpacing: '-.01em' }}>Clock in</span>
        <span style={{ font: `600 11px ${FONT}`, color: 'rgba(4,20,12,.7)' }}>Shift starts in 12 min</span>
      </button>

      {/* last payslip */}
      <div style={{ marginTop: 16, background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 16, padding: 15, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div>
          <div style={{ font: `600 9px ${FONT}`, letterSpacing: '.1em', textTransform: 'uppercase', color: T.tx3 }}>Last payslip</div>
          <div style={{ font: `700 19px ${FONT}`, color: T.tx, marginTop: 4 }}>$842.50</div>
          <div style={{ font: `500 11px ${FONT}`, color: T.tx2, marginTop: 2 }}>Paid Friday · 3d ago</div>
        </div>
        <span style={{ marginLeft: 'auto', minHeight: 32, display: 'flex', alignItems: 'center', border: `1px solid ${T.bd}`, borderRadius: 11, background: 'transparent', color: '#cbd5e1', font: `600 12px ${FONT}`, padding: '0 14px' }}>
          View
        </span>
      </div>

      {/* hours this week */}
      <div style={{ marginTop: 14, display: 'flex', gap: 10 }}>
        <div style={{ flex: 1, background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 14, padding: 13 }}>
          <div style={{ font: `600 9px ${FONT}`, letterSpacing: '.08em', textTransform: 'uppercase', color: T.tx3 }}>This week</div>
          <div style={{ font: `700 17px ${FONT}`, color: T.tx, marginTop: 4 }}>28.5h</div>
        </div>
        <div style={{ flex: 1, background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 14, padding: 13 }}>
          <div style={{ font: `600 9px ${FONT}`, letterSpacing: '.08em', textTransform: 'uppercase', color: T.tx3 }}>Break</div>
          <div style={{ font: `700 17px ${FONT}`, color: T.acc, marginTop: 4 }}>Logged</div>
        </div>
      </div>
    </div>
  );
}
