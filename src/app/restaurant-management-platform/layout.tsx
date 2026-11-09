import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Restaurant Management Platform for Multi-Location Operators | Sundae',
  description: 'Restaurant management software for multi-location groups, connected to a broader hospitality and food-service operating platform with decision intelligence.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
