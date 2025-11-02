import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog
} from "@/components/ui/command";
import { ReactNode, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface Option {
  id: string;
  value: string;
  children: ReactNode;
}

interface CommandSelectProps {
  options: Option[];
  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;
  value?: string;
  placeholder?: string;
  isSearchable?: boolean;
  className?: string;
}
export const CommandSelect = ({
  options,
  onSelect,
  onSearch,
  value,
  placeholder,
  className
}: CommandSelectProps) => {
    const [open, setOpen] = useState(false);
    const selectOptions = options.find(option => option.value === value);
    
  return (
    <>

       <Button 
         type="button"
         variant="outline"
         className={cn("h-9 justify-between font-normal px-2",
            !selectOptions && "text-muted-foreground",
            className

         )}
         >
            
         </Button>
    
    
    
    
    
    
    </>
  );
};
