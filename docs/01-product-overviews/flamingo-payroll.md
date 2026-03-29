# Flamingo Payroll - Employee Salary and Payroll Processing

## Market Analysis

The payroll software market is highly competitive, with solutions ranging from lightweight tools for small businesses to enterprise-grade platforms handling complex multi-country payroll. Below is an analysis of the top competitors and how Flamingo Payroll positions against them.

### Competitive Landscape

**Competitor 1 — Leading Payroll Platform A**
A cloud-native payroll solution popular with SMBs. Offers automated payroll runs, basic tax filing, and direct deposit. Strengths include ease of setup and intuitive UI. Weaknesses include limited multi-state tax handling, basic reporting, and no native accounting integration. Pricing is per-employee-per-month.

**Competitor 2 — Enterprise HR Suite B**
A full HCM suite covering payroll, benefits, time tracking, and talent management. Strengths include deep enterprise features, global payroll support, and robust compliance. Weaknesses include high cost, lengthy implementation, and complexity for smaller organizations. Pricing is tiered with long-term contracts.

**Competitor 3 — Small Business Payroll C**
A simple payroll tool aimed at businesses with fewer than 50 employees. Offers automated tax filing, direct deposit, and basic benefits. Strengths include affordability and quick setup. Weaknesses include limited scalability, no contractor support, and minimal analytics. Pricing is a flat monthly fee plus per-employee charge.

**Competitor 4 — Global Payroll Platform D**
A multi-country payroll engine designed for distributed teams. Supports 100+ countries with localized tax compliance. Strengths include international coverage and contractor management. Weaknesses include limited US-specific features, higher per-employee cost, and dependency on local partners. Pricing is per-employee with country-specific tiers.

**Competitor 5 — HR-First Payroll Suite E**
An HR-centric platform where payroll is an add-on module. Covers recruitment, onboarding, performance, and payroll. Strengths include unified employee lifecycle management. Weaknesses include payroll features lagging behind dedicated solutions and complex configuration. Pricing bundles HR and payroll together.

**Competitor 6 — Accounting-Integrated Payroll F**
A payroll tool tightly integrated with a popular accounting platform. Offers automatic journal entry creation and expense syncing. Strengths include seamless accounting workflow. Weaknesses include vendor lock-in, limited standalone payroll features, and no native time tracking. Pricing is per-employee with accounting bundle discounts.

**Competitor 7 — Contractor-Focused Payroll G**
A platform specializing in contractor and freelancer payments. Offers global payouts, 1099 generation, and compliance classification. Strengths include contractor onboarding and international payments. Weaknesses include limited W-2 employee payroll and no benefits administration. Pricing is per-transaction or percentage-based.

### Competitive Differentiation for Flamingo Payroll

Flamingo Payroll differentiates through:

- **Unified Flamingo ecosystem**: Native integration with Books, Expense, Billing, ERP, Payments, and Spend eliminates data silos and manual reconciliation.
- **Flexible architecture**: Supports full-time employees, part-time workers, and contractors within a single platform.
- **Automated accounting sync**: Every payroll run automatically creates corresponding journal entries in Flamingo Books.
- **Modern developer experience**: Built on TypeScript, Bun, and Hono with a tRPC API layer, enabling rapid feature development and reliable type safety.
- **Transparent pricing**: Per-employee pricing with no long-term contracts, suitable for startups through mid-market companies.

### Feature Comparison Matrix

| Feature | Flamingo | C1 | C2 | C3 | C4 | C5 | C6 | C7 |
|---|---|---|---|---|---|---|---|---|
| Automated payroll runs | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Partial |
| Multi-state tax | Yes | Partial | Yes | No | Yes | Yes | Yes | No |
| Direct deposit | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| Benefits administration | Yes | Partial | Yes | Partial | No | Yes | No | No |
| W-2 / 1099 generation | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Partial |
| Contractor management | Yes | No | Yes | No | Yes | Partial | No | Yes |
| Accounting integration | Native | API | API | None | API | API | Native | API |
| Time tracking | Yes | Partial | Yes | No | No | Yes | No | No |
| Employee self-service | Yes | Yes | Yes | Partial | Yes | Yes | Yes | Partial |
| Global payroll | Planned | No | Yes | No | Yes | Yes | No | Yes |
| Analytics dashboard | Yes | Basic | Yes | No | Partial | Yes | Basic | No |
| API / webhooks | Yes | Yes | Partial | No | Yes | Partial | Yes | Yes |

