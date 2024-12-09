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
    <section className="relative min-h-[600px] flex items-center justify-center px-4 py-20 mt-16">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/lovable-uploads/15e125db-fbcb-4198-93b7-209f970dd953.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Your All-in-One Marketplace
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Find your perfect home, discover great products, and post classified ads all in one place.
        </p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative flex items-center">
            <div className="absolute left-4 flex items-center gap-2">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for properties, products, or services..."
              className="w-full h-14 pl-12 pr-32 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-md text-white placeholder:text-white/60 focus:outline-none focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <div className="absolute right-3 flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                <Camera className="h-5 w-5" />
              </Button>
              <Button 
                className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 text-white px-6"
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            className="flex flex-col items-center p-6 h-auto bg-white/10 hover:bg-white/20 backdrop-blur-md border-white/20 text-white"
            asChild
          >
            <Link to="/find-house">
              <Search className="h-6 w-6 mb-2" />
              <span>Find a House</span>
            </Link>
          </Button>
          <Button 
            variant="outline" 
            className="flex flex-col items-center p-6 h-auto bg-white/10 hover:bg-white/20 backdrop-blur-md border-white/20 text-white"
            asChild
          >
            <Link to="/list-property">
              <Search className="h-6 w-6 mb-2" />
              <span>List & Sell</span>
            </Link>
          </Button>
          <Button 
            variant="outline" 
            className="flex flex-col items-center p-6 h-auto bg-white/10 hover:bg-white/20 backdrop-blur-md border-white/20 text-white"
            asChild
          >
            <Link to="/marketplace">
              <Search className="h-6 w-6 mb-2" />
              <span>Promote & Earn</span>
            </Link>
          </Button>
          <Button 
            variant="outline" 
            className="flex flex-col items-center p-6 h-auto bg-white/10 hover:bg-white/20 backdrop-blur-md border-white/20 text-white"
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