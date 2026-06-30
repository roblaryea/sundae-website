import type { CrewModuleCopy } from './CrewModulePage';

/**
 * English-authored copy for the non-scheduling Crew module pages. Plain-language,
 * benefit-first — no product/tech jargon in user-facing strings. Pages resolve
 * each locale with a safe fallback to English (via `as keyof typeof`); full
 * transcreation is provided per locale. Product names (Sundae, Crew, Pulse, Labor
 * Intelligence, Workforce Health) stay untranslated by design.
 */

export const timeAttendanceCopy: Record<'en', CrewModuleCopy> = {
  en: {
    badge: 'Crew · Time & Attendance',
    heroLine1: 'Hours you can',
    heroLine2: 'actually trust.',
    description:
      "Crew Time & Attendance turns any phone into the time clock. Staff clock in only when they are at the restaurant, confirm it with a quick face check, and log their breaks — so the hours that reach payroll are clean and easy to stand behind.",
    primaryCta: 'Book a Crew walkthrough',
    secondaryCta: 'See Crew in action',
    heroProof: [
      { value: 'Tap to clock in', label: 'no punch clock to buy' },
      { value: 'On-site only', label: 'no clocking in from home' },
      { value: 'Face check', label: 'the right person, every time' },
      { value: 'Clean hours', label: 'straight into payroll' },
    ],
    featuresEyebrow: "What's in Time & Attendance",
    featuresTitle: 'Every hour, provable.',
    featuresDescription:
      "A time clock that lives on your team's phones — verified at the restaurant, honest about breaks, and wired straight into payroll.",
    features: [
      { title: 'Clock in from any phone', body: 'No hardware to buy or mount. Staff clock in and out from their own phone — and if the signal drops, the clock-in saves and syncs the moment they are back online.', chips: ['Any phone', 'Works offline', 'No hardware'] },
      { title: 'At the restaurant only', body: 'Confirms a person is actually on-site before they can clock in — so a shift cannot be started from the sofa.', chips: ['On-site only', "Can't be faked", 'Per location'] },
      { title: 'Face or fingerprint check', body: 'A quick face or fingerprint check confirms the right person is clocking in — no one punching in for a friend.', chips: ['Face check', 'Fingerprint', 'Right person'] },
      { title: 'Honest breaks', body: 'Staff confirm their meal and rest breaks at clock-out, so the timesheet stands up to a labor audit.', chips: ['Breaks logged', 'Audit-ready', 'Compliant'] },
      { title: 'Fix-ups & sign-off', body: 'Forgot to clock in? A simple fix-it step plus a manager sign-off means clean hours before they ever reach payroll.', chips: ['Fix missed clock-ins', 'Manager sign-off', 'Clean hours'] },
      { title: 'Straight to payroll', body: 'Approved hours flow into payroll automatically — regular and overtime worked out for you, with nothing re-typed.', chips: ['Auto to payroll', 'Overtime sorted', 'No re-typing'] },
    ],
    howEyebrow: 'How it works',
    howTitle: 'Clock in, take your break, get paid right.',
    howSteps: [
      { title: 'Clock in on-site', body: 'A quick face check confirms the right person, at the restaurant, the moment the shift starts.' },
      { title: 'Log the break', body: 'Staff confirm their breaks at clock-out, so every timesheet is honest and audit-ready.' },
      { title: 'Approved to payroll', body: 'Managers fix any misses and sign off; clean hours flow into payroll with overtime already worked out.' },
    ],
    loopLine: 'Live attendance flows into Workforce Health the moment a shift begins — so the picture is always current.',
    creamEyebrow: 'On-site. Verified. Honest.',
    creamStatement: 'Attendance the floor can prove.',
    creamLede:
      'A time clock that survives bad signal, cannot be faked from home, and logs every break — so the hours that reach payroll are ones you can stand behind.',
    relatedEyebrow: 'The rest of Crew',
    relatedTitle: 'Time & Attendance is one piece of the operational layer.',
    ctaEyebrow: 'Stop reconciling the clock',
    ctaTitle: 'Clock the truth.',
    ctaDescription:
      '30 minutes, your outlets. See on-site clock-in, honest breaks, and clean hours flowing into payroll and Workforce Health.',
    ctaPrimary: 'Book a Crew walkthrough',
    ctaSecondary: 'Explore Sundae Crew',
  },
};

