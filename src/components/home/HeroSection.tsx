import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto text-center">
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
          Find your perfect home, discover great products, and post classified ads all in one place.
        </p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for properties, products, or services..."
              className="w-full h-12 pl-12 pr-4 rounded-l-lg border border-r-0 focus:outline-none focus:ring-2 focus:ring-[#2962FF]"
            />
            <Button 
              size="lg" 
              className="rounded-l-none bg-[#2962FF] hover:bg-[#2962FF]/90"
            >
              Search
            </Button>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <Button 
            size="lg" 
            variant="outline" 
            className="flex flex-col items-center p-6 h-auto hover:bg-[#2962FF]/10 hover:text-[#2962FF] border-[#2962FF]/20"
            asChild
          >
            <Link to="/find-house">
              <Search className="h-6 w-6 mb-2" />
              <span>Find a House</span>
            </Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="flex flex-col items-center p-6 h-auto hover:bg-[#FFA500]/10 hover:text-[#FFA500] border-[#FFA500]/20"
            asChild
          >
            <Link to="/list-property">
              <Search className="h-6 w-6 mb-2" />
              <span>List & Sell</span>
            </Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="flex flex-col items-center p-6 h-auto hover:bg-[#2962FF]/10 hover:text-[#2962FF] border-[#2962FF]/20"
            asChild
          >
            <Link to="/marketplace">
              <Search className="h-6 w-6 mb-2" />
              <span>Promote & Earn</span>
            </Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="flex flex-col items-center p-6 h-auto hover:bg-[#FFA500]/10 hover:text-[#FFA500] border-[#FFA500]/20"
            asChild
          >
            <Link to="/post-classified">
              <Search className="h-6 w-6 mb-2" />
              <span>Post an Ad</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}