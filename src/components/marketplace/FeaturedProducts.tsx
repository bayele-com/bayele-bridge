import { Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "./ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export function FeaturedProducts() {
  const { data: featuredProducts = [], isLoading } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      console.log("Fetching featured products");
      try {
        const { data, error } = await supabase
          .from("products")
          .select(`
            *,
            business:profiles(full_name)
          `)
          .eq("status", "active")
          .limit(12)
          .order("created_at", { ascending: false });

        if (error) throw error;
        return data;
      } catch (error) {
        console.error("Error fetching featured products:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load featured products. Please try again later.",
        });
        return [];
      }
    },
  });

  return (
    <section className="py-12 bg-background">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            Featured Products
          </h2>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <Skeleton key={n} className="h-[300px] rounded-lg" />
            ))}
          </div>
        ) : (
          <Carousel className="w-full">
            <CarouselContent>
              {featuredProducts.map((product) => (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/4">
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    imageUrl={product.image_urls?.[0]}
                    businessName={product.business?.full_name}
                    category={product.category}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </div>
    </section>
  );
}