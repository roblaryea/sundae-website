import type { WebsiteLocale } from '@/lib/i18n'
import labels from '@/content/role-switcher-labels.json'
import home from '@/content/buyer-clarity/home.json'
import homeDepth from '@/content/buyer-depth/homeDepth.json'
import regional from '@/content/buyer-depth/regional.json'
import finance from '@/content/buyer-depth/finance.json'
import executives from '@/content/buyer-depth/executives.json'
import hr from '@/content/buyer-depth/hr.json'
import technology from '@/content/buyer-depth/technology.json'

/** Stable IDs connect role, canonical destination and approved evidence; menu order is independent. */
export const roleEvidence = [
  { id: 'coo', href: '/solutions/regional-managers', family: 'Sundae Core', shot: 'recovery-brief', native: false, crop: false },
  { id: 'cfo', href: '/solutions/finance-teams', family: 'Sundae Core', shot: 'recovery-decisions', native: false, crop: false },
  { id: 'ceo', href: '/solutions/c-suite-executives', family: 'Sundae Core', shot: 'recovery-brief', native: false, crop: false },
  { id: 'marketing', href: '/solutions/marketing-teams', family: 'Sundae Core', shot: 'marketing-channels', native: false, crop: true },
  { id: 'hr', href: '/solutions/hr-teams', family: 'Sundae Crew', shot: 'tasks', native: true, crop: false },
  { id: 'tech', href: '/solutions/technology-teams', family: 'Sundae Core', shot: 'integrations', native: false, crop: true },
] as const

export function getRoleStories(locale: WebsiteLocale) {
  const words = labels[locale as keyof typeof labels]
  const today = home[locale as keyof typeof home].todayItems
  const depth = homeDepth[locale as keyof typeof homeDepth].personas
  const f = finance[locale as keyof typeof finance]
  const x = executives[locale as keyof typeof executives]
  const h = hr[locale as keyof typeof hr]
  const t = technology[locale as keyof typeof technology]
  const stories = [
    { pain: today[1], outcome: depth[0].outcome!, body: regional[locale as keyof typeof regional].howDescription },
    { pain: f.problemsDescription, outcome: f.outcomes[1].title, body: f.outcomes[1].description },
    { pain: today[3], outcome: depth[2].outcome!, body: x.howDescription },
    { pain: today[4], outcome: depth[3].outcome!, body: depth[3].outcomeCopy! },
    { pain: today[2], outcome: h.crewCallout.title, body: h.crewCallout.description },
    { pain: t.problemsDescription, outcome: depth[5].outcome!, body: depth[5].outcomeCopy! },
  ]
  return { ...words, personas: roleEvidence.map((evidence, index) => ({ ...evidence, ...words.personas[index], ...stories[index] })) }
}
