import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ClassifiedCard } from "./ClassifiedCard";

interface ClassifiedListingsProps {
  searchQuery: string;
  selectedCategory: string;
  selectedLocation: string;
}

export function ClassifiedListings({
  searchQuery,
  selectedCategory,
  selectedLocation,
}: ClassifiedListingsProps) {
  const { data: ads = [], isLoading } = useQuery({
    queryKey: ["classifieds", searchQuery, selectedCategory, selectedLocation],
    queryFn: async () => {
      console.log("Fetching classifieds with filters:", {
        searchQuery,
        selectedCategory,
        selectedLocation,
      });

      let query = supabase
        .from("classified_ads")
        .select("*")
        .eq("status", "published");

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }

      if (selectedCategory !== "all") {
        query = query.eq("category", selectedCategory);
      }

      if (selectedLocation !== "all") {
        query = query.eq("location", selectedLocation);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching classifieds:", error);
        throw error;
      }

      console.log("Fetched classifieds:", data);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="h-[300px] bg-muted animate-pulse rounded-lg"
          />
        ))}
      </div>
    );
  }

  if (ads.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold">No ads found</h3>
        <p className="text-muted-foreground mt-2">
          Try adjusting your filters or post a new ad
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ads.map((ad) => (
        <ClassifiedCard
          key={ad.id}
          title={ad.title}
          description={ad.description}
          category={ad.category}
          location={ad.location}
          price={ad.price}
          imageUrl={ad.image_urls?.[0] || "/placeholder.svg"}
          contact={ad.contact_info}
        />
      ))}
    </div>
  );
}