# Unified Dashboard Design

## Overview

This document defines the design specifications for the Flamingo Business Suite unified dashboard—the first screen users see after login. The dashboard serves as the central command center, providing a unified view across all 15 Flamingo products while enabling seamless navigation to specific products.

---

## Design Principles

### 1. Clarity Over Complexity
- Show only what matters most to the user's role
- Use progressive disclosure for detailed information
- Avoid information overload with smart defaults

### 2. Action-Oriented
- Every metric should enable a decision or action
- Surface pending actions prominently
- Provide quick actions for common tasks

### 3. Personalization
- Role-based default views
- User-customizable widgets and layouts
- AI-powered recommendations based on usage patterns

### 4. Performance
- Load dashboard in <2 seconds
- Lazy load below-fold content
- Optimistic UI updates for interactions

### 5. Consistency
- Unified design language across all products
- Consistent navigation patterns
- Standardized widget components

---

## Dashboard Layout

### Initial Login Flow

**Step 1: Authentication**
```
┌─────────────────────────────────────────┐
│                                         │
│           Flamingo Logo                 │
│                                         │
│     Email: [________________]           │
│     Password: [________________]        │
│                                         │
│     [ ] Remember me                     │
│     [      Sign In      ]               │
│                                         │
│     Forgot password? | SSO Login        │
│                                         │
└─────────────────────────────────────────┘
```