export const payrollCopy: Record<'en', CrewModuleCopy> = {
  en: {
    badge: 'Crew · Payroll',
    heroLine1: 'Payroll-ready,',
    heroLine2: 'every country.',
    description:
      "Crew Payroll gets your numbers ready to pay in 39+ countries — the US, Canada, UK, EU and the GCC. It produces the exact files each country expects and the year-end paperwork, then hands clean output to your team or provider to check before anyone gets paid.",
    primaryCta: 'Book a Crew walkthrough',
    secondaryCta: 'See Crew in action',
    heroProof: [
      { value: '39+ countries', label: 'US, Canada, UK, EU & GCC' },
      { value: '100+', label: 'states, provinces & cities' },
      { value: 'Year-end ready', label: 'the right forms, everywhere' },
      { value: 'Checked first', label: 'before anyone gets paid' },
    ],
    featuresEyebrow: "What's in Payroll",
    featuresTitle: 'Pay-ready in every country you operate.',
    featuresDescription:
      'Crew gets payroll ready and exports it — it never replaces your tax rules. It organises the files, paperwork and hand-offs your team checks before submitting.',
    features: [
      { title: '39+ countries, one way of working', body: 'The US (every state and major city), Canada (every province), the UK (all four nations), the 27 EU countries and the six GCC states — the same check-and-send flow everywhere.', chips: ['US · Canada · UK', 'EU · GCC', '39+ countries'] },
      { title: 'The exact files each country needs', body: 'Every country has its own required payroll and bank-payment files. Crew produces them in the precise format the authorities expect — your team just reviews and sends.', chips: ['Bank files', 'Tax filings', 'Right format'] },
      { title: 'Year-end, handled', body: 'The annual tax forms employees and authorities expect in each country — generated, not chased down in a spreadsheet.', chips: ['Annual forms', 'Per country', 'No scramble'] },
      { title: 'Bring your own provider', body: "Already using a payroll provider? Crew hands off clean files to the big ones — it works alongside what you have, it doesn't rip it out.", chips: ['Clean hand-off', 'Works alongside', 'Your choice'] },
      { title: 'Hours pulled in for you', body: 'Approved hours come straight from Time & Attendance with overtime already worked out — no re-keying between systems.', chips: ['From clock-ins', 'Overtime sorted', 'No re-typing'] },
      { title: 'Every run, defensible', body: 'A plain-English preview and a paper trail for each pay run replace the back-and-forth — so every close stands up to a check.', chips: ['Plain preview', 'Paper trail', 'Audit-ready'] },
    ],
    howEyebrow: 'How it works',
    howTitle: 'Hours in, files out — checked before payday.',
    howSteps: [
      { title: 'Hours come in', body: 'Approved hours arrive from Time & Attendance with overtime already calculated.' },
      { title: 'Crew gets it ready', body: "Each country's rules organise the payroll files, bank payments and year-end forms — nothing hardcoded, always current." },
      { title: 'You check, then pay', body: 'Your team reviews the plain-English preview, then exports or hands off to your provider before anyone is paid.' },
    ],
    loopLine: 'Pay-run status and overtime trends flow into Labor Intelligence — so cost is never a month behind.',
    creamEyebrow: 'Ready to pay, not a tax engine',
    creamStatement: 'Close the month in every country.',
    creamLede:
      'The same check-and-send flow across 39+ countries — local payroll files, bank payments and year-end forms, all reviewed by your team before payday.',
    relatedEyebrow: 'The rest of Crew',
    relatedTitle: 'Payroll is one piece of the operational layer.',
    ctaEyebrow: 'End the country-by-country scramble',
    ctaTitle: 'See payroll ready, country by country.',
    ctaDescription:
      '30 minutes, your countries. We walk the check-and-send flow, the local files and year-end forms — and the hand-off to your provider.',
    ctaPrimary: 'Book a Crew walkthrough',
    ctaSecondary: 'Explore Sundae Crew',
  },
};

