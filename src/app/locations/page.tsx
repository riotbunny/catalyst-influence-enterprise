import Background from "@/components/Background";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import RevealOnScroll from "@/components/RevealOnScroll";
import { getStateHubs } from "@/content/localMarket";
import { getIndexableLocations } from "@/content/locations";
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo";
import { ArrowRight, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = createMetadata({
  title: "Customer Acquisition Agency by City | Catalyst Influence",
  description:
    "Explore customer acquisition strategy, local SEO, paid media, conversion, and follow-up support for established service businesses in priority U.S. markets.",
  path: "/locations",
});

export default function LocationsPage() {
  const locations = getIndexableLocations();
  const stateHubs = getStateHubs();

  return (
    <main className="min-h-screen">
      <RevealOnScroll />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Locations", path: "/locations" }])} />
      <Background />
      <Navbar />

      <section className="relative overflow-hidden pb-20 pt-36 sm:pb-28 sm:pt-44">
        <div className="executive-grid absolute inset-0 -z-10" />
        <div className="site-shell">
          <p className="page-label mb-6">Priority markets</p>
          <h1 className="max-w-5xl font-display text-5xl font-normal leading-[0.98] text-white sm:text-6xl lg:text-7xl">
            Local acquisition built around markets that can support growth.
          </h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-gray-400 sm:text-lg">
            Catalyst focuses indexation and content depth on priority markets where demand, service coverage, buyer intent, and commercial opportunity justify dedicated acquisition architecture.
          </p>
        </div>
      </section>

      <section className="bg-brand-paper py-20 text-[#18201d] sm:py-28">
        <div className="site-shell">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="page-label mb-5">Market directory</p>
              <h2 className="section-display">Focused coverage, not city-name swaps.</h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[#5b6761]">
              Priority pages receive market-specific signals, useful service context, clean internal paths, and conversion logic that reflects how local buyers compare providers.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-2 border-y border-[#d2dad5] py-6">
            {stateHubs.map((hub) => (
              <Link key={hub.slug} href={`/locations/states/${hub.slug}`} className="rounded-md border border-[#c8d1cb] bg-white px-4 py-2 text-sm font-bold text-[#3d4b45] transition-colors hover:border-brand-forest hover:text-brand-forest">
                {hub.state} <span className="ml-1 text-[#8a948f]">{hub.locations.length}</span>
              </Link>
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((location, index) => (
              <Link key={location.marketSlug} href={`/locations/${location.marketSlug}`} data-reveal="card" data-reveal-delay={index % 4} className="premium-hover-card light-panel group rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <MapPin className="h-5 w-5 text-brand-forest" />
                  <ArrowRight className="h-4 w-4 text-brand-forest transition-transform group-hover:translate-x-1" />
                </div>
                <h2 className="mt-7 font-display text-3xl">{location.city}</h2>
                <p className="mt-1 text-xs font-extrabold uppercase text-brand-coral">{location.state}</p>
                <p className="mt-4 text-sm leading-7 text-[#5b6761]">Customer acquisition, local SEO, paid demand, conversion, and follow-up for established service businesses.</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
