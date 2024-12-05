import { useState } from "react";
import { ProductFilters } from "@/components/marketplace/ProductFilters";
import { HeroSection } from "@/components/marketplace/HeroSection";
import { FeaturedProducts } from "@/components/marketplace/FeaturedProducts";
import { ProductGrid } from "@/components/marketplace/ProductGrid";

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onToggleFilters={() => setShowFilters(!showFilters)}
      />

      <FeaturedProducts />

      <div className="container px-4 mx-auto py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {showFilters && (
            <div className="w-full md:w-64 shrink-0">
              <ProductFilters
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>
          )}

          <div className="flex-1">
            <ProductGrid
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
            />
          </div>
        </div>
      </div>
    </div>
  );
}