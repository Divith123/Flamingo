import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { user } from "./auth";

// ============================================================================
// Organization & Membership
// ============================================================================

export const organizationRoleEnum = pgEnum("organization_role", [
  "owner",
  "admin",
  "member",
  "viewer",
]);

export const organization = pgTable("organization", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  logo: text("logo"),
  industry: text("industry"),
  size: integer("size"),
  country: text("country"),
  currency: text("currency").default("USD").notNull(),
  fiscalYearStart: text("fiscal_year_start").default("01-01"),
  taxId: text("tax_id"),
  address: text("address"),
  phone: text("phone"),
  website: text("website"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const member = pgTable(
  "member",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    role: organizationRoleEnum("role").default("member").notNull(),
    invitedAt: timestamp("invited_at").defaultNow(),
    joinedAt: timestamp("joined_at"),
    invitedBy: text("invited_by").references(() => user.id),
    status: text("status").default("pending").notNull(), // pending, active, suspended
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("member_organization_id_idx").on(table.organizationId),
    index("member_user_id_idx").on(table.userId),
    index("member_org_user_unique").on(table.organizationId, table.userId),
  ],
);

export const invitation = pgTable(
  "invitation",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    email: text("email").notNull(),
    role: organizationRoleEnum("role").default("member").notNull(),
    token: text("token").notNull().unique(),
    expiresAt: timestamp("expires_at").notNull(),
    invitedBy: text("invited_by")
      .notNull()
      .references(() => user.id),
    status: text("status").default("pending").notNull(), // pending, accepted, declined, expired
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("invitation_organization_id_idx").on(table.organizationId),
    index("invitation_token_idx").on(table.token),
    index("invitation_email_idx").on(table.email),
  ],
);

// ============================================================================
// Notifications
// ============================================================================

export const notificationType = pgEnum("notification_type", [
  "approval",
  "alert",
  "reminder",
  "update",
  "info",
]);

export const notificationChannel = pgEnum("notification_channel", [
  "in_app",
  "email",
  "sms",
  "push",
]);

export const notification = pgTable(
  "notification",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    type: notificationType("type").notNull(),
    title: text("title").notNull(),
    message: text("message").notNull(),
    data: jsonb("data"),
    channel: notificationChannel("channel").default("in_app").notNull(),
    read: boolean("read").default(false).notNull(),
    readAt: timestamp("read_at"),
    actionUrl: text("action_url"),
    actionLabel: text("action_label"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("notification_user_id_idx").on(table.userId),
    index("notification_organization_id_idx").on(table.organizationId),
    index("notification_read_idx").on(table.read),
    index("notification_created_at_idx").on(table.createdAt),
  ],
);

export const notificationPreference = pgTable(
  "notification_preference",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    organizationId: uuid("organization_id").references(() => organization.id, {
      onDelete: "cascade",
    }),
    channel: notificationChannel("channel").notNull(),
    enabled: boolean("enabled").default(true).notNull(),
    digestEnabled: boolean("digest_enabled").default(false).notNull(),
    digestFrequency: text("digest_frequency").default("daily"), // immediate, daily, weekly
    quietHoursStart: text("quiet_hours_start"), // HH:MM format
    quietHoursEnd: text("quiet_hours_end"), // HH:MM format
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("notification_preference_user_id_idx").on(table.userId),
    index("notification_preference_org_user_idx").on(
      table.organizationId,
      table.userId,
    ),
  ],
);

// ============================================================================
// Activity Log & Audit Trail
// ============================================================================

export const activityLog = pgTable(
  "activity_log",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    userId: text("user_id").references(() => user.id, { onDelete: "set null" }),
    action: text("action").notNull(), // e.g., "invoice.created", "expense.approved"
    resourceType: text("resource_type").notNull(), // e.g., "invoice", "expense"
    resourceId: uuid("resource_id"),
    description: text("description").notNull(),
    metadata: jsonb("metadata"),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("activity_log_organization_id_idx").on(table.organizationId),
    index("activity_log_user_id_idx").on(table.userId),
    index("activity_log_resource_idx").on(table.resourceType, table.resourceId),
    index("activity_log_created_at_idx").on(table.createdAt),
  ],
);

// ============================================================================
// Product Access & Subscriptions
// ============================================================================

export const productEnum = pgEnum("product", [
  "core",
  "books",
  "expense",
  "payroll",
  "inventory",
  "sign",
  "billing",
  "commerce",
  "practice",
  "invoice",
  "checkout",
  "payments",
  "spend",
  "erp",
  "procurement",
]);

export const organizationProduct = pgTable(
  "organization_product",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    product: productEnum("product").notNull(),
    enabled: boolean("enabled").default(true).notNull(),
    plan: text("plan").default("free").notNull(), // free, standard, premium, enterprise
    features: jsonb("features"), // Custom features enabled
    metadata: jsonb("metadata"),
    activatedAt: timestamp("activated_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("org_product_org_id_idx").on(table.organizationId),
    index("org_product_product_idx").on(table.product),
    index("org_product_unique_idx").on(table.organizationId, table.product),
  ],
);

// ============================================================================
// Relations
// ============================================================================

export const organizationRelations = relations(organization, ({ many }) => ({
  members: many(member),
  invitations: many(invitation),
  notifications: many(notification),
  products: many(organizationProduct),
  activityLogs: many(activityLog),
}));

export const memberRelations = relations(member, ({ one }) => ({
  organization: one(organization, {
    fields: [member.organizationId],
    references: [organization.id],
  }),
  user: one(user, {
    fields: [member.userId],
    references: [user.id],
  }),
  inviter: one(user, {
    fields: [member.invitedBy],
    references: [user.id],
  }),
}));

export const invitationRelations = relations(invitation, ({ one }) => ({
  organization: one(organization, {
    fields: [invitation.organizationId],
    references: [organization.id],
  }),
  inviter: one(user, {
    fields: [invitation.invitedBy],
    references: [user.id],
  }),
}));

export const notificationRelations = relations(notification, ({ one }) => ({
  organization: one(organization, {
    fields: [notification.organizationId],
    references: [organization.id],
  }),
  user: one(user, {
    fields: [notification.userId],
    references: [user.id],
  }),
}));

export const notificationPreferenceRelations = relations(
  notificationPreference,
  ({ one }) => ({
    user: one(user, {
      fields: [notificationPreference.userId],
      references: [user.id],
    }),
    organization: one(organization, {
      fields: [notificationPreference.organizationId],
      references: [organization.id],
    }),
  }),
);

export const activityLogRelations = relations(activityLog, ({ one }) => ({
  organization: one(organization, {
    fields: [activityLog.organizationId],
    references: [organization.id],
  }),
  user: one(user, {
    fields: [activityLog.userId],
    references: [user.id],
  }),
}));

export const organizationProductRelations = relations(
  organizationProduct,
  ({ one }) => ({
    organization: one(organization, {
      fields: [organizationProduct.organizationId],
      references: [organization.id],
    }),
  }),
);
