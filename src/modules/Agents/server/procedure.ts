import { createTRPCRouter, baseProcedure, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { agents } from "@/db/schema";
import { agentsInsertSchema } from "../schema";
import z from "zod";
import { eq } from "drizzle-orm";

export const agentsRouter = createTRPCRouter({
  // ✅ Fetch a single agent by ID
  getOne: baseProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [existingAgent] = await db
        .select()
        .from(agents)
        .where(eq(agents.id, input.id));

      return existingAgent;
    }),

  // ✅ Fetch all agents for the authenticated user
  getMany: protectedProcedure.query(async ({ ctx }) => {
    const data = await db
      .select()
      .from(agents)
      .where(eq(agents.userId, ctx.auth.user.id)); // ✅ filter by userId
    return data;
  }),

  // ✅ Create a new agent for the authenticated user
  create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdAgent] = await db
        .insert(agents)
        .values({
          ...input,
          userId: ctx.auth.user.id, // ✅ associate agent with user
        })
        .returning();

      return createdAgent;
    }),
});