'use client'

import { Moon, Sun } from 'lucide-react'
import { trackCta } from '@/lib/cta'

export const THEME_STORAGE_KEY = 'sundae-card-theme'

/**
 * Light / dark switch for the card. Light applies by default (pure CSS, so there is no flash);
 * choosing here stores the preference on this device. Both icons are
 * always rendered and CSS shows the one for the mode you would switch to, so server and
 * client markup never disagree.
 */
export function ThemeToggle({ handle, label }: { handle: string; label: string }) {
  function onClick() {
    const root = document.querySelector('.pc-root')
    if (!root) return
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
    const next = current === 'light' ? 'dark' : 'light'
    root.setAttribute('data-theme', next)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      /* Private mode or storage blocked: the choice lasts until the page is closed. */
    }
    trackCta('profile_card_theme', { handle, theme: next })
  }

  return (
    <button type="button" onClick={onClick} aria-label={label} title={label} className="pc-iconbtn">
      <Sun className="pc-sun h-[18px] w-[18px]" aria-hidden="true" />
      <Moon className="pc-moon h-[18px] w-[18px]" aria-hidden="true" />
    </button>
  )
}
