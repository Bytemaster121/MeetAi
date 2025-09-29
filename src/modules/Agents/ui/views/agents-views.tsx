"use client";

import { trpc } from "@/trpc/client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { DataTable } from "../Components/Data-table";
import { columns } from "../Components/Column";
import { EmptyState } from "@/components/empty-state";
import { useState } from "react";

export const AgentsView = () => {
  // Provide pagination inputs which your API expects
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20); // can be made dynamic if needed

  const { data, isLoading, isError } = trpc.agents.getMany.useQuery(
    { page, pageSize, search: undefined },
    {
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) return <AgentsViewLoading />;
  if (isError) return <AgentsViewError />;

  return (
    <div className="flex pb-4 px-4 md:px-8 flex-col gap-y-4">
      <DataTable data={data?.items || []} columns={columns} />

      {data?.items?.length === 0 && (
        <div className="mt-8">
          <EmptyState
            title="Create your first Agent"
            description="Agents are AI-powered assistants that can perform tasks on your behalf. Create one to get started!"
          />
        </div>
      )}
    </div>
  );
};

export const AgentsViewLoading = () => (
  <LoadingState title="Loading Agents" description="This may take a few seconds..." />
);

export const AgentsViewError = () => (
  <ErrorState
    title="Error Loading Agents"
    description="Something went wrong while fetching agents."
  />
);
