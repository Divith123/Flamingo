# Flamingo Core Platform

## Product Overview

**Flamingo** is the central all-in-one business management platform that serves as the foundation for the entire Flamingo Business Suite. It provides the core infrastructure, shared services, and unified experience that connects all 14 specialized products into a cohesive ecosystem.

### Vision

To become the operating system for modern businesses—providing a single, integrated platform where companies can manage every aspect of their operations without the complexity of juggling multiple disconnected tools.

### Target Audience

- **Small Businesses (1-50 employees)**: Need an affordable, easy-to-use system that grows with them
- **Mid-Market Companies (51-1000 employees)**: Require robust features with multi-entity support and advanced workflows
- **Enterprise Organizations (1000+ employees)**: Need scalability, customization, and deep integration capabilities

---

## Core Capabilities

### 1. Unified Dashboard

The Flamingo dashboard serves as the central command center, providing:

**Executive View**
- Real-time business health score aggregating metrics from all connected products
- Revenue trends with breakdown by product line, region, and customer segment
- Cash flow position with 30/60/90-day forecasts
- Key performance indicators (KPIs) customizable by role
- Exception alerts requiring immediate attention

**Operational View**
- Task queue aggregating pending approvals from all products
- Recent activity feed across the organization
- Quick actions for common tasks (create invoice, record expense, add contact)
- Cross-product search with unified results

**Role-Based Personalization**
- CFO view: Financial metrics, cash position, AR/AP aging
- COO view: Operational efficiency, inventory levels, order fulfillment
- Sales Leader view: Pipeline, quotas, conversion rates
- HR Director view: Headcount, utilization, time-off requests

### 2. Product Switcher

The product switcher enables seamless navigation between all 15 Flamingo products:

**Design Specifications**
- **Location**: Persistent left sidebar (collapsible) or top navigation bar
- **Visual Design**: Grid layout with product icons and names
- **Search**: Fuzzy search to quickly find products by name or function
- **Favorites**: Pin frequently used products for quick access
- **Recent**: Show last 5 accessed products
- **Permissions**: Hide products user doesn't have access to

**Context Preservation**
- Maintain state when switching between products
- Return to exact view when navigating back
- Cross-product deep linking for sharing specific views

### 3. Unified Identity & Access Management

**Single Sign-On (SSO)**
- One login provides access to all Flamingo products
- Support for SAML 2.0, OIDC, and OAuth 2.0
- Multi-factor authentication (MFA) with TOTP, SMS, and hardware keys
- Session management with configurable timeout

**Role-Based Access Control (RBAC)**
```typescript
interface Permission {
  product: string; // e.g., 'books', 'inventory', 'payroll'
  module: string; // e.g., 'invoices', 'reports', 'settings'
  action: 'create' | 'read' | 'update' | 'delete' | 'approve';
  conditions?: Condition[]; // Amount limits, entity restrictions
}

interface Role {
  id: string;
  name: string;
  permissions: Permission[];
  scope: 'organization' | 'entity' | 'department';
}
```

**Pre-Built Roles**
- Owner/Admin: Full access to all products and settings
- Finance Manager: Full access to financial products, read-only elsewhere
- Sales Manager: Full access to Commerce/Invoice, limited elsewhere
- Employee: Self-service access (expenses, time-off, payslips)
- Custom: Build custom roles with granular permissions

### 4. Shared Data Layer

**Master Data Management**
- **Contacts**: Unified customer, vendor, and employee database shared across products
- **Products/Services**: Central catalog used by Inventory, Commerce, Billing, Invoice
- **Chart of Accounts**: Single source of truth shared by Books, ERP, Expense
- **Currencies**: Global currency settings with automatic FX rate updates
- **Tax Codes**: Centralized tax configuration applied consistently

**Data Synchronization**
- Real-time updates across all products (event-driven architecture)
- Conflict resolution with clear ownership rules
- Audit trail showing what changed, when, and by whom
- Data lineage tracking for compliance

### 5. Notification Center

**Unified Notifications**
- Aggregates notifications from all Flamingo products
- Smart prioritization (urgent, important, informational)
- Configurable delivery channels (in-app, email, SMS, push)
- Digest options (immediate, daily, weekly)

**Notification Types**
- **Approvals**: Invoice approvals, expense approvals, time-off requests
- **Alerts**: Low inventory, payment failures, budget overruns
- **Reminders**: Invoice due, report submission, compliance deadlines
- **Updates**: Payment received, order shipped, document signed

### 6. Search & Discovery

