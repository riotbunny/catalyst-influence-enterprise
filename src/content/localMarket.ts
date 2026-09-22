import { getIndexableIndustries, type IndustryPage } from "@/content/industries";
import { getIndexableLocations, getStateCode, type LocationPage } from "@/content/locations";

export type StateHub = {
  slug: string;
  state: string;
  stateCode: string;
  locations: LocationPage[];
  priority: number;
  lastModified: string;
};

const stateMarketSignals: Record<string, string[]> = {
  California: [
    "High paid-media competition makes organic demand capture and conversion proof especially important.",
    "Buyers often compare multiple sophisticated providers before contacting a service business.",
    "Landing pages need stronger authority signals because competitive alternatives are easy to find.",
  ],
  Texas: [
    "Fast-growing metro areas create demand, but also increase competition for qualified leads.",
    "Service businesses need to separate booked opportunities from noisy lead volume.",
    "City-specific search intent changes quickly across Dallas, Austin, Houston, San Antonio, and Fort Worth.",
  ],
  Florida: [
    "Local search demand is broad, mobile-heavy, and highly competitive across home services and healthcare.",
    "Speed-to-lead and trust proof matter because prospects often compare several providers quickly.",
    "Seasonal and migration-driven demand can change which services deserve budget.",
  ],
  "New York": [
    "Search results are dense, expensive, and authority-sensitive.",
    "High-value buyers expect proof, positioning, and a clear reason to trust before they inquire.",
    "Generic agency copy is less likely to compete against established local and national firms.",
  ],
  Illinois: [
    "Mid-market B2B, professional services, and industrial companies need search pages that speak to complex buying cycles.",
    "Paid and organic acquisition should be measured against qualified pipeline, not isolated leads.",
    "Trust architecture matters because buyers often compare long-standing regional providers.",
  ],
  Arizona: [
    "Growth-market competition rewards businesses that capture intent early and convert quickly on mobile.",
    "Service-area expansion needs clear city-level pages tied to attribution.",
    "Paid media, local SEO, and follow-up must work together to protect lead quality.",
  ],
  Colorado: [
    "Innovation and professional-service growth create opportunity for stronger B2B acquisition systems.",
    "Regional differentiation is important because buyers compare local specialists and national agencies.",
    "Search pages need to connect local relevance with proof and commercial fit.",
  ],
  "North Carolina": [
    "Research Triangle and regional growth corridors create strong B2B and healthcare service demand.",
    "City-specific pages should reflect both local competition and regional expansion patterns.",
    "Pipeline quality matters more than generic traffic gains in growth markets.",
  ],
  Utah: [
    "The Silicon Slopes market rewards B2B acquisition systems that connect SEO, paid media, and measurable follow-up.",
    "Competition is rising, but many service categories still have room for stronger local content architecture.",
    "Authority and technical clarity can outperform generic agency messaging.",
  ],
};

const defaultSignals = [
  "Service buyers compare options quickly across search, ads, reviews, and website proof.",
  "Local pages need enough market-specific context to avoid feeling like interchangeable city swaps.",
  "Qualified acquisition depends on connecting demand capture, conversion, follow-up, and attribution.",
];

const industryLocalAngles: Record<string, string[]> = {
  "law-firms": [
    "Practice-area intent must be separated from generic legal traffic.",
    "Trust signals, intake speed, and source-to-case quality matter more than raw consultation volume.",
    "Local pages should help prospects understand fit before they submit sensitive case information.",
  ],
  "home-services": [
    "Urgent service intent requires fast mobile conversion paths and clear trust proof.",
    "Service-area pages need to reflect local demand, seasonality, and job economics.",
    "Lead routing and speed-to-lead can decide whether traffic becomes booked work.",
  ],
  hvac: [
    "Repair, replacement, maintenance, and emergency demand behave differently by season and market.",
    "Pages should separate urgent intent from research intent so budget and follow-up are not wasted.",
    "Appointment quality and service value matter more than a low cost per form fill.",
  ],
  "dental-practices": [
    "Procedure-specific demand often needs education, proof, and booking clarity on the same page.",
    "Local reviews and trust markers help reduce patient uncertainty before the first call.",
    "Mobile booking friction can erase the value of otherwise strong traffic.",
  ],
};

