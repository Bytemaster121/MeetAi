import { agents } from "@/db/schema";
import { agentsInsertSchema } from "../schema";
import { z } from "zod";
import { eq, getTableColumns, sql, and, ilike, desc, count } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { DEFAULT_PAGE, default_page_size, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constant";
import { Search } from "lucide-react";

export const agentsRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [existingAgent] = await db
        .select({
          ...getTableColumns(agents),
          meetingCount: sql<number>`6`, // corrected syntax here
        })
        .from(agents)
        .where(eq(agents.id, input.id));
      return existingAgent;
    }),

  getMany: protectedProcedure
  .input(
    z.object({
    page:z.number().default(DEFAULT_PAGE),
    pageSize:z
    .number()
    .min(MIN_PAGE_SIZE)
    .max(MAX_PAGE_SIZE)
    .default(default_page_size),
    search:z.string().nullish(),
  })
)
   
  
  
   
  .query(async ({ctx , input}) => {
    const {search , page , pageSize} = input; // this is why we removed optional form getmany input schema
    //destructuring input to get search , page and pageSize
    const data = await db
      .select({
        ...getTableColumns(agents),
        meetingCount: sql<number>`6`, // corrected syntax here
      })
      .from(agents)
      .where(
        and(
          eq(agents.userId, ctx.auth.user.id),
          search ? ilike(agents.name, `%${search}%`) : undefined
        )
      )
      .orderBy(desc(agents.createdAt) , desc(agents.id))
      .limit(pageSize)
      .offset((page - 1) * pageSize);
    const [total] =  await db
      .select({ count: count() })
      .from(agents)
      .where(
        and(
          eq(agents.userId, ctx.auth.user.id),
          search ? ilike(agents.name, `%${search}%`) : undefined
        )
      );
    const totalPages = Math.ceil((total?.count) / pageSize);


    return {
      items: data,
      total: total.count,
      totalPages,

    };
  }),

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
