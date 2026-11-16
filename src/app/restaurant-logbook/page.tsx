import { cookies } from 'next/headers'
import { resolveWebsiteLocale } from '@/lib/i18n'
import { operatorWorkflowCopy } from '@/lib/operatorWorkflowCopy'
import { OperatorWorkflowPage } from '@/components/seo/OperatorWorkflowPage'

export default async function RestaurantLogbookPage() {
  const locale = resolveWebsiteLocale(await cookies())
  const copy = operatorWorkflowCopy[locale as keyof typeof operatorWorkflowCopy]
  return <OperatorWorkflowPage {...copy.pages['restaurant-logbook']} shared={copy.shared} locale={locale} proof="logbook" accent="from-[#0EA5E9] to-[#1C47FF]" />
}
