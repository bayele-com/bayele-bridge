import { Database } from "@/integrations/supabase/types";

export type AdminPermissionsRow = Database["public"]["Tables"]["admin_permissions"]["Row"];
export type AdminPermissionsInsert = Database["public"]["Tables"]["admin_permissions"]["Insert"];
export type AdminPermissionsUpdate = Database["public"]["Tables"]["admin_permissions"]["Update"];

export type AdminRole = 'super_admin' | 'editor' | 'developer';

export interface AdminPermissions {
  canManageUsers?: boolean;
  canManageContent?: boolean;
  canManageSettings?: boolean;
  canViewAnalytics?: boolean;
  canModerateContent?: boolean;
  [key: string]: boolean | undefined;
}