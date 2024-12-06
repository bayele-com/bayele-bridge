import { z } from "zod";

export const MAX_FILE_SIZE = 512000; // 500KB
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const propertyFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  title: z.string().min(10, "Title must be at least 10 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  propertyType: z.string(),
  city: z.enum(["Yaounde", "Douala"]),
  neighborhoodId: z.string().min(1, "Please select a neighborhood"),
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

export type PropertyFormValues = z.infer<typeof propertyFormSchema>;