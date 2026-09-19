export type LocationPage = {
  slug: string;
  city: string;
  state: string;
  stateCode: string;
  marketSlug: string;
  title: string;
  metaDescription: string;
  marketAngle: string;
  localBuyerIntent: string;
  localSearchFocus: string[];
  localServices: string[];
  serviceAreaCopy: string;
  priorityServices: string[];
  priorityIndustries: string[];
  priority: number;
  indexable: boolean;
  lastModified: string;
};

type CityRecord = {
  slug: string;
  city: string;
  state: string;
};

const majorCities: CityRecord[] = [
  { slug: "new-york", city: "New York", state: "New York" },
  { slug: "los-angeles", city: "Los Angeles", state: "California" },
  { slug: "chicago", city: "Chicago", state: "Illinois" },
  { slug: "houston", city: "Houston", state: "Texas" },
  { slug: "phoenix", city: "Phoenix", state: "Arizona" },
  { slug: "philadelphia", city: "Philadelphia", state: "Pennsylvania" },
  { slug: "san-antonio", city: "San Antonio", state: "Texas" },
  { slug: "san-diego", city: "San Diego", state: "California" },
  { slug: "dallas", city: "Dallas", state: "Texas" },
  { slug: "san-jose", city: "San Jose", state: "California" },
  { slug: "austin", city: "Austin", state: "Texas" },
  { slug: "jacksonville", city: "Jacksonville", state: "Florida" },
  { slug: "fort-worth", city: "Fort Worth", state: "Texas" },
  { slug: "columbus", city: "Columbus", state: "Ohio" },
  { slug: "san-francisco", city: "San Francisco", state: "California" },
  { slug: "charlotte", city: "Charlotte", state: "North Carolina" },
  { slug: "indianapolis", city: "Indianapolis", state: "Indiana" },
  { slug: "seattle", city: "Seattle", state: "Washington" },
  { slug: "denver", city: "Denver", state: "Colorado" },
  { slug: "washington-dc", city: "Washington DC", state: "District of Columbia" },
  { slug: "boston", city: "Boston", state: "Massachusetts" },
  { slug: "el-paso", city: "El Paso", state: "Texas" },
  { slug: "nashville", city: "Nashville", state: "Tennessee" },
  { slug: "detroit", city: "Detroit", state: "Michigan" },
  { slug: "oklahoma-city", city: "Oklahoma City", state: "Oklahoma" },
  { slug: "portland", city: "Portland", state: "Oregon" },
  { slug: "las-vegas", city: "Las Vegas", state: "Nevada" },
  { slug: "memphis", city: "Memphis", state: "Tennessee" },
  { slug: "louisville", city: "Louisville", state: "Kentucky" },
  { slug: "baltimore", city: "Baltimore", state: "Maryland" },
  { slug: "milwaukee", city: "Milwaukee", state: "Wisconsin" },
  { slug: "albuquerque", city: "Albuquerque", state: "New Mexico" },
  { slug: "tucson", city: "Tucson", state: "Arizona" },
  { slug: "fresno", city: "Fresno", state: "California" },
  { slug: "mesa", city: "Mesa", state: "Arizona" },
  { slug: "sacramento", city: "Sacramento", state: "California" },
  { slug: "atlanta", city: "Atlanta", state: "Georgia" },
  { slug: "kansas-city", city: "Kansas City", state: "Missouri" },
  { slug: "colorado-springs", city: "Colorado Springs", state: "Colorado" },
  { slug: "miami", city: "Miami", state: "Florida" },
  { slug: "raleigh", city: "Raleigh", state: "North Carolina" },
  { slug: "omaha", city: "Omaha", state: "Nebraska" },
  { slug: "long-beach", city: "Long Beach", state: "California" },
  { slug: "virginia-beach", city: "Virginia Beach", state: "Virginia" },
  { slug: "oakland", city: "Oakland", state: "California" },
  { slug: "minneapolis", city: "Minneapolis", state: "Minnesota" },
  { slug: "tulsa", city: "Tulsa", state: "Oklahoma" },
  { slug: "arlington", city: "Arlington", state: "Texas" },
  { slug: "tampa", city: "Tampa", state: "Florida" },
  { slug: "new-orleans", city: "New Orleans", state: "Louisiana" },
  { slug: "wichita", city: "Wichita", state: "Kansas" },
  { slug: "cleveland", city: "Cleveland", state: "Ohio" },
  { slug: "bakersfield", city: "Bakersfield", state: "California" },
  { slug: "aurora", city: "Aurora", state: "Colorado" },
  { slug: "anaheim", city: "Anaheim", state: "California" },
  { slug: "honolulu", city: "Honolulu", state: "Hawaii" },
  { slug: "santa-ana", city: "Santa Ana", state: "California" },
  { slug: "riverside", city: "Riverside", state: "California" },
  { slug: "corpus-christi", city: "Corpus Christi", state: "Texas" },
  { slug: "lexington", city: "Lexington", state: "Kentucky" },
  { slug: "stockton", city: "Stockton", state: "California" },
  { slug: "henderson", city: "Henderson", state: "Nevada" },
  { slug: "saint-paul", city: "Saint Paul", state: "Minnesota" },
  { slug: "st-louis", city: "St. Louis", state: "Missouri" },
  { slug: "cincinnati", city: "Cincinnati", state: "Ohio" },
  { slug: "pittsburgh", city: "Pittsburgh", state: "Pennsylvania" },
  { slug: "greensboro", city: "Greensboro", state: "North Carolina" },
  { slug: "anchorage", city: "Anchorage", state: "Alaska" },
  { slug: "plano", city: "Plano", state: "Texas" },
  { slug: "lincoln", city: "Lincoln", state: "Nebraska" },
  { slug: "orlando", city: "Orlando", state: "Florida" },
  { slug: "irvine", city: "Irvine", state: "California" },
  { slug: "newark", city: "Newark", state: "New Jersey" },
  { slug: "toledo", city: "Toledo", state: "Ohio" },
  { slug: "durham", city: "Durham", state: "North Carolina" },
  { slug: "chula-vista", city: "Chula Vista", state: "California" },
  { slug: "fort-wayne", city: "Fort Wayne", state: "Indiana" },
  { slug: "jersey-city", city: "Jersey City", state: "New Jersey" },
  { slug: "st-petersburg", city: "St. Petersburg", state: "Florida" },
  { slug: "laredo", city: "Laredo", state: "Texas" },
  { slug: "madison", city: "Madison", state: "Wisconsin" },
  { slug: "chandler", city: "Chandler", state: "Arizona" },
  { slug: "buffalo", city: "Buffalo", state: "New York" },
  { slug: "lubbock", city: "Lubbock", state: "Texas" },
  { slug: "scottsdale", city: "Scottsdale", state: "Arizona" },
  { slug: "reno", city: "Reno", state: "Nevada" },
  { slug: "glendale", city: "Glendale", state: "Arizona" },
  { slug: "gilbert", city: "Gilbert", state: "Arizona" },
  { slug: "winston-salem", city: "Winston-Salem", state: "North Carolina" },
  { slug: "north-las-vegas", city: "North Las Vegas", state: "Nevada" },
  { slug: "norfolk", city: "Norfolk", state: "Virginia" },
  { slug: "chesapeake", city: "Chesapeake", state: "Virginia" },
  { slug: "garland", city: "Garland", state: "Texas" },
  { slug: "irving", city: "Irving", state: "Texas" },
  { slug: "hialeah", city: "Hialeah", state: "Florida" },
  { slug: "fremont", city: "Fremont", state: "California" },
  { slug: "boise", city: "Boise", state: "Idaho" },
  { slug: "richmond", city: "Richmond", state: "Virginia" },
  { slug: "baton-rouge", city: "Baton Rouge", state: "Louisiana" },
  { slug: "spokane", city: "Spokane", state: "Washington" },
  { slug: "des-moines", city: "Des Moines", state: "Iowa" },
];

