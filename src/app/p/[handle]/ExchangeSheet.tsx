'use client'

import { useEffect, useId, useRef, useState, useSyncExternalStore, type FormEvent } from 'react'
import { CalendarCheck, Check, ContactRound, Plus, Send, X } from 'lucide-react'
import Link from 'next/link'
import { trackCta } from '@/lib/cta'
import type { CountryCode } from 'libphonenumber-js/min'
import { MIN_FILL_MS } from '@/lib/profileConnectTiming'
import { splitTemplate } from '@/lib/profileTemplate'
import { cleanPhoneInput, splitInternationalNumber } from '@/lib/profilePhoneInput'
import { regionName } from '@/lib/profileRegionNames'
import type { ProfileCardCopy } from '@/lib/profileCardCopy'
import { normalizeCardLocale } from '@/lib/profileCardLocale'
import { PhoneField } from './PhoneField'

type Status = 'idle' | 'sending' | 'sent' | 'invalid' | 'error' | 'limited'

/** The Contact Picker API (Chrome on Android). Not available on iOS Safari or desktop. */
type PickedContact = { name?: string[]; email?: string[]; tel?: string[] }
type ContactsApi = {
  select(properties: string[], options?: { multiple?: boolean }): Promise<PickedContact[]>
  getProperties?(): Promise<string[]>
}

const subscribeNever = () => () => {}
function detectContactPicker(): boolean {
  const contacts = (navigator as Navigator & { contacts?: ContactsApi }).contacts
  return Boolean(contacts && typeof contacts.select === 'function' && 'ContactsManager' in window)
}
/**
 * A phone-like device: the main pointer is a finger. Used only to decide whether to offer the
 * "use my phone's details" prompt where there is no Contact Picker (iPhone, other mobile browsers);
 * desktop browsers keep their normal AutoFill dropdown and get no extra button. No user-agent sniffing.
 */
function detectTouchDevice(): boolean {
  return typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches
}

/** The fields a contact card can fill. Several of them changing within this window means AutoFill, not typing. */
const PREFILL_FIELDS = ['name', 'email', 'phone']
const AUTOFILL_SETTLE_MS = 250

const FIELD_ORDER = ['name', 'email', 'phone', 'company', 'note', 'consent'] as const

const inputClass = 'pc-field mt-1.5 block h-12 w-full rounded-xl px-3.5 text-[16px]'

/** A localized sentence with {name} replaced by the owner's name, isolated so it reads correctly in right-to-left text. */
function WithName({ template, name, token = 'name' }: { template: string; name: string; token?: string }) {
  return (
    <>
      {splitTemplate(template, name, token).map((part, index) =>
        part.isName ? <bdi key={index} className="pc-fg font-medium">{part.text}</bdi> : <span key={index}>{part.text}</span>,
      )}
    </>
  )
}

/**
 * Two-way exchange, as a sheet over the card: the visitor can leave their details for the card
 * owner without losing sight of who they are talking to. Name, email and phone are required;
 * company and message sit behind "Add more information" so the first view stays short. Consent is
 * explicit.
 *
 * Retyping is avoided wherever the platform allows it:
 *  - iOS Safari fills name, email and phone from the visitor's own contact card ("AutoFill Contact"
 *    in the keyboard bar) through standard autocomplete tokens on the fields. iOS has no Contact
 *    Picker, so on touch devices without one a button focuses the name box to bring that bar up.
 *  - Chrome on Android offers "Fill from my contacts" (the Contact Picker API), first in the form.
 *  - Every path only fills the form: everything stays editable, and the same consent and phone
 *    rules apply. Once name, email and phone are in, focus moves to the consent box so the visitor's
 *    remaining work is one tick and one tap on Send. Nothing is sent until they do.
 *
 * The sheet is a native <dialog>: focus is trapped, Escape closes it and the backdrop is free.
 * It is controlled by the parent so the page's actions (and the post-save prompt) can open it.
 */
