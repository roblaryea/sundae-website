'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState, type KeyboardEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { ThemedShot } from '@/components/ui/ThemedShot'
import { useWebsiteI18n } from '@/components/i18n/LocaleProvider'
import { getLocalizedPathname } from '@/lib/i18n'
import { getRoleStories } from '@/lib/roleStories'
import proofCopy from '@/content/workflow-proof.json'
import styles from './roleSwitcher.module.css'

/** One shared role treatment for Home and Solutions, with persistent, addressable panels. */
export function SectionPersonaSwitcher({ placement = 'home' }: { placement?: 'home' | 'solutions' }) {
  const { locale, messages } = useWebsiteI18n()
  const copy = getRoleStories(locale)
  const proof = proofCopy[locale as keyof typeof proofCopy]
  const [activeIdx, setActiveIdx] = useState(0)
  const refs = useRef<Array<HTMLButtonElement | null>>([])
  const active = copy.personas[activeIdx]
  const prefix = `${placement}-persona`
  const local = (path: string) => getLocalizedPathname(path, locale)
  const roleNames = Object.fromEntries(messages.navbar.solutionsRoles.map(role => [role.href, role.name]))

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const direction = locale === 'ar' || locale === 'ur' ? -1 : 1
    let next: number
    if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = copy.personas.length - 1
    else if (event.key === 'ArrowRight') next = (index + direction + copy.personas.length) % copy.personas.length
    else if (event.key === 'ArrowLeft') next = (index - direction + copy.personas.length) % copy.personas.length
    else return
    event.preventDefault()
    setActiveIdx(next)
    refs.current[next]?.focus()
    refs.current[next]?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }

  return (
    <section id={placement === 'solutions' ? 'by-role' : undefined} aria-labelledby={`${prefix}-headline`} className={`${styles.section} relative scroll-mt-28`} data-role-switcher={placement}>
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="mx-auto mb-9 max-w-4xl text-center">
          <p className="eyebrow mb-4">{placement === 'solutions' ? messages.navbar.byRole : copy.eyebrow}</p>
          <h2 id={`${prefix}-headline`} className={`${styles.headline} section-h2 text-balance`}>{copy.headlineSee} Sundae {locale === 'ar' ? '' : copy.headlineFor + ' '}<span className="text-[var(--text-warm)]">{active.pluralLabel}.</span></h2>
        </div>
        <div role="tablist" aria-labelledby={`${prefix}-headline`} className="mb-8 flex gap-2 overflow-x-auto pb-3 sm:flex-wrap sm:justify-center" data-role-tabs>
          {copy.personas.map((role, i) => <button key={role.id} type="button" role="tab" id={`${prefix}-tab-${role.id}`} aria-selected={i === activeIdx} aria-controls={`${prefix}-panel-${role.id}`} tabIndex={i === activeIdx ? 0 : -1} ref={el => { refs.current[i] = el }} onKeyDown={event => handleTabKey(event, i)} onClick={() => setActiveIdx(i)} className={`${styles.tab} shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors motion-reduce:transition-none ${i === activeIdx ? 'border-[var(--text-display)] bg-[var(--text-display)] text-[var(--navy-deep)]' : 'border-[var(--border-default)] bg-[var(--surface-subtle)] text-[var(--text-supporting)] hover:border-[var(--border-emphasis)] hover:text-[var(--text-primary)]'}`}>{role.shortLabel}</button>)}
        </div>
        {copy.personas.map((role, i) => <div key={role.id} role="tabpanel" id={`${prefix}-panel-${role.id}`} aria-labelledby={`${prefix}-tab-${role.id}`} hidden={i !== activeIdx} tabIndex={0} className={`${i === activeIdx ? 'grid' : 'hidden'} ${styles.panel} items-center gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12`} data-role-panel={role.id}>
          <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-subtle)] p-6 sm:p-8">
            <p className="eyebrow mb-3">{copy.todayLabel}</p>
            <h3 className="text-xl font-semibold leading-snug text-[var(--text-primary)] sm:text-2xl">{role.pain}</h3>
            <div className="mt-6 border-t border-[var(--border-default)] pt-6">
              <p className="eyebrow mb-3 text-[var(--text-warm)]">{copy.withSundaeLabel}</p>
              <h4 className="font-display text-2xl font-semibold leading-tight text-[var(--text-primary)]">{role.outcome}</h4>
              <p className="mt-4 text-base leading-relaxed text-[var(--text-supporting)]">{role.body}</p>
              <p className="mt-5 text-xs font-semibold text-[var(--text-muted)]">{role.family}</p>
              <Link href={local(role.href)} className={`${styles.roleLink} mt-6 inline-flex items-center gap-3 rounded-lg border border-[var(--border-emphasis)] px-4 py-3 text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--surface-hover)]`} data-role-cta={role.id}>{roleNames[role.href]}<ArrowUpRight aria-hidden className="h-4 w-4 shrink-0 rtl:-scale-x-100" /></Link>
            </div>
          </div>
          <figure className="min-w-0">
            {role.native ? <a href="/images/product/native-2026-11-16/tasks.png" target="_blank" rel="noreferrer" aria-label={`${proof.tasks} · ${proof.openImage}`} className={`${styles.roleLink} block overflow-hidden rounded-xl border border-[var(--border-default)]`}><Image src="/images/product/native-2026-11-16/tasks.png" alt={proof.tasks} width={1580} height={772} sizes="(max-width: 1024px) 100vw, 740px" className="h-auto w-full" /></a> : <div className={role.crop ? styles.croppedProof : ''} dir="ltr">
              <ThemedShot framed={!role.crop} dark={`/images/product/2026-fresh/${role.shot}-dark.png`} light={`/images/product/2026-fresh/${role.shot}.png`} alt={`${roleNames[role.href]} · ${role.outcome}`} width={1600} height={1000} sizes="(max-width: 1024px) 100vw, 740px" />
            </div>}
            <figcaption className="mt-4 text-xs leading-relaxed text-[var(--text-muted)]">{proof.disclosure}</figcaption>
          </figure>
        </div>)}
        <nav aria-label={messages.navbar.byRole} className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-3 border-t border-[var(--border-default)] pt-6" data-role-destinations>
          {copy.personas.map(role => <Link key={role.id} href={local(role.href)} className={`${styles.roleLink} text-xs font-medium text-[var(--text-supporting)] underline underline-offset-4 hover:text-[var(--text-display)]`}>{roleNames[role.href]}</Link>)}
        </nav>
      </div>
    </section>
  )
}