## Core Features

### 1. Employee Management

Flamingo Payroll maintains a comprehensive employee database with the following capabilities:

- **Employee profiles**: Full name, contact information, emergency contacts, hire date, department, manager, cost center, and custom fields.
- **Employment types**: Full-time (salaried and hourly), part-time, seasonal, temporary, and independent contractor (1099).
- **Organizational hierarchy**: Department trees, reporting lines, and matrix management support for cross-functional teams.
- **Document storage**: I-9 verification documents, W-4 withholding certificates, direct deposit authorization forms, offer letters, and NDAs. Documents are stored securely with encryption at rest and role-based access controls.
- **Lifecycle events**: Onboarding checklist, status changes (active, leave, terminated), rehire processing, and offboarding workflows.
- **Bulk operations**: CSV import for mass employee creation, bulk salary adjustments, and batch document distribution.

### 2. Salary Structure

The salary engine supports complex compensation models:

- **Base salary**: Annual, monthly, or hourly rates with currency support.
- **Allowances**: Housing, transportation, meal, communication, education, and custom allowances with fixed or percentage-based amounts.
- **Deductions**: Pre-tax (retirement contributions, health insurance premiums, HSA) and post-tax (union dues, charitable giving, loan repayments) deductions.
- **Bonuses**: Sign-on bonuses, performance bonuses, retention bonuses, referral bonuses, and holiday bonuses with configurable tax treatment.
- **Overtime rules**: Configurable overtime multipliers (1.5x, 2x), daily vs. weekly overtime thresholds, and exempt/non-exempt classification.
- **Pay grades**: Defined salary bands with minimum, midpoint, and maximum values. Supports compa-ratio calculations and pay equity analysis.
- **Variable pay**: Commission structures, sales incentives, and profit-sharing calculations.

### 3. Pay Schedules

Flexible scheduling accommodates diverse organizational needs:

- **Weekly**: 52 pay periods per year. Common for hourly and trade workers.
- **Bi-weekly**: 26 pay periods per year. Most common in the US.
- **Semi-monthly**: 24 pay periods per year (typically 1st and 15th). Common for salaried employees.
- **Monthly**: 12 pay periods per year. Common for executive compensation and international payroll.
- **Custom schedules**: Configurable pay period start/end dates, pay dates, and cutoff times.
- **Multiple schedules**: Support for different pay schedules per employee group (e.g., hourly on bi-weekly, salaried on semi-monthly).
- **Holiday adjustments**: Automatic pay date advancement when pay dates fall on holidays or weekends.

### 4. Tax Calculation

A robust tax engine handles federal, state, and local tax obligations:

- **Federal withholding**: IRS Publication 15-T compliant calculations using percentage or wage bracket methods. Supports all filing statuses (single, married filing jointly, married filing separately, head of household).
- **State withholding**: All 50 states plus DC and US territories. Handles state-specific rules (e.g., Pennsylvania flat rate, North Dakota graduated rates).
- **Local taxes**: City and county taxes (e.g., New York City, Yonkers, school district taxes in Ohio and Pennsylvania).
- **FICA**: Social Security (6.2% up to wage base) and Medicare (1.45% + 0.9% Additional Medicare Tax for high earners).
- **FUTA**: Federal Unemployment Tax at 6% on first $7,000 with credit for state unemployment taxes.
- **Tax tables**: Automatically updated tax tables sourced from IRS and state revenue departments. Support for manual override with audit logging.
- **Year-end adjustments**: True-up calculations for under/withholding, supplemental wage handling, and stock option tax treatment.
- **Tax filing**: Automated quarterly filings (941, state unemployment returns) and annual filings (940, W-2, W-3).
- **Multi-state taxation**: Reciprocity agreements, resident vs. non-resident withholding, and work-location-based taxation for remote employees.

### 5. Benefits Administration

Comprehensive benefits management within the payroll workflow:

- **Health insurance**: Medical, dental, and vision plan enrollment with pre-tax premium deductions (Section 125 cafeteria plan compliance).
- **Retirement plans**: 401(k), 403(b), SIMPLE IRA, and SEP IRA with employer match calculations, vesting schedules, and contribution limit enforcement.
- **PTO accrual**: Configurable accrual policies (annual lump sum, per-pay-period, hours-worked-based). Tracks balances, carryover, and payout on termination.
- **Benefits enrollment**: Open enrollment workflows, qualifying life event processing, and dependent management.
- **HSA/FSA**: Health Savings Account and Flexible Spending Account contribution management with annual limit tracking.
- **Life and disability insurance**: Employer-paid and voluntary plans with imputed income calculations.
- **Commuter benefits**: Pre-tax transit and parking benefit administration.

