import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Restaurant Task Management Software | Sundae',
  description: 'Assign, approve and measure restaurant tasks and checklists across every shift and location with Sundae Crew.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
