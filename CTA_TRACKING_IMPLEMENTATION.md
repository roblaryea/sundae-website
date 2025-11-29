# CTA Tracking Implementation Guide

## Overview

This document describes the CTA (Call-to-Action) tracking system implemented for the Sundae marketing website using Google Analytics 4 (GA4).

## Implementation Date
November 29, 2025

## What Was Implemented

### 1. Core Tracking Module (`src/lib/cta.ts`)

Created a centralized tracking utility that:
- Provides a simple `useCta()` hook for client components
- Automatically tracks CTA clicks with GA4 events
- Handles navigation after tracking
- Supports custom event parameters for detailed analytics
- Works seamlessly with Next.js routing

**Key Features:**
- Type-safe TypeScript implementation
- Automatic GA4 event firing
- Client-side navigation with Next.js router
- Optional metadata for detailed tracking

### 2. GA4 Integration (`src/app/layout.tsx`)

Added Google Analytics 4 scripts to the root layout:
- Uses Next.js Script component for optimal loading
- Reads GA4 Measurement ID from environment variable
- Includes both gtag.js script and initialization
- Uses `afterInteractive` strategy for performance

### 3. Updated Components

#### Homepage (`src/app/page.tsx`)
- **Hero Section CTAs:**
  - "Get Sundae Report (Free)" → tracks as `get_report_hero`
  - "See How 4D Intelligence Works" → tracks as `learn_4d_hero`
- **4D Intelligence Section:**
  - "Explore the 4D Intelligence Model" → tracks as `explore_4d_model`
- **Core Products Section:**
  - Each product card click → tracks as `view_sundae_report`, `view_sundae_nexus`, etc.
- **Watchtower Section:**
  - "Learn More About Watchtower" → tracks as `learn_watchtower`
- **Footer CTA Section:**
  - "Book a Demo" → tracks as `book_demo_footer_cta`
  - "Explore Plans & Pricing" → tracks as `view_pricing_footer_cta`
  - "Get your free benchmark report" → tracks as `get_report_footer_link`

#### Navbar (`src/components/Navbar.tsx`)
- **Desktop Navigation:**
  - "Sign In" button → tracks as `sign_in_navbar`
  - "Book Demo" button → tracks as `book_demo_navbar`
- **Mobile Navigation:**
  - "Sign In" button → tracks as `sign_in_mobile_nav`
  - "Book Demo" button → tracks as `book_demo_mobile_nav`

#### Footer (`src/components/Footer.tsx`)
- **Resources Section:**
  - "Free Tools & Calculators" link → tracks as `view_tools_footer`

## How It Works

### Event Tracking Flow

1. User clicks a tracked CTA button/link
2. `cta()` function is called with:
   - `url`: destination URL
   - `eventName`: unique identifier for the CTA
   - `metadata`: optional additional context
3. GA4 event is fired with:
   - Event name: `cta_click`
   - Parameters: `cta_name`, `destination`, and custom metadata
4. Navigation occurs after event is tracked

### Example Usage

```typescript
import { useCta } from '@/lib/cta';

export default function MyComponent() {
  const cta = useCta();
  
  return (
    <Button 
      onClick={() => cta(
        "/demo",                    // destination URL
        "book_demo_hero",           // event name
        { page: "/home", section: "hero" }  // metadata (optional)
      )}
    >
      Book a Demo
    </Button>
  );
}
```

## Setup Instructions

### 1. Environment Configuration

1. Copy the template file:
   ```bash
   cp .env.local.template .env.local
   ```

2. Add your GA4 Measurement ID to `.env.local`:
   ```
   NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
   ```

3. Find your Measurement ID in Google Analytics:
   - Go to Admin → Data Streams
   - Select your web stream
   - Copy the Measurement ID (starts with "G-")

### 2. Verify Implementation

After adding your GA4 ID:

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open browser DevTools → Console
3. Click any tracked CTA
4. You should see: `CTA tracked: [event_name]`

5. Check GA4 Real-Time reports:
   - Go to Google Analytics
   - Reports → Real-time
   - You should see events appearing as you click CTAs

## GA4 Event Structure

### Event Name
All CTA clicks fire a single event type: `cta_click`

### Event Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `cta_name` | string | Unique identifier for the CTA | `book_demo_hero` |
| `destination` | string | URL where the CTA leads | `/demo` |
| `page` | string | Page where CTA was clicked (optional) | `/home` |
| `section` | string | Section of page (optional) | `hero` |
| `location` | string | Component location (optional) | `navbar` |

### Custom Dimensions in GA4

To make full use of this data, configure custom dimensions in GA4:

1. Go to Admin → Custom definitions → Custom dimensions
2. Create these dimensions:
   - `cta_name` (event parameter: `cta_name`)
   - `cta_destination` (event parameter: `destination`)
   - `cta_page` (event parameter: `page`)
   - `cta_section` (event parameter: `section`)
   - `cta_location` (event parameter: `location`)

## Adding Tracking to New CTAs

### For Client Components

```typescript
'use client';

import { useCta } from '@/lib/cta';

export default function MyPage() {
  const cta = useCta();
  
  return (
    <button onClick={() => cta("/pricing", "view_pricing_my_page")}>
      View Pricing
    </button>
  );
}
```

### Converting Link to Tracked Button

Before:
```tsx
<Link href="/demo">
  <Button>Book Demo</Button>
</Link>
```

