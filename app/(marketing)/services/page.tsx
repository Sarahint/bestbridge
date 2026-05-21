import type { Metadata } from "next";
import { PageHead } from "@/components/landing/page-head";
import { ServicesDetail } from "@/components/landing/services-detail";
import { ProcessSteps } from "@/components/landing/process-steps";
import { FaqSection } from "@/components/landing/faq-section";
import { CtaBand } from "@/components/landing/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import {
  visaServiceSchema,
  hrServiceSchema,
  legalServiceSchema,
  buildBreadcrumb,
  buildFaqPage,
} from "@/lib/seo/schemas";
import { landingContent } from "@/lib/landing-content";

export const metadata: Metadata = {
  title: "Services — Visa, Work Permit, HR & Legal in Thailand",
  description:
    "BestBridge offers visa & work permits (BOI and non-BOI), 90-day reports, HR outsourcing, payroll, and corporate legal services for businesses and individuals in Thailand.",
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    url: "/services",
    siteName: "BestBridge Consultancy",
    title: "Services — Visa, Work Permit, HR & Legal in Thailand",
    description:
      "Visa & work permits (BOI and non-BOI), HR services and legal consulting for businesses and individuals in Thailand.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services — BestBridge Consultancy",
    description:
      "Visa, work permits, HR and legal services. BOI specialists. Bangkok-based.",
  },
};

const { servicesPage } = landingContent;

const breadcrumb = buildBreadcrumb([
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
]);

export default function ServicesPage() {
  return (
    <>
      <JsonLd id="service-visa-schema" data={visaServiceSchema} />
      <JsonLd id="service-hr-schema" data={hrServiceSchema} />
      <JsonLd id="service-legal-schema" data={legalServiceSchema} />
      <JsonLd id="services-breadcrumb" data={breadcrumb} />
      <JsonLd
        id="services-faq-schema"
        data={buildFaqPage(servicesPage.faqs)}
      />
      <PageHead content={servicesPage.pageHead} />
      <ServicesDetail blocks={servicesPage.blocks} />
      <ProcessSteps content={servicesPage.processSteps} />
      <FaqSection
        content={servicesPage.faqs}
        heading="Visa, work permit & HR — your questions answered"
        eyebrow="FAQ"
      />
      <CtaBand content={servicesPage.ctaBand} />
    </>
  );
}
