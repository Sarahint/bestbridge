import type { Metadata } from "next";
import { PageHead } from "@/components/landing/page-head";
import { AboutMission } from "@/components/landing/about-mission";
import { WhyUs } from "@/components/landing/why-us";
import { AboutTeam } from "@/components/landing/about-team";
import { AboutValuesBand } from "@/components/landing/about-values-band";
import { FaqSection } from "@/components/landing/faq-section";
import { CtaBand } from "@/components/landing/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import {
  aboutPageSchema,
  buildBreadcrumb,
  buildFaqPage,
} from "@/lib/seo/schemas";
import { landingContent } from "@/lib/landing-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "A next-generation consulting team delivering HR, visa and legal expertise to modern businesses in Thailand. Meet the BestBridge team in Bangkok.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: "/about",
    siteName: "BestBridge Consultancy",
    title: "About BestBridge Consultancy — Our Team & Mission",
    description:
      "A next-generation consulting team delivering HR, visa and legal expertise to modern businesses in Thailand.",
  },
  twitter: {
    card: "summary_large_image",
    title: "About BestBridge Consultancy",
    description:
      "Meet the team behind BestBridge. HR, immigration and legal expertise in Bangkok.",
  },
};

const { aboutPage } = landingContent;

const breadcrumb = buildBreadcrumb([
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
]);

export default function AboutPage() {
  return (
    <>
      <JsonLd id="about-page-schema" data={aboutPageSchema} />
      <JsonLd id="about-breadcrumb" data={breadcrumb} />
      <JsonLd
        id="about-faq-schema"
        data={buildFaqPage(aboutPage.faqs)}
      />
      <PageHead content={aboutPage.pageHead} />
      <AboutMission content={aboutPage.mission} />
      <WhyUs content={aboutPage.whyUs} soft />
      <AboutTeam content={aboutPage.team} />
      <AboutValuesBand content={aboutPage.valuesBand} />
      <FaqSection content={aboutPage.faqs} heading="Frequently asked questions" />
      <CtaBand content={aboutPage.ctaBand} />
    </>
  );
}
