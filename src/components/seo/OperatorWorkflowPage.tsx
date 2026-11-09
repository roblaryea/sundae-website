import Link from 'next/link'
import { Button } from '@/components/ui/Button'

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
      <section className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-[0.14]`} aria-hidden />
        <div className="relative z-10 mx-auto max-w-5xl">
          <p className="eyebrow mb-5">{eyebrow}</p>
          <h1 className="hero-h1 max-w-4xl text-balance">{title}</h1>
          <p className="body-xl mt-7 max-w-3xl text-[var(--text-supporting)]">{description}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/demo"><Button variant="primary" size="lg">Book a walkthrough</Button></Link>
            <Link href="/crew"><Button variant="outline-light" size="lg">See Sundae Crew</Button></Link>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--border-default)] bg-white/[0.02] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-4">THE OPERATOR PROBLEM</p>
            <h2 className="section-h2 mb-6">Daily work disappears when ownership is unclear.</h2>
            <div className="space-y-4">
              {challenges.map((challenge) => (
                <div key={challenge} className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-subtle)] p-5 text-[var(--text-supporting)]">
                  {challenge}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow mb-4">HOW SUNDAE HELPS</p>
            <h2 className="section-h2 mb-6">The workflow stays connected to the operation.</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {capabilities.map((capability) => (
                <div key={capability} className="rounded-2xl border border-[#FF5C4D]/25 bg-[#FF5C4D]/[0.06] p-5 font-medium text-[var(--text-primary)]">
                  {capability}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow mb-4 text-center">WHAT CHANGES</p>
          <h2 className="section-h2 mx-auto mb-10 max-w-3xl text-center">From a record of work to a repeatable operating rhythm.</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {outcomes.map((outcome, index) => (
              <div key={outcome} className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-subtle)] p-6">
                <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#FF5C4D] to-[#E9A24A] font-bold text-white">{index + 1}</div>
                <p className="text-lg font-semibold leading-snug">{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface-faint)] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="eyebrow mb-4">OPERATOR QUESTIONS</p>
          <h2 className="section-h2 mb-8">Answers for the questions teams ask before they change the workflow.</h2>
          <div className="space-y-6">
            {questions.map(({ question, answer }) => (
              <div key={question} className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-subtle)] p-6">
                <h3 className="mb-2 text-lg font-semibold">{question}</h3>
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
