import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function FindHouseHero() {
  return (
    <div className="relative bg-background py-20 px-4 sm:px-6 lg:px-8">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] dark:opacity-[0.15]" />
      
      {/* Content */}
      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance">
          Find Your Perfect Home in Cameroon
        </h1>
        
        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
          Browse through our curated selection of properties in Yaoundé and Douala. 
          Whether you're looking for an apartment, house, or studio, we've got you covered.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="w-full sm:w-auto">
            <Search className="mr-2 h-5 w-5" />
            Start Your Search
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            List Your Property
          </Button>
        </div>
        
        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-1">
            <span className="text-3xl font-bold">1,000+</span>
            <span className="text-muted-foreground">Active Listings</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-3xl font-bold">2</span>
            <span className="text-muted-foreground">Major Cities</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-3xl font-bold">50+</span>
            <span className="text-muted-foreground">Neighborhoods</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-3xl font-bold">24/7</span>
            <span className="text-muted-foreground">Support</span>
          </div>
        </div>
      </div>
    </div>
  );
}