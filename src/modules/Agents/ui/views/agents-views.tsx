// src/modules/Agents/ui/views/agents-views.tsx
"use client";
import { trpc } from "@/trpc/client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { DataTable } from "../Components/Data-table";
import { columns } from "../Components/Column";
import { EmptyState } from "@/components/empty-state";
import { useAgentFilters } from "../../hooks/use-agent-filters";
import { DataPagination } from "../Components/data-pagination";

export const AgentsView = () => {
  const [filters , setfilters] = useAgentFilters(); // { search: "", page: number }

  const { data, isLoading, isError } = trpc.agents.getMany.useQuery({
    page: filters.page,
    pageSize: 20,
    search: filters.search?.trim() ?? "",
  });

  if (isLoading) return <AgentsViewLoading />;
  if (isError) return <AgentsViewError />;

  return (
    <div className="flex pb-4 px-4 md:px-8 flex-col gap-y-4">
      <DataTable data={data?.items || []} columns={columns} />
      <DataPagination
       page = {filters.page}
        totalPages = {data?.totalPages || 1}
        onPageChange= {(page) => setfilters({page})}
      />
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
