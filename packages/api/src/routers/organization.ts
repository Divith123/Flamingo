import { z } from "zod";

import { protectedProcedure, router } from "../index.js";

export const organizationRouter = router({
  // List all organizations for the current user
  list: protectedProcedure.query(async ({ ctx }) => {
    const { db } = ctx;
    const session = ctx.session;

    const members = await db.query.member.findMany({
      where: (members, { eq }) => eq(members.userId, session.user.id),
      with: {
        organization: true,
      },
    });

    return members.map((member) => ({
      ...member.organization,
      role: member.role,
      memberId: member.id,
    }));
  }),

  // Get a single organization by ID
  getById: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { db } = ctx;

      const organization = await db.query.organization.findFirst({
        where: (orgs, { eq }) => eq(orgs.id, input.id),
        with: {
          members: {
            with: {
              user: {
                columns: {
                  id: true,
                  name: true,
                  email: true,
                  image: true,
                },
              },
            },
          },
          products: true,
        },
      });

      if (!organization) {
        throw new Error("Organization not found");
      }

      return organization;
    }),

  // Create a new organization
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        slug: z.string().min(1),
        industry: z.string().optional(),
        size: z.number().optional(),
        country: z.string().optional(),
        currency: z.string().default("USD"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const session = ctx.session;

      // Create organization
      const organization = await db.transaction(async (tx) => {
        const [org] = await tx
          .insert(db.schema.organization)
          .values({
            name: input.name,
            slug: input.slug,
            industry: input.industry,
            size: input.size,
            country: input.country,
            currency: input.currency,
          })
          .returning();

        // Add creator as owner member
        await tx.insert(db.schema.member).values({
          organizationId: org.id,
          userId: session.user.id,
          role: "owner",
          status: "active",
          joinedAt: new Date(),
        });

        // Enable core products by default
        await tx.insert(db.schema.organizationProduct).values([
          {
            organizationId: org.id,
            product: "core",
            enabled: true,
            plan: "free",
          },
          {
            organizationId: org.id,
            product: "invoice",
            enabled: true,
            plan: "free",
          },
          {
            organizationId: org.id,
            product: "expense",
            enabled: true,
            plan: "free",
          },
          {
            organizationId: org.id,
            product: "books",
            enabled: true,
            plan: "free",
          },
        ]);

        return org;
      });

      return organization;
    }),

  // Update organization
  update: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        name: z.string().min(1).optional(),
        slug: z.string().min(1).optional(),
        logo: z.string().url().optional(),
        industry: z.string().optional(),
        size: z.number().optional(),
        country: z.string().optional(),
        currency: z.string().optional(),
        fiscalYearStart: z.string().optional(),
        taxId: z.string().optional(),
        address: z.string().optional(),
        phone: z.string().optional(),
        website: z.string().url().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const { id, ...updates } = input;

      const [updated] = await db
        .update(db.schema.organization)
        .set(updates)
        .where((orgs, { eq }) => eq(orgs.id, id))
        .returning();

      return updated;
    }),

  // Delete organization
  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;

      await db
        .delete(db.schema.organization)
        .where((orgs, { eq }) => eq(orgs.id, input.id));

      return { success: true };
    }),

  // Invite member
  inviteMember: protectedProcedure
    .input(
      z.object({
        organizationId: z.string().uuid(),
        email: z.string().email(),
        role: z.enum(["admin", "member", "viewer"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const session = ctx.session;

      const token = crypto.randomUUID();

      const invitation = await db
        .insert(db.schema.invitation)
        .values({
          organizationId: input.organizationId,
          email: input.email,
          role: input.role,
          token,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
          invitedBy: session.user.id,
          status: "pending",
        })
        .returning();

      // TODO: Send invitation email

      return invitation[0];
    }),

  // Accept invitation
  acceptInvitation: protectedProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const session = ctx.session;

      const invitation = await db.query.invitation.findFirst({
        where: (invites, { eq }) => eq(invites.token, input.token),
      });

      if (!invitation) {
        throw new Error("Invitation not found");
      }

      if (invitation.status !== "pending") {
        throw new Error("Invitation already used");
      }

      if (invitation.expiresAt < new Date()) {
        throw new Error("Invitation expired");
      }

      await db.transaction(async (tx) => {
        // Add member
        await tx.insert(db.schema.member).values({
          organizationId: invitation.organizationId,
          userId: session.user.id,
          role: invitation.role,
          status: "active",
          joinedAt: new Date(),
        });

        // Update invitation status
        await tx
          .update(db.schema.invitation)
          .set({ status: "accepted" })
          .where((invites, { eq }) => eq(invites.token, input.token));
      });

      return { success: true };
    }),

  // List members
  listMembers: protectedProcedure
    .input(z.object({ organizationId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { db } = ctx;

      const members = await db.query.member.findMany({
        where: (members, { eq }) =>
          eq(members.organizationId, input.organizationId),
        with: {
          user: {
            columns: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      });

      return members;
    }),

  // Remove member
  removeMember: protectedProcedure
    .input(
      z.object({
        organizationId: z.string().uuid(),
        memberId: z.string().uuid(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;

      await db
        .delete(db.schema.member)
        .where((members, { eq, and }) =>
          and(
            eq(members.id, input.memberId),
            eq(members.organizationId, input.organizationId),
          ),
        );

      return { success: true };
    }),

  // Update member role
  updateMemberRole: protectedProcedure
    .input(
      z.object({
        organizationId: z.string().uuid(),
        memberId: z.string().uuid(),
        role: z.enum(["owner", "admin", "member", "viewer"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;

      const [updated] = await db
        .update(db.schema.member)
        .set({ role: input.role })
        .where((members, { eq, and }) =>
          and(
            eq(members.id, input.memberId),
            eq(members.organizationId, input.organizationId),
          ),
        )
        .returning();

      return updated;
    }),
});
