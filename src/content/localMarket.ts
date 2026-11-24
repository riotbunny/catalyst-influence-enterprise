import { getIndexableIndustries, type IndustryPage } from "@/content/industries";
import { getAllLocations, getIndexableLocations, getStateCode, type LocationPage } from "@/content/locations";

export type StateHub = {
  slug: string;
  state: string;
  stateCode: string;
  locations: LocationPage[];
  priority: number;
  lastModified: string;
};

const cityMarketSignals: Record<string, string[]> = {
  "new-york-ny": [
    "New York buyers compare dense sets of local specialists, established firms, and national providers in the same search results.",
    "Borough and service-area differences make one generic metro message less useful than a clearly segmented acquisition path.",
    "High media costs put more pressure on proof, qualification, and conversion before traffic is scaled.",
  ],
  "los-angeles-ca": [
    "Los Angeles is a wide, fragmented service market where coverage, response time, and location relevance need to be explicit.",
    "Prospects often compare polished competitors, making credible proof and a clear point of difference essential.",
    "Campaigns perform better when landing pages match the service, audience, and part of the metro being targeted.",
  ],
  "chicago-il": [
    "Chicago demand spans the city and a large suburban service area, so geographic qualification needs to happen early.",
    "Established regional competitors raise the importance of authority signals and concrete operating proof.",
    "Seasonality and service economics should influence which search themes and offers receive budget first.",
  ],
  "houston-tx": [
    "Houston's large service footprint rewards clear coverage boundaries and fast mobile lead handling.",
    "Competitive paid traffic makes source quality and booked-opportunity reporting more useful than raw lead volume.",
    "Local pages need to connect market relevance with visible proof instead of relying on city-name repetition.",
  ],
  "phoenix-az": [
    "Phoenix growth creates opportunity across a broad metro, but service-area clarity is necessary to protect lead quality.",
    "Mobile prospects need fast proof, clear next steps, and minimal friction before contacting a provider.",
    "Seasonal demand changes which services and messages deserve the strongest acquisition support.",
  ],
  "philadelphia-pa": [
    "Philadelphia buyers can compare long-established local firms with newer specialists, increasing the value of visible credibility.",
    "City and suburban demand should be segmented so pages and campaigns do not blur distinct service areas.",
    "Strong conversion paths need to explain fit quickly before asking for a sales conversation.",
  ],
  "san-antonio-tx": [
    "San Antonio service demand favors businesses that make local fit, response expectations, and proof easy to evaluate.",
    "A growing competitive set makes reliable attribution important before expanding spend.",
    "Local search and paid acquisition should share the same service priorities and qualification rules.",
  ],
  "san-diego-ca": [
    "San Diego's spread-out metro requires precise service-area and audience targeting.",
    "High buyer expectations make strong proof and polished mobile conversion paths especially important.",
    "Organic and paid programs should be measured against qualified inquiries rather than broad traffic growth.",
  ],
  "dallas-tx": [
    "Dallas-Fort Worth is a multi-city market where service-area pages need a clear hierarchy instead of competing with one another.",
    "Rapid competition for high-value demand makes qualification and source-to-revenue reporting essential.",
    "The strongest pages pair metro relevance with concrete proof, offer clarity, and fast follow-up.",
  ],
  "san-jose-ca": [
    "San Jose buyers tend to expect technical clarity, credible expertise, and a low-friction evaluation path.",
    "Expensive acquisition channels increase the value of conversion improvements before budget expansion.",
    "Specific service and buyer-intent pages can outperform broad agency positioning when they provide real decision support.",
  ],
  "austin-tx": [
    "Austin's mix of fast-growing and established businesses creates demand for both local and B2B acquisition systems.",
    "Sophisticated buyers respond better to specific operating evidence than generic growth claims.",
    "Search, paid media, and follow-up need shared qualification criteria to protect pipeline quality.",
  ],
  "jacksonville-fl": [
    "Jacksonville's broad service footprint makes coverage and response expectations important conversion details.",
    "Mobile local demand rewards pages that establish trust and make the next action obvious quickly.",
    "Channel reporting should separate inexpensive inquiries from economically useful opportunities.",
  ],
  "fort-worth-tx": [
    "Fort Worth needs distinct market positioning even when campaigns also serve the wider Dallas-Fort Worth area.",
    "Local proof and service-area clarity help avoid generic metro messaging.",
    "Lead routing should preserve the source and market context needed to judge opportunity quality.",
  ],
  "columbus-oh": [
    "Columbus combines established local competition with expanding service demand across the metro.",
    "Clear service specialization can be more persuasive than broad full-service claims.",
    "Pages should connect search intent to proof and a measurable follow-up path.",
  ],
  "san-francisco-ca": [
    "San Francisco buyers expect concise differentiation, strong evidence, and a sophisticated digital experience.",
    "High acquisition costs make landing-page and qualification efficiency commercially important.",
    "Specific expertise should be visible before the visitor reaches the inquiry form.",
  ],
  "charlotte-nc": [
    "Charlotte's growth across professional and local services increases competition for high-value search demand.",
    "Regional credibility and clear commercial fit matter when buyers compare local and national providers.",
    "Acquisition reporting should connect channel activity to booked opportunities and pipeline quality.",
  ],
  "indianapolis-in": [
    "Indianapolis service markets reward practical proof, clear coverage, and straightforward offers.",
    "A focused set of high-intent pages can be more effective than broad undifferentiated content.",
    "Fast lead handling and source visibility help turn local demand into measurable pipeline.",
  ],
  "seattle-wa": [
    "Seattle buyers often expect a strong digital experience and evidence of operational competence before contacting a provider.",
    "Specific expertise and credible proof help separate specialists from broad agency alternatives.",
    "Paid and organic acquisition should use the same conversion and qualification standards.",
  ],
  "denver-co": [
    "Denver's competitive regional market rewards clear local relevance without sacrificing specialist positioning.",
    "Buyers need enough proof and process clarity to compare local firms with national providers.",
    "Page and campaign performance should be measured by qualified actions, not visibility alone.",
  ],
  "washington-dc": [
    "Washington buyers often evaluate credibility, specialization, and risk before agreeing to a conversation.",
    "The regional market crosses jurisdictional boundaries, making service-area language and qualification important.",
    "Authority signals and precise offers carry more weight than generic claims of full-service capability.",
  ],
  "baltimore-md": [
    "Baltimore search demand includes both city and surrounding-market intent, requiring clear geographic qualification.",
    "Established local providers make visible trust and service specialization important competitive signals.",
    "HVAC and home-service acquisition should separate urgent, replacement, and research intent before routing leads.",
  ],
  "chula-vista-ca": [
    "Chula Vista demand should be positioned distinctly from broader San Diego targeting where service coverage differs.",
    "Local relevance, mobile speed, and clear next steps matter when prospects compare nearby providers quickly.",
    "Pages need useful market and service context beyond a swapped city name.",
  ],
  "jersey-city-nj": [
    "Jersey City buyers compare local firms with providers across the wider New York metro.",
    "Clear service boundaries and differentiation help prevent the page from reading like a generic New York alternative.",
    "High competition makes proof and conversion efficiency important before traffic is expanded.",
  ],
  "richmond-va": [
    "Richmond is producing the site's clearest current local SEO search signal, so this market deserves deeper supporting content and proof.",
    "Regional service businesses need pages that connect local relevance with commercial fit and measurable follow-up.",
    "Search visibility should be converted with specific expertise, credible evidence, and a direct next step.",
  ],
  "st-louis-mo": [
    "St. Louis buyers often compare established regional firms, making specialization and visible operating proof important.",
    "City and surrounding-county demand should be qualified through clear service-area and offer language.",
    "Thought-leadership positioning works best when it is tied to a concrete acquisition outcome and next step.",
  ],
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
  return cityMarketSignals[location.marketSlug] ?? stateMarketSignals[location.state] ?? defaultSignals;
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

function buildStateHubs(sourceLocations: LocationPage[]): StateHub[] {
  const grouped = sourceLocations.reduce<Record<string, LocationPage[]>>((groups, location) => {
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

export function getStateHubs(): StateHub[] {
  return buildStateHubs(getIndexableLocations());
}

export function getAllStateHubs(): StateHub[] {
  return buildStateHubs(getAllLocations());
}

export function getStateHub(slug: string) {
  return getAllStateHubs().find((hub) => hub.slug === slug || hub.stateCode.toLowerCase() === slug);
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
