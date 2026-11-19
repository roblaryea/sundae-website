'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Play } from 'lucide-react'
import { useWebsiteI18n } from '@/components/i18n/LocaleProvider'
import { getLocalizedPathname } from '@/lib/i18n'
import { productWalkthroughs, PRODUCT_WALKTHROUGHS_PATH } from '@/lib/productWalkthroughs'
import copy from '@/content/product-walkthroughs.json'

export function WalkthroughTeaser() {
  const { locale } = useWebsiteI18n()
  const words = copy[locale as keyof typeof copy]
  const first = productWalkthroughs[0]
  if (!first) return null
  return (
    <section className="brand-editorial-wash px-6 py-12 lg:px-8 lg:py-16" data-walkthrough-teaser>
      <Link href={getLocalizedPathname(PRODUCT_WALKTHROUGHS_PATH, locale)} className="group mx-auto grid max-w-6xl items-center gap-8 border-y border-[var(--border-default)] py-8 focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[var(--text-display)] md:grid-cols-[1.15fr_0.85fr] md:gap-14">
        <div>
          <p className="eyebrow mb-4">{words.label}</p>
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-[var(--text-display)] sm:text-4xl">{words.title}</h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--text-supporting)]">{words.intro}</p>
          <span className="mt-6 inline-flex items-center gap-3 text-sm font-semibold text-[var(--text-primary)] underline underline-offset-4">{words.label}<ArrowUpRight aria-hidden className="h-4 w-4 transition-transform motion-safe:group-hover:-translate-y-0.5 rtl:-scale-x-100" /></span>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-[var(--border-emphasis)]" aria-hidden>
          <Image src={first.poster} alt="" width={960} height={540} sizes="(max-width: 768px) 100vw, 480px" className="h-auto w-full" />
          <span className="absolute bottom-4 start-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#FBF8F4] text-[#1E1711] shadow-md"><Play className="ms-0.5 h-4 w-4 fill-current" /></span>
        </div>
      </Link>
    </section>
  )
}
