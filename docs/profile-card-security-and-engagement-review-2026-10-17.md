# Sundae profile card security and engagement review

Reviewed on 17 October 2026. The public card at https://www.sundae.io/robert is live and the save-contact flow passes the deployment smoke checks. The optional contact-exchange form is disabled in production. The visual direction is worth retaining; the next investment should make contact capture, follow-up and ownership dependable before enabling that form.

## Implementation recovered

The implementation was recovered from the dedicated worktrees, commit history and product documentation. A separate originating chat could not be positively identified in the available chat listing.

| Surface | Checkout and reviewed revision | Work present |
| --- | --- | --- |
| Public website | `/Users/robertlaryea/Documents/Dev/sundae-website-profile-card`, `635690e` | Registered staff handles, contact page, structured vCard with embedded photo, sharing, on-screen QR, light/dark themes, 25 languages, optional exchange form and signed CRM submission |
| Backend | `/Users/robertlaryea/Documents/Dev/wt-backend-profile-card-lead-routing-20261017`, `938eca82b` | Card-source recognition, owner assignment, localized acknowledgement emails, assignment notifications and card-source API filters |
| Admin UI | `/Users/robertlaryea/Documents/Dev/sundae-app`, `2fcc395d2` | Existing marketing lead list, assignee filters, lead detail and follow-up workspace; no card-source selector in the inspected list |

Relevant website commits are `77fd46c` (profile page, contact file and lead form), `292a4b5` (25 languages) and `635690e` (light theme default). Backend commits are `41279a2e3` (owner routing and source filters), `61abc14a9` (localized acknowledgement) and `938eca82b` (Papiamento copy). Commit presence establishes implementation, not deployment of the CRM integration.

## Verification and limits

- `npm run test:profile-card`: 32 tests passed, zero failed.
- `npm run smoke:profile-card -- https://www.sundae.io`: passed, including page, contact file, localized downloads, language selection, preview image, canonical redirects, unknown-route 404 and the disabled form endpoint.
- Live browser inspection: English desktop, 390 × 844 mobile, 375 × 667 mobile, Arabic RTL, theme switch and on-screen QR dialog. Arabic rendered RTL without horizontal overflow.
- Pure-function reproductions confirmed the fast-submission loss and consent-language discrepancy below. They used synthetic local input and created no CRM records.
- Direct live GET requests reproduced the cached vCard-language issue.
- No valid production lead was submitted and no email was sent during this review. Backend database routing, delivery and CRM ownership were inspected in code and existing test definitions; their production execution was not certified. The backend functional suite was not run against a shared database.
- The deployed contact-exchange endpoint returns 404 because the feature is off. Findings about that path apply before it is enabled.

## Existing protections to retain

The website selects the card owner from its server-side registry rather than trusting a visitor-supplied owner email. The backend validates timestamped HMAC signatures with a constant-time comparison. Lead creation and its initial audit event are transactional, and a database advisory lock protects creation idempotency. Assignment excludes inactive and retired admins and inactive/deleted users. The visitor chooses whether to share details, required consent is checked server-side, personal submitted fields are absent from the inspected route logs, and analytics initialization follows the site's cookie-consent controls. Save contact uses a plain link and needs no account.

## Priority findings

### F01 High product risk: a fast legitimate submission can be acknowledged and discarded

- **Rule:** successful contact capture must correspond to a stored lead or interaction.
- **Location:** `src/lib/profileConnect.ts:52`, `src/app/api/profile-card/connect/route.ts:74`, `src/app/p/[handle]/ShareDetails.tsx:71` and `:123`.
- **Evidence:** elapsed time below `MIN_FILL_MS = 2000` returns `{ kind: 'ignored' }`; the route returns `{ ok: true }`; the client displays the success state for any successful HTTP response. The timer restarts each time the form opens. Synthetic valid input at 1,500 ms returned `ignored`; the same input at 2,500 ms returned `ok`.
- **Impact:** AutoFill or a close/reopen followed by submission can lose a real connection while telling the visitor it succeeded. An attacker does not need to be involved.
- **Fix:** treat fill time as a risk signal rather than conclusive evidence. Use a retryable challenge or a truthful pending state for suspicious timing, reserving silent rejection for stronger evidence such as a populated honeypot. Verify the accepted response against persisted intake.
- **Acceptance:** a fast consented AutoFill submission is retained, or the visitor receives an explicit retry instruction; honeypot submissions still produce no lead or mail.

