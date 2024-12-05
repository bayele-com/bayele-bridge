import { useState } from "react";
import { ClassifiedListings } from "@/components/classifieds/ClassifiedListings";
import { ClassifiedFilters } from "@/components/classifieds/ClassifiedFilters";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Classifieds() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Classifieds</h1>
            <p className="text-muted-foreground">
              Browse and post classified ads in various categories
            </p>
          </div>
          <Button 
            onClick={() => navigate("/post-classified")} 
            className="mt-4 md:mt-0"
          >
            <Plus className="mr-2 h-4 w-4" />
            Post an Ad
          </Button>
        </div>

        <ClassifiedFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />

        <ClassifiedListings
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          selectedLocation={selectedLocation}
        />
      </div>
    </div>
  );
}