# Arabic Home Insights subtitle parity

One source field changes from “أكثر من 30 وحدة تحليلية” to “12 وحدة تحليلية” in src/lib/i18n.ts. This aligns the Arabic Home layer subtitle with English and the standard deep-module definition in the current application source. No other count, locale, route or page wording changes.

The application definition separates 12 standard deep analytics modules from one Hotel F&B concept module and six cross-cutting views. See data/module-count-grounding.json. Counting all top-level Insights routes would conflate these categories.

Requested inventory of older About/architecture count wording is in data/older-count-inventory.json. About has two remaining Arabic module-count discrepancies. The two architecture “30+” phrases refer to integrated systems, not analytics modules, and require their own catalogue check. They are recorded with source and runtime context, without a global numeric replacement.

Validation: production build with all locale/positioning/runtime gates;222SEO tests;scoped lint. Actual Arabic1440dark and390light, plus English1440light, show6rows and the correct Insights subtitle without overflow. English remains unchanged.
