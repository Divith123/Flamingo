# Flamingo Billing - Subscription Billing and Revenue Management

## Overview

Flamingo Billing is a comprehensive recurring billing and revenue management module within the Flamingo financial ecosystem. It enables businesses to manage subscription-based revenue, automate billing cycles, handle complex pricing models, and maintain compliance with revenue recognition standards. The module provides end-to-end capabilities from subscription plan creation through payment collection, dunning management, and financial reporting.

The system supports multiple pricing models including flat-rate subscriptions, tiered pricing, usage-based billing, and hybrid combinations. Through native integration with Flamingo Invoice, every billing event automatically generates professional invoices with customizable templates and delivery options. Integration with Flamingo Payments enables automated payment collection through multiple payment methods including credit cards, ACH, and digital wallets. Flamingo Books receives automatic revenue recognition entries that comply with ASC 606 and IFRS 15 standards, ensuring accurate financial reporting without manual journal entry creation.

Flamingo Billing targets SaaS companies, subscription businesses, and any organization with recurring revenue models. The module scales from startups with simple monthly subscriptions to enterprise organizations with complex multi-tier pricing, usage metering, and global tax requirements. Support for multiple currencies, tax jurisdictions, and localized invoicing makes it suitable for companies with international customer bases.

The core value proposition centers on four pillars: automation (reducing billing overhead by 75% through automated invoicing and payment collection), flexibility (supporting any pricing model with configurable plans and proration), compliance (automated revenue recognition and tax calculation), and visibility (real-time analytics on MRR, ARR, churn, and customer lifetime value).

## Market Analysis

### Market Landscape

The subscription billing and revenue management software market is projected to exceed $18 billion by 2029, driven by the global shift toward subscription business models across industries. Organizations are moving from one-time transactions to recurring revenue relationships, requiring sophisticated billing infrastructure to manage complexity at scale.

Key market trends shaping product development include:

- **Usage-based pricing adoption**: Over 60% of SaaS companies now offer usage-based pricing components, requiring sophisticated metering, rating, and billing capabilities that traditional subscription platforms cannot support.
- **Revenue recognition automation**: Compliance with ASC 606 and IFRS 15 has become non-negotiable for public companies and enterprises, driving demand for automated revenue schedules and audit-ready reporting.
- **Global tax complexity**: The proliferation of digital services taxes, VAT/GST requirements, and economic nexus rules requires automated tax calculation across hundreds of jurisdictions.
- **Payment method diversification**: Customers expect to pay through their preferred methods including credit cards, digital wallets, bank transfers, and buy-now-pay-later options.
- **Customer self-service**: B2B buyers increasingly expect self-service portals for subscription management, reducing support burden while improving customer satisfaction.

### Competitive Analysis

#### Subscription Billing Leader A

This platform dominates the SaaS billing market with a focus on developer-friendly APIs and extensive customization capabilities. Their pricing model engine supports flat-rate, tiered, volume, and usage-based pricing with complex conditional logic. The system includes a robust subscription management interface with automated provisioning workflows and webhook notifications for lifecycle events. Their invoicing module offers extensive customization with HTML template support, multi-language capabilities, and automated delivery. The revenue recognition module provides ASC 606-compliant revenue schedules with performance obligation tracking and contract modification handling. Their dunning management system uses machine learning to optimize retry timing and reduce involuntary churn. Weaknesses include a steep learning curve requiring significant developer resources for initial setup, limited out-of-the-box reporting dashboards, and high transaction fees that scale unfavorably for high-volume businesses.

#### Recurring Revenue Platform B

This solution targets mid-market subscription businesses with an emphasis on ease of use and rapid deployment. The platform offers a visual plan builder with drag-and-drop configuration of pricing tiers, add-ons, and promotional pricing. Subscription management includes automated trial conversion, upgrade/downgrade workflows with intelligent proration, and self-service customer portals. The billing engine supports multiple currencies with automatic exchange rate updates and localized payment methods. Their analytics dashboard provides standard SaaS metrics including MRR, ARR, churn rate, and cohort retention analysis. The platform integrates with popular accounting systems through pre-built connectors. Weaknesses include limited support for complex usage-based pricing, basic revenue recognition capabilities without ASC 606 compliance features, and no native dunning management requiring third-party integration.

#### Usage-Based Billing System C

This competitor specializes in usage-based and metered billing for infrastructure, API, and consumption-based businesses. Their metering infrastructure processes billions of events daily with sub-second latency, supporting high-volume usage tracking without data loss. The rating engine applies complex pricing formulas including tiered rates, volume discounts, minimum commitments, and overage calculations. Real-time usage dashboards show customers their current consumption and projected bills. The platform includes advanced features like prepaid credits, commitment-based pricing, and drawdown tracking. Integration with data warehouses enables billing based on any measurable metric. Weaknesses include limited subscription management features for traditional recurring billing, complex setup requiring data engineering expertise, and pricing that scales aggressively with event volume making it expensive for high-frequency metering scenarios.

#### Enterprise Billing Suite D

This platform serves large enterprises with complex billing requirements across multiple product lines and business units. The system supports hierarchical account structures with parent-child relationships, consolidated invoicing across subsidiaries, and intercompany billing. Their revenue recognition module is the most comprehensive in the market, supporting ASC 606, IFRS 15, and industry-specific guidance with automated allocation, variable consideration handling, and contract asset/liability tracking. The platform includes advanced workflow capabilities for approval chains, exception handling, and manual adjustments. Multi-entity support includes localized tax calculation, regulatory reporting, and currency management across 150+ countries. Weaknesses include extremely high pricing that excludes mid-market companies, lengthy implementation cycles requiring professional services engagement, and a dated user interface that frustrates end users.

#### SaaS Billing Solution E

This cloud-native solution targets growing SaaS companies with modern architecture and comprehensive feature coverage. The subscription management module handles trials, freemium conversions, plan changes, and cancellations with automated workflow triggers. Their pricing flexibility supports hybrid models combining subscription and usage components with bundled pricing. The customer portal provides white-labeled self-service subscription management with payment method updates and invoice access. Dunning management includes configurable retry logic, payment method update campaigns, and escalation workflows. Their API-first design enables deep integration with product provisioning systems. Weaknesses include limited tax calculation capabilities requiring integration with third-party tax engines, basic analytics without cohort analysis or predictive churn modeling, and inconsistent customer support response times.

#### Payment Orchestration Platform F

