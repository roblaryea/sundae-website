# Sundae — Product Overview

> Last refreshed: 2026-05-22 | Source: codebase inspection of `sundae-app`, `sundae-backend`, and marketing pricing catalogs

---

## What Is Sundae?

Sundae is a **Decision Intelligence platform** for restaurant and hospitality operators. It unifies internal operational data, external market signals, workforce operations, and AI support into one operating system for decisions: Performance Reports, Pulse, Benchmark, Watchtower, Insights, Foresight, Sundae Intelligence, Integrations Hub, Crew, and shared support knowledge.

## Tech Stack (customer-relevant)

| Layer | Technology |
|---|---|
| Frontend | Next.js App Router, React 19, Tailwind CSS 4, Radix UI |
| Backend | AdonisJS 6, TypeScript, PostgreSQL (Neon-compatible) |
| AI | SundaeAI (via Vercel AI SDK) |
| Hosting | Render.io (backend), Vercel-compatible (frontend) |

## Core Product Pillars

### 1. Pulse — Real-Time Operations Center
Live intraday monitoring for sales, labor, leakage, service speed, stockouts, and menu intelligence. Includes AI coaching, exception management, scorecards, goals, playbooks, wallboard mode, and a multi-outlet portfolio leaderboard.

### 2. Benchmarks — Competitive Intelligence
Performance comparison against configurable competitive sets ("compsets"). Includes index scoring, trend analysis, revenue/cover forecasting with confidence intervals, and market-level intelligence.

### 3. Watchtower — External Signal Monitoring
Tracks competitor activity (ratings, reviews, menu pricing), weather with predicted revenue impact, local events (holidays, sports, seasonal), and generates AI-powered briefings (daily, weekly, event prep, Ramadan).

### 4. Insights — Intelligence Modules
Analytical dashboards for deep-diving into operational domains. The codebase includes Performance Report, Revenue, Labor, Inventory, Purchasing, Marketing, Reservations, Profit, Revenue Assurance, Delivery, Guest Experience, Guest CRM, item profitability, executive summary, franchise health, outlet viability, cross-intelligence, and Foresight routes.

### 5. Sundae Intelligence — AI-Powered Analytics
Natural-language querying of restaurant data. Available via the web app and through Telegram, Slack, and Microsoft Teams bots. Supports conversation history, folders, scheduled queries, multi-outlet scope selection, and link-code sharing.

### 6. Integrations Hub — 12-Domain Data Ingestion
A vendor-agnostic integration engine supporting POS, Labor, Service Flow, Inventory, Purchasing, Reservations, Delivery, Marketing, Guest Experience, Guest CRM, and Accounting. Each domain supports webhook-based custom integrations.

### 7. Crew — Workforce Operations
Crew is the workforce operating layer: scheduling, availability, swaps, shift offers, time and attendance, payroll readiness, statutory exports, HR operations, employee documents, Ask-HR helpdesk, e-sign, credentials, assets, attestations, onboarding/offboarding, performance, talent, benefits, compensation, recruiting, skills, training, recognition, and Crew Intelligence/Compliance surfaces.

### 8. Billing & Pricing
Report/Core plans use base + per-location pricing, AI seats, AI credits, Core modules, Watchtower packs, and bundle discounts. Crew is sold as six workforce SKUs: Crew Lite, Scheduling, Operations, Time & Attendance, Payroll, and People Intelligence, with Operating and Complete bundles. Billing supports AI credit wallets, promo codes, employee overage, setup fees, and self-serve checkout where available.

### 9. Support & Knowledge
Core and Crew both expose SundaeAI Support. `/core/support` and `/crew/support` use the shared support API, KB index, AI agent, ticket escalation, ratings, and admin support table. Crew also has Ask-HR helpdesk for internal employee HR requests, stored separately from product-support tickets.

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
