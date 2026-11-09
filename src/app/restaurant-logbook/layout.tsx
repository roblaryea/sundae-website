import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Digital Restaurant Logbook and Shift Handover | Sundae',
  description: 'Keep restaurant shift notes, handovers, issues and follow-up in one searchable operating record with Sundae Crew.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
