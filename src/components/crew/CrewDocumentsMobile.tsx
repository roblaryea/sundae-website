'use client';

/**
 * Faithful implementation of "Sundae Crew People - HR.dc.html · C · Documents & tasks
 * (employee)" from the Claude Design project — to-sign list (with due dates), an
 * onboarding checklist with progress, statuses, and the single next-step thumb-zone
 * action. DARK variant only. Same cool-slate token set as the scheduling design.
 * Sits inside <PhoneFrame screenBg="#020617">. Pure markup.
 *
 * Source: claude.ai/design 9d73e488 · "Sundae Crew People - HR.dc.html" (C · Documents & tasks).
 */

import { useCrewScreen } from './crewI18n';
import { LOC } from './locales/CrewDocumentsMobile.locales';

const EN = {
  title: 'Documents & tasks',
  toSignOnboarding: 'to sign · onboarding',
  sectionToSign: 'To sign',
  signCta: 'Sign',
  due: 'Due',
  dueToday: 'Due today',
  docLeavePolicy: 'Updated leave policy',
  docHealthSafety: 'Health & safety brief',
  onboardingChecklist: 'Onboarding checklist',
  of: 'of',
  done: 'done',
  statusDone: 'Done',
  statusNow: 'Now',
  statusPending: 'Pending',
  taskContract: 'Contract signed',
  taskRtw: 'Right-to-work verified',
  taskBank: 'Bank details',
  addToGetPaid: 'Add to get paid',
  taskUniform: 'Uniform & locker',
  taskFirstShift: 'First shift booked',
  addBankDetails: 'Add bank details',
};

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
  posk: '#4ade80',
  post: 'rgba(34,197,94,.14)',
  warn: '#f59e0b',
  warnk: '#fbbf24',
  warnt: 'rgba(245,158,11,.14)',
  info: '#3b82f6',
  infok: '#60a5fa',
  infot: 'rgba(59,130,246,.16)',
  trk: '#1e293b',
} as const;
const FONT = 'Inter, ui-sans-serif, system-ui, sans-serif';

function FileIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <path d="M4 2.5h6l3 3v9H4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M10 2.5v3h3" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
      <path d="M4 8l2.4 2.4L11 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SignRow({ title, due, dueTone, signLabel, first }: { title: string; due: string; dueTone: string; signLabel: string; first?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', borderTop: first ? undefined : `1px solid ${T.bd}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0, padding: '13px 15px' }}>
        <span style={{ width: 34, height: 34, borderRadius: 10, background: T.infot, color: T.infok, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
          <FileIcon />
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ font: `600 14px ${FONT}`, color: T.tx }}>{title}</div>
          <div style={{ font: `500 11.5px ${FONT}`, color: dueTone, marginTop: 2 }}>{due}</div>
        </div>
        <button style={{ background: T.info, color: '#fff', border: 'none', borderRadius: 10, padding: '9px 15px', font: `700 12px ${FONT}`, cursor: 'pointer', flex: 'none' }}>{signLabel}</button>
      </div>
    </div>
  );
}

