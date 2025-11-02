import { agentsRouter } from '@/modules/Agents/server/procedure';
import { createTRPCRouter } from '../init';
import { meetingRouter } from '@/modules/meetings/server/procedure';
export const appRouter = createTRPCRouter({
 agents : agentsRouter, 
 meetings: meetingRouter, 
});
export type AppRouter = typeof appRouter;