import Background from "@/components/Background";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import RevealOnScroll from "@/components/RevealOnScroll";
import { getStateHubs } from "@/content/localMarket";
import { getIndexableLocations } from "@/content/locations";
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";

export const metadata: Metadata = createMetadata({
  title: "Customer Acquisition Agency Locations | Major U.S. City PSEO Pages",
  description:
    "Browse Catalyst Influence customer acquisition, programmatic SEO, local SEO, paid acquisition, and conversion architecture pages for major U.S. cities.",
  path: "/locations",
});

export default function LocationsPage() {
  const locations = getIndexableLocations();
  const stateHubs = getStateHubs();

  return (
    <main className="min-h-screen">
      <RevealOnScroll />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
        ])}
      />
      <Background />
      <Navbar />

      <section className="relative pt-32 pb-14 md:pt-48 md:pb-16">
        <div className="premium-rule absolute left-1/2 top-20 h-px w-[min(900px,calc(100%-3rem))] -translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <p className="text-[10px] font-semibold text-brand-accent uppercase tracking-[0.18em] mb-5 sm:text-xs sm:tracking-[0.22em]">
            Major U.S. Markets
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-black text-white leading-tight max-w-4xl mb-6">
            Customer acquisition systems for established service businesses by city.
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 font-serif italic leading-relaxed max-w-3xl">
            Each city page uses the same conversion-focused Catalyst architecture, with local metadata, customer acquisition keywords, service-area language, and market copy for established service businesses competing in that market.
          </p>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="mb-10 grid gap-4 md:grid-cols-3">
            {[
              ["100+", "major U.S. markets"],
              ["6", "local acquisition keyword clusters per city"],
              ["5", "core acquisition services mapped per city"],
            ].map(([value, label]) => (
              <div key={label} className="premium-hover-card border border-white/8 bg-white/[0.025] p-5">
                <div className="text-3xl font-display font-bold text-white">{value}</div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">{label}</div>
              </div>
            ))}
          </div>
          <div className="mb-10">
            <h2 className="mb-4 text-xl font-display font-bold text-white">Regional service-area hubs</h2>
            <div className="flex flex-wrap gap-3">
              {stateHubs.map((hub) => (
                <Link
                  key={hub.slug}
                  href={`/locations/states/${hub.slug}`}
                  className="premium-hover-card rounded-md border border-white/10 bg-black/24 px-4 py-2 text-sm font-semibold text-gray-300 transition-colors hover:border-brand-accent/60 hover:text-white"
                >
                  {hub.state} ({hub.locations.length})
                </Link>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {locations.map((location, index) => (
              <Link
                key={location.slug}
              href={`/locations/${location.marketSlug}`}
                data-reveal="card"
                data-reveal-delay={index % 4}
                className="glass-panel rounded-lg p-5 hover:border-brand-accent/60 hover:bg-white/5 transition-colors"
              >
                <MapPin className="w-5 h-5 text-brand-accent mb-4" />
                <h2 className="text-lg font-bold text-white">{location.city}</h2>
                <p className="text-sm text-gray-500 mt-1">{location.stateCode}</p>
                <p className="mt-4 text-sm leading-relaxed text-gray-400">
                  Customer acquisition, local SEO, PSEO, paid media, and conversion architecture for {location.city} service businesses.
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
