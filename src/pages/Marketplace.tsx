import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { ProductFilters } from "@/components/marketplace/ProductFilters";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Query for featured products
  const { data: featuredProducts = [], isLoading: isFeaturedLoading } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      console.log("Fetching featured products");
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          business:profiles(full_name)
        `)
        .eq("status", "active")
        .limit(12)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching featured products:", error);
        throw error;
      }

      return data;
    },
  });

  // Query for all products with filters
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", searchQuery, selectedCategory],
    queryFn: async () => {
      console.log("Fetching products with filters:", {
        searchQuery,
        selectedCategory,
      });

      let query = supabase
        .from("products")
        .select(`
          *,
          business:profiles(full_name)
        `)
        .eq("status", "active");

      if (searchQuery) {
        query = query.or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }

      if (selectedCategory !== "all") {
        query = query.eq("category", selectedCategory);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching products:", error);
        throw error;
      }

      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-accent/10 py-12">
        <div className="container px-4 mx-auto">
          <h1 className="text-4xl font-bold text-center mb-6">
            Discover Amazing Products
          </h1>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            Browse through our curated selection of products from trusted sellers across Cameroon
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-background">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              Featured Products
            </h2>
          </div>

          {isFeaturedLoading ? (
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

      {/* All Products */}
      <div className="container px-4 mx-auto py-8">
        <div className="flex gap-6">
          {/* Filters */}
          {showFilters && (
            <div className="w-64 shrink-0">
              <ProductFilters
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <Skeleton
                    key={n}
                    className="h-[300px] rounded-lg"
                  />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold">No products found</h3>
                <p className="text-muted-foreground mt-2">
                  Try adjusting your filters or search query
                </p>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}