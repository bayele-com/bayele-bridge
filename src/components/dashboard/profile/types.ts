import { PaymentDetails } from "@/types/database/profile";

export interface ProfileFormValues {
  full_name: string;
  whatsapp_number?: string | null;
  business_name?: string;
  business_address?: string;
  payment_details?: PaymentDetails;
}