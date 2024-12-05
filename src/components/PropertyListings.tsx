import { PropertyListingsContainer } from "./property/PropertyListingsContainer";

interface PropertyListingsProps {
  city: "Yaounde" | "Douala";
  neighborhoodId: string;
  priceRange: [number, number];
  propertyType: string;
}

export function PropertyListings(props: PropertyListingsProps) {
  return <PropertyListingsContainer {...props} />;
}