import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { BarChart3, CircleDollarSign, Link2, Package } from "lucide-react";

export default function Overview() {
  const { user } = useAuth();
  const userType = user?.user_metadata?.user_type;

  const { data: stats = {} } = useQuery({
    queryKey: ["dashboard-stats", user?.id],
    queryFn: async () => {
      console.log("Fetching dashboard stats for user:", user?.id);
      
      if (!user) return {};

      switch (userType) {
        case "affiliate": {
          const { data: earnings } = await supabase
            .from("affiliate_earnings_summary")
            .select("*")
            .eq("affiliate_id", user.id)
            .single();
          
          return {
            totalEarnings: earnings?.total_earnings || 0,
            totalSales: earnings?.total_sales || 0,
            firstSaleDate: earnings?.first_sale_date,
            lastSaleDate: earnings?.last_sale_date,
          };
        }
        case "business": {
          const { data: summary } = await supabase
            .from("business_commission_summary")
            .select("*")
            .eq("business_id", user.id)
            .single();
          
          return {
            totalSales: summary?.total_sales || 0,
            totalOrders: summary?.total_orders || 0,
            totalCommissionPaid: summary?.total_commission_paid || 0,
            totalPlatformFees: summary?.total_platform_fees || 0,
          };
        }
        default:
          return {};
      }
    },
    enabled: !!user,
  });

  const getStatCards = () => {
    switch (userType) {
      case "affiliate":
        return [
          {
            title: "Total Earnings",
            value: `${stats.totalEarnings?.toLocaleString()} FCFA`,
            icon: CircleDollarSign,
            description: "Your total earnings from affiliate sales",
          },
          {
            title: "Total Sales",
            value: stats.totalSales?.toString() || "0",
            icon: Package,
            description: "Number of products sold through your links",
          },
          {
            title: "Active Links",
            value: "Coming soon",
            icon: Link2,
            description: "Your active affiliate links",
          },
          {
            title: "Performance",
            value: "Coming soon",
            icon: BarChart3,
            description: "Your conversion rate",
          },
        ];
      case "business":
        return [
          {
            title: "Total Sales",
            value: `${stats.totalSales?.toLocaleString()} FCFA`,
            icon: CircleDollarSign,
            description: "Your total sales revenue",
          },
          {
            title: "Total Orders",
            value: stats.totalOrders?.toString() || "0",
            icon: Package,
            description: "Number of orders received",
          },
          {
            title: "Commission Paid",
            value: `${stats.totalCommissionPaid?.toLocaleString()} FCFA`,
            icon: CircleDollarSign,
            description: "Total commission paid to affiliates",
          },
          {
            title: "Platform Fees",
            value: `${stats.totalPlatformFees?.toLocaleString()} FCFA`,
            icon: CircleDollarSign,
            description: "Total platform fees paid",
          },
        ];
      default:
        return [];
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your account.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {getStatCards().map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}