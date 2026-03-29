# Flamingo Expense - Expense Tracking and Reporting

## Overview

Flamingo Expense is a comprehensive expense management module within the Flamingo financial ecosystem. It streamlines the entire expense lifecycle from receipt capture through reimbursement disbursement, providing employees with an intuitive submission experience while giving finance teams the controls, visibility, and automation they need to manage organizational spending effectively.

The module integrates receipt capture with OCR extraction, intelligent expense categorization, configurable policy enforcement, multi-level approval workflows, and automated reimbursement processing. Through deep integration with Flamingo Books, every approved expense automatically creates the corresponding ledger entries, eliminating manual journal posting. Integration with Flamingo Payroll enables reimbursement disbursement to be included directly in payroll runs, reducing payment cycles and administrative overhead.

Flamingo Expense targets mid-market and enterprise organizations that require granular spending controls, audit-ready documentation, and real-time visibility into organizational expenses. The module supports multi-entity, multi-currency, and multi-location operations, making it suitable for companies with distributed teams and international travel requirements.

The core value proposition centers on three pillars: automation (reducing manual data entry and approval overhead by 70%), compliance (enforcing expense policies before submission rather than after), and visibility (providing real-time spending analytics across departments, categories, and time periods).

## Market Analysis

### Market Landscape

The expense management software market is projected to exceed $12 billion by 2028, driven by digital transformation initiatives, remote work expansion, and increasing regulatory scrutiny of corporate spending. Organizations are moving away from spreadsheet-based and paper-based expense processes toward automated, cloud-native solutions that integrate with their broader financial technology stack.

Key market trends shaping product development include:

- **AI-powered receipt processing**: OCR accuracy has reached 95%+ for standard receipts, with leading solutions now incorporating machine learning to handle non-standard formats, handwritten receipts, and multi-language documents.
- **Real-time policy enforcement**: The market is shifting from post-submission auditing to pre-submission validation, catching policy violations before expenses enter the approval pipeline.
- **Embedded payments**: Virtual and physical corporate card issuance is increasingly integrated into expense platforms, enabling automatic expense creation from card transactions.
- **Mobile-first design**: Over 65% of expense submissions now originate from mobile devices, making responsive design and native mobile capabilities table stakes.

### Competitive Analysis

#### Leading Expense Tracker A

This platform focuses on mid-market organizations with a strong emphasis on receipt capture automation. Their OCR engine processes receipts in under 3 seconds with 97% accuracy across 40+ languages. The platform uses a tiered approval workflow with conditional routing based on expense amount, category, and department. Corporate card integration is a core feature, with automatic matching of card transactions to submitted expenses. Their mileage tracking uses GPS-based automatic trip detection with configurable mileage rates. The mobile application supports offline receipt capture with automatic sync when connectivity is restored. Weaknesses include limited customization of expense categories and a policy engine that only supports post-submission flagging rather than pre-submission blocking.

#### Enterprise Expense Platform B

This solution targets large enterprises with complex organizational structures. Their strength lies in the policy enforcement engine, which supports pre-submission validation with configurable rules including spending limits by role, category restrictions, merchant blacklists, and receipt requirement thresholds. The approval workflow supports up to 10 approval levels with conditional routing based on 15+ criteria. Multi-currency support includes real-time exchange rate feeds with the ability to lock rates at submission time. Integration with major ERP systems is comprehensive, supporting bi-directional data sync. Per diem management includes city-specific rates with automatic meal deduction calculations. The platform's weakness is its complex initial setup, requiring significant configuration effort and professional services engagement.

#### Corporate Spend Manager C

This competitor differentiates through its integrated corporate card program, offering physical and virtual cards with real-time spend controls. Expense creation is fully automated for card transactions, with employees only needing to attach receipts and add notes. The platform includes a unique "smart categorization" engine that learns from organizational spending patterns to auto-categorize expenses with 92% accuracy. Approval workflows support parallel approval paths where multiple approvers can review simultaneously. The reimbursement module supports same-day ACH payments. Analytics include predictive spending forecasts based on historical patterns. Limitations include weak mileage tracking capabilities and limited support for international per diem rates.