export function getLocalMarketSignals(location: LocationPage) {
  return stateMarketSignals[location.state] ?? defaultSignals;
}

export function getLocalMarketSummary(location: LocationPage) {
  const signals = getLocalMarketSignals(location);

  return `${location.city}, ${location.stateCode} is treated as a service-area market, not a fake office location. The acquisition strategy uses local search intent, market competition, proof requirements, and follow-up speed to make the page useful beyond a city-name swap. ${signals[0]}`;
}

export function getLocationFaqs(location: LocationPage) {
  return [
    {
      question: `Why does ${location.city}, ${location.stateCode} need a dedicated acquisition page?`,
      answer: `${location.city} has its own search demand, competitive pressure, buyer expectations, and service-area economics. The page exists to explain how Catalyst adapts customer acquisition around those local conditions instead of sending every visitor to a generic national page.`,
    },
    {
      question: `Does Catalyst claim a physical office in ${location.city}?`,
      answer: `No. Catalyst is positioned as a service-area business for ${location.city}, ${location.stateCode}. The page uses area-served language and does not claim a local street address or walk-in office.`,
    },
    {
      question: `What signals matter most for ${location.city} service businesses?`,
      answer: `${getLocalMarketSignals(location).join(" ")}`,
    },
  ];
}

export function getIndustryLocationFaqs(industry: IndustryPage, location: LocationPage) {
  return [
    {
      question: `How does customer acquisition change for ${industry.name.toLowerCase()} in ${location.city}?`,
      answer: `${industry.name} in ${location.city} need acquisition pages that account for local search behavior, trust requirements, lead quality, and follow-up speed. Catalyst adapts page architecture, paid acquisition, and reporting around those conditions.`,
    },
    {
      question: `What should ${industry.name.toLowerCase()} in ${location.city} measure first?`,
      answer: `The first metrics should be qualified actions, source quality, speed-to-lead, booked opportunities, and whether the channel is producing economically useful demand rather than raw traffic.`,
    },
    {
      question: `Does this page represent a physical ${location.city} office?`,
      answer: `No. It represents service-area coverage for ${location.city}, ${location.stateCode}. The page does not claim a local office address.`,
    },
  ];
}

export function getIndustryLocalAngles(industry: IndustryPage) {
  return industryLocalAngles[industry.slug] ?? [
    "The acquisition path must match the buyer's urgency, trust requirements, and decision process.",
    "Local intent should be connected to proof, conversion clarity, and measurable follow-up.",
    "Search and paid traffic should be judged by qualified opportunity quality, not raw lead count.",
  ];
}

export function getStateHubs(): StateHub[] {
  const grouped = getIndexableLocations().reduce<Record<string, LocationPage[]>>((groups, location) => {
    groups[location.state] = groups[location.state] ?? [];
    groups[location.state].push(location);
    return groups;
  }, {});

  return Object.entries(grouped)
    .map(([state, locations]) => ({
      slug: state.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      state,
      stateCode: getStateCode(state),
      locations: locations.sort((a, b) => b.priority - a.priority || a.city.localeCompare(b.city)),
      priority: Math.max(...locations.map((location) => location.priority)),
      lastModified: locations
        .map((location) => location.lastModified)
        .sort()
        .at(-1) ?? "2026-09-18",
    }))
    .sort((a, b) => b.priority - a.priority || a.state.localeCompare(b.state));
}

export function getStateHub(slug: string) {
  return getStateHubs().find((hub) => hub.slug === slug || hub.stateCode.toLowerCase() === slug);
}

export function getIndustryMarketPages() {
  return getIndexableIndustries().flatMap((industry) =>
    getIndexableLocations().map((location) => ({
      industrySlug: industry.slug,
      marketSlug: location.marketSlug,
      city: location.city,
      state: location.state,
      stateCode: location.stateCode,
      priority: Math.max(Math.min(industry.priority, location.priority) - 0.08, 0.4),
      lastModified: location.lastModified > industry.lastModified ? location.lastModified : industry.lastModified,
    })),
  );
}
