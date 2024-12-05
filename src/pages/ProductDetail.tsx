import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { ShoppingCart, Share2 } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const { user } = useAuth();

  console.log("Product ID from URL:", id); // Debug log

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!id) throw new Error("No product ID provided");
      
      console.log("Fetching product with ID:", id); // Debug log
      
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          business:profiles!products_business_id_fkey (
            full_name
          )
        `)
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching product:", error); // Debug log
        throw error;
      }

      console.log("Fetched product data:", data); // Debug log
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="aspect-square" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
        <p className="text-muted-foreground mt-2">
          The product you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
          <img
            src={product.image_urls?.[0] || "/placeholder.svg"}
            alt={product.name}
            className="object-cover w-full h-full"
          />
          {product.image_urls && product.image_urls.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {product.image_urls.map((_, index) => (
                <button
                  key={index}
                  className="w-2 h-2 rounded-full bg-white opacity-50 hover:opacity-100 transition-opacity"
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-muted-foreground mt-1">
              Sold by {product.business?.full_name}
            </p>
          </div>

          <p className="text-2xl font-bold">
            {product.price.toLocaleString()} FCFA
          </p>

          <div className="prose max-w-none">
            <p>{product.description}</p>
          </div>

          <Card className="p-4 bg-accent/10">
            <p className="text-sm">
              Commission Rate: {product.commission_rate}%
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Potential earnings for affiliates
            </p>
          </Card>

          <div className="space-y-3">
            <Button className="w-full" size="lg" onClick={() => {
              toast({
                title: "Coming Soon",
                description: "Shopping cart functionality will be available soon!",
              });
            }}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>

            {user?.user_metadata?.user_type === "affiliate" && (
              <Button
                variant="outline"
                className="w-full"
                size="lg"
                onClick={() => {
                  toast({
                    title: "Coming Soon",
                    description: "Affiliate link generation will be available soon!",
                  });
                }}
              >
                <Share2 className="mr-2 h-5 w-5" />
                Generate Affiliate Link
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}