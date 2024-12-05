import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type PendingAd = {
  id: string;
  title: string;
  category: string;
  ad_type: string;
  submitter_name: string;
  created_at: string;
  status: string;
}

type AdminPendingAdUpdate = Database['public']['Tables']['admin_pending_ads']['Update'];

export default function Moderation() {
  const { data: pendingItems = [], isLoading, refetch } = useQuery({
    queryKey: ["pending-moderation"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("admin_pending_ads")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as PendingAd[];
    },
  });

  const handleBulkAction = async (action: 'approve' | 'reject', ids: string[]) => {
    try {
      const { error } = await supabase
        .from("admin_pending_ads")
        .update({ status: action })
        .in("id", ids);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Successfully ${action}ed ${ids.length} items`,
      });
      
      refetch();
    } catch (error) {
      console.error(`Error ${action}ing items:`, error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${action} items. Please try again.`,
      });
    }
  };

  if (isLoading) {
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
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Content Moderation</h2>
          <p className="text-muted-foreground">
            Review and moderate user-generated content
          </p>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={() => {
              const selectedIds = pendingItems.map((item) => item.id);
              handleBulkAction("approve", selectedIds);
            }}
            className="bg-green-500 hover:bg-green-600"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Approve All
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              const selectedIds = pendingItems.map((item) => item.id);
              handleBulkAction("reject", selectedIds);
            }}
          >
            <XCircle className="mr-2 h-4 w-4" />
            Reject All
          </Button>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Submitter</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.ad_type}</TableCell>
                  <TableCell>{item.submitter_name}</TableCell>
                  <TableCell>
                    {new Date(item.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-green-500 hover:bg-green-600"
                        onClick={() => handleBulkAction("approve", [item.id])}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleBulkAction("reject", [item.id])}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}