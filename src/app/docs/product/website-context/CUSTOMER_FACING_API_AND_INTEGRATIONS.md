# Sundae — Customer-Facing API & Integrations

> Last refreshed: 2026-02-18 | Source: `sundae-backend/start/routes.ts`, controllers, and `sundae-app/src/lib/integrations/`

---

## 1. Public REST API (v1)

Authenticated via `X-API-Key` header. Keys are generated per-organization with the prefix `sun_`.

### Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/sales/summary` | Sales summary from daily aggregates. Optional filters: `outlet_id`, `business_date`. |
| `GET` | `/api/v1/exceptions` | Recent operational exceptions. Optional filters: `outlet_id`, `status`, `limit` (max 200, default 50). |
| `GET` | `/api/v1/pulse/status` | Current-day pulse status per outlet: net/gross sales, covers, transactions, avg check, as-of timestamp. Optional filter: `outlet_id`. |

### API Key Management

| Action | Endpoint | Notes |
|---|---|---|
| List keys | `GET /api/organizations/:orgId/api-keys` | Returns masked keys (prefix only) |
| Create key | `POST /api/organizations/:orgId/api-keys` | Returns raw key once with warning. Fields: `name`, `scopes[]`, `rate_limit_per_minute`, `expires_at` |
| Revoke key | `POST /api/organizations/:orgId/api-keys/:id/revoke` | Deactivates key |

### Key Format
- Pattern: `sun_` + 32-character hex string
- Storage: First 8 characters stored as `key_prefix`, full key stored as SHA-256 `key_hash`
- Rate limiting: Configurable per key via `rate_limit_per_minute`

---

## 2. Webhook System

Customers can subscribe to platform events and receive HTTPS POST payloads at their own endpoints.

### Webhook Management Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/organizations/:orgId/webhook-subscriptions` | List subscriptions with delivery stats |
| `POST` | `/api/organizations/:orgId/webhook-subscriptions` | Create subscription. Fields: `name`, `url`, `events[]`, `secret` (optional, auto-generated if omitted) |
| `PUT` | `/api/organizations/:orgId/webhook-subscriptions/:id` | Update subscription: `name`, `url`, `events[]`, `is_active` |
| `DELETE` | `/api/organizations/:orgId/webhook-subscriptions/:id` | Delete subscription |
| `POST` | `/api/organizations/:orgId/webhook-subscriptions/:id/test` | Send a test payload to the webhook URL |
| `GET` | `/api/organizations/:orgId/webhook-subscriptions/:id/deliveries` | List delivery history (paginated: `page`, `limit`) |

### Webhook Security
- Signature: HMAC-SHA256 of the payload body
- Header: `X-Webhook-Signature`
- Secret format: `whsec_` + 48-character hex string (auto-generated or user-provided)
- Secret is returned **only once** at creation time

### Webhook Delivery Model
- Automatic retry on failure
- Tracks: `attempts`, `status` (`pending`, `delivered`, `failed`, `retrying`), `response_status`, `response_body`
- `consecutive_failures` counter on the subscription
- `last_delivery_at` and `last_error` tracked per subscription

### Subscribable Event Types

**Platform Events:**

| Event | Description |
|---|---|
| `auth.password_reset` | User requests a password reset |
| `auth.email_verification` | User needs to verify their email address |
| `auth.platform_welcome` | New user registration welcome |
| `org.permission_update` | User permissions changed within organization |
| `org.team_addition` | User added to a team |
| `org.welcome` | User added to an organization |
| `data.weekly_missing` | No new sales data received this week |
| `data.chronic_inactivity` | No data received in 30 days |
| `views.sharing_granted` | User granted access to a shared view |
| `views.sharing_revoked` | User access to a shared view revoked |

**Pulse Operational Events:**

| Event | Description |
|---|---|
| `BEHIND_PACE` | Sales behind expected pace |
| `AVG_CHECK_DROP` | Average check dropped below threshold |
| `VOID_SPIKE` | Void rate exceeded threshold |
| `DISCOUNT_SPIKE` | Discount rate exceeded threshold |
| `OVERSTAFFED` | Staff hours above schedule |
| `UNDERSTAFFED` | Staff hours below schedule |
| `KITCHEN_BOTTLENECK` | Kitchen ticket time exceeds alert threshold |
| `EIGHTY_SIX` | Item marked as out of stock |
| `DATA_STALE` | No events received within staleness threshold |

**Goal Events:**

| Event | Description |
|---|---|
| `GOAL_AT_RISK` | Goal progress falling behind |
| `GOAL_ACHIEVED` | Goal target reached |
| `GOAL_MISSED` | Goal deadline passed without completion |

---

## 3. Chat Bot Integrations

Sundae provides native chat bots for conversational data queries on three platforms.

### Telegram
- Default Sundae bot with `/link`, `/start`, `/help` commands
- Custom per-organization bot support
- Inline keyboard for multi-outlet selection (up to 8 outlets + "All")
- Webhook endpoint: `POST /api/chat-with-data/telegram/webhook`

