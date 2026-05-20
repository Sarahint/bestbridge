export type NavLink = { href: string; label: string };

export type FeatureItem = {
  icon: "star" | "zap" | "scale" | "check-circle";
  heading: string;
  description: string;
};

export type ServiceCard = {
  icon: "file-check" | "users" | "scale";
  heading: string;
  description: string;
  href: string;
};

export type BulletGroup = {
  heading: string;
  items: string[];
};

export type ServiceBlock = {
  eyebrow: string;
  heading: string;
  description: string;
  groups: BulletGroup[];
  image: { src: string; alt: string };
  id: string;
};

export type TeamCard = {
  role: string;
  heading: string;
  description: string;
  image: { src: string; alt: string };
};

export type ContactItem = {
  icon: "mail" | "phone" | "map-pin" | "clock";
  heading: string;
  value: string;
  href?: string;
};

export type LandingContent = typeof landingContent;

export const landingContent = {
  nav: {
    links: [
      { href: "/", label: "Home" },
      { href: "/services", label: "Services" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ] satisfies NavLink[],
    cta: { label: "Book a Consultation", href: "/contact" },
  },

  footer: {
    brand: {
      description:
        "HR, Visa & Legal services in Thailand. Affordable, reliable, and built for modern business.",
    },
    companyLinks: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/services", label: "Services" },
      { href: "/contact", label: "Contact" },
    ] satisfies NavLink[],
    serviceLinks: [
      { href: "/services#visa", label: "Visa & Work Permits" },
      { href: "/services#hr", label: "HR Services" },
      { href: "/services#legal", label: "Legal Services" },
    ] satisfies NavLink[],
    contact: {
      email: "info@bestbridge.cloud",
      phone: "+66 86 115 6922",
      location: "Bangkok, Thailand",
    },
    tagline: "HR · Visa · Legal · Government Affairs",
  },

  home: {
    hero: {
      eyebrow: "HR · Visa · Legal",
      heading: "Your trusted bridge for HR, Visa & Legal in Thailand",
      lede: "Affordable, reliable consulting designed for modern businesses. We handle the paperwork, the regulations and the legal complexity — so you can focus on growth.",
      primaryCta: { label: "Book a Free Consultation", href: "/contact" },
      secondaryCta: { label: "Explore Services", href: "/services" },
      stats: [
        { value: "2024", label: "Founded in Thailand" },
        { value: "15+ yrs", label: "HR & mobility experience" },
        { value: "BOI", label: "& Non-BOI specialists" },
      ],
      card: {
        heading: "Work Permit Approved",
        description:
          "Smooth, end-to-end visa & work permit processing for your international workforce.",
      },
      image: {
        src: "/assets/photos/hero-business-district.jpg",
        alt: "Modern Bangkok business district skyscrapers at sunrise",
      },
    },

    intro: {
      eyebrow: "Who we are",
      heading: "BestBridge: HR, Visa & Legal — affordable and reliable",
      description:
        "Founded in June 2024, BestBridge Consultancy specializes in comprehensive services that streamline and support business operations: HR services, visa and work permit assistance, government affairs, legal consultation, and startup support.",
    },

    servicesOverview: {
      eyebrow: "What we do",
      heading: "Solutions tailored for businesses & individuals",
      description:
        "From your first work permit to ongoing legal and HR strategy — we cover the full lifecycle.",
      cards: [
        {
          icon: "file-check",
          heading: "Visa & Work Permits",
          description:
            "Efficient, timely support securing visas and work permits for your international workforce, with end-to-end guidance through Thai regulatory and government processes.",
          href: "/services#visa",
        },
        {
          icon: "users",
          heading: "HR Services",
          description:
            "Tailored solutions for recruitment, compensation & benefits, employee outsourcing, HR policy development and startup support.",
          href: "/services#hr",
        },
        {
          icon: "scale",
          heading: "Legal Services",
          description:
            "Expert legal consultation and litigation support — covering contracts, corporate law, labor & employment, IP, and ongoing legal advisory.",
          href: "/services#legal",
        },
      ] satisfies ServiceCard[],
    },

    whyUs: {
      eyebrow: "Why BestBridge",
      heading: "A partnership built on expertise & trust",
      description:
        "We work closely with you to streamline processes, save time, and deliver the expertise you need to succeed.",
      features: [
        {
          icon: "star",
          heading: "Expert knowledge",
          description:
            "A seasoned HR professional with 15+ years of experience and a certification in HR Management from Chulalongkorn University.",
        },
        {
          icon: "zap",
          heading: "Streamlined processes",
          description:
            "Strong networks and government connections that move work permits, visas and expat relocations through quickly.",
        },
        {
          icon: "scale",
          heading: "Comprehensive legal team",
          description:
            "Experience with both local and international companies, holding notarization and legalization licenses.",
        },
      ] satisfies FeatureItem[],
    },

    aboutSplit: {
      eyebrow: "Built around your business",
      heading: "One team for HR, immigration and legal",
      paragraphs: [
        "We work closely with you to streamline processes, save time and deliver the expertise you need to succeed. From your first work permit to ongoing legal counsel, you get one team — no handoffs, no surprises.",
        "Our consultants bring deep local knowledge, government connections and a track record of helping startups and established companies move quickly and stay compliant.",
      ],
      cta: { label: "More about us", href: "/about" },
      image: {
        src: "/assets/photos/about-mission-team.jpg",
        alt: "BestBridge consulting team standing together in the office",
      },
    },

    ctaBand: {
      heading: "Ready to make your operations smoother?",
      description:
        "Tell us what you need — visa support, an HR partner, or legal counsel — and we'll get back within one business day.",
      cta: { label: "Contact Us Today", href: "/contact" },
    },
  },

  servicesPage: {
    pageHead: {
      eyebrow: "What we do",
      heading: "Our Services",
      description:
        "BestBridge: HR, Visa & Legal. Affordable & reliable consulting for businesses and individuals.",
    },
    blocks: [
      {
        id: "visa",
        eyebrow: "01 — Mobility & immigration",
        heading: "Visa & Work Permits",
        description:
          "Efficient, timely support securing visas and work permits for your international workforce, with end-to-end guidance through Thai regulatory and government processes.",
        image: {
          // TODO: replace with a local asset under /public/assets/photos/
          src: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=1200&q=80&auto=format&fit=crop",
          alt: "Passport, boarding pass and travel documents on a desk",
        },
        groups: [
          {
            heading: "Visa and Work Permit Services (BOI & Non-BOI)",
            items: [
              "New Work Permit and Visa application (6 months & 1 year)",
              "Renewal of Work Permit and Visa (6 months & 1 year)",
              "Family Visa application (6 months & 1 year)",
            ],
          },
          {
            heading: "Immigration Services",
            items: [
              "90-Day Reports",
              "Transfer of Visa Stamp to a new passport",
              "Single Re-entry Permit (90 days)",
              "Multiple Re-entry Permit (90 days)",
              "Visa Type Conversion",
              "Visa Stamp corrections",
              "Replacement of lost or damaged passport, and 90-day report",
              "Residence Certificates (TM.30)",
              "Retirement Visa",
              "Dependent Visa",
            ],
          },
        ],
      },
      {
        id: "hr",
        eyebrow: "02 — People & operations",
        heading: "HR Services",
        description:
          "Elevate your business with our comprehensive HR services. Managing HR processes effectively drives success and boosts growth — we provide HR solutions that help businesses of all sizes streamline operations.",
        image: {
          src: "/assets/photos/services-hr-team.jpg",
          alt: "Asian HR team collaborating at a laptop",
        },
        groups: [
          {
            heading: "Employee Outsourcing Service",
            items: [
              "Top-tier manpower tailored to your needs, fully managed by our team. Access a skilled workforce without the burden of day-to-day HR management.",
            ],
          },
          {
            heading: "Recruitment Service",
            items: [
              "We find candidates who match the job requirements and align with your company's values and culture — built for long-term success.",
            ],
          },
          {
            heading: "Compensation and Benefits",
            items: [
              "Payroll management, insurance and provident fund options — we handle all aspects of employee compensation so you remain competitive and compliant.",
            ],
          },
          {
            heading: "HR Policy Development",
            items: [
              "We create, develop or review HR policies tailored to your business, ensuring operational efficiency, legal compliance and support for your company's unique goals.",
            ],
          },
          {
            heading: "HR Consulting",
            items: [
              "Strategic advice and hands-on support to align your HR processes with your overall business objectives.",
            ],
          },
        ],
      },
      {
        id: "legal",
        eyebrow: "03 — Legal counsel",
        heading: "Legal Services",
        description:
          "Expert legal consultation and litigation support — covering everything from contract management to corporate law — with a focus on reliability and comprehensive service.",
        image: {
          src: "/assets/photos/services-legal.jpg",
          alt: "Gavel, scales of justice and a contract on a desk",
        },
        groups: [
          {
            heading: "Contract Review and Drafting",
            items: [
              "Review, draft and negotiate contracts to protect your interests and ensure compliance with relevant laws and regulations.",
              "Advise on contract structure, terms and risk mitigation strategies.",
              "Support clients on claims of violation — compensation, remedy, issue notification, monitoring and reporting.",
            ],
          },
          {
            heading: "Corporate Governance and Legal Compliance",
            items: [
              "Counsel on corporate governance matters, policies and regulatory compliance.",
              "Assistance with company formation, business licenses and other corporate legal requirements.",
            ],
          },
          {
            heading: "Litigation and Dispute Resolution",
            items: [
              "Representation in civil and criminal litigation — contract disputes, family law, property law and labor law — with robust case preparation and advocacy.",
              "Alternative dispute resolution including mediation and arbitration.",
            ],
          },
          {
            heading: "Labor and Employment Law",
            items: [
              "Advice on employment contracts, employee relations and labor law compliance.",
              "Resolution of employment disputes, including wrongful termination, harassment and discrimination claims.",
            ],
          },
          {
            heading: "Intellectual Property (IP) Management",
            items: [
              "Registration, protection and enforcement of IP rights, including trademarks and copyrights.",
              "Strategic advice on IP portfolio management and licensing agreements.",
            ],
          },
          {
            heading: "Legal Advisory",
            items: [
              "Ongoing legal advice across your business operations.",
              "We stay current on legal developments so you can manage potential legal risks proactively.",
            ],
          },
        ],
      },
    ] satisfies ServiceBlock[],
    ctaBand: {
      heading: "Not sure where to start?",
      description:
        "Tell us about your situation and we'll recommend the right combination of HR, visa and legal support.",
      cta: { label: "Book a Free Consultation", href: "/contact" },
    },
  },

  aboutPage: {
    pageHead: {
      eyebrow: "Who we are",
      heading: "About BestBridge",
      description: "BestBridge: HR, Visa & Legal. Affordable & reliable.",
    },
    mission: {
      eyebrow: "Our mission",
      heading: "A trusted partner for modern, fast-paced businesses",
      paragraphs: [
        "We deliver high-quality consulting services designed for modern businesses. With a focus on cost-effective solutions, we work closely with you to streamline processes, save time, and provide the expertise you need to succeed.",
        "Whether you're hiring your first employees in Thailand, moving a team across borders or need a legal partner on retainer — we make the complex feel straightforward.",
      ],
      cta: { label: "See what we do", href: "/services" },
      image: {
        src: "/assets/photos/about-mission-team.jpg",
        alt: "The BestBridge consulting team in their office",
      },
    },
    whyUs: {
      eyebrow: "Why us",
      heading: "High-quality consulting, end-to-end",
      description:
        "Choose BestBridge for a trusted partnership that delivers cost-effective consulting with expert knowledge and streamlined processes — built to help your business thrive.",
      features: [
        {
          icon: "check-circle",
          heading: "Cost-effective solutions",
          description:
            "Right-sized engagements that respect startup budgets without compromising on quality.",
        },
        {
          icon: "check-circle",
          heading: "Streamlined processes",
          description:
            "Established workflows and government connections that get the right answer, faster.",
        },
        {
          icon: "check-circle",
          heading: "One team, three disciplines",
          description:
            "HR, immigration and legal under one roof — no hand-offs, no surprises.",
        },
      ] satisfies FeatureItem[],
    },
    team: {
      eyebrow: "Our team",
      heading: "A next-generation consulting team",
      description:
        "United by our mission to provide exceptional support to our clients, our diverse backgrounds and innovative approach ensure we deliver the highest quality solutions tailored to your needs.",
      cards: [
        {
          role: "HR Leadership",
          heading: "Senior HR Practice",
          description:
            "A highly accomplished HR professional with over 15 years of diverse experience, holding a distinguished certification in HR Management from Chulalongkorn University.",
          image: {
            src: "/assets/photos/about-hr-card.jpg",
            alt: "Asian HR consultant holding a laptop",
          },
        },
        {
          role: "Mobility & Immigration",
          heading: "Global Mobility Leaders",
          description:
            "Excels in managing work permits, visas and expat relocations, with a strong network and connections in the government sector.",
          image: {
            src: "/assets/photos/about-mobility-card.jpg",
            alt: "Two Asian professionals reviewing mobility paperwork",
          },
        },
        {
          role: "Legal",
          heading: "Dynamic Legal Team",
          description:
            "Extensive experience working with both local and international companies, holding notarization and legalization licenses.",
          image: {
            src: "/assets/photos/about-legal-card.jpg",
            alt: "Legal consultation handshake with scales of justice on a desk",
          },
        },
      ] satisfies TeamCard[],
    },
    valuesBand: {
      eyebrow: "What we believe",
      heading: "Quality, transparency, and care — every engagement",
      description:
        "We treat every client like a long-term partner. That means honest scoping, clear pricing, proactive communication, and standing behind our work.",
      image: {
        src: "/assets/photos/about-band-bangkok-day.jpg",
        alt: "",
      },
    },
    ctaBand: {
      heading: "Let's talk about your business",
      description:
        "Tell us where you're stuck. We'll come back with a plan, a timeline and a quote.",
      cta: { label: "Get in Touch", href: "/contact" },
    },
  },

  contactPage: {
    pageHead: {
      eyebrow: "Get in touch",
      heading: "Contact Us",
      description:
        "Have questions or need help? Call us, send an email, or fill out the form and we'll get back within one business day.",
    },
    aside: {
      eyebrow: "Speak with us",
      heading: "We're here to help.",
      description:
        "Tell us your situation. Whether you're moving a team to Thailand, hiring your first employees, or need ongoing legal counsel — we'll point you in the right direction.",
      items: [
        {
          icon: "mail",
          heading: "Email",
          value: "info@bestbridge.cloud",
          href: "mailto:info@bestbridge.cloud",
        },
        {
          icon: "phone",
          heading: "Phone",
          value: "+66 86 115 6922",
          href: "tel:+66861156922",
        },
        {
          icon: "map-pin",
          heading: "Office",
          value: "Bangkok, Thailand",
        },
        {
          icon: "clock",
          heading: "Hours",
          value: "Mon – Fri, 9:00 – 18:00 ICT",
        },
      ] satisfies ContactItem[],
      photo: {
        src: "/assets/photos/contact-bangkok-night.jpg",
        alt: "Bangkok business district skyline at night reflected on water",
      },
    },
    form: {
      heading: "Book a Consultation",
      subtext: "Your submission will be sent to info@bestbridge.cloud.",
      serviceOptions: [
        "Visa & Work Permits (BOI)",
        "Visa & Work Permits (Non-BOI)",
        "Immigration Services (90-day, re-entry, etc.)",
        "Retirement / Dependent Visa",
        "HR Services — Recruitment",
        "HR Services — Outsourcing",
        "HR Services — Compensation & Benefits",
        "HR Policy Development / Consulting",
        "Legal — Contract Review & Drafting",
        "Legal — Corporate Governance / Compliance",
        "Legal — Litigation & Dispute Resolution",
        "Legal — Labor & Employment",
        "Legal — Intellectual Property",
        "General inquiry / Other",
      ],
    },
  },
} as const;
