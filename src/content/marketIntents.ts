import { getIndexableLocations } from "@/content/locations";

export type MarketIntent = {
  slug: string;
  label: string;
  title: string;
  buyerPhrase: string;
  metaDescription: string;
  heroTitle: string;
  intro: string;
  fit: string[];
  deliverables: string[];
};

export const marketIntents: MarketIntent[] = [
  {
    slug: "customer-acquisition",
    label: "Customer Acquisition",
    title: "Customer Acquisition Agency",
    buyerPhrase: "customer acquisition agency",
    metaDescription:
      "Customer acquisition agency for established service businesses. Catalyst connects local SEO, paid media, landing pages, automation, and lead attribution.",
    heroTitle: "Customer acquisition built around qualified demand.",
    intro:
      "Catalyst builds the acquisition system around the buyer path: how qualified prospects search, what they need to believe, how trust is established, and what follow-up turns intent into a revenue conversation.",
    fit: [
      "Established service businesses with proven demand",
      "Companies that need better qualified opportunities, not raw lead volume",
      "Operators ready to connect SEO, paid media, conversion, and follow-up into one measurable system",
    ],
    deliverables: [
      "Demand and offer map for the local market",
      "Landing page trust and conversion architecture",
      "Local SEO and paid acquisition channel plan",
      "CRM follow-up and source attribution recommendations",
      "90-day growth architecture roadmap",
    ],
  },
  {
    slug: "lead-generation",
    label: "Lead Generation",
    title: "Lead Generation Agency",
    buyerPhrase: "lead generation agency",
    metaDescription:
      "Lead generation agency for service businesses that need higher-quality inquiries from local SEO, paid media, landing pages, and follow-up systems.",
    heroTitle: "Lead generation that protects quality before volume.",
    intro:
      "Catalyst treats lead generation as a full commercial path, not a form-fill count. The system is designed to attract higher-intent prospects, qualify demand faster, and make follow-up measurable.",
    fit: [
      "Service businesses with high customer value",
      "Teams that need fewer wasted inquiries and better source visibility",
      "Companies spending enough on growth to make lead quality economically important",
    ],
    deliverables: [
      "Qualified lead definition and source map",
      "High-intent search and paid traffic plan",
      "Conversion page messaging and proof structure",
      "Speed-to-lead and follow-up workflow",
      "Lead quality reporting recommendations",
    ],
  },
  {
    slug: "local-seo",
    label: "Local SEO",
    title: "Local SEO Agency",
    buyerPhrase: "local SEO agency",
    metaDescription:
      "Local SEO agency for established service businesses that need city-level search visibility tied to landing pages, proof, lead capture, and attribution.",
    heroTitle: "Local SEO connected to the rest of acquisition.",
    intro:
      "Catalyst uses local SEO as one part of a larger acquisition system: pages that capture demand, proof that earns trust, and follow-up that turns qualified local intent into action.",
    fit: [
      "Service businesses competing across priority local markets",
      "Companies whose city pages are too thin to rank or convert",
      "Operators who want SEO connected to pipeline, not isolated rankings",
    ],
    deliverables: [
      "Local search opportunity map",
      "City and service-area page architecture",
      "Internal linking and canonical plan",
      "Trust, review, and proof placement strategy",
      "Measurement plan for qualified local actions",
    ],
  },
];

export function getMarketIntent(slug: string) {
  return marketIntents.find((intent) => intent.slug === slug);
}

export function getMarketIntentPages() {
  return getIndexableLocations().flatMap((location) =>
    marketIntents.map((intent) => ({
      intentSlug: intent.slug,
      marketSlug: location.marketSlug,
      city: location.city,
      state: location.state,
      stateCode: location.stateCode,
      lastModified: location.lastModified,
      priority: Math.max(location.priority - 0.06, 0.44),
    })),
  );
}
