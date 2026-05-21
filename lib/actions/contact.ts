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

  if (honeypot) {
    return { success: true };
  }

  // Fail loudly + visibly in Railway logs if config is missing.
  if (!process.env.RESEND_API_KEY) {
    console.error(
      "[contact] RESEND_API_KEY is not set. Add it in Railway → Variables."
    );
    return {
      success: false,
      error:
        "Form is misconfigured (missing API key). Please email info@bestbridge.cloud directly.",
    };
  }

  const fromAddress =
    process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  const toAddress =
    process.env.RESEND_TO_EMAIL ?? "info@bestbridge.cloud";

  try {
    const { data: sent, error } = await resend.emails.send({
      from: fromAddress,
      to: toAddress,
      replyTo: email,
      subject: `New inquiry: ${service} — ${fullName}`,
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

    if (error) {
      // Resend returns { name, message, statusCode } on failure.
      console.error(
        "[contact] Resend rejected the send:",
        JSON.stringify({ from: fromAddress, to: toAddress, error }, null, 2)
      );
      return {
        success: false,
        error:
          "Failed to send. Please email us directly at info@bestbridge.cloud.",
      };
    }

    console.log("[contact] Sent OK:", sent?.id);
    return { success: true };
  } catch (err) {
    console.error("[contact] Unexpected error sending email:", err);
    return {
      success: false,
      error:
        "Failed to send. Please email us directly at info@bestbridge.cloud.",
    };
  }
}