#### Digital Expense Hub D

This platform emphasizes user experience with a consumer-grade mobile application and one-tap expense submission. The receipt capture uses AI to extract not just amount and date but also line items, tax amounts, and tip amounts. The policy engine operates in two modes: advisory (warnings) and enforcement (blocking), with the ability to configure different modes for different policy types. Approval workflows include delegate approver functionality and automatic escalation for overdue approvals. The analytics dashboard provides real-time spending heatmaps by department, category, and geography. Batch reimbursement processing supports multiple payment methods including direct deposit, check, and corporate card credit. Weaknesses include limited integration depth with accounting systems and no native payroll integration.

#### Travel Expense Pro E

This competitor specializes in travel-related expenses with deep integration into travel booking systems. The platform automatically creates expense reports from flight, hotel, and car rental bookings. Mileage tracking includes integration with fleet management systems and automatic calculation of shortest route distances. Per diem management supports GSA rates for US government contractors and customizable rates for private organizations. The policy engine includes pre-trip approval workflows where travel requests must be approved before expenses can be submitted. Multi-currency support includes automatic conversion with historical rate lookup for audit purposes. Corporate card reconciliation includes automatic matching with a configurable tolerance window. The platform's weakness is its limited applicability to non-travel expenses and a less robust general expense management feature set.

#### Agile Expense Framework F

This solution targets small to mid-market organizations with a focus on rapid deployment and self-service configuration. The platform offers template-based policy setup where organizations can start with industry-standard policies and customize from there. Approval workflows use a visual drag-and-drop builder that requires no technical expertise. Receipt capture supports email forwarding, mobile photo upload, and integration with popular receipt scanning apps. The reimbursement module supports batch processing with export to major payroll providers. Analytics include pre-built dashboards for common expense metrics with the ability to create custom reports. The platform includes a unique "expense coaching" feature that provides employees with real-time feedback on their spending patterns. Limitations include scalability concerns for organizations with more than 5,000 employees and limited multi-entity support.

#### Enterprise Financial Suite G

This competitor offers expense management as part of a broader financial suite including accounting, procurement, and treasury management. The advantage is deep native integration across all financial processes, eliminating the need for third-party connectors. The expense module includes automatic GL account mapping based on expense categories and department allocations. Policy enforcement includes integration with the procurement module to prevent duplicate spending across purchase orders and expense reports. Approval workflows can reference organizational hierarchy data from the HR module, automatically routing approvals through the correct chain of command. The analytics module combines expense data with budget data from the planning module to provide budget vs. actual reporting in real-time. The weakness is that organizations not using the full suite get limited value from the expense module's integration capabilities, and the platform requires significant upfront investment.

### Competitive Differentiation for Flamingo Expense

Flamingo Expense differentiates through:

1. **Native ecosystem integration**: Unlike standalone expense tools, Flamingo Expense connects directly to Books, Payroll, Invoice, and other Flamingo modules without third-party connectors or middleware.
2. **Pre-submission policy enforcement**: The policy engine validates expenses against organizational rules before submission, reducing approval cycle times and compliance risk.
3. **Unified financial data model**: Expense categories, GL accounts, departments, and cost centers are shared across all Flamingo modules, eliminating data silos and reconciliation issues.
4. **Real-time ledger posting**: Approved expenses immediately create journal entries in Books, providing real-time financial visibility rather than batch posting at period end.
5. **Payroll-integrated reimbursement**: Reimbursements flow directly into Payroll runs, leveraging existing payment infrastructure and employee banking details.

## Core Features

### 1. Receipt Capture

The receipt capture system provides multiple ingestion methods to minimize friction for employees:

