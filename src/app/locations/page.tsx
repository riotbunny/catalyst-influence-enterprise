import Background from "@/components/Background";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import { getIndexableLocations } from "@/content/locations";
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";

export const metadata: Metadata = createMetadata({
  title: "Customer Acquisition Agency Locations",
  description:
    "Browse Catalyst Influence customer acquisition pages for major U.S. cities, built for established service businesses that need predictable growth.",
  path: "/locations",
});

export default function LocationsPage() {
  const locations = getIndexableLocations();

  return (
    <main className="min-h-screen">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
        ])}
      />
      <Background />
      <Navbar />

      <section className="relative pt-36 pb-16 md:pt-48">
        <div className="premium-rule absolute left-1/2 top-20 h-px w-[min(900px,calc(100%-3rem))] -translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-semibold text-brand-accent uppercase tracking-[0.22em] mb-5">
            Major U.S. Markets
          </p>
          <h1 className="text-4xl md:text-6xl font-display font-black text-white leading-tight max-w-4xl mb-6">
            Customer acquisition systems for established service businesses by city.
          </h1>
          <p className="text-xl text-gray-400 font-serif italic leading-relaxed max-w-3xl">
            Each city page uses the same conversion-focused Catalyst architecture, with local metadata and market copy for service businesses competing in that market.
          </p>
        </div>
      </section>

      <section className="pb-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {locations.map((location) => (
              <Link
                key={location.slug}
                href={`/locations/${location.slug}`}
                className="glass-panel rounded-lg p-5 hover:border-brand-accent/60 hover:bg-white/5 transition-colors"
              >
                <MapPin className="w-5 h-5 text-brand-accent mb-4" />
                <h2 className="text-lg font-bold text-white">{location.city}</h2>
                <p className="text-sm text-gray-500 mt-1">{location.state}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
