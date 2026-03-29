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
// Contacts (Customers & Vendors)
// ============================================================================

export const contactTypeEnum = pgEnum("contact_type", [
  "customer",
  "vendor",
  "lead",
  "other",
]);

export const contact = pgTable(
  "contact",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    type: contactTypeEnum("type").notNull(),
    name: text("name").notNull(),
    email: text("email"),
    phone: text("phone"),
    company: text("company"),
    taxId: text("tax_id"),
    currency: text("currency").default("USD").notNull(),
    paymentTerms: integer("payment_terms").default(30), // Net 30, Net 15, etc.
    creditLimit: decimal("credit_limit", { precision: 19, scale: 2 }),
    balance: decimal("balance", { precision: 19, scale: 2 }).default("0"),
    address: jsonb("address"), // { street, city, state, postalCode, country }
    shippingAddress: jsonb("shipping_address"),
    notes: text("notes"),
    isActive: boolean("is_active").default(true).notNull(),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("contact_organization_id_idx").on(table.organizationId),
    index("contact_type_idx").on(table.type),
    index("contact_email_idx").on(table.email),
  ],
);

// ============================================================================
// Invoices
// ============================================================================

export const invoiceStatusEnum = pgEnum("invoice_status", [
  "draft",
  "sent",
  "viewed",
  "partial",
  "paid",
  "overdue",
  "void",
  "refunded",
]);

export const invoice = pgTable(
  "invoice",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    customerId: uuid("customer_id")
      .notNull()
      .references(() => contact.id, { onDelete: "restrict" }),
    invoiceNumber: text("invoice_number").notNull(), // Auto-generated, e.g., "INV-2024-0001"
    status: invoiceStatusEnum("status").default("draft").notNull(),
    issueDate: timestamp("date").notNull(),
    dueDate: timestamp("due_date").notNull(),
    currency: text("currency").default("USD").notNull(),
    subtotal: decimal("subtotal", { precision: 19, scale: 2 }).notNull(),
    discountAmount: decimal("discount_amount", {
      precision: 19,
      scale: 2,
    }).default("0"),
    discountPercent: decimal("discount_percent", {
      precision: 5,
      scale: 2,
    }).default("0"),
    taxAmount: decimal("tax_amount", { precision: 19, scale: 2 }).default("0"),
    taxRate: decimal("tax_rate", { precision: 5, scale: 2 }).default("0"),
    total: decimal("total", { precision: 19, scale: 2 }).notNull(),
    amountPaid: decimal("amount_paid", { precision: 19, scale: 2 }).default(
      "0",
    ),
    amountDue: decimal("amount_due", { precision: 19, scale: 2 }).notNull(),
    notes: text("notes"),
    terms: text("terms"),
    footer: text("footer"),
    templateId: uuid("template_id"),
    billingAddress: jsonb("billing_address"),
    shippingAddress: jsonb("shipping_address"),
    metadata: jsonb("metadata"),
    sentAt: timestamp("sent_at"),
    viewedAt: timestamp("viewed_at"),
    paidAt: timestamp("paid_at"),
    overdueAt: timestamp("overdue_at"),
    voidedAt: timestamp("voided_at"),
    voidReason: text("void_reason"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("invoice_organization_id_idx").on(table.organizationId),
    index("invoice_customer_id_idx").on(table.customerId),
    index("invoice_status_idx").on(table.status),
    index("invoice_number_idx").on(table.invoiceNumber),
    index("invoice_due_date_idx").on(table.dueDate),
    index("invoice_unique_number").on(
      table.organizationId,
      table.invoiceNumber,
    ),
  ],
);

export const invoiceLine = pgTable(
  "invoice_line",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    invoiceId: uuid("invoice_id")
      .notNull()
      .references(() => invoice.id, { onDelete: "cascade" }),
    lineNumber: integer("line_number").notNull(),
    description: text("description").notNull(),
    quantity: decimal("quantity", { precision: 19, scale: 2 }).notNull(),
    unitPrice: decimal("unit_price", { precision: 19, scale: 2 }).notNull(),
    discountPercent: decimal("discount_percent", {
      precision: 5,
      scale: 2,
    }).default("0"),
    taxRate: decimal("tax_rate", { precision: 5, scale: 2 }).default("0"),
    taxAmount: decimal("tax_amount", { precision: 19, scale: 2 }).default("0"),
    lineTotal: decimal("line_total", { precision: 19, scale: 2 }).notNull(),
    productId: uuid("product_id"), // Link to product/service catalog
    accountId: uuid("account_id"), // Link to chart of accounts
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("invoice_line_invoice_id_idx").on(table.invoiceId)],
);

