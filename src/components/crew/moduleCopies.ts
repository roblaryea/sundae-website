import type { CrewModuleCopy } from './CrewModulePage';

/**
 * English-authored copy for the non-scheduling Crew module pages. Pages resolve
 * each locale with a safe fallback to English (via `as keyof typeof`), and
 * transcreation follows via the marketing locale pipeline. Glossary terms (Sundae,
 * Crew, Pulse, Labor Intelligence, Workforce Health, WPS/NACHA/RTI…) stay
 * untranslated by design.
 */

export const timeAttendanceCopy: Record<'en', CrewModuleCopy> = {
  en: {
    badge: 'Crew · Time & Attendance',
    heroLine1: 'Hours you can',
    heroLine2: 'actually trust.',
    description:
      'Crew Time & Attendance captures every punch with a server-authoritative geofence and passkey biometrics, attests breaks for compliance, and feeds clean hours straight into payroll — no wall clock, no spreadsheet variance.',
    primaryCta: 'Book a Crew walkthrough',
    secondaryCta: 'See Crew in action',
    heroProof: [
      { value: 'PWA', label: 'Offline-ready punch' },
      { value: 'Geofence', label: 'Server-verified' },
      { value: 'WebAuthn', label: 'Passkey punch' },
      { value: '0', label: 'Variance sheets' },
    ],
    featuresEyebrow: "What's in Time & Attendance",
    featuresTitle: 'Every punch, provable.',
    featuresDescription:
      'A real mobile time clock built for the floor — verified on-site, attested for compliance, and wired straight into payroll and Workforce Health.',
    features: [
      { title: 'Mobile punch PWA', body: 'Clock in and out from a phone, even offline — punches queue locally and replay idempotently when the connection returns.', chips: ['Offline queue', 'Idempotent', 'No hardware'] },
      { title: 'Server-authoritative geofence', body: 'On-site verification happens on the server, not the device — so the radius cannot be spoofed from a couch.', chips: ['Geofence', 'Anti-spoof', 'Per-outlet'] },
      { title: 'Passkey biometrics', body: 'WebAuthn passkey enrol + assertion gates the punch — the right person, on the right device.', chips: ['WebAuthn', 'Biometric', 'Identity'] },
      { title: 'Break attestation', body: 'Meal and rest breaks are attested at punch with a compliance gate, so the record stands up to audit.', chips: ['Breaks', 'Compliance', 'Auditable'] },
      { title: 'Edits & approvals', body: 'Missing-punch flow, punch edits and manager timesheet approvals — clean hours before they ever reach payroll.', chips: ['Punch edit', 'Timesheets', 'Approvals'] },
      { title: 'Straight to payroll', body: 'Approved hours flow into the payroll engine — regular and overtime split computed from the punches themselves.', chips: ['Reg / OT', 'No re-entry', 'To payroll'] },
    ],
    howEyebrow: 'How it works',
    howTitle: 'On-site, attested, approved.',
    howSteps: [
      { title: 'Clock in on-site', body: 'Geofence + passkey verify the punch the moment a shift starts — server-side, not on the device.' },
      { title: 'Attest the break', body: 'Meal and rest breaks are attested with a compliance gate so the timesheet is audit-ready.' },
      { title: 'Approve to payroll', body: 'Managers clear edits and approvals; clean hours feed payroll with the regular/OT split intact.' },
    ],
    loopLine: 'Live attendance and trust scores flow into Workforce Health the moment a shift begins.',
    creamEyebrow: 'On-site. Verified. Attested.',
    creamStatement: 'Attendance the floor can prove.',
    creamLede:
      'A time clock that survives bad signal, resists spoofing, and attests every break — so the hours that reach payroll are ones you can defend.',
    relatedEyebrow: 'The rest of Crew',
    relatedTitle: 'Time & Attendance is one surface of the operational layer.',
    ctaEyebrow: 'Stop reconciling the clock',
    ctaTitle: 'Clock the truth.',
    ctaDescription:
      '30 minutes, your outlets. We show verified punching, break attestation, and clean hours flowing into payroll and Workforce Health.',
    ctaPrimary: 'Book a Crew walkthrough',
    ctaSecondary: 'Explore Sundae Crew',
  },
};

