import { ApprovedWordmark } from '@/components/ui/ApprovedWordmark';

/** Editorial cream surfaces use the supplied dark-on-light artwork intact. */
export function SundaeWordmark({ className = '' }: { className?: string }) {
  return <ApprovedWordmark tone="ink" className={className} decorative />;
}
