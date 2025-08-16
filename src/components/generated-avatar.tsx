import { createAvatar } from "@dicebear/core";
import  { botttsNeutral , initials } from "@dicebear/collection";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

interface GeneratedAvatarProps {
    seed: string;
    className?: string;
    varient : "botttsNeutral" | "initials";
}

export const GeneratedAvatar = ({ seed, className, varient }: GeneratedAvatarProps) => {
    let avatar;
    if (varient === "botttsNeutral") {
        avatar = createAvatar(botttsNeutral, {
            seed,
        });
    } else{
        avatar = createAvatar(initials, {
            seed,
            fontWeight : 500,
            fontSize : 42
        });
    }

    return (
        <Avatar className="{cn (className )}">
            <AvatarImage src={avatar.toDataUri()} alt="avatar" />
            <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
    );
};