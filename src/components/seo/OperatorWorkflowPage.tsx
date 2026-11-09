'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { CreamBreak } from '@/components/ui/CreamBreak'
import { StaggerContainer, StaggerItem } from '@/components/ui/PageAnimations'

export type OperatorWorkflowQuestion = {
  question: string
  answer: string
}

export type OperatorWorkflowPageProps = {
  eyebrow: string
  title: string
  accent: string
  description: string
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
  challenges,
  capabilities,
  outcomes,
  questions,
  related,
}: OperatorWorkflowPageProps) {
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
    <main className="min-h-screen overflow-x-hidden bg-[var(--navy-deep)] text-[var(--text-primary)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="relative overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-[0.14]`} aria-hidden />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
          <div>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="eyebrow mb-5">{eyebrow}</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08 }} className="hero-h1 max-w-4xl text-balance">{title}</motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.16 }} className="body-xl mt-7 max-w-2xl text-[var(--text-supporting)]">{description}</motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.24 }} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/demo"><Button variant="primary" size="lg">Book a walkthrough</Button></Link>
              <Link href="/crew"><Button variant="outline-light" size="lg">See Sundae Crew</Button></Link>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="border-l border-[var(--border-default)] pl-7 lg:pl-10">
            <p className="eyebrow mb-6">THE OPERATING RHYTHM</p>
            <ol className="space-y-6">
              {['Capture the work', 'Carry the context', 'Assign the next action', 'Measure what changed'].map((step, index) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="font-display text-2xl italic text-[#F6C66B]">0{index + 1}</span>
                  <span className="pt-1 text-lg font-medium text-[var(--text-primary)]">{step}</span>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </section>

      <CreamBreak eyebrow="THE OPERATING LAYER" statement="Work is captured. Context is carried. *Action is measured.*" lede="Sundae Crew turns daily operating work into a connected signal for the wider platform." />

      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-4">THE OPERATOR PROBLEM</p>
            <h2 className="section-h2 mb-8">Daily work disappears when ownership is unclear.</h2>
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
            <p className="eyebrow mb-4">HOW SUNDAE HELPS</p>
            <h2 className="section-h2 mb-8">The workflow stays connected to the operation.</h2>
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
          <p className="eyebrow mb-4 text-center">WHAT CHANGES</p>
          <h2 className="section-h2 mx-auto mb-10 max-w-3xl text-center">From a record of work to a repeatable operating rhythm.</h2>
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
          <p className="eyebrow mb-4">OPERATOR QUESTIONS</p>
          <h2 className="section-h2 mb-8">Answers for the questions teams ask before they change the workflow.</h2>
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
          <p className="eyebrow mb-4">CONNECTED OPERATIONS</p>
          <h2 className="section-h2 mb-5">The workflow is part of Sundae’s operating loop.</h2>
          <p className="body-lg mb-8 max-w-3xl text-[var(--text-supporting)]">
            Crew captures the work. Pulse surfaces the exception. Insights, Foresight and Profit Recovery help the team decide what to do next and measure what changed.
          </p>
          <div className="flex flex-wrap gap-3">
            {related.map(({ label, href }) => (
              <Link key={href} href={href} className="rounded-full border border-[var(--border-default)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition hover:border-[#FF5C4D]/50 hover:bg-white/[0.04]">
                {label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream)] px-4 py-20 text-center text-[var(--ink)] sm:px-6 lg:px-8">
        <h2 className="section-h2 mx-auto mb-5 max-w-3xl">See the workflow in your operation.</h2>
        <p className="body-lg mx-auto mb-8 max-w-2xl text-black/65">Bring one real operating problem. We will show how the work, the evidence and the next action stay connected.</p>
        <Link href="/demo"><Button variant="cta" size="lg">Book a walkthrough</Button></Link>
      </section>
    </main>
  )
}
