import { UserType } from './database/enums';
import { AdminPermissions } from './database/admin';

export type AdminRole = 'super_admin' | 'editor' | 'developer';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  whatsapp_number: string | null;
  user_type: UserType;
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  role: AdminRole;
  permissions: AdminPermissions['permissions'];
}