import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Shield, UserX, AlertTriangle } from "lucide-react";

interface AuthLog {
  id: string;
  type: string;
  success: boolean;
  created_at: string;
}

export default function Security() {
  const { data: securityStats, isLoading } = useQuery({
    queryKey: ["security-stats"],
    queryFn: async () => {
      const { data: failedLogins, error } = await supabase
        .from('auth_log')
        .select('*')
        .eq('type', 'login')
        .eq('success', false)
        .limit(10) as { data: AuthLog[] | null; error: any };

      if (error) throw error;

      return {
        failedLogins: failedLogins || [],
      };
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Security Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Monitor and manage security settings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserX className="h-5 w-5" />
              Failed Login Attempts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {securityStats?.failedLogins.length || 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Security Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No active security alerts
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}