### Slack
- Default Sundae Slack app with `/link` command
- Channel mentions and DM support with thread threading
- Custom per-organization Slack app support
- Signature verification via `x-slack-signature`
- Webhook endpoint: `POST /api/chat-with-data/slack/events`

### Microsoft Teams
- Default Sundae Teams app with `/link` command
- Group chat detection and activity-based routing
- Custom per-organization Teams app support
- Webhook endpoint: `POST /api/chat-with-data/teams/webhook`

### Common Bot Features
- Account linking via link codes
- Multi-outlet scope selection
- Low credit balance warnings in response footers
- Deep link buttons for viewing data in Sundae web app

---

## 4. POS Integration Adapters

Direct POS connections for real-time sales data ingestion.

| Vendor | Key | Status | Features |
|---|---|---|---|
| Oracle MICROS Simphony | `micros_simphony` | Available | Live sales, Menu items, Employees, Checks |
| Square | `square` | Available | Live sales, Menu items, Payments |
| Toast | `toast` | Available | Live sales, Menu items, Employees |
| Clover | `clover` | Available | Live sales, Payments |
| Postgres POS (Database) | `postgres_pos` | Available | Live sales, Custom queries |
| SQL Server POS (Database) | `mssql_pos` | Available | Live sales, Custom queries, Azure SQL |

### POS Ingestion Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/pos/ingest` | Main POS data ingestion (dual auth: bearer or API key) |
| `GET` | `/api/pos/connections` | List POS vendor connections |
| `POST` | `/api/pos/connections` | Create POS connection |
| `POST` | `/api/pos/connections/:id/test` | Test POS connection |
| `GET` | `/api/vendors/health` | Vendor health status |

---

## 5. Multi-Domain Ingestion Engine

Unified ingestion system for all non-POS domains.

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/ingest` | Unified ingestion endpoint |
| `POST` | `/api/ingest/:domain/:vendor_key` | Per-domain per-vendor ingestion |
| `GET` | `/api/integrations/connections` | List all domain connections |
| `POST` | `/api/integrations/connections` | Create domain connection |

### Integration Catalog by Domain

#### Labor & Scheduling
| Vendor | Key | Status | Features |
|---|---|---|---|
| 7shifts | `seventh_shifts` | Upcoming | Shifts, Timeclock, Labor cost |
| HotSchedules | `hotschedules` | Upcoming | Shifts, Availability |
| Deputy | `deputy` | Upcoming | Shifts, Timeclock, Compliance |
| When I Work | `homebase` | Upcoming | Shifts, Timeclock |
| Webhook | `generic_webhook_labor` | Available | Custom events |

#### Service Speed & Flow
| Vendor | Key | Status | Features |
|---|---|---|---|
| Oracle KDS | `oracle_kds` | Upcoming | Ticket times, Station tracking |
| QSR Automations | `qsr_automations` | Upcoming | Ticket times, Drive-thru |
| Deliverect KDS | `deliverect_kds` | Upcoming | Ticket times |
| SevenRooms | `sevenrooms_flow` | Upcoming | Waitlist, Table flow |
| Webhook | `generic_webhook_flow` | Available | Custom events |

#### Purchasing & Procurement
| Vendor | Key | Status | Features |
|---|---|---|---|
| MarketMan | `marketman_purchasing` | Upcoming | POs, Invoices, Suppliers |
| BlueCart | `bluecart` | Upcoming | POs, Suppliers |
| SimpleOrder | `simpleorder` | Upcoming | POs, Inventory |
| Webhook | `generic_webhook_purchasing` | Available | Custom events |

#### Inventory & Availability
| Vendor | Key | Status | Features |
|---|---|---|---|
| MarketMan | `marketman_inventory` | Upcoming | Stock counts, Par levels |
| Craftable | `apicbase` | Upcoming | Stock counts, Recipes |
| BinWise | `fourth` | Upcoming | Stock counts, Waste tracking |
| Recipe Costing | `oracle_inventory` | Upcoming | Recipes, Food cost |

#### Reservations & Guest Flow
| Vendor | Key | Status | Features |
|---|---|---|---|
| SevenRooms | `sevenrooms` | Upcoming | Bookings, Waitlist, Guest profiles |
| OpenTable | `opentable` | Upcoming | Bookings, Covers |
| Resy | `resy` | Upcoming | Bookings, Events |
| Tock | `tock` | Upcoming | Bookings, Events, Prepaid |
| Webhook | `generic_webhook_reservations` | Available | Custom events |

#### Delivery & 3PD
| Vendor | Key | Status | Features |
|---|---|---|---|
| Deliverect | `deliverect` | Upcoming | Orders, Menus, Multi-platform |
| Uber Eats | `uber_eats` | Upcoming | Orders, Payouts |
| DoorDash | `doordash` | Upcoming | Orders, Payouts |
| Talabat | `talabat` | Upcoming | Orders, Payouts |
| Webhook | `generic_webhook_delivery` | Available | Custom events |

#### Marketing & Campaigns
| Vendor | Key | Status | Features |
|---|---|---|---|
| Meta (Facebook/IG) | `meta` | Upcoming | Ads, Spend, Conversions |
| Google Ads | `google_ads` | Upcoming | Ads, Spend, Clicks |
| Mailchimp | `mailchimp` | Upcoming | Emails, Opens, Clicks |
| Webhook | `generic_webhook_marketing` | Available | Custom events |

#### Guest Experience & Feedback
| Vendor | Key | Status | Features |
|---|---|---|---|
| Google Reviews | `google_reviews` | Upcoming | Reviews, Ratings, Responses |
| Yelp | `yelp` | Upcoming | Reviews, Ratings |
| Zendesk | `zendesk` | Upcoming | Tickets, CSAT |
| Webhook | `generic_webhook_guest_experience` | Available | Custom events |

#### Guest Profiles & CRM
| Vendor | Key | Status | Features |
|---|---|---|---|
| SevenRooms | `sevenrooms_crm` | Upcoming | Profiles, Loyalty, Tags |
| Toast | `toast_crm` | Upcoming | Profiles, Order history |
| Olo | `olo` | Upcoming | Profiles, Orders |
| Webhook | `generic_webhook_guest_crm` | Available | Custom events |

#### Accounting & Finance
| Vendor | Key | Status | Features |
|---|---|---|---|
| QuickBooks | `quickbooks` | Upcoming | GL, Invoices, Reports |
| Xero | `xero` | Upcoming | GL, Invoices, Bank feeds |
| Sage | `sage` | Upcoming | GL, Payroll |
| FreshBooks | `freshbooks` | Upcoming | Invoices, Expenses |
| Webhook | `generic_webhook_accounting` | Available | Custom events |

---

## 6. Public Endpoints (No Auth Required)

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/pricing/catalog` | Active public pricing catalog |
| `GET` | `/api/pricing/catalog/versioned` | Versioned pricing catalog |
| `POST` | `/api/pricing/quote` | Generate a pricing quote |
| `GET` | `/api/pricing/health` | Pricing service health check |
| `POST` | `/api/promo-codes/validate` | Validate a promo code |
| `GET` | `/api/invites/peek` | Public metadata for org invite links |
| `GET` | `/api/support/kb/search` | Knowledge base search |
| `GET` | `/api/support/kb/popular` | Popular knowledge base articles |

