/**
 * Faithful implementation of "Crew People Intelligence · Workforce Health
 * (manager/owner)" from the Claude Design project — answer-first verdict, KPI
 * grid, labor-cost trend. Same cool-slate token set as the scheduling design.
 * Sits inside <PhoneFrame screenBg="#020617">. Pure markup.
 *
 * Source: claude.ai/design 9d73e488 · "Sundae Crew People Intelligence.dc.html".
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
  posk: '#4ade80',
  warn: '#f59e0b',
  warnk: '#fbbf24',
} as const;
const FONT = 'Inter, ui-sans-serif, system-ui, sans-serif';

function Kpi({ label, value, sub, vColor, set }: { label: string; value: string; sub: string; vColor?: string; set?: string }) {
  return (
    <div style={{ flex: 1, background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 14, padding: 12 }}>
      <div style={{ font: `600 9.5px ${FONT}`, letterSpacing: '.04em', color: T.tx3 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginTop: 4 }}>
        <span style={{ font: `700 17px ${FONT}`, color: vColor || T.tx }}>{value}</span>
        {set && <span style={{ font: `600 10px ${FONT}`, color: T.posk }}>{set}</span>}
      </div>
      <div style={{ font: `500 9.5px ${FONT}`, color: T.tx3, marginTop: 2 }}>{sub}</div>
    </div>
  );
}

export function CrewWorkforceHealthMobile() {
  const bars = [44, 52, 47, 58, 50, 62, 40];
  return (
    <div style={{ background: T.bg, color: T.tx, fontFamily: FONT, padding: '8px 14px 16px' }}>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 999, padding: '5px 10px 5px 5px' }}>
          <span style={{ width: 20, height: 20, borderRadius: 6, background: T.acc, color: T.acck, font: `800 10px ${FONT}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>S</span>
          <span style={{ font: `600 12px ${FONT}`, color: T.tx }}>Sundae — DIFC</span>
          <svg width="11" height="11" viewBox="0 0 15 15" fill="none"><path d="M4 6l3.5 3.5L11 6" stroke={T.tx3} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M5 8a5 5 0 0110 0c0 4 1.5 5 1.5 5h-13S5 12 5 8z" stroke={T.tx2} strokeWidth="1.5" strokeLinejoin="round" /><path d="M8.5 16a1.6 1.6 0 003 0" stroke={T.tx2} strokeWidth="1.5" /></svg>
          <span style={{ width: 26, height: 26, borderRadius: '50%', background: T.surf2, border: `1px solid ${T.bd}` }} />
        </div>
      </div>

      <div style={{ margin: '14px 2px 0' }}>
        <div style={{ font: `700 20px ${FONT}`, letterSpacing: '-.02em' }}>Workforce Health</div>
        <div style={{ font: `500 11px ${FONT}`, color: T.tx3, marginTop: 2 }}>All outlets · live</div>
      </div>

      {/* verdict */}
      <div style={{ marginTop: 12, background: `linear-gradient(135deg, rgba(52,211,153,.16), transparent)`, border: `1px solid ${T.bd}`, borderRadius: 18, padding: 15, position: 'relative', overflow: 'hidden' }}>
        <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: T.acc }} />
        <div style={{ font: `700 10px ${FONT}`, letterSpacing: '.09em', textTransform: 'uppercase', color: T.tx3 }}>Verdict · all outlets</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: T.acc }} />
          <span style={{ font: `700 24px ${FONT}`, color: T.posk, letterSpacing: '-.01em' }}>Healthy</span>
        </div>
        <div style={{ font: `500 12px ${FONT}`, color: T.tx2, marginTop: 7 }}>Turnover down 6% · 2 shifts at no-show risk tonight.</div>
      </div>

      {/* KPI grid */}
      <div style={{ display: 'flex', gap: 8, marginTop: 11 }}>
        <Kpi label="Headcount" value="412" set="+8" sub="vs last month" />
        <Kpi label="Turnover" value="8.2% ↓" vColor={T.posk} sub="down 6%" />
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <Kpi label="No-show risk" value="Low" vColor={T.warnk} sub="2 shifts tonight" />
        <Kpi label="Labor cost" value="28.4%" sub="on target" />
      </div>

      {/* labor-cost trend */}
      <div style={{ marginTop: 11, background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 14, padding: 13 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ font: `700 10px ${FONT}`, letterSpacing: '.06em', textTransform: 'uppercase', color: T.tx3 }}>Labor-cost trend</span>
          <span style={{ font: `700 10px ${FONT}`, color: T.posk }}>−1.4 pts this month</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 6, height: 46, marginTop: 10 }}>
          {bars.map((b, i) => (
            <span key={i} style={{ flex: 1, height: `${b}%`, borderRadius: 3, background: i === bars.length - 1 ? T.acc : 'rgba(52,211,153,.4)' }} />
          ))}
        </div>
      </div>

      {/* needs a decision */}
      <div style={{ marginTop: 11, display: 'flex', alignItems: 'center', gap: 10, background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 14, padding: '11px 13px' }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: T.warn, flex: 'none' }} />
        <span style={{ flex: 1, font: `500 11px ${FONT}`, color: T.tx2 }}>2 shifts at no-show risk tonight</span>
        <span style={{ minHeight: 28, display: 'inline-flex', alignItems: 'center', borderRadius: 9, background: T.acc, color: T.acck, font: `700 10.5px ${FONT}`, padding: '0 11px' }}>Line up cover</span>
      </div>
    </div>
  );
}
