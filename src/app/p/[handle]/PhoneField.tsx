'use client'

import { useEffect, useId, useMemo, useRef, useState, type ChangeEvent, type KeyboardEvent, type RefObject } from 'react'
import { Check, ChevronDown, Search } from 'lucide-react'
import type { CountryCode } from 'libphonenumber-js/min'
import type { ProfileCardCopy } from '@/lib/profileCardCopy'
import type { CardLocale } from '@/lib/profileCardLocale'
import { regionName } from '@/lib/profileRegionNames'
import { dialCode, filterPhoneCountries, flagEmoji, foldForSearch, phoneCountries, splitInternationalNumber, type PhoneCountryOption } from '@/lib/profilePhoneInput'

const optionCache = new Map<string, PhoneCountryOption[]>()
/** Every country in the card language, sorted for that language. Built once per language. */
function optionsFor(locale: CardLocale): PhoneCountryOption[] {
  let options = optionCache.get(locale)
  if (!options) {
    const collator = new Intl.Collator(locale === 'pap' ? 'en' : locale)
    options = phoneCountries()
      .map(({ code, dial }) => {
        const name = regionName(code, locale)
        const english = regionName(code, 'en')
        return { code, dial, name, english, folded: foldForSearch(name), foldedEnglish: foldForSearch(english) }
      })
      .sort((a, b) => collator.compare(a.name, b.name))
    optionCache.set(locale, options)
  }
  return options
}

const inputClass = 'pc-field block h-12 w-full rounded-xl px-3.5 text-[16px]'

/**
 * Phone number with a country selector. The visitor types only the local number; the selector holds
 * the country (flag and calling code), searchable by name, ISO code or calling code.
 *
 * - The number box keeps the standard `tel` autocomplete token. Browsers AutoFill it with a whole
 *   international number, so a full international number pasted, AutoFilled or typed into it is
 *   detected and moves the selector to its country.
 * - The selector is an ARIA combobox (search box + listbox): Arrow keys move, Enter selects, Escape
 *   closes without closing the sheet, and the list is a normal in-flow block so it follows the
 *   sheet's scroll and works in right-to-left layouts.
 * - The server re-validates the number for the chosen country; nothing here is trusted.
 */
