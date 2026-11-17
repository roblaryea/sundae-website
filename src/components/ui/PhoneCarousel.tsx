'use client';

import { useRef, useState, type ReactNode } from 'react';
import { PhoneFrame } from './PhoneFrame';
import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';
import { coreMobileShowcaseLocales } from '@/lib/coreMobileShowcaseLocales';
import { useReducedMotion } from 'framer-motion';
import accessibilityLabels from '@/content/accessibility-labels.json';

/**
 * One full-length phone the visitor can swipe/scroll through multiple screens —
 * replaces the static (and awkwardly stacked) multi-phone layout. Horizontal
 * CSS scroll-snap between screens + vertical scroll within each, so a single
 * device shows the real depth of a module. Dots + a "swipe for more" hint appear
 * only when there's more than one screen.
 */
export function PhoneCarousel({
  screens,
  hint,
  time = '3:00',
  screenBg = '#020617',
  className = '',
}: {
  screens: ReactNode[];
  hint?: string;
  time?: string;
  screenBg?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const multi = screens.length > 1;
  // Localized default for the "swipe for more" hint (overridable via the prop),
  // so every carousel — Crew + Core — matches the page language.
  const { locale } = useWebsiteI18n();
  const labels = accessibilityLabels[locale as keyof typeof accessibilityLabels];
  const reduceMotion = useReducedMotion();
  const number = (value: number) => new Intl.NumberFormat(locale).format(value);
  const screenLabel = (index: number) => `${labels.screen} ${number(index + 1)} / ${number(screens.length)}`;
  const resolvedHint =
    hint ??
    coreMobileShowcaseLocales[locale as keyof typeof coreMobileShowcaseLocales]?.swipeHint ??
    'Swipe for more';

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    setActive(Math.max(0, Math.min(screens.length - 1, Math.round(Math.abs(el.scrollLeft) / el.clientWidth))));
  };
  const go = (i: number) => {
    const el = ref.current;
    if (el) {
      const direction = getComputedStyle(el).direction === 'rtl' ? -1 : 1;
      const instant = reduceMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollTo({ left: Math.max(0, Math.min(screens.length - 1, i)) * el.clientWidth * direction, behavior: instant ? 'instant' : 'smooth' });
    }
  };

  return (
    <div className={className}>
      <PhoneFrame time={time} screenBg={screenBg}>
        <div
          ref={ref}
          data-phone-carousel
          onScroll={onScroll}
          onKeyDown={event => {
            // Nested screen content keeps its own scrolling and control keys.
            if (event.target !== event.currentTarget || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
            event.preventDefault();
            const rtl = getComputedStyle(event.currentTarget).direction === 'rtl';
            const current = Math.round(Math.abs(event.currentTarget.scrollLeft) / event.currentTarget.clientWidth);
            go(event.key === 'Home' ? 0 : event.key === 'End' ? screens.length - 1 : current + ((event.key === 'ArrowRight') !== rtl ? 1 : -1));
          }}
          role="region"
          tabIndex={0}
          aria-label={labels.productScreens}
          className="flex items-start snap-x snap-mandatory overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollBehavior: 'auto' }}
        >
          {screens.map((s, i) => (
            <div
              key={i}
              role="group"
              aria-label={screenLabel(i)}
              tabIndex={0}
              className="max-h-[600px] w-full flex-none snap-center overflow-y-auto overflow-x-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {s}
            </div>
          ))}
        </div>
      </PhoneFrame>

      {multi && (
        <div className="mt-4 flex flex-col items-center gap-2">
          <div className="flex max-w-full flex-wrap items-center justify-center gap-1">
            {screens.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={screenLabel(i)}
                aria-current={i === active ? 'true' : undefined}
                className="flex h-8 min-h-8 w-8 min-w-8 shrink-0 items-center justify-center rounded-lg focus-visible:outline-2 focus-visible:outline-[var(--accent-warm)] focus-visible:outline-offset-2"
              >
                <span aria-hidden="true" className={`block h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-[22px] bg-[var(--warm-coral)]' : 'w-1.5 bg-[var(--text-faint)]'}`} />
              </button>
            ))}
          </div>
          <span className="text-xs font-medium text-[var(--text-muted)]">{resolvedHint} →</span>
        </div>
      )}
    </div>
  );
}
