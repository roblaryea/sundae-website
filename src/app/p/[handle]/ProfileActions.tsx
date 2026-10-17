'use client'

import type { ReactNode } from 'react'
import { ArrowUpRight, Globe, Linkedin, Mail, Phone, UserPlus } from 'lucide-react'
import { trackCta } from '@/lib/cta'
import type { ProfileCardCopy } from '@/lib/profileCardCopy'

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
  /** Rendered between the contact rows and the booking link (the "share your details" exchange). */
  children?: ReactNode
}

/** Save-contact button plus tappable contact rows. Every action is a plain link, so it works without JavaScript. */
export function ProfileActions(props: ProfileActionsProps) {
  const { handle, copy } = props
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
        onClick={() => trackCta('profile_card_save_contact', { handle })}
        className="pc-primary inline-flex h-14 w-full items-center justify-center gap-3 rounded-2xl px-6 text-[17px] font-semibold"
      >
        <UserPlus className="h-5 w-5" aria-hidden="true" />
        {copy.saveContact}
      </a>
      <p className="mt-3 text-balance text-center text-[13px] leading-snug text-[#D8CBBD]">{copy.saveHint}</p>

      <ul className="mt-6 divide-y divide-[#FBF8F4]/10 overflow-hidden rounded-2xl border border-[#FBF8F4]/12 bg-[#FBF8F4]/[.04]">
        {rows.map(({ key, href, label, value, external, Icon }) => (
          <li key={key}>
            <a
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              onClick={() => trackCta(`profile_card_${key}`, { handle })}
              className="pc-row group flex min-h-[60px] items-center gap-4 px-4 py-3"
            >
              <Icon className="h-5 w-5 shrink-0 text-[#FF5C4D]" aria-hidden="true" />
              <span className="flex min-w-0 flex-1 flex-col text-start">
                <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#D8CBBD]">{label}</span>
                <span className="block truncate text-start text-[16px] font-medium text-[#FBF8F4]">
                  <bdi dir="ltr" className="inline-block max-w-full truncate align-top">
                    {value}
                  </bdi>
                </span>
              </span>
              <ArrowUpRight
                className="h-4 w-4 shrink-0 text-[#9A8B7C] transition group-hover:text-[#FBF8F4] rtl:-scale-x-100"
                aria-hidden="true"
              />
            </a>
          </li>
        ))}
      </ul>

      {props.children}

      <a
        href={props.bookHref}
        onClick={() => trackCta('profile_card_book_session', { handle })}
        className="mt-5 inline-flex min-h-[44px] items-center gap-2 text-[15px] font-medium text-[#FBF8F4] underline decoration-[#FF5C4D] decoration-2 underline-offset-[6px] hover:decoration-[#FBF8F4]"
      >
        {copy.bookSession}
        <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
      </a>
    </div>
  )
}
