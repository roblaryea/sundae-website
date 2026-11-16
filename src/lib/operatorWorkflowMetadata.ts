import type { Metadata } from 'next'
import type { WebsiteLocale } from '@/lib/i18n'
import { operatorWorkflowCopy, type OperatorWorkflowSlug } from '@/lib/operatorWorkflowCopy'
import { buildResolvedPageMetadata } from '@/lib/solutionPageMetadata'

export function buildOperatorWorkflowMetadata(locale: WebsiteLocale, pathname: string): Metadata {
  const copy = operatorWorkflowCopy[locale]
  const slug = pathname.slice(1)
  const page = slug === 'restaurant365-alternative'
    ? copy.comparison
    : copy.pages[slug as OperatorWorkflowSlug]
  if (!page) return {}
  return {
    ...buildResolvedPageMetadata({ locale, pathname, title: page.metaTitle, description: page.metaDescription }),
    title: { absolute: page.metaTitle },
  }
}
