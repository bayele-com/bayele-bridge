import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { PropertyFormValues } from "./types";

interface ImageUploadFieldsProps {
  form: UseFormReturn<PropertyFormValues>;
  uploadProgress: number;
  ACCEPTED_IMAGE_TYPES: string[];
}

export function ImageUploadFields({ form, uploadProgress, ACCEPTED_IMAGE_TYPES }: ImageUploadFieldsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Property Images</h2>
      
      <FormField
        control={form.control}
        name="images"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Upload Images</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept={ACCEPTED_IMAGE_TYPES.join(",")}
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  field.onChange(files);
                }}
              />
            </FormControl>
            <FormDescription>
              Upload up to 7 images (max 500KB each)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {uploadProgress > 0 && (
        <div className="w-full bg-secondary rounded-full h-2.5">
          <div
            className="bg-primary h-2.5 rounded-full transition-all"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}
    </div>
  );
}