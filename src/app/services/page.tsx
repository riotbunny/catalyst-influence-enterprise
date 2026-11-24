import Background from "@/components/Background";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import RevealOnScroll from "@/components/RevealOnScroll";
import { getIndexableServices } from "@/content/services";
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo";
import { ArrowRight, Check, Compass, Gauge, Target } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = createMetadata({
  title: "Customer Acquisition Services",
  description:
    "Explore Catalyst Influence services for acquisition strategy, website design and development, programmatic SEO, local SEO, paid media, conversion, automation, and attribution.",
  path: "/services",
});

const engagementPaths = [
  {
    icon: Compass,
    label: "Diagnose",
    title: "Find the constraint",
    copy: "For teams with activity already moving but no reliable answer on why lead quality, conversion, or pipeline is inconsistent.",
  },
  {
    icon: Target,
    label: "Build",
    title: "Connect the system",
    copy: "For businesses ready to align the website, search, paid demand, forms, CRM routing, follow-up, and measurement.",
  },
  {
    icon: Gauge,
    label: "Scale",
    title: "Fund what proves itself",
    copy: "For operators who need a disciplined way to expand qualified demand and make decisions from commercial signal.",
  },
];

export default function ServicesPage() {
  const services = getIndexableServices();

  return (
    <main className="min-h-screen">
      <RevealOnScroll />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />
      <Background />
      <Navbar />

      <section className="relative overflow-hidden pb-20 pt-36 sm:pb-28 sm:pt-44">
        <div className="executive-grid absolute inset-0 -z-10" />
        <div className="site-shell">
          <p className="page-label mb-6">Capabilities</p>
          <h1 className="max-w-5xl font-display text-5xl font-normal leading-[0.98] text-white sm:text-6xl lg:text-7xl">
            Build the acquisition system, not another isolated campaign.
          </h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-gray-400 sm:text-lg">
            Catalyst combines strategy, websites, search, paid demand, conversion, automation, and attribution around the commercial path your buyers actually take.
          </p>
          <Link href="/#contact" className="button-primary mt-9 inline-flex items-center gap-3 rounded-md px-7 py-4 text-sm font-extrabold">
            Request a review <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-white py-16 text-[#18201d] sm:py-20">
        <div className="site-shell grid border-y border-[#d4dcd7] md:grid-cols-3">
          {engagementPaths.map(({ icon: Icon, label, title, copy }, index) => (
            <article key={title} data-reveal="card" data-reveal-delay={index} className="border-b border-[#d4dcd7] py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
              <div className="flex items-center justify-between">
                <Icon className="h-6 w-6 text-brand-forest" />
                <span className="text-xs font-extrabold uppercase text-brand-coral">{label}</span>
              </div>
              <h2 className="mt-8 font-display text-3xl">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-[#5a6660]">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-brand-paper py-20 text-[#18201d] sm:py-28">
        <div className="site-shell">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="page-label mb-5">Service architecture</p>
              <h2 className="section-display">Choose the pressure point limiting growth.</h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[#5a6660]">
              Every service can stand alone, but the highest-value work usually connects several layers around one measurable acquisition thesis.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {services.map((service, index) => (
              <Link key={service.slug} href={`/services/${service.slug}`} data-reveal="card" data-reveal-delay={index % 4} className="premium-hover-card light-panel group flex min-h-[350px] flex-col rounded-lg p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-extrabold uppercase text-brand-coral">{service.eyebrow}</span>
                  <ArrowRight className="h-5 w-5 text-brand-forest transition-transform group-hover:translate-x-1" />
                </div>
                <h3 className="mt-8 max-w-xl font-display text-3xl leading-tight">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#5c6862]">{service.metaDescription}</p>
                <div className="mt-auto grid gap-4 border-t border-[#d7ddd8] pt-6 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-extrabold uppercase text-[#7a8580]">Best when</p>
                    <p className="mt-2 text-sm leading-6 text-[#38443f]">{service.fit[0]}</p>
                  </div>
                  <div>
                    <p className="text-xs font-extrabold uppercase text-[#7a8580]">First deliverable</p>
                    <p className="mt-2 text-sm leading-6 text-[#38443f]">{service.deliverables[0]}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-forest py-20 sm:py-24">
        <div className="site-shell grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="page-label mb-5 text-[#ead6ad]">Decision support</p>
            <h2 className="section-display text-white">Not sure where the engagement should begin?</h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#c9d7d0]">
              Start with the acquisition environment. We recommend a service path only when there is a specific commercial reason to build it.
            </p>
          </div>
          <div>
            {[
              "Search, paid traffic, pages, and follow-up reviewed together",
              "Priority order defined before execution expands",
              "No recommendation without a measurable thesis",
            ].map((item) => (
              <div key={item} className="flex gap-3 border-b border-white/14 py-4 text-sm font-semibold text-[#e2ebe6]">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" /> {item}
              </div>
            ))}
            <Link href="/#contact" className="button-primary mt-7 inline-flex w-full items-center justify-center gap-3 rounded-md px-7 py-4 text-sm font-extrabold sm:w-auto">
              Request an acquisition review <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
