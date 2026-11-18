import Image from 'next/image';
import { SUNDAE_WORDMARK, SUNDAE_WORDMARK_SIZE } from '@/lib/brandAssets';

/** Decorative placement of the approved complete wordmark on the espresso panel. */
export function ProfileArt({ className }: { className?: string }) {
  return <Image src={SUNDAE_WORDMARK.cream} {...SUNDAE_WORDMARK_SIZE} unoptimized alt="" aria-hidden="true" className={className} />;
}
