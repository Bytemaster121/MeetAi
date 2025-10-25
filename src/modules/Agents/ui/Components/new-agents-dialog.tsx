import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AgentsForm } from "./agents-form";

interface NewAgentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewAgentsDialog = ({ open, onOpenChange }: NewAgentsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Agent</DialogTitle>
          <DialogDescription>
            Create a new AI agent with custom instructions
          </DialogDescription>
        </DialogHeader>
        <AgentsForm
          onSuccess={() => onOpenChange(false)}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
