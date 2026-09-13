import Background from "@/components/Background";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import { getIndexableServices } from "@/content/services";
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export const metadata: Metadata = createMetadata({
  title: "Customer Acquisition Services",
  description:
    "Explore Catalyst Influence services for programmatic SEO, paid acquisition, conversion architecture, automation, and growth architecture.",
  path: "/services",
});

export default function ServicesPage() {
  const services = getIndexableServices();

  return (
    <main className="min-h-screen">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <Background />
      <Navbar />

      <section className="pt-36 pb-16 md:pt-48">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-semibold text-brand-accent uppercase tracking-[0.22em] mb-5">
            Service Architecture
          </p>
          <h1 className="text-4xl md:text-6xl font-display font-black text-white leading-tight max-w-4xl mb-6">
            The acquisition systems Catalyst builds.
          </h1>
          <p className="text-xl text-gray-400 font-serif italic leading-relaxed max-w-3xl">
            These are the core service paths behind the 90-day growth architecture: demand capture, conversion, follow-up, and measurement.
          </p>
        </div>
      </section>

      <section className="pb-28">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="glass-panel rounded-3xl p-7 hover:border-brand-accent/60 hover:bg-white/5 transition-colors"
            >
              <Zap className="w-7 h-7 text-brand-accent mb-5" />
              <h2 className="text-xl font-display font-bold text-white leading-snug mb-4">
                {service.title}
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">{service.metaDescription}</p>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-brand-accent uppercase tracking-widest">
                Explore <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
