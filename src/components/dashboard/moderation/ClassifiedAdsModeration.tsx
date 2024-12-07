import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { CheckCircle, XCircle } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type ClassifiedAd = Database["public"]["Tables"]["classified_ads"]["Row"];

interface ClassifiedAdsModerationProps {
  onAction: (id: string, action: 'approve' | 'reject', type: 'ad') => Promise<void>;
}

export function ClassifiedAdsModeration({ onAction }: ClassifiedAdsModerationProps) {
  const { data: pendingAds, isLoading } = useQuery({
    queryKey: ["pending-ads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('classified_ads')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch pending ads",
        });
        throw error;
      }

      return data as ClassifiedAd[];
    },
  });

  if (isLoading || !pendingAds) {
    return <p className="text-center text-muted-foreground py-8">Loading pending ads...</p>;
  }

  if (pendingAds.length === 0) {
    return <p className="text-center text-muted-foreground py-8">No pending ads to review.</p>;
  }

  return (
    <div className="grid gap-4">
      {pendingAds.map((ad) => (
        <div key={ad.id} className="bg-card p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{ad.title}</h3>
              <p className="text-sm text-muted-foreground">
                Category: {ad.category} | Type: {ad.ad_type}
              </p>
              {ad.price && (
                <p className="text-sm">Price: {ad.price.toLocaleString()} FCFA</p>
              )}
              {ad.location && (
                <p className="text-sm">Location: {ad.location}</p>
              )}
              <p className="text-sm mt-2">
                Contact: {
                  typeof ad.contact_info === 'object' && ad.contact_info !== null
                    ? `${(ad.contact_info as any).name || 'N/A'} (${(ad.contact_info as any).email || 'N/A'})`
                    : 'N/A'
                }
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="default"
                className="bg-green-500 hover:bg-green-600"
                onClick={() => onAction(ad.id, 'approve', 'ad')}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Approve
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onAction(ad.id, 'reject', 'ad')}
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