// ============================================================================
// Invoice Templates
// ============================================================================

export const invoiceTemplate = pgTable(
  "invoice_template",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    isDefault: boolean("is_default").default(false).notNull(),
    config: jsonb("config").notNull(), // Template configuration
    styles: jsonb("styles"), // Custom CSS/styles
    logo: text("logo"),
    primaryColor: text("primary_color"),
    fontFamily: text("font_family"),
    showFooter: boolean("show_footer").default(true),
    showTerms: boolean("show_terms").default(true),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("invoice_template_organization_id_idx").on(table.organizationId),
  ],
);

// ============================================================================
// Payments
// ============================================================================

export const paymentMethodEnum = pgEnum("payment_method", [
  "cash",
  "bank_transfer",
  "credit_card",
  "debit_card",
  "paypal",
  "stripe",
  "check",
  "other",
]);

export const payment = pgTable(
  "payment",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    invoiceId: uuid("invoice_id").references(() => invoice.id, {
      onDelete: "restrict",
    }),
    customerId: uuid("customer_id")
      .notNull()
      .references(() => contact.id, { onDelete: "restrict" }),
    paymentNumber: text("payment_number").notNull(),
    amount: decimal("amount", { precision: 19, scale: 2 }).notNull(),
    currency: text("currency").default("USD").notNull(),
    method: paymentMethodEnum("method").notNull(),
    reference: text("reference"), // Check number, transaction ID, etc.
    notes: text("notes"),
    status: text("status").default("completed").notNull(), // pending, completed, failed, refunded
    processedAt: timestamp("processed_at"),
    stripePaymentIntentId: text("stripe_payment_intent_id"),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("payment_organization_id_idx").on(table.organizationId),
    index("payment_invoice_id_idx").on(table.invoiceId),
    index("payment_customer_id_idx").on(table.customerId),
    index("payment_number_idx").on(table.paymentNumber),
    index("payment_unique_number").on(
      table.organizationId,
      table.paymentNumber,
    ),
  ],
);

export const paymentAllocation = pgTable(
  "payment_allocation",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    paymentId: uuid("payment_id")
      .notNull()
      .references(() => payment.id, { onDelete: "cascade" }),
    invoiceId: uuid("invoice_id")
      .notNull()
      .references(() => invoice.id, { onDelete: "cascade" }),
    amount: decimal("amount", { precision: 19, scale: 2 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("payment_allocation_payment_id_idx").on(table.paymentId),
    index("payment_allocation_invoice_id_idx").on(table.invoiceId),
  ],
);

// ============================================================================
// Recurring Invoices
// ============================================================================

export const recurrenceFrequencyEnum = pgEnum("recurrence_frequency", [
  "daily",
  "weekly",
  "biweekly",
  "monthly",
  "quarterly",
  "annually",
]);

export const recurringInvoice = pgTable(
  "recurring_invoice",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    customerId: uuid("customer_id")
      .notNull()
      .references(() => contact.id, { onDelete: "restrict" }),
    templateId: uuid("template_id").references(() => invoiceTemplate.id),
    name: text("name").notNull(),
    status: text("status").default("active").notNull(), // active, paused, completed
    frequency: recurrenceFrequencyEnum("frequency").notNull(),
    interval: integer("interval").default(1), // Every X frequency
    startDate: timestamp("start_date").notNull(),
    endDate: timestamp("end_date"),
    nextRunDate: timestamp("next_run_date"),
    lastRunDate: timestamp("last_run_date"),
    runCount: integer("run_count").default(0),
    maxRuns: integer("max_runs"),
    autoSend: boolean("auto_send").default(true).notNull(),
    autoCharge: boolean("auto_charge").default(false).notNull(),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("recurring_invoice_organization_id_idx").on(table.organizationId),
    index("recurring_invoice_customer_id_idx").on(table.customerId),
    index("recurring_invoice_next_run_idx").on(table.nextRunDate),
  ],
);

