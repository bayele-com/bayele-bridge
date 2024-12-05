import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  category: z.string().min(1, "Please select a category"),
  location: z.string().min(1, "Please select a location"),
  price: z.string().optional(),
  phone: z.string().min(9, "Please enter a valid phone number"),
  whatsapp: z.string().optional(),
  images: z.any().optional(),
});

export type FormValues = z.infer<typeof formSchema>;