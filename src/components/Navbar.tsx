"use client";

import Link from "next/link";
import { Menu, Network, X } from "lucide-react";
import { useEffect, useState } from "react";

const navigation = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/locations", label: "Markets" },
  { href: "/#methodology", label: "Approach" },
  { href: "/#results", label: "Proof" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      aria-label="Primary navigation"
      className={`nav-settle fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
        scrolled || open
          ? "border-white/10 bg-[#101513]/95 shadow-[0_12px_38px_rgba(0,0,0,0.18)]"
          : "border-white/8 bg-[#101513]/78"
      }`}
    >
      <div className="site-shell flex h-[76px] items-center justify-between">
        <Link href="/" className="brand-glimmer flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-brand-accent/50 bg-brand-accent text-brand-dark">
            <Network className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <span className="min-w-0">
            <span className="brand-logo-text block text-base font-extrabold leading-none sm:text-lg">CATALYST</span>
            <span className="mt-1 block text-[9px] font-bold uppercase text-gray-500 sm:text-[10px]">Influence &amp; Intelligence</span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-semibold text-gray-300 transition-colors hover:text-white">
              {item.label}
            </Link>
          ))}
          <Link href="/#contact" className="button-primary rounded-md px-5 py-3 text-sm font-extrabold">
            Request a review
          </Link>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((value) => !value)}
          className="flex h-11 w-11 items-center justify-center rounded-md border border-white/14 text-white lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div id="mobile-navigation" className="border-t border-white/10 bg-[#101513] lg:hidden">
          <div className="site-shell flex flex-col py-5">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/8 py-4 text-base font-semibold text-gray-200 last:border-b-0"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="button-primary mt-5 rounded-md px-5 py-4 text-center text-sm font-extrabold"
            >
              Request a review
            </Link>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
