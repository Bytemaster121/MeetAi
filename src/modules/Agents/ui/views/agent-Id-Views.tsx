"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { trpc } from "@/trpc/client";
import { AgentIdViewsHeader } from "../Components/agent-id-view-header";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { UpdateAgentsDialog } from "../Components/update-agents-dialog";
import { useState } from "react";

interface Props {
  agentId: string;
}

export const AgentIdViews = ({ agentId }: Props) => {
  const router = useRouter();
  const utils = trpc.useUtils();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [data] = trpc.agents.getOne.useSuspenseQuery({ id: agentId });

  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Agent",
    `Are you sure you want to delete "${data.name}"? This action cannot be undone.`
  );

  const removeAgent = trpc.agents.remove.useMutation({
    onSuccess: async () => {
      toast.success("Agent deleted successfully");
      await utils.agents.getMany.invalidate();
      router.push("/agents");
    },
    onError: (error) => {
      toast.error(`Error removing agent: ${error.message}`);
    },
  });

  const handleRemove = async () => {
    const confirmed = await confirm();
    if (confirmed) {
      removeAgent.mutate({ id: agentId });
    }
  };

  const handleEdit = () => {
    setIsEditOpen(true);
  };

  return (
    <>
      <ConfirmDialog />
      <UpdateAgentsDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        initialValues={data}
      />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <AgentIdViewsHeader
          agentId={agentId}
          agentName={data?.name || "Unknown Agent"}
          onEdit={handleEdit}
          OnRemove={handleRemove}
        />

        <div className="bg-white dark:bg-gray-800 rounded-lg border p-6 space-y-4">
          <div className="flex items-center gap-4 pb-4 border-b">
            <GeneratedAvatar
              varient="botttsNeutral"
              seed={data.name}
              className="size-16"
            />
            <div>
              <h1 className="text-2xl font-bold">{data.name}</h1>
              <p className="text-sm text-muted-foreground">Agent Profile</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Instructions</h2>
            <p className="text-muted-foreground">
              {data?.instruction || "No instructions provided"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Agent ID</p>
              <p className="text-sm font-mono mt-1 break-all">{data?.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Meetings</p>
              <p className="text-sm mt-1">{data?.meetingCount || 0} meetings</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Created At</p>
              <p className="text-sm mt-1">
                {data?.createdAt ? new Date(data.createdAt).toLocaleDateString() : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">User ID</p>
              <p className="text-sm font-mono mt-1 break-all">{data?.userId}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const AgentsIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agent"
      description="This may take a few seconds..."
    />
  );
};

export const AgentsIdViewError = () => {
  return (
    <ErrorState
      title="Error Loading Agent"
      description="Something went wrong while fetching the agent."
    />
  );
};
