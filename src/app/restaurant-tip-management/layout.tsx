import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Restaurant Tip Management Software | Sundae Crew',
  description: 'Manage restaurant tip workflows with configurable rules, reviewable calculations and payroll-ready evidence through Sundae Crew.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
