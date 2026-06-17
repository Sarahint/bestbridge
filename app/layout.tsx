import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import { JsonLd } from "@/components/seo/json-ld";
import {
  organizationSchema,
  localBusinessSchema,
} from "@/lib/seo/schemas";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://www.bestbridge.cloud";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BestBridge Consultancy — Thailand Visas, HR & Legal Services",
    template: "%s | BestBridge Consultancy",
  },
  description:
    "Need a visa or work permit in Thailand? BestBridge Consultancy provides fast, reliable solutions. Expert HR & legal support for businesses and individuals in Bangkok and across Thailand.",
  keywords: [
    "Thailand visa",
    "Thailand work permit",
    "BOI work permit",
    "Bangkok HR consultancy",
    "Thailand legal services",
    "expat visa Thailand",
    "Non-B visa",
    "90-day report",
    "Thailand immigration consultant",
  ],
  applicationName: "BestBridge Consultancy",
  authors: [{ name: "BestBridge Consultancy" }],
  creator: "BestBridge Consultancy",
  publisher: "BestBridge Consultancy",
  category: "Business Services",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "BestBridge Consultancy",
    title: "BestBridge Consultancy — Thailand Visas, HR & Legal Services",
    description:
      "Fast, reliable HR, Visa & Legal consulting for businesses and individuals in Thailand. BOI experts. English & Thai service.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BestBridge Consultancy — Thailand Visas, HR & Legal Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BestBridge Consultancy — Thailand Visas, HR & Legal Services",
    description:
      "Fast, reliable HR, Visa & Legal consulting for businesses and individuals in Thailand.",
    images: ["/og-image.png"],
  },
  verification: {
    // TODO: replace with real Google Search Console verification token once obtained
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      {process.env.NEXT_PUBLIC_GTM_ID && (
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
      )}
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
        >
          Skip to main content
        </a>
        {children}
        <JsonLd id="org-schema" data={organizationSchema} />
        <JsonLd id="localbiz-schema" data={localBusinessSchema} />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