export const locations: LocationPage[] = majorCities.map((location, index) => ({
  ...location,
  stateCode: getStateCode(location.state),
  marketSlug: buildMarketSlug(location),
  title: `Customer Acquisition Agency in ${location.city}, ${getStateCode(location.state)} | Catalyst Influence`,
  metaDescription: `Customer acquisition agency in ${location.city}, ${getStateCode(location.state)} for established service businesses. Catalyst connects local SEO, lead generation, paid media, landing pages, automation, and lead attribution.`,
  marketAngle: buildMarketAngle(location),
  localBuyerIntent: buildBuyerIntent(location),
  localSearchFocus: buildSearchFocus(location),
  localServices: buildLocalServices(location),
  serviceAreaCopy: buildServiceAreaCopy(location),
  priorityServices: ["customer-acquisition-system", "programmatic-seo", "conversion-architecture"],
  priorityIndustries: ["law-firms", "home-services", "dental-practices"],
  priority: index < 20 ? 0.7 : index < 50 ? 0.6 : 0.5,
  indexable: true,
  lastModified: "2026-09-18",
}));

export function getLocation(slug: string) {
  return locations.find((location) => location.slug === slug || location.marketSlug === slug);
}

export function getIndexableLocations() {
  return locations.filter((location) => location.indexable);
}

function buildMarketSlug(location: CityRecord) {
  const stateCode = getStateCode(location.state).toLowerCase();

  if (location.slug === "washington-dc") {
    return location.slug;
  }

  return `${location.slug}-${stateCode}`;
}

