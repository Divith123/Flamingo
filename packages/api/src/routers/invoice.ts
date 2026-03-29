import { z } from "zod";

import { protectedProcedure, router } from "../index.js";

export const invoiceRouter = router({
  // List invoices
  list: protectedProcedure
    .input(
      z.object({
        organizationId: z.string().uuid(),
        status: z
          .enum([
            "draft",
            "sent",
            "viewed",
            "partial",
            "paid",
            "overdue",
            "void",
            "refunded",
          ])
          .optional(),
        customerId: z.string().uuid().optional(),
        limit: z.number().default(50),
        offset: z.number().default(0),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { db } = ctx;

      const whereConditions = [];
      if (input.status) {
        whereConditions.push((invoices, { eq }) =>
          eq(invoices.status, input.status),
        );
      }
      if (input.customerId) {
        whereConditions.push((invoices, { eq }) =>
          eq(invoices.customerId, input.customerId),
        );
      }

      const invoices = await db.query.invoice.findMany({
        where: (invoices, { and, eq }) =>
          and(
            eq(invoices.organizationId, input.organizationId),
            ...whereConditions,
          ),
        with: {
          customer: true,
          lines: true,
        },
        orderBy: (invoices, { desc }) => desc(invoices.createdAt),
        limit: input.limit,
        offset: input.offset,
      });

      const total = await db.query.invoice.findMany({
        where: (invoices, { and, eq }) =>
          and(
            eq(invoices.organizationId, input.organizationId),
            ...whereConditions,
          ),
      });

      return {
        invoices,
        total: total.length,
      };
    }),

  // Get invoice by ID
  getById: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { db } = ctx;

      const invoice = await db.query.invoice.findFirst({
        where: (invoices, { eq }) => eq(invoices.id, input.id),
        with: {
          customer: true,
          lines: true,
          payments: {
            with: {
              payment: true,
            },
          },
          template: true,
        },
      });

      if (!invoice) {
        throw new Error("Invoice not found");
      }

      return invoice;
    }),

  // Create invoice
  create: protectedProcedure
    .input(
      z.object({
        organizationId: z.string().uuid(),
        customerId: z.string().uuid(),
        issueDate: z.date(),
        dueDate: z.date(),
        currency: z.string().default("USD"),
        notes: z.string().optional(),
        terms: z.string().optional(),
        templateId: z.string().uuid().optional(),
        lines: z.array(
          z.object({
            description: z.string(),
            quantity: z.number(),
            unitPrice: z.number(),
            taxRate: z.number().default(0),
            discountPercent: z.number().default(0),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;

      const invoice = await db.transaction(async (tx) => {
        // Generate invoice number
        const count = await tx.query.invoice.findMany({
          where: (invoices, { eq }) =>
            eq(invoices.organizationId, input.organizationId),
        });
        const invoiceNumber = `INV-${new Date().getFullYear()}-${String(count.length + 1).padStart(4, "0")}`;

        // Calculate totals
        const subtotal = input.lines.reduce((sum, line) => {
          const lineTotal = line.quantity * line.unitPrice;
          const afterDiscount = lineTotal * (1 - line.discountPercent / 100);
          return sum + afterDiscount;
        }, 0);

        const taxAmount = input.lines.reduce((sum, line) => {
          const lineTotal =
            line.quantity * line.unitPrice * (1 - line.discountPercent / 100);
          return sum + (lineTotal * line.taxRate) / 100;
        }, 0);

        const total = subtotal + taxAmount;

        // Create invoice
        const [created] = await tx
          .insert(tx.schema.invoice)
          .values({
            organizationId: input.organizationId,
            customerId: input.customerId,
            invoiceNumber,
            status: "draft",
            issueDate: input.issueDate,
            dueDate: input.dueDate,
            currency: input.currency,
            subtotal: subtotal.toString(),
            taxAmount: taxAmount.toString(),
            total: total.toString(),
            amountDue: total.toString(),
            notes: input.notes,
            terms: input.terms,
            templateId: input.templateId,
          })
          .returning();

        // Create invoice lines
        for (let i = 0; i < input.lines.length; i++) {
          const line = input.lines[i];
          const lineTotal =
            line.quantity * line.unitPrice * (1 - line.discountPercent / 100);
          const tax = (lineTotal * line.taxRate) / 100;

          await tx.insert(tx.schema.invoiceLine).values({
            invoiceId: created.id,
            lineNumber: i + 1,
            description: line.description,
            quantity: line.quantity.toString(),
            unitPrice: line.unitPrice.toString(),
            discountPercent: line.discountPercent.toString(),
            taxRate: line.taxRate.toString(),
            taxAmount: tax.toString(),
            lineTotal: lineTotal.toString(),
          });
        }

        return created;
      });

      return invoice;
    }),

  // Update invoice
  update: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        customerId: z.string().uuid().optional(),
        issueDate: z.date().optional(),
        dueDate: z.date().optional(),
        notes: z.string().optional(),
        terms: z.string().optional(),
        templateId: z.string().uuid().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const { id, ...updates } = input;

      const [updated] = await db
        .update(db.schema.invoice)
        .set(updates)
        .where((invoices, { eq }) => eq(invoices.id, id))
        .returning();

      return updated;
    }),

  // Send invoice
  send: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;

      const [updated] = await db
        .update(db.schema.invoice)
        .set({
          status: "sent",
          sentAt: new Date(),
        })
        .where((invoices, { eq }) => eq(invoices.id, input.id))
        .returning();

      // TODO: Send email to customer

      return updated;
    }),

  // Void invoice
  void: protectedProcedure
    .input(z.object({ id: z.string().uuid(), reason: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;

      const [updated] = await db
        .update(db.schema.invoice)
        .set({
          status: "void",
          voidedAt: new Date(),
          voidReason: input.reason,
        })
        .where((invoices, { eq }) => eq(invoices.id, input.id))
        .returning();

      return updated;
    }),

  // Record payment
  recordPayment: protectedProcedure
    .input(
      z.object({
        invoiceId: z.string().uuid(),
        amount: z.number(),
        currency: z.string().default("USD"),
        method: z.enum([
          "cash",
          "bank_transfer",
          "credit_card",
          "debit_card",
          "paypal",
          "stripe",
          "check",
          "other",
        ]),
        reference: z.string().optional(),
        notes: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;

      const payment = await db.transaction(async (tx) => {
        // Generate payment number
        const count = await tx.query.payment.findMany({
          where: (payments, { eq }) =>
            eq(payments.organizationId, input.invoiceId),
        });
        const paymentNumber = `PAY-${new Date().getFullYear()}-${String(count.length + 1).padStart(4, "0")}`;

        // Create payment
        const [payment] = await tx
          .insert(tx.schema.payment)
          .values({
            organizationId: input.invoiceId, // Will be fixed with proper org lookup
            invoiceId: input.invoiceId,
            customerId: input.invoiceId, // Will be fixed with proper customer lookup
            paymentNumber,
            amount: input.amount.toString(),
            currency: input.currency,
            method: input.method,
            reference: input.reference,
            notes: input.notes,
            status: "completed",
            processedAt: new Date(),
          })
          .returning();

        // Update invoice status
        const invoice = await tx.query.invoice.findFirst({
          where: (invoices, { eq }) => eq(invoices.id, input.invoiceId),
        });

        if (invoice) {
          const newAmountPaid =
            Number.parseFloat(invoice.amountPaid) + input.amount;
          const newAmountDue =
            Number.parseFloat(invoice.amountDue) - input.amount;

          let newStatus = invoice.status;
          if (newAmountDue <= 0) {
            newStatus = "paid";
          } else if (newAmountPaid > 0) {
            newStatus = "partial";
          }

          await tx
            .update(tx.schema.invoice)
            .set({
              amountPaid: newAmountPaid.toString(),
              amountDue: newAmountDue.toString(),
              status: newStatus,
              paidAt: newStatus === "paid" ? new Date() : null,
            })
            .where((invoices, { eq }) => eq(invoices.id, input.invoiceId));
        }

        return payment;
      });

      return payment;
    }),

  // List invoice templates
  listTemplates: protectedProcedure
    .input(z.object({ organizationId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { db } = ctx;

      const templates = await db.query.invoiceTemplate.findMany({
        where: (templates, { eq }) =>
          eq(templates.organizationId, input.organizationId),
      });

      return templates;
    }),

  // Create template
  createTemplate: protectedProcedure
    .input(
      z.object({
        organizationId: z.string().uuid(),
        name: z.string(),
        config: z.record(z.any()),
        styles: z.record(z.any()).optional(),
        primaryColor: z.string().optional(),
        fontFamily: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;

      const [template] = await db
        .insert(db.schema.invoiceTemplate)
        .values(input)
        .returning();

      return template;
    }),

  // List customers
  listCustomers: protectedProcedure
    .input(z.object({ organizationId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { db } = ctx;

      const contacts = await db.query.contact.findMany({
        where: (contacts, { and, eq }) =>
          and(
            eq(contacts.organizationId, input.organizationId),
            eq(contacts.type, "customer"),
          ),
      });

      return contacts;
    }),

  // Create customer
  createCustomer: protectedProcedure
    .input(
      z.object({
        organizationId: z.string().uuid(),
        name: z.string(),
        email: z.string().email().optional(),
        phone: z.string().optional(),
        company: z.string().optional(),
        taxId: z.string().optional(),
        currency: z.string().default("USD"),
        paymentTerms: z.number().default(30),
        address: z.record(z.any()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;

      const [contact] = await db
        .insert(db.schema.contact)
        .values({
          ...input,
          type: "customer",
        })
        .returning();

      return contact;
    }),

  // Get invoice stats
  getStats: protectedProcedure
    .input(z.object({ organizationId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { db } = ctx;

      const invoices = await db.query.invoice.findMany({
        where: (invoices, { eq }) =>
          eq(invoices.organizationId, input.organizationId),
      });

      const stats = {
        total: invoices.length,
        draft: invoices.filter((i) => i.status === "draft").length,
        sent: invoices.filter((i) => i.status === "sent").length,
        viewed: invoices.filter((i) => i.status === "viewed").length,
        partial: invoices.filter((i) => i.status === "partial").length,
        paid: invoices.filter((i) => i.status === "paid").length,
        overdue: invoices.filter((i) => i.status === "overdue").length,
        totalAmount: invoices.reduce(
          (sum, i) => sum + Number.parseFloat(i.total),
          0,
        ),
        totalDue: invoices.reduce(
          (sum, i) => sum + Number.parseFloat(i.amountDue),
          0,
        ),
      };

      return stats;
    }),
});
