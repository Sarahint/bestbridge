import type { Metadata } from "next";
import { Hero } from "@/components/landing/hero";
import { IntroSection } from "@/components/landing/intro-section";
import { ServicesOverview } from "@/components/landing/services-overview";
import { WhyUs } from "@/components/landing/why-us";
import { AboutSplit } from "@/components/landing/about-split";
import { CtaBand } from "@/components/landing/cta-band";
import { landingContent } from "@/lib/landing-content";

export const metadata: Metadata = {
  title: "BestBridge Consultancy — Thailand Visas, HR & Legal Services",
  description:
    "Need a visa or work permit in Thailand? BestBridge Consultancy provides fast, reliable solutions. Expert HR & legal support for businesses and individuals.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "BestBridge Consultancy — Thailand Visas, HR & Legal Services",
    description:
      "Affordable, reliable HR, Visa & Legal consulting for modern businesses in Thailand.",
    url: "/",
    siteName: "BestBridge Consultancy",
    // TODO: replace with real OG image (1200×630)
    images: [{ url: "/assets/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BestBridge Consultancy — Thailand Visas, HR & Legal Services",
    description:
      "Affordable, reliable HR, Visa & Legal consulting for modern businesses in Thailand.",
    // TODO: replace with real Twitter card image
    images: ["/assets/og-image.jpg"],
  },
};

const { home } = landingContent;

export default function HomePage() {
  return (
    <>
      <Hero content={home.hero} />
      <IntroSection content={home.intro} />
      <ServicesOverview content={home.servicesOverview} />
      <WhyUs content={home.whyUs} />
      <AboutSplit content={home.aboutSplit} />
      <CtaBand content={home.ctaBand} />
    </>
  );
}
