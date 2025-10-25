import { ResponsiveDialog } from "@/components/responsive-dialogs";
import { AgentsForm } from "./agents-form";
import { AgentGetOne } from "../../types";

interface UpdateAgentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues?: AgentGetOne;
}

export const UpdateAgentsDialog = ({
  open,
  onOpenChange,
  initialValues,
}: UpdateAgentsDialogProps) => {
  return (
    <ResponsiveDialog
      title="Edit Agent"
      description="Edit the agent details"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentsForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};
