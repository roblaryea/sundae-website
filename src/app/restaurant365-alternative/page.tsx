import Link from 'next/link'
import { Button } from '@/components/ui/Button'

const questions = [
  {
    title: 'What is Restaurant365?',
    body: 'Restaurant365 describes its platform as restaurant-specific and all-in-one, spanning accounting, operations, workforce and AI. Read its current product information directly before comparing fit.',
  },
  {
    title: 'What should a Restaurant365 alternative be evaluated on?',
    body: 'Compare the daily operating workflows, system-of-record boundaries, workforce depth, regional requirements, integrations, decision support and the way an action is measured after it is taken.',
  },
  {
    title: 'Where does Sundae fit?',
    body: 'Sundae is an operating platform with decision intelligence for multi-location hospitality and food-service operators. Restaurant management pages are search entry points into a broader platform that connects workflows, evidence, action and measured recovery.',
  },
]

const criteria = [
  ['Daily operations', 'Can managers assign work, manage handovers, review exceptions and carry context into the next shift?', 'Sundae Crew, task management, digital logbook and Pulse'],
  ['Workforce operations', 'How do scheduling, attendance, HR, payroll readiness and tip workflows connect to the operating picture?', 'Sundae Crew and Workforce Intelligence'],
  ['Decision support', 'Does the platform help the team understand what changed, why it matters and what to do next?', 'Ask Sundae, Insights, Foresight and Watchtower'],
  ['Measured outcomes', 'Can the operator record an action, assign ownership and compare the outcome with a baseline?', 'Core and Profit Recovery'],
  ['Regional fit', 'Can the operating model support the countries, partners, statutory workflows and local processes in scope?', 'Review Crew’s region packs, exports and partner handoffs against the actual rollout plan'],
  ['Platform boundary', 'Which systems remain authoritative for accounting, POS, payroll, inventory and other records?', 'Document the integration and system-of-record model before choosing a platform'],
]

export default function Restaurant365AlternativePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((item) => ({
      '@type': 'Question',
      name: item.title,
      acceptedAnswer: { '@type': 'Answer', text: item.body },
    })),
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[var(--navy-deep)] text-[var(--text-primary)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1C47FF]/20 via-transparent to-[#FF5C4D]/10" aria-hidden />
        <div className="relative z-10 mx-auto max-w-5xl">
          <p className="eyebrow mb-5">PLATFORM EVALUATION GUIDE</p>
          <h1 className="hero-h1 max-w-4xl text-balance">Evaluating a Restaurant365 alternative? Start with the operating model.</h1>
          <p className="body-xl mt-7 max-w-3xl text-[var(--text-supporting)]">
            Restaurant365 is a well-known restaurant management platform. Sundae is an operating platform with decision intelligence for multi-location hospitality and food-service operators. The right comparison depends on what your team needs to run every shift and measure what changed afterwards.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/demo"><Button variant="primary" size="lg">Compare your operating model</Button></Link>
            <Link href="/restaurant-management-platform"><Button variant="outline-light" size="lg">See Sundae’s platform entry point</Button></Link>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--border-default)] bg-white/[0.02] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow mb-4">USE THE SAME QUESTIONS FOR EVERY PLATFORM</p>
          <h2 className="section-h2 mb-8 max-w-3xl">A useful comparison is about operating fit, not feature-count theatre.</h2>
          <div className="overflow-x-auto rounded-2xl border border-[var(--border-default)]">
            <table className="min-w-[760px] w-full border-collapse text-left">
              <thead className="bg-white/[0.04]">
                <tr>
                  <th className="p-5 text-sm font-semibold">Evaluation area</th>
                  <th className="p-5 text-sm font-semibold">Question to answer</th>
                  <th className="p-5 text-sm font-semibold">Sundae surface</th>
                </tr>
              </thead>
              <tbody>
                {criteria.map(([area, question, surface]) => (
                  <tr key={area} className="border-t border-[var(--border-default)] align-top">
                    <td className="p-5 font-semibold text-[var(--text-primary)]">{area}</td>
                    <td className="p-5 text-[var(--text-supporting)]">{question}</td>
                    <td className="p-5 text-[var(--text-supporting)]">{surface}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {questions.map((item) => (
            <article key={item.title} className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-subtle)] p-6">
              <h2 className="mb-3 text-lg font-semibold">{item.title}</h2>
              <p className="body-base text-[var(--text-supporting)]">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[var(--surface-faint)] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="eyebrow mb-4">PRIMARY SOURCES</p>
          <h2 className="section-h2 mb-6">Read the product definitions, then test them against your operation.</h2>
          <p className="body-lg mb-8 text-[var(--text-supporting)]">
            Restaurant365’s own materials describe its product scope and operating surfaces. Sundae’s pages describe its own operating model and evidence loop. A responsible evaluation should use both sets of primary information and then validate the workflows with your operators.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="https://www.restaurant365.com/ai-info/" className="rounded-full border border-[var(--border-default)] px-4 py-2 text-sm font-medium hover:border-[#FF5C4D]/50">Restaurant365 AI information →</a>
            <a href="https://www.restaurant365.com/workforce/" className="rounded-full border border-[var(--border-default)] px-4 py-2 text-sm font-medium hover:border-[#FF5C4D]/50">Restaurant365 workforce →</a>
            <a href="https://www.restaurant365.com/workforce/logbook/" className="rounded-full border border-[var(--border-default)] px-4 py-2 text-sm font-medium hover:border-[#FF5C4D]/50">Restaurant365 logbook →</a>
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream)] px-4 py-20 text-center text-[var(--ink)] sm:px-6 lg:px-8">
        <h2 className="section-h2 mx-auto mb-5 max-w-3xl">Bring your operating model, not a spreadsheet of features.</h2>
        <p className="body-lg mx-auto mb-8 max-w-2xl text-black/65">We will map the workflows, systems and outcome measures your group needs across every location.</p>
        <Link href="/demo"><Button variant="cta" size="lg">Book a working session</Button></Link>
      </section>
    </main>
  )
}
