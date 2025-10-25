import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app";

// Infer the output type from the tRPC router
export type AgentGetOne = inferRouterOutputs<AppRouter>["agents"]["getOne"];

// Optional: Add other agent-related types if needed
export type AgentGetMany = inferRouterOutputs<AppRouter>["agents"]["getMany"];
export type AgentCreate = inferRouterOutputs<AppRouter>["agents"]["create"];
export type AgentUpdate = inferRouterOutputs<AppRouter>["agents"]["update"];
export type AgentRemove = inferRouterOutputs<AppRouter>["agents"]["remove"];
