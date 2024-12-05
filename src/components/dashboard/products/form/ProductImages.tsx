import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "./types";

interface ProductImagesProps {
  form: UseFormReturn<ProductFormValues>;
  isUploading: boolean;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ProductImages({ form, isUploading, handleImageChange }: ProductImagesProps) {
  return (
    <div>
      <FormLabel>Product Images</FormLabel>
      <div className="mt-2">
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="cursor-pointer"
          disabled={isUploading}
        />
      </div>
      <p className="text-sm text-muted-foreground mt-1">
        Upload up to 7 images (PNG, JPG)
      </p>
    </div>
  );
}