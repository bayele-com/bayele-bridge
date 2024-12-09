import { Json } from '@/integrations/supabase/types';
import { UserType } from './enums';

export interface PaymentDetails {
  momo_number?: string;
  om_number?: string;
  [key: string]: any; // Add index signature for Json compatibility
}

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
  payment_details?: PaymentDetails | null;
}