import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In — Sundae',
  description: 'Sign in to Sundae — your unified view of performance, operations, and competitive intelligence for restaurants.',
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
