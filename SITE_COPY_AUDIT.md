# SITE COPY AUDIT — Sundae Marketing Site

**Audit Date:** January 2, 2026  
**Scope:** All marketing pages in `src/app/**/page.tsx` + navigation/footer components  
**Focus:** Consistency, clarity, conversion, accuracy, professional tone

---

## Executive Summary: Top 10 Highest-Impact Changes

### P0 (Critical — Fix Immediately)
1. **Labor vs Labour Spelling** — Mixed British/American English throughout site (homepage uses "labour", nav uses "labor")
2. **CTA Inconsistency** — 8+ variations of demo CTA ("Book a Demo", "Book Demo", "See Sundae in Action", "Schedule Demo", etc.)
3. **Product Name Confusion** — "Sundae Canvas" vs "Canvas" vs "Canvas Engine" used interchangeably
4. **Architecture Module Names** — Inconsistent capitalization and descriptions (Scout, Pulse, Forge, Canvas Engine, Watchtower)

### P1 (High Priority — Fix in Next Release)
5. **Value Prop Vagueness** — Phrases like "clarity you can feel" and "truth of your business" lack specificity
6. **Repetitive "Intelligence" Overuse** — "Decision Intelligence", "Restaurant Intelligence", "Intelligence Layer", "Intelligence Engine" used 50+ times
7. **Inconsistent Terminology** — "operators" vs "restaurant groups" vs "hospitality operators" vs "restaurants"
8. **Sign In vs Sign-In** — Inconsistent hyphenation in CTAs and page titles
9. **Testimonial Attribution** — Anonymous quotes ("name confidential") undermine credibility
10. **4D Intelligence Explanation** — Concept appears without consistent definition across pages

---

## Global Issues & Site-Wide Patterns

### 1. **Spelling & Localization**
**Problem:** Mixed British and American English creates unprofessional impression.

**Examples:**
- Homepage: "labour variance", "labour, COGS" (British)
- Navbar descriptions: "Sales per Labor Hour" (American)
- About page: Mixed usage

**Impact:** Confuses brand voice; suggests lack of attention to detail

**Recommendation:** **Adopt American English globally** (labor, analyze, optimize) as primary audience is North America + international SaaS standard.

---

### 2. **CTA Chaos**
**Problem:** 8+ different CTA phrasings for the same action.

**Current Variations:**
- "Book a Demo"
- "Book Demo"  
- "See Sundae in Action"
- "Schedule Demo"
- "Schedule Cloud Kitchen Demo"
- "Get a Demo"
- "Request a Demo"
- "Book Your Demo"

**Recommendation:** Standardize to:
- **Primary CTA:** "Book a Demo" (most common, clear intent)
- **Secondary CTA:** "See Sundae in Action" (reserved for video/walkthrough contexts only)
- **Never use:** "Get a Demo", "Request a Demo", "Schedule Demo"

---

### 3. **Product/Module Naming Confusion**
**Problem:** Inconsistent naming damages product architecture understanding.

**Issues:**
| What It Is | Incorrect Variations | Correct Name |
|------------|---------------------|--------------|
| Core product | "Sundae Canvas", "Canvas", "Canvas product" | **Sundae Canvas** (when referencing as product) |
| Architecture module | "Canvas", "Canvas Engine" | **Canvas Engine** (when referencing tech stack) |
| All modules | Inconsistent capitalization | Always: Scout, Pulse, Forge, Canvas Engine, Watchtower |

**Recommendation:** Create clear naming convention:
- **Core Products:** Sundae Report, Sundae Nexus, Sundae Insights, Sundae Canvas (always with "Sundae")
- **Architecture Modules:** Scout, Pulse, Forge, Canvas Engine, Watchtower (standalone, always capitalized)

---

### 4. **"Intelligence" Fatigue**
**Problem:** Word "intelligence" appears 50+ times across homepage alone.

**Examples:**
- "Restaurant Intelligence"
- "Decision Intelligence"  
- "Intelligence Layer"
- "Intelligence Engine"
- "AI-powered intelligence"
- "Intelligence Stack"
- "4D Intelligence"
- "Visualization Intelligence"
- "Market Intelligence"

**Impact:** Dilutes meaning, sounds repetitive and marketing-heavy

**Recommendation:**
- Keep **"Decision Intelligence"** as primary category term
- Replace generic "intelligence" with specific benefits:
  - "Restaurant Intelligence Platform" → "Restaurant Operating System"
  - "Intelligence Layer" → "Data Layer" or "Operating Layer"
  - "Intelligence Engine" → "Analytics Engine"
