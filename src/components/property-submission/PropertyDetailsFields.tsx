import { UseFormReturn } from "react-hook-form";
import { PropertyFormValues } from "./types";
import { BasicDetails } from "./property-details/BasicDetails";
import { LocationDetails } from "./property-details/LocationDetails";
import { PropertySpecs } from "./property-details/PropertySpecs";

interface PropertyDetailsFieldsProps {
  form: UseFormReturn<PropertyFormValues>;
}

export function PropertyDetailsFields({ form }: PropertyDetailsFieldsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Property Details</h2>
      
      <BasicDetails form={form} />
      <LocationDetails form={form} />
      <PropertySpecs form={form} />
    </div>
  );
}