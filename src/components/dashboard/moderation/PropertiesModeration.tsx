import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { CheckCircle, XCircle } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type RentalProperty = Database["public"]["Tables"]["rental_properties"]["Row"];

interface PropertiesModerationProps {
  onAction: (id: string, action: 'approve' | 'reject', type: 'property') => Promise<void>;
}

export function PropertiesModeration({ onAction }: PropertiesModerationProps) {
  const { data: pendingProperties, isLoading } = useQuery({
    queryKey: ["pending-properties"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rental_properties')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch pending properties",
        });
        throw error;
      }

      return data as RentalProperty[];
    },
  });

  if (isLoading || !pendingProperties) {
    return <p className="text-center text-muted-foreground py-8">Loading pending properties...</p>;
  }

  if (pendingProperties.length === 0) {
    return <p className="text-center text-muted-foreground py-8">No pending properties to review.</p>;
  }

  return (
    <div className="grid gap-4">
      {pendingProperties.map((property) => (
        <div key={property.id} className="bg-card p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{property.title}</h3>
              <p className="text-sm text-muted-foreground">
                Type: {property.property_type} | City: {property.city}
              </p>
              <p className="text-sm">Price: {property.price.toLocaleString()} FCFA</p>
              <p className="text-sm mt-2">
                Contact: {
                  typeof property.contact_info === 'object' && property.contact_info !== null
                    ? `${(property.contact_info as any).name || 'N/A'} (${(property.contact_info as any).email || 'N/A'})`
                    : 'N/A'
                }
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="default"
                className="bg-green-500 hover:bg-green-600"
                onClick={() => onAction(property.id, 'approve', 'property')}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Approve
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onAction(property.id, 'reject', 'property')}
              >
                <XCircle className="h-4 w-4 mr-1" />
                Reject
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}