export function ExchangeSheet({
  handle,
  ownerFirstName,
  ownerEmail,
  locale,
  copy,
  bookHref,
  defaultPhoneCountry,
  open,
  onClose,
}: {
  handle: string
  ownerFirstName: string
  ownerEmail: string
  locale: string
  copy: ProfileCardCopy
  bookHref: string
  /** Where the country selector starts: the visitor's country, else the language's, else the owner's. */
  defaultPhoneCountry: string
  open: boolean
  onClose: () => void
}) {
  const [more, setMore] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [badFields, setBadFields] = useState<string[]>([])
  const [filled, setFilled] = useState(false)
  const [phoneCountry, setPhoneCountry] = useState<CountryCode>(defaultPhoneCountry as CountryCode)
  // Whether the flagged phone box was empty, to choose between "enter your number" and "not valid for {country}".
  const [phoneWasEmpty, setPhoneWasEmpty] = useState(false)
  const cardLocale = normalizeCardLocale(locale)
  const phoneRef = useRef<HTMLInputElement>(null)
  // When too many attempts were made, the time the form may be used again (epoch ms).
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null)
  const openedAt = useRef<number>(0)
  // One id per submission attempt: the automatic retry and a double tap reuse it, a later message does not.
  const submissionId = useRef<string>('')
  const doneRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const panelId = useId()

  // Re-enable "Try again" when the cooldown ends (a timer callback, not a synchronous effect update).
  useEffect(() => {
    if (cooldownUntil === null) return
    const timer = setTimeout(() => setCooldownUntil(null), Math.max(0, cooldownUntil - Date.now()))
    return () => clearTimeout(timer)
  }, [cooldownUntil])

  // Feature detection without a hydration mismatch: the server snapshot is always false.
  const canPick = useSyncExternalStore(subscribeNever, detectContactPicker, () => false)
  const isTouch = useSyncExternalStore(subscribeNever, detectTouchDevice, () => false)
  const hintId = `${panelId}-autofill-hint`
  const nameRef = useRef<HTMLInputElement>(null)
  const sendRef = useRef<HTMLButtonElement>(null)
  // Fields that changed by a bulk (AutoFill-style) input event within the current burst.
  const bulkFields = useRef<Set<string>>(new Set())
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (settleTimer.current) clearTimeout(settleTimer.current)
    },
    [],
  )

  // Opening and closing is driven by the parent; the native dialog owns focus and Escape.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      openedAt.current = Date.now()
      // randomUUID needs a secure context and iOS 15.4+; the fallback only has to be unique per attempt.
      submissionId.current = globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`
      trackCta('profile_card_share_details_open', { handle })
      dialog.showModal()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open, handle])

  /** Sets the phone box and selector from a number in any form (national, or a full international number). */
  function applyPhone(raw: string) {
    const split = splitInternationalNumber(raw.trim(), phoneCountry)
    if (phoneRef.current) phoneRef.current.value = split.text
    setPhoneCountry(split.country)
    setBadFields((fields) => fields.filter((field) => field !== 'phone'))
  }

  function setField(name: string, value: string | undefined) {
    const element = formRef.current?.elements.namedItem(name)
    if (value && element instanceof HTMLInputElement) element.value = value.trim()
  }

  /**
   * Runs once a contact card has filled the form (picker or AutoFill). The phone box has already split a
   * whole international number into selector + national number (applyPhone for the picker, the box's own
   * change handler for AutoFill). This must not split it again: it can run from a closure that still holds
   * the previous country. Stale "please fix" flags on the replaced fields are cleared, and focus moves on: to the first required field still empty, else to the consent box (scrolled so
   * Send is in view). Consent is never ticked for the visitor.
   */
  function settlePrefill(source: 'picker' | 'autofill') {
    const form = formRef.current
    const phone = phoneRef.current
    if (!form || !phone) return
    const read = (name: string) => (name === 'phone' ? phone : (form.elements.namedItem(name) as HTMLInputElement | null))
    const missing = PREFILL_FIELDS.find((name) => !read(name)?.value.trim())
    const touched = PREFILL_FIELDS.filter((name) => read(name)?.value.trim())
    setBadFields((fields) => fields.filter((field) => !touched.includes(field)))
    if (missing) {
      // The contact card lacked something (often an email). Take the visitor straight to it.
      if (source === 'picker') read(missing)?.focus()
      return
    }
    setFilled(true)
    setStatus((current) => (current === 'invalid' ? 'idle' : current))
    const consent = form.elements.namedItem('consent')
    if (consent instanceof HTMLInputElement && !consent.checked) {
      consent.focus({ preventScroll: true })
      sendRef.current?.scrollIntoView({ block: 'nearest' })
    } else {
      sendRef.current?.focus()
    }
  }

  /**
   * AutoFill (iOS "AutoFill Contact", Chrome) writes several fields at once. Typing, paste and the
   * keyboard's single-word suggestions never do, so two or more of the three fields changing by a
   * bulk input event inside one short burst is treated as AutoFill and everything else is left alone.
   */
  function onFormInput(event: FormEvent<HTMLFormElement>) {
    const target = event.target
    if (!(target instanceof HTMLInputElement) || !PREFILL_FIELDS.includes(target.name)) return
    const type = (event.nativeEvent as InputEvent).inputType
    if (type && type !== 'insertReplacementText') return
    bulkFields.current.add(target.name)
    if (settleTimer.current) clearTimeout(settleTimer.current)
    settleTimer.current = setTimeout(() => {
      const burst = bulkFields.current.size
      bulkFields.current = new Set()
      if (burst >= 2) {
        trackCta('profile_card_autofill', { handle })
        settlePrefill('autofill')
      }
    }, AUTOFILL_SETTLE_MS)
  }

  async function fillFromContacts() {
    const contacts = (navigator as Navigator & { contacts?: ContactsApi }).contacts
    if (!contacts) return
    try {
      // Ask only for what the form uses, and only for what this device's picker supports.
      let properties = ['name', 'email', 'tel']
      try {
        const supported = await contacts.getProperties?.()
        const usable = supported ? properties.filter((property) => supported.includes(property)) : []
        if (usable.length > 0) properties = usable
      } catch {
        /* Not every build exposes getProperties. Ask for all three. */
      }
      const [picked] = await contacts.select(properties, { multiple: false })
      if (!picked) return
      // A contact with several numbers or addresses: the first of each, all still editable.
      setField('name', picked.name?.[0])
      setField('email', picked.email?.[0])
      if (picked.tel?.[0]) applyPhone(picked.tel[0])
      trackCta('profile_card_fill_from_contacts', { handle })
      settlePrefill('picker')
    } catch {
      /* The visitor dismissed the picker or declined access. They can still type. */
    }
  }

  /** No Contact Picker here (iPhone): focus the name box so the keyboard's AutoFill Contact bar appears. */
  function focusForAutofill() {
    trackCta('profile_card_autofill_prompt', { handle })
    nameRef.current?.focus()
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const value = (key: string) => String(form.get(key) ?? '')
    // A full international number typed into the national box and sent without leaving it: the server
    // reads the number in the country that matches it.
    const phoneText = cleanPhoneInput(value('phone'))
    const sendCountry = splitInternationalNumber(phoneText, phoneCountry).country
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
          phone: phoneText,
          phoneCountry: sendCountry,
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
        setPhoneWasEmpty(phoneText.trim() === '')
        if (fields.includes('company') || fields.includes('note')) setMore(true)
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
  const fieldError = (field: string, message: React.ReactNode) =>
    invalid(field) ? (
      <span id={errorId(field)} className="pc-danger mt-1 block text-[13px] font-normal">
        {message}
      </span>
    ) : null

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={`${panelId}-title`}
      className="pc-sheet"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose()
      }}
    >
      <div className="pc-sheet-grip" aria-hidden="true" />
      <div className="flex items-start justify-between gap-4">
        <h2 id={`${panelId}-title`} className="pc-sheet-title">
          {copy.connectTitle}
        </h2>
        <button type="button" onClick={onClose} aria-label={copy.close} title={copy.close} className="pc-iconbtn -mt-1 shrink-0" style={{ ['--pc-header-fg' as string]: 'var(--pc-fg)', ['--pc-header-chip' as string]: 'transparent' }}>
          <X className="h-[18px] w-[18px]" aria-hidden="true" />
        </button>
      </div>

      {status === 'sent' ? (
        <div ref={doneRef} tabIndex={-1} role="status" className="pc-done py-4 outline-none">
          <span className="pc-done-mark" aria-hidden="true">
            <Check className="h-7 w-7" strokeWidth={2.5} />
          </span>
          <p className="pc-fg mt-4 text-[20px] font-semibold">{copy.thanksTitle}</p>
          <p className="pc-soft mt-1 text-[15px]">
            <WithName template={copy.thanksBody} name={ownerFirstName} />
          </p>
          <a
            href={bookHref}
            onClick={() => trackCta('profile_card_book_session', { handle, from: 'exchange_done' })}
            className="pc-outline pc-row mt-6 flex min-h-[52px] w-full items-center justify-center gap-2.5 px-4 text-[16px] font-medium"
          >
            <CalendarCheck className="pc-icon h-5 w-5" aria-hidden="true" />
            {copy.bookSession}
          </a>
        </div>
      ) : (
        <form ref={formRef} onSubmit={onSubmit} onInput={onFormInput} autoComplete="on" className="mt-3 space-y-3.5">
          <p className="pc-soft pb-1 text-[15px] leading-snug">
            <WithName template={copy.shareDetailsHint} name={ownerFirstName} />
          </p>

          {/* The fastest route first: the Contact Picker where there is one (Chrome on Android), else a prompt for the keyboard's AutoFill. */}
          {(canPick || isTouch) && (
            <div>
              <button
                type="button"
                onClick={canPick ? fillFromContacts : focusForAutofill}
                aria-describedby={canPick ? undefined : hintId}
                className="pc-assist flex min-h-[52px] w-full items-center justify-center gap-2.5 px-4 text-[16px] font-semibold"
              >
                <ContactRound className="pc-icon h-5 w-5" aria-hidden="true" />
                {canPick ? copy.fillFromContacts : copy.useMyPhoneDetails}
              </button>
              {!canPick && (
                <p id={hintId} className="pc-soft mt-2 text-center text-[13px] leading-snug">
                  {copy.useMyPhoneHint}
                </p>
              )}
            </div>
          )}

          <label className="pc-soft block text-[13px] font-medium">
            {copy.fieldName}
            <input ref={nameRef} name="name" type="text" required minLength={2} maxLength={120} autoComplete="name" autoCapitalize="words" enterKeyHint="next" aria-invalid={invalid('name')} aria-describedby={invalid('name') ? errorId('name') : undefined} className={inputClass} />
            {fieldError('name', copy.fieldErrorName)}
          </label>
          <label className="pc-soft block text-[13px] font-medium">
            {copy.email}
            <input name="email" type="email" required maxLength={254} autoComplete="email" inputMode="email" enterKeyHint="next" dir="ltr" aria-invalid={invalid('email')} aria-describedby={invalid('email') ? errorId('email') : undefined} className={`${inputClass} text-start`} />
            {fieldError('email', copy.fieldErrorEmail)}
          </label>
          <PhoneField
            copy={copy}
            locale={cardLocale}
            country={phoneCountry}
            onCountryChange={(code) => {
              setPhoneCountry(code)
              // The message names the country; it no longer applies once the country changes.
              setBadFields((fields) => fields.filter((field) => field !== 'phone'))
            }}
            inputRef={phoneRef}
            invalid={invalid('phone')}
            errorId={errorId('phone')}
            error={fieldError(
              'phone',
              phoneWasEmpty ? copy.fieldErrorPhone : <WithName template={copy.fieldErrorPhoneCountry} name={regionName(phoneCountry, cardLocale)} token="country" />,
            )}
          />

          {/* Company and message stay mounted (so AutoFill and a typed value survive) but start collapsed. */}
          <button
            type="button"
            onClick={() => setMore(!more)}
            aria-expanded={more}
            aria-controls={`${panelId}-more`}
            hidden={more}
            className="pc-more inline-flex min-h-[44px] w-full items-center justify-center gap-2 text-[15px] font-medium"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            {copy.addMoreInfo}
          </button>
          <div id={`${panelId}-more`} hidden={!more} className="space-y-3.5">
            <label className="pc-soft block text-[13px] font-medium">
              {copy.fieldCompany}
              <input name="company" type="text" maxLength={120} autoComplete="organization" enterKeyHint="next" aria-invalid={invalid('company')} className={inputClass} />
            </label>
            <label className="pc-soft block text-[13px] font-medium">
              {copy.fieldNote}
              <textarea name="note" rows={3} maxLength={1000} aria-invalid={invalid('note')} className={`${inputClass} h-auto py-3`} />
            </label>
          </div>

          {/* Honeypot: invisible to people, tempting to bots. */}
          <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />

          <div>
            {/* Always mounted so screen readers announce it when details arrive; empty (and gap-free) until then. */}
            <div role="status" aria-live="polite">
              {filled && <p className="pc-ready mb-2.5 text-[14px] leading-snug">{copy.fillHint}</p>}
            </div>
            <label className="pc-soft pc-consent text-[14px] leading-[1.4]">
              <input name="consent" type="checkbox" required aria-invalid={invalid('consent')} aria-describedby={invalid('consent') ? errorId('consent') : undefined} className="pc-check mt-px" />
              <span>
                {copy.consent}{' '}
                <Link href="/privacy" target="_blank" className="pc-fg underline decoration-[var(--pc-accent)] underline-offset-4">
                  {copy.privacy}
                </Link>
                {fieldError('consent', copy.fieldErrorConsent)}
              </span>
            </label>
          </div>

          {/* The status line and the button are one block, so an empty status line adds no extra gap above Send. */}
          <div>
            <div aria-live="polite" className="pc-danger text-[13.5px]">
              {status === 'invalid' && <p className="pb-3.5">{copy.formInvalid}</p>}
              {status === 'limited' && (
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 pb-3.5">
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
                </p>
              )}
              {status === 'error' && (
                <p className="pb-3.5">
                  <WithName template={copy.errorBody} name={ownerFirstName} />{' '}
                  <a href={`mailto:${ownerEmail}`} dir="ltr" className="underline underline-offset-4">
                    {ownerEmail}
                  </a>
                </p>
              )}
            </div>

            <button
              ref={sendRef}
              type="submit"
              disabled={status === 'sending'}
              className="pc-primary inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-2xl px-5 text-[17px] font-semibold disabled:opacity-60"
            >
              <Send className="h-[18px] w-[18px] rtl:-scale-x-100" aria-hidden="true" />
              {status === 'sending' ? copy.sending : copy.send}
            </button>
          </div>
        </form>
      )}
    </dialog>
  )
}
