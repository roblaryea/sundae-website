# Sundae — Product Overview

> Last refreshed: 2026-02-18 | Source: codebase inspection of `sundae-app` and `sundae-backend`

---

## What Is Sundae?

Sundae is a **Decision Intelligence platform** for restaurant and hospitality operators. 
It ingests internal operational data (POS, labor, inventory, finance) and external signals (benchmarks, delivery aggregators, footfall, weather, pricing, reviews, currency, competitor activity, events), transforming fragmented information into real-time decision views, AI-powered analysis, operational monitoring (Pulse), and conversational access (via Sundae Intelligence).

## Tech Stack (customer-relevant)

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router), React 19, Tailwind CSS 4, Radix UI |
| Backend | AdonisJS 6, TypeScript, PostgreSQL (Neon-compatible) |
| AI | Anthropic Claude, OpenAI (via Vercel AI SDK) |
| Hosting | Render.io (backend), Vercel-compatible (frontend) |

## Core Product Pillars

### 1. Pulse — Real-Time Operations Center
Live intraday monitoring for sales, labor, leakage, service speed, stockouts, and menu intelligence. Includes AI coaching, exception management, scorecards, goals, playbooks, wallboard mode, and a multi-outlet portfolio leaderboard.

### 2. Benchmarks — Competitive Intelligence
Performance comparison against configurable competitive sets ("compsets"). Includes index scoring, trend analysis, revenue/cover forecasting with confidence intervals, and market-level intelligence.

### 3. Watchtower — External Signal Monitoring
Tracks competitor activity (ratings, reviews, menu pricing), weather with predicted revenue impact, local events (holidays, sports, seasonal), and generates AI-powered briefings (daily, weekly, event prep, Ramadan).

### 4. Insights — Intelligence Modules
Analytical dashboards for deep-diving into specific operational domains. Performance Report is live; additional modules (Revenue, Labor, Inventory, Purchasing, Marketing, Reservations, Profit, Revenue Assurance, Delivery, Economic, Guest Experience, Accounting, Guest CRM) are coming soon.

### 5. Sundae Intelligence — AI-Powered Analytics
Natural-language querying of restaurant data. Available via the web app and through Telegram, Slack, and Microsoft Teams bots. Supports conversation history, folders, scheduled queries, multi-outlet scope selection, and link-code sharing.

### 6. Integrations Hub — 11-Domain Data Ingestion
A vendor-agnostic integration engine supporting POS, Labor, Service Flow, Inventory, Purchasing, Reservations, Delivery, Marketing, Guest Experience, Guest CRM, and Accounting. Each domain supports webhook-based custom integrations.

### 7. Crew — Organization & Team Management
Multi-organization, multi-restaurant hierarchy management. Includes departments, job roles, teams, member profiles, org charts, role-based access control (RBAC), and an invitation system.

### 8. Billing & Pricing
Tiered subscription plans with module-based and per-restaurant pricing. Supports add-ons, AI credit wallets, promo codes, and self-serve checkout.

## Target Audience

- **Multi-unit restaurant operators** (regional and enterprise)
- **Restaurant group CFOs and COOs** tracking financial and operational KPIs
- **General managers** monitoring day-to-day performance
- **Operations teams** using real-time alerts and coaching tools

## Multi-Tenant Architecture

- Organizations are the top-level tenant boundary
- Each organization can manage multiple restaurants (outlets)
- Users belong to organizations via memberships with role-based permissions
- Fine-grained permission system: `pulse:view`, `dashboards:view`, `integrations:view`, `ai:use`, `org:settings`, `restaurants:view`, `users:view`, `roles:manage`, `billing:view`, etc.

## Authentication & Access

- Email/password registration with email verification
- Organization invite system (link-based)
- Bearer token authentication (session-based)
- API key authentication for public API (prefix: `sun_`)
- Permission-gated UI via `<RequirePermission>` component

## Notification System

Multi-channel notification engine supporting:
- **In-app** notifications
- **Email** (Mailgun in production)
- **Telegram**, **Slack**, **Microsoft Teams** bot messaging
- Per-user notification preferences
- Event registry with categorized event types (Auth, Social, Org, Onboarding, Data Health, Pulse alerts)

## Demo & Sandbox

- `NEXT_PUBLIC_PULSE_DEMO` environment flag enables demo data generation for Pulse
- URL parameter `?demo=1` toggles demo mode with presets: `behind_pace`, `on_track`, `discount_spike`, `pre_service`
- Integration catalog includes "Demo Data" entries for each domain to allow testing without live vendor connections
- `NEXT_PUBLIC_DEMO_PREVIEW` toggle for dev-only demo preview mode
