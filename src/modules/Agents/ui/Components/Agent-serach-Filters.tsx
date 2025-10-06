import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAgentFilters } from "../../hooks/use-agent-filters";

export const SearchFilters = () => {
  const [filters, setFilters] = useAgentFilters();

  return (
    <div className="relative">
      <Input
        placeholder="Search Agents By Name"
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
        className="h-9 bg-white w-[200px] pl-7"
      />
      <SearchIcon className="absolute size-4 left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
};