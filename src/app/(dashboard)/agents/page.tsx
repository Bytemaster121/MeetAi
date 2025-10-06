import { auth } from "@/lib/auth";
import { loadSearchParams } from "@/modules/Agents/params";
import { AgentsListHeader } from "@/modules/Agents/ui/Components/AgentsListHeader";
import {
  AgentsView,
  AgentsViewError,
  AgentsViewLoading,
} from "@/modules/Agents/ui/views/agents-views";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SearchParams } from "nuqs";
import { Suspense } from "react";


/**
 * Server component that renders the Agents page with server-side auth gating and prefetched data.
 *
 * Checks the current user session on the server and redirects to `/sign-in` when unauthenticated.
 * When authenticated, it prefetches the `agents.getMany` TRPC query into a React Query client,
 * dehydrates that state for client hydration, and renders the page UI.
 *
 * The rendered tree always includes the agents list header and a HydrationBoundary containing
 * a Suspense fallback (AgentsViewLoading) and an ErrorBoundary (AgentsViewError) around AgentsView.
 *
 * @returns A React element for the Agents page (server component) with prehydrated query state.
 */

 interface Props{
  searchParams?: Promise<SearchParams>;
 }
export default async function AgentsPage({searchParams}: Props) {
  const filters =  await loadSearchParams(searchParams);

  const session = await auth.api.getSession({ // last line of defence for auth
      headers: await headers(), // Await headers() since it returns a Promise
    });
  
    if (!session) {
      redirect("/sign-in"); // ✅ This will now work
    }
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({
    ...filters,
  }));
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