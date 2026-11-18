# Website audit follow-through — 18 November 2026

This is the finite website-side follow-through from the 17 November independent website/pricing audit. It records actions that could be completed safely from current source and live evidence without inventing customer-result baselines or changing the pricing calculation authority.

## Published website correction

Website PR250 is merged as `3e46234d36618a8d762b42bfca6c00943fc8f482`, from application source `7bddfd0aa15bac326f8a0037c93e695b5eea1886`, based on published main `09821609f880e63fcc5a9d1f82548594e9e26d95`.

It does three bounded things:

- Redirects all localized legacy `/xx/pricing` pages to `pricing.sundae.io`, preserving the locale, `cfg` quote intent and campaign parameters. This removes duplicate indexable pricing pages while keeping the current calculator as the pricing authority.
- Keeps the homepage's primary supporting explanation visible in the server-rendered state, while preserving motion on the headline, recovery loop and CTA.
- Gives the homepage role switcher an accessible name and proper roving keyboard behavior: Arrow keys, Home, End, wraparound, focus and RTL direction.

The accepted design system, Core/Crew proposition, prices, quote calculations, attribution rules and identity correction are unchanged.

## Evidence

- `data/public-redirects.json`: 44 actual production redirect cases across 22 website locales, root/simulator paths and quote/campaign parameters; all pass.
- `data/keyboard-preview-final.log`: built EN/DE/AR receiver. Arrow/Home/End, focus, selection, one tab stop and no horizontal overflow pass. The independent Arabic390 visual retake is retained by the existing reviewer.
- `data/public-keyboard.log`: public Arabic receiver confirms `dir=rtl`, selected tab, focus, one tab stop and no overflow.
- `data/no-js-preview.log`: built server HTML includes the unchanged supporting copy with opacity 1, visible state and no transform. This proves emitted HTML/style availability; it does not claim the entire site is fully usable with JavaScript disabled.

Checks completed before publication: 221 SEO/search/navigation tests, 54 pricing-navigation tests including the new redirect cases, 4 pricing/auth handoff tests, full Node 22 production build and runtime audit (106 traces, 50 packages, zero advisories), lint with zero errors and 41 existing warnings, and all hosted PR250 checks.

## Items deliberately kept separate

- The four customer stories still lack owner-provided periods, baselines and measured-versus-estimated splits. Those facts are not invented.
- The pricing loading/layout-shift item remains with the pricing owner because it requires a structural loading-shell and catalogue-hydration correction. A controlled three-run production Lighthouse diagnostic recorded pricing median LCP 5.98s and CLS 0.324; this is lab evidence, with cache-clear warnings on two runs, and is not a field-performance or uplift claim. The matched pricing successor is being prepared separately.
- The homepage diagnostic baseline was measured three times before and three times after this finite text change. Results vary materially between runs because of shared-host/cache and candidate-selection behavior; the receipts are retained as diagnostics rather than converted into a performance promise.
- App splash-screen publication and social/content scheduling remain separate owners and releases.
