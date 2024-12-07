import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ClassifiedAdsModeration } from "@/components/dashboard/moderation/ClassifiedAdsModeration";
import { PropertiesModeration } from "@/components/dashboard/moderation/PropertiesModeration";
import { useQuery } from "@tanstack/react-query";

export default function Moderation() {
  const { data: pendingAdsCount } = useQuery({
    queryKey: ["pending-ads-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('classified_ads')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      if (error) throw error;
      return count || 0;
    },
  });

  const { data: pendingPropertiesCount } = useQuery({
    queryKey: ["pending-properties-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('rental_properties')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      if (error) throw error;
      return count || 0;
    },
  });

  const handleAction = async (id: string, action: 'approve' | 'reject', type: 'ad' | 'property') => {
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
    } catch (error) {
      console.error('Error updating item:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${action} ${type}`,
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Content Moderation</h1>
        
        <Tabs defaultValue="ads" className="w-full">
          <TabsList>
            <TabsTrigger value="ads">
              Classified Ads ({pendingAdsCount || 0})
            </TabsTrigger>
            <TabsTrigger value="properties">
              Properties ({pendingPropertiesCount || 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ads">
            <ClassifiedAdsModeration onAction={handleAction} />
          </TabsContent>

          <TabsContent value="properties">
            <PropertiesModeration onAction={handleAction} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}