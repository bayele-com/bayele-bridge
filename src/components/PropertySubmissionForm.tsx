import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PropertyFormValues, propertyFormSchema } from "./property-submission/types";
import { FormContainer } from "./property-submission/FormContainer";

export function PropertySubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      title: "",
      description: "",
      propertyType: "apartment",
      city: "Yaounde",
      neighborhoodId: "",
      price: 0,
      bedrooms: 0,
      bathrooms: 0,
      features: [],
      managementType: "self",
      phone: "",
      whatsapp: "",
      images: [],
    },
  });

  async function onSubmit(data: PropertyFormValues) {
    try {
      setIsSubmitting(true);
      setUploadProgress(0);

      // Upload images to Supabase Storage
      const imageUrls = [];
      for (const file of data.images) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from("property-images")
          .upload(fileName, file);

        if (uploadError) throw uploadError;
        if (uploadData) {
          const { data: { publicUrl } } = supabase.storage
            .from("property-images")
            .getPublicUrl(uploadData.path);
          imageUrls.push(publicUrl);
        }
        
        // Update progress
        setUploadProgress((prev) => prev + (100 / data.images.length));
      }

      // Create property listing
      const { error: insertError } = await supabase
        .from("rental_properties")
        .insert({
          title: data.title,
          description: data.description,
          property_type: data.propertyType,
          price: data.price,
          city: data.city,
          neighborhood_id: data.neighborhoodId,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          features: data.features,
          image_urls: imageUrls,
          contact_info: {
            phone: data.phone,
            whatsapp: data.whatsapp,
          },
          management_type: data.managementType,
        });

      if (insertError) throw insertError;

      toast({
        title: "Success!",
        description: "Your property has been listed successfully.",
      });

      navigate("/find-house");
    } catch (error) {
      console.error("Error submitting property:", error);
      toast({
        title: "Error",
        description: "Failed to submit property. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  }

  return (
    <Form {...form}>
      <FormContainer
        form={form}
        isSubmitting={isSubmitting}
        uploadProgress={uploadProgress}
        onSubmit={onSubmit}
      />
    </Form>
  );
}