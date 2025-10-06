"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { NewAgentsDialog } from "./new-agents-dialog";
import { useState } from "react";
import { useAgentFilters } from "../../hooks/use-agent-filters";
import { SearchFilters } from "./Agent-serach-Filters";
import { DEFAULT_PAGE } from "@/constant";

export const AgentsListHeader = () => {
  const [filterText, setFilterText] = useAgentFilters();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isAnyFilterApplied = !!filterText.search;


  const onClearFilters = () => {
    setFilterText({ 
        search: "",
        page: DEFAULT_PAGE,
    });
  }

  return (
    <>
      <NewAgentsDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Agents</h5>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon />
            New Agents
          </Button>
        </div>
        <div className="flex items-center gap-x-2 p-1">
          <SearchFilters />
            {isAnyFilterApplied && (
                <Button 
                    variant="outline"
                    size="sm"
                    onClick={onClearFilters}
                    >
                    <XCircleIcon/>
                    Clear
                </Button>
            )}
        </div>
      </div>
    </>
  );
};