function buildMarketAngle(location: CityRecord) {
  const stateAngle = getStateAngle(location.state);

  return `${location.city} service businesses compete for buyers who compare options quickly across search, paid media, reviews, and referral signals. ${stateAngle} Catalyst connects local SEO, programmatic SEO, paid acquisition, landing page proof, automated follow-up, and source attribution into one customer acquisition system built for qualified inquiries.`;
}

function buildBuyerIntent(location: CityRecord) {
  return `In ${location.city}, the valuable search terms are rarely just broad marketing phrases. They are commercial searches around customer acquisition agency, lead generation, local SEO, programmatic SEO, paid acquisition, landing page conversion, and marketing automation for established service businesses.`;
}

function buildSearchFocus(location: CityRecord) {
  return [
    `customer acquisition agency in ${location.city}`,
    `lead generation for service businesses in ${location.city}`,
    `programmatic SEO agency in ${location.city}`,
    `local SEO and paid acquisition in ${location.city}`,
    `${location.city} conversion-focused landing pages`,
    `${location.city} marketing automation and lead follow-up`,
  ];
}

function buildLocalServices(location: CityRecord) {
  return [
    `${location.city} customer acquisition system design`,
    `${location.city} programmatic SEO and local landing page architecture`,
    `${location.city} paid acquisition strategy for high-value services`,
    `${location.city} conversion architecture for landing pages and forms`,
    `${location.city} CRM follow-up and source attribution planning`,
  ];
}

function buildServiceAreaCopy(location: CityRecord) {
  return `Catalyst serves established businesses in ${location.city} and the surrounding ${location.state} market when there is proven demand, enough customer value to support serious acquisition investment, and an operator who wants SEO, paid traffic, conversion, and follow-up measured as one system.`;
}

function getStateAngle(state: string) {
  const stateAngles: Record<string, string> = {
    California: "Dense competition, high ad costs, and sophisticated buyers make trust architecture and long-tail search coverage especially important.",
    Texas: "Fast-growing service markets create opportunity, but they also reward companies that can separate qualified demand from noisy lead volume.",
    Florida: "Local search demand is broad and competitive, so service businesses need pages and follow-up systems that turn intent into booked conversations.",
    "New York": "Competitive search results and high buyer expectations make proof, positioning, and page quality critical before prospects inquire.",
    Illinois: "Established local competitors and regional search demand require a clearer acquisition system than disconnected campaigns can provide.",
    Arizona: "Growth-market competition makes it important to capture search intent early and convert quickly on mobile.",
    Nevada: "Service buyers compare quickly across crowded local options, which makes landing page trust and follow-up speed central.",
    "North Carolina": "Growing business corridors reward companies with strong local search coverage and clear conversion paths.",
    Virginia: "Multi-city service areas need structured local pages and attribution that show which markets create quality opportunities.",
    Colorado: "Competitive regional service demand requires sharper local relevance, proof, and paid traffic discipline.",
    Ohio: "Mature service markets reward companies that can improve lead quality instead of chasing raw volume.",
    Pennsylvania: "Established competitors make it important to show authority quickly across SEO pages, ads, and follow-up.",
  };

  return stateAngles[state] ?? "Local service buyers reward the companies that make expertise, proof, offer clarity, and response speed visible before the first conversation.";
}

export function getStateCode(state: string) {
  const stateCodes: Record<string, string> = {
    Alabama: "AL",
    Alaska: "AK",
    Arizona: "AZ",
    Arkansas: "AR",
    California: "CA",
    Colorado: "CO",
    Connecticut: "CT",
    Delaware: "DE",
    "District of Columbia": "DC",
    Florida: "FL",
    Georgia: "GA",
    Hawaii: "HI",
    Idaho: "ID",
    Illinois: "IL",
    Indiana: "IN",
    Iowa: "IA",
    Kansas: "KS",
    Kentucky: "KY",
    Louisiana: "LA",
    Maine: "ME",
    Maryland: "MD",
    Massachusetts: "MA",
    Michigan: "MI",
    Minnesota: "MN",
    Mississippi: "MS",
    Missouri: "MO",
    Montana: "MT",
    Nebraska: "NE",
    Nevada: "NV",
    "New Hampshire": "NH",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "New York": "NY",
    "North Carolina": "NC",
    "North Dakota": "ND",
    Ohio: "OH",
    Oklahoma: "OK",
    Oregon: "OR",
    Pennsylvania: "PA",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    Tennessee: "TN",
    Texas: "TX",
    Utah: "UT",
    Vermont: "VT",
    Virginia: "VA",
    Washington: "WA",
    "West Virginia": "WV",
    Wisconsin: "WI",
    Wyoming: "WY",
  };

  return stateCodes[state] ?? state;
}
