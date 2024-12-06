import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn, useWatch } from "react-hook-form";
import { PropertyFormValues } from "./types";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface PropertyDetailsFieldsProps {
  form: UseFormReturn<PropertyFormValues>;
}

export function PropertyDetailsFields({ form }: PropertyDetailsFieldsProps) {
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

  const propertyType = form.watch("propertyType");
  const managementType = form.watch("managementType");

  const getFees = () => {
    if (managementType === 'self') {
      return '4,500 FCFA monthly fee';
    } else {
      if (propertyType === 'furnished-apartment') {
        return 'Daily rate calculation';
      } else {
        return '2,500 FCFA monthly listing fee + 30% of one month rent (paid by tenant)';
      }
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Property Details</h2>
      
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormDescription>
              A clear, attractive title for your property
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormDescription>
              Detailed description of your property
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

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

        <FormField
          control={form.control}
          name="propertyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="furnished-apartment">Furnished apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="studio">Studio</SelectItem>
                  <SelectItem value="room">Room</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {propertyType === 'furnished-apartment' ? 'Daily Rate (FCFA)' : 'Monthly Rent (FCFA)'}
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="10000"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                {propertyType === 'furnished-apartment' 
                  ? 'Enter the daily rate for the furnished apartment'
                  : 'Enter the monthly rent amount'}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="bedrooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bedrooms</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bathrooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bathrooms</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="managementType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Management Options</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select management option" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="self">Self Manage</SelectItem>
                <SelectItem value="bayele">Bayele Manages</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              {getFees()}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}