- **Photo upload**: Native mobile camera integration with automatic edge detection, perspective correction, and image enhancement. The system captures the receipt image and immediately begins OCR processing, returning extracted data within 3 seconds.
- **OCR extraction**: The OCR engine extracts merchant name, transaction date, total amount, tax amount, currency, and line items from receipt images. The engine supports 40+ languages and handles thermal paper receipts, handwritten receipts, and digital receipt screenshots with 95%+ accuracy.
- **Email forwarding**: Each employee receives a unique email address for receipt forwarding. The system parses email subjects and attachments, creating draft expenses automatically. Common receipt formats from major retailers and travel providers are recognized and parsed.
- **Auto-matching to transactions**: When corporate card integration is enabled, the system automatically matches uploaded receipts to card transactions based on amount, date, and merchant similarity. Matching confidence scores are displayed, and employees can confirm or rematch as needed.
- **Bulk upload**: Finance teams can upload multiple receipts at once via drag-and-drop, with the system creating individual expense records for each receipt.

### 2. Expense Categories

The categorization system provides structure for expense classification while minimizing manual effort:

- **Custom categories**: Organizations define their own expense category hierarchy with up to three levels (e.g., Travel > Ground Transportation > Rideshare). Each category can have custom fields, required documentation, and GL account mappings.
- **Auto-categorization rules**: The system learns from organizational spending patterns to suggest categories based on merchant name, transaction amount, and historical categorization. Admins can define rules that automatically assign categories based on merchant, amount range, or keyword matching.
- **GL account mapping**: Each expense category maps to one or more GL accounts in Flamingo Books. The mapping supports default accounts with override rules based on department, project, or cost center. This mapping drives automatic journal entry creation upon expense approval.
- **Category policies**: Each category can have associated policies including spending limits, receipt requirements, approval routing, and documentation requirements. These policies are enforced during expense submission.

### 3. Expense Policies

The policy engine enforces organizational spending rules at the point of submission:

- **Spending limits by category and role**: Define daily, weekly, monthly, and per-transaction limits for each expense category. Limits can vary by employee role, department, or seniority level. The system blocks submissions that exceed configured limits and provides clear messaging about the violated policy.
- **Per-diem rates**: Configure daily allowance rates by location (country, state, city) with automatic calculation based on travel dates. Support for full-day and partial-day rates, with configurable meal deduction rules when meals are provided.
- **Receipt requirements**: Set minimum amount thresholds that require receipt attachment. Configure different thresholds by category. The system enforces receipt requirements at submission, preventing expenses without required documentation from entering the approval pipeline.
- **Merchant restrictions**: Maintain approved and restricted merchant lists. Expenses from restricted merchants are flagged or blocked at submission. The system can suggest alternative approved merchants for common expense types.
- **Time-based rules**: Configure submission deadlines (e.g., expenses must be submitted within 30 days of transaction). Late submissions can trigger additional approval requirements or policy violations.

### 4. Approval Workflows

The approval system supports complex organizational approval requirements:

- **Multi-level approvals**: Configure up to 10 approval levels with different approvers at each level. Each level can have multiple approvers with configurable logic (all must approve, any one can approve, majority approval).
- **Conditional routing**: Route expenses to different approval paths based on amount, category, department, project, or custom fields. Conditions can be combined with AND/OR logic for complex routing rules.
- **Delegate approvers**: Approvers can designate delegates for periods of absence. Delegates have full approval authority and all actions are logged with both the original approver and delegate identified.
- **Auto-approval thresholds**: Expenses below configured thresholds can bypass manual approval and proceed directly to reimbursement processing. Thresholds can vary by category and employee role.
- **Approval reminders**: Configurable reminder notifications for pending approvals with escalation rules for overdue items. Approvals that remain pending beyond the configured deadline are automatically escalated to the next level.
- **Approval comments**: Approvers can add comments to approval actions, request additional information, or flag expenses for review. Comments are visible to the submitter and subsequent approvers.

### 5. Corporate Cards

Corporate card integration automates expense creation and reconciliation:

- **Card feed integration**: Real-time or batch integration with major corporate card providers. Card transactions automatically appear in the expense system within minutes of authorization.
- **Auto-create expenses**: The system creates draft expense records from card transactions, pre-populating available data (amount, date, merchant, category suggestion). Employees receive notifications to complete the expense by adding receipts and notes.
- **Reconciliation**: Automatic matching of card transactions to submitted expenses with configurable matching rules (exact amount, amount within tolerance, date range). Unmatched transactions are flagged for manual reconciliation.
- **Card controls**: Integration with card issuance platforms to set spend limits, category restrictions, and merchant blocks at the card level. Violations trigger real-time alerts to both the cardholder and finance team.

