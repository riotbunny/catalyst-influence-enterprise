import { generateMarketStaticParams, renderMarketIntentPage } from "@/components/MarketIntentPage";
import { getLocation } from "@/content/locations";
import { getMarketIntent } from "@/content/marketIntents";
import { createMetadata } from "@/lib/seo";
import type { Metadata } from "next";

const intentSlug = "lead-generation";

type Props = {
  params: Promise<{ market: string }>;
};

export const dynamicParams = false;

export const generateStaticParams = generateMarketStaticParams;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { market } = await params;
  const intent = getMarketIntent(intentSlug);
  const location = getLocation(market);

  if (!intent || !location) {
    return {};
  }

  return createMetadata({
    title: `${intent.title} in ${location.city}, ${location.stateCode} | Catalyst Influence`,
    description: `${intent.title} in ${location.city}, ${location.stateCode} for established service businesses. Catalyst connects search visibility, paid acquisition, landing pages, follow-up, and attribution.`,
    path: `/${intent.slug}/${location.marketSlug}`,
    indexable: location.indexable,
  });
}

export default async function LeadGenerationMarketPage({ params }: Props) {
  const { market } = await params;

  return renderMarketIntentPage({ intentSlug, market });
}
