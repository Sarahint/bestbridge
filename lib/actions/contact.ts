"use server";

import { Resend } from "resend";
import { bookingSchema } from "@/lib/schemas/booking";

const resend = new Resend(process.env.RESEND_API_KEY);

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

  const {
    fullName,
    phone,
    position,
    company,
    location,
    email,
    service,
    message,
    honeypot,
  } = parsed.data;

  // Honeypot — bots fill hidden fields, real users don't
  if (honeypot) {
    return { success: true };
  }

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.RESEND_TO_EMAIL!,
      replyTo: email,
      subject: `New inquiry: ${service}`,
      text: [
        "New consultation inquiry from BestBridge website.",
        "",
        `Name:     ${fullName}`,
        `Email:    ${email}`,
        `Phone:    ${phone}`,
        `Position: ${position ?? "—"}`,
        `Company:  ${company ?? "—"}`,
        `Location: ${location ?? "—"}`,
        `Service:  ${service}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    return { success: true };
  } catch {
    return {
      success: false,
      error:
        "Failed to send. Please email us directly at info@bestbridge.cloud.",
    };
  }
}