### 6. Mileage Tracking

Mileage tracking supports field teams and employees who drive for business purposes:

- **GPS tracking**: Mobile application tracks trips using GPS with configurable tracking modes (automatic, manual start/stop). Trip routes are recorded with start and end locations, distance, and duration.
- **Mileage rates**: Configure mileage reimbursement rates by vehicle type, region, or policy. The system supports different rates for the first X miles versus subsequent miles, matching IRS or organizational rate structures.
- **Trip purpose logging**: Employees log the business purpose, client/project, and category for each trip. The system can suggest purpose based on frequently visited locations.
- **Round-trip calculation**: Support for round-trip mileage calculation with the ability to exclude personal detours. The system calculates the shortest practical route between start and end points.

### 7. Per Diem

Per diem management handles daily allowance calculations for travel:

- **Daily rates by location**: Configure per diem rates by country, state, and city. The system supports importing standard rate tables (e.g., GSA rates for US government contractors) or custom organizational rates.
- **Partial day calculations**: Automatic proration for travel days that are not full days. Configurable rules for first and last day of travel rates.
- **Meal deductions**: When meals are provided (e.g., conference meals, client dinners), the system deducts the corresponding amount from the per diem allowance. Meal deduction rates are configurable by meal type and location.
- **Incidental expenses**: Support for incidental expense allowances separate from lodging and meals. Configurable rates and categories for incidental expenses.

### 8. Reimbursement

Reimbursement processing handles the payment of approved expenses to employees:

- **Batch processing**: Finance teams can process reimbursements in configurable batches by date range, department, or payment method. Batch processing includes validation checks to prevent duplicate payments.
- **Direct deposit integration**: Integration with banking systems for ACH/wire transfer reimbursement. Employee banking details are managed through the payroll system, eliminating the need for separate bank account management.
- **Payroll inclusion**: Approved reimbursements can be included in the next payroll run through integration with Flamingo Payroll. This leverages existing payment infrastructure and reduces the number of payment cycles.
- **Payment status tracking**: Employees can view the status of their reimbursements from approval through payment. Finance teams can track payment processing and identify delays.
- **Multi-method payments**: Support for multiple reimbursement methods including direct deposit, check, and corporate card credit. Organizations can configure default methods with employee overrides.

### 9. Analytics

The analytics module provides comprehensive spending visibility:

- **Spending trends**: Time-series analysis of spending by category, department, project, and employee. Configurable time periods (daily, weekly, monthly, quarterly, annually) with comparison to prior periods and budgets.
- **Category breakdowns**: Visual breakdowns of spending by expense category with drill-down to individual transactions. Pie charts, bar charts, and treemap visualizations for different analytical perspectives.
- **Policy violation reports**: Reports showing policy violations by type, frequency, and department. Trend analysis to identify recurring compliance issues and areas for policy adjustment.
- **Budget vs. actual**: Integration with budget data from Flamingo Spend to compare actual spending against budgeted amounts. Variance analysis with configurable alert thresholds for budget overruns.
- **Custom dashboards**: Drag-and-drop dashboard builder for creating custom analytics views. Pre-built templates for common use cases (CFO overview, department manager view, travel expense analysis).
- **Data export**: Export reports to PDF, Excel, and CSV formats. Scheduled report delivery via email for recurring reporting needs.

### 10. Multi-Currency

Multi-currency support handles international expenses:

