import { ResponsiveDialog } from "@/components/responsive-dialogs";
interface NewAgentsDialogProps {
    open : boolean;
    onOpenChange: (open : boolean) => void 

};

export const NewAgentsDialog = ({
    open,
    onOpenChange,

} : NewAgentsDialogProps) =>{
    return (
        <ResponsiveDialog
            title="New Agents"

            description="Create a new Agent"
            open = {open}
            onOpenChange={onOpenChange}

        >
            new agents form

        </ResponsiveDialog>
    );
};