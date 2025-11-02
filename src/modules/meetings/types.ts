import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app";

export type MeetingGetOne = inferRouterOutputs<AppRouter>["meetings"]["getOne"];
export type MeetingGetMany = inferRouterOutputs<AppRouter>["meetings"]["getMany"];
export type MeetingCreate = inferRouterOutputs<AppRouter>["meetings"]["create"];
export type MeetingUpdate = inferRouterOutputs<AppRouter>["meetings"]["update"];
// export type MeetingRemove = inferRouterOutputs<AppRouter>["meetings"]["remove"];
