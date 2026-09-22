import Background from "@/components/Background";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import RevealOnScroll from "@/components/RevealOnScroll";
import { getLocalMarketSignals, getStateHub, getStateHubs } from "@/content/localMarket";
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
  return getStateHubs().map((hub) => ({ state: hub.slug }));
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
  });
}

export default async function StateLocationPage({ params }: Props) {
  const { state } = await params;
  const hub = getStateHub(state);

  if (!hub) {
    notFound();
  }

  const signals = getLocalMarketSignals(hub.locations[0]);

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

      <section className="relative pt-32 pb-14 md:pt-48 md:pb-16">
        <div className="premium-rule absolute left-1/2 top-20 h-px w-[min(900px,calc(100%-3rem))] -translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <p className="text-[10px] font-semibold text-brand-accent uppercase tracking-[0.18em] mb-5 sm:text-xs sm:tracking-[0.22em]">
            {hub.stateCode} Service Area Hub
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-black text-white leading-tight max-w-4xl mb-6">
            Customer acquisition strategy across {hub.state}.
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 font-serif italic leading-relaxed max-w-3xl">
            A regional crawl hub connecting {hub.state} service-area city pages, buyer-intent pages, and local acquisition strategy.
          </p>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="mb-10 grid gap-4 md:grid-cols-3">
            {signals.map((signal) => (
              <div key={signal} className="border border-white/8 bg-white/[0.025] p-5 text-sm leading-relaxed text-gray-300">
                {signal}
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hub.locations.map((location, index) => (
              <Link
                key={location.marketSlug}
                href={`/locations/${location.marketSlug}`}
                data-reveal="card"
                data-reveal-delay={index % 4}
                className="glass-panel rounded-lg p-5 hover:border-brand-accent/60 hover:bg-white/5 transition-colors"
              >
                <MapPin className="w-5 h-5 text-brand-accent mb-4" />
                <h2 className="text-lg font-bold text-white">{location.city}</h2>
                <p className="text-sm text-gray-500 mt-1">{location.stateCode}</p>
                <p className="mt-4 text-sm leading-relaxed text-gray-400">
                  Customer acquisition, lead generation, and local SEO strategy for {location.city} service businesses.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-accent">
                  View city page <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
