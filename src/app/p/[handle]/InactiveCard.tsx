import Image from 'next/image'
import Link from 'next/link'
import type { ProfileCardCopy } from '@/lib/profileCardCopy'

/**
 * What a retired card shows: no personal details, just the company and a way to reach the team.
 * Printed QR codes keep working after someone leaves, and this is where they land.
 */
export function InactiveCard({ copy }: { copy: ProfileCardCopy }) {
  return (
    <div className="pc-root" suppressHydrationWarning>
      <div className="pc-shell">
        <aside className="pc-hero" aria-hidden="true">
          <div className="pc-glow" />
        </aside>
        <div className="pc-content">
          <header className="pc-header">
            <Link href="/" aria-label="Sundae" className="inline-flex min-h-[44px] items-center">
              <Image src="/logos/sundae-wordmark-card-cream.svg" alt="Sundae" width={112} height={34} unoptimized priority className="pc-wm-cream h-[34px] w-auto" />
              <Image src="/logos/sundae-wordmark-card-ink.svg" alt="" width={112} height={34} unoptimized priority className="pc-wm-ink h-[34px] w-auto" />
            </Link>
          </header>
          <main className="pc-main">
            <h1 className="pc-name">{copy.cardInactiveTitle}</h1>
            <p className="pc-tagline mt-4" style={{ display: 'block' }}>{copy.cardInactiveBody}</p>
            <Link href="/contact" className="pc-primary mt-8 inline-flex h-14 w-full items-center justify-center rounded-2xl px-5 text-[17px] font-semibold">
              {copy.cardInactiveAction}
            </Link>
          </main>
        </div>
      </div>
    </div>
  )
}
