import Link from 'next/link';

type AuthorityGuideCalloutProps = {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
};

export function AuthorityGuideCallout({ href, eyebrow, title, description }: AuthorityGuideCalloutProps) {
  return (
    <section className="bg-[var(--cream)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl border-s-2 border-[var(--warm-caramel)] ps-6 sm:ps-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--ink-soft, #594A3D)' }}>{eyebrow}</p>
        <h2 className="font-display mb-4 text-2xl font-semibold sm:text-3xl" style={{ color: 'var(--ink)' }}>{title}</h2>
        <p className="mb-6 max-w-3xl leading-relaxed" style={{ color: 'var(--ink-soft, #594A3D)' }}>{description}</p>
        <Link href={href} className="inline-flex items-center gap-2 font-semibold underline underline-offset-4 transition-opacity hover:opacity-80" style={{ color: 'var(--brand-main)' }}>
          Read the guide <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
