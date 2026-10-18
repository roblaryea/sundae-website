'use client'

import { useEffect, useId, useRef, useState, useSyncExternalStore, type FormEvent } from 'react'
import { ChevronDown, ChevronUp, ContactRound, Send, UserRoundCheck } from 'lucide-react'
import Link from 'next/link'
import { trackCta } from '@/lib/cta'
import { MIN_FILL_MS, splitTemplate } from '@/lib/profileConnect'
import type { ProfileCardCopy } from '@/lib/profileCardCopy'

type Status = 'idle' | 'sending' | 'sent' | 'invalid' | 'error' | 'limited'

/** The Contact Picker API (Chrome on Android). Not available on iOS Safari or desktop. */
type PickedContact = { name?: string[]; email?: string[]; tel?: string[] }
type ContactsApi = { select(properties: string[], options?: { multiple?: boolean }): Promise<PickedContact[]> }

const subscribeNever = () => () => {}
function detectContactPicker(): boolean {
  const contacts = (navigator as Navigator & { contacts?: ContactsApi }).contacts
  return Boolean(contacts && typeof contacts.select === 'function' && 'ContactsManager' in window)
}

const FIELD_ORDER = ['name', 'email', 'phone', 'company', 'note', 'consent'] as const

const inputClass = 'pc-field mt-1.5 block h-12 w-full rounded-xl px-3.5 text-[16px]'

/** A localized sentence with {name} replaced by the owner's name, isolated so it reads correctly in right-to-left text. */
function WithName({ template, name }: { template: string; name: string }) {
  return (
    <>
      {splitTemplate(template, name).map((part, index) =>
        part.isName ? <bdi key={index} className="pc-fg font-medium">{part.text}</bdi> : <span key={index}>{part.text}</span>,
      )}
    </>
  )
}

