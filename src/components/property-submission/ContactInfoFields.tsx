import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { PropertyFormValues } from "./types";

interface ContactInfoFieldsProps {
  form: UseFormReturn<PropertyFormValues>;
}

export function ContactInfoFields({ form }: ContactInfoFieldsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Contact Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input {...field} placeholder="+237600000000" />
              </FormControl>
              <FormDescription>
                Format: +237XXXXXXXXX
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="whatsapp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>WhatsApp Number</FormLabel>
              <FormControl>
                <Input {...field} placeholder="+237600000000" />
              </FormControl>
              <FormDescription>
                Format: +237XXXXXXXXX
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}