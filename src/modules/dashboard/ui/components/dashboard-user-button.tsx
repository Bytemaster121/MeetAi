import { authClient } from "@/lib/auth-client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar , AvatarImage } from "@/components/ui/avatar";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { ChevronDownIcon } from "lucide-react";


export const DashboardUserButton = () =>{
    const { data, isPending } = authClient.useSession();
    if(isPending || !data ?.user)  {
        return null;
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden">

                {data.user.image ?(
                    <Avatar>
                        <AvatarImage src={data.user.image}/>
                    </Avatar>

                ) : (
                    <GeneratedAvatar
                        seed={data.user.id}
                        className="size-9 mr-3"
                        varient="initials"
                    />
                )}
                 <span className="text-sm font-medium">{data.user.name}</span>
                <ChevronDownIcon className="size-4 shrink-0" />
               
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>{data.user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}