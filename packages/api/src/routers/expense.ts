import { z } from "zod";

import { protectedProcedure, router } from "../index.js";

export const expenseRouter = router({
  // List expenses
  list: protectedProcedure
    .input(
      z.object({
        organizationId: z.string().uuid(),
        status: z
          .enum([
            "draft",
            "pending_approval",
            "approved",
            "rejected",
            "reimbursed",
            "paid",
          ])
          .optional(),
        employeeId: z.string().optional(),
        categoryId: z.string().uuid().optional(),
        limit: z.number().default(50),
        offset: z.number().default(0),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { db } = ctx;

      const expenses = await db.query.expense.findMany({
        where: (expenses, { and, eq }) =>
          and(
            eq(expenses.organizationId, input.organizationId),
            input.status ? eq(expenses.status, input.status) : undefined,
            input.categoryId
              ? eq(expenses.categoryId, input.categoryId)
              : undefined,
          ),
        with: {
          category: true,
          receipts: true,
        },
        orderBy: (expenses, { desc }) => desc(expenses.date),
        limit: input.limit,
        offset: input.offset,
      });

      return { expenses };
    }),

  // Get expense by ID
  getById: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { db } = ctx;

      const expense = await db.query.expense.findFirst({
        where: (expenses, { eq }) => eq(expenses.id, input.id),
        with: {
          category: true,
          receipts: true,
          approvals: true,
        },
      });

      if (!expense) {
        throw new Error("Expense not found");
      }

      return expense;
    }),

  // Create expense
  create: protectedProcedure
    .input(
      z.object({
        organizationId: z.string().uuid(),
        categoryId: z.string().uuid().optional(),
        amount: z.number(),
        currency: z.string().default("USD"),
        date: z.date(),
        description: z.string(),
        notes: z.string().optional(),
        paymentMethod: z.enum([
          "cash",
          "personal_card",
          "company_card",
          "bank_transfer",
          "check",
          "other",
        ]),
        billable: z.boolean().default(false),
        receiptRequired: z.boolean().default(false),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const session = ctx.session;

      const taxRate = 0;
      const taxAmount = 0;
      const totalAmount = input.amount + taxAmount;

      const [expense] = await db
        .insert(db.schema.expense)
        .values({
          organizationId: input.organizationId,
          categoryId: input.categoryId,
          employeeId: session.user.id,
          amount: input.amount.toString(),
          currency: input.currency,
          taxAmount: taxAmount.toString(),
          taxRate: taxRate.toString(),
          totalAmount: totalAmount.toString(),
          date: input.date,
          description: input.description,
          notes: input.notes,
          paymentMethod: input.paymentMethod,
          billable: input.billable,
          receiptRequired: input.receiptRequired,
          status: "draft",
        })
        .returning();

      return expense;
    }),

  // Submit expense for approval
  submit: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;

      const [updated] = await db
        .update(db.schema.expense)
        .set({
          status: "pending_approval",
          submittedAt: new Date(),
        })
        .where((expenses, { eq }) => eq(expenses.id, input.id))
        .returning();

      // TODO: Trigger approval workflow

      return updated;
    }),

  // Approve expense
  approve: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const session = ctx.session;

      const [updated] = await db
        .update(db.schema.expense)
        .set({
          status: "approved",
          approvedAt: new Date(),
          approvedBy: session.user.id,
        })
        .where((expenses, { eq }) => eq(expenses.id, input.id))
        .returning();

      return updated;
    }),

  // Reject expense
  reject: protectedProcedure
    .input(z.object({ id: z.string().uuid(), reason: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const session = ctx.session;

      const [updated] = await db
        .update(db.schema.expense)
        .set({
          status: "rejected",
          rejectedAt: new Date(),
          rejectedBy: session.user.id,
          rejectionReason: input.reason,
        })
        .where((expenses, { eq }) => eq(expenses.id, input.id))
        .returning();

      return updated;
    }),

  // Upload receipt
  uploadReceipt: protectedProcedure
    .input(
      z.object({
        expenseId: z.string().uuid(),
        fileUrl: z.string().url(),
        fileName: z.string(),
        fileSize: z.number(),
        mimeType: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const session = ctx.session;

      const expense = await db.query.expense.findFirst({
        where: (expenses, { eq }) => eq(expenses.id, input.expenseId),
      });

      if (!expense) {
        throw new Error("Expense not found");
      }

      const [receipt] = await db
        .insert(db.schema.receipt)
        .values({
          expenseId: input.expenseId,
          organizationId: expense.organizationId,
          uploadedBy: session.user.id,
          fileUrl: input.fileUrl,
          fileName: input.fileName,
          fileSize: input.fileSize,
          mimeType: input.mimeType,
          ocrStatus: "pending",
        })
        .returning();

      await db
        .update(db.schema.expense)
        .set({ receiptRequired: false })
        .where((expenses, { eq }) => eq(expenses.id, input.expenseId));

      return receipt;
    }),

  // Process receipt OCR
  processReceiptOCR: protectedProcedure
    .input(z.object({ receiptId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;

      const [updated] = await db
        .update(db.schema.receipt)
        .set({
          ocrStatus: "processing",
        })
        .where((receipts, { eq }) => eq(receipts.id, input.receiptId))
        .returning();

      // TODO: Call OCR service (e.g., AWS Textract, Google Vision)
      // For now, just mark as completed

      await db
        .update(db.schema.receipt)
        .set({
          ocrStatus: "completed",
          verified: true,
          verifiedAt: new Date(),
        })
        .where((receipts, { eq }) => eq(receipts.id, input.receiptId));

      return updated;
    }),

  // List expense categories
  listCategories: protectedProcedure
    .input(z.object({ organizationId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { db } = ctx;

      const categories = await db.query.expenseCategory.findMany({
        where: (categories, { eq }) =>
          eq(categories.organizationId, input.organizationId),
        orderBy: (categories, { asc }) => asc(categories.name),
      });

      return categories;
    }),

  // Create expense category
  createCategory: protectedProcedure
    .input(
      z.object({
        organizationId: z.string().uuid(),
        name: z.string(),
        code: z.string().optional(),
        color: z.string().optional(),
        receiptRequired: z.boolean().default(false),
        receiptRequiredAmount: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;

      const [category] = await db
        .insert(db.schema.expenseCategory)
        .values({
          organizationId: input.organizationId,
          name: input.name,
          code: input.code,
          color: input.color,
          receiptRequired: input.receiptRequired,
          receiptRequiredAmount: input.receiptRequiredAmount?.toString(),
        })
        .returning();

      return category;
    }),

  // Get expense stats
  getStats: protectedProcedure
    .input(z.object({ organizationId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { db } = ctx;

      const expenses = await db.query.expense.findMany({
        where: (expenses, { eq }) =>
          eq(expenses.organizationId, input.organizationId),
      });

      const stats = {
        total: expenses.length,
        pending: expenses.filter((e) => e.status === "pending_approval").length,
        approved: expenses.filter((e) => e.status === "approved").length,
        rejected: expenses.filter((e) => e.status === "rejected").length,
        totalAmount: expenses.reduce(
          (sum, e) => sum + Number.parseFloat(e.totalAmount),
          0,
        ),
        reimbursable: expenses
          .filter(
            (e) =>
              e.paymentMethod === "personal_card" || e.paymentMethod === "cash",
          )
          .reduce((sum, e) => sum + Number.parseFloat(e.totalAmount), 0),
      };

      return stats;
    }),
});
