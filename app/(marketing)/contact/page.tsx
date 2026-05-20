import type { Metadata } from "next";
import { PageHead } from "@/components/landing/page-head";
import { ContactSection } from "@/components/landing/contact-section";
import { landingContent } from "@/lib/landing-content";

export const metadata: Metadata = {
  title: "Contact & Booking",
  description:
    "Get in touch with BestBridge Consultancy. Email, phone, or book a consultation via our contact form.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact & Booking | BestBridge Consultancy",
    description:
      "Get in touch with BestBridge Consultancy. Email, phone, or book a consultation via our contact form.",
    url: "/contact",
  },
  twitter: { card: "summary_large_image" },
};

const { contactPage } = landingContent;

export default function ContactPage() {
  return (
    <>
      <PageHead content={contactPage.pageHead} />
      <ContactSection content={contactPage} />
    </>
  );
}
