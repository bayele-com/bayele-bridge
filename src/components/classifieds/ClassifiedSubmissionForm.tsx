import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { FormValues, formSchema } from "./form/types";
import { BasicInfoFields } from "./form/BasicInfoFields";
import { CategoryLocationFields } from "./form/CategoryLocationFields";
import { PriceField } from "./form/PriceField";
import { ContactFields } from "./form/ContactFields";
import { ImageUploadField } from "./form/ImageUploadField";

interface ClassifiedSubmissionFormProps {
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
}

export function ClassifiedSubmissionForm({ onSubmit, isSubmitting }: ClassifiedSubmissionFormProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      location: "",
      price: "",
      phone: "",
      whatsapp: "",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      const imageUrls: string[] = [];
      
      if (values.images?.length > 0) {
        for (const file of values.images) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const filePath = `${fileName}`;
          
          const { error: uploadError, data } = await supabase.storage
            .from('classified-images')
            .upload(filePath, file);
            
          if (uploadError) throw uploadError;
          
          const { data: { publicUrl } } = supabase.storage
            .from('classified-images')
            .getPublicUrl(filePath);
            
          imageUrls.push(publicUrl);
        }
      }
      
      const { error } = await supabase
        .from('classified_ads')
        .insert({
          title: values.title,
          description: values.description,
          category: values.category,
          location: values.location,
          price: values.price ? parseFloat(values.price) : null,
          image_urls: imageUrls,
          contact_info: {
            phone: values.phone,
            whatsapp: values.whatsapp || values.phone,
          },
          ad_type: 'classified',
          status: 'pending',
        });

      if (error) throw error;
      
      await onSubmit();
    } catch (error) {
      console.error('Error submitting classified:', error);
      throw error;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <BasicInfoFields form={form} />
        <CategoryLocationFields form={form} />
        <PriceField form={form} />
        <ContactFields form={form} />
        <ImageUploadField form={form} uploadProgress={uploadProgress} />
        
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Ad"}
        </Button>
      </form>
    </Form>
  );
}