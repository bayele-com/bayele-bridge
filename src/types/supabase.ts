import { User as SupabaseUser } from '@supabase/supabase-js';
import { Database } from '@/integrations/supabase/types';

export type User = SupabaseUser & {
  user_type?: Database['public']['Enums']['user_type'];
}