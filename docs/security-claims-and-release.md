# Security claims and release control

Updated 23 October 2026. This is an internal implementation record, not an independent assurance report.

The security page, architecture security copy and home trust headline share evidence-qualified statements in `src/lib/security-claims.json` for the website's 22 registered locales. These are distinct from the broader 25-locale profile-card/booking surfaces; this change does not disable or change those surfaces.

`npm run security:sync-claims` updates the relevant existing source and generated literals while retaining unrelated copy. `npm run qa:security-claims` checks for drift without writing files and is part of the build prerequisite. The positioning generator's English security wording also reads the reviewed source. Regeneration must not restore full-compliance, universal encryption/logging, physical residency, or completed-independent-test claims without new scoped evidence and release approval.

The revised wording distinguishes documented controls from operating assurance, says Sundae has no current SOC 2 report, identifies independent penetration testing as being sourced, requires verification of effective processing terms, and qualifies region/client-hosted options as scoped implementations. Architecture no longer presents GDPR/CCPA as certified/compliant badges.

The authoritative company control program, remediation register and customer release gate live in the backend repository under `docs/security-assurance/`. Backend policy design, a green CI run and this copy update are not substitutes for a penetration-test report, measured recovery or production vendor/account evidence. Confirm exact approved claims and live deployment after normal review.