### 6. Direct Deposit

Flexible payment distribution with bank-grade security:

- **Multiple accounts**: Employees can split deposits across up to 4 bank accounts.
- **Split deposits**: Fixed amount or percentage-based allocation to each account.
- **Pre-note verification**: Micro-deposit verification before first live deposit to validate account information.
- **ACH processing**: NACHA-compliant ACH file generation with configurable lead times (2-day and same-day ACH).
- **Pay cards**: Optional payroll debit cards for employees without bank accounts.
- **Paper checks**: Print-ready check generation with MICR encoding support.
- **Off-cycle payments**: Manual payment processing for bonuses, corrections, and terminations.
- **Payment holds**: Configurable hold periods for new employees and address changes.

### 7. Pay Stubs

Digital-first pay documentation:

- **Digital pay stubs**: Web and mobile accessible pay stubs with detailed earnings, deductions, tax withholdings, and year-to-date summaries.
- **Historical access**: Complete pay stub history available for the duration of employment plus 7 years post-termination.
- **PDF download**: Branded PDF pay stubs suitable for loan applications and verification purposes.
- **Notifications**: Email and push notification when new pay stubs are available.
- **Accessible formats**: Screen-reader compatible pay stub rendering.

### 8. Compliance

Automated compliance reduces risk and administrative burden:

- **W-2 generation**: Annual W-2 wage and tax statements with electronic delivery and SSA filing.
- **1099-NEC**: Non-employee compensation reporting for contractors paid $600 or more annually.
- **New hire reporting**: Automated state new hire reporting within required timeframes.
- **Garnishment processing**: Child support, tax levy, student loan, and creditor garnishment calculations with priority ordering and disposable income calculations.
- **ACA reporting**: 1095-C employer-provided health insurance coverage reporting.
- **EEO-1 reporting**: Equal Employment Opportunity workforce demographic reporting.
- **Audit trail**: Immutable payroll change log with user attribution and timestamp.
- **Record retention**: Configurable retention policies compliant with FLSA (3 years), IRS (4 years), and state requirements.

### 9. Time Integration

Seamless connection between time data and payroll:

- **Timesheet import**: Import timesheets from Flamingo time tracking, third-party systems, or manual CSV upload.
- **Overtime calculation**: Automatic overtime detection based on configurable rules (daily, weekly, California-style double-time).
- **PTO tracking**: Request, approval, and balance tracking for vacation, sick, personal, and custom leave types.
- **Schedule integration**: Import work schedules to validate timesheet entries.
- **Exception handling**: Flag missing punches, early/late arrivals, and schedule deviations for manager review.
- **Rounding rules**: Configurable punch rounding (e.g., round to nearest 15 minutes, 6-minute increment).

### 10. Self-Service Portal

Employee empowerment reduces HR administrative load:

- **Personal information**: Employees update contact details, emergency contacts, and tax withholding elections.
- **Direct deposit management**: Add, modify, or remove bank accounts with security verification.
- **Pay stub access**: View and download current and historical pay stubs.
- **Tax documents**: Access W-2, W-4, and state tax forms.
- **Benefits enrollment**: Self-service enrollment during open enrollment and qualifying life events.
- **PTO requests**: Submit, track, and manage time-off requests.
- **Document upload**: Submit required documents (I-9, direct deposit forms) electronically.
- **Mobile responsive**: Full functionality on mobile devices without a separate app.

## User Stories

### Story 1: HR Admin Adds New Employee

**As an** HR administrator, **I want to** add a new employee with salary details, tax information, and benefits enrollment, **so that** the employee is properly configured for their first pay run.

**Acceptance criteria:**
- Admin enters personal information (name, SSN, address, contact details).
- Admin selects employment type (full-time salaried at $85,000/year).
- Admin assigns department, manager, and cost center.
- Admin enters W-4 withholding elections (filing status, dependents, additional withholding).
- Admin uploads I-9 verification documents.
- Admin selects benefits (medical plan, 401(k) contribution at 5%).
- Admin configures direct deposit (primary account routing/account numbers).
- System validates all required fields and tax document completeness.
- Employee receives onboarding email with self-service portal access.

