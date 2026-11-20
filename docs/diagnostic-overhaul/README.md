# Operations Diagnostic overhaul

- Spec (approved 20 Nov 2026): [`SPEC-diagnostic-overhaul.md`](SPEC-diagnostic-overhaul.md)
- Phase A (content, rules, report; the step-by-step form): merged in PR #288.
- Phases B and C (this folder's screenshots): the questionnaire as a Sundae-branded
  conversation, and booking a walkthrough from inside the report. Off by default.

## Where things live

| Piece | File |
|---|---|
| Question bank (one bank, two renderers) | `src/lib/diagnostic/questions.ts`, `flowLogic.ts` |
| Conversation state machine: turns, branching, skip, back, edit, resume, classic carry-over, `metadata.convo` | `src/lib/diagnosticConversation/machine.ts` |
| Experiment split (env var + its own cookie) | `src/lib/diagnosticConversation/variant.ts` |
| Page-level constants and sessionStorage helpers (kept out of the classic bundle) | `src/lib/diagnosticConversation/session.ts` |
| Conversation UI (lazy-loaded for the guided arm only) | `src/components/diagnostic/DiagnosticConversation.tsx` |
| Pieces shared with guided booking (log, lines, chips, inputs, POS picker, company confirm, progress, back/edit, classic switch, booking offer) | `src/components/conversation/parts.tsx` (styles: `src/components/marketing/guidedBooking/guidedBooking.module.css`) |
| Variant choice, landing, generation, lead | `src/app/diagnostic/page.tsx` |
| Report final card: email ending / inline booking | `src/components/diagnostic/DiagnosticNextStep.tsx`, `GuidedNextStep.tsx` (lazy) |
| Lead outbox (passes the delivery response, token in memory only) | `src/lib/diagnostic/leadOutbox.ts` |
| Which `/api/cta/submit` sources may see a booking token | `src/lib/leadBookingToken.ts` |
| Copy, 22 locales | `src/lib/diagnostic/copy/<locale>.ts` (`convo.*`, `report.sendingReport` / `bookingOffer` / `bookingClose`); shared chat chrome from `src/lib/leadConversation/copy.ts` |

## Switching it on (owner decision - nothing changes until then)

`NEXT_PUBLIC_GUIDED_DIAGNOSTIC` is unset in code, which means `off`: every
visitor sees the step-by-step diagnostic exactly as before. `?guided=1` opens the
conversation on `/diagnostic` (any locale) for QA, even when the variable is
unset; `?guided=0` forces the classic form. Neither override sets a cookie.

| Variable | Values |
|---|---|
| `NEXT_PUBLIC_GUIDED_DIAGNOSTIC` | `off` (default when unset), `split` (50/50, kept per visitor by the functional cookie `sundae_diag_variant`, 90 days, `SameSite=Lax`, path `/`), `on` (100% guided) |

It is independent of `NEXT_PUBLIC_GUIDED_BOOKING` and its `sundae_lead_variant`
cookie. Build-time (`NEXT_PUBLIC_`) variable: set it in Vercel and redeploy.
Read results and the promote / switch-off rules in spec section 6.5.

## How a guided lead differs

- Sent through the same outbox to `/api/cta/submit` with `source: 'guided-diagnostic'`
  and `metadata.convo` (`{ version, questionBankVersion, variant, answers, turns,
  skipped, inferred, freeMail, durationMs }`; answers by question id, never the name,
  email or company). `metadata.report` and `metadata.responses` are as in Phase A.
- The website route does not forward `source` to the backend (as for guided booking);
  the backend recognises a guided lead by `metadata.convo`.
- For a new lead with a work email and no earlier lead for that address, the backend
  returns a 2-hour booking token; the route passes it to the browser for
  `guided-diagnostic` and `guided-booking` only, with `no-store` / `no-referrer`.
  The page keeps it in memory and the report offers **Choose a time**. Otherwise the
  report shows the email ending. Production issues tokens only after the backend's
  next `develop` → `main` release; until then every visitor gets the email ending.
- A guided visitor who switches to the classic form and finishes there sends a
  classic lead (no `source`, no `metadata.convo`), as guided booking does.

## Analytics (PostHog)

Every `diagnostic_*` event carries `variant` (`classic` / `guided`) and
`surface: 'diagnostic'`. New: `diagnostic_turn_answered` (turnId, index,
skipped, msSinceStart), `diagnostic_turn_edited`, `diagnostic_switched_to_classic`,
`diagnostic_booking_opened`, `diagnostic_booking_booked`. No names, emails,
company names, phone numbers, free text or tokens.

## Tests

```bash
npm run test:diagnostic-lead
```

```bash
npm run test:guided-diagnostic:e2e
```

The Playwright suite runs against the local booking fixture
(`tests/booking-e2e/backend-fixture.mjs`), never a real backend, with `.test`
addresses. Arabic, German and the screenshot matrix need `next start`:

```bash
npm run build && DIAGNOSTIC_E2E_PRODUCTION=1 DIAGNOSTIC_SCREENS_DIR=/tmp/diagnostic-screens npm run test:guided-diagnostic:e2e
```

## Screenshots (`screenshots/`, production build, local fixture)

| File | Shows |
|---|---|
| `en-dark-1440-landing.png`, `en-light-1440-landing.png`, `de-light-1440-landing.png` | Guided landing: the hero stays, the conversation replaces the stepper (design board desktop frame) |
| `en-dark-390-opening.png` | Phone opening line in Fraunces, name field |
| `en-dark-1440-chips.png`, `en-light-1440-chips.png`, `de-dark-768-chips.png` | Mid-conversation: transcript with Edit, the twelve "money slips away" choices, Back, privacy line |
| `en-dark-320-chips.png`, `en-light-390-chips.png`, `de-light-390-chips.png` | Phones: long choice lists scroll in a capped answer area with "Done" pinned, so the question stays visible |
| `ar-dark-390-opening.png`, `ar-dark-390-chips.png`, `ar-light-1440-chips.png` | Arabic right to left; "Sundae" kept in Latin script |
| `en-dark-1440-report-offer.png`, `en-light-390-report-offer.png` | Report final card for a new work-email lead: Choose a time |
| `en-light-1440-booking-dialog.png` | Choose a time opens the existing booking screen |
| `en-dark-390-report-email.png` | The email ending (no token, or "I'll use the email link later") |

The full matrix (320/390/768/1280/1440, dark and light, EN/AR/DE) is produced by
`tests/guided-diagnostic-e2e/guided-diagnostic-visual.spec.ts` (see Tests).
