import { relations } from "drizzle-orm";
import {
  boolean,
  decimal,
  index,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { organization } from "./core";

// ============================================================================
// Chart of Accounts
// ============================================================================

export const accountTypeEnum = pgEnum("account_type", [
  "asset",
  "liability",
  "equity",
  "income",
  "expense",
]);

export const accountSubTypeEnum = pgEnum("account_subtype", [
  // Assets
  "current_asset",
  "fixed_asset",
  "non_current_asset",
  "cash",
  "bank",
  "accounts_receivable",
  "inventory",
  // Liabilities
  "current_liability",
  "long_term_liability",
  "accounts_payable",
  "credit_card",
  "loan",
  // Equity
  "owners_equity",
  "retained_earnings",
  // Income
  "operating_income",
  "other_income",
  // Expense
  "cost_of_goods_sold",
  "operating_expense",
  "other_expense",
]);

export const account = pgTable(
  "account",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    code: text("code").notNull(), // e.g., "1000", "2000"
    name: text("name").notNull(), // e.g., "Cash", "Accounts Receivable"
    type: accountTypeEnum("type").notNull(),
    subtype: accountSubTypeEnum("subtype"),
    description: text("description"),
    currency: text("currency").default("USD").notNull(),
    parentId: uuid("parent_id").references(() => account.id, {
      onDelete: "set null",
    }),
    isHeader: boolean("is_header").default(false).notNull(), // Header accounts can't have transactions
    isSystem: boolean("is_system").default(false).notNull(), // System accounts can't be deleted
    isActive: boolean("is_active").default(true).notNull(),
    taxCode: text("tax_code"),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("account_organization_id_idx").on(table.organizationId),
    index("account_code_idx").on(table.code),
    index("account_type_idx").on(table.type),
    index("account_parent_id_idx").on(table.parentId),
    index("account_unique_code").on(table.organizationId, table.code),
  ],
);

// ============================================================================
// Journal Entries
// ============================================================================

export const entryStatusEnum = pgEnum("entry_status", [
  "draft",
  "posted",
  "void",
]);

export const journalEntry = pgTable(
  "journal_entry",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    entryNumber: text("entry_number").notNull(), // Auto-generated, e.g., "JE-2024-0001"
    date: timestamp("date").notNull(),
    description: text("description").notNull(),
    status: entryStatusEnum("status").default("draft").notNull(),
    reference: text("reference"), // External reference number
    sourceType: text("source_type"), // e.g., "invoice", "expense", "manual"
    sourceId: uuid("source_id"), // ID of the source document
    attachmentIds: jsonb("attachment_ids"), // Array of file IDs
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
    postedAt: timestamp("posted_at"),
    postedBy: text("posted_by").references(() => organization.createdAt), // User ID
  },
  (table) => [
    index("journal_entry_organization_id_idx").on(table.organizationId),
    index("journal_entry_date_idx").on(table.date),
    index("journal_entry_status_idx").on(table.status),
    index("journal_entry_number_idx").on(table.entryNumber),
    index("journal_entry_source_idx").on(table.sourceType, table.sourceId),
  ],
);

export const journalEntryLine = pgTable(
  "journal_entry_line",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    entryId: uuid("entry_id")
      .notNull()
      .references(() => journalEntry.id, { onDelete: "cascade" }),
    accountId: uuid("account_id")
      .notNull()
      .references(() => account.id, { onDelete: "restrict" }),
    description: text("description"),
    debitAmount: decimal("debit_amount", { precision: 19, scale: 4 }).default(
      "0",
    ),
    creditAmount: decimal("credit_amount", {
      precision: 19,
      scale: 4,
    }).default("0"),
    taxAmount: decimal("tax_amount", { precision: 19, scale: 4 }).default("0"),
    taxCode: text("tax_code"),
    contactId: uuid("contact_id"), // Customer/Vendor/Employee
    projectId: uuid("project_id"), // For project accounting
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("journal_entry_line_entry_id_idx").on(table.entryId),
    index("journal_entry_line_account_id_idx").on(table.accountId),
  ],
);

// ============================================================================
// Bank Accounts & Reconciliation
// ============================================================================

export const bankAccount = pgTable(
  "bank_account",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    accountId: uuid("account_id")
      .notNull()
      .references(() => account.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    bankName: text("bank_name"),
    accountNumber: text("account_number"), // Encrypted
    routingNumber: text("routing_number"), // Encrypted
    currency: text("currency").default("USD").notNull(),
    balance: decimal("balance", { precision: 19, scale: 2 }).default("0"),
    reconciledBalance: decimal("reconciled_balance", {
      precision: 19,
      scale: 2,
    }).default("0"),
    lastReconciledDate: timestamp("last_reconciled_date"),
    isActive: boolean("is_active").default(true).notNull(),
    providerConnection: jsonb("provider_connection"), // Plaid, Tink connection data
    lastSyncAt: timestamp("last_sync_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("bank_account_organization_id_idx").on(table.organizationId),
    index("bank_account_account_id_idx").on(table.accountId),
  ],
);

export const bankTransaction = pgTable(
  "bank_transaction",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    bankAccountId: uuid("bank_account_id")
      .notNull()
      .references(() => bankAccount.id, { onDelete: "cascade" }),
    transactionId: text("transaction_id").notNull(), // From bank provider
    date: timestamp("date").notNull(),
    description: text("description").notNull(),
    amount: decimal("amount", { precision: 19, scale: 2 }).notNull(),
    type: text("type").notNull(), // debit, credit
    balance: decimal("balance", { precision: 19, scale: 2 }),
    category: text("category"), // Auto-categorized
    matchedEntryLineId: uuid("matched_entry_line_id").references(
      () => journalEntryLine.id,
      { onDelete: "set null" },
    ),
    isReconciled: boolean("is_reconciled").default(false).notNull(),
    reconciledAt: timestamp("reconciled_at"),
    reconciledBy: text("reconciled_by"),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("bank_transaction_bank_account_id_idx").on(table.bankAccountId),
    index("bank_transaction_date_idx").on(table.date),
    index("bank_transaction_reconciled_idx").on(table.isReconciled),
    index("bank_transaction_unique").on(
      table.bankAccountId,
      table.transactionId,
    ),
  ],
);

