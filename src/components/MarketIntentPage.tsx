import JsonLd from "@/components/JsonLd";
import PseoPage from "@/components/PseoPage";
import { getExecutiveFaqs } from "@/content/faqs";
import { getLocalMarketSignals, getLocalMarketSummary } from "@/content/localMarket";
import { getIndexableLocations, getLocation } from "@/content/locations";
import { getMarketIntent, marketIntents } from "@/content/marketIntents";
import { breadcrumbJsonLd, faqJsonLd, localServiceJsonLd } from "@/lib/seo";
import { notFound } from "next/navigation";

export function generateMarketStaticParams() {
  return getIndexableLocations().map((location) => ({
    market: location.marketSlug,
  }));
}

export async function renderMarketIntentPage({
  intentSlug,
  market,
}: {
  intentSlug: string;
  market: string;
}) {
  const intent = getMarketIntent(intentSlug);
  const location = getLocation(market);

  if (!intent || !location) {
    notFound();
  }

  const faqs = [
    {
      question: `Do you offer ${intent.buyerPhrase} support in ${location.city}?`,
      answer: `Yes. Catalyst supports established service businesses in ${location.city}, ${location.stateCode} with ${intent.buyerPhrase} strategy when the business has proven demand, meaningful customer value, and enough operational capacity to handle more qualified opportunities.`,
    },
    {
      question: `What makes ${intent.buyerPhrase} different in ${location.city}?`,
      answer: `${location.city} buyers compare providers quickly across search results, ads, reviews, landing pages, and response speed. Catalyst connects those touchpoints so the page, traffic source, follow-up, and reporting all support the same commercial outcome.`,
    },
    ...getExecutiveFaqs(location.city).slice(2, 6),
  ];
  const marketSignals = getLocalMarketSignals(location);

  const siblingIntentLinks = marketIntents
    .filter((relatedIntent) => relatedIntent.slug !== intent.slug)
    .map((relatedIntent) => ({
      href: `/${relatedIntent.slug}/${location.marketSlug}`,
      label: `${relatedIntent.title} in ${location.city}, ${location.stateCode}`,
    }));

  const nearbyMarketLinks = getIndexableLocations()
    .filter((relatedLocation) => relatedLocation.marketSlug !== location.marketSlug)
    .slice(0, 6)
    .map((relatedLocation) => ({
      href: `/${intent.slug}/${relatedLocation.marketSlug}`,
      label: `${intent.title} in ${relatedLocation.city}, ${relatedLocation.stateCode}`,
    }));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: intent.label, path: `/${intent.slug}/${location.marketSlug}` },
          { name: `${location.city}, ${location.stateCode}`, path: `/${intent.slug}/${location.marketSlug}` },
        ])}
      />
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd
        data={localServiceJsonLd({
          city: location.city,
          state: location.state,
          description: intent.metaDescription,
          path: `/${intent.slug}/${location.marketSlug}`,
          services: [
            `${intent.title} in ${location.city}, ${location.stateCode}`,
            ...location.localServices.slice(0, 4),
          ],
        })}
      />
      <PseoPage
        eyebrow={`${location.city}, ${location.stateCode} ${intent.label}`}
        title={`${intent.heroTitle} For ${location.city} service businesses.`}
        intro={`${intent.intro} In ${location.city}, the acquisition path has to account for local search intent, paid traffic competition, visible proof, mobile conversion, and speed-to-lead after the first qualified action.`}
        sections={[
          {
            title: `Why ${location.city} buyers matter`,
            description: getLocalMarketSummary(location),
            items: [...location.localSearchFocus.slice(0, 3), ...marketSignals.slice(0, 2)],
            icon: "target",
          },
          {
            title: "Who this is built for",
            items: intent.fit,
            icon: "shield",
          },
          {
            title: "What Catalyst builds",
            items: intent.deliverables,
            icon: "zap",
          },
          {
            title: "Local acquisition system",
            description: location.serviceAreaCopy,
            items: [
              "Search visibility tied to high-trust landing pages",
              "Paid acquisition paths aligned with buyer intent",
              "Follow-up and attribution planned before scaling volume",
            ],
            icon: "compass",
          },
        ]}
        faqs={faqs}
        relatedLinks={[
          { href: `/locations/${location.marketSlug}`, label: `${location.city}, ${location.stateCode} customer acquisition page` },
          ...siblingIntentLinks,
          ...nearbyMarketLinks,
        ]}
      />
    </>
  );
}
