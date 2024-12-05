import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { PropertyFormValues } from "./types";

interface ManagementOptionsFieldsProps {
  form: UseFormReturn<PropertyFormValues>;
  fees: {
    self: number;
    bayele: number;
  };
}

export function ManagementOptionsFields({ form, fees }: ManagementOptionsFieldsProps) {
  const managementType = form.watch("managementType");

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Management Options</h2>
      
      <FormField
        control={form.control}
        name="managementType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>How would you like to manage your property?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2 border rounded-lg p-4">
                  <RadioGroupItem value="self" id="self" />
                  <label htmlFor="self" className="flex-1">
                    <div className="font-medium">Self Manage</div>
                    <div className="text-sm text-muted-foreground">
                      3,500 FCFA monthly fee
                    </div>
                  </label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-4">
                  <RadioGroupItem value="bayele" id="bayele" />
                  <label htmlFor="bayele" className="flex-1">
                    <div className="font-medium">Bayele Manages</div>
                    <div className="text-sm text-muted-foreground">
                      2,500 FCFA monthly + 30% of one month's rent
                    </div>
                  </label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormDescription>
              Total fee: {fees[managementType].toLocaleString()} FCFA
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}