While primarily a payment processor, this platform has expanded into billing with strong payment-centric capabilities. The system excels at payment method management with support for 150+ payment methods across 40+ countries. Their retry engine uses proprietary algorithms to maximize payment success rates through optimal timing and routing. The billing module supports subscription management with automated invoicing and payment collection. Their fraud prevention tools reduce chargebacks and payment disputes. The platform offers competitive processing rates and fast settlement times. Weaknesses include limited pricing model flexibility, minimal revenue recognition capabilities, basic subscription management lacking advanced features like proration and add-ons, and no native usage-based billing support.

#### Revenue Management System G

This specialized platform focuses exclusively on revenue recognition and financial compliance for enterprise customers. Their revenue recognition engine handles the most complex scenarios including multi-element arrangements, variable consideration, contract modifications, and milestone-based recognition. The system provides audit-ready documentation with detailed revenue waterfall reports and contract-level traceability. Integration with ERP systems ensures financial data consistency across the organization. Their compliance module supports SOX controls, audit trails, and regulatory reporting requirements. Weaknesses include lack of billing and subscription management capabilities requiring integration with separate billing platforms, high cost and complexity suitable only for large enterprises, and long implementation cycles.

### Competitive Differentiation for Flamingo Billing

Flamingo Billing differentiates through:

1. **Native ecosystem integration**: Unlike standalone billing tools, Flamingo Billing connects directly to Invoice, Payments, Books, Commerce, and other Flamingo modules without third-party connectors, eliminating reconciliation issues and data silos.
2. **Unified pricing flexibility**: Support for any pricing model from simple subscriptions to complex usage-based billing within a single platform, eliminating the need for multiple billing systems.
3. **Automated compliance**: Built-in revenue recognition automation and tax calculation reduce compliance burden without expensive third-party tools.
4. **Unified financial data model**: Billing data flows seamlessly into Books for real-time financial reporting, with consistent chart of accounts and dimensional tagging across all modules.
5. **Customer-centric design**: Intuitive self-service portals and automated workflows reduce support burden while improving customer satisfaction and retention.

### Feature Comparison Matrix

| Feature | Flamingo | A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|---|---|
| Flat-rate subscriptions | Yes | Yes | Yes | Partial | Yes | Yes | Yes | No |
| Tiered pricing | Yes | Yes | Yes | Yes | Yes | Yes | Partial | No |
| Usage-based billing | Yes | Yes | Partial | Yes | Yes | Partial | No | No |
| Hybrid pricing | Yes | Yes | Partial | Partial | Yes | Yes | No | No |
| ASC 606 compliance | Yes | Yes | Partial | No | Yes | Partial | No | Yes |
| Automated invoicing | Yes | Yes | Yes | Partial | Yes | Yes | Yes | No |
| Dunning management | Yes | Yes | Partial | No | Yes | Yes | Partial | No |
| Self-service portal | Yes | Partial | Yes | Yes | Partial | Yes | Partial | No |
| Tax calculation | Yes | Partial | Partial | No | Yes | Partial | Partial | No |
| Multi-currency | Yes | Yes | Yes | Yes | Yes | Yes | Yes | No |
| Revenue analytics | Yes | Partial | Yes | Partial | Yes | Partial | Basic | Yes |
| Native accounting sync | Yes | API | API | API | API | API | API | API |

## Core Features

### 1. Pricing Models

The pricing model engine provides unparalleled flexibility to define and execute any pricing strategy:

- **Flat-rate pricing**: Simple fixed-price subscriptions charged at regular intervals. Supports annual, monthly, quarterly, and custom billing periods with optional discounts for longer commitments. The system handles prepayment scenarios and revenue recognition schedules for deferred revenue.

- **Tiered pricing**: Configure multiple pricing tiers with different feature sets, usage limits, and pricing. Customers can upgrade or downgrade between tiers with automatic proration calculations. The system supports grandfathering existing customers on deprecated tiers while selling new tiers to new customers.

- **Volume pricing**: Pricing that decreases as quantity increases, encouraging larger commitments. The system supports multiple volume breakpoints with either graduated pricing (different rate per tier) or volume pricing (single rate based on total quantity).

- **Usage-based pricing**: Charge based on actual consumption with flexible metering options. Support for per-unit pricing, tiered usage rates, overage charges, and minimum commitments. The rating engine processes usage events in real-time or batch mode with configurable aggregation periods.

- **Hybrid pricing**: Combine multiple pricing models within a single subscription. For example, a base platform fee (flat-rate) plus per-user pricing (tiered) plus API calls (usage-based). The system calculates each component independently and presents a unified invoice to the customer.

- **Prepaid credits**: Sell credit packs that customers draw down against usage. Support for bulk purchase discounts, credit expiration policies, and automatic top-up triggers when balances fall below thresholds.

- **Promotional pricing**: Time-limited discounts, introductory rates, and grandfathered pricing for early customers. The system automatically transitions customers to standard pricing when promotional periods expire.

### 2. Subscription Management

The subscription lifecycle management system handles every stage from acquisition to retention:

- **Plan configuration**: Create and manage subscription plans with customizable billing periods, pricing, features, and entitlements. Plans can be organized into product families with shared characteristics. Support for plan versioning allows updates without affecting existing subscribers.

- **Trial management**: Configure free trials with customizable durations, feature limits, and conversion workflows. The system tracks trial usage and sends automated conversion reminders. Trial-to-paid conversion rates are tracked and reported for optimization.

- **Subscription creation**: Multiple channels for subscription creation including self-service checkout, sales-assisted provisioning, and API-based creation. The system validates payment methods before activating subscriptions to prevent failed initial charges.

- **Upgrades and downgrades**: Handle plan changes with intelligent proration calculations. Customers can upgrade immediately with prorated charges or schedule changes for the next billing period. Downgrades respect prepaid periods with credits applied to future invoices.

- **Proration engine**: Calculate accurate prorated amounts for mid-cycle changes using daily or hourly precision. Support for various proration strategies including charge immediately, charge at period end, or maintain current period pricing. The engine handles complex scenarios like mid-cycle add-ons and usage-based component changes.

- **Add-ons and supplements**: Sell additional products and services as subscription add-ons. Add-ons can be one-time purchases or recurring charges, tied to the base subscription billing cycle or billed independently.

- **Subscription pausing**: Allow customers to temporarily pause subscriptions with configurable pause periods and reactivation workflows. During pauses, charges are suspended while entitlements are maintained or suspended based on configuration.

- **Cancellation workflows**: Manage voluntary cancellations with retention offers, exit surveys, and grace periods. The system supports immediate cancellation, end-of-period cancellation, and scheduled future cancellation dates.

