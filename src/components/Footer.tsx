import { getIndexableIndustries } from "@/content/industries";
import { getIndexableServices } from "@/content/services";
import { ArrowUpRight, Network } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const industries = getIndexableIndustries();
  const services = getIndexableServices();

  return (
    <footer className="border-t border-white/10 bg-[#0b0f0d] py-16 text-left sm:py-20">
      <div className="site-shell">
        <div className="mb-14 grid gap-12 lg:grid-cols-[1.15fr_0.9fr_0.9fr_0.7fr]">
          <div>
            <Link href="/" className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-accent text-brand-dark">
                <Network className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-lg font-extrabold text-white">CATALYST</span>
                <span className="block text-[10px] font-bold uppercase text-gray-500">Influence &amp; Intelligence</span>
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-7 text-gray-400">
              Acquisition architecture, website systems, search visibility, paid demand, and follow-up engineered for established service businesses.
            </p>
            <Link href="/#contact" className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-brand-accent">
              Request an acquisition review <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div>
            <h2 className="mb-5 text-xs font-extrabold uppercase text-gray-500">Capabilities</h2>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="text-sm text-gray-300 transition-colors hover:text-white">
                    {service.title.replace(/ for .+$/, "")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-5 text-xs font-extrabold uppercase text-gray-500">Industries</h2>
            <ul className="space-y-3">
              {industries.map((industry) => (
                <li key={industry.slug}>
                  <Link href={`/industries/${industry.slug}`} className="text-sm text-gray-300 transition-colors hover:text-white">
                    {industry.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-5 text-xs font-extrabold uppercase text-gray-500">Explore</h2>
            <ul className="space-y-3 text-sm">
              <li><Link href="/services" className="text-gray-300 hover:text-white">All services</Link></li>
              <li><Link href="/industries" className="text-gray-300 hover:text-white">Industries</Link></li>
              <li><Link href="/locations" className="text-gray-300 hover:text-white">Markets</Link></li>
              <li><Link href="/#results" className="text-gray-300 hover:text-white">Proof</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-7 text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Catalyst Influence. All rights reserved.</p>
          <p>Built for qualified demand, clear decisions, and measurable follow-through.</p>
        </div>
      </div>
    </footer>
  );
}
