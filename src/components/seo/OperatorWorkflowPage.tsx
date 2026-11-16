'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, MotionConfig } from 'framer-motion'
import { getLocalizedPathname, type WebsiteLocale } from '@/lib/i18n'
import type { OperatorWorkflowCopy } from '@/lib/operatorWorkflowCopy'
import { Button } from '@/components/ui/Button'
import { CreamBreak } from '@/components/ui/CreamBreak'
import { StaggerContainer, StaggerItem } from '@/components/ui/PageAnimations'
import { NativeWorkflowProof } from './NativeWorkflowProof'

export type OperatorWorkflowQuestion = {
  question: string
  answer: string
}

export type OperatorWorkflowPageProps = {
  shared: OperatorWorkflowCopy['shared']
  locale: WebsiteLocale
  proof: 'tasks' | 'logbook' | 'tips'
  eyebrow: string
  title: string
  accent: string
  description: string
  problemTitle: string
  helpTitle: string
  outcomesTitle: string
  challenges: string[]
  capabilities: string[]
  outcomes: string[]
  questions: OperatorWorkflowQuestion[]
  related: { label: string; href: string }[]
}

export function OperatorWorkflowPage({
  eyebrow,
  title,
  accent,
  description,
  problemTitle,
  helpTitle,
  outcomesTitle,
  challenges,
  capabilities,
  outcomes,
  questions,
  related,
  shared,
  locale,
  proof,
}: OperatorWorkflowPageProps) {
  const href = (path: string) => getLocalizedPathname(path, locale)
  const currentPath = usePathname()
  const demoHref = `${href('/demo')}?workflow=${encodeURIComponent(currentPath.split('/').filter(Boolean).at(-1) ?? '')}`
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  }

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen overflow-x-hidden bg-[var(--navy-deep)] text-[var(--text-primary)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <section className="relative overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-[0.14]`} aria-hidden />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
          <div>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="eyebrow mb-5">{eyebrow}</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08 }} className="hero-h1 max-w-4xl text-balance">{title}</motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.16 }} className="body-xl mt-7 max-w-2xl text-[var(--text-supporting)]">{description}</motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.24 }} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={demoHref} variant="primary" size="lg" className="max-w-full whitespace-normal! text-center break-words" trackingLabel="operator_workflow_hero_primary" trackingMetadata={{ destination: demoHref }}>{shared.primaryCta}</Button>
              <Button href={href('/crew')} variant="outline-light" size="lg" className="max-w-full whitespace-normal! text-center break-words" trackingLabel="operator_workflow_hero_crew" trackingMetadata={{ destination: href('/crew') }}>{shared.secondaryCta}</Button>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="border-s border-[var(--border-default)] ps-7 lg:ps-10">
            <p className="eyebrow mb-6">{shared.rhythmEyebrow}</p>
            <ol className="space-y-6">
              {shared.steps.map((step, index) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="font-display text-2xl italic text-[#F6C66B]">0{index + 1}</span>
                  <span className="pt-1 text-lg font-medium text-[var(--text-primary)]">{step}</span>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </section>

      <CreamBreak eyebrow={shared.creamEyebrow} statement={shared.creamStatement} lede={shared.creamLede} />

      <NativeWorkflowProof locale={locale} view={proof} />

      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-4">{shared.problemEyebrow}</p>
            <h2 className="section-h2 mb-8">{problemTitle}</h2>
            <StaggerContainer className="divide-y divide-[var(--border-default)] border-y border-[var(--border-default)]">
              {challenges.map((challenge, index) => (
                <StaggerItem key={challenge} className="flex gap-5 py-5">
                  <span className="font-display text-xl italic text-[#FF8473]">0{index + 1}</span>
                  <p className="text-[var(--text-supporting)]">{challenge}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
          <div>
            <p className="eyebrow mb-4">{shared.helpEyebrow}</p>
            <h2 className="section-h2 mb-8">{helpTitle}</h2>
            <div className="divide-y divide-[var(--border-default)] border-y border-[var(--border-default)]">
              {capabilities.map((capability) => (
                <div key={capability} className="py-5 text-lg font-medium text-[var(--text-primary)]">
                  {capability}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface-faint)] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow mb-4 text-center">{shared.outcomesEyebrow}</p>
          <h2 className="section-h2 mx-auto mb-10 max-w-3xl text-center">{outcomesTitle}</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {outcomes.map((outcome, index) => (
              <div key={outcome} className="border-t-2 border-[#FF5C4D] pt-5">
                <div className="mb-4 font-display text-3xl italic text-[#FF8473]">0{index + 1}</div>
                <p className="text-lg font-semibold leading-snug">{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="eyebrow mb-4">{shared.faqEyebrow}</p>
          <h2 className="section-h2 mb-8">{shared.faqTitle}</h2>
          <div className="divide-y divide-[var(--border-default)] border-y border-[var(--border-default)]">
            {questions.map(({ question, answer }) => (
              <div key={question} className="grid gap-3 py-6 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-10">
                <h3 className="text-lg font-semibold">{question}</h3>
                <p className="body-base text-[var(--text-supporting)]">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-[#FF5C4D]/25 bg-gradient-to-br from-[#FF5C4D]/10 to-transparent p-8 sm:p-12">
          <p className="eyebrow mb-4">{shared.connectedEyebrow}</p>
          <h2 className="section-h2 mb-5">{shared.connectedTitle}</h2>
          <p className="body-lg mb-8 max-w-3xl text-[var(--text-supporting)]">
            {shared.connectedDescription}
          </p>
          <div className="flex flex-wrap gap-3">
            {related.map(({ label, href }) => (
              <Link key={href} href={getLocalizedPathname(href, locale)} className="rounded-full border border-[var(--border-default)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition hover:border-[#FF5C4D]/50 hover:bg-white/[0.04]">
                {label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream)] px-4 py-20 text-center text-[var(--ink)] sm:px-6 lg:px-8">
        <h2 className="section-h2 mx-auto mb-5 max-w-3xl">{shared.ctaTitle}</h2>
        <p className="body-lg mx-auto mb-8 max-w-2xl text-black/65">{shared.ctaDescription}</p>
        <Button href={demoHref} variant="cta" size="lg" className="max-w-full whitespace-normal! text-center break-words" trackingLabel="operator_workflow_closing_primary" trackingMetadata={{ destination: demoHref }}>{shared.primaryCta}</Button>
      </section>
    </div>
    </MotionConfig>
  )
}
