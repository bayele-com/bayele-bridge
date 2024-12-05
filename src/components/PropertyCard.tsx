import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  Bed, 
  Bath, 
  MapPin, 
  Phone, 
  MessageSquare,
  ExternalLink
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PropertyCardProps {
  title: string;
  location: string;
  price: string;
  imageUrl: string;
  type: string;
  features: string[];
  bedrooms?: number;
  bathrooms?: number;
  contact_info: {
    phone?: string;
    whatsapp?: string;
  };
}

export const PropertyCard = ({ 
  title, 
  location, 
  price, 
  imageUrl, 
  type, 
  features,
  bedrooms,
  bathrooms,
  contact_info 
}: PropertyCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <Dialog>
        <DialogTrigger asChild>
          <div className="aspect-[4/3] relative overflow-hidden cursor-pointer group">
            <img
              src={imageUrl}
              alt={title}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
            <Badge className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm">
              {type}
            </Badge>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <ExternalLink className="w-6 h-6 text-white" />
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-auto rounded-lg"
          />
        </DialogContent>
      </Dialog>

      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold line-clamp-2 mb-2">{title}</h3>
            <p className="text-muted-foreground flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {location}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {bedrooms && (
              <div className="flex items-center gap-1">
                <Bed className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{bedrooms} bed</span>
              </div>
            )}
            {bathrooms && (
              <div className="flex items-center gap-1">
                <Bath className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{bathrooms} bath</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {features.map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>

          <p className="text-xl font-bold">{price}</p>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex gap-2">
        {contact_info.phone && (
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => window.location.href = `tel:${contact_info.phone}`}
          >
            <Phone className="w-4 h-4 mr-2" />
            Call
          </Button>
        )}
        {contact_info.whatsapp && (
          <Button 
            className="flex-1"
            onClick={() => window.open(
              `https://wa.me/${contact_info.whatsapp}?text=Hi, I'm interested in your property: ${title}`,
              '_blank'
            )}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            WhatsApp
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}