- Limit "intelligence" to 10-15 strategic uses per page maximum

---

### 5. **Vague Value Props**
**Problem:** Abstract language doesn't communicate concrete benefits.

**Examples:**
- "Clarity you can feel" — What does this mean operationally?
- "Truth of your business, distilled into direction" — Too poetic
- "See every layer. Miss nothing." — Vague
- "Not charts. Not noise. Just the truth" — What's the actual deliverable?

**Recommendation:** Replace with specific, measurable benefits:
- ❌ "Clarity you can feel"  
  ✅ "See exactly which locations underperform—and why—in under 60 seconds"

- ❌ "Truth of your business, distilled into direction"  
  ✅ "Real-time P&L by location with AI-flagged cost anomalies"

- ❌ "See every layer. Miss nothing."  
  ✅ "Unified view of sales, labor, COGS, and inventory—updated hourly"

---

### 6. **Terminology Drift**
**Problem:** Multiple terms for same audience creates confusion.

**Current Terms Used:**
- "Operators"
- "Restaurant operators"
- "Restaurant groups"
- "Hospitality operators"
- "Multi-location restaurants"
- "Multi-brand operators"

**Recommendation:** Standardize:
- **Primary:** "restaurant operators" (when referring to people)
- **Secondary:** "restaurant groups" (when referring to companies with 3+ locations)
- **Specific:** "multi-location operators" (5+ locations)
- **Avoid:** "hospitality operators" (too generic, includes hotels)

---

## Copy Style Guide

### Product Naming Standards

#### Core Products (Always Include "Sundae")
```
✅ Sundae Report — Free benchmarking report
✅ Sundae Nexus — Conversational AI Q&A
✅ Sundae Insights — Contextual intelligence & recommendations  
✅ Sundae Canvas — Unified dashboards
```

#### Architecture Modules (No "Sundae" Prefix)
```
✅ Scout — Data integration layer
✅ Pulse — Anomaly detection engine
✅ Forge — Conversational AI engine
✅ Canvas Engine — Visualization engine (NOT "Canvas" alone)
✅ Watchtower — Market intelligence layer
```

#### Concepts
```
✅ 4D Intelligence Model — (capitalize Model)
✅ Decision Intelligence — (capitalize both words)
❌ "intelligence layer" — use "operating layer" or "data layer"
```

---

### CTA Standards

#### Primary CTAs
```
✅ Book a Demo (default for all demo requests)
✅ Get Started (for free trials, not currently offered)
✅ Contact Sales (for enterprise inquiries)
```

#### Secondary CTAs
```
✅ Explore Products
✅ See Sundae in Action (video/walkthrough only)
✅ Learn More (followed by specific target: "Learn More About Scout")
✅ View Pricing (links to external pricing site)
```

#### Avoid
```
❌ "Get a Demo", "Request Demo", "Schedule Demo"
❌ "See How" (vague)
❌ "Discover" (overused in SaaS)
❌ "Unlock" (clichéd)
```

---

### Capitalization Rules

#### Always Capitalize
- Product names: Sundae Report, Sundae Nexus, Sundae Insights, Sundae Canvas
- Architecture modules: Scout, Pulse, Forge, Canvas Engine, Watchtower
- Concepts: Decision Intelligence, 4D Intelligence Model
- Company references: Sundae (never "sundae" mid-sentence)

#### Never Capitalize (Unless Starting Sentence)
- Generic tech: "artificial intelligence", "machine learning", "data integration"
- Features: "benchmarking", "anomaly detection", "recommendations"
- Roles: "operators", "finance teams", "C-suite executives"

---

### Tone & Voice Guidelines

#### Professional But Conversational
```
✅ "See which locations underperform—and why"
❌ "Behold thy restaurant's divine truth revealed!" (too flowery)
❌ "Data analytics solutions for F&B enterprises" (too corporate/dry)
```

#### Concrete Over Abstract
```
✅ "Reduce labor costs 12-18% in 90 days"
❌ "Optimize your workforce efficiency paradigm" 
```

#### Action-Oriented
```
✅ "Compare your labor cost % against 500+ similar restaurants"
❌ "Benchmarking capabilities facilitate comparative analysis"
```

#### Avoid
- Emoji in body copy (homepage has scattered emoji—remove)
- Exclamation points (max 1 per page, hero section only)
- Questions as headlines (weak, passive voice)
- "Leverage", "utilize", "solution" (corporate jargon)

