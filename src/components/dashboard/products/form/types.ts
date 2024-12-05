import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  price: z.string().min(1, "Price is required"),
  commission_rate: z.string().min(1, "Commission rate is required"),
  category: z.string().min(1, "Category is required"),
});

export type ProductFormValues = z.infer<typeof productSchema>;