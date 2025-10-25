import { AgentIdViews, AgentsIdViewLoading } from "@/modules/Agents/ui/views/agent-Id-Views";
import { AgentsViewError } from "@/modules/Agents/ui/views/agents-views";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";

interface Props {
  params: Promise<{ agentId: string }>;
}

export default async function Page({ params }: Props) {
  const { agentId } = await params;
  const queryClient = getQueryClient();
  
  void queryClient.prefetchQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentsIdViewLoading />}>
        <ErrorBoundary errorComponent={AgentsViewError}>
          <AgentIdViews agentId={agentId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
}