- **Subscription renewals**: Automated renewal processing with pre-renewal notifications, payment method validation, and failure handling. Support for manual renewal approval workflows for enterprise customers.

### 3. Billing Cycles

The billing cycle engine accommodates diverse business models and customer preferences:

- **Standard cycles**: Support for weekly (7 days), bi-weekly (14 days), monthly, quarterly (3 months), semi-annual (6 months), and annual billing periods. Each cycle type has configurable anchor dates and billing day options.

- **Custom cycles**: Define custom billing periods of any duration in days, weeks, or months. Support for aligned cycles (all customers billed on the same date) or anniversary cycles (billed on subscription start date anniversary).

- **Calendar alignment**: Align billing dates to calendar periods (1st of month, 15th of month) for easier financial planning and reporting. The system handles partial first periods with proration when subscriptions start mid-cycle.

- **Multiple schedules**: Support different billing schedules for different customer segments, products, or regions. Each schedule can have unique payment terms, invoice templates, and delivery preferences.

- **Billing date changes**: Allow customers to change their billing date with proration calculations to align billing with their financial cycles. The system supports one-time date changes or permanent schedule migrations.

- **Consolidated billing**: Combine multiple subscriptions for the same customer into a single invoice. Support for parent-child account structures with consolidated invoicing at the parent level.

- **Pro forma invoicing**: Generate preview invoices showing upcoming charges without creating actual receivables. Useful for sales quotes and customer communication.

### 4. Invoice Generation

The invoicing module creates professional, accurate invoices with extensive customization:

- **Automated generation**: Invoices are automatically generated based on subscription charges, usage charges, and one-time fees. The system supports real-time generation at billing time or scheduled batch generation.

- **Template customization**: Design invoice templates with company branding, custom fields, and localized formatting. HTML template support enables pixel-perfect customization matching corporate identity guidelines.

- **Multi-language support**: Generate invoices in customer-preferred languages with localized formatting for dates, numbers, and currency. Support for 30+ languages with extensible translation management.

- **Tax line items**: Automatic calculation and display of taxes with jurisdiction breakdowns. Tax exemptions are clearly indicated with exemption certificate references.

- **Line item details**: Comprehensive line item descriptions including service periods, quantities, rates, and calculations. Support for detailed usage breakdowns and grouped line items.

- **Credit notes**: Generate credit notes for refunds, adjustments, and disputed charges. Credits can be applied to specific invoices or held as account balance for future application.

- **Invoice delivery**: Multiple delivery channels including email, customer portal, API webhooks, and third-party integrations. Support for PDF, HTML, and structured data formats (UBL, XML).

- **Invoice status tracking**: Track invoice lifecycle from draft to sent to paid to overdue. Automated status updates based on payment events and manual adjustments.

- **Payment terms**: Configure payment terms per customer or globally with due date calculations, early payment discounts, and late payment penalties.

### 5. Payment Collection

The payment collection system maximizes successful collection while minimizing customer friction:

- **Payment methods**: Support for credit and debit cards (Visa, Mastercard, Amex, Discover), ACH bank transfers, SEPA direct debit, digital wallets (Apple Pay, Google Pay), and buy-now-pay-later options.

- **Payment method management**: Secure storage of payment methods with PCI-compliant tokenization. Customer self-service for adding, updating, and removing payment methods with validation.

- **Auto-charge**: Automatically charge stored payment methods when invoices are due. Configurable charge timing including on-due-date, days-before-due, and grace period options.

- **Retry logic**: Intelligent retry schedules for failed payments with exponential backoff, timing optimization, and alternative payment method attempts. Retry schedules are configurable with different strategies for different failure reasons.

- **Payment reminders**: Automated email and SMS reminders before due dates, on due dates, and after late dates. Reminder content and timing are customizable per customer segment.

- **Partial payments**: Accept partial payments against invoices with automatic allocation logic. Support for payment plans and installment arrangements.

- **Payment reconciliation**: Automatic matching of payments to invoices with exception handling for unmatched payments. Integration with bank feeds for cash reconciliation.

- **Refund processing**: Process full and partial refunds with automatic invoice adjustments and revenue recognition reversals. Support for original payment method refunds and alternative refund methods.

### 6. Revenue Recognition

The revenue recognition engine ensures compliance with ASC 606 and IFRS 15 accounting standards:

- **Performance obligation tracking**: Define performance obligations for each product and service. The system tracks satisfaction of obligations and recognizes revenue as obligations are fulfilled.

- **Revenue schedules**: Automatically generate revenue recognition schedules based on contract terms and performance obligations. Support for straight-line recognition, milestone-based recognition, and usage-based recognition.

- **Contract modifications**: Handle contract changes including upgrades, downgrades, add-ons, and cancellations with proper revenue adjustment calculations. The system supports prospective and cumulative catch-up approaches as appropriate.

- **Variable consideration**: Manage uncertain revenue components including usage overages, contingent fees, and customer credits. Support for constraint and true-up adjustments.

- **Multi-element arrangements**: Allocate transaction price across multiple performance obligations using standalone selling prices. Handle bundled offerings with different recognition patterns.

- **Deferred revenue**: Track deferred revenue balances and automatically release revenue as recognition criteria are met. Integration with general ledger for real-time balance sheet accuracy.

- **Contract assets and liabilities**: Track contract assets (unbilled revenue) and contract liabilities (deferred revenue) with aging analysis and reporting.

- **Audit trails**: Comprehensive audit trails for all revenue transactions with user attribution, timestamps, and business justification. Support for auditor data requests and compliance reporting.

- **Disaggregation**: Report revenue by contract, product, geography, customer type, and other dimensions for management analysis and disclosure requirements.

### 7. Dunning Management

The dunning management system recovers failed payments and reduces involuntary churn:

- **Failure classification**: Categorize payment failures by type (insufficient funds, expired card, bank decline, fraud suspicion) to inform retry strategies.

- **Retry campaigns**: Configurable retry sequences with multiple attempts over days or weeks. Different campaigns for different failure types with optimized timing based on success probability.

- **Payment method updates**: Automated campaigns prompting customers to update expired or failing payment methods with one-click update links.

- **Escalation workflows**: Progressive escalation from automated retries to customer communication to account restrictions to collections handoff based on delinquency duration and amount.

- **In-app notifications**: Display payment failure alerts within customer applications and portals with immediate payment resolution options.

- **Grace periods**: Configurable service continuation during dunning periods to maintain customer goodwill while pursuing payment recovery.

