# Profile cards (sundae.io/<handle>)

The page behind the QR code on Sundae business cards. One tap saves the person into the
visitor's contacts, with no account. Served at `/<handle>` (internally `src/app/p/[handle]`,
with a runtime staff directory and legacy rewrites). Unknown root handles are checked before
streaming so they return a real HTTP 404.

## Add a staff member in Admin

This workflow requires the coordinated team-profile backend, app and website release. Deploy the
backend migration/API first, then the website runtime reader and Admin editor. Source files and
isolated previews are not evidence that this release is live.

1. In **Admin Access Management**, invite the person with the narrow role they need. For personal
   booking, the existing **Scheduling Host** role grants their own scheduling, not general Admin
   access. The person must accept the invitation before they appear as an active staff owner.
   Access to their own CRM contacts is a separate role capability.
2. A super admin opens **My Scheduling > Team profiles**, selects the staff member and enters the
   public business details. The email comes from the staff account and cannot be replaced with
   someone else's mailbox. Only publish details the person has agreed to share.
3. Set a lowercase handle such as `mark`. Reserved marketing/app routes cannot be claimed. After
   its first save the handle is permanent, including while the card is paused. Check it before
   printing. The phone display must match its E.164 call number.
4. Use **Calendar & availability** to configure that person's booking page. A banner identifies the
   selected owner. Changes retain the real admin actor in the audit trail; there is no identity
   swap or impersonation token. Only a super admin can select another scheduling owner.
5. Configure the owner's mailbox, call-taker, working hours, timezone and event types. Save and
   publish the booking profile. Existing publication gates check calendar access and enabled
   events; a rule change pauses the page until it is published again.
6. Publish the contact card, then verify `/<handle>`, `/<handle>/contact.vcf?lang=en`, an RTL view
   and the person's `/book/<slug>` link. The runtime card includes only a published, usable
   booking page belonging to the same owner. Otherwise it retains the general demo fallback.
7. Print only after the real public URLs work. No website rebuild is needed to add the next
   staff member through this editor.

Interface labels cover the 25 registered languages. Custom title/city text remains as authored;
optional `titleTranslations` and `cityTranslations` are accepted by the directory contract and are
preserved on edits. The legacy Robert record retains its existing localized title/city catalogue.

## Runtime contract and lifecycle

- Backend `team_card_profiles` stores one record per admin owner with a unique permanent handle,
  validated public details, publication state, edit version and real updating admin.
- `GET /api/admin/marketing/team-profiles` and `PUT .../:ownerAdminId/card` require SUPER_ADMIN.
  Stale edits return a conflict instead of overwriting another admin's changes.
- The existing personal-booking API accepts `ownerAdminId` only for a SUPER_ADMIN acting on an
  active scheduling owner. Owner-only requests and restricted custom roles retain their scope.
- `GET /api/v1/public/team-profiles/:handle` exposes a field whitelist and is rate limited.
  Paused cards or inactive/retired/deleted owners return a tombstone with no contact details.
  An account email change also hides an old card until its email is reviewed and saved again.
- Website profile lookups and downloadable contacts use no-store/private caching so a pause is
  checked on the next request. Paused contact files return 410. Unknown cards return 404.
- Robert's existing code record is a transitional fallback only when the API returns 404. A
  directory tombstone or an upstream failure never falls back to an old active record.

Mark's agreed setup is Amsterdam, Netherlands; +31 6 41 50 92 55; 60-minute calls; Europe/Amsterdam,
Monday to Friday 09:00-17:00. His Scheduling Host invitation was still pending at the live review
on 18 October 2026. He will accept it later; no role was activated, production page published,
real booking created or invitation resent during the review.

## Look and feel

- **Light and dark.** The card opens in light for everyone, regardless of the phone's theme, and has its
  own toggle (the choice is stored on the device). The hero panel is always espresso: it holds the layered S, whose cream top would
  vanish on paper. Palettes live in `profile-card.css`; do not use the site theme here.
- **Show QR.** The QR button opens a full-screen code for this card so someone beside you can scan it
  from your phone, no physical card needed.
- **Link preview.** Robert retains `public/profile/robert-og.png`. Runtime staff cards use
  text metadata and do not reference a nonexistent per-person image. Per-person social artwork
  can be added later without blocking contact-page publishing.

## Sharing details without retyping

- **iPhone and most desktop browsers:** the form's fields carry standard autocomplete tokens, so
  Safari/Chrome offer to fill name, email, phone and company from the visitor's own contact card in one tap.
- **Chrome on Android:** a "Fill from my contacts" button uses the Contact Picker API. It only fills
  the form; everything stays editable and nothing is sent until the visitor submits.
- iOS Safari has no web API to read contacts, so AutoFill is the best available path there.

