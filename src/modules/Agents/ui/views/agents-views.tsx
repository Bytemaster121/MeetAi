"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";

export const AgentsView = () => {
  const trpc = useTRPC();

  const { data, isLoading, isError } = useQuery({
    ...trpc.agents.getMany.queryOptions(),
    refetchOnMount: true, // ✅ ensures refetch after agent creation
    refetchOnWindowFocus: false, // optional: prevents refetch on tab switch
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