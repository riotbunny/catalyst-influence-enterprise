export type LocationPage = {
  slug: string;
  city: string;
  state: string;
  title: string;
  metaDescription: string;
  marketAngle: string;
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
  title: `Customer Acquisition Agency in ${location.city}`,
  metaDescription: `Catalyst Influence helps established ${location.city} service businesses build predictable customer acquisition systems across SEO, paid media, conversion, and follow-up.`,
  marketAngle: `${location.city} service businesses compete in a market where buyers compare quickly and trust signals matter immediately. Catalyst connects local search visibility, paid acquisition, landing page proof, automated follow-up, and measurement into one customer acquisition system.`,
  priorityServices: ["customer-acquisition-system", "programmatic-seo", "conversion-architecture"],
  priorityIndustries: ["law-firms", "home-services", "dental-practices"],
  priority: index < 20 ? 0.7 : index < 50 ? 0.6 : 0.5,
  indexable: true,
  lastModified: "2026-09-13",
}));

export function getLocation(slug: string) {
  return locations.find((location) => location.slug === slug);
}

export function getIndexableLocations() {
  return locations.filter((location) => location.indexable);
}
