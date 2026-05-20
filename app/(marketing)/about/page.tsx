import type { Metadata } from "next";
import { PageHead } from "@/components/landing/page-head";
import { AboutMission } from "@/components/landing/about-mission";
import { WhyUs } from "@/components/landing/why-us";
import { AboutTeam } from "@/components/landing/about-team";
import { AboutValuesBand } from "@/components/landing/about-values-band";
import { CtaBand } from "@/components/landing/cta-band";
import { landingContent } from "@/lib/landing-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "A next-generation consulting team delivering HR, visa and legal expertise to modern businesses in Thailand.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | BestBridge Consultancy",
    description:
      "A next-generation consulting team delivering HR, visa and legal expertise to modern businesses in Thailand.",
    url: "/about",
  },
  twitter: { card: "summary_large_image" },
};

const { aboutPage } = landingContent;

export default function AboutPage() {
  return (
    <>
      <PageHead content={aboutPage.pageHead} />
      <AboutMission content={aboutPage.mission} />
      <WhyUs content={aboutPage.whyUs} soft />
      <AboutTeam content={aboutPage.team} />
      <AboutValuesBand content={aboutPage.valuesBand} />
      <CtaBand content={aboutPage.ctaBand} />
    </>
  );
}
