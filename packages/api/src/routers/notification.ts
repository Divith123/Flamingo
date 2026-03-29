import { z } from "zod";

import { protectedProcedure, router } from "../index.js";

export const notificationRouter = router({
  // List notifications for current user
  list: protectedProcedure
    .input(
      z.object({
        organizationId: z.string().uuid(),
        limit: z.number().default(50),
        cursor: z.string().optional(),
        unreadOnly: z.boolean().default(false),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { db } = ctx;
      const session = ctx.session;

      const whereConditions = [
        (notifications: typeof db.schema.notification, { eq }) =>
          eq(notifications.userId, session.user.id),
        (notifications: typeof db.schema.notification, { eq }) =>
          eq(notifications.organizationId, input.organizationId),
      ];

      if (input.unreadOnly) {
        whereConditions.push(
          (notifications: typeof db.schema.notification, { eq }) =>
            eq(notifications.read, false),
        );
      }

      const notifications = await db.query.notification.findMany({
        where: (notifications, { and, gt }) =>
          and(
            ...whereConditions,
            input.cursor ? gt(notifications.id, input.cursor) : undefined,
          ),
        orderBy: (notifications, { desc }) => desc(notifications.createdAt),
        limit: input.limit + 1,
      });

      let nextCursor: string | undefined;
      if (notifications.length > input.limit) {
        const nextItem = notifications.pop();
        nextCursor = nextItem?.id;
      }

      return {
        notifications,
        nextCursor,
      };
    }),

  // Mark notification as read
  markAsRead: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const session = ctx.session;

      const [updated] = await db
        .update(db.schema.notification)
        .set({
          read: true,
          readAt: new Date(),
        })
        .where((notifications, { eq, and }) =>
          and(
            eq(notifications.id, input.id),
            eq(notifications.userId, session.user.id),
          ),
        )
        .returning();

      return updated;
    }),

  // Mark all notifications as read
  markAllAsRead: protectedProcedure
    .input(z.object({ organizationId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const session = ctx.session;

      await db
        .update(db.schema.notification)
        .set({
          read: true,
          readAt: new Date(),
        })
        .where((notifications, { eq, and }) =>
          and(
            eq(notifications.userId, session.user.id),
            eq(notifications.organizationId, input.organizationId),
            eq(notifications.read, false),
          ),
        );

      return { success: true };
    }),

  // Delete notification
  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const session = ctx.session;

      await db
        .delete(db.schema.notification)
        .where((notifications, { eq, and }) =>
          and(
            eq(notifications.id, input.id),
            eq(notifications.userId, session.user.id),
          ),
        );

      return { success: true };
    }),

  // Get unread count
  unreadCount: protectedProcedure
    .input(z.object({ organizationId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { db } = ctx;
      const session = ctx.session;

      const result = await db
        .select({ count: db.schema.notification.id })
        .from(db.schema.notification)
        .where((notifications, { eq, and }) =>
          and(
            eq(notifications.userId, session.user.id),
            eq(notifications.organizationId, input.organizationId),
            eq(notifications.read, false),
          ),
        );

      return { count: result.length };
    }),

  // Update notification preferences
  updatePreferences: protectedProcedure
    .input(
      z.object({
        organizationId: z.string().uuid().optional(),
        channel: z.enum(["in_app", "email", "sms", "push"]),
        enabled: z.boolean(),
        digestEnabled: z.boolean().optional(),
        digestFrequency: z.enum(["immediate", "daily", "weekly"]).optional(),
        quietHoursStart: z.string().optional(),
        quietHoursEnd: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const session = ctx.session;

      const { organizationId, channel, ...updates } = input;

      const existing = await db.query.notificationPreference.findFirst({
        where: (prefs, { eq, and }) =>
          and(
            eq(prefs.userId, session.user.id),
            eq(prefs.channel, channel),
            organizationId
              ? eq(prefs.organizationId, organizationId)
              : undefined,
          ),
      });

      if (existing) {
        const [updated] = await db
          .update(db.schema.notificationPreference)
          .set(updates)
          .where((prefs, { eq }) => eq(prefs.id, existing.id))
          .returning();
        return updated;
      }

      const [created] = await db
        .insert(db.schema.notificationPreference)
        .values({
          userId: session.user.id,
          organizationId,
          channel,
          ...updates,
        })
        .returning();

      return created;
    }),

  // Get notification preferences
  getPreferences: protectedProcedure
    .input(z.object({ organizationId: z.string().uuid().optional() }))
    .query(async ({ ctx, input }) => {
      const { db } = ctx;
      const session = ctx.session;

      const preferences = await db.query.notificationPreference.findMany({
        where: (prefs, { eq, and }) =>
          and(
            eq(prefs.userId, session.user.id),
            input.organizationId
              ? eq(prefs.organizationId, input.organizationId)
              : undefined,
          ),
      });

      return preferences;
    }),

  // Create notification (internal use)
  create: protectedProcedure
    .input(
      z.object({
        organizationId: z.string().uuid(),
        userId: z.string(),
        type: z.enum(["approval", "alert", "reminder", "update", "info"]),
        title: z.string(),
        message: z.string(),
        data: z.record(z.any()).optional(),
        channel: z.enum(["in_app", "email", "sms", "push"]).default("in_app"),
        actionUrl: z.string().optional(),
        actionLabel: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;

      const [notification] = await db
        .insert(db.schema.notification)
        .values(input)
        .returning();

      return notification;
    }),
});
