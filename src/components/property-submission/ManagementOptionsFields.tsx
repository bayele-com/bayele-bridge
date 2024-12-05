import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { PropertyFormValues } from "./types";

interface ManagementOptionsFieldsProps {
  form: UseFormReturn<PropertyFormValues>;
}

export function ManagementOptionsFields({ form }: ManagementOptionsFieldsProps) {
  const managementType = form.watch("managementType");
  const propertyType = form.watch("propertyType");
  const basePrice = form.watch("price") || 0;

  const getFees = () => {
    if (managementType === 'self') {
      return 4500; // Fixed fee for self-management
    } else {
      // 15% fee only applies to furnished apartments
      return propertyType === 'furnished-apartment' ? basePrice * 0.15 : 0;
    }
  };

  const fees = getFees();

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
                      4,500 FCFA monthly fee
                    </div>
                  </label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-4">
                  <RadioGroupItem value="bayele" id="bayele" />
                  <label htmlFor="bayele" className="flex-1">
                    <div className="font-medium">Bayele Manages</div>
                    <div className="text-sm text-muted-foreground">
                      {propertyType === 'furnished-apartment' 
                        ? "15% fee for every paid booking" 
                        : "No additional fee"}
                    </div>
                  </label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormDescription>
              {managementType === "self" ? (
                <>Fixed fee: {fees.toLocaleString()} FCFA per month</>
              ) : (
                propertyType === 'furnished-apartment' ? (
                  <>Fee per booking: {fees.toLocaleString()} FCFA ({(15).toLocaleString()}% of rent)</>
                ) : (
                  <>No additional fee</>
                )
              )}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}