import { z } from "zod"

export const checkoutSchema = z.object({
  customerName: z
    .string()
    .min(2, { message: "Please enter your name" })
    .max(100),
  phoneNumber: z
    .string()
    .min(10, { message: "Please enter a valid phone number" })
    .max(15),
  area: z.string().min(2, { message: "Please enter your area" }),
  address: z.string().min(5, { message: "Please enter your address" }),
  directions: z.string().optional(),
  notes: z.string().optional(),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>
