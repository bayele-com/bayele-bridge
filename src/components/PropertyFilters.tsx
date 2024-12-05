import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import type { Database } from "@/integrations/supabase/types";

type Neighborhood = Database["public"]["Tables"]["neighborhoods"]["Row"];

interface PropertyFiltersProps {
  city: "Yaounde" | "Douala";
  setCity: (city: "Yaounde" | "Douala") => void;
  neighborhoodId: string;
  setNeighborhoodId: (id: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  propertyType: string;
  setPropertyType: (type: string) => void;
}

export function PropertyFilters({
  city,
  setCity,
  neighborhoodId,
  setNeighborhoodId,
  priceRange,
  setPriceRange,
  propertyType,
  setPropertyType,
}: PropertyFiltersProps) {
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
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 p-4 bg-card rounded-lg shadow-sm">
      <div className="space-y-2">
        <label className="text-sm font-medium">City</label>
        <Select value={city} onValueChange={(value: "Yaounde" | "Douala") => setCity(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select city" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Yaounde">Yaoundé</SelectItem>
            <SelectItem value="Douala">Douala</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Neighborhood</label>
        <Select value={neighborhoodId} onValueChange={setNeighborhoodId}>
          <SelectTrigger>
            <SelectValue placeholder="Select neighborhood" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Neighborhoods</SelectItem>
            {neighborhoods?.map((neighborhood) => (
              <SelectItem key={neighborhood.id} value={neighborhood.id}>
                {neighborhood.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Property Type</label>
        <Select value={propertyType} onValueChange={setPropertyType}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Types</SelectItem>
            <SelectItem value="Apartment">Apartment</SelectItem>
            <SelectItem value="House">House</SelectItem>
            <SelectItem value="Studio">Studio</SelectItem>
            <SelectItem value="Room">Room</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Price Range: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} FCFA
        </label>
        <Slider
          min={0}
          max={1000000}
          step={50000}
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          className="mt-6"
        />
      </div>
    </div>
  );
}