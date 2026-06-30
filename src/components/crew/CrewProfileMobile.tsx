/**
 * Faithful implementation of "Sundae Crew People - HR.dc.html · A · My profile
 * (employee)" from the Claude Design project — identity hero (role, tenure,
 * status), quick-action tiles, and a My documents list. Dark variant only.
 * Same cool-slate token set as the scheduling design (matches CrewTimeOffMobile).
 * Sits inside <PhoneFrame screenBg="#020617">. Pure markup, no props.
 *
 * Source: claude.ai/design 9d73e488 · "Sundae Crew People - HR.dc.html" (My profile).
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
  post: 'rgba(52,211,153,.14)',
} as const;
const FONT = 'Inter, ui-sans-serif, system-ui, sans-serif';
const AVATAR = '#8b5cf6';

function FileIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <path d="M4 2.5h6l3 3v9H4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M10 2.5v3h3" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function QuickAction({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 16, padding: 14, display: 'flex', flexDirection: 'column', gap: 10, cursor: 'pointer' }}>
      <span style={{ width: 34, height: 34, borderRadius: 10, background: T.surf2, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.tx2 }}>
        {children}
      </span>
      <span style={{ font: `600 13px ${FONT}`, color: T.tx }}>{label}</span>
    </div>
  );
}

function DocRow({ title, meta, first }: { title: string; meta: string; first?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', borderTop: first ? undefined : `1px solid ${T.bd}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0, padding: '13px 15px' }}>
        <span style={{ width: 32, height: 32, borderRadius: 9, background: T.surf2, color: T.tx2, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
          <FileIcon />
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ font: `600 14px ${FONT}`, color: T.tx }}>{title}</div>
          <div style={{ font: `500 11.5px ${FONT}`, color: T.tx3, marginTop: 2 }}>{meta}</div>
        </div>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M5 3l4 4-4 4" stroke={T.tx3} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

export function CrewProfileMobile() {
  return (
    <div style={{ background: T.bg, color: T.tx, fontFamily: FONT, padding: '8px 14px 16px' }}>
      {/* org header + bell + avatar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 2px 0' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 99, padding: '5px 11px 5px 6px', cursor: 'pointer' }}>
          <span style={{ width: 20, height: 20, borderRadius: 6, background: T.acc, color: T.acck, font: `700 10px ${FONT}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>S</span>
          <span style={{ font: `600 11.5px ${FONT}`, color: T.tx, whiteSpace: 'nowrap' }}>Sundae — DIFC</span>
          <span style={{ font: `600 10px ${FONT}`, color: T.tx3 }}>▾</span>
        </span>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <svg width="21" height="21" viewBox="0 0 20 20" fill="none">
            <path d="M10 3a5 5 0 0 0-5 5c0 4-1.5 5-1.5 5h13S15 12 15 8a5 5 0 0 0-5-5Z" stroke={T.tx2} strokeWidth="1.5" />
            <path d="M8.5 16a1.6 1.6 0 0 0 3 0" stroke={T.tx2} strokeWidth="1.5" />
          </svg>
          <span style={{ width: 30, height: 30, borderRadius: '50%', background: T.surf2, border: `1px solid ${T.bd}` }} />
        </div>
      </div>

      {/* identity hero */}
      <div style={{ marginTop: 16, background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 20, padding: 17 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ width: 60, height: 60, borderRadius: '50%', background: AVATAR, color: '#fff', font: `700 23.1px ${FONT}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', border: `2px solid ${T.surf}` }}>LM</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ font: `700 19px ${FONT}`, color: T.tx }}>Lena Moretti</div>
            <div style={{ font: `500 12.5px ${FONT}`, color: T.tx2, marginTop: 2 }}>Server · Sundae — DIFC</div>
          </div>
          <span style={{ font: `700 10px ${FONT}`, letterSpacing: '.04em', textTransform: 'uppercase', background: T.post, color: T.posk, borderRadius: 7, padding: '5px 9px', flex: 'none', whiteSpace: 'nowrap' }}>Active</span>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 8, padding: '3px 8px', font: `600 11px ${FONT}`, color: T.tx2, flex: 'none' }}>🗓 2 yrs 4 mo</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 8, padding: '3px 8px', font: `600 11px ${FONT}`, color: T.tx2, flex: 'none' }}>🆔 EMP-0241</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 8, padding: '3px 8px', font: `600 11px ${FONT}`, color: T.tx2, flex: 'none' }}>📍 DIFC</span>
        </div>
      </div>

      {/* quick actions */}
      <div style={{ font: `700 11px ${FONT}`, letterSpacing: '.09em', textTransform: 'uppercase', color: T.tx3, margin: '18px 2px 8px' }}>Quick actions</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <QuickAction label="Time off">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="3" y="4" width="12" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M3 7.5h12M6 2.5v3M12 2.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </QuickAction>
        <QuickAction label="Payslips">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 2v9m0 0l-3-3m3 3l3-3M3.5 14.5h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </QuickAction>
        <QuickAction label="Documents">
          <FileIcon />
        </QuickAction>
        <QuickAction label="Tasks">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 9l3 3 7-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </QuickAction>
      </div>

      {/* my documents */}
      <div style={{ font: `700 11px ${FONT}`, letterSpacing: '.09em', textTransform: 'uppercase', color: T.tx3, margin: '18px 2px 8px' }}>My documents</div>
      <div style={{ background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 18, padding: 0 }}>
        <DocRow first title="Employment contract" meta="Signed 12 Jan 2024" />
        <DocRow title="Visa & work permit" meta="Valid to Aug 2027" />
        <DocRow title="Latest payslip" meta="March 2026" />
      </div>

      {/* thumb-zone action */}
      <button style={{ width: '100%', minHeight: 48, marginTop: 18, border: 'none', borderRadius: 14, background: T.acc, color: T.acck, font: `700 14px ${FONT}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        Edit profile
      </button>
    </div>
  );
}