export const recurringInvoiceLine = pgTable(
  "recurring_invoice_line",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    recurringInvoiceId: uuid("recurring_invoice_id")
      .notNull()
      .references(() => recurringInvoice.id, { onDelete: "cascade" }),
    description: text("description").notNull(),
    quantity: decimal("quantity", { precision: 19, scale: 2 }).notNull(),
    unitPrice: decimal("unit_price", { precision: 19, scale: 2 }).notNull(),
    taxRate: decimal("tax_rate", { precision: 5, scale: 2 }).default("0"),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("recurring_invoice_line_recurring_id_idx").on(
      table.recurringInvoiceId,
    ),
  ],
);

// ============================================================================
// Client Portal
// ============================================================================

export const clientPortalUser = pgTable(
  "client_portal_user",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    contactId: uuid("contact_id")
      .notNull()
      .references(() => contact.id, { onDelete: "cascade" }),
    email: text("email").notNull().unique(),
    passwordHash: text("password_hash"),
    isActive: boolean("is_active").default(true).notNull(),
    lastLoginAt: timestamp("last_login_at"),
    token: text("token").unique(),
    tokenExpiresAt: timestamp("token_expires_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("client_portal_user_organization_id_idx").on(table.organizationId),
    index("client_portal_user_contact_id_idx").on(table.contactId),
    index("client_portal_user_email_idx").on(table.email),
  ],
);

// ============================================================================
// Relations
// ============================================================================

export const contactRelations = relations(contact, ({ one, many }) => ({
  organization: one(organization, {
    fields: [contact.organizationId],
    references: [organization.id],
  }),
  invoices: many(invoice),
  payments: many(payment),
  recurringInvoices: many(recurringInvoice),
}));

export const invoiceRelations = relations(invoice, ({ one, many }) => ({
  organization: one(organization, {
    fields: [invoice.organizationId],
    references: [organization.id],
  }),
  customer: one(contact, {
    fields: [invoice.customerId],
    references: [contact.id],
  }),
  lines: many(invoiceLine),
  payments: many(paymentAllocation),
  template: one(invoiceTemplate, {
    fields: [invoice.templateId],
    references: [invoiceTemplate.id],
  }),
}));

export const invoiceLineRelations = relations(invoiceLine, ({ one }) => ({
  invoice: one(invoice, {
    fields: [invoiceLine.invoiceId],
    references: [invoice.id],
  }),
}));

export const invoiceTemplateRelations = relations(
  invoiceTemplate,
  ({ one, many }) => ({
    organization: one(organization, {
      fields: [invoiceTemplate.organizationId],
      references: [organization.id],
    }),
    invoices: many(invoice),
    recurringInvoices: many(recurringInvoice),
  }),
);

export const paymentRelations = relations(payment, ({ one, many }) => ({
  organization: one(organization, {
    fields: [payment.organizationId],
    references: [organization.id],
  }),
  invoice: one(invoice, {
    fields: [payment.invoiceId],
    references: [invoice.id],
  }),
  customer: one(contact, {
    fields: [payment.customerId],
    references: [contact.id],
  }),
  allocations: many(paymentAllocation),
}));

export const paymentAllocationRelations = relations(
  paymentAllocation,
  ({ one }) => ({
    payment: one(payment, {
      fields: [paymentAllocation.paymentId],
      references: [payment.id],
    }),
    invoice: one(invoice, {
      fields: [paymentAllocation.invoiceId],
      references: [invoice.id],
    }),
  }),
);

export const recurringInvoiceRelations = relations(
  recurringInvoice,
  ({ one, many }) => ({
    organization: one(organization, {
      fields: [recurringInvoice.organizationId],
      references: [organization.id],
    }),
    customer: one(contact, {
      fields: [recurringInvoice.customerId],
      references: [contact.id],
    }),
    template: one(invoiceTemplate, {
      fields: [recurringInvoice.templateId],
      references: [invoiceTemplate.id],
    }),
    lines: many(recurringInvoiceLine),
  }),
);

export const recurringInvoiceLineRelations = relations(
  recurringInvoiceLine,
  ({ one }) => ({
    recurringInvoice: one(recurringInvoice, {
      fields: [recurringInvoiceLine.recurringInvoiceId],
      references: [recurringInvoice.id],
    }),
  }),
);

export const clientPortalUserRelations = relations(
  clientPortalUser,
  ({ one }) => ({
    organization: one(organization, {
      fields: [clientPortalUser.organizationId],
      references: [organization.id],
    }),
    contact: one(contact, {
      fields: [clientPortalUser.contactId],
      references: [contact.id],
    }),
  }),
);
