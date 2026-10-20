'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Globe, Linkedin, Mail, Phone, UserPlus, UserRoundCheck, X } from 'lucide-react'
import { trackCta } from '@/lib/cta'
import type { ProfileCardCopy } from '@/lib/profileCardCopy'
import { splitTemplate } from '@/lib/profileConnect'
import { ExchangeSheet } from './ExchangeSheet'

type Row = {
  key: 'call' | 'email' | 'linkedin' | 'website'
  href: string
  label: string
  value: string
  external?: boolean
  Icon: typeof Phone
}

export type ProfileActionsProps = {
  handle: string
  vcardHref: string
  bookHref: string
  copy: ProfileCardCopy
  phone: string
  phoneDisplay: string
  email: string
  linkedinUrl?: string
  linkedinHandle?: string
  websiteUrl: string
  websiteDisplay: string
  /** Present only when the contact exchange is switched on; absent means Save contact stands alone. */
  exchange?: { ownerFirstName: string; ownerEmail: string; locale: string }
}

/** How long after tapping Save contact to offer the exchange (the contacts sheet has had time to appear). */
const NUDGE_DELAY_MS = 1400
const NUDGE_SEEN_KEY = 'sundae-card-nudge-seen'


/**
 * Save contact and, when switched on, "Share your details" as the two main actions, then tappable
 * contact rows. Save contact stays a plain link, so it works without JavaScript. After a visitor
 * saves the contact, a quiet one-time prompt offers the exchange: that is the moment they are most
 * willing to give their own details back.
 */
export function ProfileActions(props: ProfileActionsProps) {
  const { handle, copy, exchange } = props
  const [exchangeOpen, setExchangeOpen] = useState(false)
  const [nudge, setNudge] = useState(false)
  const nudgeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (nudgeTimer.current) clearTimeout(nudgeTimer.current)
    },
    [],
  )

  function onSave() {
    trackCta('profile_card_save_contact', { handle })
    if (!exchange) return
    try {
      // Once per visit: a returning scan of the same card should not nag.
      if (sessionStorage.getItem(NUDGE_SEEN_KEY)) return
      sessionStorage.setItem(NUDGE_SEEN_KEY, '1')
    } catch {
      /* Storage can be blocked (private mode). Showing the prompt once per page load is fine. */
    }
    if (nudgeTimer.current) clearTimeout(nudgeTimer.current)
    nudgeTimer.current = setTimeout(() => setNudge(true), NUDGE_DELAY_MS)
  }

  function openExchange(from: 'button' | 'nudge') {
    trackCta('profile_card_exchange_start', { handle, from })
    setNudge(false)
    setExchangeOpen(true)
  }
  const rows: Row[] = [
    { key: 'call', href: `tel:${props.phone}`, label: copy.call, value: props.phoneDisplay, Icon: Phone },
    { key: 'email', href: `mailto:${props.email}`, label: copy.email, value: props.email, Icon: Mail },
  ]
  if (props.linkedinUrl) {
    rows.push({
      key: 'linkedin',
      href: props.linkedinUrl,
      label: copy.linkedin,
      value: props.linkedinHandle ?? props.linkedinUrl,
      external: true,
      Icon: Linkedin,
    })
  }
  rows.push({
    key: 'website',
    href: props.websiteUrl,
    label: copy.website,
    value: props.websiteDisplay,
    external: true,
    Icon: Globe,
  })

  return (
    <div>
      <a
        href={props.vcardHref}
        onClick={onSave}
        className="pc-primary inline-flex h-14 w-full items-center justify-center gap-3 rounded-2xl px-6 text-[17px] font-semibold"
      >
        <UserPlus className="h-5 w-5" aria-hidden="true" />
        {copy.saveContact}
      </a>
      <p className="pc-hint">{copy.saveHint}</p>

      {exchange && (
        <>
          <button
            type="button"
            onClick={() => openExchange('button')}
            aria-haspopup="dialog"
            className="pc-ink mt-4 inline-flex h-14 w-full items-center justify-center gap-3 rounded-2xl px-6 text-[17px] font-semibold"
          >
            <UserRoundCheck className="h-5 w-5" aria-hidden="true" />
            {copy.shareDetails}
          </button>
          {nudge && !exchangeOpen && (
            <div role="status" className="pc-nudge pc-rise mt-3 flex items-center gap-3 px-4 py-3">
              <p className="pc-soft min-w-0 flex-1 text-[14.5px] leading-snug">
                {splitTemplate(copy.exchangeNudge, exchange.ownerFirstName).map((part, index) =>
                  part.isName ? <bdi key={index} className="pc-fg font-medium">{part.text}</bdi> : <span key={index}>{part.text}</span>,
                )}
              </p>
              <button type="button" onClick={() => openExchange('nudge')} className="pc-nudge-action shrink-0 px-3 text-[14.5px] font-semibold">
                {copy.share}
              </button>
              <button type="button" onClick={() => setNudge(false)} aria-label={copy.close} title={copy.close} className="pc-muted -me-2 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full">
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </>
      )}

      <ul className="pc-list mt-6">
        {rows.map(({ key, href, label, value, external, Icon }) => (
          <li key={key}>
            <a
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              onClick={() => trackCta(`profile_card_${key}`, { handle })}
              className="pc-row group flex min-h-[60px] items-center gap-4 px-4 py-3"
            >
              <Icon className="pc-icon h-5 w-5 shrink-0" aria-hidden="true" />
              <span className="flex min-w-0 flex-1 flex-col text-start">
                <span className="pc-label">{label}</span>
                <span className="pc-fg block truncate text-start text-[16px] font-medium">
                  <bdi dir="ltr" className="inline-block max-w-full truncate align-top">
                    {value}
                  </bdi>
                </span>
              </span>
              <ArrowUpRight className="pc-muted h-4 w-4 shrink-0 rtl:-scale-x-100" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>

      <a
        href={props.bookHref}
        onClick={() => trackCta('profile_card_book_session', { handle })}
        className="pc-fg mt-5 inline-flex min-h-[44px] items-center gap-2 text-[15px] font-medium underline decoration-[var(--pc-accent)] decoration-2 underline-offset-[6px]"
      >
        {copy.bookSession}
        <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
      </a>
      {exchange && (
        <ExchangeSheet
          handle={handle}
          ownerFirstName={exchange.ownerFirstName}
          ownerEmail={exchange.ownerEmail}
          locale={exchange.locale}
          copy={copy}
          bookHref={props.bookHref}
          open={exchangeOpen}
          onClose={() => setExchangeOpen(false)}
        />
      )}
    </div>
  )
}
