import JsonLd from "@/components/JsonLd";
import PseoPage from "@/components/PseoPage";
import { getIndexableIndustries, getIndustry } from "@/content/industries";
import { getIndexableLocations } from "@/content/locations";
import { getService } from "@/content/services";
import { breadcrumbJsonLd, createMetadata, faqJsonLd } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getIndexableIndustries().map((industry) => ({
    slug: industry.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);

  if (!industry) {
    return {};
  }

  return createMetadata({
    title: industry.title,
    description: industry.metaDescription,
    path: `/industries/${industry.slug}`,
    indexable: industry.indexable,
  });
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustry(slug);

  if (!industry) {
    notFound();
  }

  const relatedLinks = industry.recommendedServices
    .map(getService)
    .filter((service): service is NonNullable<typeof service> => Boolean(service))
    .map((service) => ({
      href: `/services/${service.slug}`,
      label: service.title,
    }));
  const priorityMarketLinks = getIndexableLocations()
    .slice(0, 10)
    .map((location) => ({
      href: `/industries/${industry.slug}/${location.marketSlug}`,
      label: `${industry.title} in ${location.city}, ${location.stateCode}`,
    }));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: industry.name, path: `/industries/${industry.slug}` },
        ])}
      />
      <JsonLd data={faqJsonLd(industry.faqs)} />
      <PseoPage
        eyebrow={`${industry.name} Growth System`}
        title={industry.heroTitle}
        intro={industry.intro}
        sections={[
          {
            title: "Acquisition Problems",
            items: industry.acquisitionProblems,
            icon: "target",
          },
          {
            title: "System Priorities",
            items: industry.systemPriorities,
            icon: "shield",
          },
          {
            title: "The Catalyst Approach",
            description:
              "We start with the commercial path before choosing the channel mix, then build the pages, campaigns, and follow-up required to make that path measurable.",
            items: [
              "Map demand by buyer intent and economic value",
              "Build page structures that answer real objections",
              "Connect acquisition to follow-up and reporting",
            ],
            icon: "compass",
          },
          {
            title: "First 90 Days",
            items: [
              "Diagnose where prospects are currently being lost",
              "Deploy the highest-leverage acquisition and conversion assets",
              "Use early behavioral data to scale what produces qualified opportunities",
            ],
            icon: "zap",
          },
        ]}
        faqs={industry.faqs}
        relatedLinks={[...relatedLinks, ...priorityMarketLinks]}
      />
    </>
  );
}
