import { auth } from "@flamingo/auth";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure, router } from "../index";

export const authRouter = router({
  me: protectedProcedure.query(({ ctx }) => {
    return ctx.session.user;
  }),

  updateProfile: protectedProcedure
    .input(
      z.object({
        name: z.string().min(2).optional(),
        image: z.string().url().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const updatedUser = await auth.api.updateUser({
        headers: ctx.headers,
        body: {
          name: input.name,
          image: input.image,
        },
      });

      return updatedUser;
    }),

  sessions: protectedProcedure.query(async ({ ctx }) => {
    const sessions = await auth.api.listSessions({
      headers: ctx.headers,
    });
    return sessions;
  }),

  revokeSession: protectedProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await auth.api.revokeSession({
        headers: ctx.headers,
        body: {
          token: input.token,
        },
      });
      return { success: true };
    }),

  deleteAccount: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      await auth.api.deleteUser({
        headers: ctx.headers,
        body: {}, // Providing empty body as required by type definition
      });
      return { success: true };
    } catch (_error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete account",
      });
    }
  }),
});
