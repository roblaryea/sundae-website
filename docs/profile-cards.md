# Profile cards (sundae.io/<handle>)

The page behind the QR code on Sundae business cards. One tap saves the person into the
visitor's contacts, with no account. Served at `/<handle>` (internally `src/app/p/[handle]`,
rewritten in `next.config.ts` for registered handles only, so unknown URLs keep their normal 404).

## Add a staff member

1. **Handle.** Add it to `PROFILE_HANDLES` in `src/lib/profileHandles.ts`. Lowercase letters,
   digits and hyphens; this becomes `sundae.io/<handle>`.
2. **Profile.** Add the entry to `PROFILES` in `src/lib/profileData.ts`. TypeScript will not
   build until every handle has a profile. Only include details the person has agreed to publish.
   - `titleForm` is the person's own choice of grammatical form for languages that have one
     (French, Spanish, German, Arabic and others). Ask them; never infer it from a name.
   - `phone` is E.164 (`+971...`), `phoneDisplay` is how it reads on the page.
   - `bookingSlug` is the slug of the person's published personal booking page in the Sundae admin
     (Marketing > Booking settings). "Book a working session" opens `sundae.io/book/<slug>`, so the
     person must create and publish that page first; without a slug the card links to the demo page.
3. **Role and city.** Use an existing key in `src/lib/profileCatalogue.ts`. If the role or city is
   new, add it with **all 25 locales** (the website's 22 plus Russian, Azerbaijani and Papiamento); the tests fail otherwise. Languages with gendered titles
   need both a `masculine` and a `feminine` form. Countries need no entry: they come from the
   platform's locale data via the city's ISO code.
4. **Run** `npm run test:profile-card`, then `npm run build` (it runs the site's i18n gates).
5. **Check** `/<handle>` in English and one right-to-left language (Arabic), and download the
   contact file from the Save contact button.
6. **Print.** Open the PVC card page in the app repo (`brand/business-cards`), set the scan link
   to `https://sundae.io/<handle>`, and export. Paper cards are personalised on their own page.

The downloaded contact file follows the visitor's language for the job title and place names
(`?lang=`); the person's name is always kept as written.

## Look and feel

- **Light and dark.** The card opens in light for everyone, regardless of the phone's theme, and has its
  own toggle (the choice is stored on the device). The hero panel is always espresso: it holds the layered S, whose cream top would
  vanish on paper. Palettes live in `profile-card.css`; do not use the site theme here.
- **Show QR.** The QR button opens a full-screen code for this card so someone beside you can scan it
  from your phone, no physical card needed.
- **Link preview.** `public/profile/<handle>-og.png` is the image shown when the link is shared in
  WhatsApp, iMessage, LinkedIn or Slack. Regenerate and commit it when a name or role changes:
  `node --no-warnings scripts/profile-og/generate.mjs` (needs Playwright). Tests fail if it is missing.

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
- Profiles are code, so each change is reviewed and versioned. If the list grows beyond a handful of
  people, move the registry behind an admin-managed store.

## Staff lifecycle

- **Leaving:** set `active: false` on the person's profile in `src/lib/profileData.ts`. The handle stays
  reserved, so printed QR codes keep working, but the card stops showing the person's details (name,
  phone, email, LinkedIn), the contact file returns 410 Gone, the form is closed and the visitor is
  pointed to the Sundae team. Never reuse a printed handle for someone else.
- **Joining:** add the profile (see "Adding a person") through a reviewed pull request. Their personal
  booking page must exist and be published first (`bookingSlug`).
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
