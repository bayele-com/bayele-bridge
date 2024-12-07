import { Badge } from "@/components/ui/badge";
import { FileText, Home, ShoppingBag } from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Features</Badge>
          <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover all the ways Bayele can help you find, sell, and connect in Cameroon's largest online marketplace.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 text-center glass-card rounded-lg">
            <div className="w-12 h-12 bg-[#0EA5E9]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Home className="h-6 w-6 text-[#0EA5E9]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Property Listings</h3>
            <p className="text-muted-foreground">Find your perfect home with our extensive property listings.</p>
          </div>
          
          <div className="p-6 text-center glass-card rounded-lg">
            <div className="w-12 h-12 bg-[#0EA5E9]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-6 w-6 text-[#0EA5E9]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Marketplace</h3>
            <p className="text-muted-foreground">Buy and sell products from trusted sellers across Cameroon.</p>
          </div>
          
          <div className="p-6 text-center glass-card rounded-lg">
            <div className="w-12 h-12 bg-[#0EA5E9]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-6 w-6 text-[#0EA5E9]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Classified Ads</h3>
            <p className="text-muted-foreground">Post and browse classified ads for various categories.</p>
          </div>
        </div>
      </div>
    </section>
  );
}