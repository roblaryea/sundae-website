# Link Check Report

**Base URL:** http://localhost:3000  
**Date:** 2026-02-20T00:11:53.008Z  

## Summary

| Metric | Count |
|---|---|
| Routes on disk | 53 |
| Routes referenced in code | 48 |
| **Missing routes (likely 404)** | **2** |
| Unreferenced routes (orphans) | 5 |
| Live probes total | 59 |
| Live probes OK | 1 |
| Live probes broken | 1 |
| Live probes redirected | 0 |
| Live probes auth-walled | 57 |

## Missing Routes (referenced in code but NO page on disk)

These will return **404** in production.

| Route | Referenced In |
|---|---|
| `/dashboard` | `src/app/sign-in/page.tsx` |
| `/forgot-password` | `src/app/sign-in/page.tsx` |

## Broken Pages (HTTP >= 400 from live probe)

| Route | Status |
|---|---|
| `/forgot-password` | 404 |

## Configured Redirects (next.config.ts)

| Source | Destination |
|---|---|
| `/signin` | `/sign-in` |
| `/product/sundae-report` | `/report` |

## Unreferenced Routes (page exists but no internal link)

These pages exist but aren't linked from any navigation or content.

- `/4d-intelligence`
- `/pricing`
- `/product/canvas`
- `/product/forge`
- `/why-sundae`

## All Disk Routes (53)

- `/`
- `/4d-intelligence`
- `/about`
- `/architecture`
- `/benchmarking`
- `/blog`
- `/canvas`
- `/careers`
- `/chat-with-data`
- `/contact`
- `/core`
- `/demo`
- `/docs`
- `/faq`
- `/getting-started`
- `/insights`
- `/integrations`
- `/modules`
- `/nexus`
- `/pricing`
- `/privacy`
- `/product`
- `/product/canvas`
- `/product/forge`
- `/product/pulse`
- `/product/scout`
- `/product/sundae-report`
- `/product/watchtower`
- `/report`
- `/report-vs-core`
- `/resources`
- `/security`
- `/sign-in`
- `/signin`
- `/solutions/c-suite-executives`
- `/solutions/cloud-kitchens`
- `/solutions/finance-teams`
- `/solutions/franchises`
- `/solutions/hospitality-operators`
- `/solutions/hr-teams`
- `/solutions/marketing-teams`
- `/solutions/multi-location-groups`
- `/solutions/regional-managers`
- `/solutions/technology-teams`
- `/terms`
- `/tools`
- `/tools/benchmark-readiness`
- `/tools/breakeven-covers`
- `/tools/labor-analyzer`
- `/tools/labor-cost`
- `/tools/menu-margin`
- `/tools/multi-location-uplift`
- `/why-sundae`

