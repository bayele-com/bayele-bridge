import { AdminPermissions } from "@/types/database/admin";

export function useAdminPermissions(permissions: AdminPermissions | null, adminRole: string | null) {
  const checkPermission = (permission: keyof AdminPermissions): boolean => {
    if (!permissions) return false;
    if (adminRole === 'super_admin') return true;
    return !!permissions[permission];
  };

  return { checkPermission };
}