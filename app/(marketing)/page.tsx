import type { Metadata } from "next";
import { Hero } from "@/components/landing/hero";
import { IntroSection } from "@/components/landing/intro-section";
import { ServicesOverview } from "@/components/landing/services-overview";
import { WhyUs } from "@/components/landing/why-us";
import { AboutSplit } from "@/components/landing/about-split";
import { CtaBand } from "@/components/landing/cta-band";
import { Testimonials } from "@/components/landing/testimonials";
import { JsonLd } from "@/components/seo/json-ld";
import { websiteSchema } from "@/lib/seo/schemas";
import { landingContent } from "@/lib/landing-content";

export const metadata: Metadata = {
  title: "BestBridge Consultancy — Thailand Visas, HR & Legal Services",
  description:
    "Need a visa or work permit in Thailand? BestBridge Consultancy provides fast, reliable solutions. Expert HR & legal support for businesses and individuals in Bangkok and across Thailand.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "BestBridge Consultancy",
    title: "BestBridge Consultancy — Thailand Visas, HR & Legal Services",
    description:
      "Affordable, reliable HR, Visa & Legal consulting for modern businesses and individuals in Thailand. BOI expertise. English & Thai service.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "BestBridge Consultancy — Thailand Visas, HR & Legal Services",
    description:
      "Affordable, reliable HR, Visa & Legal consulting for modern businesses in Thailand.",
  },
};

const { home } = landingContent;

export default function HomePage() {
  return (
    <>
      <JsonLd id="website-schema" data={websiteSchema} />
      <Hero content={home.hero} />
      <IntroSection content={home.intro} />
      <ServicesOverview content={home.servicesOverview} />
      <WhyUs content={home.whyUs} />
      <Testimonials content={home.testimonials} />
      <AboutSplit content={home.aboutSplit} />
      <CtaBand content={home.ctaBand} />
    </>
  );
}