### F02 High reliability risk: assignment and follow-up are unqueued background work

- **Rule:** important post-intake work must be durable and retryable.
- **Location:** backend `app/controllers/public_marketing_leads_controller.ts:121` and `app/services/marketing/marketing_lead_service.ts:104`.
- **Evidence:** `void (async () => { ... })()` performs mail, assignment and notification after insertion; exceptions are logged. The response returns 201 independently. An idempotent retry resolves to `created: false`, so this block does not run again.
- **Impact:** a process restart or failed mail/database/notification dependency can leave a stored lead without its promised owner or acknowledgement. Repeating the original request does not necessarily repair it.
- **Fix:** commit durable outbox entries with lead creation; process assignment, acknowledgement and notifications through idempotent workers with retries, reconciliation and an operator-visible failure state. Separate owner assignment from mail delivery so a slow mailbox does not delay routing.
- **Mitigation:** alert on unassigned card leads and unacknowledged intake while a durable worker path is added.
- **Limit:** an actual outage or production data loss was not induced; this finding follows the inspected execution path.

### F03 Medium security risk: application throttling does not provide a deployment-wide abuse limit

- **Rule:** public endpoints that can trigger email need shared abuse controls.
- **Location:** `src/app/api/profile-card/connect/route.ts:19` and `:57`.
- **Evidence:** the five-attempt hourly limiter uses a process-local `Map`; it has no expired-IP eviction. The key is taken from the first `x-forwarded-for` value, falling back to `x-real-ip`.
- **Impact:** limits reset across cold starts and are independent across instances. Growing IP cardinality retains map entries. A per-IP limit can also penalize visitors sharing an event venue's network, while distributed senders avoid it.
- **Fix:** shared atomic counters with TTL; combined limits by verified client address, target email and card handle; a global mail-volume budget; and a low-friction challenge for suspicious traffic. Confirm the hosting provider's trusted client-IP contract before selecting the address header. Keep an accessible fallback.
- **Mitigation and uncertainty:** edge/WAF controls may provide additional protection; their configuration was not audited. Forwarded-header spoofing was not demonstrated on Vercel and is not asserted as a confirmed vulnerability.

### F04 Medium privacy risk: saved consent evidence differs from the language shown

- **Rule:** consent evidence should record the approved wording presented to the visitor.
- **Location:** `src/lib/profileConnect.ts:13` and `:116`; displayed copy is in `src/lib/profileCardCopy.ts:145` for Arabic.
- **Evidence:** `buildLeadPayload` always stores `text: CONSENT_TEXT_EN`, including when `context.locale` is Arabic. The Arabic UI displays Arabic wording. A local reproduction confirmed both values differ.
- **Impact:** the CRM evidence does not faithfully describe the text the visitor agreed to. This is a consent-record accuracy issue, not a legal compliance determination.
- **Fix:** derive the approved wording server-side from the normalized locale and record the actual text, locale, wording version and privacy-policy version. Keep permission to respond to this exchange distinct from optional ongoing marketing consent.
- **Acceptance:** Arabic, French and English submissions store their corresponding displayed wording and version. The production feature remains off until the intended consent and privacy coverage are approved.

### F05 Medium product risk: legitimate repeat interactions can disappear into daily deduplication

