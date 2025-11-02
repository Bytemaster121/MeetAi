"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { trpc } from "@/trpc/client";

export const MeetingsView = () => {
  const { data, isLoading, isError } = trpc.meetings.getMany.useQuery({
    page: 1,
    pageSize: 20,
    search: "",
  });

  if (isLoading) return <MeetingsViewLoading />;
  if (isError) return <MeetingsViewError />;

  return <div>{JSON.stringify(data?.items)}</div>;
};

export const MeetingsViewLoading = () => (
  <LoadingState title="Loading Meetings" description="This may take a few seconds..." />
);

export const MeetingsViewError = () => (
  <ErrorState
    title="Error Loading Meetings"
    description="Something went wrong while fetching meetings."
  />
);