function ChecklistRow({
  title,
  meta,
  metaTone,
  state,
  doneLabel,
  nowLabel,
  first,
}: {
  title: string;
  meta: string;
  metaTone: string;
  state: 'done' | 'now' | 'pending';
  doneLabel: string;
  nowLabel: string;
  first?: boolean;
}) {
  let marker;
  if (state === 'done') {
    marker = (
      <span style={{ width: 28, height: 28, borderRadius: '50%', background: T.post, color: T.posk, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
        <CheckIcon />
      </span>
    );
  } else if (state === 'now') {
    marker = (
      <span style={{ width: 28, height: 28, borderRadius: '50%', background: T.warnt, border: `1.5px solid ${T.warn}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: T.warn }} />
      </span>
    );
  } else {
    marker = <span style={{ width: 28, height: 28, borderRadius: '50%', border: `1.5px solid ${T.bd}`, display: 'flex', flex: 'none' }} />;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', borderTop: first ? undefined : `1px solid ${T.bd}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0, padding: '13px 15px' }}>
        {marker}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ font: `600 14px ${FONT}`, color: T.tx }}>{title}</div>
          <div style={{ font: `500 11.5px ${FONT}`, color: metaTone, marginTop: 2 }}>{meta}</div>
        </div>
        {state === 'done' && (
          <span style={{ font: `700 10px ${FONT}`, letterSpacing: '.04em', textTransform: 'uppercase', background: T.post, color: T.posk, borderRadius: 7, padding: '5px 9px', flex: 'none', whiteSpace: 'nowrap' }}>{doneLabel}</span>
        )}
        {state === 'now' && (
          <span style={{ font: `700 10px ${FONT}`, letterSpacing: '.04em', textTransform: 'uppercase', background: T.warnt, color: T.warnk, borderRadius: 7, padding: '5px 9px', flex: 'none', whiteSpace: 'nowrap' }}>{nowLabel}</span>
        )}
      </div>
    </div>
  );
}

export function CrewDocumentsMobile() {
  const { t } = useCrewScreen(EN, LOC);
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
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 3a5 5 0 0 0-5 5c0 4-1.5 5-1.5 5h13S15 12 15 8a5 5 0 0 0-5-5Z" stroke={T.tx2} strokeWidth="1.5" /><path d="M8.5 16a1.6 1.6 0 0 0 3 0" stroke={T.tx2} strokeWidth="1.5" /></svg>
          <span style={{ width: 26, height: 26, borderRadius: '50%', background: T.surf2, border: `1px solid ${T.bd}` }} />
        </div>
      </div>

      {/* title */}
      <div style={{ margin: '14px 2px 0' }}>
        <div style={{ font: `700 20px ${FONT}`, letterSpacing: '-.02em' }}>{t.title}</div>
        <div style={{ font: `500 11px ${FONT}`, color: T.tx3, marginTop: 2 }}>2 {t.toSignOnboarding}</div>
      </div>

      {/* to sign */}
      <div style={{ font: `700 10px ${FONT}`, letterSpacing: '.09em', textTransform: 'uppercase', color: T.tx3, margin: '16px 2px 8px' }}>{t.sectionToSign} · 2</div>
      <div style={{ background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 18 }}>
        <SignRow title={t.docLeavePolicy} due={t.dueToday} dueTone={T.warnk} signLabel={t.signCta} first />
        <SignRow title={t.docHealthSafety} due={`${t.due} 5 Apr`} dueTone={T.tx3} signLabel={t.signCta} />
      </div>

      {/* onboarding checklist */}
      <div style={{ font: `700 10px ${FONT}`, letterSpacing: '.09em', textTransform: 'uppercase', color: T.tx3, margin: '18px 2px 8px' }}>{t.onboardingChecklist}</div>
      <div style={{ background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 18, padding: '15px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ font: `600 13px ${FONT}`, color: T.tx }}>3 {t.of} 5 {t.done}</span>
          <span style={{ font: `600 11px ${FONT}`, color: T.posk }}>60%</span>
        </div>
        <div style={{ height: 8, borderRadius: 99, background: T.trk, overflow: 'hidden' }}>
          <span style={{ display: 'block', height: '100%', width: '60%', background: T.acc, borderRadius: 99 }} />
        </div>
      </div>

      <div style={{ marginTop: 10, background: T.surf, border: `1px solid ${T.bd}`, borderRadius: 18 }}>
        <ChecklistRow title={t.taskContract} meta="12 Jan" metaTone={T.tx3} state="done" doneLabel={t.statusDone} nowLabel={t.statusNow} first />
        <ChecklistRow title={t.taskRtw} meta="12 Jan" metaTone={T.tx3} state="done" doneLabel={t.statusDone} nowLabel={t.statusNow} />
        <ChecklistRow title={t.taskBank} meta={t.addToGetPaid} metaTone={T.tx2} state="now" doneLabel={t.statusDone} nowLabel={t.statusNow} />
        <ChecklistRow title={t.taskUniform} meta={t.statusPending} metaTone={T.tx2} state="pending" doneLabel={t.statusDone} nowLabel={t.statusNow} />
        <ChecklistRow title={t.taskFirstShift} meta={t.statusPending} metaTone={T.tx2} state="pending" doneLabel={t.statusDone} nowLabel={t.statusNow} />
      </div>

      {/* thumb-zone action — single next step */}
      <button style={{ width: '100%', minHeight: 48, marginTop: 18, border: 'none', borderRadius: 14, background: T.acc, color: T.acck, font: `700 14px ${FONT}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" /></svg>
        {t.addBankDetails}
      </button>
    </div>
  );
}
