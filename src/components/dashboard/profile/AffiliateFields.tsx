import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ProfileFormValues } from "./types";

interface AffiliateFieldsProps {
  form: UseFormReturn<ProfileFormValues>;
}

export function AffiliateFields({ form }: AffiliateFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="payment_details.momo_number"
        render={({ field }) => (
          <FormItem>
            <FormLabel>MTN Mobile Money Number</FormLabel>
            <FormControl>
              <Input {...field} placeholder="+237" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="payment_details.om_number"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Orange Money Number (Optional)</FormLabel>
            <FormControl>
              <Input {...field} placeholder="+237" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}