- **Success tracking**: Measure dunning campaign effectiveness with recovery rates by campaign type, failure reason, and customer segment.

- **Collections handoff**: Automated workflows to transfer severely delinquent accounts to collections agencies with proper documentation and compliance.

### 8. Customer Portal

The customer self-service portal empowers subscribers while reducing support burden:

- **Subscription overview**: Customers view current subscriptions, upcoming renewals, billing history, and payment status. Clear display of service periods, entitlements, and usage.

- **Plan management**: Self-service plan upgrades, downgrades, and add-on purchases with real-time pricing and proration calculations. Preview changes before committing.

- **Payment method management**: Add, update, and remove payment methods with secure validation. View stored payment methods with masked details for security.

- **Invoice access**: View, download, and pay invoices through the portal. Filter and search invoice history by date, amount, and status.

- **Usage visibility**: Real-time usage dashboards showing current consumption against plan limits with projected costs for usage-based billing.

- **Account settings**: Update billing contacts, notification preferences, and communication settings. Manage authorized users with role-based access.

- **Support integration**: Submit support tickets, view ticket history, and access knowledge base articles directly from the portal.

- **White-labeling**: Customize portal appearance with company branding, colors, logos, and custom domains for seamless customer experience.

### 9. Coupons and Discounts

The promotions engine drives acquisition, retention, and expansion:

- **Coupon types**: Support for percentage discounts, fixed amount discounts, free trial extensions, and free add-ons. Coupons can apply to first period only or multiple periods.

- **Coupon codes**: Generate unique coupon codes for targeted campaigns with configurable usage limits (total redemptions, per-customer limits, expiration dates).

- **Automatic discounts**: Apply discounts automatically based on customer segments, purchase behavior, or promotional periods without requiring coupon codes.

- **Stacking rules**: Configure whether discounts can be combined with other offers or applied exclusively. Rules can vary by coupon type and customer tier.

- **Account credits**: Issue account credits for service issues, goodwill gestures, or promotional incentives. Credits can be applied automatically or manually with usage restrictions.

- **Referral programs**: Track referral codes and automate reward fulfillment for successful referrals. Support for two-sided incentives rewarding both referrer and new customer.

- **Promotion analytics**: Track coupon redemption rates, conversion impact, and revenue attribution. Identify high-performing promotions and fraudulent usage patterns.

### 10. Tax Calculation

The tax engine ensures accurate calculation across jurisdictions:

- **Automatic calculation**: Calculate taxes in real-time based on customer location, product type, and transaction details. Support for sales tax, VAT, GST, and digital services taxes.

- **Jurisdiction coverage**: Tax rules for 150+ countries with thousands of state, provincial, and local jurisdictions. Regular updates as tax laws change.

- **Tax exemption handling**: Process tax-exempt customers with exemption certificate collection and validation. Track exemption expiration dates for renewal reminders.

- **Reverse charge**: Support for EU VAT reverse charge mechanisms and other cross-border B2B tax treatments with proper invoice documentation.

- **Tax reporting**: Generate tax liability reports by jurisdiction with breakdowns of taxable amounts, tax collected, and filing obligations.

- **Invoice compliance**: Ensure invoices meet local tax requirements including tax registration numbers, specific formatting, and required disclosures.

- **Tax overrides**: Manual tax adjustments for special cases with audit trails and approval workflows.

### 11. Analytics

The analytics module provides comprehensive visibility into subscription business performance:

- **MRR and ARR tracking**: Calculate monthly recurring revenue and annual recurring revenue with automated categorization by plan, segment, and geography.

- **Churn analysis**: Track logo churn (customer count) and revenue churn (MRR impact) with cohort analysis showing retention curves over time.

- **Customer Lifetime Value**: Calculate LTV using historical data and predictive models. Segment customers by value tier for targeted strategies.

- **Cohort analysis**: Analyze customer behavior by acquisition cohort across metrics including retention, expansion, and LTV. Identify high-performing acquisition channels and time periods.

- **Revenue waterfall**: Track changes in ARR across new business, expansion, contraction, and churn with detailed movement analysis.

- **Payment analytics**: Monitor payment success rates, failure reasons, dunning recovery rates, and days sales outstanding (DSO).

- **Forecasting**: Project future MRR, ARR, and cash flow based on pipeline data, historical trends, and churn predictions.

- **Custom dashboards**: Build custom analytics views with drag-and-drop chart creation, filtering, and drill-down capabilities.

- **Report scheduling**: Schedule automated report delivery via email with configurable recipients, formats, and frequencies.

### 12. Usage Metering

The usage metering infrastructure tracks consumption for accurate billing:

- **Event ingestion**: High-throughput ingestion of usage events via API, file upload, or streaming integration. Support for billions of events with sub-second latency.

- **Event validation**: Validate incoming events for required fields, data types, and value ranges. Reject or quarantine invalid events with error reporting.

- **Aggregation**: Aggregate raw events into billable units using configurable aggregation functions (sum, count, max, unique count). Support for time-based and custom aggregation windows.

- **Rating**: Apply pricing to aggregated usage using tiered rates, volume discounts, and custom pricing formulas. Support for minimum commitments and overage calculations.

- **Real-time visibility**: Show customers current usage and projected costs through APIs and dashboards. Enable spending alerts at configurable thresholds.

- **Usage queries**: Query historical usage data with flexible filters by customer, product, time period, and dimensions. Export usage data for analysis.

- **Idempotency**: Ensure exactly-once processing of usage events with deduplication based on event identifiers.

- **Data retention**: Configurable retention policies for usage data with long-term archiving options for compliance.

## User Stories

### Story 1: Product Manager Creates New Subscription Plan

**As a** product manager, **I want to** create a new subscription plan with tiered pricing and usage limits, **so that** we can launch a new product offering to the market.

**Acceptance Criteria:**
- Manager defines plan name, description, and billing interval (monthly/annual).
- Manager configures three pricing tiers (Starter, Professional, Enterprise) with different feature sets.
- Manager sets tier prices: Starter at $29/month, Professional at $99/month, Enterprise at $299/month.
- Manager defines usage limits per tier: API calls (1K, 10K, unlimited), storage (5GB, 50GB, 500GB), users (3, 10, unlimited).
- Manager configures annual discount (20% off) for annual billing.
- Manager sets trial period (14 days) with full feature access.
- System validates that all required fields are completed.
- Plan is saved as draft for review or published immediately.
- Published plan appears in checkout and customer portal.

### Story 2: Customer Subscribes to Service

