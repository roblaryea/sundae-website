'use client';

/**
 * Chooses between the classic lead form and guided booking for one lead
 * surface (/demo, /contact, /get-started). See `src/lib/leadConversation/variant.ts`.
 *
 * With NEXT_PUBLIC_GUIDED_BOOKING unset (the default) the server renders the
 * classic form exactly as before; only a `?guided=1` QA link swaps it after
 * hydration. Guided booking (and its 22-locale copy) is lazy-loaded, so
 * classic visitors never download it.
 */

import dynamic from 'next/dynamic';
import { useState, useSyncExternalStore } from 'react';
import { LeadCaptureForm } from '@/components/marketing/LeadCaptureForm';
import type { LeadFormValues } from '@/lib/leadFields';
import type { PricingIntent } from '@/lib/pricingIntent';
import type { ConversationMode } from '@/lib/leadConversation/script';
import {
  classicIsCertainWithoutOverride,
  resolveLeadVariant,
  type LeadSurface,
  type LeadVariant,
} from '@/lib/leadConversation/variant';

const ConversationalLeadCapture = dynamic(() => import('@/components/marketing/ConversationalLeadCapture'), {
  ssr: false,
  loading: () => <PanelPlaceholder />,
});

export interface LeadCaptureSurfaceProps {
  surface: LeadSurface;
  mode: ConversationMode;
  ctaLabel: string;
  defaultMessage?: string;
  reassurance?: string;
  pricingIntent?: PricingIntent | null;
  workflowKey?: string | null;
  /** `x-vercel-ip-country`, read on the server. */
  suggestedCountryIso?: string | null;
  /** /demo: the classic form's section heading (guided booking has its own). */
  heading?: string;
}

// One decision per surface per page view. Cached so the snapshot stays stable
// and a first `split` assignment is written to the cookie exactly once.
const decided = new Map<LeadSurface, LeadVariant>();
const subscribeNever = () => () => {};

function useLeadVariant(surface: LeadSurface): LeadVariant | null {
  return useSyncExternalStore(
    subscribeNever,
    () => {
      const cached = decided.get(surface);
      if (cached) return cached;
      const variant = resolveLeadVariant(surface);
      decided.set(surface, variant);
      return variant;
    },
    // Server and hydration: classic when nothing can change it without a QA
    // override, otherwise wait for the client so no visitor sees a swap.
    () => (classicIsCertainWithoutOverride(surface) ? 'classic' : null),
  );
}

function PanelPlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto h-[clamp(560px,78vh,720px)] w-full max-w-[560px] rounded-3xl border border-[var(--border-default)] bg-[var(--navy)] max-sm:rounded-none max-sm:border-0 max-sm:bg-transparent"
    />
  );
}

export function LeadCaptureSurface(props: LeadCaptureSurfaceProps) {
  const { surface, mode, ctaLabel, defaultMessage, reassurance, pricingIntent, workflowKey, suggestedCountryIso, heading } = props;
  const variant = useLeadVariant(surface);
  // Set when a guided visitor chooses "Use the classic form"; carries their answers.
  const [classicValues, setClassicValues] = useState<Partial<LeadFormValues> | null>(null);

  if (variant === 'classic' || classicValues !== null) {
    const switched = classicValues !== null;
    const form = (
      <LeadCaptureForm
        ctaLabel={ctaLabel}
        defaultMessage={defaultMessage}
        pricingIntent={pricingIntent ?? undefined}
        reassurance={reassurance}
        initialValues={classicValues ?? undefined}
        // A switched visitor stays in the guided arm; their start was already counted.
        analytics={{ variant: switched ? 'guided' : 'classic', surface, startRecorded: switched }}
      />
    );
    if (surface !== 'demo' || !heading) return form;
    // Same markup /demo always rendered around the classic form.
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-h2 text-[var(--text-primary)] mb-4">{heading}</h2>
        </div>
        {form}
      </div>
    );
  }

  const guided = variant === null ? <PanelPlaceholder /> : (
    <ConversationalLeadCapture
      mode={mode}
      surface={surface}
      ctaLabel={ctaLabel}
      defaultMessage={defaultMessage}
      pricingIntent={pricingIntent ?? null}
      workflowKey={workflowKey ?? null}
      suggestedCountryIso={suggestedCountryIso ?? null}
      layout={surface === 'demo' ? 'demo' : undefined}
      onSwitchToClassic={setClassicValues}
    />
  );
  // /demo lays guided booking out in two columns, wider than the classic form.
  return surface === 'demo' ? <div className="max-w-6xl mx-auto">{guided}</div> : guided;
}
