"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Brain } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`nav-settle fixed w-full z-50 transition-colors duration-200 ${
        scrolled
          ? "bg-[#07070b]/82 backdrop-blur-xl border-b border-white/10"
          : "bg-[#07070b]/48 backdrop-blur-md border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="brand-glimmer group flex items-center gap-3">
          <span className="brand-mark-glimmer relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-brand-accent/35 bg-brand-accent/10">
            <Brain className="h-6 w-6 text-brand-accent" />
          </span>
          <span className="brand-word-glimmer relative overflow-hidden text-xl font-display font-bold tracking-wide text-white">
            CATALYST
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-widest uppercase text-gray-300">
          <Link href="#methodology" className="hover:text-brand-accent transition-colors">
            Methodology
          </Link>
          <Link href="/services" className="hover:text-brand-accent transition-colors">
            Services
          </Link>
          <Link href="/locations" className="hover:text-brand-accent transition-colors">
            Locations
          </Link>
          <Link
            href="#contact"
            className="border border-brand-accent/35 bg-brand-accent/10 px-5 py-2.5 rounded-lg text-white hover:border-brand-accent hover:bg-brand-accent hover:text-black transition-colors"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
