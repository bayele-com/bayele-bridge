import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { Database } from "@/integrations/supabase/types";

type Neighborhood = Database["public"]["Tables"]["neighborhoods"]["Row"];

interface NeighborhoodFilterProps {
  city: "Yaounde" | "Douala";
  neighborhoodId: string;
  setNeighborhoodId: (id: string) => void;
}

export function NeighborhoodFilter({ city, neighborhoodId, setNeighborhoodId }: NeighborhoodFilterProps) {
  const [open, setOpen] = useState(false);

  const { data: neighborhoods, isLoading } = useQuery({
    queryKey: ["neighborhoods", city],
    queryFn: async () => {
      console.log("Fetching neighborhoods for city:", city);
      const { data, error } = await supabase
        .from("neighborhoods")
        .select("*, districts(name)")
        .eq("city", city)
        .order('name');
      
      if (error) {
        console.error("Error fetching neighborhoods:", error);
        throw error;
      }
      console.log("Fetched neighborhoods:", data);
      return data as (Neighborhood & { districts: { name: string } | null })[];
    },
    enabled: !!city,
  });

  const selectedNeighborhood = neighborhoods?.find(n => n.id === neighborhoodId);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Neighborhood</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {neighborhoodId === "all" 
              ? "All Neighborhoods"
              : selectedNeighborhood 
                ? `${selectedNeighborhood.name}${selectedNeighborhood.districts?.name ? ` (${selectedNeighborhood.districts.name})` : ''}`
                : "Select neighborhood..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search neighborhood..." />
            <CommandEmpty>No neighborhood found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value="all"
                onSelect={() => {
                  setNeighborhoodId("all");
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    neighborhoodId === "all" ? "opacity-100" : "opacity-0"
                  )}
                />
                All Neighborhoods
              </CommandItem>
              {neighborhoods?.map((neighborhood) => (
                <CommandItem
                  key={neighborhood.id}
                  value={neighborhood.name.toLowerCase()}
                  onSelect={() => {
                    setNeighborhoodId(neighborhood.id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      neighborhoodId === neighborhood.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {neighborhood.name}
                  {neighborhood.districts?.name && (
                    <span className="ml-2 text-muted-foreground">
                      ({neighborhood.districts.name})
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}