import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2 } from "lucide-react";

export default function Analytics() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      // Fetch affiliate earnings summary
      const { data: affiliateStats } = await supabase
        .from("affiliate_earnings_summary")
        .select("*");

      // Fetch business commission summary
      const { data: businessStats } = await supabase
        .from("business_commission_summary")
        .select("*");

      return {
        affiliateStats,
        businessStats
      };
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

  const affiliateData = stats?.affiliateStats?.map(stat => ({
    name: stat.affiliate_name || 'Unknown',
    earnings: stat.total_earnings || 0,
    sales: stat.total_sales || 0
  })) || [];

  const businessData = stats?.businessStats?.map(stat => ({
    name: stat.business_name || 'Unknown',
    sales: stat.total_sales || 0,
    commissions: stat.total_commission_paid || 0
  })) || [];

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Affiliate Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={affiliateData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="earnings" fill="#8884d8" name="Earnings (FCFA)" />
                    <Bar dataKey="sales" fill="#82ca9d" name="Sales Count" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={businessData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#8884d8" name="Total Sales (FCFA)" />
                    <Bar dataKey="commissions" fill="#82ca9d" name="Commissions Paid (FCFA)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}