- **Rule:** distinguish transport retries from separate conversations.
- **Location:** `src/app/api/profile-card/connect/route.ts:98`; backend `app/services/marketing/marketing_lead_service.ts:104`.
- **Evidence:** the idempotency key hashes email, name and UTC day for one card. On an existing key, the backend returns the original lead without recording the new note, phone or consent evidence in this path. Conversely, changing the name or date changes the key.
- **Impact:** a visitor who intentionally submits another message that day receives success while the new message is not recorded. Across days, the same person may create another lead rather than a new interaction attached to the same contact.
- **Fix:** retain a stable contact/lead identity, append individual consented interaction events, and use a submission ID only to deduplicate retries of that specific event. Surface later messages in the owner's timeline.
- **Limit:** this behavior is demonstrated by the website's key composition and backend existing-row branch, not by inserting production records.

### F06 Medium engagement issue: cookie consent obscures the primary action on a small phone

- **Rule:** the first-visit primary action should remain visible and tappable.
- **Location:** `src/app/p/[handle]/profile-card.css:51` and `src/components/CookieConsent.tsx:232`.
- **Evidence:** at 375 × 667 with fresh consent state, Save contact occupied approximately y=610–666; the fixed cookie banner occupied y=597–664. Measured vertical overlap was about 55 px of a 56 px button. Evidence: `output/playwright/profile-card-review/profile-card-review-first-visit-small-phone.png`.
- **Impact:** the most important engagement action is obscured on the very device used to scan the card.
- **Fix:** use a more compact mobile hero/content rhythm and reserve space for consent UI, or use an inline consent treatment that cannot cover actions. Another option is an essential-only card experience with optional analytics disabled; changing the consent banner requires changing tracking accordingly, not merely hiding it.
- **Acceptance:** fresh visitors at 320, 375 and 390 px widths can see and activate Save contact with the consent prompt present, including with larger text settings.

### F07 Low localization issue: the direct vCard URL can serve the wrong cached language

- **Rule:** cache identity must include inputs that change response content.
- **Location:** `src/app/p/[handle]/contact.vcf/route.ts:27` and `:41`.
- **Evidence:** the route resolves the title from `Accept-Language` when `?lang=` is absent, but specifies shared caching without a `Vary: Accept-Language` header. A live French request to `/robert/contact.vcf` returned `Founder & CEO`, `x-vercel-cache: HIT`, and no Vary header. `/robert/contact.vcf?lang=fr` correctly returned `Fondateur et PDG`.
- **Impact:** a direct localized download can import English role/address text. The ordinary French page uses an explicit language query and worked in the smoke test, so this is not a failure of every localized save.
- **Fix:** use explicit normalized language URLs, including English, and a matching cache key; or disable shared caching for header-negotiated responses. Verify host-specific cache behavior rather than relying on Vary alone.

### F08 Low security hardening issue: the 16 KB body cap trusts a declaration

- **Rule:** bound actual request bytes before parsing untrusted JSON.
- **Location:** `src/app/api/profile-card/connect/route.ts:62`.
- **Evidence:** the handler checks `Content-Length`, then invokes `request.json()` without measuring the consumed body. Requests without that header bypass the application's stated 16 KB check.
- **Impact:** the application-level cap does not itself constrain parsing work. The production provider may impose a separate request-size limit, so an unlimited-body production exposure is not claimed.
- **Fix:** enforce a byte limit while reading the stream and a JSON content-type policy, backed by the provider's ingress limit. Test oversized bodies with and without Content-Length.

## Enhancements for a premium engagement flow