export const peopleCopy: Record<'en', CrewModuleCopy> = {
  en: {
    badge: 'Crew · People & HR',
    heroLine1: 'Hire to exit,',
    heroLine2: 'one record.',
    description:
      'Crew People runs the whole journey of every employee — hiring, onboarding, documents, reviews, time off and offboarding — on one record per person that feeds Sundae, instead of sitting in a separate HR tool no one opens.',
    primaryCta: 'Book a Crew walkthrough',
    secondaryCta: 'See Crew in action',
    heroProof: [
      { value: 'Hire to exit', label: 'one record per person' },
      { value: 'Paperless', label: 'sign documents in-app' },
      { value: 'Every employee', label: 'their own free login' },
      { value: 'For managers too', label: 'not just HR' },
    ],
    featuresEyebrow: "What's in People & HR",
    featuresTitle: 'The whole employee journey, in one place.',
    featuresDescription:
      "Every stage of an employee's time with you on one record — easy to find, secure, and feeding decisions by default.",
    features: [
      { title: 'Hiring to offboarding', body: 'Recruiting, background checks, onboarding, internal moves and final pay — the whole journey, not a slice of it.', chips: ['Onboarding', 'Internal moves', 'Offboarding'] },
      { title: 'Paperless documents', body: 'Store documents, send them for signature in-app, and get a reminder before any certificate or visa expires.', chips: ['e-signature', 'Reminders', 'Always current'] },
      { title: 'Reviews & growth', body: 'Performance reviews, pay, talent and promotions — the people decisions, made in the same place you run the team.', chips: ['Reviews', 'Pay', 'Promotions'] },
      { title: 'Ask-HR helpdesk', body: 'A private place for staff to raise HR questions and cases, with response times and a clear trail — kept separate from product support.', chips: ['Private', 'Tracked', 'Clear trail'] },
      { title: 'Team chart & access', body: 'A visual team chart with drag-to-reassign, and the right level of access for owners, HR, managers and staff.', chips: ['Team chart', 'Reassign', 'Right access'] },
      { title: 'Free employee app', body: 'Every employee gets a free Sundae login — shifts, time off, payslips and clock-in, all in their pocket.', chips: ['Shifts & leave', 'Payslips', 'Free for all'] },
    ],
    howEyebrow: 'How it works',
    howTitle: 'One record, the whole way through.',
    howSteps: [
      { title: 'Hire & onboard', body: 'A new joiner lands on one record from day one — paperwork, documents and all.' },
      { title: 'Manage day to day', body: 'Documents, reviews, time off and cases all live on that record — secure and easy to find.' },
      { title: 'Offboard cleanly', body: 'Final pay, exit steps and records wrap up without loose ends.' },
    ],
    loopLine: 'Every change feeds Labor Intelligence automatically — no separate export, no re-keying.',
    creamEyebrow: 'One record, whole team',
    creamStatement: 'The people layer that feeds the platform.',
    creamLede:
      'Most operators run HR in a tool their analytics never sees. Crew People keeps the whole journey on one record, so the same people data flows straight into your decisions.',
    relatedEyebrow: 'The rest of Crew',
    relatedTitle: 'People & HR is one piece of the operational layer.',
    ctaEyebrow: 'Retire the HR silo',
    ctaTitle: 'See the journey on one record.',
    ctaDescription:
      '30 minutes, your operation. We walk onboarding, documents, reviews and offboarding — and how each step sharpens Labor Intelligence.',
    ctaPrimary: 'Book a Crew walkthrough',
    ctaSecondary: 'Explore Sundae Crew',
  },
};

