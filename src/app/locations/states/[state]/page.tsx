import Background from "@/components/Background";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import RevealOnScroll from "@/components/RevealOnScroll";
import { getAllStateHubs, getLocalMarketSignals, getStateHub } from "@/content/localMarket";
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

type Props = {
  params: Promise<{ state: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllStateHubs().map((hub) => ({ state: hub.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state } = await params;
  const hub = getStateHub(state);

  if (!hub) {
    return {};
  }

  return createMetadata({
    title: `Customer Acquisition Agency in ${hub.state} | Catalyst Influence`,
    description: `Customer acquisition, lead generation, and local SEO strategy for established service businesses across ${hub.state}.`,
    path: `/locations/states/${hub.slug}`,
    indexable: hub.locations.some((location) => location.indexable),
  });
}

export default async function StateLocationPage({ params }: Props) {
  const { state } = await params;
  const hub = getStateHub(state);

  if (!hub) {
    notFound();
  }

  const signals = getLocalMarketSignals(hub.locations[0]);
  const visibleLocations = hub.locations.some((location) => location.indexable)
    ? hub.locations.filter((location) => location.indexable)
    : hub.locations;

  return (
    <main className="min-h-screen">
      <RevealOnScroll />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
          { name: hub.state, path: `/locations/states/${hub.slug}` },
        ])}
      />
      <Background />
      <Navbar />

      <section className="relative overflow-hidden pb-20 pt-36 sm:pb-28 sm:pt-44">
        <div className="executive-grid absolute inset-0 -z-10" />
        <div className="site-shell">
          <p className="page-label mb-6">{hub.stateCode} market portfolio</p>
          <h1 className="max-w-5xl font-display text-5xl font-normal leading-[0.98] text-white sm:text-6xl lg:text-7xl">
            Customer acquisition strategy across {hub.state}.
          </h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-gray-400 sm:text-lg">
            A focused market hub connecting service-area intelligence, buyer-intent pages, local SEO, and conversion strategy across {hub.state}.
          </p>
        </div>
      </section>

      <section className="bg-brand-paper py-20 text-[#18201d] sm:py-28">
        <div className="site-shell">
          <div className="mb-12 grid gap-4 md:grid-cols-3">
            {signals.map((signal) => (
              <div key={signal} className="light-panel premium-hover-card rounded-lg p-5 text-sm leading-7 text-[#52605a]">
                {signal}
              </div>
            ))}
          </div>

          <div className="mb-10 max-w-3xl">
            <p className="page-label mb-5">Active markets</p>
            <h2 className="section-display">Where Catalyst builds local advantage.</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleLocations.map((location, index) => (
              <Link
                key={location.marketSlug}
                href={`/locations/${location.marketSlug}`}
                data-reveal="card"
                data-reveal-delay={index % 4}
                className="light-panel premium-hover-card group rounded-lg p-6"
              >
                <MapPin className="mb-5 h-5 w-5 text-brand-forest" />
                <h2 className="font-display text-2xl text-[#18201d]">{location.city}</h2>
                <p className="mt-1 text-sm font-bold uppercase text-[#76817c]">{location.stateCode}</p>
                <p className="mt-4 text-sm leading-7 text-[#5b6761]">
                  Customer acquisition, lead generation, and local SEO strategy for {location.city} service businesses.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase text-brand-forest">
                  View city page <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
