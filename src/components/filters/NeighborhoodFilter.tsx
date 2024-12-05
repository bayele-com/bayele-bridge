import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Database } from "@/integrations/supabase/types";

type Neighborhood = Database["public"]["Tables"]["neighborhoods"]["Row"];

interface NeighborhoodFilterProps {
  city: "Yaounde" | "Douala";
  neighborhoodId: string;
  setNeighborhoodId: (id: string) => void;
}

export function NeighborhoodFilter({ city, neighborhoodId, setNeighborhoodId }: NeighborhoodFilterProps) {
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

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Neighborhood</label>
      <Select value={neighborhoodId} onValueChange={setNeighborhoodId}>
        <SelectTrigger>
          <SelectValue placeholder="Select neighborhood" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Neighborhoods</SelectItem>
          {neighborhoods?.map((neighborhood) => (
            <SelectItem key={neighborhood.id} value={neighborhood.id}>
              {neighborhood.name} {neighborhood.districts?.name ? `(${neighborhood.districts.name})` : ''}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}