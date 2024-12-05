import { useState } from "react";
import { FindHouseHero } from "@/components/FindHouseHero";
import { PropertyFilters } from "@/components/PropertyFilters";
import { PropertyListings } from "@/components/PropertyListings";

export default function FindHouse() {
  const [city, setCity] = useState<"Yaounde" | "Douala">("Yaounde");
  const [neighborhoodId, setNeighborhoodId] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [propertyType, setPropertyType] = useState<string>("all");

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

        <PropertyListings
          city={city}
          neighborhoodId={neighborhoodId}
          priceRange={priceRange}
          propertyType={propertyType}
        />
      </div>
    </div>
  );
}