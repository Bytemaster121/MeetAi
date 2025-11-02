"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { useState } from "react";
import { DEFAULT_PAGE } from "@/constant";
import { NewMeetingDialog } from "./new-meeting-dialog";

export const MeetingListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);



  return (
    <>
     <NewMeetingDialog open ={isDialogOpen} onOpenChange={setIsDialogOpen}/>

      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Meeting</h5>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon />
            New Meeting
          </Button>
        </div>
        <div className="flex items-center gap-x-2 p-1">
          
        </div>
      </div>
    </>
  );
};
