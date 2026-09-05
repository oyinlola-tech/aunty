import { z } from "zod";

export const checkoutSchema = z.object({
  customerName: z
    .string()
    .min(2, "Please enter your full name."),
  phoneNumber: z
    .string()
    .min(10, "Please enter a valid phone number.")
    .max(15, "Please enter a valid phone number."),
  area: z
    .string()
    .min(2, "Please enter your delivery area."),
  address: z
    .string()
    .min(5, "Please enter your full delivery address."),
  directions: z.string().optional(),
  notes: z.string().optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
