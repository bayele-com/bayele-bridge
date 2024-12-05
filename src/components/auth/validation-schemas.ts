import * as z from "zod";

export const signUpSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  userType: z.enum(["user", "business", "affiliate"]),
  whatsappNumber: z
    .string()
    .regex(/^\+237[0-9]{9}$/, "Please enter a valid Cameroonian phone number (+237XXXXXXXXX)")
    .optional(),
});