**Global Search**
- Single search bar accessible from anywhere
- Results categorized by type (contacts, transactions, documents, reports)
- Cross-product search with relevance ranking
- Advanced filters (date range, amount, status, product)
- Recent searches and search suggestions

**Search Capabilities**
- Full-text search across all indexed fields
- Fuzzy matching for typo tolerance
- Autocomplete with instant results
- Saved searches with email alerts

### 7. Reporting & Analytics

**Standard Reports**
- Financial statements (P&L, Balance Sheet, Cash Flow)
- Sales reports (by product, customer, region, salesperson)
- Expense analysis (by category, department, employee)
- Inventory reports (valuation, turnover, aging)
- Custom report builder with drag-and-drop interface

**Analytics Features**
- Interactive dashboards with drill-down capability
- Trend analysis with year-over-year comparisons
- Variance analysis (actual vs. budget vs. forecast)
- Cohort analysis for customer behavior
- Predictive analytics (cash flow forecast, demand planning)

**Export & Distribution**
- Export formats: PDF, Excel, CSV
- Scheduled report delivery via email
- API access for BI tool integration
- Embedded analytics for customer portals

### 8. Integration Hub

**Pre-Built Integrations**
- **Payment Processors**: Stripe, PayPal, Square
- **Banks**: Plaid, Tink for bank feeds and reconciliation
- **E-commerce**: Shopify, WooCommerce, Amazon
- **CRM**: Salesforce, HubSpot
- **Productivity**: Google Workspace, Microsoft 365
- **Communication**: Slack, Microsoft Teams

**Integration Patterns**
- **API-First**: RESTful APIs with OpenAPI documentation
- **Webhooks**: Outbound notifications for key events
- **iPaaS**: Pre-built connectors for Zapier, Make, Workato
- **Custom**: SDK and developer tools for custom integrations

**Developer Platform**
- API keys with granular permissions
- Webhook management with retry logic
- Sandbox environment for testing
- Developer documentation and code samples

### 9. Automation Engine

**Workflow Builder**
- Visual drag-and-drop workflow designer
- Trigger-based automation (when X happens, do Y)
- Multi-step workflows with conditional branching
- Approval workflows with escalation

**Common Automation Scenarios**
- Invoice created → Send to customer → Remind if unpaid → Apply late fee
- Expense submitted → Route for approval → Reimburse via payroll
- Order placed → Reserve inventory → Generate packing slip → Notify warehouse
- Lead captured → Assign to sales rep → Create follow-up task

**AI-Powered Automation**
- Smart categorization (expenses, transactions, support tickets)
- Anomaly detection (fraudulent transactions, unusual spending)
- Predictive recommendations (reorder points, payment terms)
- Natural language queries ("Show me unpaid invoices over $10k")

### 10. Settings & Administration

**Organization Settings**
- Company profile (name, address, tax ID, logo)
- Fiscal year configuration
- Base currency and enabled currencies
- Tax configuration (sales tax, VAT, GST)
- Business hours and holidays

**User Management**
- Invite users with email
- Assign roles and permissions
- Department and cost center assignment
- Active/inactive status
- Login history and session management

**Security Settings**
- Password policies (minimum length, complexity, expiration)
- MFA enforcement
- IP allowlist/blocklist
- Session timeout configuration
- Audit log retention period

**Data Management**
- Data export (full backup, selective export)
- Data retention policies
- GDPR compliance tools (data subject requests)
- Soft delete with recovery window

---

## Technical Architecture

### Platform Foundation

**Multi-Tenant Architecture**
- Logical isolation with shared infrastructure
- Tenant identifier on all records
- Row-level security for data isolation
- Per-tenant encryption keys for sensitive data

**Scalability Design**
- Horizontal scaling for stateless services
- Database read replicas for reporting
- Caching layer (Redis) for frequently accessed data
- CDN for static assets and documents

**Reliability**
- 99.9% uptime SLA
- Automated failover across availability zones
- Point-in-time recovery for databases
- Disaster recovery with RTO < 4 hours, RPO < 1 hour

### Technology Stack Alignment

**Backend**
- Runtime: Bun for high-performance JavaScript/TypeScript
- Framework: Hono for lightweight, fast APIs
- API: tRPC for end-to-end type safety
- Database: PostgreSQL via Drizzle ORM
- Cache: Upstash Redis
- Queue: BullMQ for background jobs
- Search: MeiliSearch for full-text search
- Storage: Cloudflare R2 for documents and files

**Frontend**
- Web: Next.js 16 with App Router
- Desktop: Tauri 2 for native apps
- Mobile: Expo 55 for iOS/Android
- UI: shadcn/ui with Tailwind CSS v4
- State: Zustand for client state, TanStack Query for server state

