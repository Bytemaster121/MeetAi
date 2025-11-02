import { agents, meeting } from "@/db/schema";
import { z } from "zod";
import { eq, getTableColumns,and, ilike, desc, count } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { DEFAULT_PAGE, default_page_size, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constant";
import { Search } from "lucide-react";
import { TRPCError } from "@trpc/server";
import { PgUpdateBase } from "drizzle-orm/pg-core";
import { meetingInsertSchema, meetingUpdateSchema } from "../schemas";

export const meetingRouter = createTRPCRouter({

  update: protectedProcedure
      .input(meetingUpdateSchema)
      .mutation(async ({ input , ctx}) => {
        const { id , ...updateData } = input;
        const [updatedMeeting] = await db
          .update(meeting)
          .set(input)
          .where(
            and(
              eq(meeting.id, id),
              eq(meeting.userId, ctx.auth.user.id)
            )
          )
          .returning();
        if(!updatedMeeting){
          throw new TRPCError( { code : "NOT_FOUND" , message : "Meeting not found" } );
        }
        return updatedMeeting;
      }),

  create: protectedProcedure
      .input(meetingInsertSchema)
      .mutation(async ({ input, ctx }) => {
        const [createdMeeting] = await db
          .insert(meeting)
          .values({
            ...input,
            userId: ctx.auth.user.id,
          })
          .returning();
        return createdMeeting;
  }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input ,ctx }) => {
      const [existingMeeting] = await db
        .select({
         ...getTableColumns(meeting),
        })
        .from(meeting)
        .where(
          and(
          eq(meeting.id, input.id),
          eq(meeting.userId, ctx.auth.user.id )
        )
      );

      if(!existingMeeting){
      throw new TRPCError( { code : "NOT_FOUND" , message : "Meeting not found" } );
      }

      return existingMeeting;
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
        ...getTableColumns(meeting),
      })
      .from(meeting)
      .where(
        and(
          eq(meeting.userId, ctx.auth.user.id),
          search ? ilike(meeting.name, `%${search}%`) : undefined
        )
      )
      .orderBy(desc(meeting.createdAt) , desc(meeting.id))
      .limit(pageSize)
      .offset((page - 1) * pageSize);
    const [total] =  await db
      .select({ count: count() })
      .from(meeting)
      .where(
        and(
          eq(meeting.userId, ctx.auth.user.id),
          search ? ilike(meeting.name, `%${search}%`) : undefined
        )
      );
    const totalPages = Math.ceil((total?.count) / pageSize);


    return {
      items: data,
      total: total.count,
      totalPages,

    };
  }),

  
});
