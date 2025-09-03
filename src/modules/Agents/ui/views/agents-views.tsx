"use client";

import { trpc } from "@/trpc/client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";

export const AgentsView = () => {
  // ✅ use tRPC’s generated hook directly
  const { data, isLoading, isError } = trpc.agents.getMany.useQuery(undefined, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <AgentsViewLoading />;
  if (isError) return <AgentsViewError />;

  return (
    <div className="grid gap-4">
      {data?.map((agent) => (
        <div key={agent.id} className="border p-4 rounded">
          <h3 className="font-semibold">{agent.name}</h3>
          <p className="text-sm text-muted-foreground">{agent.instruction}</p>
        </div>
      ))}
    </div>
  );
};

export const AgentsViewLoading = () => (
  <LoadingState
    title="Loading Agents"
    description="This may take a few seconds..."
  />
);

export const AgentsViewError = () => (
  <ErrorState
    title="Error Loading Agents"
    description="Something went wrong while fetching agents."
  />
);
