import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/PropertyCard";
import { Link } from "react-router-dom";

const featuredProperties = [
  {
    title: "Modern Apartment in Yaoundé",
    location: "Bastos, Yaoundé",
    price: "350,000 FCFA/month",
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80",
    type: "Apartment",
    features: ["2 Bedrooms", "1 Kitchen", "Parking"],
    contact_info: {
      phone: "+237600000000",
      whatsapp: "237600000000"
    }
  },
  {
    title: "Cozy Studio in Douala",
    location: "Bonanjo, Douala",
    price: "200,000 FCFA/month",
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80",
    type: "Studio",
    features: ["1 Bedroom", "1 Kitchen"],
    contact_info: {
      phone: "+237600000000",
      whatsapp: "237600000000"
    }
  },
  {
    title: "Luxury Villa with Pool",
    location: "Bonapriso, Douala",
    price: "800,000 FCFA/month",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80",
    type: "Villa",
    features: ["4 Bedrooms", "2 Kitchens", "Pool", "Parking"],
    contact_info: {
      phone: "+237600000000",
      whatsapp: "237600000000"
    }
  }
];

export function FeaturedProperties() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Featured Properties</Badge>
          <h2 className="text-3xl font-bold mb-4">Popular Listings</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our hand-picked selection of premium properties available for rent.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProperties.map((property, index) => (
            <PropertyCard key={index} {...property} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link to="/find-house">View All Properties</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}