### Story 2: Payroll Manager Runs Monthly Payroll

**As a** payroll manager, **I want to** execute the monthly payroll run for all employees, **so that** everyone is paid accurately and on time.

**Acceptance criteria:**
- Manager selects pay period (March 1-31, 2026).
- System pulls approved timesheets and PTO records.
- System calculates gross pay (base salary + overtime + bonuses + allowances).
- System applies pre-tax deductions (health insurance, 401(k), HSA).
- System calculates federal, state, and local tax withholdings.
- System applies post-tax deductions (garnishments, union dues).
- System generates net pay for each employee.
- Manager reviews payroll summary with exception flags (unusual amounts, missing timesheets).
- Manager approves payroll and system initiates ACH processing.
- System creates journal entries in Flamingo Books.
- Manager downloads payroll register report.

### Story 3: Employee Views Pay Stub

**As an** employee, **I want to** view my current pay stub and download my W-2, **so that** I can verify my earnings and tax withholdings.

**Acceptance criteria:**
- Employee logs into self-service portal.
- Dashboard shows latest pay stub with net pay amount.
- Employee clicks pay stub to view detailed breakdown (earnings, deductions, taxes, YTD).
- Employee navigates to tax documents section.
- Employee downloads W-2 as PDF.
- Employee verifies W-2 data matches pay stub YTD totals.

### Story 4: Finance Approves Overtime Hours

**As a** finance manager, **I want to** review and approve overtime hours submitted by team managers, **so that** overtime costs are controlled and properly calculated.

**Acceptance criteria:**
- Finance manager sees pending overtime approvals dashboard.
- Manager reviews each overtime entry with employee name, date, hours, and calculated rate.
- Manager sees weekly total hours and daily breakdown.
- Manager can approve, deny, or request modification with comments.
- Approved overtime flows into next pay run calculation.
- System flags overtime exceeding configurable thresholds (e.g., >20 hours/week).

### Story 5: HR Configures Benefits Enrollment

**As an** HR benefits administrator, **I want to** set up the annual benefits enrollment period, **so that** employees can select their benefits for the upcoming plan year.

**Acceptance criteria:**
- Admin defines enrollment period (November 1-15, 2026).
- Admin configures available plans (3 medical tiers, 2 dental, vision, life insurance).
- Admin sets employer contribution amounts and employee cost shares.
- Admin assigns default plans for employees who do not make elections.
- System sends enrollment notification to all eligible employees.
- Employees complete enrollment through self-service portal.
- System validates enrollment elections and calculates new premium deductions.
- Admin reviews enrollment completion rates and sends reminders.
- Approved elections flow into next payroll cycle deductions.

### Story 6: Payroll Admin Processes Year-End W-2s

**As a** payroll administrator, **I want to** generate and distribute W-2 forms for all employees, **so that** employees can file their tax returns and we meet IRS deadlines.

**Acceptance criteria:**
- Admin initiates year-end processing wizard for tax year 2026.
- System reconciles all payroll runs against YTD totals.
- System identifies discrepancies (e.g., negative wages, excess Social Security withholding).
- Admin reviews and corrects flagged issues.
- System generates W-2 forms with all required boxes populated.
- Admin approves W-2s for electronic delivery.
- System sends W-2s to employee self-service portals.
- System generates W-3 transmittal and SSA electronic filing.
- System archives W-2 data per retention policy.

### Story 7: Employee Updates Direct Deposit

**As an** employee, **I want to** change my direct deposit account, **so that** my next paycheck goes to my new bank.

**Acceptance criteria:**
- Employee navigates to direct deposit settings in self-service portal.
- Employee enters new bank routing number and account number.
- System sends verification challenge (email or SMS code).
- Employee verifies identity and confirms change.
- System processes pre-note verification for new account.
- Employee receives confirmation and estimated first deposit date.
- System maintains previous account as fallback until new account is verified.
- Admin receives notification of direct deposit change.

### Story 8: Manager Approves Team Timesheets

**As a** department manager, **I want to** review and approve timesheets for my direct reports, **so that** accurate hours are recorded for payroll processing.

