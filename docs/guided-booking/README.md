# Guided booking (conversational walkthrough booking)

A scripted, Sundae-branded conversation that can replace the static lead form on
`/demo`, `/contact` and `/get-started`. No AI and no credits: every line is
pre-written and translated, branching is deterministic, and it submits the same
payload as the classic form to `/api/cta/submit`.

- Spec (approved 20 Nov 2026): [`SPEC-conversational-walkthrough-booking.md`](SPEC-conversational-walkthrough-booking.md)
- Design reference board: [`design/guided-booking-design-reference.html`](design/guided-booking-design-reference.html) (open in a browser) and the PNG frames in [`design/`](design/)
- Screenshots of the built component: [`screenshots/`](screenshots/)

## Where things live

| Piece | File |
|---|---|
| Variant switch per surface (classic vs guided, lazy-loads guided) | `src/components/marketing/LeadCaptureSurface.tsx` |
| Conversation UI | `src/components/marketing/ConversationalLeadCapture.tsx`, `src/components/marketing/guidedBooking/` |
| Phase 2 hand-off to the existing `BookingView` | `src/components/marketing/guidedBooking/GuidedBookingHandoff.tsx` |
| Script, state machine, payload, resume | `src/lib/leadConversation/script.ts`, `machine.ts` |
| Free-mail list, company-from-domain, POS lists, context | `src/lib/leadConversation/inference.ts` |
| Package facts for the brief (one source) | `src/lib/leadConversation/packageNotes.ts` |
| Experiment split (env var + cookie) | `src/lib/leadConversation/variant.ts` |
| Copy for all 22 website locales | `src/lib/leadConversation/copy.ts` (checked by `qa:translation`) |
| Shared field rules (both forms) | `src/lib/leadFields.ts` |

## Switching it on (owner decision - nothing changes until then)

`NEXT_PUBLIC_GUIDED_BOOKING` is unset in code, which means `off`: every visitor
sees the classic form exactly as before. `?guided=1` shows guided booking on any
of the three pages for QA, even when the variable is unset; `?guided=0` forces
the classic form. Neither override changes the visitor's cookie.

| Variable | Values |
|---|---|
| `NEXT_PUBLIC_GUIDED_BOOKING` | `off` (default when unset), `split` (50/50, kept per visitor by the functional cookie `sundae_lead_variant`, 90 days), `on` (100% guided) |
| `NEXT_PUBLIC_GUIDED_BOOKING_SURFACES` | Comma list of `demo,contact,get-started` (default: all three) |

These are build-time (`NEXT_PUBLIC_`) variables: set them in Vercel and redeploy.
Launch steps and the go/no-go rules are in spec sections 6.6 and 12.

## Tests

```bash
npm run test:guided-booking
```

```bash
npm run test:guided-booking:e2e
```

The Playwright suite runs against the local backend fixture
(`tests/booking-e2e/backend-fixture.mjs`), never a real backend. For non-English
locales and the screenshot matrix, build first and run against `next start`:

```bash
npm run build && GUIDED_E2E_PRODUCTION=1 GUIDED_SCREENS_DIR=/tmp/guided-screens npm run test:guided-booking:e2e
```

(The dev-mode run covers the English flows, the cookie split and analytics. A
`next dev` server bound to 127.0.0.1 redirect-loops locale-prefixed paths such as
`/ar/demo`, so Arabic and German are checked against `next start`. Production is
unaffected.)
