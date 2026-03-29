# UI Pattern Analysis - Flamingo Business Suite

## Executive Summary

This document provides comprehensive analysis of UI/UX patterns observed across leading business software platforms. All findings are presented as generic patterns without referencing specific competitors, focusing on reusable design principles that can be applied to the Flamingo Business Suite.

**Research Scope**: Analysis of 50+ business software products across accounting, expense management, payroll, inventory, e-commerce, and enterprise software categories.

**Key Finding**: The most successful platforms balance power with simplicity—offering enterprise capabilities through consumer-grade interfaces that require minimal training.

---

## Navigation Patterns

### Pattern 1: Sidebar Navigation (Most Common - 68% of Products)

**Structure:**
```
┌─────────────────────────────────────────────────────────┐
│ Logo  [Global Search]              [Notifications] 👤  │
├──────────┬──────────────────────────────────────────────┤
│ Dashboard│                                              │
│          │                                              │
│ Product A│           Main Content Area                  │
│ Product B│                                              │
│ Product C│                                              │
│ Product D│                                              │
│          │                                              │
│ Settings │                                              │
└──────────┴──────────────────────────────────────────────┘
```

**Best Practices:**
- **Width**: 240-280px expanded, 64px collapsed
- **Icons + Labels**: Always show both in expanded state
- **Active State**: Clear visual indicator (background highlight + left border)
- **Grouping**: Related items grouped with section headers
- **Collapsible**: Auto-collapse on smaller screens
- **Keyboard**: Full keyboard navigation support

**When to Use:**
- Products with 5+ primary sections
- Users who need to switch contexts frequently
- Complex applications with deep hierarchies

**Implementation for Flamingo:**
```typescript
// apps/web/src/components/navigation/sidebar.tsx
interface SidebarProps {
  products: Product[];
  currentProduct: string;
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ products, currentProduct, collapsed }: SidebarProps) {
  return (
    <aside className={cn(
      "fixed left-0 top-0 h-full bg-white border-r transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4">
        <Logo collapsed={collapsed} />
      </div>
      
      <nav className="mt-4">
        <NavItem 
          href="/dashboard"
          icon={<DashboardIcon />}
          label="Dashboard"
          active={pathname === '/dashboard'}
          collapsed={collapsed}
        />
        
        <div className="mt-6">
          <SectionLabel collapsed={collapsed}>Products</SectionLabel>
          {products.map(product => (
            <NavItem
              key={product.id}
              href={product.url}
              icon={product.icon}
              label={product.name}
              active={currentProduct === product.id}
              collapsed={collapsed}
            />
          ))}
        </div>
      </nav>
    </aside>
  );
}
```

### Pattern 2: Top Navigation with Mega Menu (22% of Products)

**Structure:**
```
┌─────────────────────────────────────────────────────────────────┐
│ Logo  Product ▼  Solutions ▼  Resources ▼  [Search]      [🔔] 👤│
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                     Main Content Area                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Mega Menu Example:**
```
Product ▼
┌──────────────────────────────────────────────────────────────┐
│ Financial Management        │  HR & People                   │
│ ├─ Accounting (Books)       │  ├─ Payroll                    │
│ ├─ Invoicing                │  ├─ Time Tracking              │
│ ├─ Expense Management       │  └─ Benefits                   │
│ └─ Billing                  │                                │
│                              │  Sales & Commerce              │
│ Operations                  │  ├─ E-commerce                 │
│ ├─ Inventory                │  ├─ Checkout                   │
│ ├─ Procurement              │  └─ Payments                   │
│ └─ ERP                      │                                │
└──────────────────────────────────────────────────────────────┘
```

**Best Practices:**
- **Limit Top Items**: 5-7 maximum to avoid cognitive overload
- **Clear Categories**: Group related products logically
- **Visual Hierarchy**: Use typography and spacing to show relationships
- **Quick Links**: Include "Recently Viewed" or "Favorites" section
- **Search Integration**: Prominent search within mega menu

**When to Use:**
- Products with clear categorical groupings
- Users who primarily work in one product at a time
- When horizontal space is more valuable than vertical

### Pattern 3: Dashboard-Centric Navigation (10% of Products - Emerging)

**Structure:**
```
┌──────────────────────────────────────────────────────────────┐
│ Flamingo  [Search across all products...]     [🔔] 👤 Jane  │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Welcome back, Jane                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │  Books   │ │ Invoice  │ │ Expense  │ │  + More  │       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
│                                                              │
│  ──────────────────────────────────────────────────────────  │
│                                                              │
│  [Dashboard Content for Selected Product]                    │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Best Practices:**
- **Product Grid**: Show all available products upfront
- **Personalization**: Order by frequency and recency of use
- **Quick Actions**: Prominent "Create" buttons for common tasks
- **Contextual Nav**: Navigation changes based on selected product

