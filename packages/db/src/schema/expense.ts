import { relations } from "drizzle-orm";
import {
  boolean,
  decimal,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { organization } from "./core";

// ============================================================================
// Expense Categories
// ============================================================================

export const expenseCategory = pgTable(
  "expense_category",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    code: text("code"), // e.g., "TRAV", "MEAL", "OFFC"
    color: text("color"), // For UI display
    parentCategoryId: uuid("parent_category_id").references(
      () => expenseCategory.id,
      { onDelete: "set null" },
    ),
    accountId: uuid("account_id"), // Link to chart of accounts
    isSystem: boolean("is_system").default(false).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    defaultTaxCode: text("default_tax_code"),
    receiptRequired: boolean("receipt_required").default(false),
    receiptRequiredAmount: decimal("receipt_required_amount", {
      precision: 19,
      scale: 2,
    }),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("expense_category_organization_id_idx").on(table.organizationId),
    index("expense_category_parent_id_idx").on(table.parentCategoryId),
  ],
);

// ============================================================================
// Expenses
// ============================================================================

export const expenseStatusEnum = pgEnum("expense_status", [
  "draft",
  "pending_approval",
  "approved",
  "rejected",
  "reimbursed",
  "paid",
]);

export const expensePaymentMethodEnum = pgEnum("expense_payment_method", [
  "cash",
  "personal_card",
  "company_card",
  "bank_transfer",
  "check",
  "other",
]);

export const expense = pgTable(
  "expense",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    categoryId: uuid("category_id").references(() => expenseCategory.id, {
      onDelete: "set null",
    }),
    employeeId: text("employee_id")
      .notNull()
      .references(() => organization.createdAt), // Should reference user/employee
    vendorId: uuid("vendor_id").references(() => organization.id), // Contact ID
    amount: decimal("amount", { precision: 19, scale: 2 }).notNull(),
    currency: text("currency").default("USD").notNull(),
    fxRate: decimal("fx_rate", { precision: 19, scale: 6 }).default("1"),
    taxAmount: decimal("tax_amount", { precision: 19, scale: 2 }).default("0"),
    taxRate: decimal("tax_rate", { precision: 5, scale: 2 }).default("0"),
    totalAmount: decimal("total_amount", { precision: 19, scale: 2 }).notNull(),
    date: timestamp("date").notNull(),
    description: text("description").notNull(),
    notes: text("notes"),
    paymentMethod:
      expensePaymentMethodEnum("payment_method").default("personal_card"),
    status: expenseStatusEnum("status").default("draft").notNull(),
    billable: boolean("billable").default(false).notNull(),
    projectId: uuid("project_id"), // For project-based billing
    customerId: uuid("customer_id"), // Billable to which customer
    receiptRequired: boolean("receipt_required").default(false),
    receiptMissing: boolean("receipt_missing").default(false),
    location: jsonb("location"), // GPS coordinates where expense was incurred
    metadata: jsonb("metadata"),
    submittedAt: timestamp("submitted_at"),
    submittedBy: text("submitted_by"),
    approvedAt: timestamp("approved_at"),
    approvedBy: text("approved_by"),
    rejectedAt: timestamp("rejected_at"),
    rejectedBy: text("rejected_by"),
    rejectionReason: text("rejection_reason"),
    reimbursedAt: timestamp("reimbursed_at"),
    reimbursedAmount: decimal("reimbursed_amount", { precision: 19, scale: 2 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("expense_organization_id_idx").on(table.organizationId),
    index("expense_category_id_idx").on(table.categoryId),
    index("expense_employee_id_idx").on(table.employeeId),
    index("expense_status_idx").on(table.status),
    index("expense_date_idx").on(table.date),
    index("expense_billable_idx").on(table.billable),
  ],
);

// ============================================================================
// Receipts
// ============================================================================

export const receipt = pgTable(
  "receipt",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    expenseId: uuid("expense_id").references(() => expense.id, {
      onDelete: "cascade",
    }),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    uploadedBy: text("uploaded_by")
      .notNull()
      .references(() => organization.createdAt),
    fileUrl: text("file_url").notNull(),
    fileName: text("file_name").notNull(),
    fileSize: integer("file_size"), // in bytes
    mimeType: text("mime_type").notNull(),
    ocrStatus: text("ocr_status").default("pending"), // pending, processing, completed, failed
    ocrData: jsonb("ocr_data"), // Extracted data from OCR
    merchantName: text("merchant_name"), // Extracted from receipt
    merchantAddress: text("merchant_address"),
    transactionDate: timestamp("transaction_date"),
    subtotal: decimal("subtotal", { precision: 19, scale: 2 }),
    tax: decimal("tax", { precision: 19, scale: 2 }),
    total: decimal("total", { precision: 19, scale: 2 }),
    paymentMethod: text("payment_method"),
    lastFourDigits: text("last_four_digits"), // For card payments
    confidence: decimal("confidence", { precision: 5, scale: 2 }), // OCR confidence score
    verified: boolean("verified").default(false).notNull(),
    verifiedBy: text("verified_by"),
    verifiedAt: timestamp("verified_at"),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("receipt_expense_id_idx").on(table.expenseId),
    index("receipt_organization_id_idx").on(table.organizationId),
    index("receipt_ocr_status_idx").on(table.ocrStatus),
  ],
);

