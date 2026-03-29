import { publicProcedure, router } from "../index";
import { authRouter } from "./auth";
import { booksRouter } from "./books";
import { expenseRouter } from "./expense";
import { invoiceRouter } from "./invoice";
import { notificationRouter } from "./notification";
import { organizationRouter } from "./organization";

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),
  auth: authRouter,
  organization: organizationRouter,
  notification: notificationRouter,
  invoice: invoiceRouter,
  expense: expenseRouter,
  books: booksRouter,
});

export type AppRouter = typeof appRouter;