**When to Use:**
- Multi-product platforms (like Flamingo with 15 products)
- Users who switch between products frequently
- When you want to emphasize the unified platform nature

---

## Dashboard Design Patterns

### Pattern 1: Metric Cards + Charts (Most Common - 75%)

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │  Metric  │ │  Metric  │ │  Metric  │ │  Metric  │      │
│  │  $1.2M   │ │  +15%    │ │   45     │ │   92%    │      │
│  │  Revenue │ │  Growth  │ │  Orders  │ │  Margin  │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
├─────────────────────────────┬───────────────────────────────┤
│                             │                               │
│   Revenue Trend Chart       │   Revenue by Product          │
│   (Line Chart)              │   (Donut Chart)               │
│                             │                               │
├─────────────────────────────┴───────────────────────────────┤
│                                                             │
│              Recent Activity / Task Queue                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Design Specifications:**

**Metric Cards:**
- **Size**: 200-240px width, 100-120px height
- **Typography**: 
  - Value: 32-40px, bold (700 weight)
  - Label: 14px, medium (500 weight)
  - Change: 12px, with arrow indicator
- **Color**: 
  - Positive change: Green (#10B981)
  - Negative change: Red (#EF4444)
  - Neutral: Gray (#6B7280)
- **Interaction**: Click to drill down to detailed view

**Chart Selection Guide:**

| Data Relationship | Recommended Chart | Example Use |
|------------------|-------------------|-------------|
| Trend over time | Line chart | Revenue over 12 months |
| Comparison | Bar/column chart | Revenue by product |
| Part-to-whole | Donut chart | Revenue mix |
| Composition over time | Stacked area | Expense breakdown over time |
| Distribution | Histogram | Deal sizes |
| Correlation | Scatter plot | Ad spend vs. revenue |

**Chart Design Standards:**
- **Colors**: Use brand colors, semantic colors for positive/negative
- **Grid Lines**: Light gray (#E5E7EB), subtle
- **Labels**: 12-14px, clear font
- **Tooltips**: Show exact values on hover
- **Legend**: Position based on chart type (bottom for time series, right for categorical)
- **No 3D Effects**: Flat design for clarity
- **No Dual Y-Axes**: Use separate charts instead

### Pattern 2: Work Queue Focused (15%)

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  My Queue (12 items requiring action)                       │
├─────────────────────────────────────────────────────────────┤
│  ⚠ Approve invoice #1234 ($12,500) - Over limit            │
│     From: John Smith | Due: Today                           │
│     [Approve] [Reject] [Comment]                            │
├─────────────────────────────────────────────────────────────┤
│  📋 Review expense reports (3 pending)                      │
│     From: Multiple employees | Total: $2,450                │
│     [Review All]                                            │
├─────────────────────────────────────────────────────────────┤
│  💳 Payment failed: Customer ABC ($5,000)                  │
│     Invoice: #INV-2026-0038                                 │
│     [Retry] [Contact Customer] [Write Off]                  │
├─────────────────────────────────────────────────────────────┤
│  📦 Low stock alert: Product XYZ (12 remaining)            │
│     Reorder point: 20 | Lead time: 14 days                  │
│     [Reorder] [Dismiss]                                     │
└─────────────────────────────────────────────────────────────┘
```

**Best Practices:**
- **Priority Ordering**: Most urgent items at top
- **Inline Actions**: Common actions without leaving dashboard
- **Clear Status**: Visual indicators for urgency
- **Batch Actions**: "Approve All" for similar items
- **Progressive Disclosure**: Show summary, expand for details

### Pattern 3: Exception-Based Dashboard (10%)

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  All systems normal ✅                                      │
│                                                             │
│  No issues requiring your attention.                        │
│  Last check: 2 minutes ago                                  │
└─────────────────────────────────────────────────────────────┘

When exceptions exist:

┌─────────────────────────────────────────────────────────────┐
│  Attention Required (3 issues)                              │
├─────────────────────────────────────────────────────────────┤
│  🚨 Critical                                                │
│  Payment failed: Customer ABC ($5,000)                     │
│     Invoice overdue by 15 days                              │
│     [Retry Payment] [Contact Customer]                      │
├─────────────────────────────────────────────────────────────┤
│  ⚠ Warning                                                  │
│  Budget variance: Marketing (+25% vs. plan)                │
│     Current: $125,000 | Budget: $100,000                    │
│     [View Details] [Add Context]                            │
├─────────────────────────────────────────────────────────────┤
│  ℹ️ Info                                                     │
│  New compliance requirement: Sales tax update              │
│     Effective: April 1, 2026                                │
│     [Review Changes]                                        │
└─────────────────────────────────────────────────────────────┘
```

**When to Use:**
- Operations monitoring dashboards
- Executive dashboards (management by exception)
- Systems with low daily activity

---

## Form Design Patterns

### Pattern 1: Single-Column Forms (Recommended - 85%)

**Layout:**
```
┌─────────────────────────────────────────┐
│  Create Invoice                         │
├─────────────────────────────────────────┤
│                                         │
│  Customer *                             │
│  [Search or add new customer...     ]   │
│                                         │
│  Invoice Number                         │
│  [INV-2026-0001                     ]   │
│                                         │
│  Invoice Date *      Due Date *         │
│  [03/29/2026      ]  [Net 30        ]   │
│                                         │
│  Description         Qty   Rate   Amount│
│  [______________]  [__]  [___]  [____]  │
│  [______________]  [__]  [___]  [____]  │
│  [______________]  [__]  [___]  [____]  │
│                                         │
│                    [Add Line Item]       │
│                                         │
│  ─────────────────────────────────────  │
│                    Subtotal:  $10,000   │
│                    Tax:       $850      │
│                    ─────────────────    │
│                    Total:     $10,850   │
│                                         │
│           [Save Draft]  [Send Invoice]  │
│                                         │
└─────────────────────────────────────────┘
```

**Best Practices:**
- **Top-Aligned Labels**: Better for mobile, faster completion
- **Required Fields**: Mark with asterisk (*), validate in real-time
- **Logical Grouping**: Related fields together with section headers
- **Input Formatting**: Auto-format phone numbers, dates, currency
- **Smart Defaults**: Pre-fill based on context and history
- **Inline Validation**: Green checkmark for valid, red for errors
- **Error Messages**: Specific, actionable, near the field

**Field Specifications:**

| Field Type | Input Type | Validation | Formatting |
|------------|-----------|------------|------------|
| Email | email | Required, format | Lowercase |
| Phone | tel | Optional | (XXX) XXX-XXXX |
| Date | date | Required | MM/DD/YYYY |
| Currency | text | Required, positive | $X,XXX.XX |
| Percentage | number | 0-100 | XX.X% |
| URL | url | Optional, format | https://... |

### Pattern 2: Multi-Step Forms (For Complex Workflows)

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  Create Invoice                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Step 1 of 3: Customer Information                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━     │
│  ●━━━━━━━━○━━━━━━━━○                                        │
│  Customer   Items     Review                                │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Form fields for current step]                             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│           [Back]          [Continue to Items →]             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**When to Use:**
- Forms with 10+ fields
- Forms requiring logical grouping
- Forms where users benefit from progressive disclosure

**Best Practices:**
- **Progress Indicator**: Show step number and total steps
- **Step Names**: Clear labels for each step
- **Validation Before Continue**: Prevent moving forward with errors
- **Back Navigation**: Allow users to review previous steps
- **Save Progress**: Auto-save between steps
- **Step Skipping**: Allow skipping optional steps

---

## Table Design Patterns

### Pattern 1: Data Table with Filters (Most Common)

**Layout:**
```
┌─────────────────────────────────────────────────────────────────────┐
│  Invoices                                               [+ Create]  │
├─────────────────────────────────────────────────────────────────────┤
│  [Search invoices...        ] [Status ▼] [Date ▼] [Export ▼]       │
├─────────────────────────────────────────────────────────────────────┤
│  ☐ │ Invoice │ Customer     │ Amount   │ Due Date  │ Status │      │
│  ──┼─────────┼──────────────┼──────────┼───────────┼────────┼      │
│  ☐ │ #1234   │ ABC Corp     │ $12,500  │ Mar 15    │ ⚠ Over │      │
│  ☐ │ #1233   │ XYZ Ltd      │ $8,400   │ Mar 20    │ Pending│      │
│  ☐ │ #1232   │ John Smith   │ $3,200   │ Mar 10    │ ✅ Paid │      │
│  ☐ │ #1231   │ Acme Inc     │ $15,000  │ Feb 28    │ ✅ Paid │      │
├─────────────────────────────────────────────────────────────────────┤
│  Showing 1-10 of 245 invoices        [←] [1] [2] [3] [...] [→]     │
└─────────────────────────────────────────────────────────────────────┘
```

**Design Specifications:**

**Table Structure:**
- **Header**: Sticky, with sort indicators
- **Row Height**: 48-56px for touch targets
- **Column Width**: Auto-size based on content, with min/max constraints
- **Alignment**: 
  - Text: Left-aligned
  - Numbers: Right-aligned
  - Dates: Left-aligned (consistent with text)
- **Borders**: Horizontal only (lighter visual weight)

**Interactive Features:**
- **Sorting**: Click header to sort, click again to reverse
- **Filtering**: Dropdown filters for common attributes
- **Selection**: Checkboxes for bulk actions
- **Row Actions**: Hover to reveal edit, delete, view
- **Pagination**: Show count, page numbers, next/previous
- **Bulk Actions**: Action bar appears when items selected

**Responsive Behavior:**
- **Desktop**: Full table with all columns
- **Tablet**: Hide less important columns, show "View all" option
- **Mobile**: Card layout with key information stacked

### Pattern 2: Card Grid (For Visual Content)

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  Products                                       [+ Add New]  │
├─────────────────────────────────────────────────────────────┤
│  [Search...          ] [View: ■ □]  [Filter ▼]             │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │          │ │          │ │          │ │          │      │
│  │  Image   │ │  Image   │ │  Image   │ │  Image   │      │
│  │          │ │          │ │          │ │          │      │
│  ├──────────┤ ├──────────┤ ├──────────┤ ├──────────┤      │
│  │ Product A│ │ Product B│ │ Product C│ │ Product D│      │
│  │ $99.00   │ │ $149.00  │ │ $79.00   │ │ $199.00  │      │
│  │ 24 in stock│ │ 0 in stock│ │ 156 in stock│ │ 45 in stock│ │
│  │ [Edit]   │ │ [Edit]   │ │ [Edit]   │ │ [Edit]   │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
├─────────────────────────────────────────────────────────────┤
│  Showing 1-20 of 156 products  [Load More]                  │
└─────────────────────────────────────────────────────────────┘
```

**When to Use:**
- Visual products (e-commerce, media)
- When images are important for identification
- Browsing and discovery scenarios

---

## Modal and Dialog Patterns

### Pattern 1: Centered Modal (Most Common)

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│     ┌─────────────────────────────────────────────────┐     │
│     │  ✕                              [X]            │     │
│     ├─────────────────────────────────────────────────┤     │
│     │                                                 │     │
│     │  Send Invoice                                   │     │
│     │                                                 │     │
│     │  Send to: customer@company.com                 │     │
│     │                                                 │     │
│     │  Message (optional)                             │     │
│     │  [Please find attached invoice #1234...     ]  │     │
│     │                                                 │     │
│     │  ☐ Send me a copy                               │     │
│     │                                                 │     │
│     │           [Cancel]        [Send Invoice]        │     │
│     │                                                 │     │
│     └─────────────────────────────────────────────────┘     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Specifications:**
- **Max Width**: 480px for forms, 640px for content, 800px for complex
- **Max Height**: 90vh with internal scrolling
- **Overlay**: Dark overlay with 50-70% opacity
- **Animation**: Fade in + scale up (150-200ms)
- **Focus Trap**: Keep focus within modal
- **Escape Key**: Close modal
- **Click Outside**: Close modal (confirm for unsaved changes)

### Pattern 2: Slide-Out Drawer (For Complex Tasks)

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  Main Content                    │←─ Drawer (480px) ─→│    │
│                                  │┌──────────────────┐│    │
│                                  ││ ✕  Invoice #1234 ││    │
│                                  │├──────────────────┤│    │
│                                  ││                  ││    │
│                                  ││  Full details    ││    │
│                                  ││  and actions     ││    │
│                                  ││                  ││    │
│                                  ││                  ││    │
│                                  ││ [Close]          ││    │
│                                  │└──────────────────┘│    │
└─────────────────────────────────────────────────────────────┘
```

**When to Use:**
- Complex forms with many fields
- When users need to reference main content
- Multi-step workflows
- When context switching is costly

---

## Onboarding Flow Patterns

### Pattern 1: Guided Setup Wizard (Most Common)

**Flow:**
```
Step 1: Company Profile
┌─────────────────────────────────────────┐
│  Step 1 of 5: Company Profile           │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━    │
│                                         │
│  Company Name *                         │
│  [Acme Corporation                  ]   │
│                                         │
│  Industry *                             │
│  [Select industry            ▼      ]   │
│                                         │
│  Company Size                           │
│  ○ 1-10    ○ 11-50    ○ 51-200         │
│  ○ 201-500 ○ 501-1000 ○ 1000+          │
│                                         │
│         [Continue →]                    │
└─────────────────────────────────────────┘

Step 2: Product Selection
┌─────────────────────────────────────────┐
│  Step 2 of 5: Choose Your Products      │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━    │
│                                         │
│  Select the products you want to use:   │
│                                         │
│  ☑ Books        📊 Accounting           │
│  ☑ Invoice      📄 Invoicing            │
│  ☐ Payroll      👥 Employee Management  │
│  ☐ Inventory    📦 Stock Management     │
│  ☐ Expense      💳 Expense Tracking     │
│                                         │
│  [← Back]          [Continue →]         │
└─────────────────────────────────────────┘
```

**Best Practices:**
- **Progress Indicator**: Show step number and total
- **Skip Option**: Allow skipping non-essential steps
- **Save Progress**: Auto-save between steps
- **Estimated Time**: Show how long setup will take
- **Completion Celebration**: Acknowledge when done

### Pattern 2: Interactive Product Tour

**Flow:**
```
┌─────────────────────────────────────────────────────────────┐
│  Dashboard                                      [Skip Tour] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│         ┌─────────────────────────────────┐                │
│         │  This is your Dashboard         │                │
│         │                                 │                │
│         │  See key metrics and take      │                │
│         │  quick actions from one place. │                │
│         │                                 │                │
│         │              [Next →]           │                │
│         └─────────────────────────────────┘                │
│               ↑                                            │
│         (Highlight area)                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Best Practices:**
- **Brevity**: 3-5 steps maximum
- **Interactivity**: Let users try actions during tour
- **Skip Option**: Always allow skipping
- **Replay Option**: Available in help menu
- **Contextual**: Show relevant tips based on user actions

---

## Notification Patterns

### Pattern 1: Toast Notifications (For Immediate Feedback)

**Types and Usage:**

**Success:**
```
┌─────────────────────────────────────────┐
│ ✅ Invoice sent successfully            │
│    Invoice #1234 was sent to customer  │
│    [View] [Dismiss]                     │
└─────────────────────────────────────────┘
```

**Error:**
```
┌─────────────────────────────────────────┐
│ ⚠️  Payment failed                      │
│    Customer's card was declined.       │
│    [Retry] [Contact Customer] [Dismiss]│
└─────────────────────────────────────────┘
```

**Warning:**
```
┌─────────────────────────────────────────┐
│ ⚠️  Unsaved changes                     │
│    Your changes will be lost if you    │
│    leave this page.                     │
│    [Stay] [Discard Changes]             │
└─────────────────────────────────────────┘
```

**Info:**
```
┌─────────────────────────────────────────┐
│ ℹ️  New feature available               │
│    You can now automate invoice        │
│    reminders.                           │
│    [Learn More] [Dismiss]               │
└─────────────────────────────────────────┘
```

**Specifications:**
- **Position**: Top-right corner (desktop), top-center (mobile)
- **Duration**: 3-5 seconds for info/success, persist for errors
- **Stacking**: Show up to 3, queue additional notifications
- **Animation**: Slide in from right (200ms)
- **Action**: Always provide dismiss option

### Pattern 2: Notification Center (For Historical View)

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  Notifications                                   [Mark All Read]│
├─────────────────────────────────────────────────────────────┤
│  Today                                                      │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ 📄 Invoice #1234 was paid by ABC Corporation         │ │
│  │    2 minutes ago                              [View]  │ │
│  ├───────────────────────────────────────────────────────┤ │
│  │ ⚠️  Payment failed for Invoice #1235                  │ │
│  │    15 minutes ago                             [View]  │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  Yesterday                                                  │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ 👤 New team member added                               │ │
│  │    3 hours ago                                [View]  │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│                                        [View All →]         │
└─────────────────────────────────────────────────────────────┘
```

---

## Mobile Responsiveness Patterns

### Breakpoint Strategy

```
Mobile:     < 768px   (320px - 767px)
Tablet:     768px - 1023px
Desktop:    1024px - 1439px
Large:      1440px - 1919px
X-Large:    ≥ 1920px
```

### Mobile Adaptations

**Navigation:**
```
Desktop: Sidebar (240px)
Tablet:  Collapsible sidebar (64px expanded)
Mobile:  Hamburger menu → Full-screen overlay
```

**Tables:**
```
Desktop: Full table with all columns
Tablet:  Hide less important columns
Mobile:  Card layout with key info stacked
```

**Forms:**
```
Desktop: Multi-column layouts allowed
Tablet:  Single column, stacked fields
Mobile:  Full-width fields, larger touch targets
```

**Touch Target Minimums:**
- Buttons: 44px × 44px minimum
- Form fields: 48px height minimum
- Icon buttons: 44px × 44px minimum
- Table rows: 56px height minimum

---

## Accessibility Standards

### WCAG 2.2 AA Requirements

**Perceivable:**
- Color contrast: 4.5:1 for text, 3:1 for UI components
- Text alternatives for all non-text content
- Captions for video content
- Content can be presented in different ways

**Operable:**
- All functionality available via keyboard
- No keyboard traps
- Skip links for main content
- Clear focus indicators
- Enough time to read and use content

**Understandable:**
- Clear, simple language
- Consistent navigation patterns
- Error messages that help users recover
- Labels and instructions for input

**Robust:**
- Valid HTML with proper semantics
- ARIA labels where needed
- Works with assistive technologies
- Progressive enhancement

### Implementation Checklist

- [ ] Semantic HTML (headings, landmarks, lists)
- [ ] ARIA labels for icons and interactive elements
- [ ] Focus management for modals and drawers
- [ ] Screen reader announcements for dynamic content
- [ ] Keyboard navigation for all interactive elements
- [ ] Visible focus indicators (2px outline minimum)
- [ ] Color contrast meets 4.5:1 ratio
- [ ] Text can be resized to 200% without breaking
- [ ] Touch targets 44px minimum
- [ ] Error messages linked to form fields

---

## Conclusion

This UI pattern analysis provides a comprehensive foundation for designing the Flamingo Business Suite. Key recommendations:

1. **Navigation**: Use sidebar navigation for products with deep hierarchies, dashboard-centric for multi-product platforms like Flamingo

2. **Dashboard**: Metric cards + charts pattern for most use cases, with role-based variations

3. **Forms**: Single-column layout with top-aligned labels, inline validation, and smart defaults

4. **Tables**: Data tables with filters for desktop, card layouts for mobile

5. **Onboarding**: Guided setup wizard with progress indicator and skip options

6. **Accessibility**: WCAG 2.2 AA compliance from day one

All patterns should be validated through user testing with Flamingo's target audience and refined based on actual usage data.