**As a** prospective customer, **I want to** sign up for a subscription plan with a free trial, **so that** I can evaluate the service before committing to payment.

**Acceptance Criteria:**
- Customer browses available plans with feature comparison.
- Customer selects Professional plan and chooses monthly billing.
- Customer enters business information and creates account.
- Customer provides payment method for trial verification (not charged).
- System validates payment method with authorization hold.
- Trial subscription activates immediately with full feature access.
- Customer receives welcome email with trial details and expiration date.
- Customer can access service immediately through authenticated portal.
- System tracks trial usage and sends conversion reminders before expiration.

### Story 3: Sales Rep Upgrades Customer Plan

**As a** sales representative, **I want to** upgrade a customer's subscription from Starter to Professional, **so that** they can access additional features and we can increase revenue.

**Acceptance Criteria:**
- Sales rep views customer account with current subscription details.
- Rep selects upgrade to Professional plan with immediate effective date.
- System calculates prorated charge based on remaining days in current period.
- System displays proration breakdown: remaining Starter credit ($14.50), new Professional charge ($49.50), net charge ($35.00).
- Customer receives email notification of plan change with charge details.
- Upgrade processes immediately with new feature entitlements activated.
- Invoice is generated for prorated amount and charged to stored payment method.
- Revenue recognition schedule is updated for the remaining contract term.
- Customer can access Professional features immediately in their account.

### Story 4: Finance Manager Reviews Revenue Recognition

**As a** finance manager, **I want to** review revenue recognition schedules for monthly subscriptions, **so that** I can ensure accurate financial reporting and ASC 606 compliance.

**Acceptance Criteria:**
- Finance manager accesses revenue recognition dashboard.
- Dashboard displays deferred revenue balance, recognized revenue MTD, and remaining performance obligations.
- Manager filters by time period, product line, and customer segment.
- System shows revenue waterfall with beginning balance, new contracts, recognized revenue, and ending balance.
- Manager drills down to individual contract revenue schedules.
- Contract view shows performance obligations, satisfaction dates, and recognition amounts.
- System identifies contracts with modification events requiring adjustment entries.
- Manager exports revenue recognition report for audit documentation.
- Data syncs automatically to Flamingo Books with proper GL account mapping.

### Story 5: Customer Updates Payment Method After Failure

**As a** customer, **I want to** update my expired credit card after receiving a payment failure notification, **so that** my subscription remains active without service interruption.

**Acceptance Criteria:**
- Customer receives email notification that payment failed due to expired card.
- Email contains secure one-click link to update payment method.
- Customer clicks link and is authenticated to payment update page.
- Page displays current failed payment amount ($99.00) and past due status.
- Customer enters new credit card details with real-time validation.
- System validates card through payment processor authorization.
- Customer confirms update and system immediately retries failed payment.
- Payment succeeds and invoice is marked as paid.
- Customer receives confirmation email with payment receipt.
- Subscription status returns to active with no service interruption.

### Story 6: Billing Admin Resolves Failed Payment Through Dunning

**As a** billing administrator, **I want to** configure a dunning campaign for failed payments, **so that** we can recover revenue from customers with payment issues.

**Acceptance Criteria:**
- Admin accesses dunning management configuration.
- Admin creates new campaign for "insufficient funds" failures.
- Campaign includes retry attempts on days 1, 3, 7, and 14 after initial failure.
- Campaign includes payment method update emails after second retry failure.
- Campaign includes in-app notifications for customers with active sessions.
- Admin sets grace period of 15 days before service suspension.
- Admin configures escalation to customer success team after 10 days.
- System applies campaign automatically to future insufficient funds failures.
- Dashboard shows dunning campaign performance with recovery rates.
- Admin can A/B test different retry timing and messaging.

### Story 7: Tax Specialist Configures Tax Calculation

**As a** tax compliance specialist, **I want to** configure automatic tax calculation for EU customers, **so that** VAT is correctly applied based on customer location and B2B status.

**Acceptance Criteria:**
- Specialist enables tax calculation for all EU member states.
- System configures standard VAT rates per country (Germany 19%, France 20%, etc.).
- Specialist enables VAT validation through VIES database for B2B customers.
- System applies reverse charge mechanism for valid VAT ID holders.
- Customers without VAT ID are charged VAT based on their country.
- Tax is calculated in real-time during checkout and displayed clearly.
- Invoices include VAT registration numbers and compliance information.
- Monthly tax liability report shows VAT collected by country.
- System handles OSS (One Stop Shop) reporting requirements.
- Tax rates update automatically when jurisdictions change rates.

### Story 8: Marketing Manager Creates Promotional Campaign

**As a** marketing manager, **I want to** create a promotional coupon code for a seasonal campaign, **so that** we can drive new customer acquisition with a limited-time discount.

**Acceptance Criteria:**
- Manager creates campaign "Summer2026" with 30% discount.
- Discount applies to first three months of new subscriptions only.
- Manager generates 1,000 unique coupon codes (SUMMER-XXXX-XXXX).
- Campaign limited to 1,000 total redemptions.
- Campaign expires on September 30, 2026.
- Codes are distributed through marketing channels (email, social, partners).
- System tracks redemption rates in real-time.
- Discounts apply automatically at checkout when valid code is entered.
- Expired or exhausted codes display appropriate error messages.
- Post-campaign report shows conversions, revenue impact, and ROI.

### Story 9: Account Manager Reviews Customer Usage

**As a** customer success manager, **I want to** review a customer's usage patterns, **so that** I can proactively recommend plan upgrades or identify churn risk.

**Acceptance Criteria:**
- Manager accesses customer account and navigates to usage analytics.
- Dashboard displays current period usage vs. plan limits (API calls: 8,247 of 10,000).
- Trend chart shows usage over past 12 months with growth rate.
- System highlights customers approaching plan limits (>80% usage).
- Manager views usage breakdown by feature and user.
- System predicts when customer will hit limits based on current growth.
- Manager receives automated alert when customer exceeds 90% of limit.
- Usage data exports to CSV for custom analysis.
- Manager uses insights for expansion conversations with customer.

### Story 10: Developer Ingests Usage Events

**As a** backend developer, **I want to** ingest usage events via API for metered billing, **so that** customer consumption is accurately tracked and billed.

**Acceptance Criteria:**
- Developer obtains API credentials for usage event ingestion.
- Developer sends POST request with event data (customer_id, product_code, quantity, timestamp).
- System validates event format and required fields.
- System returns 201 Created with event_id for confirmation.
- System deduplicates events based on idempotency key.
- Events appear in usage dashboard within 60 seconds.
- System aggregates events hourly for billing calculations.
- Usage data is queryable via API for customer-facing dashboards.
- System handles 10,000+ events per second during peak loads.
- Failed events are queued for retry with exponential backoff.

