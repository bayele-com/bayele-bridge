import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { ProductForm } from "@/components/dashboard/products/ProductForm";

export default function Products() {
  const { user } = useAuth();
  const [showAddProduct, setShowAddProduct] = useState(false);

  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: ["dashboard-products", user?.id],
    queryFn: async () => {
      console.log("Fetching products for user:", user?.id);
      
      if (!user) return [];

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("business_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching products:", error);
        throw error;
      }

      return data;
    },
    enabled: !!user,
  });

  const handleProductCreated = () => {
    setShowAddProduct(false);
    refetch();
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Products</h2>
            <p className="text-muted-foreground">
              Manage your products and track their performance
            </p>
          </div>
          <Button onClick={() => setShowAddProduct(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-[200px] rounded-lg bg-muted animate-pulse"
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold">No products found</h3>
            <p className="text-muted-foreground mt-2">
              Get started by adding your first product
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-lg border bg-card text-card-foreground shadow-sm"
              >
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image_urls?.[0] || "/placeholder.svg"}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {product.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold">
                      {product.price.toLocaleString()} FCFA
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Commission: {product.commission_rate}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <ProductForm
            onSuccess={handleProductCreated}
            onCancel={() => setShowAddProduct(false)}
          />
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}