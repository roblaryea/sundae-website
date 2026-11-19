# Visible marketing delivery and four-step accessibility

Base: main `16a9269f109988b08c4a467654fb472cc6a5608d` (post PR267).
Author receiver: http://localhost:3156 .

## Observed problem

Nine fresh production checks using JavaScript-disabled Chromium with Chrome, Googlebot and GPTBot user-agent profiles returned 200 with H1 text in the response, but left the completed route subtree in React's hidden stream container. The only painted main content was the loading message or breadcrumbs: 10 characters on Home, 34 on Getting Started, 40 on the restaurant-management-platform page. These are client simulations, not evidence that a particular search engine cannot index Sundae. The independent reviewer also reproduced the hidden completed subtree with Twitterbot's static profile.

The installed Next 16.4.6 loading and streaming docs confirm that root `loading.tsx` introduces an automatic Suspense boundary and that streamed content replaces the fallback through inline JavaScript. The boundary-only production probe removed all hidden stream containers on the three target pages and exposed the narrower opening-motion defects. It also proved that Getting Started's opening was already painted correctly once the boundary was removed.

A separate production accessibility run found 14 low-contrast nodes in the Home four-dimension section, caused by white 11px active numerals on coral and entire text panels fading to 0.22 opacity. Four mobile step buttons displayed numerals while their accessible names used labels hidden below `sm`.

## Bounded change

- Move the exact localized server loading component to `ui/RouteLoading.tsx`, reusing its existing translation sources. Remove the root automatic boundary and retain the fallback on `/book`, `/p` and the actual root `[handle]` digital-card route.
- Keep critical Home and operator-workflow opening text/actions visible in server HTML. Preserve the approved copy, layout, brand and scroll effects. The Home illustrative recovery amount is stable before and after hydration; the existing moving stage highlight remains.
- A real German 1440px no-JavaScript text-range check found 12.71px clipping where the headline required JavaScript font fitting. Server HTML now allows wrapping; `nowrap` is applied only once the measured fitted size exists. The settled interactive design retains its fitting behavior.
- Keep localized four-step labels visible on mobile; decorative numerals are hidden from the accessible name. Use visible focus, at least 44px controls and dark ink on the active coral numeral. Text panels remain opaque; border emphasis communicates progression. Logical start borders support RTL, and narrow illustrations stack to keep text readable.
- Append the independently verified 19 November support-release measurement receipt to the existing authority document. Preserve earlier cohorts, definitions and schedules. No new business outcome claim.

## Validation

The final required production build and its i18n/translation/positioning prebuild checks, runtime tests, production trace and advisory audit passed. The audit reports 50 deployed packages and no advisories. An earlier build's advisory request timed out; its exact postbuild retry passed, then the final typography correction received a complete passing build. Focused lint and whitespace checks passed. Existing suites passed: 222 SEO, 20 booking and 64 profile-card tests.

Actual final production browser checks:

- Nine JavaScript-disabled profile/route cases: painted H1 and critical opening links, more than 1,000 main-text characters, no hidden stream container, correct canonical and language alternates.
- German and Dutch 1440px server-rendered headline ranges: no clipping without JavaScript.
- Four settled visual/interaction cases: English desktop dark/light, Dutch 320px light/reduced motion, Arabic 390px dark/RTL/reduced motion. All 16 step activations show the correct localized heading, readable text panels, visible keyboard focus, minimum targets and no horizontal overflow.
- Actual `/book` without a token shows its unavailable state with no form submitted, `noindex, nofollow` and `no-referrer`. Both `/robert` and `/p/robert` retain public-card chrome and `noindex, nofollow`; an unknown root handle returns 404 and a noindex tag. No private booking token, contact exchange, save or submission was used.

Finite evidence is in `data/` and `evidence/`. The independent reviewer retains its original production and Lighthouse evidence. Local Vercel analytics endpoint 404/MIME messages are expected outside hosting and are not application page errors.

## Scope and limits

This improves delivery of the tested marketing openings and the identified four-step controls. Other interactive and lower-page animation sections still depend on JavaScript; this is not a global no-JavaScript rewrite. No metadata, redirects, locale routing, cookie consent, security policy, book/profile data source or customer copy was changed. No numerical performance uplift is claimed: the original lab run was confounded by shared Mac load. Video drafts are a separate local branch and are excluded from this cut. The source author does not self-merge.
