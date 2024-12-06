import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function FeaturedClassifieds() {
  const { data: featuredClassifieds = [] } = useQuery({
    queryKey: ["featured-classifieds"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("classified_ads")
        .select("*")
        .eq("status", "published")
        .eq("featured", true)
        .limit(3);

      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Featured Classifieds</Badge>
          <h2 className="text-3xl font-bold mb-4">Latest Featured Ads</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the most popular classified ads from our community.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredClassifieds.map((ad) => (
            <Link 
              key={ad.id} 
              to={`/classifieds/${ad.id}`}
              className="group block"
            >
              <div className="bg-card rounded-lg overflow-hidden shadow-sm transition-shadow hover:shadow-md">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={ad.image_urls?.[0] || "/placeholder.svg"}
                    alt={ad.title}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <Badge className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm">
                    {ad.category}
                  </Badge>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ExternalLink className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">{ad.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {ad.description}
                  </p>
                  {ad.price && (
                    <p className="text-xl font-bold">{ad.price.toLocaleString()} FCFA</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link to="/classifieds">View All Classifieds</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}