### Story 11: CFO Analyzes Subscription Metrics

**As a** Chief Financial Officer, **I want to** review subscription business metrics including MRR, ARR, and churn, **so that** I can report to the board and make strategic decisions.

**Acceptance Criteria:**
- CFO accesses analytics dashboard with executive summary.
- Dashboard displays current MRR ($1.2M) and ARR ($14.4M) with growth rates.
- Churn metrics show logo churn (3.2%) and revenue churn (2.1%).
- Cohort retention chart shows 12-month retention curves.
- Revenue waterfall shows movements: new (+$150K), expansion (+$80K), contraction (-$30K), churn (-$50K).
- LTV:CAC ratio displayed as 4.2:1 with trend over time.
- Data is filterable by product line, geography, and customer segment.
- Dashboard updates in real-time as new transactions process.
- CFO exports board presentation with charts and commentary.
- Historical data available for trend analysis back to company founding.

### Story 12: Customer Self-Serves Subscription Changes

**As a** subscription customer, **I want to** upgrade my plan through the self-service portal, **so that** I can access more features without contacting support.

**Acceptance Criteria:**
- Customer logs into customer portal with existing credentials.
- Portal displays current plan (Starter) with usage and feature limits.
- Customer views comparison of available plans with upgrade recommendations.
- Customer selects Professional plan and views prorated pricing.
- System shows immediate charge ($45.50 prorated) and new monthly rate.
- Customer confirms upgrade with stored payment method.
- System processes payment immediately and activates new features.
- Customer receives confirmation email with upgrade details.
- New features are accessible immediately in customer account.
- Invoice is available in portal for download.

## Wireframe Descriptions

### Billing Dashboard

The billing dashboard serves as the primary command center for subscription business metrics:

**Header Section:**
- Page title "Billing" with current reporting period selector (month/quarter/year).
- Quick action buttons: "Create Invoice", "New Subscription", "Process Refund", "Run Report".
- Global search for finding customers, invoices, or transactions.

**Key Metrics Row (four cards):**
- **MRR Card**: Current monthly recurring revenue with amount, trend arrow, and percentage change from previous period. Sparkline chart showing 12-month trend.
- **ARR Card**: Annual recurring revenue calculated from MRR with growth rate and comparison to target.
- **Active Subscriptions**: Total active subscriber count with breakdown by plan tier (pie chart).
- **Outstanding Invoices**: Total accounts receivable with aging breakdown (current, 30, 60, 90+ days) and DSO metric.

**Revenue Waterfall Chart:**
- Horizontal waterfall chart showing ARR movement categories.
- Starting ARR, plus new business (green), plus expansion (green), minus contraction (orange), minus churn (red), equals ending ARR.
- Clickable segments drill down to customer lists.

**Churn Analysis Panel:**
- Line chart showing churn rate trend over 12 months.
- Toggle between logo churn and revenue churn.
- Cohort retention heatmap showing percentage retained by acquisition month.

**Recent Activity Feed:**
- Chronological list of billing events: new subscriptions, plan changes, payment successes/failures, invoice generation.
- Each entry shows customer name, action type, amount, and timestamp.
- Click entries to view full details.

**Alerts and Action Items:**
- Failed payments requiring attention (count and total amount).
- Expiring subscriptions in next 30 days.
- Tax filing deadlines by jurisdiction.
- Revenue recognition adjustments pending review.

### Subscription Plans Management

The plan management interface for configuring and managing subscription offerings:

**Plan List Sidebar:**
- Searchable, filterable list of all subscription plans.
- Display plan name, status (active/archived/draft), price range, and subscriber count.
- Group by product family or category.
- Quick actions: edit, duplicate, archive, view subscribers.

**Plan Detail Panel (main content area):**
- **Header**: Plan name, status toggle, created/modified dates, subscriber count.
- **Pricing Section**:
  - Billing interval selector (monthly/annual/quarterly).
  - Price input fields for each currency.
  - Annual discount percentage field.
  - Trial period configuration (duration and trial type).
- **Features Section**:
  - Checklist of included features with custom description fields.
  - Usage limits configuration (API calls, storage, seats) with tier values.
- **Add-ons Section**:
  - List of compatible add-ons with pricing.
  - Toggle add-on availability per plan.

**Plan Comparison Preview:**
- Side-by-side comparison of plan tiers showing features and limits.
- Visual indication of value differences between tiers.
- Preview how plan appears in customer checkout.

**Subscribers Tab:**
- Table of active subscribers on this plan.
- Columns: customer name, start date, MRR, status, actions.
- Filter by status, date range, and custom attributes.
- Export subscriber list to CSV.

**Plan History:**
- Audit trail of plan changes with user attribution.
- Version comparison showing what changed between versions.
- Rollback capability for recent changes.

### Customer Subscription View

The comprehensive customer subscription management interface:

**Customer Header:**
- Customer name, logo, account ID, and status badge (active/past due/cancelled).
- Account health score and churn risk indicator.
- Quick actions: edit customer, view invoices, send message, impersonate portal.

**Subscription Cards:**
- **Active Subscriptions**: Card per subscription showing plan name, billing amount, next billing date, and status.
  - Progress bar showing days remaining in current period.
  - Usage meters for plan limits (e.g., "750 of 1,000 API calls used").
  - Action buttons: upgrade, downgrade, cancel, change billing date.
- **Add-ons**: List of active add-ons with individual pricing and billing cycles.

**Billing Information Panel:**
- **Payment Methods**: Stored cards/bank accounts with last four digits, expiration date, and status. Primary method indicator. Button to add new method.
- **Billing Contacts**: Email addresses receiving invoices and notifications.
- **Billing Address**: Complete address with tax jurisdiction display.
- **Tax Status**: Tax ID number, exemption status, and certificate link.

**Recent Invoices Table:**
- Columns: invoice number, date, amount, status, due date, actions.
- Status badges: paid (green), open (blue), overdue (red), void (gray).
- Actions: view PDF, send reminder, apply payment, issue credit note.
- Expandable rows showing line item details.

**Activity Timeline:**
- Chronological history of customer billing events.
- Subscription lifecycle events (creation, upgrades, renewals, cancellations).
- Payment events (successful charges, failures, retries).
- Invoice events (generated, sent, paid, overdue).
- Support interactions and notes.