**Acceptance criteria:**
- Manager sees pending timesheets for all direct reports.
- Manager reviews daily hours, project codes, and total weekly hours.
- Manager identifies exceptions (missing days, overtime, early/late punches).
- Manager approves or returns timesheets with comments.
- Approved timesheets are locked and available for payroll processing.
- Employees are notified of approval or requested corrections.
- System enforces approval deadline aligned with pay schedule cutoff.

### Story 9: Finance Views Payroll Cost Analytics

**As a** finance director, **I want to** analyze payroll costs by department, cost center, and time period, **so that** I can make informed budgeting and workforce decisions.

**Acceptance criteria:**
- Director accesses payroll analytics dashboard.
- Dashboard shows total payroll cost, headcount, and average cost per employee.
- Director filters by department, location, employment type, and date range.
- Charts display payroll cost trend (monthly, quarterly, yearly).
- Table shows labor cost distribution by cost center with drill-down.
- Director compares budget vs. actual payroll spend.
- Director exports reports as CSV and PDF.
- System integrates payroll data with Flamingo Books for P&L analysis.

### Story 10: Admin Sets Up Multi-State Tax Withholding

**As a** payroll tax administrator, **I want to** configure tax withholding for employees working across multiple states, **so that** each employee's taxes are calculated correctly based on their work and resident locations.

**Acceptance criteria:**
- Admin assigns primary work state and resident state for each employee.
- System loads applicable state and local tax rules.
- Admin configures reciprocity agreements between states.
- System calculates withholding based on work-location rules (convenience vs. physical presence).
- Admin reviews tax calculations for multi-state employees.
- System allocates wages across states for employees working in multiple locations.
- Admin generates state-specific tax reports and filings.
- System tracks state unemployment insurance (SUI) wage bases per state.

### Story 11: HR Processes Employee Termination Payroll

**As an** HR administrator, **I want to** process a final paycheck for a terminated employee, **so that** the employee receives all owed compensation within legally required timeframes.

**Acceptance criteria:**
- Admin initiates termination workflow for employee.
- System calculates final pay including accrued PTO payout.
- System applies any outstanding deductions (equipment recovery, loan balances).
- System calculates severance if applicable.
- System handles COBRA notification triggers.
- System generates final pay stub with termination details.
- Admin selects payment method (direct deposit or live check).
- System deactivates employee access to self-service portal.
- System retains employee records per retention policy.

### Story 12: Admin Configures Garnishment Orders

**As a** payroll administrator, **I want to** set up court-ordered garnishments for an employee, **so that** deductions are calculated correctly and remitted to the appropriate agency.

**Acceptance criteria:**
- Admin enters garnishment order details (type, amount, agency, priority).
- System calculates disposable earnings after taxes and mandatory deductions.
- System applies federal and state garnishment limits.
- System handles multiple garnishment priority ordering.
- System generates garnishment remittance checks or electronic payments.
- Admin views garnishment register with amounts owed and paid.
- System tracks garnishment balances and completion.
- System notifies admin when garnishment is satisfied or order is modified.

## Wireframe Descriptions

### Payroll Dashboard

The primary landing page for payroll administrators provides an at-a-glance view of payroll operations:

- **Header**: "Payroll" title with current company name and payroll period selector.
- **Key metrics row** (4 cards):
  - Next pay date with countdown (e.g., "March 31, 2026 — 2 days").
  - Total active employees count with breakdown (full-time, part-time, contractor).
  - Estimated next payroll cost with variance from previous period.
  - Pending approvals count (timesheets, overtime, garnishments).
- **Quick actions bar**: "Run Payroll", "Add Employee", "View Reports", "Tax Filing" buttons.
- **Recent activity feed**: Chronological list of payroll events (pay runs completed, employee changes, tax filings submitted).
- **Upcoming deadlines**: Next tax filing due dates, benefits enrollment close dates, year-end processing timeline.
- **Exception alerts**: Employees with missing timesheets, tax document expirations, garnishment orders requiring setup.
- **Cost trend chart**: 12-month payroll cost trend with budget overlay.

### Employee List

A comprehensive employee directory with powerful search and filtering:

- **Search bar**: Full-text search across name, email, employee ID, and department.
- **Filter panel**: Employment type, department, location, status (active, leave, terminated), hire date range.
- **Column headers**: Employee name, employee ID, department, job title, employment type, annual salary/hourly rate, hire date, status, actions.
- **Row actions**: View profile, edit, run off-cycle payment, generate report, deactivate.
- **Bulk actions**: Select multiple employees for bulk updates (department transfer, salary adjustment, benefit changes).
- **Pagination**: Configurable page size (25, 50, 100) with total count.
- **Export**: CSV export of filtered employee list.
- **Column sorting**: Click any column header to sort ascending/descending.

