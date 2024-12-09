import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AdminRole, AdminPermissions } from '@/types/database/admin';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

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
        // First check if user exists in admin_permissions table
        const { data: adminData, error: adminError } = await supabase
          .from('admin_permissions')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (adminError) {
          console.error('Error checking admin status:', adminError);
          setIsAdmin(false);
          setAdminRole(null);
          setPermissions(null);
          return;
        }

        if (!adminData) {
          setIsAdmin(false);
          setAdminRole(null);
          setPermissions(null);
          return;
        }

        setIsAdmin(true);
        setAdminRole(adminData.role as AdminRole);
        setPermissions(adminData.permissions as AdminPermissions);
      } catch (error) {
        console.error('Error verifying admin status:', error);
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

  const checkPermission = (permission: keyof AdminPermissions): boolean => {
    if (!permissions) return false;
    if (adminRole === 'super_admin') return true;
    return !!permissions[permission];
  };

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