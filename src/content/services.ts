export type ServicePage = {
  slug: string;
  title: string;
  metaDescription: string;
  eyebrow: string;
  heroTitle: string;
  intro: string;
  fit: string[];
  symptoms: string[];
  deliverables: string[];
  faqs: { question: string; answer: string }[];
  relatedIndustries: string[];
  priority: number;
  indexable: boolean;
  lastModified: string;
};

export const services: ServicePage[] = [
  {
    slug: "customer-acquisition-system",
    title: "Customer Acquisition System for Established Service Businesses",
    metaDescription:
      "Build a predictable customer acquisition system that connects SEO, paid media, landing pages, CRM follow-up, and conversion tracking.",
    eyebrow: "Flagship Service",
    heroTitle: "Customer acquisition that works like a system, not a pile of campaigns.",
    intro:
      "Catalyst rebuilds the core acquisition environment around one measurable path: attract qualified demand, convert it into trust, and move serious buyers into a sales conversation.",
    fit: [
      "Established service businesses with proven demand",
      "Teams spending at least $10K per month on growth capacity",
      "Operators who need lead quality, conversion, and attribution to improve together",
    ],
    symptoms: [
      "Lead volume changes every month without a clear reason",
      "Paid traffic works only while spend keeps increasing",
      "SEO, ads, landing pages, and CRM follow-up are managed as separate efforts",
      "Your team cannot confidently connect marketing activity to booked revenue",
    ],
    deliverables: [
      "Growth Architecture Blueprint",
      "Search and paid acquisition opportunity map",
      "Landing page and trust architecture rebuild",
      "CRM handoff, follow-up, and attribution recommendations",
      "90-day execution plan with measurable milestones",
    ],
    faqs: [
      {
        question: "Is this just SEO or paid ads?",
        answer:
          "No. The engagement connects demand capture, paid acquisition, page conversion, follow-up, and measurement so each channel has a defined job inside one acquisition system.",
      },
      {
        question: "Who is this not for?",
        answer:
          "It is not a fit for idea-stage startups or businesses without the operational capacity to handle additional qualified opportunities.",
      },
    ],
    relatedIndustries: ["law-firms", "home-services", "hvac", "dental-practices"],
    priority: 0.9,
    indexable: true,
    lastModified: "2026-09-13",
  },
  {
    slug: "programmatic-seo",
    title: "Programmatic SEO Agency for High-Intent Search Demand",
    metaDescription:
      "Design and deploy programmatic SEO systems that capture long-tail commercial search demand without thin-page or doorway-page risk.",
    eyebrow: "Organic Acquisition",
    heroTitle: "Programmatic SEO built for qualified demand, not empty page count.",
    intro:
      "Catalyst designs structured page systems around real buyer intent, useful page templates, internal linking, and quality gates that keep low-value URLs out of the sitemap.",
    fit: [
      "Businesses with repeatable services, markets, locations, or buyer problems",
      "Teams that need organic acquisition to reduce dependence on paid media",
      "Brands that want a scalable SEO asset without risking thin scaled content",
    ],
    symptoms: [
      "Manual content production cannot cover the long-tail search surface",
      "Competitors rank for city, service, comparison, and industry combinations",
      "Your site has useful expertise but no structured page architecture",
      "Existing location pages feel interchangeable",
    ],
    deliverables: [
      "PSEO opportunity map and page taxonomy",
      "Structured content model",
      "Indexation quality gate",
      "Sitemap and canonical implementation",
      "Reusable page templates for services, industries, and locations",
    ],
    faqs: [
      {
        question: "How many pages should launch first?",
        answer:
          "Usually fewer than people think. A controlled first launch of strong pages is safer than publishing thousands of near-duplicate URLs before Search Console data validates demand.",
      },
      {
        question: "How do you avoid doorway pages?",
        answer:
          "Pages only become indexable when they have a distinct user job, differentiated content, useful internal links, and enough page-specific value to deserve search traffic.",
      },
    ],
    relatedIndustries: ["home-services", "law-firms", "real-estate-teams", "b2b-service-firms"],
    priority: 0.9,
    indexable: true,
    lastModified: "2026-09-13",
  },
  {
    slug: "paid-acquisition",
    title: "Paid Acquisition Strategy for Service Businesses",
    metaDescription:
      "Build paid acquisition campaigns that connect targeting, landing pages, follow-up, and revenue measurement for established service businesses.",
    eyebrow: "Paid Growth",
    heroTitle: "Paid acquisition with the funnel built around it.",
    intro:
      "Catalyst aligns paid media with offer architecture, landing page trust, lead handling, and performance reporting so ad spend creates commercial learning instead of disconnected platform metrics.",
    fit: [
      "Teams already investing in Google, Meta, or LinkedIn ads",
      "Businesses selling high-value services where lead quality matters",
      "Operators who want spend decisions tied to conversion and pipeline signals",
    ],
    symptoms: [
      "Cost per lead is tracked but lead quality is unclear",
      "Campaign performance changes but the sales team does not know why",
      "Landing pages do not match ad intent",
      "Follow-up speed and attribution are leaking value",
    ],
    deliverables: [
      "Campaign and offer audit",
      "Landing page message map",
      "Audience and intent segmentation",
      "Lead quality feedback loop",
      "Budget scaling and optimization cadence",
    ],
    faqs: [
      {
        question: "Do you manage every ad channel?",
        answer:
          "No. Catalyst prioritizes the channels most likely to produce profitable acquisition for the business model instead of spreading spend across every platform.",
      },
      {
        question: "What makes this different from media buying?",
        answer:
          "The work includes the conversion path and measurement system around the campaigns, not only the campaign settings inside the ad platform.",
      },
    ],
    relatedIndustries: ["med-spas", "dental-practices", "home-services", "high-ticket-consultants"],
    priority: 0.8,
    indexable: true,
    lastModified: "2026-09-13",
  },
  {
    slug: "conversion-architecture",
    title: "Conversion Architecture for High-Ticket Service Offers",
    metaDescription:
      "Improve landing page trust, message hierarchy, offer clarity, and call-to-action paths for high-ticket service businesses.",
    eyebrow: "Conversion Strategy",
    heroTitle: "Turn attention into qualified action.",
    intro:
      "Catalyst rebuilds the decision environment around the prospect: what they need to understand, what they need to believe, and what must feel safe before they take action.",
    fit: [
      "Businesses with traffic but weak conversion",
      "Teams selling complex or high-ticket services",
      "Brands that need sharper proof, positioning, and objection handling",
    ],
    symptoms: [
      "Visitors understand what you do but do not inquire",
      "Landing pages rely on generic claims instead of specific proof",
      "Your offer is strong but hard to evaluate quickly",
      "Calls to action do not match the buyer's level of trust",
    ],
    deliverables: [
      "Message hierarchy",
      "Trust and proof architecture",
      "Offer and objection map",
      "CTA and form strategy",
      "Landing page section blueprint",
    ],
    faqs: [
      {
        question: "Is this CRO?",
        answer:
          "It includes CRO, but the focus is broader: the full decision architecture that helps a qualified prospect feel clear, safe, and ready to act.",
      },
      {
        question: "Can this improve SEO pages too?",
        answer:
          "Yes. PSEO pages need conversion architecture so long-tail visitors are not just counted as traffic, but guided toward qualified commercial action.",
      },
    ],
    relatedIndustries: ["law-firms", "b2b-service-firms", "high-ticket-consultants", "dental-practices"],
    priority: 0.75,
    indexable: true,
    lastModified: "2026-09-13",
  },
  {
    slug: "marketing-automation",
    title: "Marketing Automation and Follow-Up Systems",
    metaDescription:
      "Connect lead capture, CRM routing, automated follow-up, and source attribution so qualified opportunities are handled quickly.",
    eyebrow: "Activation Layer",
    heroTitle: "The lead is not won when the form is submitted.",
    intro:
      "Catalyst helps service businesses close the gap between inquiry and revenue by designing the follow-up, routing, and measurement systems that keep qualified leads moving.",
    fit: [
      "Businesses losing opportunities after form fill or call",
      "Teams with multiple traffic sources but weak source attribution",
      "Service businesses that need faster speed-to-lead and cleaner handoff",
    ],
    symptoms: [
      "Leads sit before anyone responds",
      "Sales cannot see which campaign or page created the opportunity",
      "Follow-up depends on manual memory",
      "Reporting stops at lead count instead of qualified pipeline",
    ],
    deliverables: [
      "Lead capture and routing map",
      "Follow-up sequence plan",
      "CRM field and source tracking recommendations",
      "Speed-to-lead workflow",
      "Attribution and reporting plan",
    ],
    faqs: [
      {
        question: "Do you replace our CRM?",
        answer:
          "Not by default. The first move is to make the existing system clearer and more accountable unless a replacement is genuinely needed.",
      },
      {
        question: "Why include automation in acquisition strategy?",
        answer:
          "Because acquisition does not end at the click. Slow or inconsistent follow-up can make strong traffic look weak.",
      },
    ],
    relatedIndustries: ["home-services", "real-estate-teams", "law-firms", "med-spas"],
    priority: 0.7,
    indexable: true,
    lastModified: "2026-09-13",
  },
  {
    slug: "growth-architecture",
    title: "Growth Architecture Agency for Connected Acquisition Systems",
    metaDescription:
      "Design the growth architecture behind customer acquisition: demand, offers, pages, conversion paths, CRM follow-up, and measurement.",
    eyebrow: "Operating System",
    heroTitle: "The system behind growth is the product.",
    intro:
      "Catalyst uses growth architecture to connect the choices that determine acquisition performance: who to attract, what to offer, where demand lands, how trust is built, and how revenue is measured.",
    fit: [
      "Businesses with enough activity but not enough coherence",
      "Teams with disconnected vendors, campaigns, and reporting",
      "Founders who need a 90-day operating plan before scaling spend",
    ],
    symptoms: [
      "Every channel reports its own metrics but no one owns the full system",
      "Growth decisions are made from platform dashboards instead of customer economics",
      "Messaging, pages, CRM, and ads do not reinforce each other",
      "Leadership cannot see what to fix first",
    ],
    deliverables: [
      "Growth system diagnostic",
      "Customer segment and offer map",
      "Channel role definition",
      "Conversion and follow-up architecture",
      "90-day implementation roadmap",
    ],
    faqs: [
      {
        question: "How is growth architecture different from digital marketing?",
        answer:
          "Digital marketing often starts with channels. Growth architecture starts with the commercial system those channels must support.",
      },
      {
        question: "What is the first deliverable?",
        answer:
          "The first major deliverable is a clear map of the acquisition system: where demand exists, where prospects are lost, and what needs to be built first.",
      },
    ],
    relatedIndustries: ["b2b-service-firms", "high-ticket-consultants", "home-services", "law-firms"],
    priority: 0.85,
    indexable: true,
    lastModified: "2026-09-13",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getIndexableServices() {
  return services.filter((service) => service.indexable);
}
