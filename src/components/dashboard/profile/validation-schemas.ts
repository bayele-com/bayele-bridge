import { z } from "zod";

const phoneRegex = /^\+237[0-9]{9}$/;

// Base schema for common fields
export const baseProfileSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  whatsapp_number: z.string()
    .regex(phoneRegex, "Please enter a valid Cameroonian phone number")
    .nullable()
    .optional(),
});

// Business profile schema
export const businessProfileSchema = baseProfileSchema.extend({
  business_name: z.string().min(2, "Business name must be at least 2 characters"),
  business_address: z.string().min(5, "Address must be at least 5 characters"),
});

// Affiliate profile schema
export const affiliateProfileSchema = baseProfileSchema.extend({
  payment_details: z.object({
    momo_number: z.string().regex(phoneRegex, "Invalid MTN MoMo number"),
    om_number: z.string().regex(phoneRegex, "Invalid Orange Money number").optional(),
  }).nullable().optional(),
});