- **Receipt in any currency**: Employees can submit expenses in any currency. The system recognizes currency from receipt OCR or manual entry.
- **Automatic conversion**: Real-time exchange rate lookup from configurable rate sources (central bank rates, market rates, organizational rates). Converted amounts are displayed in the organization's base currency.
- **Exchange rate locking**: At submission time, the exchange rate is locked and stored with the expense record. This ensures that the reimbursed amount matches the submitted amount regardless of rate fluctuations.
- **Historical rate lookup**: For expenses submitted after the transaction date, the system can use the exchange rate from the transaction date rather than the submission date.
- **Currency gain/loss tracking**: The system tracks exchange rate differences between transaction date and payment date for financial reporting purposes.

## User Stories

### 1. Employee Photographs Receipt and Submits Expense

**As an** employee who has just incurred a business expense, **I want to** photograph the receipt with my phone and submit the expense in under 60 seconds **so that** I can quickly return to my work without administrative burden.

**Acceptance Criteria:**
- The mobile app opens the camera with receipt-optimized settings
- OCR extracts merchant, amount, date, and tax within 3 seconds
- The employee can correct any OCR errors with inline editing
- Category is auto-suggested based on merchant and amount
- The expense is submitted with a single tap after confirming details
- A confirmation notification is received immediately

### 2. Manager Approves Team Expenses in Batch

**As a** manager with 15 direct reports, **I want to** review and approve multiple pending expenses in a single batch operation **so that** I can efficiently manage approvals without spending excessive time on each individual item.

**Acceptance Criteria:**
- The approval queue displays all pending expenses with key details visible
- The manager can filter by employee, date range, amount, and category
- Multi-select allows batch approval with a single action
- Individual expenses can be expanded for detailed review with receipt preview
- Rejection requires a comment explaining the reason
- Approval actions are recorded with timestamp and approver identity

### 3. Finance Sets Up Expense Policies with Limits

**As a** finance administrator, **I want to** configure expense policies with spending limits, category rules, and receipt requirements **so that** organizational spending controls are enforced automatically without manual review of every expense.

**Acceptance Criteria:**
- Policy rules can be defined by category, department, role, and amount range
- Rules support both advisory (warning) and enforcement (blocking) modes
- Policy changes take effect immediately for new submissions
- Existing draft expenses are not affected by policy changes
- A policy simulation tool shows how rules would apply to historical data
- Policy violations are logged for audit and reporting

### 4. Employee Tracks Mileage for Client Visits

**As a** sales representative who visits clients daily, **I want to** track my mileage using GPS and submit mileage expenses with trip details **so that** I am reimbursed accurately for business travel without manual odometer readings.

**Acceptance Criteria:**
- GPS tracking starts automatically when driving begins
- The employee can categorize trips as business or personal
- Business trips require client/project and purpose selection
- Mileage is calculated using the shortest practical route
- Configurable mileage rates are applied automatically
- The employee can review and edit trips before submission

### 5. CFO Reviews Department Spending Analytics

**As a** CFO, **I want to** view comprehensive spending analytics across all departments with trend analysis and budget comparisons **so that** I can make informed decisions about organizational spending and identify areas for cost optimization.

**Acceptance Criteria:**
- The dashboard displays total spending, month-over-month trends, and budget variance
- Spending can be analyzed by department, category, project, and time period
- Drill-down from summary views to individual transactions
- Budget vs. actual comparison with variance calculations
- Reports can be exported to PDF and Excel
- Data can be filtered by any dimension in the expense data model

### 6. Admin Configures Approval Routing Rules

**As a** system administrator, **I want to** configure multi-level approval workflows with conditional routing **so that** expenses are automatically routed to the correct approvers based on organizational structure and expense characteristics.

**Acceptance Criteria:**
- Approval levels can be defined with multiple approvers per level
- Routing conditions support amount, category, department, and custom fields
- Conditions can be combined with AND/OR logic
- Delegate approvers can be configured for absence coverage
- Auto-approval thresholds bypass manual approval for low-risk expenses
- The workflow builder provides a visual representation of approval paths

### 7. Employee Submits International Travel Expenses

**As an** employee returning from an international business trip, **I want to** submit expenses in multiple currencies with accurate conversion **so that** I am reimbursed the correct amount in my local currency.

