import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface PendingAd {
  id: string;
  title: string;
  category: string;
  ad_type: string;
  price: number | null;
  location: string | null;
  submitter_email: string;
  submitter_name: string;
  status: string;
  created_at: string;
}

type AdminPendingAdUpdate = {
  status: 'approved' | 'rejected';
};

export default function Moderation() {
  const { data: pendingAds, isLoading, refetch } = useQuery({
    queryKey: ["pending-ads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_pending_ads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch pending ads",
        });
        throw error;
      }

      return data as PendingAd[];
    },
  });

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    try {
      const { error } = await supabase
        .from('admin_pending_ads')
        .update({ 
          status: action === 'approve' ? 'approved' : 'rejected' 
        } as AdminPendingAdUpdate)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Ad ${action}ed successfully`,
      });

      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${action} ad`,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Content Moderation</h1>
      
      {pendingAds && pendingAds.length > 0 ? (
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
                    Submitted by: {ad.submitter_name} ({ad.submitter_email})
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleAction(ad.id, 'approve')}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleAction(ad.id, 'reject')}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No pending ads to review.</p>
      )}
    </div>
  );
}