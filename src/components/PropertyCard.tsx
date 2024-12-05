import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface PropertyCardProps {
  title: string;
  location: string;
  price: string;
  imageUrl: string;
  type: string;
  features: string[];
}

export const PropertyCard = ({ title, location, price, imageUrl, type, features }: PropertyCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
        <Badge className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm">{type}</Badge>
      </div>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{location}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {features.map((feature, index) => (
            <Badge key={index} variant="secondary">{feature}</Badge>
          ))}
        </div>
        <p className="text-xl font-bold">{price}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  );
};