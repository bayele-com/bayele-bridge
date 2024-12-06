import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { AdminRole, AdminPermissions } from '@/types/database/admin';
import { useToast } from '@/components/ui/use-toast';

export function useAdmin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminRole, setAdminRole] = useState<AdminRole | null>(null);
  const [permissions, setPermissions] = useState<AdminPermissions | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAdminStatus() {
      if (!user) {
        setIsAdmin(false);
        setAdminRole(null);
        setPermissions(null);
        setIsLoading(false);
        return;
      }

      try {
        // First check if user has admin role
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;

        const userType = profileData.user_type;
        const isAdminRole = ['super_admin', 'editor', 'developer'].includes(userType);

        if (!isAdminRole) {
          setIsAdmin(false);
          setAdminRole(null);
          setPermissions(null);
          setIsLoading(false);
          return;
        }

        // Fetch admin permissions
        const { data: permissionsData, error: permissionsError } = await supabase
          .from('admin_permissions')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (permissionsError) throw permissionsError;

        setIsAdmin(true);
        setAdminRole(userType as AdminRole);
        // Cast the permissions data to AdminPermissions type
        setPermissions(permissionsData.permissions as AdminPermissions);
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

    checkAdminStatus();
  }, [user, toast]);

  const checkPermission = (permission: keyof AdminPermissions): boolean => {
    if (!isAdmin || !permissions) return false;
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