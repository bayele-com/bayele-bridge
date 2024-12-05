import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ExternalLink } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  businessName?: string;
  category: string;
}

export function ProductCard({
  id,
  name,
  description,
  price,
  imageUrl,
  businessName,
  category,
}: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <Link to={`/marketplace/${id}`} className="block">
        <div className="aspect-square relative overflow-hidden group">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          <Badge className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm">
            {category}
          </Badge>
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <ExternalLink className="w-6 h-6 text-white" />
          </div>
        </div>
      </Link>

      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <Link to={`/marketplace/${id}`}>
              <h3 className="text-lg font-semibold line-clamp-2 hover:text-accent">
                {name}
              </h3>
            </Link>
            {businessName && (
              <p className="text-sm text-muted-foreground mt-1">
                by {businessName}
              </p>
            )}
          </div>

          <p className="text-sm line-clamp-2 text-muted-foreground">
            {description}
          </p>

          <p className="text-xl font-bold">{price.toLocaleString()} FCFA</p>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button className="w-full">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}