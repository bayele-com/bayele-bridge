import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./types";

interface PriceFieldProps {
  form: UseFormReturn<FormValues>;
}

export function PriceField({ form }: PriceFieldProps) {
  return (
    <FormField
      control={form.control}
      name="price"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Price (Optional)</FormLabel>
          <FormControl>
            <Input 
              type="number" 
              placeholder="Enter price in FCFA" 
              {...field} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}