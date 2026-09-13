import LandingPage from "@/components/LandingPage";
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const formattedCity = city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  return {
    title: `Digital Marketing & SEO Agency in ${formattedCity} | Catalyst Influence`,
    description: `Partnering with industry leaders in ${formattedCity} to blend behavioral science and premium design into experiences that establish trust and drive conversions.`,
  };
}

export async function generateStaticParams() {
  const targetCities = [
    "new-york", "los-angeles", "chicago", "houston", "phoenix", 
    "philadelphia", "san-antonio", "san-diego", "dallas", "san-jose", 
    "austin", "jacksonville", "fort-worth", "columbus", "san-francisco", 
    "charlotte", "indianapolis", "seattle", "denver", "washington-dc", 
    "boston", "el-paso", "nashville", "detroit", "oklahoma-city", 
    "portland", "las-vegas", "memphis", "louisville", "baltimore", 
    "milwaukee", "albuquerque", "tucson", "fresno", "mesa", 
    "sacramento", "atlanta", "kansas-city", "colorado-springs", "miami", 
    "raleigh", "omaha", "long-beach", "virginia-beach", "oakland", 
    "minneapolis", "tulsa", "arlington", "tampa", "new-orleans", 
    "wichita", "cleveland", "bakersfield", "aurora", "anaheim", 
    "honolulu", "santa-ana", "riverside", "corpus-christi", "lexington", 
    "stockton", "henderson", "saint-paul", "st-louis", "cincinnati", 
    "pittsburgh", "greensboro", "anchorage", "plano", "lincoln", 
    "orlando", "irvine", "newark", "toledo", "durham", 
    "chula-vista", "fort-wayne", "jersey-city", "st-petersburg", "laredo", 
    "madison", "chandler", "buffalo", "lubbock", "scottsdale", 
    "reno", "glendale", "gilbert", "winston-salem", "north-las-vegas", 
    "norfolk", "chesapeake", "garland", "irving", "hialeah", 
    "fremont", "boise", "richmond", "baton-rouge", "spokane", "des-moines"
  ];

  return targetCities.map((city) => ({
    city: city,
  }));
}

export default async function LocationPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  return <LandingPage city={city} />;
}