**Communication Log:**
- History of automated emails sent (payment receipts, failed payment notices, renewal reminders).
- Delivery status and open/click tracking.
- Manual communications sent by team members.

### Revenue Recognition Schedule

The detailed revenue recognition interface for finance teams:

**Contract Selection Panel:**
- Search and filter contracts by customer, date, product, or amount.
- List view showing contract summary: customer, start date, term, total value, recognized to date.
- Sort by various dimensions including unrecognized balance and satisfaction progress.

**Contract Detail View:**
- **Contract Header**: Customer name, contract ID, start date, end date, total contract value.
- **Performance Obligations Table**:
  - Row per obligation with description, standalone selling price, allocation amount.
  - Satisfaction method (time-based, usage-based, milestone).
  - Progress indicator showing percent complete.
  - Recognized revenue to date and remaining deferred balance.

**Revenue Schedule Table:**
- Monthly breakdown columns: period, beginning deferred, new allocations, recognized, adjustments, ending deferred.
- Revenue recognized by performance obligation with GL account mapping.
- Contract modification history showing retrospective adjustments.
- Toggle between summary view and detailed transaction view.

**Chart Visualizations:**
- **Revenue Waterfall**: Monthly recognized revenue over contract term.
- **Deferred Balance**: Declining balance chart showing revenue release over time.
- **Obilgation Satisfaction**: Progress bars for each performance obligation.

**Journal Entry Preview:**
- Automatically generated journal entries for recognized revenue.
- Debit/Credit breakdown with GL account names and numbers.
- Integration status with Flamingo Books.
- Export entries to CSV for ERP import if needed.

**Audit Documentation:**
- Supporting documentation links (contracts, amendments, supporting calculations).
- User activity log for all modifications to recognition schedule.
- Compliance check indicators (ASC 606, IFRS 15).

### Dunning Management

The failed payment recovery and dunning campaign management interface:

**Dunning Overview Dashboard:**
- **At-Risk Revenue**: Total MRR from subscriptions with failed payments.
- **Recovery Rate**: Percentage of failed payments successfully recovered.
- **Active Campaigns**: Count of customers currently in dunning workflows.
- **Success by Stage**: Funnel chart showing progression through retry attempts.

**Failed Payments Queue:**
- Filterable table of all failed payments requiring attention.
- Columns: customer, invoice amount, failure date, failure reason, retry count, days overdue, status.
- Color coding: yellow (initial failure), orange (multiple failures), red (critical - near suspension).
- Bulk actions: send reminder, apply payment plan, suspend service, write off.

**Campaign Configuration:**
- **Campaign List**: Existing dunning campaigns with name, trigger conditions, status.
- **Campaign Builder**:
  - Trigger conditions: failure reason, customer segment, amount threshold.
  - Retry schedule: timing and number of automatic retry attempts.
  - Communication sequence: email templates, SMS messages, in-app notifications with timing.
  - Escalation rules: when to involve customer success, when to suspend service.
  - Exit conditions: successful payment, payment plan agreement, write-off.

**Customer Dunning View:**
- Timeline showing customer's journey through dunning workflow.
- Each touchpoint: retry attempts, emails sent, calls made, responses received.
- Current stage and next scheduled action.
- Notes from customer success interactions.
- Payment method update history.

**Recovery Analytics:**
- Recovery rate by failure reason (insufficient funds, expired card, bank decline).
- Recovery rate by campaign type and timing.
- Days to recovery distribution.
- Revenue recovered vs. written off by month.
- A/B test results comparing campaign variants.

**Manual Intervention Tools:**
- One-click payment retry with alternative payment method.
- Payment plan creation with installment scheduling.
- Service suspension and restoration controls.
- Direct customer communication from within dunning workflow.

## Integration Points

### Invoice Integration

The integration with Flamingo Invoice automates professional invoice generation and delivery:

- **Automatic invoice creation**: When billing events occur, the Billing module creates draft invoices in the Invoice module with line items for subscriptions, usage, and fees. Invoice templates, numbering sequences, and branding are managed in Invoice.
- **Line item synchronization**: Detailed line item data flows from Billing to Invoice including service descriptions, date ranges, quantities, rates, and calculations. Usage-based items include metered quantity details.
- **Invoice delivery**: The Invoice module handles delivery via email, customer portal, and API with customizable templates and multi-language support. Delivery status is synchronized back to Billing.
- **Payment status sync**: When invoices are paid through Payments or recorded in Invoice, payment status updates flow back to Billing for subscription status management and revenue recognition triggers.
- **Credit notes**: Refunds and adjustments in Billing generate corresponding credit notes in Invoice with proper accounting treatment and customer notification.
- **Tax handling**: Tax calculations performed in Billing are passed to Invoice for display and reporting. Tax exemption status and jurisdiction details flow between systems.

### Payments Integration

The integration with Flamingo Payments enables automated payment collection and reconciliation:

- **Payment method storage**: Customer payment methods are stored securely in Payments with PCI-compliant tokenization. Billing references these tokens for recurring charges without handling sensitive data.
- **Auto-charge execution**: When invoices are due, Billing initiates charge requests to Payments using stored payment methods. Payments processes the transaction and returns success/failure status.
- **Retry orchestration**: Failed payments trigger retry logic in Billing, which coordinates with Payments for subsequent charge attempts using the same or alternative payment methods.
- **Payment reconciliation**: Payment confirmations from Payments are matched to invoices in Billing with automated reconciliation. Unmatched payments are flagged for manual review.
- **Refund processing**: Refund requests in Billing are executed through Payments with automatic invoice adjustment and customer notification.
- **Payment method updates**: Customer-initiated payment method updates in the Billing portal are processed through Payments with validation and tokenization.

### Books Integration

The integration with Flamingo Books ensures accurate financial recording and revenue recognition:

- **Revenue journal entries**: Recognized revenue from the revenue recognition engine creates journal entries in Books debiting deferred revenue and crediting revenue accounts. Entries include dimensional tags for product, geography, and customer segment.
- **Invoice posting**: Invoice creation in Billing posts accounts receivable entries to Books with customer, amount, and due date details.
- **Payment posting**: Payment receipts create cash receipts in Books with automatic application to customer accounts and invoice matching.
- **Deferred revenue tracking**: The deferred revenue liability is tracked in Books with automated adjustments as revenue is recognized over time.
- **Tax liability**: Tax amounts collected are posted to tax liability accounts by jurisdiction for remittance tracking.
- **Bad debt**: Write-offs and uncollectible accounts in Billing create bad debt expense entries in Books with proper allowance account adjustments.
- **Chart of accounts**: Billing uses the chart of accounts defined in Books for revenue, deferred revenue, tax, and receivable accounts ensuring consistency across financial reporting.

