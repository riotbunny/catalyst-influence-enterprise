import Link from "next/link";
import { Brain } from "lucide-react";
import { getIndexableIndustries } from "@/content/industries";

export default function Footer() {
  const industries = getIndexableIndustries();

  return (
    <footer className="border-t border-white/10 bg-[#08080c] py-16 text-left">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="h-6 w-6 text-brand-accent" />
              <span className="text-lg font-display font-bold tracking-wide text-white">CATALYST</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Predictable customer acquisition architecture for established service businesses.
            </p>
          </div>

          <div>
            <h3 className="text-brand-accent text-xs font-bold uppercase tracking-[0.16em] mb-6">Industries We Serve</h3>
            <ul className="space-y-4">
              {industries.map((ind) => (
                <li key={ind.slug}>
                  <Link href={`/industries/${ind.slug}`} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {ind.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-brand-accent text-xs font-bold uppercase tracking-[0.16em] mb-6">Solutions</h3>
            <ul className="space-y-4">
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors text-sm">All Services</Link></li>
              <li><Link href="/services/programmatic-seo" className="text-gray-400 hover:text-white transition-colors text-sm">Programmatic SEO</Link></li>
              <li><Link href="/services/paid-acquisition" className="text-gray-400 hover:text-white transition-colors text-sm">Paid Acquisition</Link></li>
              <li><Link href="/services/conversion-architecture" className="text-gray-400 hover:text-white transition-colors text-sm">Conversion Architecture</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-brand-accent text-xs font-bold uppercase tracking-[0.16em] mb-6">Locations</h3>
            <ul className="space-y-4">
              <li><Link href="/locations" className="text-gray-400 hover:text-white transition-colors text-sm">Service Areas</Link></li>
              <li><Link href="/locations/states/texas" className="text-gray-400 hover:text-white transition-colors text-sm">Texas</Link></li>
              <li><Link href="/locations/states/florida" className="text-gray-400 hover:text-white transition-colors text-sm">Florida</Link></li>
              <li><Link href="/locations/states/california" className="text-gray-400 hover:text-white transition-colors text-sm">California</Link></li>
            </ul>
          </div>
          
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs tracking-wider uppercase">&copy; {new Date().getFullYear()} Catalyst Influence. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
