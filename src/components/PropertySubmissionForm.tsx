import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const MAX_FILE_SIZE = 512000; // 500KB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const propertyFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  title: z.string().min(10, "Title must be at least 10 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  propertyType: z.string(),
  city: z.enum(["Yaounde", "Douala"]),
  neighborhoodId: z.string(),
  price: z.number().min(10000, "Price must be at least 10,000 FCFA"),
  bedrooms: z.number().min(0),
  bathrooms: z.number().min(0),
  features: z.array(z.string()),
  managementType: z.enum(["self", "bayele"]),
  phone: z.string().regex(/^\+237[0-9]{9}$/, "Invalid phone number format"),
  whatsapp: z.string().regex(/^\+237[0-9]{9}$/, "Invalid WhatsApp number format"),
  images: z
    .array(z.instanceof(File))
    .min(1, "At least one image is required")
    .max(7, "Maximum 7 images allowed")
    .refine(
      (files) => files.every((file) => file.size <= MAX_FILE_SIZE),
      "Each image must be less than 500KB"
    )
    .refine(
      (files) => files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "Only .jpg, .jpeg, .png and .webp formats are supported"
    ),
});

type PropertyFormValues = z.infer<typeof propertyFormSchema>;

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

  const managementType = form.watch("managementType");
  const basePrice = form.watch("price") || 0;

  const fees = {
    self: 3500,
    bayele: 2500 + (basePrice * 0.3),
  };

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Personal Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Property Details */}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="propertyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
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
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monthly Rent (FCFA)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="10000"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Management Options */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Management Options</h2>
          
          <FormField
            control={form.control}
            name="managementType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How would you like to manage your property?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-2 border rounded-lg p-4">
                      <RadioGroupItem value="self" id="self" />
                      <label htmlFor="self" className="flex-1">
                        <div className="font-medium">Self Manage</div>
                        <div className="text-sm text-muted-foreground">
                          3,500 FCFA monthly fee
                        </div>
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg p-4">
                      <RadioGroupItem value="bayele" id="bayele" />
                      <label htmlFor="bayele" className="flex-1">
                        <div className="font-medium">Bayele Manages</div>
                        <div className="text-sm text-muted-foreground">
                          2,500 FCFA monthly + 30% of one month's rent
                        </div>
                      </label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormDescription>
                  Total fee: {fees[managementType].toLocaleString()} FCFA
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Contact Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="+237600000000" />
                  </FormControl>
                  <FormDescription>
                    Format: +237XXXXXXXXX
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="whatsapp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp Number</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="+237600000000" />
                  </FormControl>
                  <FormDescription>
                    Format: +237XXXXXXXXX
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Image Upload */}
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

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Property"}
        </Button>
      </form>
    </Form>
  );
}