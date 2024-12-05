import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "./ProductCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface ProductGridProps {
  searchQuery: string;
  selectedCategory: string;
}

export function ProductGrid({ searchQuery, selectedCategory }: ProductGridProps) {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", searchQuery, selectedCategory],
    queryFn: async () => {
      console.log("Fetching products with filters:", {
        searchQuery,
        selectedCategory,
      });

      try {
        let query = supabase
          .from("products")
          .select(`
            *,
            business:profiles(full_name)
          `)
          .eq("status", "active");

        if (searchQuery) {
          query = query.or(
            `name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`
          );
        }

        if (selectedCategory !== "all") {
          query = query.eq("category", selectedCategory);
        }

        const { data, error } = await query;

        if (error) throw error;
        return data;
      } catch (error) {
        console.error("Error fetching products:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load products. Please try again later.",
        });
        return [];
      }
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <Skeleton key={n} className="h-[300px] rounded-lg" />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold">No products found</h3>
        <p className="text-muted-foreground mt-2">
          Try adjusting your filters or search query
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          description={product.description}
          price={product.price}
          imageUrl={product.image_urls?.[0]}
          businessName={product.business?.full_name}
          category={product.category}
        />
      ))}
    </div>
  );
}