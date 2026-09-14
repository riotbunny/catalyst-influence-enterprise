import Background from "@/components/Background";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import RevealOnScroll from "@/components/RevealOnScroll";
import { getIndexableIndustries } from "@/content/industries";
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target } from "lucide-react";

export const metadata: Metadata = createMetadata({
  title: "Industries Catalyst Serves",
  description:
    "Explore Catalyst Influence acquisition strategy pages for law firms, home services, HVAC companies, dental practices, and other established service businesses.",
  path: "/industries",
});

export default function IndustriesPage() {
  const industries = getIndexableIndustries();

  return (
    <main className="min-h-screen">
      <RevealOnScroll />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ])}
      />
      <Background />
      <Navbar />

      <section className="relative pt-32 pb-14 md:pt-48 md:pb-16">
        <div className="premium-rule absolute left-1/2 top-20 h-px w-[min(900px,calc(100%-3rem))] -translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <p className="text-[10px] font-semibold text-brand-accent uppercase tracking-[0.18em] mb-5 sm:text-xs sm:tracking-[0.22em]">
            Vertical Acquisition Strategy
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-black text-white leading-tight max-w-4xl mb-6">
            Customer acquisition by service-business category.
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 font-serif italic leading-relaxed max-w-3xl">
            Industry pages give each vertical a stronger acquisition argument than a generic agency page can carry.
          </p>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 grid md:grid-cols-2 gap-5">
          {industries.map((industry, index) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              data-reveal="card"
              data-reveal-delay={index % 4}
              className="glass-panel rounded-lg p-6 sm:p-7 hover:border-brand-accent/60 hover:bg-white/5 transition-colors"
            >
              <Target className="w-7 h-7 text-brand-accent mb-5" />
              <h2 className="text-lg sm:text-xl font-display font-bold text-white leading-snug mb-4">
                {industry.title}
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">{industry.metaDescription}</p>
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
