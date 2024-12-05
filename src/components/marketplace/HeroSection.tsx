import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onToggleFilters: () => void;
}

export function HeroSection({ 
  searchQuery, 
  onSearchChange, 
  onToggleFilters 
}: HeroSectionProps) {
  return (
    <section className="bg-accent/10 py-12">
      <div className="container px-4 mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Discover Amazing Products
        </h1>
        <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
          Browse through our curated selection of products from trusted sellers across Cameroon
        </p>
        
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            onClick={onToggleFilters}
            className="w-full sm:w-auto"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>
    </section>
  );
}