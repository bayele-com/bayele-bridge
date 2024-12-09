import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdmin } from '@/hooks/useAdmin';
import { Loader2 } from 'lucide-react';
import { AdminRole, AdminPermissions } from '@/types/database/admin';
import { toast } from '@/components/ui/use-toast';

interface AdminRouteProps {
  children: React.ReactNode;
  requiredRole?: AdminRole;
  requiredPermission?: keyof AdminPermissions;
}

export function AdminRoute({ 
  children, 
  requiredRole, 
  requiredPermission 
}: AdminRouteProps) {
  const { isAdmin, adminRole, checkPermission, isLoading } = useAdmin();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      console.warn('Unauthorized admin access attempt:', {
        path: location.pathname,
        timestamp: new Date().toISOString(),
      });
      
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "You don't have permission to access this area.",
      });
    }
  }, [isLoading, isAdmin, location]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check for super_admin role first
  if (adminRole === 'super_admin') {
    return <>{children}</>;
  }

  // Then check for specific required role
  if (requiredRole && adminRole !== requiredRole) {
    toast({
      variant: "destructive",
      title: "Access Denied",
      description: "You don't have the required role to access this area.",
    });
    return <Navigate to="/dashboard" replace />;
  }

  // Finally check for specific permission
  if (requiredPermission && !checkPermission(requiredPermission)) {
    toast({
      variant: "destructive",
      title: "Access Denied",
      description: "You don't have the required permission to access this area.",
    });
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}