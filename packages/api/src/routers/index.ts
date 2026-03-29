import { z } from "zod";

import { protectedProcedure, publicProcedure, router } from "../index";

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),
  privateData: protectedProcedure.query(({ ctx }) => {
    return {
      message: "This is private",
      user: ctx.session.user,
    };
  }),
  user: protectedProcedure.query(({ ctx }) => {
    return ctx.session.user;
  }),
  updateUser: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(100),
      }),
    )
    .mutation(({ input }) => {
      return { success: true, name: input.name };
    }),
});

export type AppRouter = typeof appRouter;
