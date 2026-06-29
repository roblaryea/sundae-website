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
      'Crew Scheduling turns demand into a rota your team actually trusts. The AI Builder drafts it from forecast, role mix and eligibility; managers edit across four views; staff see their next shift, acknowledge it, and swap — all from their phone.',
    primaryCta: 'Book a Crew walkthrough',
    secondaryCta: 'See Crew in action',
    heroProof: [
      { value: '4', label: 'Manager view modes' },
      { value: 'AI', label: 'Schedule builder' },
      { value: '<1 day', label: 'To your first rota' },
      { value: '0', label: 'Spreadsheets' },
    ],

    featuresEyebrow: "What's in Scheduling",
    featuresTitle: 'Everything the rota needs — in one surface.',
    featuresDescription:
      'Production scheduling with auditable workflows — built for the daily floor, not a demo. Demand in, published rota out, every shift flowing back into the intelligence layer.',
    features: [
      { title: 'AI Builder', body: 'Compose the week from demand forecast, role mix and eligibility in one pass — then refine by hand. No blank grid.', chips: ['Demand-aware', 'Role mix', 'One pass'] },
      { title: 'Four view modes', body: 'Read and edit the same week as Overview, By person, By shift, or By role — whichever question you are answering.', chips: ['Overview', 'By person', 'By role'] },
      { title: 'Eligibility-checked assignment', body: 'Only valid staff land on a shift. Conflict, overtime and certification alerts fire before you publish — not after.', chips: ['Eligibility', 'Conflicts', 'Overtime'] },
      { title: 'Swap marketplace', body: 'Staff offer, swap and pick up cover from their phone; managers approve in the action queue with span-of-control awareness.', chips: ['Swaps', 'Cover', 'Approvals'] },
      { title: 'Recurrence & templates', body: 'Repeat patterns, save shift templates with their own colour, and apply holiday packs so the week starts 80% built.', chips: ['Recurrence', 'Templates', 'Holidays'] },
      { title: 'Mobile My Schedule', body: 'Each employee sees their next shift, who is on with them, and acknowledges or swaps in a tap — glance-and-act, thumb-zone.', chips: ['Next shift', 'Acknowledge', 'Peers'] },
    ],

    howEyebrow: 'How it works',
    howTitle: 'From forecast to published in three steps.',
    howSteps: [
      { title: 'Forecast the week', body: 'Demand and events translate into the headcount and role mix each daypart actually needs.' },
      { title: 'Build & check', body: 'The AI Builder drafts the rota; eligibility, conflict and overtime checks run as you refine it.' },
      { title: 'Publish & act', body: 'Staff acknowledge and swap from their phone; you clear approvals from one action queue.' },
    ],
    loopLine: 'Every published shift becomes signal — flowing into Labor Intelligence the moment it is set.',

    creamEyebrow: 'Glance and act',
    creamStatement: 'The rota people actually open.',
    creamLede:
      'Answer-first, one decision per screen, every card ending in a thumb-zone action. Staff see what is next and act in seconds; managers read coverage as a meter, not a spreadsheet.',

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
