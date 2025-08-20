import { z } from 'zod';
import { agentsRouter } from '@/modules/Agents/server/procedure';
import { baseProcedure, createTRPCRouter } from '../init';
import { agents } from '@/db/schema';
export const appRouter = createTRPCRouter({
 agents : agentsRouter, 
});
export type AppRouter = typeof appRouter;