import Image from 'next/image'
import type { WebsiteLocale } from '@/lib/i18n'
import proofCopy from '@/content/workflow-proof.json'
import tasks from '../../../public/images/product/native-2026-11-16/tasks.png'
import logbook from '../../../public/images/product/native-2026-11-16/logbook.png'
import tips from '../../../public/images/product/native-2026-11-16/tips.png'

const views = { tasks, logbook, tips }

export function NativeWorkflowProof({ locale, view }: { locale: WebsiteLocale; view: keyof typeof views }) {
  const copy = proofCopy[locale as keyof typeof proofCopy]
  const imagePath = `/images/product/native-2026-11-16/${view}.png`

  return (
    <section className="brand-editorial-wash px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-label={copy.eyebrow} data-native-proof={view}>
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow mb-4">{copy.eyebrow}</p>
        <h2 className="section-h2 mb-8 max-w-3xl">{copy[view]}</h2>
        <figure className={view === 'tips' ? 'max-w-3xl' : undefined}>
          <div className={`overflow-x-auto rounded-xl brand-proof-frame border bg-[#FAF7F2] ${view === 'tips' ? 'max-w-3xl' : ''}`} dir="ltr" tabIndex={0} role="region" aria-label={copy[view]}>
            <Image src={views[view]} alt={copy[view]} sizes={view === 'tips' ? '(max-width: 768px) 100vw, 768px' : '(max-width: 1024px) 900px, 1152px'} className={`h-auto w-full ${view === 'tips' ? '' : 'min-w-[900px] lg:min-w-0'}`} />
          </div>
          <figcaption className="mt-5 flex flex-col justify-between gap-4 text-sm leading-relaxed text-[var(--text-supporting)] sm:flex-row">
            <p className="max-w-2xl">{copy.disclosure}</p>
            <a href={imagePath} target="_blank" rel="noreferrer" className="brand-proof-link shrink-0 self-start font-semibold underline underline-offset-4 transition-colors hover:text-[var(--warm-coral)]">{copy.openImage} ↗</a>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
