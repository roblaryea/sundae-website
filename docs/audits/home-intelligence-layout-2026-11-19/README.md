# Homepage intelligence layer layout

Removed the decorative Sundae ice-cream glass from the intelligence layers section. It occupied space without proving how the product works. The six existing product destinations, names, explanations, eligibility copy and section heading are unchanged.

The layer list now uses a centered 1152 px maximum width. Labels increase from 15 px to 18 px and subtitles wrap rather than truncate. Descriptions use the stronger supporting-text tone; CTAs adapt to both themes. The four-column layout starts at 1024 px so tablets use the more readable stacked treatment. Section and CTA spacing are tightened. Fixed the existing Ask Sundae icon/accent lookup, which still used its former product name and rendered without its intended background.

Visual thesis: one legible operating story, using the existing colored rails and icons as quiet product identifiers. No new decorative visual replaces the glass. Existing reveal and hover behavior remains.

Validation: production build and all localization/positioning/runtime gates passed. 222 SEO checks and scoped lint passed. Ten rendered cases cover English 320/390/768/1024/1440/1920, desktop/mobile dark and light, Arabic mobile and German320. All six rows remain present, no cropped paragraph or horizontal overflow, no glass image; keyboard Enter opens Pulse. Full-page captures were cropped to the section after triggering the existing reveal animation, avoiding sticky-header overlap in the evidence. See data/browser-checks.json and evidence/.
