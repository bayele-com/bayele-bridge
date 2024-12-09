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

interface BusinessFieldsProps {
  form: UseFormReturn<ProfileFormValues>;
}

export function BusinessFields({ form }: BusinessFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="business_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="business_address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business Address</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}