import JsonLd from "@/components/JsonLd";
import LandingPage from "@/components/LandingPage";
import { getIndexableLocations, getLocation } from "@/content/locations";
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ city: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getIndexableLocations().map((location) => ({
    city: location.slug,
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
    path: `/locations/${location.slug}`,
    indexable: location.indexable,
  });
}

export default async function LocationPage({ params }: Props) {
  const { city } = await params;
  const location = getLocation(city);

  if (!location) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
          { name: location.city, path: `/locations/${location.slug}` },
        ])}
      />
      <LandingPage city={location.city} state={location.state} marketAngle={location.marketAngle} />
    </>
  );
}