### Pay Run Wizard

A step-by-step guided workflow for processing payroll:

**Step 1 — Select Period**
- Pay schedule selector (bi-weekly, semi-monthly, etc.).
- Pay period start/end date picker.
- Pay date selector with holiday adjustment warning.
- Employee group filter (all, department, location).
- "Include off-cycle payments" toggle.

**Step 2 — Review Hours**
- Table of all employees with regular hours, overtime hours, PTO hours.
- Color-coded flags: green (approved), yellow (pending), red (missing).
- Inline editing for corrections (with manager approval workflow).
- Total hours summary by type.

**Step 3 — Calculate**
- Gross-to-net calculation preview for each employee.
- Expandable rows showing earnings breakdown, deductions, and tax withholdings.
- Exception panel: employees with unusual amounts (>20% variance from previous period).
- Employer cost summary (employer FICA, FUTA, SUI, benefits contributions).

**Step 4 — Approve**
- Summary dashboard: total gross pay, total taxes, total deductions, total net pay, employer cost.
- Comparison to previous period.
- Approve button with electronic signature / two-factor authentication.
- Routing for multi-level approval if configured.

**Step 5 — Process**
- ACH file generation status.
- Journal entry creation confirmation (linked to Flamingo Books).
- Email notification to employees with pay stub links.
- Payroll register PDF download.
- Post-run actions: view reports, schedule next run, file amendments.

### Employee Profile

A tabbed interface for comprehensive employee management:

**Tab 1 — Personal Info**
- Contact details (email, phone, address).
- Emergency contacts.
- Employment details (hire date, department, manager, cost center).
- Demographic information (optional, for EEO reporting).
- Document upload area.

**Tab 2 — Compensation**
- Current salary/hourly rate with effective date and history.
- Allowances and recurring bonuses.
- Pay grade and band position.
- Compensation change history with approval chain.

**Tab 3 — Tax**
- Federal W-4 elections.
- State withholding forms.
- Local tax elections.
- Tax calculation preview tool.
- Year-to-date tax summary.

**Tab 4 — Benefits**
- Enrolled plans with coverage levels and costs.
- Beneficiary designations.
- PTO balances by type.
- Retirement contribution rate and vesting status.
- Benefits change history.

**Tab 5 — Direct Deposit**
- Bank accounts with masked account numbers.
- Deposit allocation (amount or percentage per account).
- Verification status.
- Deposit history.

**Tab 6 — Pay History**
- Chronological list of pay stubs.
- Click to expand for detailed breakdown.
- Download individual or bulk pay stubs as PDF.
- Year-to-date summary chart.

**Tab 7 — Documents**
- Uploaded documents categorized by type.
- Expiration tracking with alerts.
- Document version history.

### Reports

A reports hub with categorized report templates:

**Payroll Reports**
- Payroll summary: Period-by-period gross pay, taxes, deductions, net pay.
- Payroll register: Detailed employee-level payroll data for each run.
- Payroll cost by department: Labor cost allocation across departments and cost centers.
- Off-cycle payments: Manual and correction payments outside regular runs.

**Tax Reports**
- Tax liability summary: Federal, state, and local tax obligations by period.
- Quarterly tax filing: 941, state unemployment returns with line-by-line detail.
- Tax deposit schedule: Federal tax deposit requirements and payment history.
- Multi-state tax allocation: Wage and tax allocation for employees working across states.

**Compliance Reports**
- W-2 preview and reconciliation: Year-end W-2 data validation.
- 1099 summary: Contractor payments and 1099-NEC generation.
- Garnishment register: Active garnishment orders and payment history.
- New hire report: State new hire reporting status and submissions.

**Analytics Reports**
- Labor cost trend: Monthly, quarterly, and annual payroll cost trends.
- Headcount report: Employee count by type, department, location over time.
- Overtime analysis: Overtime hours and costs by department and employee.
- Benefits cost summary: Employer and employee benefits cost breakdown.
- Pay equity analysis: Salary distribution by role, department, and demographics.

All reports support:
- Date range selection.
- Department, location, and employee type filters.
- Export to CSV, PDF, and Excel.
- Scheduled delivery via email.
- Saved custom report configurations.

