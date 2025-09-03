import { agents } from "@/db/schema";
import { agentsInsertSchema } from "../schema";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { createTRPCRouter, baseProcedure, protectedProcedure } from "@/trpc/init";

import { Input } from "@/components/ui/input";
import { db } from "@/db";

export const agentsRouter = createTRPCRouter({
  // Fetch a single agent by ID
  getOne: baseProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [existingAgent] = await db
        .select()
        .from(agents)
        .where(eq(agents.id, input.id));
      return existingAgent;
    }),

  // Fetch all agents
  getMany: baseProcedure.query(async () => {
    const data = await db.select().from(agents);
    return data;
  }),

  // Create a new agent
  create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdAgent] = await db
        .insert(agents)
        .values({
          ...input,
          userId: ctx.auth.user.id,
        })
        .returning();

      return createdAgent;
    }),
});