---

## Page-by-Page Audit Table

### Homepage (`src/app/page.tsx`)

| Section | Current Copy | Issues | Proposed Copy | Priority |
|---------|-------------|---------|---------------|----------|
| **Hero H1** | "The Future of Restaurant Intelligence" | Generic, vague | "Restaurant Decision Intelligence Platform" | P1 |
| **Hero Subhead** | "Clear, contextual, AI-powered visibility into your entire operation — instantly." | Good but wordy | "Real-time visibility into sales, labor, and COGS—powered by AI" | P2 |
| **Hero Badge** | "See Every Layer. Miss Nothing." (with emoji dot) | Vague, has emoji | "Unified Data • Real-Time Intelligence" | P0 |
| **Hero CTA** | "Book a Demo" / "Explore Products" | ✅ Good |  | — |
| **Sub-Hero** | "Your Restaurant, Finally Understandable" | Decent but informal | "One Source of Truth for Your Entire Restaurant" | P1 |
| **Why Sundae Card** | "Clarity You Can Feel" | Extremely vague | "Instant Answers to Operational Questions" | P0 |
| **Why Sundae Card** | "AI-Native From Day One" | Fine | ✅ Keep | — |
| **Why Sundae Card** | "One Platform for the Whole Restaurant" | Fine | ✅ Keep | — |
| **Core Products** | Sundae Report subtitle: "Free benchmarking in minutes" | ✅ Good | — | — |
| **Core Products** | Inconsistent "labour" spelling | P0 issue | Change to "labor" | P0 |
| **4D Section Title** | "The 4D Intelligence Model" | Fine | ✅ Keep | — |
| **4D Descriptions** | Inconsistent terminology | Mix of good/okay | Tighten for clarity | P1 |
| **Trust Section** | "TRUSTED BY MODERN RESTAURANT GROUPS" | Good | ✅ Keep | — |
| **Testimonial** | Anonymous quote ("name confidential") | Undermines credibility | Remove or get permission | P0 |
| **Watchtower Section** | Uses emoji checkmarks in list | Remove emoji | Use "•" bullets | P1 |
| **Final CTA** | "See Sundae in action →" | Lowercase "action" (inconsistent) | "See Sundae in Action →" | P2 |

---

### Navigation (`src/components/Navbar.tsx`)

| Element | Current Copy | Issues | Proposed Copy | Priority |
|---------|-------------|---------|---------------|----------|
| **Product > Sundae Report** | "Benchmarking Engine" | Good | ✅ Keep | — |
| **Product > Sundae Nexus** | "Decision Intelligence Platform" | Overuses "intelligence" | "AI Q&A Platform" | P1 |
| **Product > Sundae Insights** | "AI Insights & Recommendations" | Good | ✅ Keep | — |
| **Product > Sundae Canvas** | "Visualization Intelligence" | Overuses "intelligence" | "Unified Dashboards" | P1 |
| **Solutions > Segments** | "Multi-location Restaurants" | Good | ✅ Keep | — |
| **Solutions > Roles** | "Operations Leaders" vs "C-Suite & Owners" | Inconsistent capitalization | Standardize: "C-Suite and Owners" | P2 |
| **Architecture > Scout** | "Data Integration" | ✅ Perfect | — | — |
| **Architecture > Pulse** | "Anomaly Detection" | ✅ Perfect | — | — |
| **Architecture > Canvas Engine** | "Visualization Engine" | ✅ Good | — | — |
| **Desktop CTA** | "Book Demo" | Missing "a" | "Book a Demo" | P0 |
| **Mobile CTA** | "Book a Demo" | ✅ Correct | — | — |

---

### About Page (`src/app/about/page.tsx`)

| Section | Current Copy | Issues | Proposed Copy | Priority |
|---------|-------------|---------|---------------|----------|
| **Hero H1** | "We're Building the Future of Restaurant Intelligence" | Generic "future of" claim | "Built by Operators. For Operators." | P1 |
| **Mission Statement** | "Turn fragmented data into a single source of truth..." | Good, concrete | ✅ Keep (minor tighten) | — |
| **Vision Section** | "1M+ Crew Members, 10K+ Restaurants, 50+ Countries" | Aspirational metrics without context | Add "(Target by 2028)" or remove | P1 |
| **Team Bullets** | Mixed tone—some bullet points too informal | "Track record: 3 product lines launched, all profitable..." sounds like LinkedIn | Formalize slightly | P2 |
| **Timeline** | Multiple "2025" and "2026" entries | Timeline jumps into future without clarity | Mark future milestones clearly | P1 |
| **Values** | "Data Intelligence First" | Vague | "Unified Data Powers Better Decisions" | P1 |

