import { User as SupabaseUser } from '@supabase/supabase-js';

export interface User extends SupabaseUser {
  user_type?: 'affiliate' | 'business' | 'user' | 'admin';
}