**Acceptance Criteria:**
- Expenses can be entered in any currency
- Exchange rates are automatically applied from a configurable rate source
- The converted amount in the organization's base currency is displayed
- Exchange rates are locked at submission time
- Per diem rates for the destination city are automatically applied
- All currency conversions are documented for audit purposes

### 8. Finance Processes Monthly Reimbursement Batch

**As a** finance team member, **I want to** process all approved expenses in a monthly reimbursement batch **so that** employees receive their reimbursements efficiently and the process is documented for audit.

**Acceptance Criteria:**
- All approved, unprocessed expenses are included in the batch
- The batch can be filtered by date range, department, and payment method
- Validation checks prevent duplicate payments
- The batch can be exported for payment processing or included in payroll
- Payment status is tracked and visible to both finance and employees
- A batch summary report is generated for reconciliation

### 9. Auditor Reviews Expense Compliance

**As an** internal auditor, **I want to** review expense compliance including policy violations, approval chains, and documentation completeness **so that** I can verify organizational spending adheres to policies and regulations.

**Acceptance Criteria:**
- A compliance dashboard shows policy violation rates and trends
- Individual expenses can be reviewed with full audit trail
- Approval chain is documented with timestamps and comments
- Missing documentation is flagged with clear indicators
- Reports can be filtered by violation type, department, and time period
- Audit findings can be exported for reporting

### 10. Employee Views Reimbursement Status

**As an** employee awaiting reimbursement, **I want to** view the status of my submitted expenses from submission through payment **so that** I know when to expect reimbursement and can follow up on any delays.

**Acceptance Criteria:**
- Each expense displays its current status (draft, submitted, approved, processing, paid)
- Status changes trigger push and email notifications
- Estimated payment date is displayed based on approval date and payment cycle
- Payment details (method, reference number) are visible when payment is processed
- Historical expenses can be filtered by status, date range, and amount
- The employee can download expense details and receipts for personal records

## Wireframe Descriptions

### Expense Dashboard

The expense dashboard serves as the primary landing page for both employees and managers:

**Header Section:**
- User greeting with pending action count (e.g., "3 expenses need attention")
- Quick action buttons: "New Expense", "View Receipts", "Submit Report"
- Search bar for finding expenses by merchant, amount, date, or category

**Summary Cards (top row):**
- Total submitted this month (amount + count) with sparkline trend
- Pending approval count with average approval time
- Reimbursed this month (amount) with next payment date
- Policy violations (count) with severity indicator

**Recent Expenses List:**
- Scrollable list of recent expenses with receipt thumbnail, merchant, amount, date, category, and status badge
- Status badges use color coding: draft (gray), submitted (blue), approved (green), rejected (red), paid (purple)
- Swipe actions on mobile: edit, delete, duplicate
- Click to expand for full expense details

**Pending Approvals (manager view):**
- Count of pending approvals with oldest submission date
- List of pending expenses with employee name, amount, category, and receipt preview
- Inline approve/reject buttons with comment field for rejections
- "View All" link to full approval queue

**Spending Insights Sidebar:**
- Top spending categories this month (bar chart)
- Spending by department (donut chart)
- Month-over-month comparison (line chart)
- Link to full analytics page

### Submit Expense Form

The expense submission form prioritizes speed and minimal data entry:

**Receipt Upload Area:**
- Large drag-and-drop zone with camera icon for mobile
- "Take Photo", "Upload File", and "Forward Email" options
- After upload: processing indicator with OCR extraction progress
- Extracted data populates form fields automatically
- Receipt thumbnail remains visible during editing for reference

**Form Fields:**
- Amount: Pre-filled from OCR, currency selector, manual override
- Date: Pre-filled from OCR, calendar picker, manual override
- Merchant: Pre-filled from OCR, auto-complete from organizational merchant history
- Category: Auto-suggested, dropdown with search, hierarchy display (Travel > Ground Transportation)
- Description: Optional text field for additional context
- Project/Client: Optional selector for billable expense allocation
- Tags: Optional labels for custom reporting dimensions
- Receipt attachment: Shows uploaded receipt with option to add additional pages

