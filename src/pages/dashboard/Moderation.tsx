import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

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

interface PendingProperty {
  id: string;
  title: string;
  property_type: string;
  price: number;
  city: string;
  status: string;
  created_at: string;
  contact_info: {
    name: string;
    email: string;
    phone: string;
  };
}

export default function Moderation() {
  const { data: pendingAds, isLoading: isLoadingAds, refetch: refetchAds } = useQuery({
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

      return data as PendingAd[];
    },
  });

  const { data: pendingProperties, isLoading: isLoadingProperties, refetch: refetchProperties } = useQuery({
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

      return data as PendingProperty[];
    },
  });

  const handleAdAction = async (id: string, action: 'approve' | 'reject', type: 'ad' | 'property') => {
    try {
      const table = type === 'ad' ? 'classified_ads' : 'rental_properties';
      const updateData = {
        status: action === 'approve' ? 'approved' : 'rejected',
        ...(action === 'reject' && { rejection_reason: 'Does not meet our guidelines' }),
        ...(action === 'approve' && { approved_at: new Date().toISOString() }),
      };

      const { error } = await supabase
        .from(table)
        .update(updateData)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `${type === 'ad' ? 'Advertisement' : 'Property'} ${action}ed successfully`,
      });

      if (type === 'ad') {
        refetchAds();
      } else {
        refetchProperties();
      }
    } catch (error) {
      console.error('Error updating item:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${action} ${type}`,
      });
    }
  };

  if (isLoadingAds || isLoadingProperties) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Content Moderation</h1>
        
        <Tabs defaultValue="ads" className="w-full">
          <TabsList>
            <TabsTrigger value="ads">
              Classified Ads ({pendingAds?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="properties">
              Properties ({pendingProperties?.length || 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ads">
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
                          variant="default"
                          className="bg-green-500 hover:bg-green-600"
                          onClick={() => handleAdAction(ad.id, 'approve', 'ad')}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleAdAction(ad.id, 'reject', 'ad')}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No pending ads to review.</p>
            )}
          </TabsContent>

          <TabsContent value="properties">
            {pendingProperties && pendingProperties.length > 0 ? (
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
                          Contact: {property.contact_info.name} ({property.contact_info.email})
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="default"
                          className="bg-green-500 hover:bg-green-600"
                          onClick={() => handleAdAction(property.id, 'approve', 'property')}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleAdAction(property.id, 'reject', 'property')}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No pending properties to review.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}