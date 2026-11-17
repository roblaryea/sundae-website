import { cookies } from 'next/headers'
import { resolveWebsiteLocale } from '@/lib/i18n'
import { operatorWorkflowCopy } from '@/lib/operatorWorkflowCopy'
import { OperatorWorkflowPage } from '@/components/seo/OperatorWorkflowPage'

export default async function RestaurantManagementPlatformPage() {
  const locale = resolveWebsiteLocale(await cookies())
  const copy = operatorWorkflowCopy[locale as keyof typeof operatorWorkflowCopy]
  return <OperatorWorkflowPage {...copy.pages['restaurant-management-platform']} shared={copy.shared} locale={locale} proof="tasks" />
}
