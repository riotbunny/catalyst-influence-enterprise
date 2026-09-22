import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { ArrowRight, Compass, MapPin, Search } from "lucide-react";

const recoveryLinks = [
  {
    href: "/locations",
    label: "Service Areas",
    description: "Browse city and state acquisition pages.",
    icon: MapPin,
  },
  {
    href: "/services",
    label: "Services",
    description: "Review the acquisition systems Catalyst builds.",
    icon: Compass,
  },
  {
    href: "/industries",
    label: "Industries",
    description: "Find industry-specific growth architecture.",
    icon: Search,
  },
];

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <Background />
      <Navbar />

      <section className="relative flex min-h-screen items-center pt-28 pb-16">
        <div className="premium-rule absolute left-1/2 top-20 h-px w-[min(900px,calc(100%-3rem))] -translate-x-1/2" />
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6">
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-accent sm:text-xs">
            Page Not Found
          </p>
          <h1 className="max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl md:text-7xl">
            This acquisition path is no longer available.
          </h1>
          <p className="mt-7 max-w-2xl font-serif text-lg italic leading-relaxed text-gray-400 md:text-2xl">
            The page may have moved as Catalyst expanded its service-area architecture. These paths will get you back into the active site.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {recoveryLinks.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="glass-panel group rounded-lg p-6 transition-colors hover:border-brand-accent/60 hover:bg-white/5"
                >
                  <Icon className="mb-6 h-7 w-7 text-brand-accent" />
                  <h2 className="text-xl font-bold text-white">{link.label}</h2>
                  <p className="mt-3 min-h-12 text-sm leading-relaxed text-gray-400">{link.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-accent">
                    Open page <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>

          <Link
            href="/#contact"
            className="button-primary mt-10 inline-flex items-center justify-center gap-3 rounded-lg px-7 py-4 font-bold tracking-wide text-black"
          >
            Request Review
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
