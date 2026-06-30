/**
 * Faithful implementation of "Sundae Crew People Intelligence · D · Labor cost"
 * (DARK variant) from the Claude Design project — answer-first labor-cost verdict
 * vs target, 7-week trend, and by-outlet breakdown. Same cool-slate token set as
 * the scheduling design. Sits inside <PhoneFrame screenBg="#020617">. Pure markup.
 *
 * Source: claude.ai/design 9d73e488 · "Sundae Crew People Intelligence.dc.html" · D · Labor cost.
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
  post: 'rgba(34,197,94,.14)',
  warn: '#f59e0b',
  warnk: '#fbbf24',
} as const;
const FONT = 'Inter, ui-sans-serif, system-ui, sans-serif';

function OutletBar({ name, value, width, color }: { name: string; value: string; width: string; color: string }) {
  return (
    <div style={{ padding: '12px 0 2px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
        <span style={{ font: `600 13px ${FONT}`, color: T.tx }}>{name}</span>
        <span style={{ font: `600 12.5px ${FONT}`, color: T.tx2 }}>{value}</span>
      </div>
      <div style={{ height: 8, borderRadius: 99, background: T.bd, overflow: 'hidden' }}>
        <span style={{ display: 'block', height: '100%', width, background: color, borderRadius: 99 }} />
      </div>
    </div>
  );
}

export function CrewLaborCostMobile() {
  const trend = [64, 62, 60, 58, 57, 56, 55];
  return (
    <div style={{ background: T.bg, color: T.tx, fontFamily: FONT, padding: '8px 14px 16px' }}>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 2px 0' }}>
        <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 99, padding: '5px 11px 5px 6px', cursor: 'pointer' }}>
          <span style={{ width: 20, height: 20, borderRadius: 6, background: T.acc, color: T.acck, font: `700 10px ${FONT}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>S</span>
          <span style={{ font: `600 11.5px ${FONT}`, color: T.tx, whiteSpace: 'nowrap' }}>Sundae — DIFC</span>
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
          <h1 style={{ font: `700 23px ${FONT}`, letterSpacing: '-.02em', color: T.tx, margin: 0 }}>Labor cost</h1>
          <div style={{ font: `500 12.5px ${FONT}`, color: T.tx3, marginTop: 3 }}>Live · vs target</div>
        </div>
      </div>

      {/* hero verdict */}
      <div style={{ marginTop: 12, background: 'linear-gradient(135deg, rgba(52,211,153,.18), transparent)', border: `1px solid ${T.bd}`, borderRadius: 20, padding: 17, position: 'relative', overflow: 'hidden' }}>
        <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 5, background: T.acc }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ font: `700 11px ${FONT}`, letterSpacing: '.09em', textTransform: 'uppercase', color: T.tx3 }}>Cost of labor · MTD</span>
          <span style={{ font: `700 10px ${FONT}`, letterSpacing: '.04em', textTransform: 'uppercase', background: T.post, color: T.posk, borderRadius: 7, padding: '5px 9px', flex: 'none', whiteSpace: 'nowrap' }}>On target</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 9, marginTop: 8 }}>
          <span style={{ font: `700 34px ${FONT}`, letterSpacing: '-.02em', color: T.tx }}>28.4%</span>
          <span style={{ font: `600 13px ${FONT}`, color: T.posk }}>1.6 pts under target</span>
        </div>
        <div style={{ marginTop: 14, position: 'relative' }}>
          <div style={{ height: 8, borderRadius: 99, background: T.bd, overflow: 'hidden' }}>
            <span style={{ display: 'block', height: '100%', width: '95%', background: T.acc, borderRadius: 99 }} />
          </div>
          <span style={{ position: 'absolute', top: -3, left: '100%', transform: 'translateX(-100%)', width: 2, height: 14, background: T.tx3 }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 7 }}>
          <span style={{ font: `500 10px ${FONT}`, color: T.tx3 }}>Actual 28.4%</span>
          <span style={{ font: `500 10px ${FONT}`, color: T.tx3 }}>Target 30%</span>
        </div>
      </div>

      {/* trend */}
      <div style={{ marginTop: 12, background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 20, padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ font: `700 11px ${FONT}`, letterSpacing: '.09em', textTransform: 'uppercase', color: T.tx3 }}>Trend · 7 weeks</span>
          <span style={{ font: `700 11px ${FONT}`, color: T.posk }}>−1.4 pts</span>
        </div>
        <div style={{ marginTop: 14 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 7, height: 64 }}>
            {trend.map((h, i) => (
              <span key={i} style={{ flex: 1, height: h, borderRadius: 5, background: i === trend.length - 1 ? T.acc : T.bd }} />
            ))}
          </div>
        </div>
      </div>

      {/* by outlet */}
      <div style={{ font: `700 11px ${FONT}`, letterSpacing: '.09em', textTransform: 'uppercase', color: T.tx3, margin: '18px 2px 8px' }}>By outlet</div>
      <div style={{ background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 18, padding: '4px 16px 14px' }}>
        <div style={{ padding: '2px 0 2px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
            <span style={{ font: `600 13px ${FONT}`, color: T.tx }}>Sundae — DIFC</span>
            <span style={{ font: `600 12.5px ${FONT}`, color: T.tx2 }}>27.1%</span>
          </div>
          <div style={{ height: 8, borderRadius: 99, background: T.bd, overflow: 'hidden' }}>
            <span style={{ display: 'block', height: '100%', width: '90%', background: T.acc, borderRadius: 99 }} />
          </div>
        </div>
        <OutletBar name="Sundae — Marina" value="28.0%" width="93%" color={T.acc} />
        <OutletBar name="Sundae — JBR" value="31.2%" width="104%" color={T.warn} />
      </div>

      {/* CTA */}
      <button style={{ width: '100%', minHeight: 48, marginTop: 18, border: 'none', borderRadius: 14, background: T.acc, color: T.acck, font: `700 14px ${FONT}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M5 3l5 5-5 5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Open labor cost
      </button>
    </div>
  );
}
