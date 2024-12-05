import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertyFilters } from "@/components/PropertyFilters";
import { FindHouseHero } from "@/components/FindHouseHero";
import type { Database } from "@/integrations/supabase/types";

type RentalProperty = Database["public"]["Tables"]["rental_properties"]["Row"];

export default function FindHouse() {
  const [city, setCity] = useState<"Yaounde" | "Douala">("Yaounde");
  const [neighborhoodId, setNeighborhoodId] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [propertyType, setPropertyType] = useState<string>("all");

  const { data: properties, isLoading } = useQuery({
    queryKey: ["properties", city, neighborhoodId, priceRange, propertyType],
    queryFn: async () => {
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
      
      if (error) throw error;
      return data as (RentalProperty & {
        neighborhoods: {
          name: string;
          districts: {
            name: string;
          } | null;
        } | null;
      })[];
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <FindHouseHero />
      
      <div className="container mx-auto px-4 py-8">
        <PropertyFilters
          city={city}
          setCity={setCity}
          neighborhoodId={neighborhoodId}
          setNeighborhoodId={setNeighborhoodId}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          propertyType={propertyType}
          setPropertyType={setPropertyType}
        />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-[400px] bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties?.map((property) => (
              <PropertyCard
                key={property.id}
                title={property.title}
                location={`${property.neighborhoods?.name}, ${property.city}`}
                price={`${property.price.toLocaleString()} FCFA/month`}
                imageUrl={property.image_urls?.[0] || "/placeholder.svg"}
                type={property.property_type}
                features={[
                  `${property.bedrooms} Bedrooms`,
                  `${property.bathrooms} Bathrooms`,
                  ...(property.features as string[] || []),
                ]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}