## Integration Points

### Flamingo Books (Accounting)

Payroll is a significant accounting event. Flamingo Payroll creates automated journal entries in Flamingo Books for every pay run:

- **Salary expense**: Debit salary expense accounts by department/cost center.
- **Tax liability**: Credit federal tax payable, state tax payable, FICA payable accounts.
- **Benefits liability**: Credit benefits payable accounts for employer contributions.
- **Net pay**: Credit cash/bank account for total net pay disbursed.
- **Employer taxes**: Debit payroll tax expense, credit FUTA/SUI payable accounts.
- **Garnishment liability**: Credit garnishment payable for amounts withheld.
- **PTO accrual**: Adjust PTO liability accounts based on accrual and usage.

Integration details:
- Journal entries are created automatically upon payroll approval.
- Entries are mapped to Chart of Accounts through configurable account mapping.
- Department and cost center allocations flow through to GL segments.
- Reversal entries for voided payroll runs.
- Real-time sync status visible in both Payroll and Books dashboards.

### Flamingo Expense (Reimbursements)

Approved employee expense reimbursements are included in payroll disbursements:

- **Reimbursement import**: Approved expenses from Flamingo Expense are queued for next pay run.
- **Separate line items**: Reimbursements appear as distinct line items on pay stubs (non-taxable).
- **Receipt linkage**: Pay stub reimbursement entries link back to original expense reports in Expense.
- **Timing control**: Admins can defer reimbursements to subsequent pay periods if needed.
- **Accounting sync**: Reimbursement journal entries created in Books with proper expense categorization.

### Flamingo Billing (Contractor Payments)

Subscription and milestone-based contractor payments sync from Billing:

- **Invoice sync**: Approved contractor invoices from Billing flow into Payroll for payment.
- **1099 tracking**: Payments tracked against 1099-NEC thresholds with automatic reporting.
- **Payment scheduling**: Align contractor payments with regular payroll runs or process as off-cycle.
- **Currency handling**: Multi-currency contractor payments with exchange rate calculations.
- **Contractor self-service**: Contractors access payment history and 1099 forms through a limited self-service portal.

### Flamingo ERP (HR Module)

Employee and organizational data synchronize with the ERP HR module:

- **Employee master data**: Hire dates, terminations, department transfers, and job changes sync bidirectionally.
- **Cost allocation**: Department and cost center structures defined in ERP are used for payroll allocation.
- **Budget integration**: Actual payroll costs compared against ERP budget allocations.
- **Approval workflows**: ERP-defined approval chains applied to payroll sign-off.
- **Position management**: Headcount and vacancy data from ERP inform payroll forecasting.

### Flamingo Payments (Direct Deposit Processing)

Direct deposits are processed through Flamingo Payments:

- **ACH file generation**: Payroll generates NACHA-formatted ACH files submitted to Payments for processing.
- **Payment status tracking**: Real-time deposit status (pending, processing, settled, returned) visible in Payroll dashboard.
- **Return handling**: Returned deposits trigger automatic notifications and reprocessing workflows.
- **Same-day ACH**: Support for same-day ACH processing for urgent off-cycle payments.
- **Multi-bank support**: ACH origination through multiple banking partners for redundancy.

### Flamingo Spend (Budget Tracking)

Payroll costs are tracked as a budget category within Flamingo Spend:

- **Budget allocation**: Payroll budget defined by department, cost center, and time period in Spend.
- **Actual vs. budget**: Real-time comparison of actual payroll costs against budgeted amounts.
- **Forecasting**: Payroll cost projections based on current headcount, approved hires, and scheduled raises.
- **Alerts**: Notifications when payroll spend exceeds budget thresholds.
- **Variance reporting**: Detailed variance analysis by department and cost center for finance review.

## Data Model (Key Entities)

The following entities form the core data model for Flamingo Payroll:

