import { UseFormReturn } from "react-hook-form";
import { PropertyFormValues } from "./types";
import { PersonalInfoFields } from "./PersonalInfoFields";
import { PropertyDetailsFields } from "./PropertyDetailsFields";
import { ManagementOptionsFields } from "./ManagementOptionsFields";
import { ContactInfoFields } from "./ContactInfoFields";
import { ImageUploadFields } from "./ImageUploadFields";
import { ACCEPTED_IMAGE_TYPES } from "./types";

interface FormContainerProps {
  form: UseFormReturn<PropertyFormValues>;
  isSubmitting: boolean;
  uploadProgress: number;
  onSubmit: (data: PropertyFormValues) => Promise<void>;
}

export function FormContainer({ 
  form, 
  isSubmitting, 
  uploadProgress, 
  onSubmit 
}: FormContainerProps) {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <PersonalInfoFields form={form} />
      <PropertyDetailsFields form={form} />
      <ManagementOptionsFields form={form} />
      <ContactInfoFields form={form} />
      <ImageUploadFields 
        form={form} 
        uploadProgress={uploadProgress}
        ACCEPTED_IMAGE_TYPES={ACCEPTED_IMAGE_TYPES}
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Property"}
      </Button>
    </form>
  );
}