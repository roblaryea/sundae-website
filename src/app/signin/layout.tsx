import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sundae App — Coming Soon',
  description: 'Sundae is almost ready to serve. Your 4D Intelligence platform is baking in the final touches. Join the waitlist for early access.',
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
