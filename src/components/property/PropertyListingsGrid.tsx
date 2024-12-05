import { VirtualList } from "@/components/ui/virtual-list";
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

interface PropertyListingsGridProps {
  properties: RentalProperty[];
}

export function PropertyListingsGrid({ properties }: PropertyListingsGridProps) {
  const renderProperty = (property: RentalProperty) => (
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
      features={property.features as string[] || []}
      bedrooms={property.bedrooms}
      bathrooms={property.bathrooms}
      contact_info={property.contact_info as { phone?: string; whatsapp?: string }}
    />
  );

  return (
    <div className="w-full">
      <VirtualList
        items={properties}
        height={800}
        itemHeight={450}
        renderItem={renderProperty}
        className="w-full"
      />
    </div>
  );
}