import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdmin } from '@/hooks/useAdmin';
import { Loader2 } from 'lucide-react';
import { AdminRole, AdminPermissions } from '@/types/database/admin';

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
    // Log access attempts for security auditing
    if (!isLoading && !isAdmin) {
      console.warn('Unauthorized admin access attempt:', {
        path: location.pathname,
        timestamp: new Date().toISOString(),
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

  if (requiredRole && adminRole !== requiredRole && adminRole !== 'super_admin') {
    return <Navigate to="/dashboard" replace />;
  }

  if (requiredPermission && !checkPermission(requiredPermission)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}