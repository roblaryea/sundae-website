# Confirmed symbol restoration and alignment

Application source: `26fe93d` on [PR256](https://github.com/roblaryea/sundae-website/pull/256), based on published `80b81c788a9453ba4cc21bdf851f0cd61db82ebe`. Initial restoration source `e22fb5c` is followed by the finite visible-artwork alignment correction requested by Robert. The source author does not merge or deploy; the existing SEO/GEO owner independently reviews and publishes.

## Direct owner instruction and correction

On 19 November Robert explicitly identified the missing logo as “the gradient S and cherry”, then requested that it be in line with the wordmark in the header. The 18 November cleanup had interpreted a request to replace wrong branding as a universal wordmark-only identity. That interpretation was too broad and is superseded by this direct confirmation.

The exact master comes from the July release `d926935d78d330f9cec98dc5d4d081355a2175fd`, `public/logos/sundae-mark.svg`, SHA-256 `dff75ed182b38965d4b4c066f41152b66e1c525b92d4aac40e458a0d1909ee05`. Both approved Fraunces PNG wordmarks remain unchanged. The original released 512px symbol PNG, 180px Apple icon and RGBA favicon are also retained byte-for-byte; their hashes and provenance are in `src/lib/brandAssetManifest.json`.

## Resulting behavior

- The shared header, mobile drawer, footer, booking and sign-in signature pairs the confirmed symbol with the original wordmark. The signature itself remains left-to-right inside right-to-left pages.
- The brand guide explicitly approves that combination, provides original symbol SVG/PNG downloads and both wordmark downloads, and supplies a four-original ZIP. The historical archive records the earlier overbroad classification and points to the corrected active identity.
- Favicons, manifest icons and saved-contact fallback use the confirmed symbol. Legacy symbol URLs resolve to the restored master or corresponding symbol icon. Old blue branding and reconstructed wordmarks remain excluded. Four retired banner URLs remain 404.
- Native profile headers and their decorative panel, diagnostic identities and existing main/profile share images use the restored identity. Portraits, personal details, booking/contact functions and historical product evidence remain intact.
- Existing positioning, commercial behavior, pricing handoff, language/theme behavior and premium espresso/cream design are preserved.

## Alignment verification

Centering file canvases undersized the visible S. The symbol's colored artwork occupies approximately y25..463 of its 512px tile; the wordmark lettering occupies y12..107 of its 120px canvas. The final display uses a 1.5em symbol, a +0.0285em vertical adjustment, the unchanged 6.4em by 1.6em wordmark and a -0.6em leading margin accounting for transparent padding. No source pixels, vector geometry or lettering are cropped, recolored or redrawn.

Built desktop dark/light header and footer measurements align the derived visible-artwork centers within 0.01px, with under 0.5px difference in visible height at chrome sizes. These are geometric checks using verified artwork bounds; visual inspection also confirms the pairing. The same ratios are used in pricing. Mobile English and Arabic have no horizontal document overflow.

The initial 1.2em presentation was not accepted as the final alignment result. The archived pre-correction source remains in git; final evidence below is from the rebuilt `26fe93d` application, not temporary browser styling used for comparison.

## Validation receipts

| Check | Result | Evidence |
| --- | --- | --- |
| Production build, localization/positioning gates | Passed on aligned source | `data/build.log` |
| Runtime boundary and audit | 106 traces; 50 packages; zero advisories | `data/build.log` |
| SEO suite | 222 passed | `data/seo.log` |
| Lint | Passed; final hosted checks also green | `data/lint.log`, PR256 |
| Original assets, ZIP, aliases, contact fallback, ICO | 7 focused cases passed | `data/approved-brand.log` |
| Existing profile suite | 64 passed | `data/profile.log` |
| Production booking brand fixture | 2 cases passed, desktop/mobile, five public/unavailable routes and both themes | `data/booking.log` |
| Built HTTP/hash/redirect receivers | 55 passed | `data/http-readback.json` |
| Header/footer geometric alignment | Passed in dark/light desktop and mobile checks | `data/alignment-desktop.log` |
| Brand guide | 390px and 1440px, dark/light; no clipping or document overflow | `data/brand-guide-receivers.log` |
| Arabic / diagnostic | 390px RTL page with LTR signature; no overflow | `data/rtl-report-final.log` |

The booking run used the existing local fixture and sent no real booking/email. Diagnostic evidence is the unavailable-link state; no signed customer report was generated or fetched. The only local browser errors were the expected unavailable Vercel analytics script and MIME refusal. The source author has not claimed production publication from these local receivers.

## Representative images

`evidence/` contains final built Home/header views at 1440px and 390px in dark/light themes, both mobile drawer themes, dark/light desktop footer, four brand-guide theme/device views, Arabic mobile Home and diagnostic, native profile mobile themes and desktop dark, and existing production-booking fixture views. `data/visual-inventory.json` binds filenames to source and hashes. The two regenerated 1200x630 share images were separately inspected in their committed public source paths.

The original square PNG/ICO assets retain their released opaque corner matte. Web signatures and download master use the original SVG. The original source files are preserved, rather than silently editing their corners.

## Independent release lanes

The existing SEO/GEO owner has independently accepted the application source and finite alignment correction, with relevant built theme/device/RTL views. Pricing restoration is separately authored in PR68 with the same confirmed originals and alignment ratios. Marketing registry clarification PR118 records the direct owner instruction and preserves the wordmark-only art direction of already approved campaign graphics. Only the designated owners publish and verify their releases.
