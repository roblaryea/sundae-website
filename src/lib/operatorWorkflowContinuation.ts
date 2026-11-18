import copy from '@/content/operator-depth.json'
import type { WebsiteLocale } from '@/lib/i18n'

type Continuation = { title: string; body: string }

/** Reusing a proof image must never narrow another page's proposition. */
export function getWorkflowContinuation(locale: WebsiteLocale, slug: string, fallback: Continuation): Continuation {
  const depth = copy[locale as keyof typeof copy]
  const entries = {
    'restaurant-task-management': { title: depth.tasksTitle, body: depth.tasksBody },
    'restaurant-logbook': { title: depth.logbookTitle, body: depth.logbookBody },
    'restaurant-tip-management': { title: depth.tipsTitle, body: depth.tipsBody },
  }
  return Object.hasOwn(entries, slug) ? entries[slug as keyof typeof entries] : fallback
}