export const payrollCopy: Record<'en', CrewModuleCopy> = {
  en: {
    badge: 'Crew · Payroll',
    heroLine1: 'Payroll-ready,',
    heroLine2: 'every region.',
    description:
      'Crew Payroll is provider-neutral readiness and export — pack-driven across the US, Canada, UK, EU and GCC. Statutory files, year-end forms, and clean partner hand-offs your payroll team reviews before submit. Never a tax engine; always pack-versioned.',
    primaryCta: 'Book a Crew walkthrough',
    secondaryCta: 'See Crew in action',
    heroProof: [
      { value: '5', label: 'Regions in production' },
      { value: '5', label: 'Statutory export formats' },
      { value: '9+', label: 'Year-end form families' },
      { value: '0', label: 'Hardcoded rates' },
    ],
    featuresEyebrow: "What's in Payroll",
    featuresTitle: 'Readiness, export, integrate.',
    featuresDescription:
      'Provider-neutral, pack-driven payroll preparation — the evidence, files and hand-offs your payroll team needs, never a black-box tax engine.',
    features: [
      { title: 'Multi-region packs', body: 'US (federal + every state + cities), Canada (+ Quebec), UK (+ Scotland), EU 27 and the GCC — patterns organised by versioned country packs.', chips: ['US · CA · UK', 'EU 27 · GCC', 'Pack-driven'] },
      { title: 'Statutory exports', body: 'NACHA, EFT (CPA 005), HMRC RTI FPS, SEPA (ISO 20022) and WPS SIF — generated, not hand-built.', chips: ['NACHA · EFT', 'RTI · SEPA', 'WPS'] },
      { title: 'Year-end forms', body: 'W-2/W-3, T4/RL-1, P60/P11D, Lohnsteuerbescheinigung, jaaropgaaf, DSN, Modelo 190, GOSI annual and more.', chips: ['W-2 · T4', 'P60 · DSN', 'GOSI'] },
      { title: 'Provider hand-off', body: 'Export clean files or hand off to Bayzat (MEA), Personio (EU), Pento (UK) and Gusto (US) — complementary, not a rip-and-replace.', chips: ['Bayzat', 'Personio', 'Pento · Gusto'] },
      { title: 'Hours from punches', body: 'The engine reads hours straight from Time & Attendance — regular and overtime split at source, no re-keying.', chips: ['From T&A', 'Reg / OT', 'No re-entry'] },
      { title: 'Evidence-led close', body: 'Proof packs and an AI-explained cycle preview replace QA threads — every close is defensible.', chips: ['Proof packs', 'AI preview', 'Auditable'] },
    ],
    howEyebrow: 'How it works',
    howTitle: 'Hours in, files out — reviewed before submit.',
    howSteps: [
      { title: 'Hours in', body: 'Approved hours arrive from Time & Attendance with the regular/overtime split already computed.' },
      { title: 'Packs compute', body: 'Versioned country-pack rules organise readiness, statutory files and year-end forms — no hardcoded rates.' },
      { title: 'Review & hand off', body: 'Your team reviews the evidence pack, then exports or hands off to the payroll provider before submit.' },
    ],
    loopLine: 'Payroll-cycle status and gratuity liability flow into Labor Intelligence — Payroll & Compliance.',
    creamEyebrow: 'Readiness, not a tax engine',
    creamStatement: 'Close the month in every jurisdiction.',
    creamLede:
      'The same readiness check across the US, Canada, UK, EU and GCC — statutory exports, year-end forms and partner hand-offs, all from versioned packs your team reviews before submit.',
    relatedEyebrow: 'The rest of Crew',
    relatedTitle: 'Payroll is one surface of the operational layer.',
    ctaEyebrow: 'End the regional payroll scramble',
    ctaTitle: 'See payroll readiness, region by region.',
    ctaDescription:
      '30 minutes, your jurisdictions. We walk the readiness check, statutory exports and year-end surfaces — and the hand-off to your provider.',
    ctaPrimary: 'Book a Crew walkthrough',
    ctaSecondary: 'Explore Sundae Crew',
  },
};

