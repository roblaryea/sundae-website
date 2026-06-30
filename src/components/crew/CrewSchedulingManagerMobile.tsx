/**
 * Faithful implementation of the manager "Team Scheduling" surface from the
 * Claude Design "Sundae Crew Scheduling" project — coverage read as a meter,
 * Today/Week + view-mode switcher, and an open-shift "act now" card. Same
 * cool-slate tokens as My Schedule. Sits inside <PhoneFrame screenBg="#020617">.
 *
 * Source: claude.ai/design 9d73e488 · "Sundae Crew Scheduling.dc.html" (manager).
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
  pos: '#34d399',
  warn: '#f59e0b',
  warnt: 'rgba(245,158,11,.14)',
  warnk: '#fbbf24',
  neg: '#f87171',
  trk: '#1e293b',
  info: '#3b82f6',
  infot: 'rgba(59,130,246,.16)',
  infok: '#93c5fd',
} as const;
const FONT = 'Inter, ui-sans-serif, system-ui, sans-serif';

function LegendDot({ c, children }: { c: string; children: React.ReactNode }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: `500 11px ${FONT}`, color: T.tx2 }}>
      <span style={{ width: 9, height: 9, borderRadius: 3, background: c }} />
      {children}
    </span>
  );
}

export function CrewSchedulingManagerMobile() {
  return (
    <div style={{ background: T.bg, color: T.tx, fontFamily: FONT, padding: '8px 14px 16px' }}>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 999, padding: '5px 10px 5px 5px' }}>
          <span style={{ width: 20, height: 20, borderRadius: '50%', background: T.acc, color: T.acck, font: `800 10px ${FONT}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>S</span>
          <span style={{ font: `600 12px ${FONT}`, color: T.tx }}>Sundae — DIFC</span>
          <svg width="11" height="11" viewBox="0 0 15 15" fill="none"><path d="M4 6l3.5 3.5L11 6" stroke={T.tx3} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <span style={{ width: 26, height: 26, borderRadius: '50%', background: T.surf2, border: `1px solid ${T.bd}` }} />
      </div>

      <div style={{ font: `700 19px ${FONT}`, color: T.tx, margin: '14px 2px 0' }}>Team Scheduling</div>

      {/* coverage meter */}
      <div style={{ marginTop: 13, background: `linear-gradient(180deg, ${T.warnt}, transparent)`, border: `1px solid ${T.bd}`, borderRadius: 18, padding: 15 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ font: `700 10px ${FONT}`, letterSpacing: '.09em', textTransform: 'uppercase', color: T.tx3 }}>Today&apos;s coverage</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: `700 10px ${FONT}`, letterSpacing: '.04em', textTransform: 'uppercase', color: T.warnk }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: T.warn }} />Needs attention
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 10 }}>
          <span style={{ font: `700 24px ${FONT}`, color: T.tx }}>18 <span style={{ font: `600 14px ${FONT}`, color: T.tx2 }}>of 20 shifts filled</span></span>
          <span style={{ font: `700 13px ${FONT}`, color: T.warnk }}>2 gaps</span>
        </div>
        <div style={{ marginTop: 10, height: 9, borderRadius: 99, background: T.trk, overflow: 'hidden', display: 'flex' }}>
          <div style={{ width: '90%', background: T.pos }} />
          <div style={{ flex: 1, background: `repeating-linear-gradient(45deg, ${T.warnt}, ${T.warnt} 5px, transparent 5px, transparent 10px)` }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginTop: 9, flexWrap: 'wrap' }}>
          <LegendDot c={T.pos}>18 filled</LegendDot>
          <LegendDot c={T.warn}>2 open</LegendDot>
          <LegendDot c={T.neg}>1 no-show risk</LegendDot>
        </div>
      </div>

      {/* today/week + view modes */}
      <div style={{ marginTop: 15 }}>
        <div style={{ display: 'flex', gap: 4, background: T.surf2, border: `1px solid ${T.bd}`, borderRadius: 12, padding: 4 }}>
          <span style={{ flex: 1, textAlign: 'center', minHeight: 32, lineHeight: '32px', borderRadius: 9, font: `700 12px ${FONT}`, background: T.acc, color: T.acck }}>Today</span>
          <span style={{ flex: 1, textAlign: 'center', minHeight: 32, lineHeight: '32px', borderRadius: 9, font: `600 12px ${FONT}`, color: T.tx2 }}>Week</span>
        </div>
        <div style={{ display: 'flex', gap: 7, marginTop: 10, alignItems: 'center' }}>
          <span style={{ font: `600 10px ${FONT}`, color: T.tx3 }}>Group</span>
          <span style={{ minHeight: 28, display: 'inline-flex', alignItems: 'center', padding: '0 11px', borderRadius: 99, background: T.infot, border: `1px solid ${T.info}`, font: `600 11px ${FONT}`, color: T.infok }}>By shift</span>
          <span style={{ minHeight: 28, display: 'inline-flex', alignItems: 'center', padding: '0 11px', borderRadius: 99, background: T.surf, border: `1px solid ${T.bd}`, font: `600 11px ${FONT}`, color: T.tx2 }}>By person</span>
          <span style={{ minHeight: 28, display: 'inline-flex', alignItems: 'center', padding: '0 11px', borderRadius: 99, background: T.surf, border: `1px solid ${T.bd}`, font: `600 11px ${FONT}`, color: T.tx2 }}>By role</span>
        </div>
      </div>

      {/* open shifts */}
      <div style={{ margin: '18px 2px 9px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ font: `700 10px ${FONT}`, letterSpacing: '.09em', textTransform: 'uppercase', color: T.tx3 }}>Open shifts · act now</span>
        <span style={{ font: `700 10px ${FONT}`, color: T.warnk, background: T.warnt, borderRadius: 99, padding: '3px 9px' }}>2</span>
      </div>
      <div style={{ display: 'flex', background: T.surf, border: `1px dashed ${T.warn}`, borderRadius: 15, overflow: 'hidden' }}>
        <span style={{ width: 4, background: '#8b5cf6', flex: 'none', opacity: 0.6 }} />
        <div style={{ flex: 1, padding: '12px 12px', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ font: `700 13px ${FONT}`, color: T.tx, whiteSpace: 'nowrap' }}>5:30 – 11:00 PM</span>
            <span style={{ font: `700 9px ${FONT}`, letterSpacing: '.04em', textTransform: 'uppercase', background: T.warnt, color: T.warnk, borderRadius: 6, padding: '3px 7px' }}>Open</span>
          </div>
          <div style={{ font: `500 11px ${FONT}`, color: T.tx2, marginTop: 4 }}>Server · Section 3 · Marcus called out</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 11px' }}>
          <span style={{ minHeight: 30, display: 'inline-flex', alignItems: 'center', borderRadius: 9, background: T.acc, color: T.acck, font: `700 11px ${FONT}`, padding: '0 12px' }}>Fill</span>
        </div>
      </div>
    </div>
  );
}
