import { AgentsListHeader } from "@/modules/Agents/ui/Components/AgentsListHeader";
import {
  AgentsView,
  AgentsViewError,
  AgentsViewLoading,
} from "@/modules/Agents/ui/views/agents-views";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";

export default async function AgentsPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());
  const dehydratedState = dehydrate(queryClient);

  return (
    <>
    <AgentsListHeader/>
    <HydrationBoundary state={dehydratedState}>

      <Suspense fallback={<AgentsViewLoading />}>
        <ErrorBoundary errorComponent={AgentsViewError}>
          <AgentsView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
    </>
  );
}