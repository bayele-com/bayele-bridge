import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { supabase } from "@/integrations/supabase/client";
import { TableStats } from "@/types/database/stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function Database() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["database-stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('get_table_stats')
        .single();

      if (error) throw error;
      
      // Safely parse the Json response
      if (typeof data === 'object' && data !== null) {
        return {
          total_rows: Number(data.total_rows || 0),
          total_size: String(data.total_size || '0 bytes')
        } satisfies TableStats;
      }
      
      throw new Error('Invalid response format from get_table_stats');
    },
  });

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
          <h2 className="text-3xl font-bold tracking-tight">Database Statistics</h2>
          <p className="text-muted-foreground">
            Overview of the database usage and metrics
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Total Rows</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats?.total_rows.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Database Size</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats?.total_size}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}