**Step 2: Post-Login Landing (Unified Dashboard)**
```
┌─────────────────────────────────────────────────────────────────┐
│ Flamingo  [Search across all products...]    🔔 (3)  👤 Jane Doe│
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                                                           │ │
│  │                    Jane Doe                               │ │
│  │              CFO @ Acme Corporation                       │ │
│  │                                                           │ │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐        │ │
│  │  │  $2.4M  │ │  +18%   │ │   45    │ │  92%    │        │ │
│  │  │  Cash   │ │  MRR    │ │  Tasks  │ │  Margin │        │ │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘        │ │
│  │                                                           │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  Quick Access                                                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────┐ │
│  │ 📊 Books │ │ 📦 Inv.  │ │ 💰 Pay   │ │ 📝 Sign  │ │ +11  │ │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────┘ │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  Action Items (8 pending)                          [View All →]│
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ ⚠ Approve invoice #INV-2026-0045 ($12,500) - Over limit  │ │
│  │ 📋 Review expense reports (3 pending)                     │ │
│  │ 💳 Payment failed: Customer ABC Corp ($5,000)            │ │
│  │ ✍️  Document awaiting signature: Lease Agreement          │ │
│  │ 📦 Low stock alert: Product XYZ (12 remaining)           │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  Financial Overview                                             │
│  ┌────────────────────────────┬──────────────────────────────┐ │
│  │                            │                              │ │
│  │   Cash Flow Trend          │   Revenue by Product        │ │
│  │   [Line Chart]             │   [Donut Chart]             │ │
│  │                            │                              │ │
│  └────────────────────────────┴──────────────────────────────┘ │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  Recent Activity                                    [View All →]│
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ 10:42 AM  Payment received: Invoice #INV-2026-0042       │ │
│  │ 10:30 AM  Expense approved: John Smith - Travel ($450)   │ │
│  │ 10:15 AM  New order: Order #ORD-45678 ($2,300)           │ │
│  │ 09:58 AM  Document signed: Service Agreement - ABC Corp  │ │
│  │ 09:30 AM  Bill entered: Vendor XYZ - Office Supplies     │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Component Specifications

### 1. Header Bar

**Structure:**
```typescript
interface HeaderBar {
  logo: LogoComponent;
  search: GlobalSearch;
  notifications: NotificationBell;
  profile: ProfileMenu;
}
```

**Specifications:**
- **Height**: 64px
- **Background**: White (#FFFFFF) with subtle shadow
- **Logo**: Flamingo logo, clickable → returns to dashboard
- **Search**: Expands on focus, shows recent searches and suggestions
- **Notifications**: Badge count for unread, dropdown with notifications
- **Profile**: Avatar + name dropdown (Profile, Settings, Sign Out)

**Search Behavior:**
```
Initial State: [Search across all products...]
On Focus:
┌─────────────────────────────────────────────────┐
│ 🔍 [User starts typing...]                      │
├─────────────────────────────────────────────────┤
│ Recent Searches                                 │
│ • Invoice #1234                                 │
│ • ABC Corporation                               │
│ • Q4 Revenue Report                             │
├─────────────────────────────────────────────────┤
│ Suggestions                                     │
│ • Create Invoice                                │
│ • Add Expense                                   │
│ • Run Payroll                                   │
└─────────────────────────────────────────────────┘
```

### 2. User Profile Card

**Purpose**: Centered display of user identity and organization context

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                      [Avatar]                           │
│                    Jane Doe                             │
│              CFO @ Acme Corporation                     │
│                                                         │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌────────┐ │
│  │  $2.4M    │ │   +18%    │ │    45     │ │  92%   │ │
│  │  Cash     │ │   MRR     │ │   Tasks   │ │ Margin │ │
│  │  Position │ │   Growth  │ │  Pending  │ │        │ │
│  └───────────┘ └───────────┘ └───────────┘ └────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Metrics Display:**
- **Dynamic based on role**: CFO sees financial metrics, Sales sees pipeline, etc.
- **Comparison**: Show vs. previous period or vs. target
- **Trend indicators**: ↑ ↓ → with color coding
- **Clickable**: Each metric links to detailed view

**Role-Based Metric Presets:**

**CFO/Finance:**
- Cash Position
- MRR/ARR
- DSO (Days Sales Outstanding)
- Gross Margin %

**COO/Operations:**
- Order Fulfillment Rate
- Inventory Turnover
- On-Time Delivery %
- Operational Efficiency Score

**Sales Leader:**
- Pipeline Value
- Quota Attainment %
- Win Rate
- Average Deal Size

**HR Director:**
- Headcount
- Utilization Rate
- Time-Off Balance
- Employee NPS

### 3. Product Separator Line

**Design:**
- **Type**: Horizontal rule with subtle styling
- **Color**: Light gray (#E5E7EB)
- **Thickness**: 1px
- **Margin**: 32px top and bottom
- **Full width**: Edge to edge of content area

**Purpose:**
- Visual separation between personal context and product access
- Creates clear information hierarchy
- Provides visual breathing room

### 4. Quick Access (Product Grid)

**Layout:**
```
Quick Access
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│              │ │              │ │              │ │              │
│   📊 Books   │ │   📦 Inventory│ │   💰 Payroll │ │   ✍️  Sign   │
│              │ │              │ │              │ │              │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   💳 Billing │ │   🛒 Commerce│ │   👔 Practice│ │   📄 Invoice │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  🛒 Checkout │ │  💸 Payments │ │  📊 Spend    │ │   🏢 ERP     │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
┌──────────────┐ ┌──────────────┐
│  📋 Procure  │ │      +11     │
└──────────────┘ └──────────────┘
```

**Specifications:**
- **Grid**: 4 columns on desktop, 2 on tablet, 1 on mobile
- **Card Size**: 200px × 120px
- **Icon**: 48px × 48px, centered
- **Label**: Below icon, 14px, medium weight
- **Hover State**: Subtle lift (4px translateY), shadow increase
- **Active State**: Border highlight with brand color

**Product Ordering:**
1. **AI-Sorted**: Based on user's frequency and recency of use
2. **Pinned**: User can pin favorites to top
3. **Recent**: Show last 5 accessed products prominently
4. **All Products**: Expandable grid showing all 15 products

**Product Icons:**
- Consistent style across all products
- Distinctive color per product
- Recognizable at small sizes
- Accessible (meet WCAG contrast requirements)

### 5. Action Items Widget

**Purpose**: Aggregate pending actions from all products requiring user attention

**Layout:**
```
Action Items (8 pending)                              [View All →]
┌─────────────────────────────────────────────────────────────────┐
│ ⚠ Approve invoice #INV-2026-0045 ($12,500) - Over limit       │
│   From: John Smith | Due: Today | [Approve] [Reject] [Comment]│
├─────────────────────────────────────────────────────────────────┤
│ 📋 Review expense reports (3 pending)                           │
│   From: Multiple employees | Total: $2,450 | [Review]          │
├─────────────────────────────────────────────────────────────────┤
│ 💳 Payment failed: Customer ABC Corp ($5,000)                  │
│   Invoice: #INV-2026-0038 | [Retry] [Contact] [Write Off]     │
├─────────────────────────────────────────────────────────────────┤
│ ✍️  Document awaiting signature: Lease Agreement                │
│   From: Legal Dept | Sent: 2 days ago | [Sign] [View]         │
├─────────────────────────────────────────────────────────────────┤
│ 📦 Low stock alert: Product XYZ (12 remaining)                 │
│   Reorder point: 20 | Lead time: 14 days | [Reorder] [Dismiss]│
└─────────────────────────────────────────────────────────────────┘
```

**Action Types:**
- **Approvals**: Invoices, expenses, journals, time-off
- **Reviews**: Reports, reconciliations, audits
- **Failures**: Payment failures, sync errors, validation errors
- **Signatures**: Documents awaiting signature
- **Alerts**: Inventory, budget, compliance alerts

**Priority Levels:**
- **Urgent** (Red): Requires immediate attention (payment failures, compliance deadlines)
- **High** (Orange): Should address today (over-limit approvals)
- **Medium** (Yellow): This week (standard approvals)
- **Low** (Blue): When convenient (informational alerts)

**Inline Actions:**
- Common actions available without leaving dashboard
- Approve/Reject with optional comment
- Quick links to full context
- Dismiss/snooze options

### 6. Financial Overview Widgets

**Cash Flow Trend (Line Chart)**
```
Cash Flow Trend (Last 12 Months)
┌─────────────────────────────────────────────────────────────┐
│ $3M ┤                              ╭──                      │
│     │                         ╭───╯  ╰──╮                   │
│ $2M ┤                    ╭───╯          ╰──╮                │
│     │               ╭───╯                 ╰───╮             │
│ $1M ┤          ╭───╯                           ╰───╮         │
│     │     ╭───╯                                    ╰──      │
│ $0  ┴─────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴──  │
│     Jan  Feb  Mar  Apr  May  Jun  Jul  Aug  Sep  Oct  Nov Dec│
│                                                                 │
│     ─── Inflows  ┈┈┈ Outflows                                 │
└─────────────────────────────────────────────────────────────┘
```

**Revenue by Product (Donut Chart)**
```
Revenue by Product (YTD)
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    ┌─────────────┐                          │
│                ╱───┤             ├───╲                      │
│              ╱     │   Flamingo  │     ╲                    │
│            ╱       │    45%      │       ╲                  │
│           │        │             │        │                 │
│           │  Books │             │ Invoice│                 │
│           │  25%   │             │  20%   │                 │
│            ╲       │             │       ╱                  │
│              ╲     │             │     ╱                    │
│                ╲───┤             ├───╱                      │
│                    └─────────────┘                          │
│                                                             │
│  ━ Books (45%)  ━ Invoice (20%)  ━ Commerce (10%)          │
└─────────────────────────────────────────────────────────────┘
```

### 7. Recent Activity Feed

**Purpose**: Chronological stream of significant events across all products

**Layout:**
```
Recent Activity                                    [View All →]
┌─────────────────────────────────────────────────────────────┐
│ 10:42 AM  💰  Payment received: Invoice #INV-2026-0042     │
│           ABC Corporation | $8,500 | [View Invoice]        │
├─────────────────────────────────────────────────────────────┤
│ 10:30 AM  📋  Expense approved: John Smith - Travel        │
│           $450 | Conference attendance | [View Report]     │
├─────────────────────────────────────────────────────────────┤
│ 10:15 AM  🛒  New order: Order #ORD-45678                  │
│           XYZ Ltd | $2,300 | 3 items | [View Order]        │
├─────────────────────────────────────────────────────────────┤
│ 09:58 AM  ✍️   Document signed: Service Agreement           │
│           ABC Corp | Signed by: Jane Smith | [View Doc]    │
├─────────────────────────────────────────────────────────────┤
│ 09:30 AM  📦  Bill entered: Vendor XYZ - Office Supplies   │
│           $320 | Due: Net 30 | [View Bill]                 │
└─────────────────────────────────────────────────────────────┘
```

**Activity Types:**
- **Financial**: Payments received, bills entered, journals posted
- **Sales**: Orders placed, invoices sent, deals closed
- **Operations**: Inventory updates, shipments, receipts
- **HR**: Hires, terminations, time-off approvals
- **Documents**: Created, signed, shared
- **System**: Integrations, imports, exports

**Filtering:**
- By product (Books, Inventory, Payroll, etc.)
- By type (Financial, Sales, Operations, etc.)
- By date range (Today, This Week, This Month)
- By person (Specific team members)

---

## Responsive Design

### Desktop (≥1280px)
- 4-column product grid
- Full dashboard with all widgets visible
- Side-by-side charts in financial overview
- Expanded activity feed (10 items)

### Tablet (768px - 1279px)
- 2-column product grid
- Stacked charts in financial overview
- Condensed activity feed (5 items)
- Collapsible action items

### Mobile (<768px)
- 1-column product grid (scrollable horizontally)
- Single column layout for all widgets
- Prioritized content (actions first, then metrics)
- Simplified activity feed (3 items, "View All" link)

---

## Customization Options

### Widget Management

**Show/Hide Widgets:**
- User can toggle visibility of each widget
- Hidden widgets available in "Add Widget" menu
- Minimum required widgets (can't hide Action Items)

**Widget Ordering:**
- Drag-and-drop to reorder widgets
- Snap-to-grid alignment
- Save layout preferences per user

**Widget Sizing:**
- Small: 1×1 grid unit
- Medium: 2×1 grid units (default)
- Large: 2×2 grid units
- Full width: Full container width

### Metric Customization

**Choose Metrics:**
- Select which metrics appear in profile card
- Set targets for each metric
- Choose comparison (vs. prior period, vs. target, vs. forecast)

**Alert Thresholds:**
- Configure when metrics trigger alerts
- Set warning and critical thresholds
- Choose notification channels

---

## Performance Requirements

### Load Time Targets
- **First Contentful Paint**: <1.5 seconds
- **Time to Interactive**: <2.5 seconds
- **Dashboard Complete**: <3 seconds

### Optimization Strategies
- **Lazy Loading**: Load below-fold widgets after initial render
- **Skeleton Screens**: Show placeholder while data loads
- **Optimistic Updates**: Update UI immediately, reconcile with server
- **Caching**: Cache frequently accessed data (Redis)
- **Pagination**: Load more activity items on demand

### Data Refresh
- **Real-time**: Action items, notifications (WebSocket)
- **Every 5 minutes**: Metrics, charts
- **On-demand**: User-initiated refresh
- **Background sync**: Keep data fresh without user action

---

## Accessibility Requirements

### WCAG 2.2 AA Compliance

**Keyboard Navigation:**
- All interactive elements accessible via keyboard
- Visible focus indicators
- Logical tab order
- Skip links for main content

**Screen Reader Support:**
- Semantic HTML structure
- ARIA labels for icons and interactive elements
- Live regions for dynamic content (notifications)
- Alternative text for images and charts

**Visual Accessibility:**
- Minimum contrast ratio 4.5:1 for text
- 3:1 for UI components and graphics
- No reliance on color alone to convey information
- Support for browser zoom up to 200%

**Cognitive Accessibility:**
- Clear, simple language
- Consistent navigation patterns
- Predictable interactions
- Error prevention and recovery

---

## Implementation Guidelines

### Component Structure

```typescript
// Dashboard page component (Next.js App Router)
export default async function DashboardPage() {
  const user = await getCurrentUser();
  const metrics = await getDashboardMetrics(user.id);
  const actions = await getPendingActions(user.id);
  const activity = await getRecentActivity(user.id);
  
  return (
    <DashboardLayout>
      <UserProfileCard metrics={metrics} />
      <ProductSeparator />
      <QuickAccessGrid products={user.products} />
      <ActionItemsWidget actions={actions} />
      <FinancialOverview metrics={metrics} />
      <RecentActivityFeed activity={activity} />
    </DashboardLayout>
  );
}
```

### State Management

```typescript
// Dashboard state (Zustand)
interface DashboardState {
  // Widget visibility
  widgets: {
    actions: boolean;
    metrics: boolean;
    financial: boolean;
    activity: boolean;
  };
  
