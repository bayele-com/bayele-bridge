import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Camera } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        description: "Please enter a search term",
        variant: "destructive",
      });
      return;
    }
    navigate(`/find-house?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="relative min-h-[600px] flex items-center justify-center px-4 py-20 bg-orange-500">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] dark:opacity-[0.15]" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <p className="text-xl text-white font-bold mb-8 max-w-2xl mx-auto text-balance">
          Find your perfect home, discover great products, and post classified ads all in one place.
        </p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative flex items-center">
            <div className="absolute left-4 flex items-center gap-2">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search for properties, products, or services..."
              className="w-full h-14 pl-12 pr-32 rounded-full border bg-background shadow-sm focus:ring-2 focus:ring-accent focus:border-accent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <div className="absolute right-3 flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-accent/10"
              >
                <Camera className="h-5 w-5" />
              </Button>
              <Button onClick={handleSearch}>
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            className="flex flex-col items-center p-6 h-auto hover:bg-accent/10 bg-white"
            asChild
          >
            <Link to="/find-house">
              <Search className="h-6 w-6 mb-2" />
              <span>Find a House</span>
            </Link>
          </Button>
          <Button 
            variant="outline" 
            className="flex flex-col items-center p-6 h-auto hover:bg-accent/10 bg-white"
            asChild
          >
            <Link to="/list-property">
              <Search className="h-6 w-6 mb-2" />
              <span>List & Sell</span>
            </Link>
          </Button>
          <Button 
            variant="outline" 
            className="flex flex-col items-center p-6 h-auto hover:bg-accent/10 bg-white"
            asChild
          >
            <Link to="/marketplace">
              <Search className="h-6 w-6 mb-2" />
              <span>Promote & Earn</span>
            </Link>
          </Button>
          <Button 
            variant="outline" 
            className="flex flex-col items-center p-6 h-auto hover:bg-accent/10 bg-white"
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