export function PhoneField({
  copy,
  locale,
  country,
  onCountryChange,
  inputRef,
  invalid,
  errorId,
  error,
}: {
  copy: ProfileCardCopy
  locale: CardLocale
  country: CountryCode
  onCountryChange: (code: CountryCode) => void
  inputRef: RefObject<HTMLInputElement | null>
  invalid: boolean
  errorId: string
  /** The message under the field when it is flagged. */
  error: React.ReactNode
}) {
  const id = useId()
  const inputId = `${id}-phone`
  const panelId = `${id}-panel`
  const listId = `${id}-list`
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const all = useMemo(() => optionsFor(locale), [locale])
  const shown = useMemo(() => filterPhoneCountries(all, query), [all, query])
  const selected = useMemo(() => all.find((option) => option.code === country), [all, country])
  const selectedName = selected?.name ?? country
  const optionId = (code: string) => `${listId}-${code}`
  const activeOption = shown[Math.min(active, shown.length - 1)]

  function openPanel() {
    setQuery('')
    setActive(Math.max(0, all.findIndex((option) => option.code === country)))
    setOpen(true)
  }
  function closePanel(focus: 'trigger' | 'number' | 'none') {
    setOpen(false)
    if (focus === 'trigger') triggerRef.current?.focus()
    if (focus === 'number') inputRef.current?.focus()
  }
  function choose(code: CountryCode) {
    onCountryChange(code)
    closePanel('number')
  }

  // Move focus into the search box when the list opens, and keep the list in view inside the scrolling sheet.
  useEffect(() => {
    if (!open) return
    searchRef.current?.focus()
    wrapperRef.current?.scrollIntoView({ block: 'nearest' })
  }, [open])

  // Keep the highlighted option visible as it moves.
  useEffect(() => {
    if (open && activeOption) document.getElementById(optionId(activeOption.code))?.scrollIntoView({ block: 'nearest' })
    // optionId is derived from the stable id.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, activeOption?.code])

  function onTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      if (!open) openPanel()
    } else if (event.key === 'Escape' && open) {
      event.preventDefault()
      event.stopPropagation()
      closePanel('trigger')
    }
  }

  function onSearchKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        if (shown.length) setActive((value) => (value + 1) % shown.length)
        break
      case 'ArrowUp':
        event.preventDefault()
        if (shown.length) setActive((value) => (value - 1 + shown.length) % shown.length)
        break
      case 'PageDown':
        event.preventDefault()
        setActive((value) => Math.min(shown.length - 1, value + 8))
        break
      case 'PageUp':
        event.preventDefault()
        setActive((value) => Math.max(0, value - 8))
        break
      case 'Enter':
        // Never submit the form from the search box.
        event.preventDefault()
        if (activeOption) choose(activeOption.code)
        break
      case 'Escape':
        // Close the list only; the sheet stays open.
        event.preventDefault()
        event.stopPropagation()
        closePanel('trigger')
        break
      case 'Tab':
        event.preventDefault()
        closePanel(event.shiftKey ? 'trigger' : 'number')
        break
    }
  }

  /** Moves a whole international number into the selector + national box. */
  function normalise(input: HTMLInputElement) {
    const split = splitInternationalNumber(input.value, country)
    if (split.text !== input.value) input.value = split.text
    if (split.country !== country) onCountryChange(split.country)
  }

  function onNumberChange(event: ChangeEvent<HTMLInputElement>) {
    // Typing is left alone ("+971 50" already parses as a number, so converting mid-keystroke would
    // fight the visitor). Paste, AutoFill and similar bulk changes are converted at once; typing is
    // converted when the visitor leaves the box or sends the form.
    const type = (event.nativeEvent as InputEvent).inputType
    if (!type || type === 'insertReplacementText' || type.startsWith('insertFrom')) normalise(event.currentTarget)
  }

  return (
    <div ref={wrapperRef} onBlur={(event) => open && !wrapperRef.current?.contains(event.relatedTarget as Node | null) && setOpen(false)}>
      <label htmlFor={inputId} className="pc-soft block text-[13px] font-medium">
        {copy.fieldPhone}
      </label>
      <div className="mt-1.5 flex gap-2">
        <button
          ref={triggerRef}
          type="button"
          onClick={() => (open ? closePanel('none') : openPanel())}
          onKeyDown={onTriggerKeyDown}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={open ? panelId : undefined}
          aria-label={`${copy.phoneCountry}: ${selectedName}, +${dialCode(country)}`}
          className="pc-field pc-phone-trigger"
        >
          <span aria-hidden="true" className="text-[1.15rem] leading-none">
            {flagEmoji(country)}
          </span>
          <span dir="ltr" className="text-[16px] tabular-nums">
            +{dialCode(country)}
          </span>
          <ChevronDown className={`pc-muted h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
        <input
          ref={inputRef}
          id={inputId}
          name="phone"
          type="tel"
          required
          maxLength={30}
          autoComplete="tel"
          inputMode="tel"
          enterKeyHint="next"
          dir="ltr"
          onChange={onNumberChange}
          onBlur={(event) => normalise(event.currentTarget)}
          aria-invalid={invalid}
          aria-describedby={invalid ? errorId : undefined}
          className={`${inputClass} min-w-0 flex-1 text-start`}
        />
      </div>

      {open && (
        <div id={panelId} className="pc-phone-panel">
          <div className="relative">
            <Search className="pc-muted pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2" aria-hidden="true" />
            <input
              ref={searchRef}
              type="text"
              role="combobox"
              aria-expanded="true"
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={activeOption ? optionId(activeOption.code) : undefined}
              aria-label={copy.phoneCountrySearch}
              placeholder={copy.phoneCountrySearch}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setActive(0)
              }}
              onKeyDown={onSearchKeyDown}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              enterKeyHint="done"
              maxLength={40}
              className={`${inputClass} ps-10`}
            />
          </div>
          {shown.length === 0 ? (
            <p role="status" className="pc-soft px-3 py-3 text-[15px] font-normal">
              {copy.phoneCountryNoMatch}
            </p>
          ) : (
            // Options are not focusable: focus stays in the search box (aria-activedescendant). Keep it
            // there on pointer down so a click does not first blur the box and close the list.
            <ul id={listId} role="listbox" aria-label={copy.phoneCountry} className="pc-phone-list" onMouseDown={(event) => event.preventDefault()}>
              {shown.map((option, index) => (
                <li
                  key={option.code}
                  id={optionId(option.code)}
                  role="option"
                  aria-selected={option.code === country}
                  data-active={option === activeOption}
                  onClick={() => choose(option.code)}
                  onMouseMove={() => index !== active && setActive(index)}
                  className="pc-phone-option"
                >
                  <span aria-hidden="true" className="pc-phone-flag">
                    {flagEmoji(option.code)}
                  </span>
                  <span className="min-w-0 flex-1 truncate">{option.name}</span>
                  <bdi dir="ltr" className="pc-muted shrink-0 text-[14px] tabular-nums">
                    +{option.dial}
                  </bdi>
                  <Check className={`h-4 w-4 shrink-0 ${option.code === country ? '' : 'invisible'}`} aria-hidden="true" />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {error}
    </div>
  )
}
