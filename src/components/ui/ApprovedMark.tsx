import Image from 'next/image';
import { SUNDAE_MARK } from '@/lib/brandAssets';

/** Exact owner-confirmed July artwork. Never reconstruct the S or cherry in code. */
export function ApprovedMark({ className = '', decorative = true }: {
  className?: string;
  decorative?: boolean;
}) {
  return <Image src={SUNDAE_MARK} width={200} height={200} unoptimized alt={decorative ? '' : 'Sundae symbol'} aria-hidden={decorative || undefined} className={`shrink-0 object-contain ${className}`} />;
}
