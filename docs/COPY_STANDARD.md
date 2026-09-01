# Sundae Website — Copy Standard

> The register is **operator-tight and professional**: digestible language a
> multi-location operator would use, not technical or abstract writing. If a
> line would sound odd said aloud to a general manager on a Tuesday, it is
> wrong for this site — however accurate it is.

## The test

Read the sentence aloud. If the reader cannot picture the thing, rewrite it.

| Instead of | Write |
|---|---|
| decision substrate, workforce substrate | one place to decide from · runs the people side |
| the baseline is frozen | the before number is locked |
| directional rather than causal | we can show by how much, but not yet say the work caused it |
| abstains instead of inferring | says so rather than guessing |
| canonical HR domain contract, compliant adapter | the HR system you already run |
| topology audience picker | target by brand, region or site |
| seamless, robust, holistic, leverage, frictionless | (delete — say the thing) |

## Rules

1. **Concrete nouns beat abstract ones.** "Voids, comps and discounts" not "revenue leakage vectors". Name the item doing the damage.
2. **One idea per sentence.** Body copy over ~35 words is a rewrite, not a style choice. Feature lists may run long if every clause is concrete.
3. **No nominalisation stacks.** Three or more `-tion / -ment / -ance / -ility` words in a sentence means it has been written in the abstract.
4. **Internal architecture vocabulary stays internal.** Substrate, canonical, topology, provenance, orchestration, entitlement — these are how the system is built, not how it is sold.
5. **Register follows the reader.** The Technology & Data solution card and `/integrations` may say RBAC, schema, normalisation and webhooks — that is the right language for that audience. Everywhere else, plain.
6. **Numbers are claims.** Anything quantified needs an entry in [`claims-bank.md`](./claims-bank.md) before it ships. See that file for the standing rule.

## Checks

`npm run qa:page-copy` catches placeholder and human-touch flags. The register
itself is not automatable — it is caught by reading the rendered page, which is
also where line-break and density problems become visible.

Related: [COLOR_SYSTEM.md](./COLOR_SYSTEM.md) (coral is rationed; eyebrows are
never coral), [claims-bank.md](./redesign/claims-bank.md).
