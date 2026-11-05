import Link from 'next/link';

type AuthorityGuideCalloutProps = {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
};

export function AuthorityGuideCallout({ href, eyebrow, title, description }: AuthorityGuideCalloutProps) {
  return (
    <section className="bg-[var(--surface-faint)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-2xl border border-[var(--border-default)] bg-[var(--navy-deep)] p-8 sm:p-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#FF8473]">{eyebrow}</p>
        <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">{title}</h2>
        <p className="mb-6 max-w-3xl leading-relaxed text-[var(--text-supporting)]">{description}</p>
        <Link href={href} className="inline-flex items-center gap-2 font-semibold text-[#FF8473] transition-colors hover:text-[#FF5C4D]">
          Read the guide <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
