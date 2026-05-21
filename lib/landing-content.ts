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

export type FaqItem = {
  question: string;
  answer: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  initials: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type OutboundLink = {
  label: string;
  href: string;
  note?: string;
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
    resources: [
      {
        label: "Thai Immigration Bureau",
        href: "https://www.immigration.go.th/",
        note: "Official visa & extension portal",
      },
      {
        label: "Board of Investment (BOI)",
        href: "https://www.boi.go.th/en/index/",
        note: "BOI privileges and work permits",
      },
      {
        label: "Ministry of Labour",
        href: "https://www.mol.go.th/en/",
        note: "Work permit & labor law",
      },
    ] satisfies OutboundLink[],
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
        "Founded in June 2024, BestBridge Consultancy specializes in comprehensive services that streamline and support business operations in Thailand: HR services, visa and work permit assistance (BOI and Non-BOI), government affairs, legal consultation, and startup support. We work with foreign-owned companies, Thai SMEs and expatriates relocating to Bangkok and the rest of Thailand. Our consultants combine 15+ years of HR and mobility experience with deep working relationships across the Thai Immigration Bureau, the Board of Investment and the Ministry of Labour — so the right answer comes back faster, and surprises stay rare.",
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
        "We work closely with you to streamline processes, save time, and deliver the expertise you need to succeed in Thailand.",
      features: [
        {
          icon: "star",
          heading: "Expert knowledge",
          description:
            "A seasoned HR practice led by a senior consultant with 15+ years of experience and a Chulalongkorn University certification in HR Management. We know what Thai officers look for, how reviewers think, and where applications usually slow down.",
        },
        {
          icon: "zap",
          heading: "Streamlined processes",
          description:
            "Strong networks and government connections that move work permits, visas and expat relocations through quickly. Most BOI work permit filings are submitted within 5 business days of receiving complete documents from you.",
        },
        {
          icon: "scale",
          heading: "Comprehensive legal team",
          description:
            "Experience with both local and international companies. Notarization and legalization licenses on staff, so you don't need a second firm to certify documents for use abroad or with Thai government agencies.",
        },
      ] satisfies FeatureItem[],
    },

    testimonials: {
      eyebrow: "What clients say",
      heading: "Trusted by founders, HR teams and individuals",
      description:
        "BestBridge is new — these are early client snapshots. We're publishing more verified reviews as they come in. To leave a review, email info@bestbridge.cloud.",
      items: [
        {
          quote:
            "We needed two BOI work permits processed before a hard product launch. BestBridge had our paperwork submitted within a week and both engineers were on the ground a month later. The communication was unusually clear for a Thai consultancy.",
          author: "Operations Lead",
          role: "Series-A SaaS company",
          initials: "OL",
        },
        {
          quote:
            "We hired BestBridge to redraft our Thai employment contracts and put together a compliant HR handbook. The deliverables were professional, the timeline held, and the price was a fraction of what the big law firms quoted us.",
          author: "Founder & CEO",
          role: "Bangkok F&B group",
          initials: "FC",
        },
        {
          quote:
            "My retirement visa kept getting bounced back at immigration for the same paperwork issue. BestBridge sorted it on the first attempt and now handles my 90-day reports automatically. Worth every baht.",
          author: "Retired expat",
          role: "Chiang Mai resident",
          initials: "RE",
        },
      ] satisfies Testimonial[],
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
        "BestBridge: HR, Visa & Legal. Affordable & reliable consulting for businesses and individuals operating in Thailand. We work with BOI-promoted companies, non-BOI businesses, foreign-owned subsidiaries, Thai SMEs, and individual expatriates across Bangkok, Phuket, Chiang Mai and the rest of the country.",
    },
    blocks: [
      {
        id: "visa",
        eyebrow: "01 — Mobility & immigration",
        heading: "Visa & Work Permits",
        description:
          "Efficient, timely support securing visas and work permits for your international workforce, with end-to-end guidance through Thai regulatory and government processes. We file BOI and Non-BOI applications, manage renewals, run 90-day reports, and convert tourist visas to long-stay categories. Our team works directly with the Thai Immigration Bureau and One Stop Service Center on your behalf, so you don't have to navigate the queue.",
        image: {
          src: "/assets/photos/services-visa.jpg",
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
          "Elevate your business with our comprehensive HR services. Managing HR processes effectively drives success and boosts growth — we provide HR solutions that help businesses of all sizes streamline operations. From day-one recruitment through ongoing payroll, social security and Thai Labour Protection Act compliance, we either run your HR function as an outsourced partner or work alongside your in-house team.",
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
          "Expert legal consultation and litigation support — covering everything from contract management to corporate law — with a focus on reliability and comprehensive service. We advise foreign-owned companies on Thai Civil and Commercial Code obligations, draft and review bilingual (Thai/English) contracts, handle notarization and document legalization, and represent clients in labor and commercial disputes when matters escalate.",
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

    processSteps: {
      eyebrow: "How we work",
      heading: "Our 5-step process",
      description:
        "Every engagement follows the same predictable path. You always know what's next, who's responsible, and when to expect a result.",
      steps: [
        {
          number: "01",
          title: "Discovery call",
          description:
            "30-minute consultation (free). We learn your situation, scope the work, and tell you honestly whether we're the right fit. If we're not, we'll suggest who is.",
        },
        {
          number: "02",
          title: "Proposal & document checklist",
          description:
            "Within 1–2 business days we send a written proposal with fixed pricing, timeline, and a clear document checklist of everything we need from you. No hourly billing surprises.",
        },
        {
          number: "03",
          title: "Document preparation & translation",
          description:
            "Once you send the documents, we review for completeness, prepare Thai translations where required, draft any letters or affidavits, and assemble the filing package.",
        },
        {
          number: "04",
          title: "Filing & government follow-up",
          description:
            "We submit to the relevant authority (Immigration, BOI, Ministry of Labour, court, etc.) and handle every follow-up, query and additional-document request. You stay informed; you don't queue.",
        },
        {
          number: "05",
          title: "Delivery & aftercare",
          description:
            "Approved permit, visa stamp, contract or judgment delivered to you. We also set calendar reminders for renewals, 90-day reports and other recurring obligations so you never miss a deadline.",
        },
      ] satisfies ProcessStep[],
    },

    faqs: [
      {
        question:
          "What's the difference between a BOI and a Non-BOI work permit in Thailand?",
        answer:
          "A BOI (Board of Investment) work permit is processed through the One Stop Service Center for companies that have been granted BOI promotion privileges. It's faster — usually 1–2 weeks once documents are complete — and the Thai-to-foreign-employee ratio rules are relaxed. A Non-BOI work permit goes through the Ministry of Labour and Immigration Bureau directly. It typically takes 2–4 weeks and requires a 4:1 Thai-to-foreign employee ratio plus 2 million THB in registered capital per foreign employee. BestBridge handles both, and during our discovery call we'll tell you which route is realistic for your company.",
      },
      {
        question: "How long does a Thailand work permit take to process?",
        answer:
          "For BOI-promoted companies, expect 1–2 weeks from complete-document submission to permit issuance. For Non-BOI applications, plan on 2–4 weeks. The variable is almost always document readiness on the employer side — Thai company affidavits, audited financials, social security records — not the speed of government processing once we file. We send a precise document checklist on day one so you can prepare in parallel.",
      },
      {
        question: "What is a 90-day report and do I need one?",
        answer:
          "Any foreigner staying in Thailand on a long-stay visa (Non-Immigrant B, O, ED, Retirement, etc.) for more than 90 consecutive days is legally required to report their current address to Thai Immigration every 90 days. Failure to report carries a fine of up to 5,000 THB plus 200 THB per day late. We file 90-day reports on your behalf, either as one-offs or as an annual subscription with automated reminders.",
      },
      {
        question:
          "Can I convert my tourist visa or visa exemption to a work permit while I'm already in Thailand?",
        answer:
          "Sometimes — it depends on your nationality and current visa class. Most Non-Immigrant B work permit applications require you to leave Thailand and re-enter on the correct visa class. Some categories (notably BOI under specific privileges) allow in-country conversion. During the discovery call we'll confirm your eligibility based on your passport and the destination role.",
      },
      {
        question: "What does a Thailand work permit actually cost?",
        answer:
          "Government fees for a 1-year work permit are 3,100 THB (100 THB application + 3,000 THB issuance). The Non-B visa adds 2,000 THB single-entry or 5,000 THB multi-entry. Professional fees for our handling, document preparation, translations and filing depend on whether it's BOI or Non-BOI and the complexity of your supporting documents. We always quote a fixed total in the proposal — no hourly billing.",
      },
      {
        question: "What documents do I need for a Retirement Visa (Non-O-A)?",
        answer:
          "You need: a passport valid 18+ months, proof of age 50+, a Thai bank deposit of 800,000 THB held for the prior 2 months OR pension income of 65,000+ THB/month (or a combination totaling 800,000 THB/year), a Thai criminal record check, a medical certificate, and proof of health insurance with minimum 40,000 THB outpatient and 400,000 THB inpatient coverage. We help you assemble each piece and accompany you to immigration for the application.",
      },
      {
        question: "Can my spouse and children get visas if I have a work permit?",
        answer:
          "Yes. Dependent visas (Non-Immigrant O) are available for legal spouses and unmarried children under 20. They allow legal residency but not the right to work — for that, each dependent would need their own work permit. We file dependent visas in parallel with your work permit so the whole family arrives on the right status.",
      },
      {
        question: "Why do work permit applications get rejected?",
        answer:
          "The most common reasons we see are: insufficient registered capital relative to foreign hires, missing or expired Thai company documents (PND.50, audited financials, social security registration), translations not done by an authorized translator, photos that don't meet the exact specification, and job descriptions that overlap with protected occupations under the Foreign Business Act. We pre-screen for all of these before filing — most BestBridge applications go through on the first attempt.",
      },
      {
        question:
          "Do you handle Thai labor law compliance for foreign-owned companies?",
        answer:
          "Yes — this is a core HR service. We register your company with Thai Social Security, draft bilingual (Thai/English) employment contracts compliant with the Labour Protection Act, build employee handbooks and work rules in the format the Ministry of Labour expects (mandatory for companies with 10+ employees), and advise on legal termination procedures, severance pay calculations and probationary periods.",
      },
      {
        question: "What does HR outsourcing with BestBridge actually include?",
        answer:
          "Monthly payroll processing and slip distribution, Thai social security and withholding tax filings (PND.1, SSO forms), provident fund administration where applicable, leave tracking, onboarding paperwork for new hires, offboarding for leavers including severance calculations, and a single point of contact for any Thai labor law question that comes up. You can outsource the entire HR function or specific pieces (e.g., payroll only).",
      },
      {
        question: "Can BestBridge help register a new company in Thailand?",
        answer:
          "Yes. We work with the Department of Business Development (DBD) to incorporate Thai limited companies, register them for VAT and Social Security, open corporate bank accounts, and obtain any specific licenses your business activity requires (FBL, BOI promotion application, etc.). For BOI-promoted activities we coordinate the privilege application alongside the company registration.",
      },
      {
        question: "How quickly do you respond to inquiries?",
        answer:
          "We respond to email and contact-form inquiries within one business day. For existing clients, our standard SLA is 4 business hours during Bangkok hours (Mon–Fri 09:00–18:00 ICT). Urgent immigration matters — overstays, denied entries — get same-day response regardless.",
      },
    ] satisfies FaqItem[],

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
      description:
        "BestBridge Consultancy is a Bangkok-based HR, visa and legal advisory founded in 2024 by senior practitioners with 15+ years of mobility, employment and corporate-law experience. We serve foreign-owned companies, Thai SMEs and individual expatriates — combining boutique attention with the operational depth that complex Thai bureaucracy demands.",
    },
    mission: {
      eyebrow: "Our mission",
      heading: "A trusted partner for modern, fast-paced businesses",
      paragraphs: [
        "We deliver high-quality consulting services designed for modern businesses. With a focus on cost-effective solutions, we work closely with you to streamline processes, save time, and provide the expertise you need to succeed in Thailand's regulatory environment.",
        "Whether you're hiring your first employees in Thailand, moving a team across borders, or need a legal partner on retainer — we make the complex feel straightforward. Our engagements run on fixed pricing and clear timelines, not open-ended billable hours, so you always know what to expect.",
        "We treat every client as a long-term partner. That commitment shows up in honest scoping (we'll tell you when we're not the right fit), proactive communication (you'll hear from us before deadlines, not after them), and standing behind our work — including handling any government follow-up at no extra cost.",
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

    faqs: [
      {
        question: "Who does BestBridge typically work with?",
        answer:
          "Three groups: (1) foreign-owned companies expanding into Thailand or already operating here who need ongoing HR, immigration and legal support; (2) Thai SMEs that want professional employment contracts, HR policies and labor-law compliance without hiring an internal HR team; and (3) individual expatriates — retirees, remote workers, marriage-visa applicants, those switching employers — who need help with the personal immigration paperwork.",
      },
      {
        question: "How fast do you respond?",
        answer:
          "Within one business day for new inquiries. For existing clients, the SLA is 4 business hours during Bangkok working hours (Mon–Fri 09:00–18:00 ICT). Urgent immigration matters such as overstays or denied entries get a same-day response.",
      },
      {
        question: "Do you work in English, Thai, or both?",
        answer:
          "Both. All client-facing materials, contracts and consultations can be delivered in English, Thai or bilingually. Our consultants are fluent in both languages, and our legal team handles certified Thai-English translations in-house when government filings require them.",
      },
      {
        question: "Are you a law firm or a consultancy?",
        answer:
          "Both — by design. BestBridge is structured as a multidisciplinary consultancy with an in-house legal practice. That lets us handle the immigration and HR work that doesn't need a licensed lawyer at consultancy rates, while still having licensed counsel and notaries on hand for litigation, contract drafting, notarization and matters that legally require it.",
      },
      {
        question: "Why not just do my own work permit / visa application?",
        answer:
          "You can — many people do. It works if your case is simple, your documents are clean, and you have time to queue at Immigration. We're worth hiring when (a) your case has complicating factors — non-standard income, prior overstays, missing documents, BOI nuances, (b) the cost of a rejected or delayed application is high — a hire that can't start, a launch slipping — or (c) you simply don't want to spend half a day at Chaeng Wattana.",
      },
      {
        question: "What are your payment terms?",
        answer:
          "Standard engagements: 50% on signature, 50% on government filing. For ongoing HR or monthly retainers: invoiced monthly in arrears. We accept Thai bank transfer, international wire and credit card (with a 3% processing fee). Fixed pricing is the default — we'll quote hourly only for litigation work where the scope is genuinely unpredictable.",
      },
    ] satisfies FaqItem[],

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
