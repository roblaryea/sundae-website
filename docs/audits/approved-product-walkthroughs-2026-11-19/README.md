# Approved product walkthrough website release

Robert approved the exact sales, action and attendance masters for public website use with “approved to use on the site”. Approval is bound to the SHA-256 digests in release-approval.json. No media was re-encoded for this release. This approval does not authorize YouTube publication.

The films use a recorded August 2026 synthetic demonstration, not customer results or a verification of the current live release. The page discloses English narration, captions, transcripts and synthetic data. Full prior video review assets remain in the original media handoff; this audit verifies website integration and does not claim new human listening.

## Website checks

- Full lint passed, plus 226 SEO/media/locale tests.
- Full npm run build passed, including translation and positioning prebuild checks, TypeScript, runtime security tests, production traces and runtime dependency audit (zero advisories).
- Blog/page copy, reduced-motion, fixed-position, pricing handoff and lint compatibility checks passed.
- Production server browser checks passed for all three approved durations, English captions (14/15/14 cues), native inline controls, keyboard Watch activation, mutually exclusive playback, expandable transcripts and failure/retry recovery.
- No MP4 or caption requests before Watch. Versioned media URLs preserve the approved bytes and prevent stale edits.
- Desktop dark/light and 390px mobile layouts checked; Arabic RTL has no horizontal overflow. Resources teaser and mobile navigation link checked. Canonical and VideoObject durations verified.

The attached browser receipt and screenshots document the website behavior. Local-only Vercel analytics script errors are expected outside Vercel; the playback error was injected deliberately to test recovery.
