import JsonLd from "@/components/JsonLd";
import PseoPage from "@/components/PseoPage";
import {
  getIndustryLocalAngles,
  getIndustryLocationFaqs,
  getIndustryMarketPages,
  getLocalMarketSignals,
  getLocalMarketSummary,
} from "@/content/localMarket";
import { getLocation } from "@/content/locations";
import { getIndexableIndustries, getIndustry } from "@/content/industries";
import { breadcrumbJsonLd, createMetadata, faqJsonLd, localServiceJsonLd } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string; market: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getIndustryMarketPages().map((page) => ({
    slug: page.industrySlug,
    market: page.marketSlug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, market } = await params;
  const industry = getIndustry(slug);
  const location = getLocation(market);

  if (!industry || !location) {
    return {};
  }

  return createMetadata({
    title: `${industry.title} in ${location.city}, ${location.stateCode} | Catalyst Influence`,
    description: `${industry.title} in ${location.city}, ${location.stateCode}. Catalyst connects local search demand, proof, paid acquisition, conversion pages, and follow-up for ${industry.name.toLowerCase()}.`,
    path: `/industries/${industry.slug}/${location.marketSlug}`,
    indexable: industry.indexable && location.indexable,
  });
}

export default async function IndustryMarketPage({ params }: Props) {
  const { slug, market } = await params;
  const industry = getIndustry(slug);
  const location = getLocation(market);

  if (!industry || !location) {
    notFound();
  }

  const localAngles = getIndustryLocalAngles(industry);
  const localFaqs = getIndustryLocationFaqs(industry, location);
  const marketSignals = getLocalMarketSignals(location);
  const relatedIndustries = getIndexableIndustries()
    .filter((relatedIndustry) => relatedIndustry.slug !== industry.slug)
    .slice(0, 3)
    .map((relatedIndustry) => ({
      href: `/industries/${relatedIndustry.slug}/${location.marketSlug}`,
      label: `${relatedIndustry.title} in ${location.city}, ${location.stateCode}`,
    }));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: industry.name, path: `/industries/${industry.slug}` },
          { name: `${location.city}, ${location.stateCode}`, path: `/industries/${industry.slug}/${location.marketSlug}` },
        ])}
      />
      <JsonLd data={faqJsonLd([...industry.faqs, ...localFaqs])} />
      <JsonLd
        data={localServiceJsonLd({
          city: location.city,
          state: location.state,
          description: `${industry.title} in ${location.city}, ${location.stateCode}`,
          path: `/industries/${industry.slug}/${location.marketSlug}`,
          services: [
            `${industry.title} in ${location.city}, ${location.stateCode}`,
            ...location.localServices.slice(0, 4),
          ],
        })}
      />
      <PseoPage
        eyebrow={`${industry.name} in ${location.city}, ${location.stateCode}`}
        title={`${industry.heroTitle} Built for ${location.city}.`}
        intro={`${industry.intro} ${getLocalMarketSummary(location)}`}
        sections={[
          {
            title: `Local demand factors for ${industry.name.toLowerCase()}`,
            description: `${location.city} requires more than swapping a city name into a generic industry page. The page needs market context, buyer urgency, proof, and follow-up logic that match the local search environment.`,
            items: [...localAngles, ...marketSignals.slice(0, 2)],
            icon: "target",
          },
          {
            title: "Acquisition problems",
            items: industry.acquisitionProblems,
            icon: "compass",
          },
          {
            title: "System priorities",
            items: industry.systemPriorities,
            icon: "shield",
          },
          {
            title: "First 90 days",
            items: [
              `Map ${location.city} search demand and competitor proof gaps`,
              `Deploy ${industry.name.toLowerCase()} pages and conversion paths around high-intent queries`,
              "Measure qualified actions, speed-to-lead, and source quality before scaling",
            ],
            icon: "zap",
          },
        ]}
        faqs={[...localFaqs, ...industry.faqs]}
        relatedLinks={[
          { href: `/locations/${location.marketSlug}`, label: `${location.city}, ${location.stateCode} location page` },
          { href: `/industries/${industry.slug}`, label: industry.title },
          { href: `/customer-acquisition/${location.marketSlug}`, label: `Customer Acquisition Agency in ${location.city}, ${location.stateCode}` },
          ...relatedIndustries,
        ]}
        websiteSystem={{
          audience: industry.name,
          market: `${location.city}, ${location.stateCode}`,
        }}
      />
    </>
  );
}
