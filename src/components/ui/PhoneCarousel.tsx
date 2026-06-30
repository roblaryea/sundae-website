'use client';

import { useRef, useState, type ReactNode } from 'react';
import { PhoneFrame } from './PhoneFrame';

/**
 * One full-length phone the visitor can swipe/scroll through multiple screens —
 * replaces the static (and awkwardly stacked) multi-phone layout. Horizontal
 * CSS scroll-snap between screens + vertical scroll within each, so a single
 * device shows the real depth of a module. Dots + a "swipe for more" hint appear
 * only when there's more than one screen.
 */
export function PhoneCarousel({
  screens,
  hint = 'Swipe for more',
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

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  };
  const go = (i: number) => {
    const el = ref.current;
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' });
  };

  return (
    <div className={className}>
      <PhoneFrame time={time} screenBg={screenBg}>
        <div
          ref={ref}
          onScroll={onScroll}
          className="flex items-start snap-x snap-mandatory overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollBehavior: 'smooth' }}
          aria-roledescription="carousel"
        >
          {screens.map((s, i) => (
            <div
              key={i}
              className="max-h-[600px] w-full flex-none snap-center overflow-y-auto overflow-x-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {s}
            </div>
          ))}
        </div>
      </PhoneFrame>

      {multi && (
        <div className="mt-4 flex flex-col items-center gap-2">
          <div className="flex items-center gap-1.5">
            {screens.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Screen ${i + 1}`}
                style={{
                  height: 6,
                  minHeight: 6,
                  maxHeight: 6,
                  width: i === active ? 22 : 6,
                  minWidth: i === active ? 22 : 6,
                  padding: 0,
                  boxSizing: 'border-box',
                }}
                className={`block shrink-0 rounded-full border-0 transition-all duration-300 ${
                  i === active ? 'bg-[var(--warm-coral)]' : 'bg-[var(--text-faint)] hover:bg-[var(--text-muted)]'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-medium text-[var(--text-muted)]">{hint} →</span>
        </div>
      )}
    </div>
  );
}
