import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { resolveWebsiteLocale } from '@/lib/i18n'
import { buildOperatorWorkflowMetadata } from '@/lib/operatorWorkflowMetadata'

export async function generateMetadata(): Promise<Metadata> {
  return buildOperatorWorkflowMetadata(resolveWebsiteLocale(await cookies()), '/restaurant-management-platform')
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