After:
```tsx
<Button onClick={() => cta("/demo", "book_demo_hero")}>
  Book Demo
</Button>
```

### With Additional Metadata

```tsx
<Button 
  onClick={() => cta(
    "/demo", 
    "book_demo_pricing", 
    { 
      page: "/pricing",
      plan: "enterprise",
      section: "comparison-table"
    }
  )}
>
  Book Demo
</Button>
```

## CTA Naming Conventions

Follow these patterns for consistency:

| Action | Pattern | Example |
|--------|---------|---------|
| View/Navigate | `view_[destination]_[location]` | `view_pricing_hero` |
| Book Demo | `book_demo_[location]` | `book_demo_navbar` |
| Sign In | `sign_in_[location]` | `sign_in_navbar` |
| Get Report | `get_report_[location]` | `get_report_hero` |
| Learn More | `learn_[product]_[location]` | `learn_watchtower` |
| Product Views | `view_[product_name]` | `view_sundae_nexus` |

## Analytics Reports You Can Build

With this tracking in place, you can create reports in GA4 for:

1. **Top Performing CTAs**
   - Which CTAs get the most clicks?
   - Compare performance across pages

2. **Conversion Funnels**
   - Track user journey from homepage → demo request
   - Identify drop-off points

3. **CTA Placement Analysis**
   - Hero vs footer vs navbar performance
   - Mobile vs desktop CTA effectiveness

4. **Page-Specific Performance**
   - Which pages drive the most demo requests?
   - Which products get the most interest?

5. **A/B Testing Support**
   - Compare different CTA copy
   - Test CTA placement variations

## Current Tracked CTAs

### Homepage
- `get_report_hero` - Hero CTA for Sundae Report
- `learn_4d_hero` - Hero CTA for 4D Intelligence
- `explore_4d_model` - 4D Intelligence section CTA
- `view_sundae_report` - Core products: Sundae Report
- `view_sundae_nexus` - Core products: Sundae Nexus
- `view_sundae_insights` - Core products: Sundae Insights
- `view_sundae_canvas` - Core products: Sundae Canvas
- `learn_watchtower` - Watchtower section CTA
- `book_demo_footer_cta` - Footer section demo button
- `view_pricing_footer_cta` - Footer section pricing button
- `get_report_footer_link` - Footer section report link

### Navigation
- `sign_in_navbar` - Desktop nav sign in
- `book_demo_navbar` - Desktop nav demo button
- `sign_in_mobile_nav` - Mobile nav sign in
- `book_demo_mobile_nav` - Mobile nav demo button

### Footer
- `view_tools_footer` - Footer tools link

## Next Steps

### Recommended Additions

1. **Pricing Page:**
   - Track plan selection CTAs
   - Track "Get Started" buttons for each tier

2. **Tools Page:**
   - Track calculator usage
   - Track tool CTA conversions

3. **Product Pages:**
   - Track "Try Now" or "Learn More" CTAs
   - Track demo requests from product pages

4. **Blog:**
   - Track CTA clicks in blog posts
   - Track newsletter signups

5. **Resources:**
   - Track case study downloads
   - Track resource CTA clicks

### Implementation Pattern

For each new page/component:
1. Make the component a client component (`'use client'`)
2. Import `useCta` hook
3. Replace `<Link>` with `onClick={() => cta(...)}`
4. Use consistent naming conventions
5. Add relevant metadata

## Troubleshooting

### Events Not Appearing in GA4

1. **Check Environment Variable:**
   ```bash
   echo $NEXT_PUBLIC_GA4_ID
   ```
   Should output your GA4 measurement ID

2. **Check Browser Console:**
   - Should see "CTA tracked: [name]" messages
   - No errors about gtag being undefined

3. **Check GA4 Real-Time:**
   - May take 1-2 seconds to appear
   - Check "Events" section in Real-Time report

4. **Ad Blockers:**
   - Disable ad blockers for testing
   - Use browser incognito mode

### Common Issues

**Issue:** `gtag is not defined`
- **Solution:** Ensure GA4 scripts are loaded in layout.tsx
- Check that `NEXT_PUBLIC_GA4_ID` is set

**Issue:** Events not firing
- **Solution:** Verify component is client component (`'use client'`)
- Check that `useCta()` is called inside component

**Issue:** Navigation not working
- **Solution:** Ensure correct URL path is passed
- Check browser console for errors

## Files Modified

- ✅ `src/lib/cta.ts` - Created tracking module
- ✅ `src/app/layout.tsx` - Added GA4 scripts
- ✅ `src/app/page.tsx` - Updated homepage CTAs
- ✅ `src/components/Navbar.tsx` - Updated navigation CTAs
- ✅ `src/components/Footer.tsx` - Updated footer CTAs
- ✅ `.env.local.template` - Created environment template
- ✅ `CTA_TRACKING_IMPLEMENTATION.md` - This documentation

## Maintenance Notes

- **GA4 Property:** Ensure you have proper access to the GA4 property
- **Testing:** Test CTAs in staging before deploying to production
- **Naming:** Keep CTA names consistent and descriptive
- **Documentation:** Update this file when adding new tracked CTAs

## Support

For questions or issues:
1. Check this documentation first
2. Review GA4 documentation: https://developers.google.com/analytics/devguides/collection/ga4
3. Check browser console for errors
4. Verify environment configuration

---

**Last Updated:** November 29, 2025
**Version:** 1.0.0
