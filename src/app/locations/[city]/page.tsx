import JsonLd from "@/components/JsonLd";
import LandingPage from "@/components/LandingPage";
import { getExecutiveFaqs } from "@/content/faqs";
import { getIndexableIndustries } from "@/content/industries";
import { getLocalMarketSignals, getLocalMarketSummary, getLocationFaqs } from "@/content/localMarket";
import { getIndexableLocations, getLocation } from "@/content/locations";
import { marketIntents } from "@/content/marketIntents";
import { breadcrumbJsonLd, createMetadata, faqJsonLd, localServiceJsonLd } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ city: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getIndexableLocations().map((location) => ({
    city: location.marketSlug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const location = getLocation(city);

  if (!location) {
    return {};
  }

  return createMetadata({
    title: location.title,
    description: location.metaDescription,
    path: `/locations/${location.marketSlug}`,
    indexable: location.indexable,
  });
}

export default async function LocationPage({ params }: Props) {
  const { city } = await params;
  const location = getLocation(city);

  if (!location) {
    notFound();
  }

  const relatedCityServiceLinks = marketIntents.map((intent) => ({
    href: `/${intent.slug}/${location.marketSlug}`,
    label: `${intent.title} in ${location.city}, ${location.stateCode}`,
  })).concat(
    getIndexableIndustries().map((industry) => ({
      href: `/industries/${industry.slug}/${location.marketSlug}`,
      label: `${industry.title} in ${location.city}, ${location.stateCode}`,
    })),
  );
  const locationFaqs = getLocationFaqs(location);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
          { name: location.city, path: `/locations/${location.marketSlug}` },
        ])}
      />
      <JsonLd data={faqJsonLd([...getExecutiveFaqs(location.city), ...locationFaqs])} />
      <JsonLd
        data={localServiceJsonLd({
          city: location.city,
          state: location.state,
          description: location.metaDescription,
          path: `/locations/${location.marketSlug}`,
          services: location.localServices,
        })}
      />
      <LandingPage
        city={location.city}
        state={location.state}
        marketAngle={location.marketAngle}
        localBuyerIntent={location.localBuyerIntent}
        localSearchFocus={location.localSearchFocus}
        localServices={location.localServices}
        serviceAreaCopy={location.serviceAreaCopy}
        localMarketSummary={getLocalMarketSummary(location)}
        localMarketSignals={getLocalMarketSignals(location)}
        extraFaqs={locationFaqs}
        relatedCityServiceLinks={relatedCityServiceLinks}
      />
    </>
  );
}