- **Employee**: Core employee record with personal, employment, and compensation data.
- **PaySchedule**: Defines pay frequency, period dates, and pay dates.
- **PayRun**: Represents a single payroll execution with status, totals, and timestamps.
- **PayStub**: Employee-level pay detail for a specific pay run.
- **EarningLine**: Individual earnings entry (salary, overtime, bonus) on a pay stub.
- **DeductionLine**: Individual deduction entry (benefits, garnishment) on a pay stub.
- **TaxLine**: Tax withholding breakdown (federal, state, local, FICA) on a pay stub.
- **SalaryStructure**: Defines compensation components for an employee.
- **TaxProfile**: Employee federal, state, and local tax elections.
- **DirectDeposit**: Bank account and allocation rules for an employee.
- **BenefitsEnrollment**: Active benefit elections and coverage details.
- **GarnishmentOrder**: Court-ordered deduction with priority and limits.
- **Timesheet**: Approved time records for a pay period.
- **PTOBalance**: Leave accrual and usage tracking by type.
- **JournalEntry**: Accounting entry created in Flamingo Books for a pay run.
- **TaxFiling**: Quarterly and annual tax filing records with submission status.

## Technical Considerations

### Architecture

- **Backend**: Hono API server on Bun runtime with tRPC procedure layer.
- **Database**: PostgreSQL 16 via Drizzle ORM with strict schema validation.
- **Queue**: BullMQ for asynchronous payroll processing (ACH generation, journal entries, notifications).
- **Auth**: Better Auth for role-based access control (HR admin, payroll manager, employee).
- **Validation**: Zod schemas for all input validation with Effect for complex error handling.

### Security

- **SSN encryption**: Social Security numbers encrypted at rest using AES-256.
- **Bank account masking**: Account numbers displayed with only last 4 digits.
- **Audit logging**: Immutable audit trail for all payroll actions with user attribution.
- **Role-based access**: Granular permissions for viewing, editing, and approving payroll.
- **MFA**: Multi-factor authentication required for payroll approval and sensitive operations.
- **Data retention**: Configurable retention policies with automated purge workflows.

### Performance

- **Payroll run processing**: Target <30 seconds for 500-employee payroll run.
- **ACH file generation**: Target <10 seconds for 500-employee ACH file.
- **Report generation**: Target <5 seconds for standard reports with up to 10,000 records.
- **Concurrent pay runs**: Support for parallel pay runs across different pay schedules.

### Compliance

- **IRS**: Publication 15-T withholding calculations, quarterly 941, annual 940, W-2/W-3.
- **State**: State withholding tables, unemployment insurance, new hire reporting.
- **NACHA**: ACH file format compliance for direct deposit processing.
- **FLSA**: Overtime calculation rules, minimum wage verification.
- **ACA**: Applicable Large Employer reporting (1094-C, 1095-C).
- **GDPR/CCPA**: Employee data privacy controls for applicable jurisdictions.

## Success Metrics

| Metric | Target | Measurement |
|---|---|---|
| Payroll accuracy rate | 99.95% | Error-free pay stubs / total pay stubs |
| On-time payroll delivery | 100% | Pay runs completed before pay date |
| Tax filing accuracy | 100% | Zero IRS/state penalty notices |
| Employee self-service adoption | 80%+ | Employees using portal / total employees |
| Time to run payroll | <30 min | Average end-to-end payroll processing time |
| Support ticket rate | <2% | Payroll tickets / total employees per month |
| System uptime | 99.9% | Payroll system availability |

## Development Phases

### Phase 1 — Foundation (MVP)
- Employee management (CRUD, profiles, documents).
- Salary structure and pay schedules.
- Basic tax calculation (federal + 50 states).
- Pay run execution with gross-to-net calculation.
- Direct deposit (ACH generation).
- Digital pay stubs.
- Integration with Flamingo Books (journal entries).

### Phase 2 — Compliance & Benefits
- W-2 and 1099 generation with electronic filing.
- Benefits administration (health, dental, vision, retirement).
- Garnishment processing.
- Multi-state tax reciprocity.
- New hire reporting.
- ACA reporting.
- Employee self-service portal (pay stubs, tax forms, direct deposit).

### Phase 3 — Advanced Features
- Time and attendance integration.
- PTO accrual and management.
- Advanced analytics and reporting.
- Multi-level approval workflows.
- Off-cycle payroll processing.
- Contractor management and 1099 workflows.
- Integration with Flamingo Expense and Billing.

### Phase 4 — Scale & Optimization
- International payroll support (Canada, UK, EU).
- Payroll cost forecasting and budgeting.
- AI-powered anomaly detection in payroll data.
- Advanced scheduling (multiple concurrent pay schedules).
- Custom report builder.
- Webhook and API extensibility.
- White-label payroll for Flamingo platform customers.

---

*Document version: 1.0*
*Last updated: 2026-03-29*
*Owner: Flamingo Product Team*