1. **Keep Save contact as the primary action.** Keep exchange optional and visible as a secondary action. Preserve the existing brand, native contact links, language support and low-friction form rather than adding a large menu of competing actions.
2. **Add an owner-aware meeting path.** `ProfileActions.tsx:97` currently receives `DEMO_URL`, defined as `/demo` in `src/lib/urls.ts:51`. A card-specific booking handoff should preserve the owner and context server-side and take a visitor to a working calendar rather than make them start a generic enquiry. Validate owner availability before offering a slot; define a clear team fallback.
3. **Expose the card source in CRM.** Backend `admin_marketing_leads_controller.ts` already accepts `source=profile_card` and `profileHandle`; the inspected app list's `ListLeadsFilters` and query omit these. Add “Card contacts”, “My card contacts”, card owner, event/source and follow-up due filters, with source and consent evidence visible in lead detail.
4. **Make response ownership explicit.** Acknowledgements currently use the team/shared-mailbox Reply-To. Retain that if shared-inbox threading is required, but route replies reliably to the assigned owner. Do not set arbitrary owner addresses without validating mail/threading behavior. Show response due, delivery status and unresolved assignment in the CRM.
5. **Capture useful meeting context optionally.** One short “Where did we meet?” field or an event-specific approved link can be more useful than another generic qualification field. Store it on the interaction; avoid forcing a role/interest questionnaire before contact exchange.
6. **Measure the funnel accurately.** Track consented card-page visits, Save contact clicks, successful stored exchanges, qualified conversations and booked meetings by owner. A click or vCard response is not proof that the phone added a contact. Paper cards that embed a vCard directly do not generate website scan analytics; changing that requires a different QR and reprinting. Do not label ordinary page visits as verified physical scans.
7. **Prepare staff lifecycle management.** Keep handles stable; add activation/deactivation, reviewed publishing and a defined fallback when someone leaves. Do not recycle an existing printed handle to another person. Future staff should receive a narrowly scoped card/CRM role rather than broad system-admin access just to own leads; current automatic matching requires an active `SundaeAdmin`.
8. **Make retries and recovery helpful.** Preserve form input in memory after failure, show rate-limit cooldown and an explicit “Try again” action, focus the first invalid field and provide field-specific guidance. Avoid persisting visitor contact details in browser storage or analytics by default.

## Suggested implementation order

**Before enabling exchange:** fix F01, F02 and F04; implement deployment-wide abuse controls for F03; confirm consent/privacy coverage and run an isolated end-to-end test against a dedicated test database and mocked mail transport. Prove stored lead, correct owner, accurate consent and durable acknowledgement rather than checking only a successful response.

**Next polish pass:** fix F06 and F07, expose card-source filters, preserve repeat interactions, and connect owner-aware booking. Cover first-visit mobile, Arabic RTL, fast AutoFill, same-day repeat notes, upstream timeout, retry and owner-unavailable cases.

**Then scale to staff:** lifecycle controls, limited CRM permissions, owner/event reporting and optional event-specific context. Add a live page/contact-file health check before future card print runs.

This review adds documentation only. Production code, feature flags, deployments, CRM records and mail delivery were not changed.

## Implementation status (website, 2026-10-17)

Each finding was re-verified against the code before acting. Website-side fixes ship in the hardening PR; backend and app work is tracked separately.

| Finding | Status |
| --- | --- |
| F01 fast submission lost | Fixed. Only a filled honeypot or a missing timestamp is silently ignored. Odd timing returns 409 `retry`; the form retries once with a fresh timer, so a real connection is stored. Tests cover it. |
| F02 unqueued follow-up | Confirmed in backend; not changed here. Needs a durable outbox or a reconciliation sweep (backend PR). |
| F03 process-local limiter | Confirmed. Map is now pruned so it cannot grow without bound. A shared limiter (Vercel WAF rule or a hosted counter) needs a cost and platform decision. |
| F04 consent wording | Fixed. The saved evidence is the wording shown in the visitor's language, with locale, English reference text, version and privacy URL. |
| F05 repeat interactions | Confirmed in backend dedupe branch; not changed here (backend PR). |
| F06 cookie banner covers Save contact | Fixed for short phones (compact hero at 667px, tagline hidden at 568px). Measured overlap 0 at 375x667 and 320x568. |
| F07 cached vCard language | Fixed. The page always sends an explicit `?lang=`, including English; header-negotiated responses are private and revalidated. |
| F08 body cap | Fixed. Bytes are counted while reading, a JSON content type is required, and oversize chunked bodies return 413. |
