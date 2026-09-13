import JsonLd from "@/components/JsonLd";
import PseoPage from "@/components/PseoPage";
import { getIndexableIndustries, getIndustry } from "@/content/industries";
import { getIndexableServices, getService } from "@/content/services";
import { breadcrumbJsonLd, createMetadata, serviceJsonLd } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getIndexableServices().map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return {};
  }

  return createMetadata({
    title: service.title,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    indexable: service.indexable,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  const relatedIndustryLinks = service.relatedIndustries
    .map(getIndustry)
    .filter((industry): industry is NonNullable<typeof industry> => Boolean(industry))
    .map((industry) => ({
      href: `/industries/${industry.slug}`,
      label: industry.name,
    }));

  const fallbackIndustryLinks = getIndexableIndustries()
    .slice(0, 3)
    .map((industry) => ({
      href: `/industries/${industry.slug}`,
      label: industry.name,
    }));

  const relatedLinks = relatedIndustryLinks.length > 0 ? relatedIndustryLinks : fallbackIndustryLinks;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />
      <JsonLd
        data={serviceJsonLd({
          name: service.title,
          description: service.metaDescription,
          path: `/services/${service.slug}`,
        })}
      />
      <PseoPage
        eyebrow={service.eyebrow}
        title={service.heroTitle}
        intro={service.intro}
        sections={[
          {
            title: "Best Fit",
            items: service.fit,
            icon: "target",
          },
          {
            title: "Symptoms We Diagnose",
            items: service.symptoms,
            icon: "compass",
          },
          {
            title: "What Catalyst Builds",
            items: service.deliverables,
            icon: "zap",
          },
          {
            title: "Why It Matters",
            description:
              "PSEO, paid acquisition, conversion pages, and follow-up only compound when they are designed as one acquisition environment.",
            items: [
              "Every page has a defined commercial job",
              "Every channel has a measurable role",
              "Every qualified action has a follow-up path",
            ],
            icon: "shield",
          },
        ]}
        faqs={service.faqs}
        relatedLinks={relatedLinks}
      />
    </>
  );
}
