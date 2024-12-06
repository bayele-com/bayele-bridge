export type AdminRole = 'super_admin' | 'editor' | 'developer';

export interface AdminPermissions {
  id: string;
  userId: string;
  role: AdminRole;
  permissions: {
    canManageUsers?: boolean;
    canManageContent?: boolean;
    canManageSettings?: boolean;
    canViewAnalytics?: boolean;
    canModerateContent?: boolean;
    [key: string]: boolean | undefined;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  role: AdminRole;
  permissions: AdminPermissions['permissions'];
}