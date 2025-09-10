import { agents } from "@/db/schema";
import { agentsInsertSchema } from "../schema";
import { number, z } from "zod";
import { eq, getTableColumns } from "drizzle-orm";
import { createTRPCRouter, baseProcedure, protectedProcedure } from "@/trpc/init";
import { sql } from "drizzle-orm";
import { db } from "@/db";

export const agentsRouter = createTRPCRouter({
  // Fetch a single agent by ID
  getOne: protectedProcedure 
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [existingAgent] = await db
        .select({
          ...getTableColumns(agents),
          meetingCount: sql<number> '5',
          
        })

        .from(agents)
        .where(eq(agents.id, input.id));
      return existingAgent;
    }),

  // Fetch all agents
  getMany: protectedProcedure.query(async () => {
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