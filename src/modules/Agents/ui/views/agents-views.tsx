"use client";

import { trpc } from "@/trpc/client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { DataTable } from "../Components/Data-table";
import { columns } from "../Components/Column";

export const AgentsView = () => {
  const { data, isLoading, isError } = trpc.agents.getMany.useQuery(undefined, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <AgentsViewLoading />;
  if (isError) return <AgentsViewError />;

  return (
    <div className="flex pb-4 px-4 md:px-8 flex-col gap-y-4">
      <DataTable data={data ?? []} columns={columns} />
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
