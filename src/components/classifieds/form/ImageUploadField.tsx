import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./types";

interface ImageUploadFieldProps {
  form: UseFormReturn<FormValues>;
  uploadProgress: number;
}

export function ImageUploadField({ form, uploadProgress }: ImageUploadFieldProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="images"
        render={({ field: { onChange } }) => (
          <FormItem>
            <FormLabel>Images (Optional)</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  onChange(files);
                }}
              />
            </FormControl>
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