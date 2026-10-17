'use client'

import { useId, useRef, useState, type FormEvent } from 'react'
import { ChevronDown, ChevronUp, Send, UserRoundCheck } from 'lucide-react'
import Link from 'next/link'
import { trackCta } from '@/lib/cta'
import { splitTemplate } from '@/lib/profileConnect'
import type { ProfileCardCopy } from '@/lib/profileCardCopy'

type Status = 'idle' | 'sending' | 'sent' | 'invalid' | 'error'

const inputClass =
  'mt-1.5 block h-12 w-full rounded-xl border border-[#FBF8F4]/20 bg-[#FBF8F4]/[.06] px-3.5 text-[16px] text-[#FBF8F4] placeholder:text-[#9A8B7C] focus:border-[#FBF8F4]/60 focus:outline-none aria-[invalid=true]:border-[#FF8A7D]'

/** A localized sentence with {name} replaced by the owner's name, isolated so it reads correctly in right-to-left text. */
function WithName({ template, name }: { template: string; name: string }) {
  return (
    <>
      {splitTemplate(template, name).map((part, index) =>
        part.isName ? <bdi key={index} className="font-medium text-[#FBF8F4]">{part.text}</bdi> : <span key={index}>{part.text}</span>,
      )}
    </>
  )
}

/**
 * Two-way exchange: the visitor can leave their details for the card owner. Collapsed by
 * default so the card stays one clear action; opens inline. Name and email are required,
 * everything else is optional, and consent is explicit.
 */
export function ShareDetails({
  handle,
  ownerFirstName,
  ownerEmail,
  locale,
  copy,
}: {
  handle: string
  ownerFirstName: string
  ownerEmail: string
  locale: string
  copy: ProfileCardCopy
}) {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [badFields, setBadFields] = useState<string[]>([])
  const openedAt = useRef<number>(0)
  const doneRef = useRef<HTMLDivElement>(null)
  const panelId = useId()

  function toggle() {
    if (!open) {
      openedAt.current = Date.now()
      trackCta('profile_card_share_details_open', { handle })
    }
    setOpen(!open)
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const value = (key: string) => String(form.get(key) ?? '')
    setStatus('sending')
    setBadFields([])
    try {
      const response = await fetch('/api/profile-card/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          handle,
          locale,
          name: value('name'),
          email: value('email'),
          phone: value('phone'),
          company: value('company'),
          note: value('note'),
          consent: form.get('consent') === 'on',
          website: value('website'),
          startedAt: openedAt.current,
        }),
      })
      if (response.ok) {
        trackCta('profile_card_share_details_sent', { handle })
        setStatus('sent')
        setTimeout(() => doneRef.current?.focus(), 0)
        return
      }
      if (response.status === 400) {
        const body = (await response.json().catch(() => ({}))) as { fields?: string[] }
        setBadFields(body.fields ?? [])
        setStatus('invalid')
        return
      }
      setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  const invalid = (field: string) => badFields.includes(field)

  return (
    <div className="mt-5">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="pc-row flex min-h-[56px] w-full items-center justify-between gap-3 rounded-2xl border border-[#FBF8F4]/20 px-4 text-start text-[16px] font-medium text-[#FBF8F4]"
      >
        <span className="flex items-center gap-3">
          <UserRoundCheck className="h-5 w-5 text-[#FF5C4D]" aria-hidden="true" />
          {copy.shareDetails}
        </span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-[#9A8B7C]" aria-hidden="true" />
        ) : (
          <ChevronDown className="h-4 w-4 text-[#9A8B7C]" aria-hidden="true" />
        )}
      </button>

      <div id={panelId} hidden={!open} className="mt-3 rounded-2xl border border-[#FBF8F4]/12 bg-[#FBF8F4]/[.04] p-4">
        {status === 'sent' ? (
          <div ref={doneRef} tabIndex={-1} role="status" className="py-2 outline-none">
            <p className="text-[18px] font-semibold text-[#FBF8F4]">{copy.thanksTitle}</p>
            <p className="mt-1 text-[15px] text-[#D8CBBD]">
              <WithName template={copy.thanksBody} name={ownerFirstName} />
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate={false} className="space-y-3.5">
            <p className="text-[14px] leading-snug text-[#D8CBBD]">
              <WithName template={copy.shareDetailsHint} name={ownerFirstName} />
            </p>

            <label className="block text-[13px] font-medium text-[#D8CBBD]">
              {copy.fieldName}
              <input name="name" type="text" required minLength={2} maxLength={120} autoComplete="name" aria-invalid={invalid('name')} className={inputClass} />
            </label>
            <label className="block text-[13px] font-medium text-[#D8CBBD]">
              {copy.email}
              <input name="email" type="email" required maxLength={254} autoComplete="email" inputMode="email" dir="ltr" aria-invalid={invalid('email')} className={`${inputClass} text-start`} />
            </label>
            <label className="block text-[13px] font-medium text-[#D8CBBD]">
              {copy.fieldPhone}
              <input name="phone" type="tel" maxLength={30} autoComplete="tel" inputMode="tel" dir="ltr" aria-invalid={invalid('phone')} className={`${inputClass} text-start`} />
            </label>
            <label className="block text-[13px] font-medium text-[#D8CBBD]">
              {copy.fieldCompany}
              <input name="company" type="text" maxLength={120} autoComplete="organization" aria-invalid={invalid('company')} className={inputClass} />
            </label>
            <label className="block text-[13px] font-medium text-[#D8CBBD]">
              {copy.fieldNote}
              <textarea name="note" rows={3} maxLength={1000} aria-invalid={invalid('note')} className={`${inputClass} h-auto py-3`} />
            </label>

            {/* Honeypot: invisible to people, tempting to bots. */}
            <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />

            <label className="flex items-start gap-3 text-[13.5px] leading-snug text-[#D8CBBD]">
              <input name="consent" type="checkbox" required aria-invalid={invalid('consent')} className="mt-0.5 h-5 w-5 shrink-0 accent-[#FF5C4D]" />
              <span>
                {copy.consent}{' '}
                <Link href="/privacy" target="_blank" className="underline decoration-[#FF5C4D] underline-offset-4 hover:text-[#FBF8F4]">
                  {copy.privacy}
                </Link>
              </span>
            </label>

            <div aria-live="polite" className="min-h-[1.25rem] text-[13.5px] text-[#FF8A7D]">
              {status === 'invalid' && copy.formInvalid}
              {status === 'error' && (
                <span>
                  <WithName template={copy.errorBody} name={ownerFirstName} />{' '}
                  <a href={`mailto:${ownerEmail}`} dir="ltr" className="underline underline-offset-4">
                    {ownerEmail}
                  </a>
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="pc-primary inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-xl px-5 text-[16px] font-semibold disabled:opacity-60"
            >
              <Send className="h-[18px] w-[18px] rtl:-scale-x-100" aria-hidden="true" />
              {status === 'sending' ? copy.sending : copy.send}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
