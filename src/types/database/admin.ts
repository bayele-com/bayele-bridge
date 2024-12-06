import { UserType } from './enums';

export type AdminRole = Extract<UserType, 'super_admin' | 'editor' | 'developer'>;

export interface AdminPermissions {
  canManageUsers?: boolean;
  canManageContent?: boolean;
  canManageSettings?: boolean;
  canViewAnalytics?: boolean;
  canModerateContent?: boolean;
  [key: string]: boolean | undefined;
}

export interface AdminPermissionsRow {
  id: string;
  user_id: string;
  role: AdminRole;
  permissions: AdminPermissions;
  created_at: string;
  updated_at: string;
}