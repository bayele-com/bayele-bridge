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
  const { data: neighborhoods } = useQuery({
    queryKey: ["neighborhoods", city],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("neighborhoods")
        .select("*")
        .eq("city", city);
      
      if (error) throw error;
      return data as Neighborhood[];
    },
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
              {neighborhood.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}