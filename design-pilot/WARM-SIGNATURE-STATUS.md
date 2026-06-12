# Warm-Signature Redesign — Status & Handoff

Branch: `design/warm-signature` (sundae-website). Deploys from `main`; design work stays on this branch.
Dev server: `npm run dev -- -p 3100`. Last updated end of the session that did the cascade + QA below.

> NOTE: TWO Claude sessions have been editing this branch. Session A (this one) did the
> design cascade + page-level translation Wave 1 + light/icon/typography fixes. Session B
> (author roblaryea, commits below) did homepage-SECTION transcreation + nav-font + leftover
> chrome cleanup. Work is complementary; coordinate to avoid double-doing the same files.

---

## DONE

### Design / look-and-feel (Session A)
- Warm-signature cascade site-wide: electric-blue brand chrome → coral/caramel. Kept categorical/
  chart/product-identity blue (cross-intelligence + foresight card palettes, insights 12-category
  palette, foresight forecast line). Tokens warmed at source (tokens.css, animations.css,
  components.css, accessibility.css, globals.css).
- Cream "volume break" relief bands (CreamBreak component) placed EARLY on ~25 pages + the
  shared SolutionPageLayout (covers all 10 /solutions/*). Each has a 22-locale native copy file.
- Warm closers; Footer pre-CTA suppressed by default (no double-CTA stack).
- Product mockups warmed (MockupFrame engine default accent → coral) + inline foresight/4d.
- Typography: base h1/h2/h3 → Fraunces (display) so ad-hoc headings match section headings;
  stray <div> card titles (trust-strip, crew) given font-display. RECOMMENDATION LOCKED:
  card titles = Fraunces (serif), body = Hanken, uppercase eyebrow/data labels stay sans.
- Light-mode invisible icons fixed: bg-slate-900 icon boxes (dark-on-dark glyph in light) →
  bg-[#FF5C4D]/10 + text-[#FF5C4D]. Verified both modes (insights, intelligence, architecture, blog).
- Light hero: was a flat cream panel; now a bright editorial photo (dining-room.jpg @0.32) under
  warm coral/caramel glows + central scrim. NOT visually re-verified (image limit) — eyeball it.
- Six-layer accents warm-harmonized: electric green/sky-blue → sage / muted-teal / plum / rose.
- generated-locales structural `color` fields synced to warmed English (unblocked the build —
  qa:translation runs in prebuild and was failing since the color cascade).

### Translations (Session A — Wave 1, committed 945a584)
Audited existing machine translations across all locales on these PAGE files, fixing real errors
(server→IT-server, covers→blankets, average-check→bank-cheque, 30s→"30 years", LIVE→imperative,
shift→change/gear-shift, stale 14 modules→12, product names wrongly translated, Sundae→ice-cream glyph):
  app_insights_page, app_product_pulse_page, app_crew_page, app_product_page,
  app_core_page (PARTIAL — agent timed out), app_modules_page, app_about_page.

### Session B (author roblaryea — already on the branch)
- 02080c9 Nav font consistency + warmed leftover purple/indigo/cyan chrome (many page.tsx).
- 81fe44e Fixed mistranslated "tradeoff" tr/ur/hi (generatedWebsiteMessageOverrides.ts).
- a7a7e3d Restored fr/es diacritics + fluency (i18n.ts).
- 09f2683 Transcreation pass: homepage SECTION components, 20 locales (components_home_sections_*).

---

## REMAINING

### 1. Translation audit — ~69 of 76 generated-locale files NOT yet done
Same method as Wave 1 (per-file agents, all locales, native-professional rewrite, keep structural
fields byte-identical to EN, keep product names, no em/en-dash). Skip what Session B already did
(components_home_sections_*). Priority order:
  - FINISH/RE-DO: app_core_page (partial), app_product_sundae_report_page, app_product_watchtower_page.
  - BIG marketing: app_product_foresight_page (7545), app_product_cross_intelligence_page (7530),
    app_report_vs_core_page, app_architecture_page, app_intelligence_page, app_getting_started_page,
    app_4d_intelligence_page, app_why_sundae_page, app_benchmarking_page, app_solutions_page +
    the 10 app_solutions_*_page, app_resources/careers/docs/integrations/contact/security/tools*.
  - AI-agent product pages: canvas/scout/forge.
  - LONG-TAIL: faq (content_faqContent), blog, error/layout/loading pages.
  - LEGAL — terms (7042) + privacy (5692): AUDIT CONSERVATIVELY, fix clear errors only, do NOT
    rephrase legal substance; recommend a legal translator sign off.
  - INLINE component copy: 34 .tsx with ar/fr/es Records (verify those too).
  - i18n.ts trees + generatedWebsiteMessageOverrides.ts (Session B touched these — coordinate).
Lower-confidence locales (hi, ur, bn, th, vi, id, ms, ro, pl, sv, tr): fix clear machine-isms,
flag for HUMAN native review — do not certify fluency.

### 2. Complete visual review — every route × dark AND light
Blocked this session by the cumulative image-read limit. Routes: / , /product(+pulse,watchtower,
sundae-report,foresight,cross-intelligence), /insights, /core, /crew, /modules, /pricing,
/benchmarking, /about, /why-sundae, /report-vs-core, /intelligence, /architecture, /4d-intelligence,
/security, /integrations, /getting-started, /resources, /contact, /careers, /faq, /demo, /blog, /docs,
+ all 10 /solutions/*. Watch for: invisible/heavy dark icon boxes in light; low-contrast text on
cream/white; dark mockup chrome on a light section; broken/missing images; font inconsistencies
(headings + card titles Fraunces, body Hanken, labels sans); cream-break legibility; CTA consistency;
any remaining electric-blue chrome.

### 3. Verify (need eyes on rebuilt preview)
- Card titles render Fraunces consistently (user flagged a card image I couldn't load).
- Light hero looks premium (tune dining-room.jpg opacity/scrim if copy is hard to read or photo muddy).

### 4. Content bugs (not translation-fluency)
- insights EN source says "Fourteen specialized modules" + lists 14 — canonical is 12. Fix EN source
  (src/app/insights/page.tsx ~line 20) then re-sync locale numbers.
- about-page `regions` arrays in generated-locales still use old Middle East/NA/Europe/APAC; EN now
  uses city-level entries (Amsterdam/Dubai/US/Canada/Singapore/Tokyo/Mexico City/São Paulo) + tier.

---

## BUILD GATES (must pass — qa:translation runs in prebuild and blocks Vercel)
  npx tsc --noEmit            # zsh: end with `; echo "$?"` (no $PIPESTATUS)
  npm run qa:i18n
  npm run qa:translation      # structural `color`/`icon`/`href` fields MUST equal the EN value per locale
  curl -sL -o /dev/null -w "%{http_code}" http://localhost:3100/   # expect 200

## HARD-WON LESSONS
- NEVER put `*/` inside a CSS comment (e.g. "text-*/font-bold") — closes the comment early, breaks
  the Tailwind/PostCSS build with "Missing opening (".
- If Turbopack serves a cached CSS error after the source is fixed: `rm -rf .next`, kill + restart dev.
- Don't `replace_all` a space-prefixed string — it substring-matches inside more-indented lines.
- When warming a color in a page SOURCE, also update src/generated-locales/*.ts for that field, or
  qa:translation (prebuild) fails → Vercel build fails.
- Screenshots: Playwright viewport 1366x820 DSF 1; light mode via addInitScript
  localStorage.setItem('sundae-theme','light'); fractional scroll to span the page. Image API rejects
  >2000px AND has a cumulative many-image limit per session — downscale with `sips -Z 1200 f.png --out s.png`
  and read sparingly. Helper templates: design-pilot/_*.mjs.
- Two sessions on one branch = clobbering (Agent 1 got reset mid-run). One session owns the repo at a time.
