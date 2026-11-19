# Core, Crew and product opening visibility

Base: main `60d29d56fe1c0dede546c207e80c4eadfb0f0472` (published PR268).
Application commit: `c35ec0d125df9add8ad6d4c5d55138d18d3b9ef3`.
Local production receiver: http://localhost:3157 .

After the root loading boundary correction, the independent reviewer confirmed that `/core`, `/crew` and `/product` still hid critical opening text and actions through their own initial opacity. Why Sundae settled visibly and is excluded. The reviewer retained the actual styled counterexamples in its priority-opening evidence.

This four-file correction adds an explicit default-false `visibleOnServer` option to `PageHero`, used only by the confirmed Core and product callsites. Other callers retain the previous default. Crew's six confirmed opening/proof parents now start visibly: eyebrow, heading, description, action group, proof strip and native-proof image/caption wrapper. The existing proof perspective remains. All text, assets, layout, product claims, pricing and entitlements are unchanged. `FadeUp`, `StaggerContainer`, `StaggerItem`, `PageCTA` and lower-page motion are unchanged.

Validation passed: complete required production build and pre/postbuild checks, including localization, runtime trace and 50-package advisory audit with no advisories; focused lint; 222 existing SEO tests; whitespace check. Actual production browser checks cover 36 route/locale/size/theme-request cases across all three routes, English/Dutch/Arabic, normal JavaScript and JavaScript-disabled contexts. Both normal themes are covered. With JavaScript disabled the existing theme bootstrap does not run, so those cases use the server's default dark theme; screenshot filenames record the requested preference. The JSON records the actual rendered theme.

Every case has a painted H1, supporting paragraph and opening actions, no hidden stream container, no horizontal document or headline overflow and no application page errors. Crew's existing native image and disclosure remain visible and the image loads. The evidence does not claim that JavaScript-dependent buttons or other interactive features work without JavaScript. No form was submitted. Source and browser readbacks are in `data/`; representative direct screenshots are in `evidence/`.

This is a finite successor to PR268. It is not a new copy/design pass or a global animation rewrite. Independent acceptance and exact-head hosted checks remain with the SEO/GEO publisher. Video media are not part of this cut.

Independent source, runtime and visual review accepted application `c35ec0d` without further changes. It verified nine no-JavaScript English/Dutch/Arabic cases and nine normal JavaScript desktop/mobile/theme cases, clicked every demo action through to the correct localized `/demo` route, checked Crew proof decoding and reported no application page errors. Its exact readback is preserved in `data/independent-local.json`. A pre-existing Dutch Crew proof-label localization observation remains outside this frozen source correction.
