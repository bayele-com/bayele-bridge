import { CityFilter } from "./filters/CityFilter";
import { NeighborhoodFilter } from "./filters/NeighborhoodFilter";
import { PropertyTypeFilter } from "./filters/PropertyTypeFilter";
import { PriceRangeFilter } from "./filters/PriceRangeFilter";

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
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 p-4 bg-card rounded-lg shadow-sm">
      <CityFilter city={city} setCity={setCity} />
      <NeighborhoodFilter 
        city={city} 
        neighborhoodId={neighborhoodId} 
        setNeighborhoodId={setNeighborhoodId} 
      />
      <PropertyTypeFilter 
        propertyType={propertyType} 
        setPropertyType={setPropertyType} 
      />
      <PriceRangeFilter 
        priceRange={priceRange} 
        setPriceRange={setPriceRange} 
      />
    </div>
  );
}