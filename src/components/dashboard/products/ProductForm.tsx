import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { ProductBasicInfo } from "./form/ProductBasicInfo";
import { ProductPricing } from "./form/ProductPricing";
import { ProductCategory } from "./form/ProductCategory";
import { ProductImages } from "./form/ProductImages";
import { ProductFormValues, productSchema } from "./form/types";

interface ProductFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function ProductForm({ onSuccess, onCancel }: ProductFormProps) {
  const [images, setImages] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      commission_rate: "",
      category: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 7) {
      toast({
        title: "Too many images",
        description: "You can only upload up to 7 images per product",
        variant: "destructive",
      });
      return;
    }
    setImages(files);
  };

  const onSubmit = async (values: ProductFormValues) => {
    try {
      setIsUploading(true);
      const imageUrls: string[] = [];
      
      for (const image of images) {
        const fileExt = image.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError, data } = await supabase.storage
          .from('product-images')
          .upload(filePath, image);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);

        imageUrls.push(publicUrl);
      }

      const { error } = await supabase.from("products").insert({
        name: values.name,
        description: values.description,
        price: parseFloat(values.price),
        commission_rate: parseFloat(values.commission_rate),
        category: values.category,
        image_urls: imageUrls,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product created successfully",
      });
      
      onSuccess();
    } catch (error) {
      console.error("Error creating product:", error);
      toast({
        title: "Error",
        description: "Failed to create product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ProductBasicInfo form={form} />
        <ProductPricing form={form} />
        <ProductCategory form={form} />
        <ProductImages 
          form={form}
          isUploading={isUploading}
          handleImageChange={handleImageChange}
        />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isUploading}>
            {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Product
          </Button>
        </div>
      </form>
    </Form>
  );
}