**Policy Indicators:**
- Real-time policy validation as fields are populated
- Warning indicators for advisory policy violations (yellow)
- Error indicators for enforcement policy violations (red, blocks submission)
- Tooltip explanations for each policy violation

**Action Buttons:**
- "Save Draft" for incomplete expenses
- "Submit" for completed expenses (disabled if policy enforcement violations exist)
- "Save as Template" for frequently submitted expense types

### Approval Queue

The approval queue provides managers with an efficient interface for reviewing team expenses:

**Filter Bar:**
- Employee selector (multi-select)
- Date range picker
- Amount range (min/max)
- Category filter
- Status filter (pending, approved, rejected)
- Sort options (submission date, amount, employee name)

**Expense List:**
- Expandable rows showing expense details
- Each row displays: employee name, avatar, submission date, merchant, amount, category, receipt count
- Expandable section shows: full expense details, receipt images, policy compliance status, audit trail
- Bulk select checkbox for batch operations

**Action Panel:**
- "Approve Selected" button with confirmation
- "Reject Selected" button with required comment field
- "Request Info" button to ask submitter for additional details
- "Delegate" button to reassign to another approver

**Approval History:**
- Timeline view showing approval chain for selected expense
- Each approval step shows: approver, action (approved/rejected/delegated), timestamp, comments
- Visual indicator of current approval position in the workflow

### Policy Builder

The policy builder provides a rule configuration interface for finance administrators:

**Rule List:**
- List of existing policies with name, status (active/draft/archived), last modified date
- Quick toggle to enable/disable policies
- Search and filter by category, department, rule type

**Rule Configuration:**
- Rule name and description fields
- Scope selector: applies to all employees, specific departments, specific roles
- Category selector: which expense categories this rule applies to

**Conditions Panel:**
- Condition builder with dropdown selectors:
  - "When [amount] [is greater than] [threshold]"
  - "When [category] [is] [category]"
  - "When [merchant] [is in] [merchant list]"
  - "When [department] [is] [department]"
- Multiple conditions with AND/OR logic grouping
- Condition groups for complex rule combinations

**Actions Panel:**
- Action selector:
  - "Show warning" (advisory mode)
  - "Block submission" (enforcement mode)
  - "Require receipt"
  - "Require additional approval from [approver]"
  - "Require [document type]"
- Multiple actions per rule

**Preview/Simulation:**
- "Test Rule" button to simulate against historical data
- Shows how many past expenses would be affected
- Displays sample affected expenses for validation

### Reports Page

The reports page provides comprehensive spending analytics:

**Report Selector:**
- Pre-built report templates: Spending Summary, Category Analysis, Policy Compliance, Budget Variance, Employee Spending, Department Comparison
- Custom report builder option
- Saved reports list with scheduled delivery indicators

**Visualization Area:**
- Chart type selector: bar, line, pie, treemap, table
- Time period selector with comparison options (vs. prior period, vs. budget)
- Filter panel for dimensions (department, category, project, employee)
- Drill-down capability from summary to detail

**Spending Charts:**
- Monthly spending trend (line chart) with budget overlay
- Spending by category (horizontal bar chart) with percentage labels
- Spending by department (stacked bar chart) with drill-down
- Top spenders list (table) with amount and transaction count

**Export Options:**
- Export to PDF (formatted report with charts)
- Export to Excel (data tables with formulas)
- Export to CSV (raw data)
- Schedule recurring delivery via email
- Share report link with configured access controls

## Integration Points

### Books Integration

The integration with Flamingo Books is the deepest and most critical connection:

- **Auto-create expense journal entries**: When an expense is approved, the system automatically creates the corresponding journal entry in Books. The journal entry debits the expense account (mapped from the expense category) and credits the liability account for employee reimbursement payable.
- **Category-to-GL mapping**: Each expense category maps to one or more GL accounts. The mapping supports default accounts with overrides based on department, project, or cost center. This mapping is maintained in the Expense module and synchronized with Books.
- **Period synchronization**: Expense posting respects the accounting period calendar in Books. Expenses cannot be posted to closed periods. Period-end accruals can be created for approved but unpaid expenses.
- **Dimensional tagging**: Expenses tagged with department, project, cost center, or custom dimensions automatically populate the corresponding dimensions in the journal entry, enabling multi-dimensional financial reporting in Books.

