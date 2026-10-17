'use client'

import { Globe } from 'lucide-react'
import { trackCta } from '@/lib/cta'
import { CARD_LOCALE_COOKIE } from '@/lib/profileCardLocale'

/**
 * Language menu for the card. A native <select> sits invisibly over the globe button, so the
 * platform's own picker opens (best on phones, fully accessible, no custom menu to get wrong).
 * The choice is stored in a card-only cookie, so it never changes the rest of the website,
 * then the page reloads in that language. Names are shown in each language's own script.
 */
export function LanguageSwitcher({
  handle,
  label,
  value,
  options,
}: {
  handle: string
  label: string
  value: string
  options: { value: string; label: string }[]
}) {
  function onChange(next: string) {
    try {
      document.cookie = `${CARD_LOCALE_COOKIE}=${encodeURIComponent(next)}; path=/; max-age=31536000; samesite=lax`
    } catch {
      /* Cookies blocked: fall back to a one-off ?lang= below. */
    }
    trackCta('profile_card_language', { handle, language: next })
    const url = new URL(window.location.href)
    url.searchParams.set('lang', next)
    window.location.assign(url.toString())
  }

  return (
    <label className="pc-iconbtn relative cursor-pointer" title={label}>
      <Globe className="h-[18px] w-[18px]" aria-hidden="true" />
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} lang={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