export const bankReconciliation = pgTable(
  "bank_reconciliation",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    bankAccountId: uuid("bank_account_id")
      .notNull()
      .references(() => bankAccount.id, { onDelete: "cascade" }),
    periodStart: timestamp("period_start").notNull(),
    periodEnd: timestamp("period_end").notNull(),
    statementBalance: decimal("statement_balance", {
      precision: 19,
      scale: 2,
    }).notNull(),
    statementDate: timestamp("statement_date").notNull(),
    bookBalance: decimal("book_balance", { precision: 19, scale: 2 }).notNull(),
    adjustments: jsonb("adjustments"), // Array of adjustment objects
    status: text("status").default("in_progress").notNull(), // in_progress, completed
    completedAt: timestamp("completed_at"),
    completedBy: text("completed_by"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("bank_reconciliation_bank_account_id_idx").on(table.bankAccountId),
    index("bank_reconciliation_period_idx").on(
      table.periodStart,
      table.periodEnd,
    ),
  ],
);

// ============================================================================
// Financial Reports & Periods
// ============================================================================

export const accountingPeriod = pgTable(
  "accounting_period",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    name: text("name").notNull(), // e.g., "January 2024"
    startDate: timestamp("date").notNull(),
    endDate: timestamp("end_date").notNull(),
    status: text("status").default("open").notNull(), // open, closed, locked
    closedAt: timestamp("closed_at"),
    closedBy: text("closed_by"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("accounting_period_organization_id_idx").on(table.organizationId),
    index("accounting_period_dates_idx").on(table.startDate, table.endDate),
  ],
);

export const reportTemplate = pgTable(
  "report_template",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    type: text("type").notNull(), // balance_sheet, profit_loss, cash_flow
    config: jsonb("config").notNull(), // Report configuration
    isDefault: boolean("is_default").default(false).notNull(),
    createdBy: text("created_by"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("report_template_organization_id_idx").on(table.organizationId),
    index("report_template_type_idx").on(table.type),
  ],
);

// ============================================================================
// Relations
// ============================================================================

export const accountRelations = relations(account, ({ one, many }) => ({
  organization: one(organization, {
    fields: [account.organizationId],
    references: [organization.id],
  }),
  parent: one(account, {
    fields: [account.parentId],
    references: [account.id],
  }),
  children: many(account, { relationName: "account_hierarchy" }),
  journalLines: many(journalEntryLine),
  bankAccounts: many(bankAccount),
}));

export const journalEntryRelations = relations(
  journalEntry,
  ({ one, many }) => ({
    organization: one(organization, {
      fields: [journalEntry.organizationId],
      references: [organization.id],
    }),
    lines: many(journalEntryLine),
  }),
);

export const journalEntryLineRelations = relations(
  journalEntryLine,
  ({ one }) => ({
    entry: one(journalEntry, {
      fields: [journalEntryLine.entryId],
      references: [journalEntry.id],
    }),
    account: one(account, {
      fields: [journalEntryLine.accountId],
      references: [account.id],
    }),
  }),
);

export const bankAccountRelations = relations(bankAccount, ({ one, many }) => ({
  organization: one(organization, {
    fields: [bankAccount.organizationId],
    references: [organization.id],
  }),
  account: one(account, {
    fields: [bankAccount.accountId],
    references: [account.id],
  }),
  transactions: many(bankTransaction),
  reconciliations: many(bankReconciliation),
}));

export const bankTransactionRelations = relations(
  bankTransaction,
  ({ one }) => ({
    bankAccount: one(bankAccount, {
      fields: [bankTransaction.bankAccountId],
      references: [bankAccount.id],
    }),
    matchedEntryLine: one(journalEntryLine, {
      fields: [bankTransaction.matchedEntryLineId],
      references: [journalEntryLine.id],
    }),
  }),
);

export const bankReconciliationRelations = relations(
  bankReconciliation,
  ({ one }) => ({
    bankAccount: one(bankAccount, {
      fields: [bankReconciliation.bankAccountId],
      references: [bankAccount.id],
    }),
  }),
);

export const accountingPeriodRelations = relations(
  accountingPeriod,
  ({ one }) => ({
    organization: one(organization, {
      fields: [accountingPeriod.organizationId],
      references: [organization.id],
    }),
  }),
);

export const reportTemplateRelations = relations(reportTemplate, ({ one }) => ({
  organization: one(organization, {
    fields: [reportTemplate.organizationId],
    references: [organization.id],
  }),
}));