### Payroll Integration

The integration with Flamingo Payroll handles reimbursement disbursement:

- **Include in payroll runs**: Approved reimbursements can be flagged for inclusion in the next payroll run. The payroll system includes the reimbursement amount as a separate line item on the employee's pay statement.
- **Employee banking details**: Reimbursement payment leverages the employee's existing banking details on file in Payroll, eliminating duplicate bank account management.
- **Tax treatment**: The system supports configuring whether reimbursements are taxable or non-taxable based on organizational policy and local regulations. Taxable reimbursements are included in payroll tax calculations.
- **Payment timing**: Reimbursement payment dates align with the payroll schedule. Employees can see estimated payment dates based on the next scheduled payroll run.

### Invoice Integration

The integration with Flamingo Invoice enables bill-back of client expenses:

- **Attach to client invoices**: Expenses tagged with a client or project can be attached to client invoices in the Invoice module. The expense amount is added to the invoice as a line item, with the original expense details available for client reference.
- **Markup support**: The system supports configurable markup on billable expenses (e.g., 10% markup on travel expenses). The markup amount is tracked separately for margin reporting.
- **Receipt attachment**: Original receipts can be attached to client invoices as supporting documentation, providing transparency to clients.
- **Approval workflow**: Billable expenses may require additional approval from the project manager or client account owner before being included on an invoice.

### Payments Integration

The integration with Flamingo Payments handles reimbursement processing:

- **Process reimbursements**: Approved reimbursements can be processed through the Payments module via ACH, wire transfer, or other configured payment methods.
- **Payment batch management**: The Payments module creates payment batches from approved expenses, with validation to prevent duplicate payments and overpayments.
- **Payment status synchronization**: Payment status updates from the Payments module are synchronized back to the Expense module, keeping employees informed of their reimbursement status.
- **Bank reconciliation**: Payment records in the Expense module are linked to bank transactions in the Payments module for reconciliation purposes.

### Spend Integration

The integration with Flamingo Spend provides budget context:

- **Feed expense data into budget tracking**: Actual expense data flows into the Spend module for budget vs. actual reporting. This provides real-time visibility into spending against budget without manual data entry.
- **Budget alerts**: When expense submissions would cause a department or category to exceed its budget threshold, the Spend module can trigger alerts to finance and department managers.
- **Forecast updates**: Expense trends from the Expense module are used by the Spend module to update spending forecasts, providing more accurate budget projections.
- **Budget availability check**: Before approving large expenses, managers can view the remaining budget for the relevant category and department through the Spend integration.

### ERP Integration

The integration with ERP systems handles enterprise-level data synchronization:

- **Department-level expense allocation**: Expense data can be allocated to departments, cost centers, and projects as defined in the ERP system. The allocation follows the organizational hierarchy configured in the ERP.
- **Master data synchronization**: Employee records, department structures, cost centers, and project codes are synchronized from the ERP system to the Expense module, ensuring consistency across systems.
- **Financial consolidation**: Expense data from the Expense module flows into the ERP system for financial consolidation and reporting. This includes journal entries, dimensional analysis, and intercompany allocations.
- **Approval hierarchy sync**: The organizational hierarchy and approval authorities defined in the ERP system are used to configure approval workflows in the Expense module.

### Procurement Integration

The integration with procurement systems prevents duplicate spending:

- **Link to purchase orders**: Expenses can be linked to purchase orders in the procurement system. This prevents the same goods or services from being purchased via both PO and expense report.
- **Receiving and matching**: When expenses are linked to POs, the system can match expense details to PO line items for three-way matching (PO, receipt, expense).
- **Spend visibility**: Finance teams can view total committed spend across both purchase orders and expenses, providing a complete picture of organizational spending.
- **Policy coordination**: Procurement policies and expense policies can be coordinated to ensure consistent spending controls regardless of the purchasing method used.