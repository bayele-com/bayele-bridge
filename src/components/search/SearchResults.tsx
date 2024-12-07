import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PropertyCard } from "@/components/PropertyCard";
import { ClassifiedCard } from "@/components/classifieds/ClassifiedCard";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

interface SearchResultsProps {
  query: string;
}

export function SearchResults({ query }: SearchResultsProps) {
  const { data: properties = [], isLoading: propertiesLoading } = useQuery({
    queryKey: ["search-properties", query],
    queryFn: async () => {
      console.log("Searching properties with query:", query);
      const { data, error } = await supabase
        .from("rental_properties")
        .select("*")
        .or(`title.ilike.%${query}%, description.ilike.%${query}%`)
        .eq("status", "available")
        .limit(10);

      if (error) throw error;
      return data;
    },
  });

  const { data: classifieds = [], isLoading: classifiedsLoading } = useQuery({
    queryKey: ["search-classifieds", query],
    queryFn: async () => {
      console.log("Searching classifieds with query:", query);
      const { data, error } = await supabase
        .from("classified_ads")
        .select("*")
        .or(`title.ilike.%${query}%, description.ilike.%${query}%`)
        .eq("status", "published")
        .limit(10);

      if (error) throw error;
      return data;
    },
  });

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ["search-products", query],
    queryFn: async () => {
      console.log("Searching products with query:", query);
      const { data, error } = await supabase
        .from("products")
        .select("*, business:profiles(full_name)")
        .or(`name.ilike.%${query}%, description.ilike.%${query}%`)
        .eq("status", "active")
        .limit(10);

      if (error) throw error;
      return data;
    },
  });

  if (propertiesLoading || classifiedsLoading || productsLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((n) => (
          <Skeleton key={n} className="h-[300px] rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <Tabs defaultValue="properties" className="w-full">
      <TabsList className="w-full justify-start mb-6">
        <TabsTrigger value="properties">
          Properties ({properties.length})
        </TabsTrigger>
        <TabsTrigger value="classifieds">
          Classifieds ({classifieds.length})
        </TabsTrigger>
        <TabsTrigger value="products">
          Products ({products.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="properties">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="classifieds">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classifieds.map((classified) => (
            <ClassifiedCard key={classified.id} {...classified} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="products">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}