// ============================================================================
// Expense Approvals
// ============================================================================

export const approvalLevel = pgTable(
  "approval_level",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    order: integer("order").notNull(), // 1, 2, 3...
    approverId: text("approver_id")
      .notNull()
      .references(() => organization.createdAt), // User ID
    alternateApproverId: text("alternate_approver_id").references(
      () => organization.createdAt,
    ),
    minAmount: decimal("min_amount", { precision: 19, scale: 2 }),
    maxAmount: decimal("max_amount", { precision: 19, scale: 2 }),
    department: text("department"), // Restrict to specific department
    category: text("category"), // Restrict to specific expense category
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("approval_level_organization_id_idx").on(table.organizationId),
    index("approval_level_order_idx").on(table.order),
  ],
);

export const approvalWorkflow = pgTable(
  "approval_workflow",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    triggerType: text("trigger_type").notNull(), // amount, category, department, employee
    triggerConfig: jsonb("trigger_config").notNull(),
    levels: jsonb("levels").notNull(), // Array of approval level IDs in order
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("approval_workflow_organization_id_idx").on(table.organizationId),
  ],
);

export const expenseApproval = pgTable(
  "expense_approval",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    expenseId: uuid("expense_id")
      .notNull()
      .references(() => expense.id, { onDelete: "cascade" }),
    workflowId: uuid("workflow_id").references(() => approvalWorkflow.id, {
      onDelete: "set null",
    }),
    currentLevel: integer("current_level").default(1),
    status: text("status").default("pending").notNull(), // pending, approved, rejected, escalated
    approverId: text("approver_id").references(() => organization.createdAt),
    approvedAt: timestamp("approved_at"),
    rejectedAt: timestamp("rejected_at"),
    rejectionReason: text("rejection_reason"),
    escalatedAt: timestamp("escalated_at"),
    escalatedTo: text("escalated_to"),
    comments: text("comments"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("expense_approval_expense_id_idx").on(table.expenseId),
    index("expense_approval_approver_id_idx").on(table.approverId),
    index("expense_approval_status_idx").on(table.status),
  ],
);

// ============================================================================
// Corporate Cards
// ============================================================================

