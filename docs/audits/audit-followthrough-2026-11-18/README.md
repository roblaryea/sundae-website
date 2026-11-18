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

## 18 November continuation

The follow-through continued after this report was first prepared:

- Main PR252 (`0986f12`) aligned Careers and Blog openings, metadata and OG descriptions with hospitality and food-service operations across all 22 website locales. PR253 (`561fc12`) then corrected translated Careers breadcrumbs and Blog article-count pluralisation. Public verification passed all 44 Careers/Blog locale routes for status, H1, metadata, canonical, language/direction and the finite translated-label/count cases.
- Pricing PR64 (`7c44785`) merged the loading-stability successor and the light-mode consent contrast correction. Public readback confirmed the static loading shell, the validated `$1,195/mo` Foundation quote, no horizontal overflow, readable light-mode consent copy and explicit failure/retry behaviour. Arabic simulator readback retained RTL and produced the validated 7-location Core Growth quote (`3,310.75 US$/شهرياً`) while consuming the configuration link under the existing contract. This does not establish field/CrUX performance or a ranking outcome; the matched lab evidence supports CLS/first-paint improvement only, with LCP still open.

The 23 November search/discovery and PostHog checkpoint remains the next measurement boundary. Customer story baselines and fresh Core evidence remain owner-dependent and are not invented.

Durable public readbacks: [44 localized pages](data/support-pages-public.json), [pricing unavailable/retry](data/pricing-public-failure-retry.log), [Arabic initial quote](data/pricing-public-ar-initial.log) and [Arabic reload selection](data/pricing-public-ar-reload.log). The initial Arabic harness incorrectly expected `cfg` to remain in the URL; the existing simulator deliberately consumes it into selection state and removes it. A follow-up reload correctly shows step 01 with the same Growth/seven-location/annual-quarterly selection and the rounded plan-card total (`3,311 US$`); the exact review quote is `3,310.75 US$`. The initial failed raw-URL assertion and a later basket-selector timeout are not product regressions and are not credited as passing tests. Public failure/retry and the corrected selection readback are the accepted evidence.
