export interface ProfileFormValues {
  full_name: string;
  whatsapp_number?: string | null;
  business_name?: string;
  business_address?: string;
  payment_details?: {
    momo_number?: string;
    om_number?: string;
  } | null;
}