---

## 7. Canonical Event Types by Domain

These are the event types that flow through the ingestion engine and can trigger webhooks.

| Domain | Events |
|---|---|
| **POS** | `SALE`, `VOID`, `REFUND`, `COMP`, `DISCOUNT` |
| **Labor** | `CLOCK_IN`, `CLOCK_OUT`, `BREAK_START`, `BREAK_END`, `SHIFT_ASSIGNED`, `SHIFT_CANCELLED` |
| **Flow** | `TICKET_OPEN`, `TICKET_BUMP`, `TICKET_CLOSE`, `TICKET_VOID`, `WAITLIST_SNAPSHOT`, `WAITLIST_SEATED`, `DELIVERY_SNAPSHOT`, `DELIVERY_DISPATCH`, `DELIVERY_COMPLETE`, `DELIVERY_CANCEL` |
| **Availability** | `STOCK_COUNT`, `STOCK_ADJUSTMENT`, `ITEM_86`, `ITEM_RESTORE`, `PREP_SHORTAGE`, `DELIVERY_RECEIVED` |
| **Purchasing** | `PO_CREATED`, `PO_UPDATED`, `PO_RECEIVED`, `PO_CANCELLED`, `INVOICE_RECEIVED`, `CREDIT_ISSUED` |
| **Reservations** | `RESERVATION_CREATED`, `RESERVATION_UPDATED`, `RESERVATION_CANCELLED`, `RESERVATION_SEATED`, `RESERVATION_COMPLETED`, `RESERVATION_NO_SHOW`, `WALK_IN` |
| **Marketing** | `CAMPAIGN_CREATED`, `CAMPAIGN_UPDATED`, `DAILY_METRICS`, `CONVERSION` |
| **Guest Experience** | `REVIEW_RECEIVED`, `FEEDBACK_RECEIVED`, `FEEDBACK_RESOLVED`, `SURVEY_RESPONSE` |
| **Delivery** | `ORDER_PLACED`, `ORDER_ACCEPTED`, `ORDER_READY`, `ORDER_DISPATCHED`, `ORDER_DELIVERED`, `ORDER_CANCELLED`, `ORDER_REFUNDED` |
| **Guest CRM** | `GUEST_CREATED`, `GUEST_UPDATED`, `VISIT_RECORDED`, `LOYALTY_EARNED`, `LOYALTY_REDEEMED`, `SEGMENT_ASSIGNED`, `NPS_SUBMITTED` |
| **Accounting** | `ACCOUNT_CREATED`, `JOURNAL_ENTRY`, `PAYOUT_RECEIVED`, `INVOICE_CREATED`, `INVOICE_PAID`, `BILL_RECEIVED`, `BILL_PAID` |
| **Daily Sales** | `DAILY_SUMMARY`, `CHANNEL_SUMMARY`, `DAYPART_SUMMARY`, `CATEGORY_SUMMARY` |
