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
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/50 backdrop-blur-xl border-b border-white/10"
          : "glass-panel border-b-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Brain className="h-8 w-8 text-brand-accent" />
          <span className="text-2xl font-display font-bold tracking-wide text-white">
            CATALYST
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-widest uppercase text-gray-300">
          <Link href="#methodology" className="hover:text-brand-accent transition-colors">
            Methodology
          </Link>
          <Link href="#capabilities" className="hover:text-brand-accent transition-colors">
            Capabilities
          </Link>
          <Link
            href="#contact"
            className="border border-white/20 px-6 py-2 rounded-full hover:border-brand-accent hover:text-brand-accent transition-colors"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
