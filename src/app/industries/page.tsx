import Background from "@/components/Background";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import RevealOnScroll from "@/components/RevealOnScroll";
import { getIndexableIndustries } from "@/content/industries";
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo";
import { ArrowRight, Check, Target } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = createMetadata({
  title: "Industries Catalyst Serves",
  description:
    "Explore Catalyst Influence acquisition systems for law firms, home services, HVAC companies, dental practices, and established service businesses.",
  path: "/industries",
});

export default function IndustriesPage() {
  const industries = getIndexableIndustries();

  return (
    <main className="min-h-screen">
      <RevealOnScroll />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Industries", path: "/industries" }])} />
      <Background />
      <Navbar />

      <section className="relative overflow-hidden pb-20 pt-36 sm:pb-28 sm:pt-44">
        <div className="executive-grid absolute inset-0 -z-10" />
        <div className="site-shell">
          <p className="page-label mb-6">Industry systems</p>
          <h1 className="max-w-5xl font-display text-5xl font-normal leading-[0.98] text-white sm:text-6xl lg:text-7xl">
            Acquisition changes when the buyer, urgency, and economics change.
          </h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-gray-400 sm:text-lg">
            Catalyst adapts the search architecture, proof, paid demand, conversion path, and follow-up system to the way each service category is actually evaluated.
          </p>
        </div>
      </section>

      <section className="bg-brand-paper py-20 text-[#18201d] sm:py-28">
        <div className="site-shell">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="page-label mb-5">Vertical strategy</p>
              <h2 className="section-display">Built around the buying environment.</h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[#5b6761]">
              The channel may be the same. The trust requirement, lead value, urgency, intake process, and proof burden usually are not.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {industries.map((industry, index) => (
              <Link key={industry.slug} href={`/industries/${industry.slug}`} data-reveal="card" data-reveal-delay={index % 4} className="premium-hover-card light-panel group flex min-h-[320px] flex-col rounded-lg p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <Target className="h-6 w-6 text-brand-forest" />
                  <ArrowRight className="h-5 w-5 text-brand-forest transition-transform group-hover:translate-x-1" />
                </div>
                <h2 className="mt-8 font-display text-3xl leading-tight">{industry.title}</h2>
                <p className="mt-4 text-sm leading-7 text-[#5b6761]">{industry.metaDescription}</p>
                <div className="mt-auto border-t border-[#d7ddd8] pt-5">
                  <p className="text-xs font-extrabold uppercase text-brand-coral">Primary system priority</p>
                  <p className="mt-2 text-sm font-semibold text-[#34413b]">{industry.systemPriorities[0]}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-sage py-20 text-[#18201d] sm:py-24">
        <div className="site-shell grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="page-label mb-5">Outside these categories?</p>
            <h2 className="section-display">Strong service economics matter more than the label.</h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#53605a]">
              Catalyst also evaluates established service businesses with proven demand, meaningful customer value, and the operational capacity to handle more qualified opportunities.
            </p>
          </div>
          <div>
            {["Proven service delivery", "Meaningful customer value", "Enough operating capacity to scale"].map((item) => (
              <div key={item} className="flex gap-3 border-b border-[#b9c9c1] py-4 text-sm font-semibold text-[#35433d]">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-forest" /> {item}
              </div>
            ))}
            <Link href="/industries/service-businesses" className="button-primary mt-7 inline-flex items-center gap-3 rounded-md px-7 py-4 text-sm font-extrabold">
              View the service-business path <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
