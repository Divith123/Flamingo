CREATE TYPE "public"."account_subtype" AS ENUM('current_asset', 'fixed_asset', 'non_current_asset', 'cash', 'bank', 'accounts_receivable', 'inventory', 'current_liability', 'long_term_liability', 'accounts_payable', 'credit_card', 'loan', 'owners_equity', 'retained_earnings', 'operating_income', 'other_income', 'cost_of_goods_sold', 'operating_expense', 'other_expense');--> statement-breakpoint
CREATE TYPE "public"."account_type" AS ENUM('asset', 'liability', 'equity', 'income', 'expense');--> statement-breakpoint
CREATE TYPE "public"."entry_status" AS ENUM('draft', 'posted', 'void');--> statement-breakpoint
CREATE TYPE "public"."notification_channel" AS ENUM('in_app', 'email', 'sms', 'push');--> statement-breakpoint
CREATE TYPE "public"."notification_type" AS ENUM('approval', 'alert', 'reminder', 'update', 'info');--> statement-breakpoint
CREATE TYPE "public"."organization_role" AS ENUM('owner', 'admin', 'member', 'viewer');--> statement-breakpoint
CREATE TYPE "public"."product" AS ENUM('core', 'books', 'expense', 'payroll', 'inventory', 'sign', 'billing', 'commerce', 'practice', 'invoice', 'checkout', 'payments', 'spend', 'erp', 'procurement');--> statement-breakpoint
CREATE TYPE "public"."expense_payment_method" AS ENUM('cash', 'personal_card', 'company_card', 'bank_transfer', 'check', 'other');--> statement-breakpoint
CREATE TYPE "public"."expense_status" AS ENUM('draft', 'pending_approval', 'approved', 'rejected', 'reimbursed', 'paid');--> statement-breakpoint
CREATE TYPE "public"."contact_type" AS ENUM('customer', 'vendor', 'lead', 'other');--> statement-breakpoint
CREATE TYPE "public"."invoice_status" AS ENUM('draft', 'sent', 'viewed', 'partial', 'paid', 'overdue', 'void', 'refunded');--> statement-breakpoint
CREATE TYPE "public"."payment_method" AS ENUM('cash', 'bank_transfer', 'credit_card', 'debit_card', 'paypal', 'stripe', 'check', 'other');--> statement-breakpoint
CREATE TYPE "public"."recurrence_frequency" AS ENUM('daily', 'weekly', 'biweekly', 'monthly', 'quarterly', 'annually');--> statement-breakpoint
CREATE TABLE "account" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"code" text NOT NULL,
	"name" text NOT NULL,
	"type" "account_type" NOT NULL,
	"subtype" "account_subtype",
	"description" text,
	"currency" text DEFAULT 'USD' NOT NULL,
	"parent_id" uuid,
	"is_header" boolean DEFAULT false NOT NULL,
	"is_system" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"tax_code" text,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "accounting_period" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"name" text NOT NULL,
	"date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"status" text DEFAULT 'open' NOT NULL,
	"closed_at" timestamp,
	"closed_by" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bank_account" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"account_id" uuid NOT NULL,
	"name" text NOT NULL,
	"bank_name" text,
	"account_number" text,
	"routing_number" text,
	"currency" text DEFAULT 'USD' NOT NULL,
	"balance" numeric(19, 2) DEFAULT '0',
	"reconciled_balance" numeric(19, 2) DEFAULT '0',
	"last_reconciled_date" timestamp,
	"is_active" boolean DEFAULT true NOT NULL,
	"provider_connection" jsonb,
	"last_sync_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bank_reconciliation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"bank_account_id" uuid NOT NULL,
	"period_start" timestamp NOT NULL,
	"period_end" timestamp NOT NULL,
	"statement_balance" numeric(19, 2) NOT NULL,
	"statement_date" timestamp NOT NULL,
	"book_balance" numeric(19, 2) NOT NULL,
	"adjustments" jsonb,
	"status" text DEFAULT 'in_progress' NOT NULL,
	"completed_at" timestamp,
	"completed_by" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bank_transaction" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"bank_account_id" uuid NOT NULL,
	"transaction_id" text NOT NULL,
	"date" timestamp NOT NULL,
	"description" text NOT NULL,
	"amount" numeric(19, 2) NOT NULL,
	"type" text NOT NULL,
	"balance" numeric(19, 2),
	"category" text,
	"matched_entry_line_id" uuid,
	"is_reconciled" boolean DEFAULT false NOT NULL,
	"reconciled_at" timestamp,
	"reconciled_by" text,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "journal_entry" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"entry_number" text NOT NULL,
	"date" timestamp NOT NULL,
	"description" text NOT NULL,
	"status" "entry_status" DEFAULT 'draft' NOT NULL,
	"reference" text,
	"source_type" text,
	"source_id" uuid,
	"attachment_ids" jsonb,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"posted_at" timestamp,
	"posted_by" text
);
--> statement-breakpoint
CREATE TABLE "journal_entry_line" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"entry_id" uuid NOT NULL,
	"account_id" uuid NOT NULL,
	"description" text,
	"debit_amount" numeric(19, 4) DEFAULT '0',
	"credit_amount" numeric(19, 4) DEFAULT '0',
	"tax_amount" numeric(19, 4) DEFAULT '0',
	"tax_code" text,
	"contact_id" uuid,
	"project_id" uuid,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "report_template" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"config" jsonb NOT NULL,
	"is_default" boolean DEFAULT false NOT NULL,
	"created_by" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "activity_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"user_id" text,
	"action" text NOT NULL,
	"resource_type" text NOT NULL,
	"resource_id" uuid,
	"description" text NOT NULL,
	"metadata" jsonb,
	"ip_address" text,
	"user_agent" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invitation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"email" text NOT NULL,
	"role" "organization_role" DEFAULT 'member' NOT NULL,
	"token" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"invited_by" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "invitation_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "member" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"role" "organization_role" DEFAULT 'member' NOT NULL,
	"invited_at" timestamp DEFAULT now(),
	"joined_at" timestamp,
	"invited_by" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notification" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"type" "notification_type" NOT NULL,
	"title" text NOT NULL,
	"message" text NOT NULL,
	"data" jsonb,
	"channel" "notification_channel" DEFAULT 'in_app' NOT NULL,
	"read" boolean DEFAULT false NOT NULL,
	"read_at" timestamp,
	"action_url" text,
	"action_label" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notification_preference" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"organization_id" uuid,
	"channel" "notification_channel" NOT NULL,
	"enabled" boolean DEFAULT true NOT NULL,
	"digest_enabled" boolean DEFAULT false NOT NULL,
	"digest_frequency" text DEFAULT 'daily',
	"quiet_hours_start" text,
	"quiet_hours_end" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organization" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"logo" text,
	"industry" text,
	"size" integer,
	"country" text,
	"currency" text DEFAULT 'USD' NOT NULL,
	"fiscal_year_start" text DEFAULT '01-01',
	"tax_id" text,
	"address" text,
	"phone" text,
	"website" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "organization_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "organization_product" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"product" "product" NOT NULL,
	"enabled" boolean DEFAULT true NOT NULL,
	"plan" text DEFAULT 'free' NOT NULL,
	"features" jsonb,
	"metadata" jsonb,
	"activated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "approval_level" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"name" text NOT NULL,
	"order" integer NOT NULL,
	"approver_id" text NOT NULL,
	"alternate_approver_id" text,
	"min_amount" numeric(19, 2),
	"max_amount" numeric(19, 2),
	"department" text,
	"category" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "approval_workflow" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"trigger_type" text NOT NULL,
	"trigger_config" jsonb NOT NULL,
	"levels" jsonb NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "card_transaction" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"card_id" uuid NOT NULL,
	"transaction_id" text NOT NULL,
	"date" timestamp NOT NULL,
	"posted_date" timestamp,
	"merchant_name" text NOT NULL,
	"merchant_category" text,
	"amount" numeric(19, 2) NOT NULL,
	"currency" text DEFAULT 'USD' NOT NULL,
	"fx_amount" numeric(19, 2),
	"fx_currency" text,
	"fx_rate" numeric(19, 6),
	"status" text DEFAULT 'pending' NOT NULL,
	"category" text,
	"expense_id" uuid,
	"is_matched" boolean DEFAULT false NOT NULL,
	"matched_at" timestamp,
	"matched_by" text,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "corporate_card" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"card_number" text NOT NULL,
	"last_four_digits" text NOT NULL,
	"cardholder_name" text NOT NULL,
	"employee_id" text,
	"status" text DEFAULT 'active' NOT NULL,
	"card_type" text,
	"expiry_date" text,
	"credit_limit" numeric(19, 2),
	"current_balance" numeric(19, 2) DEFAULT '0',
	"available_balance" numeric(19, 2),
	"billing_cycle_day" integer,
	"auto_match" boolean DEFAULT true NOT NULL,
	"provider" text,
	"provider_account_id" text,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "expense" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"category_id" uuid,
	"employee_id" text NOT NULL,
	"vendor_id" uuid,
	"amount" numeric(19, 2) NOT NULL,
	"currency" text DEFAULT 'USD' NOT NULL,
	"fx_rate" numeric(19, 6) DEFAULT '1',
	"tax_amount" numeric(19, 2) DEFAULT '0',
	"tax_rate" numeric(5, 2) DEFAULT '0',
	"total_amount" numeric(19, 2) NOT NULL,
	"date" timestamp NOT NULL,
	"description" text NOT NULL,
	"notes" text,
	"payment_method" "expense_payment_method" DEFAULT 'personal_card',
	"status" "expense_status" DEFAULT 'draft' NOT NULL,
	"billable" boolean DEFAULT false NOT NULL,
	"project_id" uuid,
	"customer_id" uuid,
	"receipt_required" boolean DEFAULT false,
	"receipt_missing" boolean DEFAULT false,
	"location" jsonb,
	"metadata" jsonb,
	"submitted_at" timestamp,
	"submitted_by" text,
	"approved_at" timestamp,
	"approved_by" text,
	"rejected_at" timestamp,
	"rejected_by" text,
	"rejection_reason" text,
	"reimbursed_at" timestamp,
	"reimbursed_amount" numeric(19, 2),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "expense_approval" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"expense_id" uuid NOT NULL,
	"workflow_id" uuid,
	"current_level" integer DEFAULT 1,
	"status" text DEFAULT 'pending' NOT NULL,
	"approver_id" text,
	"approved_at" timestamp,
	"rejected_at" timestamp,
	"rejection_reason" text,
	"escalated_at" timestamp,
	"escalated_to" text,
	"comments" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "expense_category" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"code" text,
	"color" text,
	"parent_category_id" uuid,
	"account_id" uuid,
	"is_system" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"default_tax_code" text,
	"receipt_required" boolean DEFAULT false,
	"receipt_required_amount" numeric(19, 2),
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mileage_expense" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"expense_id" uuid NOT NULL,
	"vehicle_type" text DEFAULT 'car' NOT NULL,
	"distance" numeric(10, 2) NOT NULL,
	"unit" text DEFAULT 'miles' NOT NULL,
	"start_location" text NOT NULL,
	"end_location" text NOT NULL,
	"purpose" text NOT NULL,
	"route" jsonb,
	"rate_id" uuid,
	"rate_per_unit" numeric(10, 4) NOT NULL,
	"total_amount" numeric(19, 2) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mileage_rate" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"name" text NOT NULL,
	"rate_per_mile" numeric(10, 4) NOT NULL,
	"rate_per_km" numeric(10, 4),
	"currency" text DEFAULT 'USD' NOT NULL,
	"effective_date" timestamp NOT NULL,
	"end_date" timestamp,
	"is_default" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "per_diem_rate" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"location" text NOT NULL,
	"location_type" text NOT NULL,
	"effective_date" timestamp NOT NULL,
	"end_date" timestamp,
	"meals_rate" numeric(10, 2) NOT NULL,
	"lodging_rate" numeric(10, 2),
	"incidental_rate" numeric(10, 2),
	"total_rate" numeric(10, 2) NOT NULL,
	"currency" text DEFAULT 'USD' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "receipt" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"expense_id" uuid,
	"organization_id" uuid NOT NULL,
	"uploaded_by" text NOT NULL,
	"file_url" text NOT NULL,
	"file_name" text NOT NULL,
	"file_size" integer,
	"mime_type" text NOT NULL,
	"ocr_status" text DEFAULT 'pending',
	"ocr_data" jsonb,
	"merchant_name" text,
	"merchant_address" text,
	"transaction_date" timestamp,
	"subtotal" numeric(19, 2),
	"tax" numeric(19, 2),
	"total" numeric(19, 2),
	"payment_method" text,
	"last_four_digits" text,
	"confidence" numeric(5, 2),
	"verified" boolean DEFAULT false NOT NULL,
	"verified_by" text,
	"verified_at" timestamp,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "client_portal_user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"contact_id" uuid NOT NULL,
	"email" text NOT NULL,
	"password_hash" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"last_login_at" timestamp,
	"token" text,
	"token_expires_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "client_portal_user_email_unique" UNIQUE("email"),
	CONSTRAINT "client_portal_user_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "contact" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"type" "contact_type" NOT NULL,
	"name" text NOT NULL,
	"email" text,
	"phone" text,
	"company" text,
	"tax_id" text,
	"currency" text DEFAULT 'USD' NOT NULL,
	"payment_terms" integer DEFAULT 30,
	"credit_limit" numeric(19, 2),
	"balance" numeric(19, 2) DEFAULT '0',
	"address" jsonb,
	"shipping_address" jsonb,
	"notes" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invoice" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"customer_id" uuid NOT NULL,
	"invoice_number" text NOT NULL,
	"status" "invoice_status" DEFAULT 'draft' NOT NULL,
	"date" timestamp NOT NULL,
	"due_date" timestamp NOT NULL,
	"currency" text DEFAULT 'USD' NOT NULL,
	"subtotal" numeric(19, 2) NOT NULL,
	"discount_amount" numeric(19, 2) DEFAULT '0',
	"discount_percent" numeric(5, 2) DEFAULT '0',
	"tax_amount" numeric(19, 2) DEFAULT '0',
	"tax_rate" numeric(5, 2) DEFAULT '0',
	"total" numeric(19, 2) NOT NULL,
	"amount_paid" numeric(19, 2) DEFAULT '0',
	"amount_due" numeric(19, 2) NOT NULL,
	"notes" text,
	"terms" text,
	"footer" text,
	"template_id" uuid,
	"billing_address" jsonb,
	"shipping_address" jsonb,
	"metadata" jsonb,
	"sent_at" timestamp,
	"viewed_at" timestamp,
	"paid_at" timestamp,
	"overdue_at" timestamp,
	"voided_at" timestamp,
	"void_reason" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invoice_line" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"invoice_id" uuid NOT NULL,
	"line_number" integer NOT NULL,
	"description" text NOT NULL,
	"quantity" numeric(19, 2) NOT NULL,
	"unit_price" numeric(19, 2) NOT NULL,
	"discount_percent" numeric(5, 2) DEFAULT '0',
	"tax_rate" numeric(5, 2) DEFAULT '0',
	"tax_amount" numeric(19, 2) DEFAULT '0',
	"line_total" numeric(19, 2) NOT NULL,
	"product_id" uuid,
	"account_id" uuid,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invoice_template" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"name" text NOT NULL,
	"is_default" boolean DEFAULT false NOT NULL,
	"config" jsonb NOT NULL,
	"styles" jsonb,
	"logo" text,
	"primary_color" text,
	"font_family" text,
	"show_footer" boolean DEFAULT true,
	"show_terms" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"invoice_id" uuid,
	"customer_id" uuid NOT NULL,
	"payment_number" text NOT NULL,
	"amount" numeric(19, 2) NOT NULL,
	"currency" text DEFAULT 'USD' NOT NULL,
	"method" "payment_method" NOT NULL,
	"reference" text,
	"notes" text,
	"status" text DEFAULT 'completed' NOT NULL,
	"processed_at" timestamp,
	"stripe_payment_intent_id" text,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payment_allocation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"payment_id" uuid NOT NULL,
	"invoice_id" uuid NOT NULL,
	"amount" numeric(19, 2) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "recurring_invoice" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"customer_id" uuid NOT NULL,
	"template_id" uuid,
	"name" text NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"frequency" "recurrence_frequency" NOT NULL,
	"interval" integer DEFAULT 1,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp,
	"next_run_date" timestamp,
	"last_run_date" timestamp,
	"run_count" integer DEFAULT 0,
	"max_runs" integer,
	"auto_send" boolean DEFAULT true NOT NULL,
	"auto_charge" boolean DEFAULT false NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "recurring_invoice_line" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"recurring_invoice_id" uuid NOT NULL,
	"description" text NOT NULL,
	"quantity" numeric(19, 2) NOT NULL,
	"unit_price" numeric(19, 2) NOT NULL,
	"tax_rate" numeric(5, 2) DEFAULT '0',
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_parent_id_account_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."account"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "accounting_period" ADD CONSTRAINT "accounting_period_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bank_account" ADD CONSTRAINT "bank_account_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bank_account" ADD CONSTRAINT "bank_account_account_id_account_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."account"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bank_reconciliation" ADD CONSTRAINT "bank_reconciliation_bank_account_id_bank_account_id_fk" FOREIGN KEY ("bank_account_id") REFERENCES "public"."bank_account"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bank_transaction" ADD CONSTRAINT "bank_transaction_bank_account_id_bank_account_id_fk" FOREIGN KEY ("bank_account_id") REFERENCES "public"."bank_account"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bank_transaction" ADD CONSTRAINT "bank_transaction_matched_entry_line_id_journal_entry_line_id_fk" FOREIGN KEY ("matched_entry_line_id") REFERENCES "public"."journal_entry_line"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "journal_entry" ADD CONSTRAINT "journal_entry_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "journal_entry" ADD CONSTRAINT "journal_entry_posted_by_organization_created_at_fk" FOREIGN KEY ("posted_by") REFERENCES "public"."organization"("created_at") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "journal_entry_line" ADD CONSTRAINT "journal_entry_line_entry_id_journal_entry_id_fk" FOREIGN KEY ("entry_id") REFERENCES "public"."journal_entry"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "journal_entry_line" ADD CONSTRAINT "journal_entry_line_account_id_account_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."account"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report_template" ADD CONSTRAINT "report_template_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activity_log" ADD CONSTRAINT "activity_log_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activity_log" ADD CONSTRAINT "activity_log_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_invited_by_user_id_fk" FOREIGN KEY ("invited_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member" ADD CONSTRAINT "member_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member" ADD CONSTRAINT "member_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member" ADD CONSTRAINT "member_invited_by_user_id_fk" FOREIGN KEY ("invited_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notification" ADD CONSTRAINT "notification_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notification" ADD CONSTRAINT "notification_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notification_preference" ADD CONSTRAINT "notification_preference_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notification_preference" ADD CONSTRAINT "notification_preference_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_product" ADD CONSTRAINT "organization_product_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "approval_level" ADD CONSTRAINT "approval_level_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "approval_level" ADD CONSTRAINT "approval_level_approver_id_organization_created_at_fk" FOREIGN KEY ("approver_id") REFERENCES "public"."organization"("created_at") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "approval_level" ADD CONSTRAINT "approval_level_alternate_approver_id_organization_created_at_fk" FOREIGN KEY ("alternate_approver_id") REFERENCES "public"."organization"("created_at") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "approval_workflow" ADD CONSTRAINT "approval_workflow_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "card_transaction" ADD CONSTRAINT "card_transaction_card_id_corporate_card_id_fk" FOREIGN KEY ("card_id") REFERENCES "public"."corporate_card"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "card_transaction" ADD CONSTRAINT "card_transaction_expense_id_expense_id_fk" FOREIGN KEY ("expense_id") REFERENCES "public"."expense"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "corporate_card" ADD CONSTRAINT "corporate_card_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "corporate_card" ADD CONSTRAINT "corporate_card_employee_id_organization_created_at_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."organization"("created_at") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense" ADD CONSTRAINT "expense_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense" ADD CONSTRAINT "expense_category_id_expense_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."expense_category"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense" ADD CONSTRAINT "expense_employee_id_organization_created_at_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."organization"("created_at") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense" ADD CONSTRAINT "expense_vendor_id_organization_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense_approval" ADD CONSTRAINT "expense_approval_expense_id_expense_id_fk" FOREIGN KEY ("expense_id") REFERENCES "public"."expense"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense_approval" ADD CONSTRAINT "expense_approval_workflow_id_approval_workflow_id_fk" FOREIGN KEY ("workflow_id") REFERENCES "public"."approval_workflow"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense_approval" ADD CONSTRAINT "expense_approval_approver_id_organization_created_at_fk" FOREIGN KEY ("approver_id") REFERENCES "public"."organization"("created_at") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense_category" ADD CONSTRAINT "expense_category_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense_category" ADD CONSTRAINT "expense_category_parent_category_id_expense_category_id_fk" FOREIGN KEY ("parent_category_id") REFERENCES "public"."expense_category"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mileage_expense" ADD CONSTRAINT "mileage_expense_expense_id_expense_id_fk" FOREIGN KEY ("expense_id") REFERENCES "public"."expense"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mileage_expense" ADD CONSTRAINT "mileage_expense_rate_id_mileage_rate_id_fk" FOREIGN KEY ("rate_id") REFERENCES "public"."mileage_rate"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mileage_rate" ADD CONSTRAINT "mileage_rate_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "per_diem_rate" ADD CONSTRAINT "per_diem_rate_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "receipt" ADD CONSTRAINT "receipt_expense_id_expense_id_fk" FOREIGN KEY ("expense_id") REFERENCES "public"."expense"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "receipt" ADD CONSTRAINT "receipt_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "receipt" ADD CONSTRAINT "receipt_uploaded_by_organization_created_at_fk" FOREIGN KEY ("uploaded_by") REFERENCES "public"."organization"("created_at") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "client_portal_user" ADD CONSTRAINT "client_portal_user_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "client_portal_user" ADD CONSTRAINT "client_portal_user_contact_id_contact_id_fk" FOREIGN KEY ("contact_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contact" ADD CONSTRAINT "contact_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_customer_id_contact_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."contact"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoice_line" ADD CONSTRAINT "invoice_line_invoice_id_invoice_id_fk" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoice"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoice_template" ADD CONSTRAINT "invoice_template_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment" ADD CONSTRAINT "payment_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment" ADD CONSTRAINT "payment_invoice_id_invoice_id_fk" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoice"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment" ADD CONSTRAINT "payment_customer_id_contact_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."contact"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment_allocation" ADD CONSTRAINT "payment_allocation_payment_id_payment_id_fk" FOREIGN KEY ("payment_id") REFERENCES "public"."payment"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment_allocation" ADD CONSTRAINT "payment_allocation_invoice_id_invoice_id_fk" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoice"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recurring_invoice" ADD CONSTRAINT "recurring_invoice_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recurring_invoice" ADD CONSTRAINT "recurring_invoice_customer_id_contact_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."contact"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recurring_invoice" ADD CONSTRAINT "recurring_invoice_template_id_invoice_template_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."invoice_template"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recurring_invoice_line" ADD CONSTRAINT "recurring_invoice_line_recurring_invoice_id_recurring_invoice_id_fk" FOREIGN KEY ("recurring_invoice_id") REFERENCES "public"."recurring_invoice"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "account_organization_id_idx" ON "account" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "account_code_idx" ON "account" USING btree ("code");--> statement-breakpoint
CREATE INDEX "account_type_idx" ON "account" USING btree ("type");--> statement-breakpoint
CREATE INDEX "account_parent_id_idx" ON "account" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "account_unique_code" ON "account" USING btree ("organization_id","code");--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" USING btree ("identifier");--> statement-breakpoint
CREATE INDEX "accounting_period_organization_id_idx" ON "accounting_period" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "accounting_period_dates_idx" ON "accounting_period" USING btree ("date","end_date");--> statement-breakpoint
CREATE INDEX "bank_account_organization_id_idx" ON "bank_account" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "bank_account_account_id_idx" ON "bank_account" USING btree ("account_id");--> statement-breakpoint
CREATE INDEX "bank_reconciliation_bank_account_id_idx" ON "bank_reconciliation" USING btree ("bank_account_id");--> statement-breakpoint
CREATE INDEX "bank_reconciliation_period_idx" ON "bank_reconciliation" USING btree ("period_start","period_end");--> statement-breakpoint
CREATE INDEX "bank_transaction_bank_account_id_idx" ON "bank_transaction" USING btree ("bank_account_id");--> statement-breakpoint
CREATE INDEX "bank_transaction_date_idx" ON "bank_transaction" USING btree ("date");--> statement-breakpoint
CREATE INDEX "bank_transaction_reconciled_idx" ON "bank_transaction" USING btree ("is_reconciled");--> statement-breakpoint
CREATE INDEX "bank_transaction_unique" ON "bank_transaction" USING btree ("bank_account_id","transaction_id");--> statement-breakpoint
CREATE INDEX "journal_entry_organization_id_idx" ON "journal_entry" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "journal_entry_date_idx" ON "journal_entry" USING btree ("date");--> statement-breakpoint
CREATE INDEX "journal_entry_status_idx" ON "journal_entry" USING btree ("status");--> statement-breakpoint
CREATE INDEX "journal_entry_number_idx" ON "journal_entry" USING btree ("entry_number");--> statement-breakpoint
CREATE INDEX "journal_entry_source_idx" ON "journal_entry" USING btree ("source_type","source_id");--> statement-breakpoint
CREATE INDEX "journal_entry_line_entry_id_idx" ON "journal_entry_line" USING btree ("entry_id");--> statement-breakpoint
CREATE INDEX "journal_entry_line_account_id_idx" ON "journal_entry_line" USING btree ("account_id");--> statement-breakpoint
CREATE INDEX "report_template_organization_id_idx" ON "report_template" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "report_template_type_idx" ON "report_template" USING btree ("type");--> statement-breakpoint
CREATE INDEX "activity_log_organization_id_idx" ON "activity_log" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "activity_log_user_id_idx" ON "activity_log" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "activity_log_resource_idx" ON "activity_log" USING btree ("resource_type","resource_id");--> statement-breakpoint
CREATE INDEX "activity_log_created_at_idx" ON "activity_log" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "invitation_organization_id_idx" ON "invitation" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "invitation_token_idx" ON "invitation" USING btree ("token");--> statement-breakpoint
CREATE INDEX "invitation_email_idx" ON "invitation" USING btree ("email");--> statement-breakpoint
CREATE INDEX "member_organization_id_idx" ON "member" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "member_user_id_idx" ON "member" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "member_org_user_unique" ON "member" USING btree ("organization_id","user_id");--> statement-breakpoint
CREATE INDEX "notification_user_id_idx" ON "notification" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "notification_organization_id_idx" ON "notification" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "notification_read_idx" ON "notification" USING btree ("read");--> statement-breakpoint
CREATE INDEX "notification_created_at_idx" ON "notification" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "notification_preference_user_id_idx" ON "notification_preference" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "notification_preference_org_user_idx" ON "notification_preference" USING btree ("organization_id","user_id");--> statement-breakpoint
CREATE INDEX "org_product_org_id_idx" ON "organization_product" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "org_product_product_idx" ON "organization_product" USING btree ("product");--> statement-breakpoint
CREATE INDEX "org_product_unique_idx" ON "organization_product" USING btree ("organization_id","product");--> statement-breakpoint
CREATE INDEX "approval_level_organization_id_idx" ON "approval_level" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "approval_level_order_idx" ON "approval_level" USING btree ("order");--> statement-breakpoint
CREATE INDEX "approval_workflow_organization_id_idx" ON "approval_workflow" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "card_transaction_card_id_idx" ON "card_transaction" USING btree ("card_id");--> statement-breakpoint
CREATE INDEX "card_transaction_date_idx" ON "card_transaction" USING btree ("date");--> statement-breakpoint
CREATE INDEX "card_transaction_expense_id_idx" ON "card_transaction" USING btree ("expense_id");--> statement-breakpoint
CREATE INDEX "card_transaction_unique" ON "card_transaction" USING btree ("card_id","transaction_id");--> statement-breakpoint
CREATE INDEX "corporate_card_organization_id_idx" ON "corporate_card" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "corporate_card_employee_id_idx" ON "corporate_card" USING btree ("employee_id");--> statement-breakpoint
CREATE INDEX "expense_organization_id_idx" ON "expense" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "expense_category_id_idx" ON "expense" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "expense_employee_id_idx" ON "expense" USING btree ("employee_id");--> statement-breakpoint
CREATE INDEX "expense_status_idx" ON "expense" USING btree ("status");--> statement-breakpoint
CREATE INDEX "expense_date_idx" ON "expense" USING btree ("date");--> statement-breakpoint
CREATE INDEX "expense_billable_idx" ON "expense" USING btree ("billable");--> statement-breakpoint
CREATE INDEX "expense_approval_expense_id_idx" ON "expense_approval" USING btree ("expense_id");--> statement-breakpoint
CREATE INDEX "expense_approval_approver_id_idx" ON "expense_approval" USING btree ("approver_id");--> statement-breakpoint
CREATE INDEX "expense_approval_status_idx" ON "expense_approval" USING btree ("status");--> statement-breakpoint
CREATE INDEX "expense_category_organization_id_idx" ON "expense_category" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "expense_category_parent_id_idx" ON "expense_category" USING btree ("parent_category_id");--> statement-breakpoint
CREATE INDEX "mileage_expense_expense_id_idx" ON "mileage_expense" USING btree ("expense_id");--> statement-breakpoint
CREATE INDEX "mileage_rate_organization_id_idx" ON "mileage_rate" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "mileage_rate_effective_date_idx" ON "mileage_rate" USING btree ("effective_date");--> statement-breakpoint
CREATE INDEX "per_diem_rate_organization_id_idx" ON "per_diem_rate" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "per_diem_rate_location_idx" ON "per_diem_rate" USING btree ("location");--> statement-breakpoint
CREATE INDEX "per_diem_rate_effective_date_idx" ON "per_diem_rate" USING btree ("effective_date");--> statement-breakpoint
CREATE INDEX "receipt_expense_id_idx" ON "receipt" USING btree ("expense_id");--> statement-breakpoint
CREATE INDEX "receipt_organization_id_idx" ON "receipt" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "receipt_ocr_status_idx" ON "receipt" USING btree ("ocr_status");--> statement-breakpoint
CREATE INDEX "client_portal_user_organization_id_idx" ON "client_portal_user" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "client_portal_user_contact_id_idx" ON "client_portal_user" USING btree ("contact_id");--> statement-breakpoint
CREATE INDEX "client_portal_user_email_idx" ON "client_portal_user" USING btree ("email");--> statement-breakpoint
CREATE INDEX "contact_organization_id_idx" ON "contact" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "contact_type_idx" ON "contact" USING btree ("type");--> statement-breakpoint
CREATE INDEX "contact_email_idx" ON "contact" USING btree ("email");--> statement-breakpoint
CREATE INDEX "invoice_organization_id_idx" ON "invoice" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "invoice_customer_id_idx" ON "invoice" USING btree ("customer_id");--> statement-breakpoint
CREATE INDEX "invoice_status_idx" ON "invoice" USING btree ("status");--> statement-breakpoint
CREATE INDEX "invoice_number_idx" ON "invoice" USING btree ("invoice_number");--> statement-breakpoint
CREATE INDEX "invoice_due_date_idx" ON "invoice" USING btree ("due_date");--> statement-breakpoint
CREATE INDEX "invoice_unique_number" ON "invoice" USING btree ("organization_id","invoice_number");--> statement-breakpoint
CREATE INDEX "invoice_line_invoice_id_idx" ON "invoice_line" USING btree ("invoice_id");--> statement-breakpoint
CREATE INDEX "invoice_template_organization_id_idx" ON "invoice_template" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "payment_organization_id_idx" ON "payment" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "payment_invoice_id_idx" ON "payment" USING btree ("invoice_id");--> statement-breakpoint
CREATE INDEX "payment_customer_id_idx" ON "payment" USING btree ("customer_id");--> statement-breakpoint
CREATE INDEX "payment_number_idx" ON "payment" USING btree ("payment_number");--> statement-breakpoint
CREATE INDEX "payment_unique_number" ON "payment" USING btree ("organization_id","payment_number");--> statement-breakpoint
CREATE INDEX "payment_allocation_payment_id_idx" ON "payment_allocation" USING btree ("payment_id");--> statement-breakpoint
CREATE INDEX "payment_allocation_invoice_id_idx" ON "payment_allocation" USING btree ("invoice_id");--> statement-breakpoint
CREATE INDEX "recurring_invoice_organization_id_idx" ON "recurring_invoice" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "recurring_invoice_customer_id_idx" ON "recurring_invoice" USING btree ("customer_id");--> statement-breakpoint
CREATE INDEX "recurring_invoice_next_run_idx" ON "recurring_invoice" USING btree ("next_run_date");--> statement-breakpoint
CREATE INDEX "recurring_invoice_line_recurring_id_idx" ON "recurring_invoice_line" USING btree ("recurring_invoice_id");