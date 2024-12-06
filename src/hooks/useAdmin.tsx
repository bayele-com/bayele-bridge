import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AdminRole, AdminPermissions } from '@/types/database/admin';
import { useToast } from '@/components/ui/use-toast';
import { checkAdminStatus } from '@/utils/adminUtils';
import { useAdminPermissions } from './useAdminPermissions';

export function useAdmin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminRole, setAdminRole] = useState<AdminRole | null>(null);
  const [permissions, setPermissions] = useState<AdminPermissions | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function verifyAdminStatus() {
      if (!user) {
        setIsAdmin(false);
        setAdminRole(null);
        setPermissions(null);
        setIsLoading(false);
        return;
      }

      try {
        const { isAdmin, adminRole, permissions } = await checkAdminStatus(user.id);
        setIsAdmin(isAdmin);
        setAdminRole(adminRole);
        setPermissions(permissions);
      } catch (error) {
        console.error('Error checking admin status:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to verify admin permissions. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    }

    verifyAdminStatus();
  }, [user, toast]);

  const { checkPermission } = useAdminPermissions(permissions, adminRole);

  const requireAdmin = () => {
    if (!isLoading && !isAdmin) {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "You don't have permission to access this area.",
      });
      navigate('/');
      return false;
    }
    return true;
  };

  return {
    isAdmin,
    adminRole,
    permissions,
    isLoading,
    checkPermission,
    requireAdmin,
  };
}