export const corporateCard = pgTable(
  "corporate_card",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    cardNumber: text("card_number").notNull(), // Encrypted
    lastFourDigits: text("last_four_digits").notNull(),
    cardholderName: text("cardholder_name").notNull(),
    employeeId: text("employee_id").references(() => organization.createdAt),
    status: text("status").default("active").notNull(), // active, suspended, cancelled
    cardType: text("card_type"), // visa, mastercard, amex
    expiryDate: text("expiry_date"), // MM/YY
    creditLimit: decimal("credit_limit", { precision: 19, scale: 2 }),
    currentBalance: decimal("current_balance", {
      precision: 19,
      scale: 2,
    }).default("0"),
    availableBalance: decimal("available_balance", { precision: 19, scale: 2 }),
    billingCycleDay: integer("billing_cycle_day"), // Day of month for billing
    autoMatch: boolean("auto_match").default(true).notNull(), // Auto-match transactions
    provider: text("provider"), // stripe, brex, ramp, etc.
    providerAccountId: text("provider_account_id"),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("corporate_card_organization_id_idx").on(table.organizationId),
    index("corporate_card_employee_id_idx").on(table.employeeId),
  ],
);

export const cardTransaction = pgTable(
  "card_transaction",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    cardId: uuid("card_id")
      .notNull()
      .references(() => corporateCard.id, { onDelete: "cascade" }),
    transactionId: text("transaction_id").notNull(), // From card provider
    date: timestamp("date").notNull(),
    postedDate: timestamp("posted_date"),
    merchantName: text("merchant_name").notNull(),
    merchantCategory: text("merchant_category"), // MCC code
    amount: decimal("amount", { precision: 19, scale: 2 }).notNull(),
    currency: text("currency").default("USD").notNull(),
    fxAmount: decimal("fx_amount", { precision: 19, scale: 2 }),
    fxCurrency: text("fx_currency"),
    fxRate: decimal("fx_rate", { precision: 19, scale: 6 }),
    status: text("status").default("pending").notNull(), // pending, posted, disputed
    category: text("category"), // Auto-categorized
    expenseId: uuid("expense_id").references(() => expense.id, {
      onDelete: "set null",
    }),
    isMatched: boolean("is_matched").default(false).notNull(),
    matchedAt: timestamp("matched_at"),
    matchedBy: text("matched_by"),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("card_transaction_card_id_idx").on(table.cardId),
    index("card_transaction_date_idx").on(table.date),
    index("card_transaction_expense_id_idx").on(table.expenseId),
    index("card_transaction_unique").on(table.cardId, table.transactionId),
  ],
);

// ============================================================================
// Mileage & Per Diem
// ============================================================================

export const mileageRate = pgTable(
  "mileage_rate",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    ratePerMile: decimal("rate_per_mile", {
      precision: 10,
      scale: 4,
    }).notNull(),
    ratePerKm: decimal("rate_per_km", { precision: 10, scale: 4 }),
    currency: text("currency").default("USD").notNull(),
    effectiveDate: timestamp("effective_date").notNull(),
    endDate: timestamp("end_date"),
    isDefault: boolean("is_default").default(false).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("mileage_rate_organization_id_idx").on(table.organizationId),
    index("mileage_rate_effective_date_idx").on(table.effectiveDate),
  ],
);

export const mileageExpense = pgTable(
  "mileage_expense",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    expenseId: uuid("expense_id")
      .notNull()
      .references(() => expense.id, { onDelete: "cascade" }),
    vehicleType: text("vehicle_type").default("car").notNull(), // car, motorcycle, bicycle
    distance: decimal("distance", { precision: 10, scale: 2 }).notNull(),
    unit: text("unit").default("miles").notNull(), // miles, kilometers
    startLocation: text("start_location").notNull(),
    endLocation: text("end_location").notNull(),
    purpose: text("purpose").notNull(),
    route: jsonb("route"), // GPS route data
    rateId: uuid("rate_id").references(() => mileageRate.id),
    ratePerUnit: decimal("rate_per_unit", {
      precision: 10,
      scale: 4,
    }).notNull(),
    totalAmount: decimal("total_amount", { precision: 19, scale: 2 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("mileage_expense_expense_id_idx").on(table.expenseId)],
);

export const perDiemRate = pgTable(
  "per_diem_rate",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    location: text("location").notNull(), // City, State or Country
    locationType: text("location_type").notNull(), // city, state, country
    effectiveDate: timestamp("effective_date").notNull(),
    endDate: timestamp("end_date"),
    mealsRate: decimal("meals_rate", { precision: 10, scale: 2 }).notNull(),
    lodgingRate: decimal("lodging_rate", { precision: 10, scale: 2 }),
    incidentalRate: decimal("incidental_rate", { precision: 10, scale: 2 }),
    totalRate: decimal("total_rate", { precision: 10, scale: 2 }).notNull(),
    currency: text("currency").default("USD").notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("per_diem_rate_organization_id_idx").on(table.organizationId),
    index("per_diem_rate_location_idx").on(table.location),
    index("per_diem_rate_effective_date_idx").on(table.effectiveDate),
  ],
);

