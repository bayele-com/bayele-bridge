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
  business_name?: string | null;
  business_address?: string | null;
  affiliate_code?: string | null;
  payment_details?: Record<string, any> | null;
}

export interface AuthContextType {
  session: any | null;
  user: any | null;
  profile: Profile | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

export interface TableStats {
  total_rows: number;
  total_size: string;
}

export interface AdminUser {
  id: string;
  email: string;
  role: AdminRole;
  permissions: AdminPermissions['permissions'];
}