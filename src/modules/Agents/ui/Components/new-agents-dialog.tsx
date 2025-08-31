import { ResponsiveDialog } from "@/components/responsive-dialogs";
import { AgentsForm } from "./agents-form";

interface NewAgentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewAgentsDialog = ({
  open,
  onOpenChange,
}: NewAgentsDialogProps) => {
  return (
    <ResponsiveDialog
      title="New Agent"
      description="Create a new Agent"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentsForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
};