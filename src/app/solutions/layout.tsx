import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { resolveWebsiteLocale, getWebsiteMessages } from '@/lib/i18n'
import { buildResolvedPageMetadata } from '@/lib/solutionPageMetadata'
import { getOperatorAudienceCopy } from '@/lib/operatorAudienceCopy'

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveWebsiteLocale(await cookies())
  return buildResolvedPageMetadata({
    locale,
    pathname: '/solutions',
    title: getWebsiteMessages(locale).navbar.solutions,
    description: getOperatorAudienceCopy(locale).solutions,
  })
}

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return children
}