  // Widget ordering
  widgetOrder: string[];
  
  // Filters
  activityFilter: ActivityFilter;
  dateRange: DateRange;
  
  // Actions
  toggleWidget: (widget: string) => void;
  reorderWidgets: (order: string[]) => void;
  setFilter: (filter: ActivityFilter) => void;
}
```

### Data Fetching

```typescript
// TanStack Query for dashboard data
function useDashboardData() {
  const metrics = useQuery({
    queryKey: ['dashboard', 'metrics'],
    queryFn: getDashboardMetrics,
    refetchInterval: 5 * 60 * 1000, // 5 minutes
  });
  
  const actions = useQuery({
    queryKey: ['dashboard', 'actions'],
    queryFn: getPendingActions,
    // Real-time via WebSocket
  });
  
  const activity = useInfiniteQuery({
    queryKey: ['dashboard', 'activity'],
    queryFn: getRecentActivity,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
  
  return { metrics, actions, activity };
}
```

---

## Success Metrics

### Engagement Metrics
- **Dashboard Views per Day**: Target 5+ per active user
- **Time on Dashboard**: Target 2-5 minutes per session
- **Widget Interaction Rate**: Target 60%+ clicking on widgets
- **Quick Action Usage**: Target 40%+ using quick actions

### Performance Metrics
- **Page Load Time**: Target <2 seconds p95
- **Error Rate**: Target <0.1% of dashboard loads
- **WebSocket Connection Success**: Target 99.9%

### User Satisfaction
- **Dashboard NPS**: Target 50+
- **Ease of Finding Information**: Target 4.5/5
- **Visual Appeal Rating**: Target 4.5/5

---

## Conclusion

The unified dashboard is the heart of the Flamingo Business Suite experience. By providing a clear, actionable, and personalized view of the business, it enables users to quickly understand their business health and take necessary actions—all from a single screen.

The design prioritizes clarity, performance, and flexibility—ensuring that whether a user is a CFO reviewing financial metrics or an operations manager checking order status, they have the information and tools they need at their fingertips.