**Infrastructure**
- Container: Docker with multi-stage builds
- Orchestration: Docker Compose for development
- CI/CD: GitHub Actions
- Monitoring: Sentry for error tracking, Pino for logging

---

## User Onboarding Flow

### Phase 1: Account Creation (5 minutes)
1. Enter email and create password
2. Verify email via magic link or OTP
3. Complete company profile (name, industry, size, country)
4. Select products to enable (pre-checked based on industry)
5. Set base currency and fiscal year

### Phase 2: Initial Setup (15-30 minutes)
1. **Import Data**: Connect accounting software, upload CSV, or start fresh
2. **Configure Settings**: Tax rates, payment terms, invoice templates
3. **Invite Team**: Add team members with appropriate roles
4. **Complete Checklists**: Product-specific setup wizards

### Phase 3: First Value (Day 1-7)
1. **Quick Win**: Create first invoice, record first expense, or send first payment
2. **Guided Tour**: Interactive walkthrough of key features
3. **Resource Hub**: Access to help docs, video tutorials, webinars
4. **Check-In**: Automated email with tips and offer for live onboarding

### Phase 4: Adoption (Week 2-4)
1. **Usage Insights**: Dashboard showing feature adoption
2. **Recommendations**: AI-suggested features based on usage patterns
3. **Milestone Celebrations**: Acknowledge first 10 invoices, etc.
4. **Feedback Loop**: In-app surveys to improve experience

---

## Success Metrics

### Product Metrics
- **Activation Rate**: % completing setup checklist
- **Time to Value**: Days from signup to first key action
- **Daily Active Users (DAU)**: Unique users per day
- **Feature Adoption**: % using each product/module
- **Retention Rate**: % active after 30/60/90 days

### Business Metrics
- **Monthly Recurring Revenue (MRR)**: Subscription revenue
- **Expansion Revenue**: Upsells and cross-sells
- **Net Revenue Retention (NRR)**: Revenue retention including expansion
- **Customer Lifetime Value (LTV)**: Total revenue per customer
- **Customer Acquisition Cost (CAC)**: Marketing + sales cost per customer

### Technical Metrics
- **API Latency**: p50, p95, p99 response times
- **Error Rate**: % of requests resulting in errors
- **Uptime**: % of time service is available
- **Page Load Time**: Time to interactive
- **Core Web Vitals**: LCP, FID, CLS scores

---

## Competitive Differentiation

### What Makes Flamingo Core Unique

1. **True All-in-One Platform**: Not a collection of acquired products, but a unified platform built from the ground up with shared data, consistent UX, and seamless integration.

2. **Modern Technology Stack**: Built with latest technologies (TypeScript, Bun, Next.js 16, Tauri 2) for superior performance and developer experience.

3. **AI-Native**: AI capabilities embedded throughout, not bolted on—smart categorization, predictive analytics, natural language interfaces.

4. **Consumer-Grade UX**: Enterprise power with consumer simplicity—intuitive navigation, beautiful design, mobile-first.

5. **Open Platform**: API-first design with extensive integration ecosystem—connect to existing tools while consolidating on Flamingo.

6. **Transparent Pricing**: Simple, predictable pricing without hidden fees or surprise overage charges.

7. **Global from Day One**: Multi-currency, multi-language, multi-entity support built into the core.

---

## Roadmap

### Phase 1: Foundation (Months 1-6)
- Core platform with unified dashboard
- Product switcher and navigation
- Identity and access management
- Shared data layer (contacts, products, chart of accounts)
- Notification center
- Basic reporting

### Phase 2: Enhancement (Months 7-12)
- Advanced analytics and dashboards
- Automation engine with workflow builder
- Integration hub with pre-built connectors
- Mobile apps (iOS/Android)
- Desktop apps (macOS/Windows)
- AI-powered features (smart categorization, anomaly detection)

### Phase 3: Scale (Months 13-18)
- Multi-entity consolidation
- Advanced RBAC with ABAC support
- Marketplace for third-party extensions
- White-label customization
- Industry-specific templates
- Advanced compliance (SOC 2 Type II, ISO 27001)

---

## Conclusion

Flamingo Core is the foundation that makes the Flamingo Business Suite greater than the sum of its parts. By providing unified infrastructure, shared services, and a consistent user experience, it enables businesses to operate more efficiently with less complexity.

The platform is designed to grow with customers—starting with essential features for small businesses and scaling to meet the needs of large enterprises. With its modern architecture, AI-native capabilities, and open integration approach, Flamingo Core is positioned to become the operating system for modern businesses worldwide.
