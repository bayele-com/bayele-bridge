import { AdminRole, AdminPermissions } from "@/types/database/admin";
import { supabase } from "@/integrations/supabase/client";

export async function checkAdminStatus(userId: string) {
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('user_type')
    .eq('id', userId)
    .single();

  if (profileError) throw profileError;

  const userType = profileData.user_type;
  const isAdminRole = ['super_admin', 'editor', 'developer'].includes(userType);

  if (!isAdminRole) {
    return {
      isAdmin: false,
      adminRole: null,
      permissions: null,
    };
  }

  const { data: permissionsData, error: permissionsError } = await supabase
    .from('admin_permissions')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (permissionsError) throw permissionsError;

  return {
    isAdmin: true,
    adminRole: userType as AdminRole,
    permissions: permissionsData.permissions as AdminPermissions,
  };
}