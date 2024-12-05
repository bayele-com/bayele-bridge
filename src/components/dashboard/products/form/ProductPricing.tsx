import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "./types";

interface ProductPricingProps {
  form: UseFormReturn<ProductFormValues>;
}

export function ProductPricing({ form }: ProductPricingProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Price (FCFA)</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="commission_rate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Commission Rate (%)</FormLabel>
            <FormControl>
              <Input type="number" min="0" max="100" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}