## Before and after a deploy

`npm run smoke:profile-card -- https://www.sundae.io` checks the page, the contact file, the link
preview, redirects, the form endpoint (with an input that is rejected, so no lead is created) and that
unknown URLs still 404. Run it before printing any cards that carry the link.

## Contact exchange and the CRM list

> **Off by default.** The form and its API route only exist when the hosting environment sets
> `PROFILE_CARD_LEAD_FORM=on`. Leave it unset until the consent wording and privacy-policy coverage
> are approved; the page and Save contact work without it.

Visitors can leave their own details ("Share your details": name and email required, phone,
company and message optional, explicit consent). It posts to `/api/profile-card/connect`, which
forwards a signed lead to the Sundae backend's marketing-leads intake, the same intake the
website forms use. It needs the same two environment variables as those forms:
`SUNDAE_BACKEND_URL` and `MARKETING_LEAD_HMAC_SECRET`.

- **Where staff see them:** the existing lead list at `/admin/marketing/leads` in the Sundae app.
  Each lead is labelled `Profile card: <owner name>`, has source page `/<handle>`, and carries the
  owner, channel and consent evidence (wording, version, timestamp) in its metadata.
- **What the backend does on its own:** creates the CRM lead, assigns it to the card owner (matched
  by the owner email sent in the lead metadata), sends the visitor a card-specific auto-reply in
  their language, starts the response clock and notifies admins.
- **Not built:** a "Source" filter in the lead list.
- **Consent:** bump `CONSENT_VERSION` in `src/lib/profileConnect.ts` whenever the consent wording
  changes (all 25 locales). Confirm the privacy policy covers this collection before launch.
- **Spam controls:** honeypot, minimum fill time, same-origin check, per-IP limit, payload limits.
  The per-IP limit is in-memory (as on the existing forms), so treat it as a speed bump; add Vercel
  BotID if abuse appears.
- **Local testing:** point `SUNDAE_BACKEND_URL` at a mock; never test against the production backend.

## Notes

- The page is `noindex`. It carries a personal phone number and is reachable by link and QR.
- Interface strings live in `src/lib/profileCardCopy.ts` (25 locales). Have a native speaker review a
  locale before a wide rollout. Russian, Azerbaijani and Papiamento were drafted with machine
  assistance and especially need native review. Papiamento follows the Aruba-style spelling used
  by the website's booking pages; Curaçao writes it differently.
- **Language choice:** `?lang=` (set by the globe menu on the card), then the `sundae_card_locale`
  cookie, then the website language cookie, then the browser's `Accept-Language`, then English. The
  card cookie is separate, so choosing a language on a card never changes the rest of the website.
  Russian, Azerbaijani and Papiamento exist only on cards and the booking flow, so their cookie
  banner copy lives in `CookieConsent.tsx`.
- Profiles are managed in Admin after this coordinated release; publication changes are audited
  and protected against stale edits. The code registry remains only for legacy compatibility.

## Staff lifecycle

- **Leaving:** pause the contact card in Team profiles and deactivate or retire the person's Admin
  access through the existing access workflow. The handle stays reserved, their details are hidden,
  contact downloads return 410, and the exchange form is closed. Never reassign a printed handle.
- **Joining:** use Admin Access Management and Team profiles, not a website source-code change.
- **Their contacts:** contacts stay in the Sundae admin (Marketing & Comms > Contacts) owned by the
  person. When someone leaves, reassign their contacts before deactivating their admin access, or a
  super admin can filter by owner and bulk-assign them.
- **Limited access:** a custom admin role with the "My contacts" capability sees only the contacts
  assigned to them; it cannot convert to pipeline leads or see other people's contacts.

## Form recovery and limits

- Field-specific messages (name, email, phone, consent) appear under the field, the first one is
  focused, and the field is linked with `aria-describedby`.
- Too many attempts (5 stored submissions per address per hour, process-local) shows an explanation
  and a Try again button that unlocks when the wait ends. The automatic timing retry and fixable
  validation errors do not use up attempts.
- **Deployment-wide limit:** a Vercel Firewall rule "Profile card form rate limit" (POST
  `/api/profile-card/connect`, 20 requests per 10 minutes per address, fixed window, 429) was published
  to production on 2026-10-18. It applies to that endpoint only; the card page and contact file are not
  affected. Manage it with `vercel firewall rules list | edit | disable`. Do not add a block duration:
  it would block the visitor from the whole site. The in-app counter below remains as a second layer.
- The in-app limit is a speed bump, not a deployment-wide control. The backend holds acknowledgement
  emails to an hourly budget (`PROFILE_CARD_ACK_HOURLY_BUDGET`, default 100) and sends at most one
  acknowledgement per email address, which bounds mail volume.
