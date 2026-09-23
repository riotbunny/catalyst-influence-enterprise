import Background from "@/components/Background";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import RevealOnScroll from "@/components/RevealOnScroll";
import { getIndexableServices } from "@/content/services";
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Compass, Gauge, Target, Zap } from "lucide-react";

export const metadata: Metadata = createMetadata({
  title: "Customer Acquisition Services",
  description:
    "Explore Catalyst Influence services for programmatic SEO, paid acquisition, conversion architecture, automation, and growth architecture.",
  path: "/services",
});

export default function ServicesPage() {
  const services = getIndexableServices();
  const engagementPaths = [
    {
      icon: Compass,
      label: "Diagnose",
      title: "Find the acquisition leak",
      copy: "For teams with traffic, ad spend, or referrals already moving, but no clear answer on why lead quality or conversion is inconsistent.",
    },
    {
      icon: Target,
      label: "Build",
      title: "Create the demand capture system",
      copy: "For businesses ready to connect SEO, paid media, landing pages, forms, CRM routing, and follow-up into one measurable path.",
    },
    {
      icon: Gauge,
      label: "Scale",
      title: "Shift resources toward what proves itself",
      copy: "For operators who need a disciplined way to expand page coverage, increase qualified volume, and make spend decisions from real signal.",
    },
  ];

  return (
    <main className="min-h-screen">
      <RevealOnScroll />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <Background />
      <Navbar />

      <section className="relative pt-32 pb-14 md:pt-48 md:pb-16">
        <div className="premium-rule absolute left-1/2 top-20 h-px w-[min(900px,calc(100%-3rem))] -translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <p className="text-[10px] font-semibold text-brand-accent uppercase tracking-[0.18em] mb-5 sm:text-xs sm:tracking-[0.22em]">
            Service Architecture
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-black text-white leading-tight max-w-4xl mb-6">
            The acquisition systems Catalyst builds.
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 font-serif italic leading-relaxed max-w-3xl">
            These are the core service paths behind the 90-day growth architecture: demand capture, conversion, follow-up, and measurement.
          </p>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:px-6 md:grid-cols-3">
          {engagementPaths.map((path, index) => {
            const Icon = path.icon;

            return (
              <div
                key={path.title}
                data-reveal="card"
                data-reveal-delay={index}
                className="premium-hover-card glass-panel rounded-lg p-6 sm:p-7"
              >
                <div className="mb-6 flex items-center justify-between gap-4">
                  <Icon className="h-7 w-7 text-brand-accent" />
                  <span className="rounded-full border border-brand-accent/25 bg-brand-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-accent">
                    {path.label}
                  </span>
                </div>
                <h2 className="mb-3 font-display text-xl font-bold leading-snug text-white">{path.title}</h2>
                <p className="leading-relaxed text-gray-400">{path.copy}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="mx-auto mb-10 max-w-7xl px-5 sm:px-6">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
              Service menu
            </p>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Choose the pressure point that is limiting growth.
            </h2>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              data-reveal="card"
              data-reveal-delay={index % 4}
              className="premium-hover-card glass-panel flex min-h-full flex-col rounded-lg p-6 transition-colors hover:border-brand-accent/60 hover:bg-white/5 sm:p-7"
            >
              <Zap className="w-7 h-7 text-brand-accent mb-5" />
              <h2 className="text-lg sm:text-xl font-display font-bold text-white leading-snug mb-4">
                {service.title}
              </h2>
              <p className="mb-6 leading-relaxed text-gray-400">{service.metaDescription}</p>
              <div className="mb-6 mt-auto space-y-4 border-t border-white/10 pt-5">
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500">Best when</p>
                  <p className="text-sm leading-relaxed text-gray-300">{service.fit[0]}</p>
                </div>
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500">Core deliverable</p>
                  <p className="text-sm leading-relaxed text-gray-300">{service.deliverables[0]}</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-brand-accent uppercase tracking-widest">
                Explore <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="glass-panel grid gap-8 rounded-lg p-6 sm:p-8 md:grid-cols-[1fr_0.72fr] md:p-10">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
                Decision support
              </p>
              <h2 className="mb-5 font-display text-3xl font-bold text-white sm:text-4xl">
                Not sure which service is the right entry point?
              </h2>
              <p className="max-w-3xl font-serif text-lg italic leading-relaxed text-gray-400">
                Start with a review. Catalyst will look at the current acquisition environment first, then recommend the service path only if there is a clear commercial reason to move forward.
              </p>
            </div>
            <div className="space-y-4">
              {[
                "Search, paid traffic, page flow, and follow-up reviewed together",
                "Clearer priority order before committing to execution",
                "No recommendation without a measurable acquisition thesis",
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent" />
                  <p className="text-sm font-medium leading-relaxed text-gray-300">{item}</p>
                </div>
              ))}
              <Link
                href="/#contact"
                className="button-primary inline-flex w-full items-center justify-center gap-3 rounded-lg px-6 py-4 font-bold text-black"
              >
                Request Review <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
