export type IndustryPage = {
  slug: string;
  name: string;
  title: string;
  metaDescription: string;
  heroTitle: string;
  intro: string;
  acquisitionProblems: string[];
  systemPriorities: string[];
  recommendedServices: string[];
  faqs: { question: string; answer: string }[];
  priority: number;
  indexable: boolean;
  lastModified: string;
};

export const industries: IndustryPage[] = [
  {
    slug: "law-firms",
    name: "Law Firms",
    title: "Customer Acquisition for Law Firms",
    metaDescription:
      "Build a predictable client acquisition system for law firms with stronger SEO pages, paid acquisition, trust architecture, and follow-up.",
    heroTitle: "Client acquisition for law firms that need better qualified inquiries.",
    intro:
      "Law firm marketing fails when it treats every click like equal demand. Catalyst helps firms align search intent, proof, landing pages, and intake so high-value prospects can evaluate the firm quickly.",
    acquisitionProblems: [
      "Expensive paid search clicks with unclear case quality",
      "Practice-area pages that do not build enough trust",
      "Weak intake visibility after a prospect submits a form",
      "Generic local SEO pages that look like every competitor",
    ],
    systemPriorities: [
      "Practice-area page architecture",
      "Local trust and proof signals",
      "Paid search landing page alignment",
      "Intake and source attribution clarity",
    ],
    recommendedServices: ["customer-acquisition-system", "conversion-architecture", "programmatic-seo"],
    faqs: [
      {
        question: "Can PSEO work for law firms?",
        answer:
          "Yes, but it needs restraint. The strongest opportunities usually come from practice-area, location, and question-based pages with real expertise and useful next steps.",
      },
      {
        question: "What should law firms measure first?",
        answer:
          "Qualified consultations, practice-area fit, intake speed, and source-to-case quality matter more than raw lead count.",
      },
    ],
    priority: 0.8,
    indexable: true,
    lastModified: "2026-09-13",
  },
  {
    slug: "home-services",
    name: "Home Services",
    title: "Customer Acquisition for Home Service Companies",
    metaDescription:
      "Create a connected acquisition system for home service companies across local SEO, paid media, conversion pages, and follow-up.",
    heroTitle: "A local acquisition system for home service companies ready to scale.",
    intro:
      "Home service growth depends on being found at the right moment and responding with enough trust, speed, and clarity to win the job before the competitor does.",
    acquisitionProblems: [
      "City pages that are too thin to rank or convert",
      "Rising cost per lead in crowded local ad markets",
      "Slow or inconsistent follow-up after quote requests",
      "Little visibility into which service areas and jobs are profitable",
    ],
    systemPriorities: [
      "Service-area page architecture",
      "Emergency and high-intent search capture",
      "Review and proof placement",
      "Lead routing and speed-to-lead workflow",
    ],
    recommendedServices: ["programmatic-seo", "paid-acquisition", "marketing-automation"],
    faqs: [
      {
        question: "Should every city get a page?",
        answer:
          "No. Prioritize cities and services where there is real demand, operational coverage, and enough page-specific value to avoid thin local pages.",
      },
      {
        question: "What makes local service pages convert?",
        answer:
          "Clear service fit, local trust signals, pricing or process clarity, fast CTA paths, and visible proof close the trust gap.",
      },
    ],
    priority: 0.8,
    indexable: true,
    lastModified: "2026-09-13",
  },
  {
    slug: "hvac",
    name: "HVAC Companies",
    title: "Lead Generation and SEO for HVAC Companies",
    metaDescription:
      "Build an HVAC customer acquisition system that captures local service demand, improves landing page trust, and strengthens follow-up.",
    heroTitle: "HVAC leads are won in the moment of need.",
    intro:
      "HVAC acquisition needs fast demand capture, strong service-area relevance, seasonal planning, and a follow-up process that turns urgent search intent into booked appointments.",
    acquisitionProblems: [
      "Seasonal demand spikes without enough organic coverage",
      "Paid leads that do not convert into booked jobs",
      "Weak city and service combinations",
      "Poor tracking from lead source to appointment outcome",
    ],
    systemPriorities: [
      "Repair, replacement, and maintenance page sets",
      "City and service-area quality controls",
      "Emergency intent landing pages",
      "Appointment tracking and follow-up",
    ],
    recommendedServices: ["programmatic-seo", "paid-acquisition", "marketing-automation"],
    faqs: [
      {
        question: "Which HVAC searches matter most?",
        answer:
          "High-intent local terms around repair, replacement, emergency service, and system-specific problems tend to matter more than broad informational traffic.",
      },
      {
        question: "Can HVAC PSEO be seasonal?",
        answer:
          "Yes. The content model should account for seasonal services and timing so pages support demand before peak search periods arrive.",
      },
    ],
    priority: 0.75,
    indexable: true,
    lastModified: "2026-09-13",
  },
  {
    slug: "dental-practices",
    name: "Dental Practices",
    title: "Patient Acquisition for Dental Practices",
    metaDescription:
      "Improve patient acquisition for dental practices with local SEO, trust-focused landing pages, paid acquisition, and follow-up systems.",
    heroTitle: "Patient acquisition that makes trust visible before the first call.",
    intro:
      "Dental acquisition works best when service pages, reviews, procedure education, local relevance, and booking paths reduce uncertainty before a patient reaches out.",
    acquisitionProblems: [
      "Procedure pages that educate but do not convert",
      "Paid leads without clear patient value",
      "Weak review and credibility placement",
      "Booking friction on mobile",
    ],
    systemPriorities: [
      "Procedure page conversion architecture",
      "Local proof and review placement",
      "Paid campaign landing pages",
      "Booking and reminder workflow",
    ],
    recommendedServices: ["paid-acquisition", "conversion-architecture", "marketing-automation"],
    faqs: [
      {
        question: "What pages should a dental practice prioritize?",
        answer:
          "Start with high-value procedures, local intent pages, and pages that answer the objections patients have before booking.",
      },
      {
        question: "Does this require heavy ad spend?",
        answer:
          "Not always. Paid acquisition works better when the landing pages and follow-up system are fixed first.",
      },
    ],
    priority: 0.7,
    indexable: true,
    lastModified: "2026-09-13",
  },
  {
    slug: "service-businesses",
    name: "Service Businesses",
    title: "Customer Acquisition for Established Service Businesses",
    metaDescription:
      "Customer acquisition strategy for established service businesses that need stronger SEO, lead generation, paid acquisition, landing pages, and follow-up.",
    heroTitle: "Customer acquisition for service businesses that do not fit a generic agency template.",
    intro:
      "Not every qualified company fits neatly into one vertical page. Catalyst works with established service businesses where customer value, search demand, sales process, and operational capacity justify a serious acquisition system.",
    acquisitionProblems: [
      "The business has strong service delivery but no clear acquisition system",
      "Traffic, ads, referrals, and follow-up are managed as separate pieces",
      "The website explains the service but does not create enough trust to convert",
      "Leadership cannot tell which channels create qualified opportunities",
    ],
    systemPriorities: [
      "Buyer-intent and market-demand mapping",
      "Service page and landing page conversion architecture",
      "Paid and organic acquisition channel roles",
      "Follow-up, attribution, and qualification workflow",
    ],
    recommendedServices: [
      "customer-acquisition-system",
      "growth-architecture",
      "conversion-architecture",
      "programmatic-seo",
    ],
    faqs: [
      {
        question: "What kinds of service businesses does Catalyst consider?",
        answer:
          "Catalyst considers established service companies with meaningful customer value, proven demand, and enough operational capacity to handle more qualified opportunities. The fit depends less on the label of the industry and more on the economics and acquisition path.",
      },
      {
        question: "Why not create a page for every possible industry?",
        answer:
          "A smaller number of useful pages is stronger than a large set of thin industry pages. This page gives non-listed service businesses a relevant path without weakening the site with low-value duplicate pages.",
      },
    ],
    priority: 0.78,
    indexable: true,
    lastModified: "2026-09-22",
  },
];

