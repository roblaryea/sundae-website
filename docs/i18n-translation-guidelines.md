# I18n Translation Guidelines

These rules apply to every website translation update, whether copy is edited by hand or generated from a translation workflow.

## Required Language Surface

The marketing website must maintain copy coverage for all supported website locales:

`en`, `ar`, `fr`, `es`, `de`, `nl`, `pt`, `hi`, `ur`, `it`, `pl`, `tr`, `zh-Hans`, `ja`, `ko`, `id`, `vi`, `ro`, `sv`, `bn`, `th`, `ms`.

English is the source catalog. All other locales must be complete locale packs, not structural shells.

## Source Of Truth

Generated translation files must come from repository source catalogs and repository-owned generation workflows. Do not commit packs that identify temporary generators such as `/tmp/generate_*`, quota-limited partial generation, or fallback engines.

If an external translation model is used during a future workflow, the generated output must still pass the repository guardrails before commit. Model output is draft copy; the repo QA gates are the acceptance boundary.

## Non-Translatable Glossary

Keep these product, brand, system, and acronym terms exactly as written:

- `Sundae`
- `Sundae Report`
- `Sundae Core`
- `Sundae Crew`
- `Pulse`
- `Watchtower`
- `Foresight`
- `Scout`
- `Canvas`
- `Cross-Intelligence`
- `Report Lite`
- `Report Plus`
- `Report Pro`
- `Core Lite`
- `Core Pro`
- `Toast`
- `Square`
- `Lightspeed`
- `RevPASH`
- `EBITDA`
- `CapEx`
- `POS`
- `P&L`

These terms should be integrated naturally into the translated sentence, not appended as awkward parenthetical fixes.

## Structural Fields

Never translate structural values. Copy these from English:

- `id`
- `key`
- `slug`
- `href`
- `url`
- `src`
- `path`
- `ctaLink`
- `link`
- `product`
- `icon`
- `iconName`
- `color`
- `gradient`
- `className`
- `variant`
- `type`

Runtime merging also protects these fields in `src/lib/generatedLocalCopy.ts`.

## Quality Rules

Translations must read as market-ready customer copy, not literal machine output. Avoid word-for-word phrases such as Dutch `Puls` for the product `Pulse`, Dutch `groepswandeling` for walkthrough/demo, Spanish `puntos de referencia` when product context expects benchmarks, and Arabic translations of `Sundae` as a dessert/common noun.

## Required Checks

Run these before committing or deploying translation updates:

```bash
npm run qa:i18n
npm run qa:translation
npm run lint
npm run build
```

`npm run build` runs the i18n and translation gates through `prebuild`, so bad translation packs fail before production compilation.