### Commerce Integration

The integration with Flamingo Commerce connects subscription billing to e-commerce operations:

- **Subscription products**: Products defined in Commerce can be configured as subscription offerings with pricing and billing terms managed in Billing. Product catalog synchronization keeps offerings consistent.
- **Checkout integration**: The Commerce checkout flow calls Billing APIs to create subscriptions, validate pricing, and process initial payments. Subscription activation is coordinated between systems.
- **Customer sync**: Customer profiles created in Commerce flow to Billing with contact information, billing addresses, and payment preferences. Updates are synchronized bidirectionally.
- **Order-to-subscription**: One-time orders in Commerce can trigger subscription creation for recurring replenishment or service continuation.
- **Promotional alignment**: Coupon codes and discounts defined in Commerce are validated against Billing rules ensuring consistent promotional treatment across channels.
- **Inventory integration**: For physical subscription boxes or hardware-as-a-service, fulfillment status from Commerce flows to Billing for revenue recognition timing.

### ERP Integration

Integration with enterprise ERP systems supports complex organizational requirements:

- **Customer master**: Customer records synchronize with ERP customer master data ensuring consistent identifiers, hierarchies, and credit limits across systems.
- **Revenue posting**: Recognized revenue flows to ERP general ledger with proper account coding and dimensional analysis for financial reporting and consolidation.
- **Order management**: Subscription orders in Billing create corresponding orders in ERP for fulfillment coordination and inventory allocation.
- **Credit control**: Customer credit status from ERP influences Billing payment terms and collection strategies. Overdue accounts trigger credit holds.
- **Intercompany billing**: Multi-entity subscriptions generate intercompany billing records in ERP for transfer pricing and consolidation elimination.
- **Project accounting**: Usage-based subscriptions tied to ERP projects enable project profitability analysis with billing data flowing to project cost tracking.

### Tax Engine Integration

Integration with third-party tax engines enhances calculation accuracy:

- **Real-time calculation**: Billing calls tax engine APIs during checkout and invoicing to calculate taxes based on customer location, product type, and transaction details.
- **Exemption validation**: Tax engines validate exemption certificates and VAT IDs against government databases with results stored in Billing.
- **Rate updates**: Tax rate changes from tax engines are synchronized to Billing ensuring current calculations without manual intervention.
- **Filing support**: Tax liability data flows to tax engines for return preparation and filing in supported jurisdictions.
- **Audit support**: Tax calculation details from external engines are stored in Billing for audit defense and historical reference.

## Technical Considerations

### Idempotency for Billing Events

Billing operations must be idempotent to prevent duplicate charges and revenue recognition errors:

- **Event deduplication**: All billing events (subscription creations, charges, usage events) include unique identifiers. The system maintains an idempotency key store to detect and reject duplicate events.
- **Charge protection**: Payment charges are protected against double-processing through idempotency keys passed to payment processors. Keys are retained for 24+ hours to handle retry scenarios.
- **Invoice generation**: Invoice creation requests include idempotency keys preventing duplicate invoices for the same billing period. Existing invoices are returned for duplicate requests.
- **Revenue recognition**: Revenue recognition runs are idempotent with period-based locking. Re-running recognition for a period updates existing entries rather than creating duplicates.
- **Webhook delivery**: Outbound webhooks include idempotency keys and signature verification. Retry logic respects idempotency to prevent duplicate external notifications.

### Proration Calculations

Accurate proration is critical for customer trust and revenue accuracy:

- **Daily proration**: Standard proration uses daily precision calculating charges based on days remaining in billing period divided by total days in period.
- **Time zone handling**: Proration respects customer time zones for period boundaries ensuring consistent calculations across geographic regions.
- **Leap year handling**: February 29 is properly handled in proration calculations with 366-day year denominators when applicable.
- **Mid-cycle changes**: Complex scenarios like multiple changes within a period are handled with sequential proration calculations maintaining accurate balances.
- **Credit application**: When downgrading, credit calculations account for previously paid amounts with clear breakdowns for customer communication.
- **Minimum charges**: Configurable minimum prorated charges prevent administratively expensive micro-transactions for minimal changes.

### Revenue Recognition Schedules

Revenue recognition requires precise scheduling and adjustment capabilities:

- **Schedule generation**: Upon contract inception, the system generates revenue recognition schedules allocating transaction price across performance obligations.
- **Straight-line recognition**: Time-based performance obligations recognize revenue evenly over the service period with daily precision.
- **Usage-based recognition**: Performance obligations satisfied through usage recognize revenue as usage events are processed and billed.
- **Milestone recognition**: Custom milestones trigger revenue recognition upon verification with audit trails for milestone completion.
- **Contract modifications**: Changes to contracts (upgrades, downgrades, cancellations) trigger retrospective or prospective adjustments based on modification type.
- **Catch-up adjustments**: When contract modifications require cumulative catch-up, the system calculates and records adjustment entries in the appropriate period.
- **Allocation updates**: Changes to standalone selling prices affect future revenue allocations with proper documentation for audit trails.

### Data Retention and Archival

Billing data requires long-term retention for compliance and audit purposes:

- **Transaction retention**: Invoice, payment, and revenue data is retained for 7+ years per accounting standards and regulatory requirements.
- **Usage data**: High-volume usage events are aggregated after 24 months with detailed events archived to cold storage for retrieval if needed.
- **Customer data**: Customer billing history is retained per data retention policies with anonymization options for privacy compliance.
- **Audit logs**: All billing actions are logged with immutable timestamps, user attribution, and before/after values retained indefinitely.
- **Backup strategy**: Billing data is backedup with point-in-time recovery capabilities ensuring data integrity for financial reporting.

### Performance Targets

- **Invoice generation**: Target <5 seconds for invoice generation including complex usage calculations.
- **Usage ingestion**: Support 10,000+ events per second with sub-second latency for real-time billing.
- **Revenue recognition**: Process monthly recognition runs for 100,000+ subscriptions in under 10 minutes.
- **Payment processing**: Complete payment charge flows including retry logic in under 3 seconds.
- **Portal load time**: Customer portal pages load in under 2 seconds for optimal user experience.
- **Report generation**: Standard reports generate in under 10 seconds for datasets up to 1 million records.

---

*Document version: 1.0*
*Last updated: 2026-03-29*
*Owner: Flamingo Product Team*
