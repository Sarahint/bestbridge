import { z } from "zod";

export const bookingSchema = z.object({
  fullName: z.string().min(1, "Please enter your full name."),
  phone: z
    .string()
    .min(1, "Please enter a valid phone number.")
    .regex(/^[+\d][\d\s\-()\d]{5,}$/, "Please enter a valid phone number."),
  position: z.string().optional(),
  company: z.string().optional(),
  location: z.string().optional(),
  email: z.string().email("Please enter a valid email address."),
  service: z.string().min(1, "Please select a service."),
  message: z.string().min(1, "Please include a short message."),
  honeypot: z.string().max(0, "").optional(),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
