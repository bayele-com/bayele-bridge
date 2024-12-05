import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PropertyListingsGrid } from "./PropertyListingsGrid";
import { PropertyListingsSkeleton } from "./PropertyListingsSkeleton";
import { PropertyListingsEmpty } from "./PropertyListingsEmpty";
import type { Database } from "@/integrations/supabase/types";

type RentalProperty = Database["public"]["Tables"]["rental_properties"]["Row"] & {
  neighborhoods: {
    name: string;
    districts: {
      name: string;
    } | null;
  } | null;
};

interface PropertyListingsContainerProps {
  city: "Yaounde" | "Douala";
  neighborhoodId: string;
  priceRange: [number, number];
  propertyType: string;
}

export function PropertyListingsContainer({
  city,
  neighborhoodId,
  priceRange,
  propertyType,
}: PropertyListingsContainerProps) {
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["properties", city, neighborhoodId, priceRange, propertyType],
    queryFn: async () => {
      console.log("Fetching properties with filters:", {
        city,
        neighborhoodId,
        priceRange,
        propertyType,
      });

      let query = supabase
        .from("rental_properties")
        .select(`
          *,
          neighborhoods (
            name,
            districts (
              name
            )
          )
        `)
        .eq("city", city)
        .gte("price", priceRange[0])
        .lte("price", priceRange[1]);

      if (neighborhoodId !== "all") {
        query = query.eq("neighborhood_id", neighborhoodId);
      }

      if (propertyType !== "all") {
        query = query.eq("property_type", propertyType);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error("Error fetching properties:", error);
        throw error;
      }

      console.log("Fetched properties:", data);
      return data as RentalProperty[];
    },
  });

  if (isLoading) {
    return <PropertyListingsSkeleton />;
  }

  if (properties.length === 0) {
    return <PropertyListingsEmpty />;
  }

  return <PropertyListingsGrid properties={properties} />;
}