/**
 * Two-way exchange: the visitor can leave their details for the card owner. Collapsed by
 * default so the card stays one clear action. Name and email are required, everything else
 * is optional, and consent is explicit.
 *
 * Retyping is avoided wherever the platform allows it:
 *  - iOS and most desktop browsers fill name, email, phone and company from the visitor's own
 *    contact card in one tap, through standard autocomplete tokens on the fields.
 *  - Chrome on Android also offers "Fill from my contacts" (the Contact Picker API). It only
 *    fills the form: everything stays editable and nothing is sent until the visitor submits.
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
  const [filled, setFilled] = useState(false)
  // When too many attempts were made, the time the form may be used again (epoch ms).
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null)
  const openedAt = useRef<number>(0)
  // One id per submission attempt: the automatic retry and a double tap reuse it, a later message does not.
  const submissionId = useRef<string>('')
  const doneRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const panelId = useId()

  // Re-enable "Try again" when the cooldown ends (a timer callback, not a synchronous effect update).
  useEffect(() => {
    if (cooldownUntil === null) return
    const timer = setTimeout(() => setCooldownUntil(null), Math.max(0, cooldownUntil - Date.now()))
    return () => clearTimeout(timer)
  }, [cooldownUntil])

  // Feature detection without a hydration mismatch: the server snapshot is always false.
  const canPick = useSyncExternalStore(subscribeNever, detectContactPicker, () => false)

  function toggle() {
    if (!open) {
      openedAt.current = Date.now()
      // randomUUID needs a secure context and iOS 15.4+; the fallback only has to be unique per attempt.
      submissionId.current = globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`
      trackCta('profile_card_share_details_open', { handle })
    }
    setOpen(!open)
  }

  function setField(name: string, value: string | undefined) {
    const element = formRef.current?.elements.namedItem(name)
    if (value && element instanceof HTMLInputElement) element.value = value.trim()
  }

  async function fillFromContacts() {
    const contacts = (navigator as Navigator & { contacts?: ContactsApi }).contacts
    if (!contacts) return
    try {
      const [picked] = await contacts.select(['name', 'email', 'tel'], { multiple: false })
      if (!picked) return
      setField('name', picked.name?.[0])
      setField('email', picked.email?.[0])
      setField('phone', picked.tel?.[0])
      setFilled(true)
      trackCta('profile_card_fill_from_contacts', { handle })
    } catch {
      /* The visitor dismissed the picker or declined access. They can still type. */
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const value = (key: string) => String(form.get(key) ?? '')
    setStatus('sending')
    setBadFields([])
    const send = () =>
      fetch('/api/profile-card/connect', {
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
          submissionId: submissionId.current,
        }),
      })
    try {
      let response = await send()
      if (response.status === 409) {
        // The server found the timing unusual (for example AutoFill completed instantly, or the tab
        // sat open for a day). A person is clearly here, so retry once with a fresh timer instead of
        // losing their details.
        openedAt.current = Date.now() - MIN_FILL_MS - 1000
        response = await send()
      }
      if (response.ok) {
        trackCta('profile_card_share_details_sent', { handle })
        setStatus('sent')
        setTimeout(() => doneRef.current?.focus(), 0)
        return
      }
      if (response.status === 400) {
        const body = (await response.json().catch(() => ({}))) as { fields?: string[] }
        const fields = body.fields ?? []
        setBadFields(fields)
        setStatus('invalid')
        // Put the visitor on the first field that needs attention.
        const first = FIELD_ORDER.find((name) => fields.includes(name))
        if (first) setTimeout(() => (formRef.current?.elements.namedItem(first) as HTMLElement | null)?.focus(), 0)
        return
      }
      if (response.status === 429) {
        const body = (await response.json().catch(() => ({}))) as { retryAfter?: number }
        const seconds = Number(response.headers.get('Retry-After') ?? body.retryAfter ?? 0)
        setCooldownUntil(Number.isFinite(seconds) && seconds > 0 ? Date.now() + Math.min(seconds, 3600) * 1000 : null)
        setStatus('limited')
        return
      }
      setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  const invalid = (field: string) => badFields.includes(field)
  const errorId = (field: string) => `${panelId}-${field}-error`
  const fieldError = (field: string, message: string) =>
    invalid(field) ? (
      <span id={errorId(field)} className="pc-danger mt-1 block text-[13px] font-normal">
        {message}
      </span>
    ) : null

  return (
    <div className="mt-5">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="pc-outline pc-row flex min-h-[56px] w-full items-center justify-between gap-3 px-4 text-start text-[16px] font-medium"
      >
        <span className="flex items-center gap-3">
          <UserRoundCheck className="pc-icon h-5 w-5" aria-hidden="true" />
          {copy.shareDetails}
        </span>
        {open ? <ChevronUp className="pc-muted h-4 w-4" aria-hidden="true" /> : <ChevronDown className="pc-muted h-4 w-4" aria-hidden="true" />}
      </button>

      <div id={panelId} hidden={!open} className="pc-panel mt-3 p-4">
        {status === 'sent' ? (
          <div ref={doneRef} tabIndex={-1} role="status" className="py-2 outline-none">
            <p className="pc-fg text-[18px] font-semibold">{copy.thanksTitle}</p>
            <p className="pc-soft mt-1 text-[15px]">
              <WithName template={copy.thanksBody} name={ownerFirstName} />
            </p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={onSubmit} autoComplete="on" className="space-y-3.5">
            <p className="pc-soft text-[14px] leading-snug">
              <WithName template={copy.shareDetailsHint} name={ownerFirstName} />
            </p>

            {canPick && (
              <div>
                <button
                  type="button"
                  onClick={fillFromContacts}
                  className="pc-outline pc-row flex min-h-[48px] w-full items-center justify-center gap-2.5 px-4 text-[15px] font-medium"
                >
                  <ContactRound className="pc-icon h-[18px] w-[18px]" aria-hidden="true" />
                  {copy.fillFromContacts}
                </button>
                <p role="status" className="pc-soft mt-2 min-h-[1.1rem] text-[13px]">
                  {filled ? copy.fillHint : ''}
                </p>
              </div>
            )}

            <label className="pc-soft block text-[13px] font-medium">
              {copy.fieldName}
              <input name="name" type="text" required minLength={2} maxLength={120} autoComplete="name" enterKeyHint="next" aria-invalid={invalid('name')} aria-describedby={invalid('name') ? errorId('name') : undefined} className={inputClass} />
              {fieldError('name', copy.fieldErrorName)}
            </label>
            <label className="pc-soft block text-[13px] font-medium">
              {copy.email}
              <input name="email" type="email" required maxLength={254} autoComplete="email" inputMode="email" enterKeyHint="next" dir="ltr" aria-invalid={invalid('email')} aria-describedby={invalid('email') ? errorId('email') : undefined} className={`${inputClass} text-start`} />
              {fieldError('email', copy.fieldErrorEmail)}
            </label>
            <label className="pc-soft block text-[13px] font-medium">
              {copy.fieldPhone}
              <input name="phone" type="tel" maxLength={30} autoComplete="tel" inputMode="tel" enterKeyHint="next" dir="ltr" aria-invalid={invalid('phone')} aria-describedby={invalid('phone') ? errorId('phone') : undefined} className={`${inputClass} text-start`} />
              {fieldError('phone', copy.fieldErrorPhone)}
            </label>
            <label className="pc-soft block text-[13px] font-medium">
              {copy.fieldCompany}
              <input name="company" type="text" maxLength={120} autoComplete="organization" enterKeyHint="next" aria-invalid={invalid('company')} className={inputClass} />
            </label>
            <label className="pc-soft block text-[13px] font-medium">
              {copy.fieldNote}
              <textarea name="note" rows={3} maxLength={1000} aria-invalid={invalid('note')} className={`${inputClass} h-auto py-3`} />
            </label>

            {/* Honeypot: invisible to people, tempting to bots. */}
            <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />

            <label className="pc-soft flex items-start gap-3 text-[13.5px] leading-snug">
              <input name="consent" type="checkbox" required aria-invalid={invalid('consent')} aria-describedby={invalid('consent') ? errorId('consent') : undefined} className="mt-0.5 h-5 w-5 shrink-0 accent-[#ff5c4d]" />
              <span>
                {copy.consent}{' '}
                <Link href="/privacy" target="_blank" className="pc-fg underline decoration-[var(--pc-accent)] underline-offset-4">
                  {copy.privacy}
                </Link>
                {fieldError('consent', copy.fieldErrorConsent)}
              </span>
            </label>

            <div aria-live="polite" className="pc-danger min-h-[1.25rem] text-[13.5px]">
              {status === 'invalid' && copy.formInvalid}
              {status === 'limited' && (
                <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span>{copy.rateLimited}</span>
                  <button
                    type="button"
                    disabled={cooldownUntil !== null}
                    onClick={() => {
                      setStatus('idle')
                      setCooldownUntil(null)
                    }}
                    className="underline underline-offset-4 disabled:no-underline disabled:opacity-60"
                  >
                    {copy.tryAgain}
                  </button>
                </span>
              )}
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
