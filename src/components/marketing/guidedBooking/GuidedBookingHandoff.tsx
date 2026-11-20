'use client';

/**
 * Phase 2 hand-off: opens the existing full-screen `BookingView` with the
 * short-lived booking token returned for a new guided-booking lead. No new
 * slot picker - the same screen the emailed /book link opens.
 *
 * The token lives only in memory (props) and in the same-origin booking API
 * calls that BookingView already makes. It is never written to storage, the
 * page URL or analytics: capture is suspended while the screen is open.
 */

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Loader2 } from 'lucide-react';
import { BookingView } from '@/app/book/BookingView';
import { normalizeBookingLocale } from '@/lib/booking/locales';
import { setBookingOverlayOpen } from '@/lib/posthog';
import type { BookingContext, BookingSummary } from '@/lib/sundaeBookingClient';

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export interface GuidedBookingHandoffProps {
  token: string;
  locale: string;
  dialogLabel: string;
  closeLabel: string;
  loadingLabel: string;
  onClose: () => void;
  onBooked: (booking: BookingSummary) => void;
  onFailed: () => void;
}

export default function GuidedBookingHandoff({
  token,
  locale,
  dialogLabel,
  closeLabel,
  loadingLabel,
  onClose,
  onBooked,
  onFailed,
}: GuidedBookingHandoffProps) {
  const [context, setContext] = useState<BookingContext | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const callbacks = useRef({ onClose, onFailed });
  useEffect(() => {
    callbacks.current = { onClose, onFailed };
  });

  // Load the booking context for this token through the same-origin proxy.
  useEffect(() => {
    let cancelled = false;
    const params = new URLSearchParams({ token, eventType: 'discovery' });
    fetch(`/api/book/context?${params.toString()}`, {
      headers: { accept: 'application/json' },
      cache: 'no-store',
      referrerPolicy: 'no-referrer',
    })
      .then((response) => response.json().catch(() => null))
      .then((result: { ok?: boolean; context?: BookingContext } | null) => {
        if (cancelled) return;
        if (result?.ok && result.context) setContext(result.context);
        else callbacks.current.onFailed();
      })
      .catch(() => {
        if (!cancelled) callbacks.current.onFailed();
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  // Modal behaviour: pause analytics, lock page scroll, make the page behind
  // inert, close on Escape, and restore <html lang/dir> that BookingView sets.
  useEffect(() => {
    const html = document.documentElement;
    const previous = { lang: html.lang, dir: html.dir, overflow: document.body.style.overflow };
    setBookingOverlayOpen(true);
    document.body.style.overflow = 'hidden';
    const container = containerRef.current;
    const inerted: HTMLElement[] = [];
    for (const child of Array.from(document.body.children)) {
      if (child === container || !(child instanceof HTMLElement) || child.inert) continue;
      child.inert = true;
      inerted.push(child);
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        callbacks.current.onClose();
        return;
      }
      // Keep Tab and Shift+Tab inside the dialog (the page behind is inert too).
      if (event.key !== 'Tab' || !container) return;
      const focusables = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE))
        .filter((element) => !element.closest('[inert]') && element.getClientRects().length > 0);
      if (!focusables.length) {
        event.preventDefault();
        container.focus();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      const outside = !active || !container.contains(active);
      if (event.shiftKey && (outside || active === first || active === container)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (outside || active === last)) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      for (const element of inerted) element.inert = false;
      document.body.style.overflow = previous.overflow;
      html.lang = previous.lang;
      html.dir = previous.dir;
      setBookingOverlayOpen(false);
    };
  }, []);

  // Focus moves into the dialog as it opens; the dialog is labelled, so screen
  // readers announce it, and the booking screen loads inside it.
  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  return createPortal(
    <div ref={containerRef} role="dialog" aria-modal="true" aria-label={dialogLabel} tabIndex={-1} data-guided-booking-handoff className="fixed inset-0 z-50 outline-none">
      {context ? (
        <BookingView
          token={token}
          locale={normalizeBookingLocale(locale)}
          ctx={context}
          onClose={onClose}
          closeLabel={closeLabel}
          onBooked={onBooked}
        />
      ) : (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[var(--navy-deep)] text-[var(--text-secondary)]">
          <p role="status" className="inline-flex items-center gap-3 text-sm">
            <Loader2 aria-hidden="true" className="h-5 w-5 animate-spin" />
            {loadingLabel}
          </p>
        </div>
      )}
    </div>,
    document.body,
  );
}
