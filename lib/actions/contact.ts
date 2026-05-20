"use server";

import { bookingSchema } from "@/lib/schemas/booking";

export type ContactActionResult =
  | { success: true }
  | { success: false; error: string };

export async function submitBooking(
  data: unknown
): Promise<ContactActionResult> {
  const parsed = bookingSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Please check your inputs and try again." };
  }

  if (parsed.data.honeypot) {
    return { success: true };
  }

  return { success: true };
}
