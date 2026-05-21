import type { Metadata } from "next";
import { PageHead } from "@/components/landing/page-head";
import { ContactSection } from "@/components/landing/contact-section";
import { JsonLd } from "@/components/seo/json-ld";
import { contactPageSchema, buildBreadcrumb } from "@/lib/seo/schemas";
import { landingContent } from "@/lib/landing-content";

export const metadata: Metadata = {
  title: "Contact & Booking",
  description:
    "Get in touch with BestBridge Consultancy in Bangkok. Email info@bestbridge.cloud, call +66 86 115 6922, or book a free consultation via our contact form.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: "/contact",
    siteName: "BestBridge Consultancy",
    title: "Contact BestBridge Consultancy — Bangkok",
    description:
      "Email, phone, or book a free consultation. We respond in 1 business day.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact BestBridge Consultancy",
    description: "Book a free consultation. Bangkok-based. English & Thai.",
  },
};

const { contactPage } = landingContent;

const breadcrumb = buildBreadcrumb([
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
]);

export default function ContactPage() {
  return (
    <>
      <JsonLd id="contact-page-schema" data={contactPageSchema} />
      <JsonLd id="contact-breadcrumb" data={breadcrumb} />
      <PageHead content={contactPage.pageHead} />
      <ContactSection content={contactPage} />
    </>
  );
}
