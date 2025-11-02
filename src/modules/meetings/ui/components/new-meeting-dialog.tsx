import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ResponsiveDialog } from "@/components/responsive-dialogs";
import { MeetingForm } from "./meeting-form";
import { useRouter } from "next/navigation";

interface NewMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewMeetingDialog = ({ open, onOpenChange }: NewMeetingDialogProps) => {
  const router = useRouter();
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title="New Meeting"
      description="Set up a new meeting"
    >
      <MeetingForm
        onSuccess={(id) => {
          onOpenChange(false);
          if (id) router.push(`/meetings/${id}`);
        }}
        onCancel={() => {
          onOpenChange(false);
        }}
      />
    </ResponsiveDialog>
  );
};
