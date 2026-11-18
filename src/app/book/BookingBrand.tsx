import { SundaeLogotype } from '@/components/ui/SundaeLogotype';

/** The same approved Fraunces PNG used in the website navigation. */
export function BookingBrand({ centered = false }: { centered?: boolean }) {
  return (
    <span
      role="img"
      aria-label="Sundae"
      className={`inline-flex shrink-0 items-center gap-2.5 ${centered ? 'mx-auto' : ''}`}
    >
      <span aria-hidden="true" className="flex items-center gap-2.5">
        <SundaeLogotype className="text-3xl text-[var(--text-display)]" />
      </span>
    </span>
  );
}
