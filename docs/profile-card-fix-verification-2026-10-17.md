# Sundae profile card fix verification

> Historical checkpoint: the scheduled follow-up at 19:49 UTC / 23:49 Dubai on 17 October 2026, at the end of this document, supersedes the earlier release-state statements below. At that checkpoint, backend PR 2312 was merged and its exact release commit was observable on the production API. These observations have not been reassessed for the 2 November documentation commit.

Rechecked on 17 October 2026 against the original security and engagement review. The website hardening is merged and its observable changes are live. The complete CRM follow-up workflow is not yet certified: the backend owner-routing release is still open, and durable follow-up, shared abuse limits and repeat-interaction handling remain outstanding.

## Release state

- Website [PR 159](https://github.com/roblaryea/sundae-website/pull/159) is merged. Fetched `origin/main` is `88e7ef1`; the reviewed website feature files match local hardening commit `e302b3b`.
- Backend [PR 2312](https://github.com/Sundae-io/sundae-stable/pull/2312), targeting `main`, is OPEN. The card-owner routing/localized reply implementation is in the pushed `hotfix/profile-card-lead-routing-main` branch, reviewed locally at `482105d7a`.
- Fetched backend production `main` is `e4a44a254`; its public lead controller does not contain `assignProfileCardOwner`. A manual deployment from another branch was not inspected. The open PR and production-main contents do not establish that owner routing and card-specific replies are running in production.
- Fetched app production `main` is `53b45d367`. The inspected marketing lead API/filter UI does not expose card source or profile handle filters.
- The live website now shows Share your details and the endpoint rejects an invalid, non-consented submission with HTTP 400. The form is enabled, unlike the earlier review checkpoint.

## Original findings

| Finding | Rechecked status | Evidence |
| --- | --- | --- |
| F01 Fast legitimate submissions silently discarded | Fixed for the original timing case | Live API returns HTTP 409 `retry`, rather than success, for suspicious timing. An intercepted browser test verified two requests, a corrected timestamp and preserved input after the retry. No successful test submission was sent upstream. |
| F02 Non-durable follow-up | Still open | Both fetched backend main and the card-routing branch retain the unqueued `void (async () => ...)` block. Mail, routing and notifications are not committed as durable outbox work in the reviewed intake path. |
| F03 Process-local rate limit | Partially improved | Expired-address pruning was added. The authoritative limit remains a process-local Map, not a deployment-wide limit. Edge/WAF policy was not audited. |
| F04 Consent wording mismatch | Implemented and unit-tested | The server obtains the displayed localized sentence and stores it with locale, English reference, version and privacy URL. The relevant tests pass. Actual production CRM storage of a consented submission was not exercised. |
| F05 Repeat interactions lost in daily deduplication | Still open | The website still hashes email/name/day; the backend's existing-idempotency-key branch returns the original lead without adding the second interaction in that path. |
| F06 Cookie banner covers Save contact | Live fix confirmed at the reproduced sizes | Fresh-consent browser checks at 375 × 667 and 320 × 568 measured zero overlap and no horizontal overflow. |
| F07 Shared vCard language cache | Live fix confirmed for the original routes | Save contact now includes `?lang=en`. Bare-URL French and English requests returned their respective role titles, `private, max-age=0, must-revalidate`, and `Vary: Accept-Language`. |
| F08 Header-only body size cap | Live fix confirmed | An actual streamed body above 16 KB received HTTP 413; a text/plain body received HTTP 415. Byte-limited-reader unit tests also pass. |

## Checks performed

- `npm run test:profile-card`: 34 passed, zero failed.
- `npm run smoke:profile-card -- https://www.sundae.io`: all checks passed. The script's deliberately invalid form request cannot create a lead because consent is false.
- Live negative API probes: timing retry 409, oversized streamed JSON 413, unsupported content type 415.
- Fresh first-visit browser checks:
  - 375 × 667: Save contact bottom approximately 552 px; cookie banner top approximately 618 px; overlap 0.
  - 320 × 568: Save contact bottom approximately 484 px; cookie banner top approximately 515 px; overlap 0.
- Browser retry test: the form's requests were intercepted and fulfilled locally, first with 409 and then 200. This verifies client retry behavior, not database persistence or mail delivery.
- Live vCard French and English requests returned the correct language and private caching. Explicit invalid language query values were also inspected: they still take the shared-cache branch, so normalizing those values remains a small hardening opportunity.
- Refreshed website, backend and app main references and checked the website/backend PR states through GitHub.

Evidence screenshots are in `output/playwright/profile-card-fix-verification/`.

## Remaining work in order

1. **Close the backend release and verify the real CRM handoff.** Merge/deploy the reviewed routing release through the normal process. In an isolated acceptance environment with a dedicated database and captured/mock mail, prove one stored interaction, correct owner, localized acknowledgement and notification. Separately verify production deployment identity and configuration. A successful website response alone does not certify those steps.
2. **Make follow-up durable.** Commit outbox work alongside intake; process routing and acknowledgement independently through idempotent workers with retry/reconciliation and visible failure state. Preserve receipt and owner assignment even if a mail dependency is slow or unavailable.
3. **Add shared abuse controls.** Use atomic counters with TTL and an operational mail-volume budget. Pruning expired Map entries does not hard-bound the number of distinct addresses seen within the current hour. Avoid an IP-only policy that blocks several legitimate visitors using one venue network.
4. **Separate retry identity from interaction identity.** Preserve one contact with multiple message/meeting-context events, and deduplicate transport retries using a submission ID. A second intentional note must appear in the owner's timeline.
5. **Expose the CRM source controls.** Add My card contacts/Card contacts views, profile owner/source filters, follow-up due and acknowledgement/routing status. The card-source backend filter exists in the routing branch but its app controls remain absent in the inspected app main.
6. **Preserve the owner through booking.** The profile's booking link still leads to generic `/demo`. Use the existing booking capability with explicit owner/context and an availability/team fallback rather than making a person re-enter a generic enquiry.
7. **Improve error recovery.** Add an explicit rate-limit cooldown and retry action, focus the first invalid field and show field-specific messages. Account for the automatic timing retry consuming another rate-limit attempt.
8. **Prepare staff lifecycle and limited access.** Provide deactivation/fallback for printed handles, reviewed profile publishing, stable identity and narrowly scoped card/CRM access. Do not require broad system-admin access simply to own a card's contacts.

## Small additional hardening opportunities

- In `src/app/p/[handle]/contact.vcf/route.ts:40`, a nonempty but unsupported `lang` is treated as explicit for shared caching even though locale resolution falls back to Accept-Language. Reject or normalize invalid values, or keep those responses private. No cross-language cache failure was reproduced for that invalid-query case in this recheck; the valid generated links and bare URL now behaved correctly.
- Keep consent-wording versioning and privacy-policy versioning explicit. The current fix stores a privacy URL, which does not identify a historical policy revision by itself.
- Keep funnel labels honest: Save contact clicks/downloads are observable; successful import into a phone's address book is not confirmed by a browser click. Direct embedded-vCard paper QRs still bypass website scan analytics.

## Scope and workspace state

This was verification and documentation, not implementation. No production feature flags, deployments, CRM rows or real acknowledgement emails were changed by this review. The new verification document is local and untracked. The existing website source was clean; existing app changes under the card-artwork folder and generated API registry were left untouched.

## Follow-up status (website, 2026-10-17)

Each pending item was reviewed against the code before acting.

| Item | Status |
| --- | --- |
| 1. Backend release and CRM handoff | Backend PR 2312 is a reviewed cherry-pick of the routing and localized-reply commits onto `main`. Merge follows CI; the real handoff is verified after deploy. |
| 2. Durable follow-up | Confirmed open. Being addressed in the backend contacts work: the contact and its owner are committed inside the request, and acknowledgement state is recorded for a retry sweep. |
| 3. Shared abuse controls | Confirmed open. Needs a platform decision (Vercel WAF rate-limit rule or a hosted counter). |
| 4. Retry identity vs interaction identity | Website side fixed: each submission attempt carries a `submissionId`; retries and double taps share one idempotency key, a second intentional message does not. The backend contacts work records each as its own timeline interaction. |
| 5. CRM source controls | Being built as a Contacts area in the admin (type, company, event, owner and source filters). |
| 6. Owner-aware booking | Open; separate piece of work. |
| 7. Error recovery | Open; needs new copy in 25 languages. |
| 8. Staff lifecycle | Open. |
| Small: unsupported `?lang=` cached as explicit | Fixed. Only supported values use shared caching. |

## Scheduled one-hour reassessment — 19:49 UTC / 23:49 Dubai

**Assessment:** meaningful progress, but the complete contact-engagement workflow is not yet ready to sign off. The routing/localized-reply hotfix is deployed. Contacts, repeat-submission identity and personal booking integration remain in open PRs. The Contacts branch improves durable intake but does not yet schedule its acknowledgement retry sweep.

### Implemented, tested, merged and deployed

| Area | Implemented and tested | Merged / deployed | Operational verification |
| --- | --- | --- | --- |
| Website hardening, PR 159 | Previously tested; live smoke checks pass again | Vercel production deployment `dpl_GAr3qobefXyBtcwsMVoh4npRz6AK`, READY, `main` commit `88e7ef12312fdf95d4822aa820cd1768875cab94` | Card page, localized contact downloads, safe negative form request, mobile spacing and intercepted client retry verified. |
| Backend routing and localized acknowledgement, PR 2312 | CI passed | Merged at 18:55:04 UTC; `GET https://api.sundaetech.ai/api/health` returns HTTP 200 and release `14778dae67f17702c3f469bfebf59a4744692693`, matching the merge commit | Running version confirmed. No real production contact, owner assignment, acknowledgement or notification was exercised. |
| Website submission identity, invalid-language cache and personal booking integration, PR 160 | Reviewed local head `e31088a`; 37 profile tests pass; PR checks green | OPEN targeting main; production remains `88e7ef1` | Live card still links “Book a working session” to `/demo`. Unsupported `?lang=nonsense` remains on the public-cache branch. |
| Contacts backend, PR 2315 | Pushed head `4ac41a712`; CI green. CI migrated PostgreSQL and executed the Contacts and card-intake functional tests, including repeat interactions, retry dedupe, owner routing and mocked acknowledgement recovery | OPEN targeting develop; not present in production main | No production migration or Contacts acceptance claimed. |
| Contacts admin, PR 2085 | Pushed head `738ab85e3`; 12 focused API/view and locale-parity tests pass locally | OPEN targeting develop; full CI failing on admin-route registry parity; absent from inspected production main | No live admin workflow verified. |

### Remaining findings and release priorities

**R1 / P1 — acknowledgement retry exists but is not scheduled; owner notification is still transient.**

The Contacts branch commits the contact, owner and interaction together before responding. This materially improves the current live controller, which still performs routing after email inside its background block. However:

- `app/controllers/public_marketing_leads_controller.ts:137–143` still starts acknowledgement/notification with `void (async () => ...)`.
- `app/services/crm/crm_contact_followup_service.ts:109–117` defines `retryPendingAcknowledgements`, but a repository search found its only invocation in `tests/functional/marketing/profile_card_lead_routing.spec.ts:610`; no scheduler, job or command invokes it in the inspected branch.
- That test manually invokes the helper. It proves the helper can recover captured/mock mail against the CI schema; it does not prove automatic recovery after a process interruption.
- Owner-notification failures are caught and logged at follow-up service lines 100–104, without a durable notification retry record.

Complete a scheduled worker/outbox path for both actions, with atomic claiming, backoff, send deduplication and visible failure/reconciliation status. A provider send followed by a failed database update must not produce an uncontrolled duplicate on retry. Verify this with an interrupted process in an isolated environment.

**R2 / P2 — Contacts admin release is blocked by its generated route inventory.**

CI job `117482179244` in app run `39062132092` fails `src/lib/admin/__tests__/route-registry-parity.test.ts:62`: the generated inventory omits `/admin/marketing/contacts`. Reproduced locally: one parity test failed and one passed. Refresh the inventory through the repository generator, then rerun the failed gate. Passing the 12 focused Contacts tests does not close this release failure. Both Contacts PRs target develop, so a production release and migration still need their normal promotion after merge.

**R3 / P2 — shared abuse controls remain open.**

Both the deployed website source and PR 160 use the process-local `Map` in `src/app/api/profile-card/connect/route.ts:22–43`, with five requests per IP per hour. Expiry pruning is not a shared limit or a hard cap on distinct current-window addresses. Add shared TTL counters or an equivalent verified edge rule, a mail-volume budget, and a policy that accommodates several visitors on one event/venue network. The automatic timing retry currently consumes another attempt. WAF policy was not inspected; absence of an infrastructure control is not asserted.

**R4 / P2 — release the coordinated interaction changes and verify the handoff.**

PR 160 gives each intentional submission its own identity while retaining one key for retries. PR 2315 preserves a single contact with separate interaction/consent records and supports conversion to a lead only when appropriate. Those are useful improvements and CI exercised the backend behavior, but the production website still uses the earlier daily identity and production backend still uses the lead intake path. Do not describe the new Contacts behavior as live until the coordinated release, migration and controlled acceptance are complete.

**R5 / P2 — personal booking is implemented but not linked from the live card yet.**

The profile branch contains `bookingSlug: 'robert'` and routes to the personal page. The live card's link remains `/demo`. Release PR 160 and confirm the card retains the person's identity through booking. Availability, confirmation delivery and calendar-event creation remain separate acceptance steps; no meeting was booked in this review.

Lower-priority enhancements remain: clear field-specific errors and rate-limit cooldown, follow-up due/delivery states in the CRM, staff deactivation with stable printed handles, narrowly scoped staff access, explicit privacy-policy revision evidence, and analytics that distinguish clicks/downloads from a confirmed contact import. The invalid-language cache change is implemented in PR 160, but live responses still return public caching for that unsupported query; French and English content each resolved correctly in this probe, so no cross-language leakage was reproduced.

### Verification and limits

- Reran website `test:profile-card`: **37 passed, zero failed**, on the local PR 160 head. This is newer code than the production deployment.
- Reran live `smoke:profile-card`: **all checks passed**. Its only POST carries `consent:false`, so it cannot create a lead.
- Fresh mobile checks at 375 × 667 and 320 × 568: **zero Save-contact/cookie-banner overlap and no horizontal overflow**. At 320 px the measured Save bottom was 483.7 px and banner top 498.0 px.
- Repeated the client retry check with the production form's endpoint intercepted locally: 409 then 200, two requests, corrected timestamp, preserved fields. No successful request was forwarded upstream.
- Reran two focused Contacts admin test files: **12 passed**. Separately reproduced the route-registry failure. Full app preflight was not run or claimed.
- Inspected backend CI evidence rather than running database-writing tests against a local/shared environment. CI proved the new schema-backed capture/repeat/retry-helper cases with mocked outbound delivery; production delivery was not exercised.
- Railway deployment metadata could not be read (`Not Authorized`). The API's own release endpoint independently confirmed the deployed web commit; separate worker/scheduler deployment identities were not certified.
- No merge, deployment, production flag change, real CRM test record or real outbound email was performed by this review.

The review adds documentation only; feature branches inspected were clean at the 17 October checkpoint. Existing card/signature proposal files and the unrelated generated registry change in the primary app checkout were left untouched by that review. Screenshots remain under `output/playwright/profile-card-fix-verification/`.
