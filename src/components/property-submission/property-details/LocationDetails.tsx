import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn, useWatch } from "react-hook-form";
import { PropertyFormValues } from "../types";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface LocationDetailsProps {
  form: UseFormReturn<PropertyFormValues>;
}

export function LocationDetails({ form }: LocationDetailsProps) {
  const city = useWatch({
    control: form.control,
    name: "city",
  });

  const { data: neighborhoods = [] } = useQuery({
    queryKey: ["neighborhoods", city],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("neighborhoods")
        .select("*, districts(name)")
        .eq("city", city)
        .order('name');
      
      if (error) throw error;
      return data;
    },
    enabled: !!city,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="city"
        render={({ field }) => (
          <FormItem>
            <FormLabel>City</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Yaounde">Yaoundé</SelectItem>
                <SelectItem value="Douala">Douala</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="neighborhoodId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Neighborhood</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select neighborhood" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {neighborhoods.map((neighborhood) => (
                  <SelectItem key={neighborhood.id} value={neighborhood.id}>
                    {neighborhood.name}
                    {neighborhood.districts?.name && ` (${neighborhood.districts.name})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}