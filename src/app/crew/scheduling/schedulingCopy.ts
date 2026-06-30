import type { CrewModuleCopy } from '@/components/crew/CrewModulePage';

/**
 * Crew Scheduling page copy. English-authored; the page resolves each locale with
 * a safe fallback to English (via `as keyof typeof`) so every locale renders, and
 * transcreation can follow via the marketing locale pipeline. Glossary terms
 * (Sundae, Crew, Pulse, Labor Intelligence) stay untranslated by design.
 */
export const schedulingCopy: Record<'en', CrewModuleCopy> = {
  en: {
    badge: 'Crew · Scheduling',
    heroLine1: 'Build the schedule',
    heroLine2: 'in minutes, not hours.',
    description:
      "Crew Scheduling turns demand into a schedule your team actually trusts. The AI Builder drafts it from your forecast, role mix and who's available; managers edit it across four views; staff see their next shift, acknowledge it, and swap — all from their phone.",
    primaryCta: 'Book a Crew walkthrough',
    secondaryCta: 'See Crew in action',
    heroProof: [
      { value: 'Minutes', label: 'to build a full week' },
      { value: 'AI-built', label: 'from your real demand' },
      { value: 'Swap & cover', label: 'staff sort it themselves' },
      { value: 'Any phone', label: 'nothing to install' },
    ],

    featuresEyebrow: "What's in Scheduling",
    featuresTitle: 'Everything the schedule needs — in one place.',
    featuresDescription:
      'Built for the daily floor, not a demo: demand in, a published schedule out, and every shift flowing back into your decisions.',
    features: [
      { title: 'AI Builder', body: 'Drafts the week from your forecast, role mix and who is available — in one pass. You refine it; you never start from a blank grid.', chips: ['Demand-aware', 'Role mix', 'One pass'] },
      { title: 'Four ways to view', body: 'Read and edit the same week by overview, by person, by shift, or by role — whichever question you are answering.', chips: ['By day', 'By person', 'By role'] },
      { title: 'Only the right people', body: 'Only staff who are qualified and available land on a shift. Clashes, overtime and expired-training warnings show up before you publish — not after.', chips: ['Right people', 'Clash alerts', 'Overtime'] },
      { title: 'Swaps & cover', body: 'Staff offer, swap and pick up cover from their phone; managers approve from one queue, only for the people they manage.', chips: ['Swaps', 'Cover', 'Approvals'] },
      { title: 'Repeat & templates', body: 'Repeat patterns, save shift templates with their own color, and apply holiday packs so the week starts most of the way built.', chips: ['Repeat patterns', 'Templates', 'Holidays'] },
      { title: 'Mobile My Schedule', body: 'Each employee sees their next shift, who is on with them, and acknowledges or swaps in a tap — one-handed, on the way to work.', chips: ['Next shift', 'Acknowledge', 'Who is on'] },
    ],

    howEyebrow: 'How it works',
    howTitle: 'From forecast to published in three steps.',
    howSteps: [
      { title: 'Forecast the week', body: 'Demand and events turn into the headcount and roles each part of the day actually needs.' },
      { title: 'Build & check', body: 'The AI Builder drafts the schedule; warnings for clashes, overtime and who is qualified run as you refine it.' },
      { title: 'Publish & act', body: 'Staff acknowledge and swap from their phone; you clear approvals from one queue.' },
    ],
    loopLine: 'Every published shift feeds Labor Intelligence the moment it is set — so the picture is never a week behind.',

    creamEyebrow: 'Built for the floor',
    creamStatement: 'The schedule people actually open.',
    creamLede:
      "Built for one hand on a busy floor: the answer first, one decision per screen, the action right under your thumb. Staff see what's next and act in seconds; managers read coverage at a glance, not in a spreadsheet.",

    relatedEyebrow: 'The rest of Crew',
    relatedTitle: 'Scheduling is one surface of the operational layer.',

    ctaEyebrow: 'Plan for demand, not last week',
    ctaTitle: 'See your week build itself.',
    ctaDescription:
      "30 minutes, your outlets. We build a live schedule from your demand and show how every shift sharpens Labor Intelligence in your dashboards.",
    ctaPrimary: 'Book a Crew walkthrough',
    ctaSecondary: 'Explore Sundae Crew',
  },
};
