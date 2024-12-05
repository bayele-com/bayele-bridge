import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PropertyCard } from "@/components/PropertyCard";
import type { Database } from "@/integrations/supabase/types";

type RentalProperty = Database["public"]["Tables"]["rental_properties"]["Row"] & {
  neighborhoods: {
    name: string;
    districts: {
      name: string;
    } | null;
  } | null;
};

interface PropertyListingsProps {
  city: "Yaounde" | "Douala";
  neighborhoodId: string;
  priceRange: [number, number];
  propertyType: string;
}

export function PropertyListings({
  city,
  neighborhoodId,
  priceRange,
  propertyType,
}: PropertyListingsProps) {
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
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="h-[400px] bg-muted animate-pulse rounded-lg"
          />
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold">No properties found</h3>
        <p className="text-muted-foreground mt-2">
          Try adjusting your filters to see more results
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          title={property.title}
          location={`${property.neighborhoods?.name}${
            property.neighborhoods?.districts?.name
              ? `, ${property.neighborhoods.districts.name}`
              : ""
          }, ${property.city}`}
          price={`${property.price.toLocaleString()} FCFA/month`}
          imageUrl={property.image_urls?.[0] || "/placeholder.svg"}
          type={property.property_type}
          features={[
            ...(property.features as string[] || []),
          ]}
          bedrooms={property.bedrooms}
          bathrooms={property.bathrooms}
          contact_info={property.contact_info}
        />
      ))}
    </div>
  );
}