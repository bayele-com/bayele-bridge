import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

export default function Affiliates() {
  const { data: affiliates, isLoading } = useQuery({
    queryKey: ["affiliates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("affiliate_earnings_summary")
        .select("*")
        .order("total_earnings", { ascending: false });

      if (error) throw error;
      return data;
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
          <h2 className="text-3xl font-bold tracking-tight">Affiliate Management</h2>
          <p className="text-muted-foreground">
            Monitor and manage affiliate performance
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Affiliates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{affiliates?.length || 0}</div>
            </CardContent>
          </Card>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Affiliate Name</TableHead>
                <TableHead>Total Earnings</TableHead>
                <TableHead>Total Sales</TableHead>
                <TableHead>First Sale</TableHead>
                <TableHead>Last Sale</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {affiliates?.map((affiliate) => (
                <TableRow key={affiliate.affiliate_id}>
                  <TableCell>{affiliate.affiliate_name || 'Anonymous'}</TableCell>
                  <TableCell>{affiliate.total_earnings?.toLocaleString()} FCFA</TableCell>
                  <TableCell>{affiliate.total_sales}</TableCell>
                  <TableCell>
                    {affiliate.first_sale_date 
                      ? format(new Date(affiliate.first_sale_date), 'MMM d, yyyy')
                      : 'No sales yet'}
                  </TableCell>
                  <TableCell>
                    {affiliate.last_sale_date
                      ? format(new Date(affiliate.last_sale_date), 'MMM d, yyyy')
                      : 'No sales yet'}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {affiliate.total_sales > 0 ? 'Active' : 'Inactive'}
                    </Badge>
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