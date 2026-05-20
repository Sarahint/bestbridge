import type { Metadata } from "next";
import { PageHead } from "@/components/landing/page-head";
import { ServicesDetail } from "@/components/landing/services-detail";
import { CtaBand } from "@/components/landing/cta-band";
import { landingContent } from "@/lib/landing-content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Visa & work permits (BOI and non-BOI), HR services and legal consulting for businesses and individuals in Thailand.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services | BestBridge Consultancy",
    description:
      "Visa & work permits, HR services and legal consulting for businesses and individuals in Thailand.",
    url: "/services",
  },
  twitter: { card: "summary_large_image" },
};

const { servicesPage } = landingContent;

export default function ServicesPage() {
  return (
    <>
      <PageHead content={servicesPage.pageHead} />
      <ServicesDetail blocks={servicesPage.blocks} />
      <CtaBand content={servicesPage.ctaBand} />
    </>
  );
}