---

### Contact Page (`src/app/contact/page.tsx`)

| Section | Current Copy | Issues | Proposed Copy | Priority |
|---------|-------------|---------|---------------|----------|
| **Response Time** | "Within 2 hours during business hours" | Good specificity | ✅ Keep | — |
| **Quick Links** | "View Pricing →" | ✅ Good | — | — |

---

### Demo Page (`src/app/demo/page.tsx`)

| Section | Current Copy | Issues | Proposed Copy | Priority |
|---------|-------------|---------|---------------|----------|
| **Hero Badge** | "Personalized Demo" with emoji | Has emoji | "Personalized Demo" (remove emoji) | P1 |
| **What to Expect** | "All 6 AI modules" | Product docs say 5 modules (Scout, Pulse, Forge, Canvas Engine, Watchtower) | "All 5 architecture modules" | P0 |

---

### Product: Sundae Report (`src/app/product/sundae-report/page.tsx`)

| Section | Current Copy | Issues | Proposed Copy | Priority |
|---------|-------------|---------|---------------|----------|
| **Hero Badge** | Has emoji (📈) | Remove | Just text: "Free Restaurant Benchmarking" | P1 |
| **Benchmark Categories** | "Labor Efficiency" (American) vs homepage "labour" (British) | Inconsistent | Standardize to "Labor" | P0 |

---

### Solutions: Cloud Kitchens (`src/app/solutions/cloud-kitchens/page.tsx`)

| Section | Current Copy | Issues | Proposed Copy | Priority |
|---------|-------------|---------|---------------|----------|
| **Hero Badge** | Has emoji (🏢) | Remove | "Cloud Kitchen Solutions" | P1 |
| **Hero H1** | "Multi-Brand. One Kitchen." (with gradient on "One Kitchen") | Fine | ✅ Keep | — |

---

## Requires Product Clarification

These items need internal stakeholder confirmation before changing:

1. **Architecture Module Count**
   - Demo page says "6 AI modules"
   - Navbar and docs show 5 (Scout, Pulse, Forge, Canvas Engine, Watchtower)
   - **Question:** Is there a 6th module? Or is this an error?

2. **4D Intelligence Definitions**
   - 1D, 2D, 3D, 4D explained on homepage
   - Not explained consistently elsewhere
   - **Question:** Should this appear on every page? Or just homepage + /4d-intelligence page?

3. **Testimonial Policy**
   - Homepage has anonymous testimonial ("name confidential")
   - Other testimonials have full names
   - **Question:** Can we get permission for real names? Or remove anonymous ones?

4. **Future Timeline Claims**
   - About page timeline includes 2026 milestones presented as facts
   - **Question:** Should these be marked "Target" or "Goal"?

5. **Labor vs Labour**
   - Currently mixed
   - **Question:** Confirm American English as standard (recommended)

---

## Implementation Plan

### Phase 1: Quick Wins (Safe Global Replacements)
**Time:** 2-3 hours  
**Risk:** Low

```bash
# Find/Replace Operations (Case-Sensitive)
labour → labor
"Book Demo" → "Book a Demo"
"See Sundae in action" → "See Sundae in Action"
"Sign in" → "Sign In" (when used as proper noun/CTA)
"intelligence layer" → "operating layer"
"intelligence engine" → "analytics engine"
```

**Files to Update:**
- All pages in `src/app/**/page.tsx`
- Navigation: `src/components/Navbar.tsx`
- Footer: `src/components/Footer.tsx`

---

### Phase 2: Per-Page Rewrites (Higher-Touch Edits)
**Time:** 1-2 days  
**Risk:** Medium (requires review)

#### Homepage (`src/app/page.tsx`)
- [ ] Rewrite hero badge: Remove emoji, tighten copy
- [ ] Replace "Clarity You Can Feel" card
- [ ] Reduce "intelligence" usage from 50+ to ~15 instances
- [ ] Remove/replace anonymous testimonial
- [ ] Standardize all CTAs

#### About Page (`src/app/about/page.tsx`)
- [ ] Clarify future vs. current timeline items
- [ ] Remove aspirational metrics or add context
- [ ] Tighten team bullet points