export function getIndustry(slug: string) {
  const industry = industries.find((industry) => industry.slug === slug);

  return industry ? enrichIndustryFaqs(industry) : undefined;
}

export function getIndexableIndustries() {
  return industries.filter((industry) => industry.indexable).map(enrichIndustryFaqs);
}

function enrichIndustryFaqs(industry: IndustryPage): IndustryPage {
  return {
    ...industry,
    faqs: [
      ...industry.faqs,
      {
        question: `What makes customer acquisition different for ${industry.name.toLowerCase()}?`,
        answer:
          "The acquisition system has to match the buyer's urgency, trust requirements, service economics, and decision process. Catalyst adapts the page architecture, channel mix, proof, and follow-up path around those realities instead of using a generic agency template.",
      },
      {
        question: `How long does it take to improve acquisition for ${industry.name.toLowerCase()}?`,
        answer:
          "The first 30 days usually clarify the biggest leaks and highest-leverage opportunities. Stronger signals build as pages, campaigns, conversion paths, and follow-up systems are deployed and measured through the 90-day architecture.",
      },
      {
        question: `Which channels work best for ${industry.name.toLowerCase()}?`,
        answer:
          "The best channel mix depends on search demand, competition, customer value, sales cycle, and operational capacity. Catalyst chooses channels by commercial role: what captures demand, what builds trust, what converts, and what can be measured cleanly.",
      },
    ],
  };
}
