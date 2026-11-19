import type { ReactNode } from 'react'

/** A stable, server-visible closing invitation for the two buyer overview pages. */
export function OperatingCTA({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <section className="px-6 py-16 sm:py-20 lg:px-8" style={{ background: 'var(--cream)', color: 'var(--ink)' }} data-operating-cta>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl" style={{ color: 'var(--ink)' }}>{title}</h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed" style={{ color: 'color-mix(in srgb, var(--ink) 75%, transparent)' }}>{description}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">{children}</div>
      </div>
    </section>
  )
}