export const peopleIntelligenceCopy: Record<'en', CrewModuleCopy> = {
  en: {
    badge: 'Crew · People Intelligence',
    heroLine1: 'Your workforce,',
    heroLine2: 'finally clear.',
    description:
      'Crew People Intelligence turns everyday workforce activity into decisions you can act on — who might leave, which shifts are at risk, what labor really costs — shown right next to your sales, so people and performance finally live in one place.',
    primaryCta: 'Book a Crew walkthrough',
    secondaryCta: 'See Crew in action',
    heroProof: [
      { value: 'Spot risk early', label: 'turnover & no-shows' },
      { value: 'Real labor cost', label: 'to the dollar' },
      { value: 'One view', label: 'people + sales together' },
      { value: 'Every call logged', label: 'who, what and why' },
    ],
    featuresEyebrow: "What's in People Intelligence",
    featuresTitle: 'People analytics that sees the floor.',
    featuresDescription:
      'Not a bolt-on dashboard — your everyday Crew activity, shown next to sales and demand, so workforce decisions sit where the rest of the business does.',
    features: [
      { title: 'Workforce at a glance', body: "Headcount, who's scheduled, open shifts and how trustworthy the hours are — the whole team's health on one screen.", chips: ['Headcount', 'Open shifts', 'Hours you trust'] },
      { title: 'See risk before it bites', body: 'Which upcoming shifts are likely to be a no-show, and who might be about to leave — early enough to do something about it.', chips: ['No-show risk', 'Leaver signals', 'Act early'] },
      { title: 'What labor really costs', body: 'Real pay rates drive a live labor-cost picture — reconciled to the dollar, not a rough estimate.', chips: ['Real rates', 'Live cost', 'To the dollar'] },
      { title: 'Pay & benefits, clear', body: 'Pay, benefits and tip exposure — the money side of your team, made easy to read.', chips: ['Pay', 'Benefits', 'Tips'] },
      { title: 'Talent & growth', body: "See who's ready for more and where people can grow — as decisions, not a static HR report.", chips: ['Talent', 'Growth', 'Promotions'] },
      { title: 'Stay compliant', body: 'Overtime creeping up, statutory pay obligations and country rules — surfaced before they become a problem.', chips: ['Overtime', 'Obligations', 'Compliance'] },
    ],
    howEyebrow: 'How it works',
    howTitle: 'Everyday activity in, decisions out.',
    howSteps: [
      { title: 'Activity flows in', body: 'Schedules, clock-ins, pay runs and cases stream in from the rest of Crew.' },
      { title: 'Shown with the business', body: 'It sits next to sales, demand and cost — one picture, not a separate HR silo.' },
      { title: 'Decide & track', body: 'Act on the recommendation; every decision is logged — who decided what, and why.' },
    ],
    loopLine: "It isn't a separate tool — it's your Crew activity making Labor Intelligence sharper.",
    creamEyebrow: 'Decisions, not dashboards',
    creamStatement: 'Workforce intelligence that sees the whole business.',
    creamLede:
      'People analytics is only as good as the activity behind it. Because Crew runs the day to day, your people and your floor are finally seen together — richer than anything wired to the till alone.',
    relatedEyebrow: 'The rest of Crew',
    relatedTitle: 'People Intelligence is one piece of the operational layer.',
    ctaEyebrow: 'See your workforce clearly',
    ctaTitle: 'Make workforce decisions, not reports.',
    ctaDescription:
      '30 minutes, your data. We show team health, no-show risk and real labor cost — and how Crew activity makes Labor Intelligence sharper.',
    ctaPrimary: 'Book a Crew walkthrough',
    ctaSecondary: 'Explore Sundae Crew',
  },
};
