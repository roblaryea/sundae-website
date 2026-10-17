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
3. **Role and city.** Use an existing key in `src/lib/profileCatalogue.ts`. If the role or city is
   new, add it with **all 22 locales**; the tests fail otherwise. Languages with gendered titles
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

- **Light and dark.** The card follows the visitor's system theme and has its own toggle (stored on
  the device). The hero panel is always espresso: it holds the layered S, whose cream top would
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

Visitors can leave their own details ("Share your details": name and email required, phone,
company and message optional, explicit consent). It posts to `/api/profile-card/connect`, which
forwards a signed lead to the Sundae backend's marketing-leads intake, the same intake the
website forms use. It needs the same two environment variables as those forms:
`SUNDAE_BACKEND_URL` and `MARKETING_LEAD_HMAC_SECRET`.

- **Where staff see them:** the existing lead list at `/admin/marketing/leads` in the Sundae app.
  Each lead is labelled `Profile card: <owner name>`, has source page `/<handle>`, and carries the
  owner, channel and consent evidence (wording, version, timestamp) in its metadata.
- **What the backend does on its own:** creates the CRM lead, sends its standard auto-reply from
  sales@sundaetechnologies.com, starts the response clock and notifies admins.
- **Not automatic yet (backend follow-ups):** assigning the lead to the card owner, filtering the
  list by source, and a card-specific auto-reply. Until then leads arrive unassigned.
- **Consent:** bump `CONSENT_VERSION` in `src/lib/profileConnect.ts` whenever the consent wording
  changes (all 22 locales). Confirm the privacy policy covers this collection before launch.
- **Spam controls:** honeypot, minimum fill time, same-origin check, per-IP limit, payload limits.
  The per-IP limit is in-memory (as on the existing forms), so treat it as a speed bump; add Vercel
  BotID if abuse appears.
- **Local testing:** point `SUNDAE_BACKEND_URL` at a mock; never test against the production backend.

## Notes

- The page is `noindex`. It carries a personal phone number and is reachable by link and QR.
- Interface strings live in `src/lib/profileCardCopy.ts` (22 locales). Have a native speaker review a
  locale before a wide rollout.
- Profiles are code, so each change is reviewed and versioned. If the list grows beyond a handful of
  people, move the registry behind an admin-managed store.
