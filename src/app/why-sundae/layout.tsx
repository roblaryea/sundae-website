import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { resolveWebsiteLocale } from '@/lib/i18n'
import { buildResolvedPageMetadata } from '@/lib/solutionPageMetadata'
import openingCopy from '@/content/operator-openings.json'
import proofCopy from '@/content/workflow-proof.json'

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveWebsiteLocale(await cookies())
  return buildResolvedPageMetadata({
    locale,
    pathname: '/why-sundae',
    title: proofCopy[locale as keyof typeof proofCopy].whySundae,
    description: openingCopy[locale as keyof typeof openingCopy].whyDescription,
  })
}

export default function WhySundaeLayout({ children }: { children: React.ReactNode }) {
  return children
}
