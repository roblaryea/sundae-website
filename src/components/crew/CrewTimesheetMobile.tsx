'use client';

/**
 * Employee "This week — hours" timesheet surface for the Crew Time & Attendance
 * module. Weekly-total hero (regular vs overtime split), a Mon–Sun day list with
 * in–out times and per-day hours, and a thumb-zone "Submit timesheet" action.
 *
 * The Claude Design "Sundae Mobile" / "Sundae Crew Scheduling" projects had no
 * dedicated timesheet/hours-summary screen, so this is composed in the same cool-
 * slate design language as CrewClockInMobile.tsx (same T tokens, FONT, inline
 * styles, PhoneFrame-hosted, pure markup). Sits inside <PhoneFrame screenBg="#020617">.
 *
 * This screen shows HOURS, not money — strings localize, hours stay numeric, no
 * currency conversion.
 */

import { useCrewScreen } from './crewI18n';
import { LOC } from './locales/CrewTimesheetMobile.locales';

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
} as const;
const FONT = 'Inter, ui-sans-serif, system-ui, sans-serif';

const EN = {
  thisWeek: 'This week',
  totalHours: 'Total hours',
  regular: 'Regular',
  overtime: 'Overtime',
  off: 'Off',
  restDay: 'Rest day',
  ot: 'OT',
  pending: 'Pending',
  submitBy: 'submit by',
  submitTimesheet: 'Submit timesheet',
  mon: 'Mon',
  tue: 'Tue',
  wed: 'Wed',
  thu: 'Thu',
  fri: 'Fri',
  sat: 'Sat',
  sun: 'Sun',
} as const;

const DAYS = [
  { dayKey: 'mon', date: 'Jun 23', in: '5:00 PM', out: '11:00 PM', hours: '6.0h', ot: false, off: false },
  { dayKey: 'tue', date: 'Jun 24', in: '5:18 PM', out: '11:30 PM', hours: '6.2h', ot: false, off: false },
  { dayKey: 'wed', date: 'Jun 25', in: '4:30 PM', out: '11:00 PM', hours: '6.5h', ot: false, off: false },
  { dayKey: 'thu', date: 'Jun 26', in: '12:00 PM', out: '8:48 PM', hours: '8.8h', ot: true, off: false },
  { dayKey: 'fri', date: 'Jun 27', in: '5:00 PM', out: '9:00 PM', hours: '4.0h', ot: false, off: false },
  { dayKey: 'sat', date: 'Jun 28', in: '—', out: '—', hours: null, ot: false, off: true },
  { dayKey: 'sun', date: 'Jun 29', in: '—', out: '—', hours: null, ot: false, off: true },
] as const;

export function CrewTimesheetMobile() {
  const { t } = useCrewScreen(EN, LOC);
  return (
    <div style={{ background: T.bg, color: T.tx, fontFamily: FONT, padding: '8px 14px 16px' }}>
      <div style={{ font: `600 10px ${FONT}`, letterSpacing: '.12em', textTransform: 'uppercase', color: T.tx3 }}>
        Sundae · DIFC
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 6 }}>
        <div style={{ font: `600 21px ${FONT}`, color: T.tx }}>{t.thisWeek}</div>
        <div style={{ font: `500 12px ${FONT}`, color: T.tx2 }}>Jun 23 – 29</div>
      </div>

      {/* weekly total hero */}
      <div
        style={{
          marginTop: 14,
          background: `linear-gradient(160deg, ${T.surf}, ${T.surf2})`,
          border: `1px solid ${T.bd}`,
          borderRadius: 18,
          padding: 16,
        }}
      >
        <div style={{ font: `600 10px ${FONT}`, letterSpacing: '.1em', textTransform: 'uppercase', color: T.tx3 }}>
          {t.totalHours}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
          <span style={{ font: `700 38px ${FONT}`, color: T.tx, letterSpacing: '-.02em' }}>31.5</span>
          <span style={{ font: `600 16px ${FONT}`, color: T.tx2 }}>h</span>
        </div>

        {/* regular vs overtime split bar */}
        <div style={{ display: 'flex', height: 8, borderRadius: 6, overflow: 'hidden', marginTop: 14, background: T.bd }}>
          <div style={{ width: '88%', background: T.acc }} />
          <div style={{ width: '12%', background: T.warn }} />
        </div>
        <div style={{ display: 'flex', gap: 18, marginTop: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: T.acc }} />
            <span style={{ font: `500 12px ${FONT}`, color: T.tx2 }}>{t.regular}</span>
            <span style={{ font: `600 12px ${FONT}`, color: T.tx }}>27.7h</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: T.warn }} />
            <span style={{ font: `500 12px ${FONT}`, color: T.tx2 }}>{t.overtime}</span>
            <span style={{ font: `600 12px ${FONT}`, color: T.tx }}>3.8h</span>
          </div>
        </div>
      </div>

      {/* per-day list */}
      <div
        style={{
          marginTop: 14,
          background: T.surf,
          border: `1px solid ${T.bd}`,
          borderRadius: 16,
          overflow: 'hidden',
        }}
      >
        {DAYS.map((d, i) => {
          const off = d.off;
          return (
            <div
              key={d.dayKey}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '11px 14px',
                borderTop: i === 0 ? 'none' : `1px solid ${T.bd}`,
              }}
            >
              <div style={{ width: 42 }}>
                <div style={{ font: `600 13px ${FONT}`, color: off ? T.tx3 : T.tx }}>{t[d.dayKey]}</div>
                <div style={{ font: `500 10px ${FONT}`, color: T.tx3, marginTop: 1 }}>{d.date}</div>
              </div>
              <div style={{ flex: 1, font: `500 12px ${FONT}`, color: off ? T.tx3 : T.tx2 }}>
                {off ? t.restDay : `${d.in} – ${d.out}`}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                {d.ot && (
                  <span
                    style={{
                      font: `600 9px ${FONT}`,
                      letterSpacing: '.06em',
                      textTransform: 'uppercase',
                      color: T.warn,
                      background: 'rgba(245,158,11,.12)',
                      border: '1px solid rgba(245,158,11,.3)',
                      borderRadius: 6,
                      padding: '2px 6px',
                    }}
                  >
                    {t.ot}
                  </span>
                )}
                <span style={{ font: `600 13px ${FONT}`, color: off ? T.tx3 : T.tx, minWidth: 34, textAlign: 'right' }}>
                  {off ? t.off : d.hours}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* status + submit */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 13 }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6.25" stroke={T.warn} strokeWidth="1.5" />
          <path d="M8 5v3.2l2 1.2" stroke={T.warn} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ font: `500 12px ${FONT}`, color: T.tx2 }}>
          {t.pending} — {t.submitBy} {t.sun} 11:59 PM
        </span>
      </div>

      <button
        style={{
          marginTop: 11,
          width: '100%',
          border: 'none',
          borderRadius: 20,
          background: 'linear-gradient(180deg,#34d399,#22c55e)',
          boxShadow: '0 14px 30px -8px rgba(34,197,94,.5)',
          padding: '16px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 9,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path d="M4 10.5l3.8 3.8L16 6" stroke={T.acck} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ font: `700 16px ${FONT}`, color: T.acck, letterSpacing: '-.01em' }}>{t.submitTimesheet}</span>
      </button>
    </div>
  );
}
