import { z } from "zod";

import { protectedProcedure, router } from "../index.js";

export const booksRouter = router({
  // List accounts
  listAccounts: protectedProcedure
    .input(z.object({ organizationId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { db } = ctx;

      const accounts = await db.query.account.findMany({
        where: (accounts, { eq }) =>
          eq(accounts.organizationId, input.organizationId),
        orderBy: (accounts, { asc }) => asc(accounts.code),
      });

      return accounts;
    }),

  // Create account
  createAccount: protectedProcedure
    .input(
      z.object({
        organizationId: z.string().uuid(),
        code: z.string(),
        name: z.string(),
        type: z.enum(["asset", "liability", "equity", "income", "expense"]),
        subtype: z
          .enum([
            "current_asset",
            "fixed_asset",
            "non_current_asset",
            "cash",
            "bank",
            "accounts_receivable",
            "inventory",
            "current_liability",
            "long_term_liability",
            "accounts_payable",
            "credit_card",
            "loan",
            "owners_equity",
            "retained_earnings",
            "operating_income",
            "other_income",
            "cost_of_goods_sold",
            "operating_expense",
            "other_expense",
          ])
          .optional(),
        description: z.string().optional(),
        currency: z.string().default("USD"),
        parentId: z.string().uuid().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;

      const [account] = await db
        .insert(db.schema.account)
        .values({
          organizationId: input.organizationId,
          code: input.code,
          name: input.name,
          type: input.type,
          subtype: input.subtype,
          description: input.description,
          currency: input.currency,
          parentId: input.parentId,
        })
        .returning();

      return account;
    }),

  // Create journal entry
  createJournalEntry: protectedProcedure
    .input(
      z.object({
        organizationId: z.string().uuid(),
        date: z.date(),
        description: z.string(),
        reference: z.string().optional(),
        lines: z.array(
          z.object({
            accountId: z.string().uuid(),
            description: z.string().optional(),
            debitAmount: z.number().default(0),
            creditAmount: z.number().default(0),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;

      const entry = await db.transaction(async (tx) => {
        // Generate entry number
        const count = await tx.query.journalEntry.findMany({
          where: (entries, { eq }) =>
            eq(entries.organizationId, input.organizationId),
        });
        const entryNumber = `JE-${new Date().getFullYear()}-${String(count.length + 1).padStart(4, "0")}`;

        // Create journal entry
        const [created] = await tx
          .insert(tx.schema.journalEntry)
          .values({
            organizationId: input.organizationId,
            entryNumber,
            date: input.date,
            description: input.description,
            reference: input.reference,
            status: "draft",
          })
          .returning();

        // Create lines
        for (const line of input.lines) {
          await tx.insert(tx.schema.journalEntryLine).values({
            entryId: created.id,
            accountId: line.accountId,
            description: line.description,
            debitAmount: line.debitAmount.toString(),
            creditAmount: line.creditAmount.toString(),
          });
        }

        return created;
      });

      return entry;
    }),

  // Post journal entry
  postJournalEntry: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const session = ctx.session;

      const entry = await db.query.journalEntry.findFirst({
        where: (entries, { eq }) => eq(entries.id, input.id),
        with: {
          lines: true,
        },
      });

      if (!entry) {
        throw new Error("Journal entry not found");
      }

      // Validate debits = credits
      const totalDebits = entry.lines.reduce(
        (sum, line) => sum + Number.parseFloat(line.debitAmount),
        0,
      );
      const totalCredits = entry.lines.reduce(
        (sum, line) => sum + Number.parseFloat(line.creditAmount),
        0,
      );

      if (Math.abs(totalDebits - totalCredits) > 0.01) {
        throw new Error("Debits must equal credits");
      }

      const [updated] = await db
        .update(db.schema.journalEntry)
        .set({
          status: "posted",
          postedAt: new Date(),
          postedBy: session.user.id,
        })
        .where((entries, { eq }) => eq(entries.id, input.id))
        .returning();

      return updated;
    }),

  // Get trial balance
  getTrialBalance: protectedProcedure
    .input(
      z.object({
        organizationId: z.string().uuid(),
        startDate: z.date(),
        endDate: z.date(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { db } = ctx;

      const accounts = await db.query.account.findMany({
        where: (accounts, { eq }) =>
          eq(accounts.organizationId, input.organizationId),
        with: {
          journalLines: {
            with: {
              entry: {
                where: (entries, { and, gte, lte }) =>
                  and(
                    eq(entries.status, "posted"),
                    gte(entries.date, input.startDate),
                    lte(entries.date, input.endDate),
                  ),
              },
            },
          },
        },
      });

      const trialBalance = accounts.map((account) => {
        const debits = account.journalLines.reduce(
          (sum, line) => sum + Number.parseFloat(line.debitAmount),
          0,
        );
        const credits = account.journalLines.reduce(
          (sum, line) => sum + Number.parseFloat(line.creditAmount),
          0,
        );
        const balance = debits - credits;

        return {
          account,
          debits,
          credits,
          balance:
            account.type === "asset" || account.type === "expense"
              ? balance
              : -balance,
        };
      });

      return trialBalance.filter(
        (item) => item.debits !== 0 || item.credits !== 0,
      );
    }),

  // Get balance sheet
  getBalanceSheet: protectedProcedure
    .input(
      z.object({
        organizationId: z.string().uuid(),
        asOf: z.date(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { db } = ctx;

      const accounts = await db.query.account.findMany({
        where: (accounts, { and, eq }) =>
          and(
            eq(accounts.organizationId, input.organizationId),
            eq(accounts.isActive, true),
          ),
        with: {
          journalLines: {
            with: {
              entry: {
                where: (entries, { and, eq, lte }) =>
                  and(
                    eq(entries.status, "posted"),
                    lte(entries.date, input.asOf),
                  ),
              },
            },
          },
        },
      });

      type BalanceSheetItem = {
        account: string;
        code: string;
        balance: number;
      };

      const balanceSheet = {
        assets: {
          current: [] as BalanceSheetItem[],
          fixed: [] as BalanceSheetItem[],
          total: 0,
        },
        liabilities: {
          current: [] as BalanceSheetItem[],
          longTerm: [] as BalanceSheetItem[],
          total: 0,
        },
        equity: {
          items: [] as BalanceSheetItem[],
          total: 0,
        },
      };

      for (const account of accounts) {
        const debits = account.journalLines.reduce(
          (sum, line) => sum + Number.parseFloat(line.debitAmount),
          0,
        );
        const credits = account.journalLines.reduce(
          (sum, line) => sum + Number.parseFloat(line.creditAmount),
          0,
        );
        const balance = debits - credits;

        if (balance === 0) continue;

        const item = {
          account: account.name,
          code: account.code,
          balance,
        };

        if (account.type === "asset") {
          if (
            account.subtype === "fixed_asset" ||
            account.subtype === "non_current_asset"
          ) {
            balanceSheet.assets.fixed.push(item);
          } else {
            balanceSheet.assets.current.push(item);
          }
          balanceSheet.assets.total += balance;
        } else if (account.type === "liability") {
          if (account.subtype === "long_term_liability") {
            balanceSheet.liabilities.longTerm.push(item);
          } else {
            balanceSheet.liabilities.current.push(item);
          }
          balanceSheet.liabilities.total += balance;
        } else if (account.type === "equity") {
          balanceSheet.equity.items.push(item);
          balanceSheet.equity.total += balance;
        }
      }

      return balanceSheet;
    }),

  // Get profit & loss
  getProfitAndLoss: protectedProcedure
    .input(
      z.object({
        organizationId: z.string().uuid(),
        startDate: z.date(),
        endDate: z.date(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { db } = ctx;

      const accounts = await db.query.account.findMany({
        where: (accounts, { and, eq }) =>
          and(
            eq(accounts.organizationId, input.organizationId),
            eq(accounts.isActive, true),
          ),
        with: {
          journalLines: {
            with: {
              entry: {
                where: (entries, { and, gte, lte }) =>
                  and(
                    eq(entries.status, "posted"),
                    gte(entries.date, input.startDate),
                    lte(entries.date, input.endDate),
                  ),
              },
            },
          },
        },
      });

      type ProfitLossItem = {
        account: string;
        code: string;
        balance: number;
      };

      const profitAndLoss = {
        income: [] as ProfitLossItem[],
        totalIncome: 0,
        cogs: [] as ProfitLossItem[],
        totalCogs: 0,
        grossProfit: 0,
        expenses: [] as ProfitLossItem[],
        totalExpenses: 0,
        netIncome: 0,
      };

      for (const account of accounts) {
        const debits = account.journalLines.reduce(
          (sum, line) => sum + Number.parseFloat(line.debitAmount),
          0,
        );
        const credits = account.journalLines.reduce(
          (sum, line) => sum + Number.parseFloat(line.creditAmount),
          0,
        );
        const balance = credits - debits;

        if (balance === 0) continue;

        const item = {
          account: account.name,
          code: account.code,
          balance,
        };

        if (account.type === "income") {
          profitAndLoss.income.push(item);
          profitAndLoss.totalIncome += balance;
        } else if (account.subtype === "cost_of_goods_sold") {
          profitAndLoss.cogs.push(item);
          profitAndLoss.totalCogs += balance;
        } else if (account.type === "expense") {
          profitAndLoss.expenses.push(item);
          profitAndLoss.totalExpenses += balance;
        }
      }

      profitAndLoss.grossProfit =
        profitAndLoss.totalIncome - profitAndLoss.totalCogs;
      profitAndLoss.netIncome =
        profitAndLoss.grossProfit - profitAndLoss.totalExpenses;

      return profitAndLoss;
    }),

  // List bank accounts
  listBankAccounts: protectedProcedure
    .input(z.object({ organizationId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { db } = ctx;

      const bankAccounts = await db.query.bankAccount.findMany({
        where: (bankAccounts, { eq }) =>
          eq(bankAccounts.organizationId, input.organizationId),
        with: {
          account: true,
        },
      });

      return bankAccounts;
    }),

  // Create bank account
  createBankAccount: protectedProcedure
    .input(
      z.object({
        organizationId: z.string().uuid(),
        accountId: z.string().uuid(),
        name: z.string(),
        bankName: z.string().optional(),
        accountNumber: z.string().optional(),
        routingNumber: z.string().optional(),
        currency: z.string().default("USD"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;

      const [bankAccount] = await db
        .insert(db.schema.bankAccount)
        .values({
          organizationId: input.organizationId,
          accountId: input.accountId,
          name: input.name,
          bankName: input.bankName,
          accountNumber: input.accountNumber,
          routingNumber: input.routingNumber,
          currency: input.currency,
        })
        .returning();

      return bankAccount;
    }),

  // Import bank transactions
  importBankTransactions: protectedProcedure
    .input(
      z.object({
        bankAccountId: z.string().uuid(),
        transactions: z.array(
          z.object({
            transactionId: z.string(),
            date: z.date(),
            description: z.string(),
            amount: z.number(),
            type: z.enum(["debit", "credit"]),
            balance: z.number().optional(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;

      const imported = [];

      for (const tx of input.transactions) {
        const [transaction] = await db
          .insert(db.schema.bankTransaction)
          .values({
            bankAccountId: input.bankAccountId,
            transactionId: tx.transactionId,
            date: tx.date,
            description: tx.description,
            amount: Math.abs(tx.amount).toString(),
            type: tx.type,
            balance: tx.balance?.toString(),
          })
          .returning();

        imported.push(transaction);
      }

      return { imported, count: imported.length };
    }),

  // Reconcile bank transaction
  reconcileTransaction: protectedProcedure
    .input(
      z.object({
        transactionId: z.string().uuid(),
        entryLineId: z.string().uuid(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;

      await db
        .update(db.schema.bankTransaction)
        .set({
          matchedEntryLineId: input.entryLineId,
          isReconciled: true,
          reconciledAt: new Date(),
        })
        .where((transactions, { eq }) =>
          eq(transactions.id, input.transactionId),
        );

      return { success: true };
    }),

  // Get accounting periods
  listPeriods: protectedProcedure
    .input(z.object({ organizationId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { db } = ctx;

      const periods = await db.query.accountingPeriod.findMany({
        where: (periods, { eq }) =>
          eq(periods.organizationId, input.organizationId),
        orderBy: (periods, { desc }) => desc(periods.startDate),
      });

      return periods;
    }),

  // Close accounting period
  closePeriod: protectedProcedure
    .input(
      z.object({
        periodId: z.string().uuid(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const session = ctx.session;

      const [updated] = await db
        .update(db.schema.accountingPeriod)
        .set({
          status: "closed",
          closedAt: new Date(),
          closedBy: session.user.id,
        })
        .where((periods, { eq }) => eq(periods.id, input.periodId))
        .returning();

      return updated;
    }),
});