export const peopleCopy: Record<'en', CrewModuleCopy> = {
  en: {
    badge: 'Crew · People & HR',
    heroLine1: 'Hire-to-retire,',
    heroLine2: 'one record.',
    description:
      'Crew People runs the whole workforce lifecycle — recruiting, onboarding, documents and e-sign, performance, talent, helpdesk and offboarding — in one governed record that feeds Sundae instead of sitting in an HR silo.',
    primaryCta: 'Book a Crew walkthrough',
    secondaryCta: 'See Crew in action',
    heroProof: [
      { value: '60+', label: 'HR surfaces' },
      { value: 'e-sign', label: 'Docs & evidence' },
      { value: '9-box', label: 'Talent review' },
      { value: 'Free', label: 'Employee portal' },
    ],
    featuresEyebrow: "What's in People & HR",
    featuresTitle: 'The whole lifecycle, in one place.',
    featuresDescription:
      'Every stage of the workforce lifecycle on one governed record — auditable, topology-scoped, and feeding decision intelligence by default.',
    features: [
      { title: 'Onboarding → offboarding', body: 'Recruiting, background checks, onboarding, mobility, offboarding and final settlement — the full lifecycle, not a fragment.', chips: ['Onboard', 'Mobility', 'Offboard'] },
      { title: 'Documents & e-sign', body: 'Document storage, an e-signature flow, evidence packs and credential expiry tracking — paperwork that proves itself.', chips: ['e-sign', 'Evidence', 'Credentials'] },
      { title: 'Performance & talent', body: 'Reviews, 9-box talent, compensation and internal mobility — the strategic people layer, operationalised.', chips: ['Reviews', '9-box', 'Comp'] },
      { title: 'Ask-HR helpdesk', body: 'A private HR case queue with SLAs, attestations and disciplinary workflow — separate from product support.', chips: ['Ask-HR', 'SLA', 'Private'] },
      { title: 'Org tree & permissions', body: 'Photo-card org tree with cascade reassignment and Owner / HR Admin / Manager / Employee tiers.', chips: ['Org tree', 'Cascade', 'RBAC'] },
      { title: 'Free employee portal', body: 'Every employee gets a free Sundae account — shifts, leave, payslips, attestations and biometric punch.', chips: ['Self-service', 'Payslips', 'Free'] },
    ],
    howEyebrow: 'How it works',
    howTitle: 'One record, the whole way through.',
    howSteps: [
      { title: 'Hire & onboard', body: 'Recruiting through onboarding lands a new joiner on one governed record from day one.' },
      { title: 'Operate', body: 'Documents, performance, cases and mobility all live on that record — auditable and scoped.' },
      { title: 'Offboard cleanly', body: 'Offboarding, final settlement and evidence packs close the loop without loose ends.' },
    ],
    loopLine: 'Every lifecycle event is signal — Labor Intelligence reads it without a separate ETL.',
    creamEyebrow: 'One record, whole team',
    creamStatement: 'The people layer that feeds the platform.',
    creamLede:
      'Most operators run HR in a silo that analytics never sees. Crew People keeps the lifecycle on one governed record so the same workforce data flows straight into decision intelligence.',
    relatedEyebrow: 'The rest of Crew',
    relatedTitle: 'People & HR is one surface of the operational layer.',
    ctaEyebrow: 'Retire the HR silo',
    ctaTitle: 'See the lifecycle on one record.',
    ctaDescription:
      '30 minutes, your operation. We walk onboarding, documents, performance and offboarding — and how each event sharpens Labor Intelligence.',
    ctaPrimary: 'Book a Crew walkthrough',
    ctaSecondary: 'Explore Sundae Crew',
  },
};

