"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bookingSchema, type BookingFormValues } from "@/lib/schemas/booking";
import { submitBooking } from "@/lib/actions/contact";
import type { landingContent } from "@/lib/landing-content";

type FormContent = typeof landingContent.contactPage.form;

export function BookingForm({ content }: { content: FormContent }) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { honeypot: "" },
  });

  const onSubmit = (data: BookingFormValues) => {
    startTransition(async () => {
      const result = await submitBooking(data);
      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(result.error);
      }
    });
  };

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="bg-[#e8f5ec] border border-[#b8dfc4] rounded-[12px] p-6 text-center text-[#1e6e3a]"
      >
        <h3 className="text-[#1e6e3a] mb-1">
          Thank you — we&apos;ve received your inquiry.
        </h3>
        <p className="mb-0">
          One of our consultants will be in touch within one business day at the
          email you provided.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-line rounded-[16px] p-9 shadow-brand-md">
      <h2 className="mt-0 mb-1">{content.heading}</h2>
      <p className="text-muted mb-6 text-[0.95rem]">
        All fields marked <span className="text-red-600">*</span> are required.{" "}
        {content.subtext}
      </p>

      {status === "error" && (
        <div
          role="alert"
          className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm"
        >
          {errorMessage}
        </div>
      )}

      {/* Honeypot — hidden from users, caught server-side if filled */}
      <input
        type="text"
        tabIndex={-1}
        aria-hidden="true"
        className="absolute opacity-0 w-0 h-0 pointer-events-none"
        {...register("honeypot")}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4"
      >
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="fullName">
            Full Name <span className="text-red-600">*</span>
          </Label>
          <Input
            id="fullName"
            autoComplete="name"
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            {...register("fullName")}
          />
          {errors.fullName && (
            <p id="fullName-error" className="text-[0.82rem] text-red-600">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="phone">
            Phone Number <span className="text-red-600">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            {...register("phone")}
          />
          {errors.phone && (
            <p id="phone-error" className="text-[0.82rem] text-red-600">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="position">Position</Label>
          <Input
            id="position"
            autoComplete="organization-title"
            {...register("position")}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="company">Company Name</Label>
          <Input
            id="company"
            autoComplete="organization"
            {...register("company")}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="location">Company Location</Label>
          <Input
            id="location"
            placeholder="e.g. Bangkok, Thailand"
            {...register("location")}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">
            Email Address <span className="text-red-600">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" className="text-[0.82rem] text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2 flex flex-col gap-1.5">
          <Label htmlFor="service">
            Service of Interest <span className="text-red-600">*</span>
          </Label>
          <Select
            onValueChange={(val) =>
              setValue("service", val, { shouldValidate: true })
            }
          >
            <SelectTrigger
              id="service"
              aria-invalid={!!errors.service}
              aria-describedby={errors.service ? "service-error" : undefined}
            >
              <SelectValue placeholder="Select a service…" />
            </SelectTrigger>
            <SelectContent>
              {content.serviceOptions.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.service && (
            <p id="service-error" className="text-[0.82rem] text-red-600">
              {errors.service.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2 flex flex-col gap-1.5">
          <Label htmlFor="message">
            Message <span className="text-red-600">*</span>
          </Label>
          <Textarea
            id="message"
            rows={5}
            placeholder="Tell us a little about your situation, timeline and any specific questions you have."
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            {...register("message")}
          />
          {errors.message && (
            <p id="message-error" className="text-[0.82rem] text-red-600">
              {errors.message.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2 flex gap-3 flex-wrap items-center">
          <Button
            type="submit"
            disabled={isPending}
            size="lg"
          >
            {isPending ? "Sending…" : "Submit Inquiry"}
          </Button>
          <Button asChild variant="outline">
            <a href="mailto:info@bestbridge.cloud">Email us directly</a>
          </Button>
        </div>
      </form>
    </div>
  );
}