#### Demo Page (`src/app/demo/page.tsx`)
- [ ] Fix "6 AI modules" → "5 architecture modules"
- [ ] Remove emoji from badge

#### Product Pages (`src/app/product/**`)
- [ ] Standardize all emoji removal
- [ ] Ensure "Sundae [Product]" naming in titles
- [ ] Ensure "Canvas Engine" not just "Canvas"

#### Solution Pages (`src/app/solutions/**`)
- [ ] Remove emoji badges
- [ ] Standardize audience terminology
- [ ] Ensure CTA consistency

---

### Phase 3: Content Extraction (Prevent Future Drift)
**Time:** 4-6 hours  
**Risk:** Low (refactor only)

**Goal:** Extract reused copy into shared constants file

**Create:** `src/lib/copy.ts`

```typescript
// Recommended structure
export const COPY = {
  products: {
    report: {
      name: "Sundae Report",
      tagline: "Free benchmarking in minutes",
      description: "See exactly where you stand. Upload your data and get instant comparisons..."
    },
    nexus: {
      name: "Sundae Nexus",
      tagline: "AI Q&A Platform",
      description: "Skip the spreadsheets. Ask questions like 'Which locations grew fastest last weekend?'..."
    },
    // ... etc
  },
  ctas: {
    primary: "Book a Demo",
    secondary: "See Sundae in Action",
    pricing: "View Pricing",
    // ... etc
  },
  architecture: {
    scout: {
      name: "Scout",
      description: "Data Integration",
      longDescription: "Plug in POS, workforce, inventory, and external data. Scout cleans and unifies it behind the scenes."
    },
    // ... etc
  }
}
```

**Benefits:**
- Single source of truth
- No drift between pages
- Easy global updates
- Type-safe with TypeScript

---

## Conversion Optimization Notes

### Missing CTAs
Pages without clear next-step CTAs:
- `/blog` — Add "Book a Demo" footer
- `/docs` — Add "Need Help? Contact Sales"
- `/resources` — Add demo CTA

### Form Copy
- Contact form: Good
- Demo form: Could add trust signal ("No credit card required")

### Trust Signals
- Add "SOC 2 Compliant" badge if available
- Add customer logos (currently placeholder chips)
- Remove anonymous testimonials or get real names

---

## Summary of Changes by Priority

### P0 (Fix Immediately) — 6 items
1. Labor vs labour spelling (global find/replace)
2. CTA standardization ("Book a Demo")
3. Remove "6 modules" error on demo page → "5 modules"
4. Fix anonymous testimonial or remove
5. Navbar "Book Demo" → "Book a Demo"
6. "Clarity You Can Feel" → concrete value prop

### P1 (Next Release) — 12 items
7. Reduce "intelligence" overuse (50+ instances → ~15 per page)
8. Remove all emoji from body copy/badges
9. Standardize product naming (Core vs Architecture)
10. Replace vague value props with specific benefits
11. Clarify About page timeline (current vs. future)
12. Standardize audience terminology
13. Navbar descriptions (reduce "intelligence")
14. Capitalize "Action" in "See Sundae in Action"
15. Formalize team bullet points (About page)
16. Add "(Target)" to aspirational metrics
17. "Data Intelligence First" → concrete value
18. Hero badge rewrites (remove emoji, tighten)

### P2 (Future Enhancement) — 8 items
19. Extract copy to `src/lib/copy.ts`
20. Add missing CTAs (blog, docs, resources)
21. Solution page capitalization consistency
22. Form trust signals
23. Replace placeholder customer logos
24. Hero H1 rewrites (homepage, about)
25. Tighten 4D descriptions
26. Add SOC 2 / security badges

---

## Estimated Implementation Time

| Phase | Time | Risk | Owner |
|-------|------|------|-------|
| Phase 1: Quick Wins | 2-3 hours | Low | Dev/Marketing |
| Phase 2: Page Rewrites | 1-2 days | Medium | Marketing + Review |
| Phase 3: Content Extraction | 4-6 hours | Low | Dev |
| **Total** | **2-3 days** | — | — |

---

## Next Steps

1. **Get Stakeholder Approval** on:
   - American English as standard (labor not labour)
   - CTA standardization
   - Product naming conventions

2. **Clarify Product Questions** (see "Requires Product Clarification" section)

3. **Execute Phase 1** (Quick Wins) — Can start immediately

4. **Review & Execute Phase 2** — Requires marketing review

5. **Optional: Execute Phase 3** — Content extraction for long-term maintainability

---

**End of Audit Report**
