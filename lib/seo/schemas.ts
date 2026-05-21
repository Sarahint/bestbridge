/**
 * Centralized schema.org JSON-LD definitions for BestBridge Consultancy.
 *
 * Embedded via <JsonLd /> in `components/seo/json-ld.tsx`.
 * Validated against https://validator.schema.org and Google Rich Results Test.
 */

export const SITE_URL = "https://www.bestbridge.cloud";

const BUSINESS_NAME = "BestBridge Consultancy";
const BUSINESS_EMAIL = "info@bestbridge.cloud";
const BUSINESS_PHONE = "+66861156922";
const BUSINESS_PHONE_DISPLAY = "+66 86 115 6922";
const FOUNDING_DATE = "2024-06";

// Address — Bangkok, Thailand. Street/postal code intentionally generic until
// the user supplies an exact street address (e.g. for Google Business Profile).
const ADDRESS = {
  "@type": "PostalAddress",
  addressLocality: "Bangkok",
  addressRegion: "Bangkok",
  addressCountry: "TH",
} as const;

// ─── Organization ────────────────────────────────────────────────────────────
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}#organization`,
  name: BUSINESS_NAME,
  legalName: BUSINESS_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/assets/logo.jpg`,
  email: BUSINESS_EMAIL,
  telephone: BUSINESS_PHONE,
  foundingDate: FOUNDING_DATE,
  description:
    "Bangkok-based consultancy providing fast, reliable HR, visa, work permit and legal services for businesses and individuals in Thailand.",
  address: ADDRESS,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: BUSINESS_EMAIL,
      telephone: BUSINESS_PHONE,
      areaServed: "TH",
      availableLanguage: ["English", "Thai"],
    },
  ],
  areaServed: { "@type": "Country", name: "Thailand" },
  knowsAbout: [
    "Thailand work permits",
    "BOI work permits",
    "Non-Immigrant B Visa",
    "Thai immigration law",
    "Thai labor law",
    "HR outsourcing in Thailand",
    "Payroll services Thailand",
    "Corporate legal services Thailand",
  ],
};

// ─── LocalBusiness (LegalService is a subtype) ───────────────────────────────
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${SITE_URL}#localbusiness`,
  name: BUSINESS_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  logo: `${SITE_URL}/assets/logo.jpg`,
  email: BUSINESS_EMAIL,
  telephone: BUSINESS_PHONE,
  priceRange: "$$",
  address: ADDRESS,
  areaServed: { "@type": "Country", name: "Thailand" },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  // Phone display kept here for accessibility tools / aria-label scrapers.
  description: `Bangkok consultancy reachable at ${BUSINESS_PHONE_DISPLAY}. Specialists in Thai visas, work permits, HR outsourcing and corporate legal services.`,
};

// ─── WebSite (with SearchAction placeholder) ─────────────────────────────────
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}#website`,
  url: SITE_URL,
  name: BUSINESS_NAME,
  publisher: { "@id": `${SITE_URL}#organization` },
  inLanguage: "en-US",
};

// ─── Service schemas ─────────────────────────────────────────────────────────
function buildService(opts: {
  id: string;
  serviceType: string;
  name: string;
  description: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/services#${opts.id}`,
    name: opts.name,
    serviceType: opts.serviceType,
    category: opts.category,
    description: opts.description,
    provider: { "@id": `${SITE_URL}#organization` },
    areaServed: { "@type": "Country", name: "Thailand" },
    url: `${SITE_URL}/services#${opts.id}`,
    audience: {
      "@type": "Audience",
      audienceType: "Businesses and individuals in Thailand",
    },
  };
}

export const visaServiceSchema = buildService({
  id: "visa-work-permits",
  serviceType: "Visa and Work Permit Services",
  name: "Thailand Visas & Work Permits",
  category: "Immigration Consulting",
  description:
    "End-to-end visa and work permit services for Thailand, including BOI and Non-BOI applications, 90-day reports, re-entry permits, retirement and marriage visas, and dependent visas.",
});

export const hrServiceSchema = buildService({
  id: "hr-services",
  serviceType: "Human Resources Services",
  name: "HR Services for Thailand-based businesses",
  category: "HR Consulting",
  description:
    "Outsourced HR support for companies operating in Thailand: payroll, employment contracts, social security, employee onboarding, policy design, and Thai labor law compliance.",
});

export const legalServiceSchema = buildService({
  id: "legal-services",
  serviceType: "Corporate Legal Services",
  name: "Legal Services in Thailand",
  category: "Legal Consulting",
  description:
    "Corporate legal support including contract drafting and review, notarization and legalization, regulatory compliance, and business formation guidance for foreign-owned and Thai companies.",
});

// ─── Breadcrumbs ─────────────────────────────────────────────────────────────
export function buildBreadcrumb(
  trail: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

// ─── FAQ Page ────────────────────────────────────────────────────────────────
export function buildFaqPage(qas: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qas.map((qa) => ({
      "@type": "Question",
      name: qa.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: qa.answer,
      },
    })),
  };
}

// ─── AboutPage / ContactPage ─────────────────────────────────────────────────
export const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/about`,
  url: `${SITE_URL}/about`,
  name: `About | ${BUSINESS_NAME}`,
  isPartOf: { "@id": `${SITE_URL}#website` },
  about: { "@id": `${SITE_URL}#organization` },
};

export const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE_URL}/contact`,
  url: `${SITE_URL}/contact`,
  name: `Contact | ${BUSINESS_NAME}`,
  isPartOf: { "@id": `${SITE_URL}#website` },
  mainEntity: { "@id": `${SITE_URL}#localbusiness` },
};