// ============================================================================
// Relations
// ============================================================================

export const expenseCategoryRelations = relations(
  expenseCategory,
  ({ one, many }) => ({
    organization: one(organization, {
      fields: [expenseCategory.organizationId],
      references: [organization.id],
    }),
    parent: one(expenseCategory, {
      fields: [expenseCategory.parentCategoryId],
      references: [expenseCategory.id],
    }),
    children: many(expenseCategory, { relationName: "category_hierarchy" }),
    expenses: many(expense),
  }),
);

export const expenseRelations = relations(expense, ({ one, many }) => ({
  organization: one(organization, {
    fields: [expense.organizationId],
    references: [organization.id],
  }),
  category: one(expenseCategory, {
    fields: [expense.categoryId],
    references: [expenseCategory.id],
  }),
  receipts: many(receipt),
  approvals: many(expenseApproval),
  cardTransactions: many(cardTransaction),
  mileage: many(mileageExpense),
}));

export const receiptRelations = relations(receipt, ({ one }) => ({
  expense: one(expense, {
    fields: [receipt.expenseId],
    references: [expense.id],
  }),
  organization: one(organization, {
    fields: [receipt.organizationId],
    references: [organization.id],
  }),
}));

export const approvalLevelRelations = relations(approvalLevel, ({ one }) => ({
  organization: one(organization, {
    fields: [approvalLevel.organizationId],
    references: [organization.id],
  }),
}));

export const approvalWorkflowRelations = relations(
  approvalWorkflow,
  ({ one }) => ({
    organization: one(organization, {
      fields: [approvalWorkflow.organizationId],
      references: [organization.id],
    }),
  }),
);

export const expenseApprovalRelations = relations(
  expenseApproval,
  ({ one }) => ({
    expense: one(expense, {
      fields: [expenseApproval.expenseId],
      references: [expense.id],
    }),
    workflow: one(approvalWorkflow, {
      fields: [expenseApproval.workflowId],
      references: [approvalWorkflow.id],
    }),
  }),
);

export const corporateCardRelations = relations(
  corporateCard,
  ({ one, many }) => ({
    organization: one(organization, {
      fields: [corporateCard.organizationId],
      references: [organization.id],
    }),
    transactions: many(cardTransaction),
  }),
);

export const cardTransactionRelations = relations(
  cardTransaction,
  ({ one }) => ({
    card: one(corporateCard, {
      fields: [cardTransaction.cardId],
      references: [corporateCard.id],
    }),
    expense: one(expense, {
      fields: [cardTransaction.expenseId],
      references: [expense.id],
    }),
  }),
);

export const mileageRateRelations = relations(mileageRate, ({ one, many }) => ({
  organization: one(organization, {
    fields: [mileageRate.organizationId],
    references: [organization.id],
  }),
  mileageExpenses: many(mileageExpense),
}));

export const mileageExpenseRelations = relations(mileageExpense, ({ one }) => ({
  expense: one(expense, {
    fields: [mileageExpense.expenseId],
    references: [expense.id],
  }),
  rate: one(mileageRate, {
    fields: [mileageExpense.rateId],
    references: [mileageRate.id],
  }),
}));

export const perDiemRateRelations = relations(perDiemRate, ({ one }) => ({
  organization: one(organization, {
    fields: [perDiemRate.organizationId],
    references: [organization.id],
  }),
}));
