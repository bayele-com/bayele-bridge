import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, MessageSquare, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ClassifiedCardProps {
  title: string;
  description: string;
  category: string;
  location: string;
  price?: number;
  imageUrl: string;
  contact: {
    phone?: string;
    whatsapp?: string;
  };
}

export function ClassifiedCard({
  title,
  description,
  category,
  location,
  price,
  imageUrl,
  contact,
}: ClassifiedCardProps) {
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
              {category}
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

          <p className="text-sm line-clamp-3">{description}</p>

          {price && (
            <p className="text-xl font-bold">{price.toLocaleString()} FCFA</p>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex gap-2">
        {contact.phone && (
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => window.location.href = `tel:${contact.phone}`}
          >
            <Phone className="w-4 h-4 mr-2" />
            Call
          </Button>
        )}
        {contact.whatsapp && (
          <Button
            className="flex-1 bg-[#0EA5E9] hover:bg-[#0EA5E9]/90"
            onClick={() => window.open(
              `https://wa.me/${contact.whatsapp}?text=Hi, I'm interested in your ad: ${title}`,
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