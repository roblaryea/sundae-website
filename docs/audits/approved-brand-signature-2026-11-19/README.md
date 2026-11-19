# Approved brand signature

## Intent and boundaries

The owner approved the exact English signature and supporting sentence on 19 November 2026. This cut replaces Home's previous two-part opener with three equal clauses and synchronizes the generic localized description. After reviewing the existing footer screenshot, the owner also asked about replacing its long brand paragraph with the signature alone; this cut includes that specific refinement. Category-rich metadata titles, category wording, page-specific product descriptions, the founder story, other footer content and the approved Academy outro remain outside this change.

Visual thesis: a calm espresso opening, cream Fraunces clauses and a single caramel profit emphasis, retaining the approved identity and recovery illustration.

Content plan: SUNDAE and the category establish the brand; the three clauses state the promise; the supporting sentence explains the connection between work, market context, action and recovery; the existing walkthrough action leads into the operating story.

Interaction thesis: preserve the existing recovery-loop progression, restrained scene handoff and CTA hover. All opening copy and the action remain visible in server HTML. All three clauses use the same responsive CSS size and wrap naturally at word boundaries. Opening typography does not depend on JavaScript measurements or state.

## Canonical copy

`src/content/brand-signature.json` holds 22 localized `{ headline, decision, outcome, support }` records. English is verbatim. Localized recovery language refers to recovered profit. `scripts/sync-brand-signature.mjs` synchronizes existing workflow brand fields and the generated navigation without external APIs or paid translation.

## Validation

Author validation and retained unchanged evidence:

- Full `npm run build`, including 22-locale i18n/translation/diagnostic/positioning prebuild gates, TypeScript, production generation and postbuild runtime-security/trace/advisory checks. The deployed-runtime inventory reports zero advisories.
- Full lint: zero errors and 41 existing warnings. Targeted lint was repeated after the footer and fitting correction.
- 223 SEO tests, including approved English authority and 22-locale canonical/generated parity. The affected brand/alignment subset was repeated after the footer edit: 9/9 passed.
- Initial 26-case browser coverage, with unchanged copy/footer acceptance retained, covering EN/DE/NL/AR, desktop and mobile, both themes with JavaScript, and default-dark server HTML without JavaScript; additional EN 320px and DE 1024px boundaries. All three clauses and the exact supporting description are present, one H1 is retained, text stays inside its column, the opening demo action remains within the first viewport and no page errors occur. Every case also checks the localized footer signature and its bounds. The EN mobile demo action was actually clicked through to `/demo`.

The first reference-size fitter underestimated long Fraunces text because optical size changes its glyph widths. An actual-size replacement passed the initial matrix, but independent review found an NL desktop/mobile/tablet/desktop resize sequence could reintroduce overflow. The final source removes optional JavaScript fitting entirely and uses the already visible CSS wrapping for every state. This preserves the English hierarchy and lets longer translations wrap at word boundaries without transient nowrap styles. A repository locale-index guard also caught a direct footer index; it now follows the established typed-index convention. The earlier matrix receipt is retained as pre-correction evidence; the final resize receipt is recorded separately.

No-JavaScript theme coverage is explicitly default dark: the existing light preference requires the theme bootstrap script. Mobile cases are browser emulation, not a physical-device claim. Existing illustration-stage labels were not rewritten in this signature cut.

The final correction passed 16 additional states: exact NL 1440→390→1024→1440 with reduced motion, equivalent EN/DE resize sequences, EN/AR mobile light, and DE desktop/AR mobile without JavaScript. Each state checks actual text ranges against the column, normal wrapping, no inline font-size, CTA visibility and no page errors. Final outcomes are in `resize-retake-receipt.json`; the earlier static matrix remains in `browser-receipt.json`. Representative final screenshots are in `evidence/`. Publication is owned by the existing SEO/GEO chat; the source author does not merge this cut. Independent review and public acceptance are pending.
