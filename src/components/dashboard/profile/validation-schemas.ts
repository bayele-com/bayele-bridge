import { z } from "zod";

export const baseProfileSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  whatsapp_number: z
    .string()
    .regex(/^\+237[0-9]{9}$/, "Please enter a valid Cameroonian phone number")
    .optional()
    .nullable(),
});

export const businessProfileSchema = baseProfileSchema.extend({
  business_name: z.string().min(2, "Business name must be at least 2 characters"),
  business_address: z.string().min(5, "Address must be at least 5 characters"),
});

export const affiliateProfileSchema = baseProfileSchema.extend({
  payment_details: z.object({
    momo_number: z.string().regex(/^\+237[0-9]{9}$/, "Invalid MTN MoMo number"),
    om_number: z.string().regex(/^\+237[0-9]{9}$/, "Invalid Orange Money number").optional(),
  }).optional(),
});