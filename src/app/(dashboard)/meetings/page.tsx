import { auth } from "@/lib/auth";
import { MeetingListHeader } from "@/modules/meetings/ui/components/meeting-List-header";
import { MeetingsView, MeetingsViewLoading } from "@/modules/meetings/ui/views/meetings-views";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/dist/server/api-utils";
import { headers } from "next/headers";
import { Suspense } from "react";

export default async function MeetingsPage() {
  const session = await auth.api.getSession({
    headers :await headers()
  })
  if(!session){
    redirect("/sign-in");
  }
  const queryClient = getQueryClient();

  // Use .fetch() instead of .options()
  await queryClient.prefetchQuery({
    queryKey: trpc.meetings.getMany.queryKey({ page: 1, pageSize: 20, search: "" }),
    queryFn: () => trpc.meetings.getMany.fetch({ page: 1, pageSize: 20, search: "" }),
  });

  return (
    <>
    <MeetingListHeader/>
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MeetingsViewLoading />}>
        <MeetingsView />
      </Suspense>
    </HydrationBoundary>
    </>
  );
}