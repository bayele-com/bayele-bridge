import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ExternalLink, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  id: string;
  name: string;
  description: string | null;
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
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      price,
      imageUrl,
    });
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <Dialog>
        <DialogTrigger asChild>
          <div className="aspect-square relative overflow-hidden cursor-pointer group">
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
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={name}
            className="w-full h-auto rounded-lg"
          />
        </DialogContent>
      </Dialog>

      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <Link to={`/products/${id}`}>
              <h3 className="text-lg font-semibold line-clamp-2 hover:text-primary transition-colors">
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

          <div className="flex items-center justify-between">
            <p className="text-xl font-bold">{price.toLocaleString()} FCFA</p>
            <div className="flex items-center text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="ml-1 text-sm">4.5</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button className="w-full" onClick={handleAddToCart}>
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}