export const peopleIntelligenceCopy: Record<'en', CrewModuleCopy> = {
  en: {
    badge: 'Crew · People Intelligence',
    heroLine1: 'The workforce,',
    heroLine2: 'finally legible.',
    description:
      'Crew People Intelligence turns operational signal into workforce decisions — headcount, turnover, no-show risk, labor-cost trend, comp and talent — unified inside Labor Intelligence, 5–10× richer than tools that only see the POS.',
    primaryCta: 'Book a Crew walkthrough',
    secondaryCta: 'See Crew in action',
    heroProof: [
      { value: '360°', label: 'Workforce health' },
      { value: 'Live', label: 'No-show risk' },
      { value: 'Unified', label: 'With Labor Intel' },
      { value: 'Closed-loop', label: 'Decisions' },
    ],
    featuresEyebrow: "What's in People Intelligence",
    featuresTitle: 'People analytics that sees the floor.',
    featuresDescription:
      'Not a bolt-on dashboard — Crew signal folded into Labor Intelligence, so workforce decisions sit next to revenue, labor cost and demand.',
    features: [
      { title: 'Workforce Health', body: 'A 360° overview of headcount, schedule pipeline, open punches, trust scores and closed-loop decision coverage.', chips: ['Headcount', 'Pipeline', 'Trust scores'] },
      { title: 'No-show & retention risk', body: 'Live no-show risk on upcoming shifts and turnover signals early enough to run a retention playbook.', chips: ['No-show', 'Turnover', 'Playbooks'] },
      { title: 'Labor-cost trend', body: 'Real labor rate cards drive the labor-cost trend — no flat-rate stub, reconciled to the dollar.', chips: ['Real rates', 'Cost trend', 'Reconciled'] },
      { title: 'Comp & benefits', body: 'Compensation, benefits and gratuity liability intelligence — the money side of the workforce, made legible.', chips: ['Comp', 'Benefits', 'Gratuity'] },
      { title: 'Talent & mobility', body: 'Talent review, 9-box and internal mobility surfaced as decisions, not static HR reports.', chips: ['Talent', '9-box', 'Mobility'] },
      { title: 'Payroll & compliance', body: 'WPS / SIF exports, overtime leakage and country-pack admin folded into the Payroll & Compliance view.', chips: ['Overtime', 'Statutory', 'Compliance'] },
    ],
    howEyebrow: 'How it works',
    howTitle: 'Crew signal in, decisions out.',
    howSteps: [
      { title: 'Signal in', body: 'Schedules, punches, payroll cycles and cases stream in from the Crew operational layer.' },
      { title: 'Modeled', body: 'Labor Intelligence models it alongside revenue, demand and labor cost — one ledger, not a silo.' },
      { title: 'Act & replay', body: 'Recommendations become decisions; Decision Replay logs who decided what, audit-ready.' },
    ],
    loopLine: 'It is not a separate module — it is Crew signal sharpening Labor Intelligence.',
    creamEyebrow: 'Decisions, not dashboards',
    creamStatement: 'Workforce intelligence that sees the whole business.',
    creamLede:
      'People analytics is only as good as the signal behind it. Because Crew runs the operational layer, Labor Intelligence sees the workforce and the floor together — richer than anything wired to POS alone.',
    relatedEyebrow: 'The rest of Crew',
    relatedTitle: 'People Intelligence is one surface of the operational layer.',
    ctaEyebrow: 'See the workforce clearly',
    ctaTitle: 'Make workforce decisions, not reports.',
    ctaDescription:
      '30 minutes, your data. We show Workforce Health, no-show risk and labor-cost trend — and how Crew signal makes Labor Intelligence sharper.',
    ctaPrimary: 'Book a Crew walkthrough',
    ctaSecondary: 'Explore Sundae Crew',
  },
};
