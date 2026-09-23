"use client";

import Background from "@/components/Background";
import AnimatedStat from "@/components/AnimatedStat";
import Navbar from "@/components/Navbar";
import RevealOnScroll from "@/components/RevealOnScroll";
import { getExecutiveFaqs } from "@/content/faqs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BarChart3, Users, ChevronDown, CheckCircle2, Compass, ShieldCheck, MousePointerClick, Zap, Search, TrendingUp, Gauge, LockKeyhole, ArrowUpRight } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";

interface LandingPageProps {
  city?: string;
  state?: string;
  marketAngle?: string;
  localBuyerIntent?: string;
  localSearchFocus?: string[];
  localServices?: string[];
  serviceAreaCopy?: string;
  localMarketSummary?: string;
  localMarketSignals?: string[];
  extraFaqs?: { question: string; answer: string }[];
  relatedCityServiceLinks?: { href: string; label: string }[];
}

export default function LandingPage({
  city,
  state,
  marketAngle,
  localBuyerIntent,
  localSearchFocus = [],
  localServices = [],
  serviceAreaCopy,
  extraFaqs = [],
  relatedCityServiceLinks = [],
}: LandingPageProps) {
  const currentQuarter = `Q${Math.floor(new Date().getMonth() / 3) + 1}`;
  const router = useRouter();
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");
  
  // Format city name for display (e.g., "new-york" -> "New York")
  const formattedCity = city 
    ? city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : null;
  const executiveFaqs = [...getExecutiveFaqs(formattedCity), ...extraFaqs];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormState("submitting");
    setFormMessage("");

    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        executiveName: formData.get("executiveName"),
        email: formData.get("email"),
        marketingCapacity: formData.get("marketingCapacity"),
        websiteUrl: formData.get("websiteUrl"),
        city: formattedCity ?? "",
        sourcePath: window.location.pathname,
      }),
    });

    const data = (await response.json().catch(() => null)) as { error?: string } | null;

    if (!response.ok) {
      setFormState("error");
      setFormMessage(data?.error ?? "Something went wrong. Please try again.");
      return;
    }

    event.currentTarget.reset();
    setFormState("success");
    setFormMessage("Application received. Redirecting you to the next step.");
    router.push("/thank-you");
  }

  return (
    <main className="min-h-screen">
      <RevealOnScroll />
      <Background />
      <Navbar />
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden px-0 pt-32 pb-16 md:pt-48 md:pb-28">
        <div className="premium-rule absolute left-1/2 top-20 h-px w-[min(900px,calc(100%-3rem))] -translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10 text-center flex flex-col items-center">
        
        <div className="inline-flex max-w-full items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 backdrop-blur-md mb-8 sm:px-4">
          <span className="h-2 w-2 rounded-full bg-brand-accent shadow-[0_0_14px_rgba(212,160,74,0.52)]"></span>
          <span suppressHydrationWarning className="text-[10px] font-semibold tracking-[0.16em] text-gray-300 uppercase sm:text-xs sm:tracking-widest">
            Accepting 2 established partners for {currentQuarter}
          </span>
        </div>
        
        <h1 className="max-w-6xl text-[2.7rem] font-display font-black leading-[1.04] text-white mb-6 sm:text-6xl md:text-7xl lg:text-8xl">
          PREDICTABLE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-glow">CUSTOMER ACQUISITION.</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto font-serif italic leading-relaxed">
          {formattedCity 
            ? `Partnering with established service businesses in ${formattedCity} to rebuild your digital acquisition system so the right prospects find you, trust you, and take action.` 
            : `We rebuild the critical parts of your digital acquisition system so more of the right prospects find you, trust you, and take action.`}
        </p>
        
        <div className="flex w-full max-w-sm flex-col gap-4 sm:max-w-none sm:flex-row sm:justify-center sm:gap-6">
          <a href="#contact" className="button-primary group text-black px-6 py-4 rounded-lg font-bold tracking-wide flex items-center justify-center gap-3 sm:px-8">
            Apply For Partnership
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <a href="#results" className="px-6 py-4 flex items-center justify-center rounded-lg font-bold tracking-wide text-white border border-white/16 bg-white/[0.03] hover:border-white/28 hover:bg-white/10 transition-colors duration-200 sm:px-8">
            See The Proof
          </a>
        </div>

        <div className="mt-14 grid w-full max-w-4xl grid-cols-1 gap-3 border-y border-white/8 bg-black/20 py-4 sm:grid-cols-3">
          {[
            {
              label: "indexed pages deployed",
              stat: <AnimatedStat to={21.3} decimals={1} suffix="K" durationMs={2200} className="tabular-nums" />,
            },
            {
              label: "qualified leads in 24 hours",
              stat: <AnimatedStat to={437} durationMs={2200} className="tabular-nums" />,
            },
            {
              label: "documented lead cost",
              stat: <AnimatedStat from={10.57} to={2.35} decimals={2} prefix="$" durationMs={2200} className="tabular-nums" />,
            },
          ].map(({ stat, label }) => (
            <div key={label} className="px-5 py-3 text-center sm:border-r sm:border-white/8 last:border-r-0">
              <div className="text-2xl font-display font-bold text-white">{stat}</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">{label}</div>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* 2. Enterprise Trust */}
      <section className="border-y border-white/5 bg-black/30 py-12 sm:py-14">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            {formattedCity 
              ? `Trusted by industry leaders in ${formattedCity} to architect their growth`
              : `Trusted by industry leaders to architect their growth`}
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Salesnet LLC", "B2B acquisition systems"],
              ["McMaster Lawfirm", "Legal demand capture"],
              ["Home Tech Dealer Inc.", "Programmatic SEO + paid media"],
            ].map(([name, detail], index) => (
              <div key={name} data-reveal="card" data-reveal-delay={index} className="premium-hover-card border border-white/8 bg-white/[0.025] px-5 py-5 sm:px-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-lg font-display font-bold text-gray-200">{name}</div>
                    <div className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-gray-600">{detail}</div>
                  </div>
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-brand-accent" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {formattedCity ? (
        <section className="py-20 border-b border-white/5 bg-black/30 sm:py-24">
          <div className="max-w-7xl mx-auto px-5 sm:px-6">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
              <div>
                <h2 className="text-xs font-semibold text-brand-accent uppercase tracking-[0.2em] mb-4">
                  Local Growth Architecture
                </h2>
                <h3 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight mb-6">
                  Customer acquisition in {formattedCity}{state ? `, ${state}` : ""}
                </h3>
                <div className="space-y-5 text-gray-400 leading-relaxed text-lg">
                  <p>
                    {marketAngle ??
                      `Competing for service-business demand in ${formattedCity} requires more than a generic digital marketing campaign. Buyers compare fast, trust signals matter immediately, and every click needs a clear path from discovery to qualified action.`}
                  </p>
                  <p>
                    Catalyst builds the acquisition environment around that local intent: search visibility, paid traffic, landing page proof, offer clarity, automated follow-up, and measurement that shows which opportunities are worth scaling.
                  </p>
                  {localBuyerIntent ? <p>{localBuyerIntent}</p> : null}
                </div>
              </div>

              <div data-reveal="panel" className="glass-panel rounded-lg p-6 sm:p-8">
                <h4 className="text-xl font-display font-bold text-white mb-6">
                  What we optimize for {formattedCity} service businesses
                </h4>
                <ul className="space-y-4">
                  {[
                    "High-intent SEO pages that match local buyer demand",
                    "Paid acquisition paths tied to stronger landing page trust",
                    "Conversion architecture that reduces uncertainty before contact",
                    "Follow-up and attribution systems that protect qualified leads",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-gray-300 leading-relaxed">
                      <CheckCircle2 className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div data-reveal="panel" className="glass-panel rounded-lg p-6 sm:p-8">
                <h4 className="mb-5 text-xl font-display font-bold text-white">
                  Search demand we build around in {formattedCity}
                </h4>
                <div className="flex flex-wrap gap-3">
                  {(localSearchFocus.length
                    ? localSearchFocus
                    : [
                        `customer acquisition agency in ${formattedCity}`,
                        `lead generation for service businesses in ${formattedCity}`,
                        `local SEO and paid acquisition in ${formattedCity}`,
                      ]
                  ).map((keyword) => (
                    <span
                      key={keyword}
                      className="premium-hover-card rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm font-medium text-gray-300"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div data-reveal="panel" data-reveal-delay="1" className="glass-panel rounded-lg p-6 sm:p-8">
                <h4 className="mb-5 text-xl font-display font-bold text-white">
                  {formattedCity} acquisition services
                </h4>
                <ul className="space-y-4">
                  {(localServices.length
                    ? localServices
                    : [
                        `${formattedCity} customer acquisition system design`,
                        `${formattedCity} programmatic SEO and landing page architecture`,
                        `${formattedCity} CRM follow-up and attribution planning`,
                      ]
                  ).map((service) => (
                    <li key={service} className="flex gap-3 text-gray-300 leading-relaxed">
                      <CheckCircle2 className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
                {serviceAreaCopy ? (
                  <p className="mt-6 border-t border-white/8 pt-5 text-sm leading-relaxed text-gray-500">
                    {serviceAreaCopy}
                  </p>
                ) : null}
                {relatedCityServiceLinks.length ? (
                  <div className="mt-6 border-t border-white/8 pt-5">
                    <div className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand-accent">
                      Deeper {formattedCity} pages
                    </div>
                    <div className="space-y-2">
                      {relatedCityServiceLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="premium-hover-card block rounded-md border border-white/10 bg-black/24 px-3 py-2 text-sm text-gray-300 transition-colors hover:border-brand-accent/60 hover:text-white"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* 3. Proof of Impact */}
      <section id="results" className="py-24 relative sm:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="mb-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <h2 className="text-xs font-semibold text-brand-accent uppercase tracking-[0.2em] mb-4">Proof of Impact</h2>
              <h3 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight">Evidence a CEO can inspect in seconds.</h3>
            </div>
            <p className="text-base leading-relaxed text-gray-400 sm:text-lg">
              The point is not to look busy. It is to show whether acquisition architecture is producing indexed demand, qualified lead volume, and costs that can be scaled with confidence.
            </p>
          </div>

          <div data-reveal="panel" className="glass-panel p-5 sm:p-8 md:p-16 rounded-lg border border-white/10 relative overflow-hidden">
            <div className="premium-rule absolute left-5 right-5 top-0 sm:left-8 sm:right-8" />
            
            <div className="grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
              <div className="space-y-8">
                <div>
                  <div className="mb-8 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-md sm:px-4">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-accent sm:text-xs sm:tracking-widest">Enterprise Case Study</span>
                  </div>
                  <h4 className="mb-6 text-2xl font-display font-bold text-white md:text-4xl">Home Tech Dealer</h4>
                  <p className="text-base leading-relaxed text-gray-400 sm:text-lg">
                    A multi-channel acquisition rebuild combining programmatic SEO, paid traffic routing, landing-page trust architecture, and lead follow-up measurement.
                  </p>
                </div>

                <div className="grid gap-3">
                  {[
                    ["Constraint", "Demand existed, but discovery paths and conversion evidence were fragmented."],
                    ["Deployment", "Built search-capture assets, paid acquisition paths, and proof-led landing flows."],
                    ["Result", "Generated a visible acquisition spike without relying on disconnected campaign activity."],
                  ].map(([label, copy], index) => (
                    <div key={label} data-reveal="metric" data-reveal-delay={index} className="premium-hover-card border-l-2 border-brand-accent/70 bg-black/24 px-5 py-4">
                      <div className="text-xs font-bold uppercase tracking-[0.18em] text-brand-accent">{label}</div>
                      <div className="mt-2 text-sm leading-relaxed text-gray-300">{copy}</div>
                    </div>
                  ))}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div data-reveal="metric" className="premium-hover-card border border-white/8 bg-black/30 p-5">
                    <BarChart3 className="mb-4 h-7 w-7 text-brand-accent" />
                    <div className="mb-2 text-3xl font-display font-bold text-white sm:text-4xl">
                      <AnimatedStat to={21.3} decimals={1} suffix="K" className="tabular-nums" />
                    </div>
                    <div className="text-sm font-medium leading-relaxed text-gray-400">New pages indexed through pSEO architecture</div>
                  </div>
                  <div data-reveal="metric" data-reveal-delay="1" className="premium-hover-card border border-white/8 bg-black/30 p-5">
                    <Users className="mb-4 h-7 w-7 text-brand-accent" />
                    <div className="mb-2 text-3xl font-display font-bold text-white sm:text-4xl">
                      <AnimatedStat to={437} className="tabular-nums" />
                    </div>
                    <div className="text-sm font-medium leading-relaxed text-gray-400">High-intent leads generated in one day</div>
                  </div>
                </div>
              </div>

              <div data-reveal="panel" data-reveal-delay="1" className="border border-white/10 bg-[#08080d] shadow-2xl">
                <div className="flex flex-col gap-4 border-b border-white/8 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                  <div>
                    <div className="text-sm font-bold text-white">Acquisition Command View</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.16em] text-gray-600">Search + paid media yield</div>
                  </div>
                  <div className="flex items-center gap-2 rounded-md border border-green-400/20 bg-green-400/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-green-300">
                    <LockKeyhole className="h-3.5 w-3.5" />
                    Verified
                  </div>
                </div>

                <div className="grid gap-4 p-5 sm:grid-cols-3">
                  {[
                    {
                      label: "Indexed",
                      stat: <AnimatedStat to={21.3} decimals={1} suffix="K" className="tabular-nums" />,
                      Icon: Search,
                    },
                    {
                      label: "Lead Yield",
                      stat: <AnimatedStat to={437} className="tabular-nums" />,
                      Icon: TrendingUp,
                    },
                    {
                      label: "CPL",
                      stat: <AnimatedStat from={10.57} to={2.35} decimals={2} prefix="$" className="tabular-nums" />,
                      Icon: Gauge,
                    },
                  ].map(({ label, stat, Icon }, index) => (
                    <div key={label as string} data-reveal="metric" data-reveal-delay={index} className="premium-hover-card border border-white/8 bg-white/[0.025] p-4">
                      <Icon className="mb-4 h-5 w-5 text-brand-accent" />
                      <div className="text-xs uppercase tracking-[0.16em] text-gray-600">{label as string}</div>
                      <div className="mt-2 text-2xl font-bold text-white">{stat}</div>
                    </div>
                  ))}
                </div>

                <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                  <div className="premium-hover-card border border-white/8 bg-black/40 p-4 sm:p-5">
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <div>
                        <div className="text-sm font-semibold text-gray-300">Google Search Console</div>
                        <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-gray-600 sm:text-xs sm:tracking-[0.16em]">30 day index velocity</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-400">
                          <AnimatedStat to={21.3} decimals={1} suffix="K" className="tabular-nums" />
                        </div>
                        <div className="text-xs text-gray-600">indexed</div>
                      </div>
                    </div>
                    <div className="flex h-28 items-end gap-1">
                      {[2,3,2,4,3,2,1,2,3,45,45,47,48,48,48,48,45,45,45,35,35,35,35,34,34,34,34].map((h, i) => (
                        <div key={i} className="flex-1 rounded-t-sm bg-gradient-to-t from-green-600/70 to-green-300/80" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid border-t border-white/8 md:grid-cols-[1fr_0.8fr]">
                  <div className="p-4 sm:p-5">
                    <div className="mb-4 text-sm font-semibold text-gray-300">Meta Ads Manager</div>
                    <div className="space-y-3">
                      {[
                        {
                          label: "Website Leads",
                          value: <AnimatedStat to={347} className="tabular-nums" />,
                          cost: <AnimatedStat from={10.57} to={2.35} decimals={2} prefix="$" className="tabular-nums" />,
                        },
                        {
                          label: "Qualified Actions",
                          value: <AnimatedStat to={90} className="tabular-nums" />,
                          cost: "$3.35",
                        },
                      ].map(({ label, value, cost }) => (
                        <div key={label} className="grid grid-cols-[1fr_auto_auto] items-end gap-3 border-b border-white/8 pb-3 last:border-b-0 last:pb-0 sm:gap-4">
                          <div className="text-[10px] uppercase tracking-[0.13em] text-gray-600 sm:text-xs sm:tracking-[0.15em]">{label}</div>
                          <div className="text-xl font-bold text-white">{value}</div>
                          <div className="text-sm font-semibold text-brand-accent">{cost}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-white/8 p-4 sm:p-5 md:border-l md:border-t-0">
                    <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-accent">
                      <ArrowUpRight className="h-4 w-4" />
                      Executive Readout
                    </div>
                    <p className="font-serif text-base italic leading-relaxed text-gray-300 sm:text-lg">
                      &quot;The system showed where demand was coming from, which pages were being indexed, and where paid traffic could scale without guessing.&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 border-t border-white/8 pt-10">
              <div className="mb-8 grid gap-4 md:grid-cols-[0.78fr_1fr] md:items-end">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
                    Verified Platform Evidence
                  </h4>
                  <p className="mt-3 text-2xl font-display font-bold leading-tight text-white">
                    Screenshots from the systems where the results were measured.
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-gray-500">
                  These views are included as supporting proof: Google Search Console indexation, Meta reach and traffic, and campaign-level click efficiency.
                </p>
              </div>

              <div className="grid gap-5 lg:grid-cols-[1.18fr_0.82fr]">
                <figure data-reveal="panel" className="premium-hover-image overflow-hidden rounded-lg border border-white/10 bg-black/40">
                  <div className="relative aspect-[1400/650]">
                    <Image
                      src="/proof-home-tech-search-console.webp"
                      alt="Google Search Console page indexing screenshot showing 21.3K indexed pages for Home Tech Dealer"
                      fill
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="border-t border-white/8 px-5 py-4">
                    <div className="text-sm font-bold text-white">Home Tech Dealer | Programmatic SEO</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.16em] text-gray-600">21.3K indexed pages in Google Search Console</div>
                  </figcaption>
                </figure>

                <div className="grid gap-5">
                  {[
                    {
                      src: "/proof-home-tech-meta.webp",
                      alt: "Meta Ads reporting screenshot for Home Tech Dealer showing reach, impressions, spend, views, and clicks",
                      title: "Home Tech Dealer | Paid Acquisition",
                      detail: "18,464 clicks from 297,895 impressions",
                      aspect: "aspect-[1400/342]",
                    },
                    {
                      src: "/proof-whitestone-meta.webp",
                      alt: "Meta Ads reporting screenshot for Whitestone Capital Advisors showing reach, impressions, views, link clicks, and spend",
                      title: "Whitestone Capital Advisors | Paid Visibility",
                      detail: "952,009 impressions and 9,090 link clicks",
                      aspect: "aspect-[1400/362]",
                    },
                    {
                      src: "/proof-campaign-click-cost.webp",
                      alt: "Campaign-level reporting screenshot showing 14,291 link clicks at $0.39 per link click",
                      title: "Campaign Proof | Click Efficiency",
                      detail: "14,291 link clicks at $0.39 per link click",
                      aspect: "aspect-[1200/91]",
                    },
                  ].map((proof, index) => (
                    <figure key={proof.src} data-reveal="metric" data-reveal-delay={index} className="premium-hover-image overflow-hidden rounded-lg border border-white/10 bg-black/40">
                      <div className={`relative ${proof.aspect}`}>
                        <Image
                          src={proof.src}
                          alt={proof.alt}
                          fill
                          sizes="(min-width: 1024px) 38vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                      <figcaption className="border-t border-white/8 px-5 py-4">
                        <div className="text-sm font-bold text-white">{proof.title}</div>
                        <div className="mt-1 text-xs uppercase tracking-[0.16em] text-gray-600">{proof.detail}</div>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Methodology Section (The Mechanism) */}
      <section id="methodology" className="py-24 relative bg-black/40 border-y border-white/5 sm:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="mb-14 sm:mb-20">
            <h2 className="text-xs font-semibold text-brand-accent uppercase tracking-[0.2em] mb-4">Our Mechanism</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-white max-w-3xl leading-tight">The Catalyst Influence Architecture™</h3>
            <p className="text-lg text-gray-400 mt-6 max-w-2xl font-serif italic sm:text-xl">We don&apos;t just &quot;run ads&quot;. We rebuild the four layers of your customer acquisition environment.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div data-reveal="card" className="glass-panel p-8 rounded-lg hover:bg-white/5 transition-all duration-500 group border-t-2 border-t-brand-indigo/50">
              <Compass className="w-8 h-8 text-brand-accent mb-6 transition-transform duration-200 group-hover:translate-y-[-2px]" />
              <h4 className="text-xl font-bold text-white mb-4">1. Discovery</h4>
              <p className="text-gray-400 leading-relaxed text-sm">Get the right person into the environment. We engineer targeted SEO, paid media, and content structures to capture high-value intent.</p>
            </div>
            
            <div data-reveal="card" data-reveal-delay="1" className="glass-panel p-8 rounded-lg hover:bg-white/5 transition-all duration-500 group border-t-2 border-t-brand-indigo/50">
              <ShieldCheck className="w-8 h-8 text-brand-accent mb-6 transition-transform duration-200 group-hover:translate-y-[-2px]" />
              <h4 className="text-xl font-bold text-white mb-4">2. Trust</h4>
              <p className="text-gray-400 leading-relaxed text-sm">Immediately reduce uncertainty. We design your visual credibility, authority markers, and consistency to make them feel safe taking the next step.</p>
            </div>

            <div data-reveal="card" data-reveal-delay="2" className="glass-panel p-8 rounded-lg hover:bg-white/5 transition-all duration-500 group border-t-2 border-t-brand-indigo/50">
              <MousePointerClick className="w-8 h-8 text-brand-accent mb-6 transition-transform duration-200 group-hover:translate-y-[-2px]" />
              <h4 className="text-xl font-bold text-white mb-4">3. Decision</h4>
              <p className="text-gray-400 leading-relaxed text-sm">Structure information so taking action feels deeply logical. We rebuild offer architecture, messaging, and proactive objection resolution.</p>
            </div>

            <div data-reveal="card" data-reveal-delay="3" className="glass-panel p-8 rounded-lg hover:bg-white/5 transition-colors duration-200 group border-t-2 border-t-brand-accent/50 shadow-[0_-10px_30px_rgba(212,160,74,0.05)]">
              <Zap className="w-8 h-8 text-brand-accent mb-6 transition-transform duration-200 group-hover:translate-y-[-2px]" />
              <h4 className="text-xl font-bold text-white mb-4">4. Activation</h4>
              <p className="text-gray-400 leading-relaxed text-sm">Convert intent into measurable action. We optimize forms, booking systems, automated follow-ups, and behavioral remarketing loops.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. The Flagship Offer (Execution Roadmap) */}
      <section className="py-24 relative overflow-hidden sm:py-32">
        <div className="premium-rule absolute left-1/2 top-0 h-px w-[min(760px,calc(100%-3rem))] -translate-x-1/2" />
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <div className="mb-14 text-center sm:mb-20">
            <h2 className="text-xs font-semibold text-brand-accent uppercase tracking-[0.2em] mb-4">The Flagship Engagement</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight">The 90-Day Growth Architecture</h3>
            <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">A 90-day acquisition system for established service businesses that need more qualified opportunities—not more disconnected marketing activity.</p>
          </div>

          <div className="space-y-6">
            <div data-reveal="panel" className="roadmap-card glass-panel p-6 sm:p-8 rounded-lg border border-white/10 flex flex-col md:flex-row gap-6 md:gap-8 items-start relative">
              <div className="roadmap-marker flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center border">
                <span className="text-2xl font-bold">1</span>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-3">Days 1–30: Architect & Diagnose</h4>
                <p className="text-gray-400 leading-relaxed mb-4">We diagnose where prospects are being lost and rebuild the foundation. The major client-facing deliverable is your complete Growth Architecture Blueprint. After Month 1, you will feel: *&quot;These people understand my customer better than any agency I&apos;ve hired before.&quot;*</p>
                <div className="flex flex-wrap gap-4">
                  <span className="text-sm font-medium text-brand-accent flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Competitor & Offer Analysis</span>
                  <span className="text-sm font-medium text-brand-accent flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Landing Page Strategy & Trust Architecture</span>
                </div>
              </div>
            </div>

            <div data-reveal="panel" data-reveal-delay="1" className="roadmap-card glass-panel p-6 sm:p-8 rounded-lg border border-white/10 flex flex-col md:flex-row gap-6 md:gap-8 items-start relative">
              <div className="roadmap-marker flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center border">
                <span className="text-2xl font-bold">2</span>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-3">Days 31–60: Deploy</h4>
                <p className="text-gray-400 leading-relaxed mb-4">We build the acquisition machine. Not every client gets every channel. We deploy *only* the specific channels most likely to produce profitable customer acquisition for your unique business model.</p>
                <div className="flex flex-wrap gap-4">
                  <span className="text-sm font-medium text-brand-accent flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Meta/Google Campaign Infrastructure</span>
                  <span className="text-sm font-medium text-brand-accent flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Automated Follow-up & CRM Integration</span>
                </div>
              </div>
            </div>

            <div data-reveal="panel" data-reveal-delay="2" className="roadmap-card glass-panel p-6 sm:p-8 rounded-lg border border-white/10 flex flex-col md:flex-row gap-6 md:gap-8 items-start relative">
              <div className="roadmap-marker flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center border">
                <span className="text-2xl font-bold">3</span>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-3">Days 61–90: Optimize & Scale</h4>
                <p className="text-gray-400 leading-relaxed mb-4">Working from real behavioral data, we identify winning traffic sources, messages, and variations. We shift resources toward what produces results and scale your profitable volume aggressively.</p>
                <div className="flex flex-wrap gap-4">
                  <span className="text-sm font-medium text-brand-accent flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Executive Growth Review</span>
                  <span className="text-sm font-medium text-brand-accent flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Aggressive Budget Scaling</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. The Brain Trust */}
      <section id="leadership" className="py-24 bg-black/40 border-y border-white/5 sm:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="grid md:grid-cols-[0.88fr_1fr] gap-16 items-center">
            <div data-reveal="panel" className="relative max-w-[520px]">
              <div className="absolute -inset-3 border border-white/8 bg-white/[0.02]" />
              <div className="premium-hover-image relative overflow-hidden rounded-lg border border-white/10 bg-black shadow-2xl">
                <div className="relative aspect-[4/5]">
                  <Image
                    src="/founder-v2.jpg"
                    alt="Abel V., Principal Architect at Catalyst"
                    fill
                    sizes="(min-width: 768px) 42vw, 100vw"
                    className="object-cover object-[52%_26%] saturate-[0.9] contrast-[1.04]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_54%,rgba(0,0,0,0.72)_100%)]" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="border-t border-white/12 pt-4">
                    <p className="text-lg font-display font-bold text-white">Abel V.</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent">
                      Principal Architect
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-xs font-semibold text-brand-accent uppercase tracking-[0.2em] mb-4">The Brain Trust</h2>
              <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">Direct senior strategy. <br/>Built close to the numbers.</h3>
              <p className="text-lg text-gray-400 mb-8 font-serif italic leading-relaxed sm:text-xl">
                &quot;When you work with Catalyst, the person diagnosing the acquisition path is the same person shaping the page system, offer architecture, and performance signal loop.&quot;
              </p>
              <div className="space-y-6">
                <div>
                  <h4 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">Abel V.</h4>
                  <p className="text-brand-accent font-semibold tracking-wide uppercase text-sm mb-3">Principal Architect</p>
                  <p className="text-gray-500 leading-relaxed">Architecting acquisition systems across programmatic SEO, paid media routing, landing page conversion, CRM follow-up, and executive reporting.</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    "PSEO architecture",
                    "Paid acquisition systems",
                    "Conversion + follow-up",
                  ].map((item) => (
                    <div key={item} className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-4">
                      <p className="text-sm font-bold uppercase tracking-[0.16em] text-gray-300">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="glass-panel rounded-lg p-5">
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">What that means for clients</p>
                  <p className="text-gray-400 leading-relaxed">
                    The work stays connected from search demand to sales follow-up, so strategy, page experience, form behavior, and reporting are not treated as separate problems.
                  </p>
                </div>
                <ul className="space-y-4 text-gray-300 font-medium pt-2">
                  <li className="flex items-center gap-4"><span className="w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_10px_rgba(212,160,74,0.58)]"></span> Builds page systems around real buyer intent</li>
                  <li className="flex items-center gap-4"><span className="w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_10px_rgba(212,160,74,0.58)]"></span> Connects acquisition channels to conversion behavior</li>
                  <li className="flex items-center gap-4"><span className="w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_10px_rgba(212,160,74,0.58)]"></span> Prioritizes measurable pipeline over vanity metrics</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Executive FAQ & Risk Reversal */}
      <section className="py-24 relative sm:py-32">
        <div className="max-w-3xl mx-auto px-5 sm:px-6">
          <div className="mb-16 text-center">
            <h2 className="text-xs font-semibold text-brand-accent uppercase tracking-[0.2em] mb-4">Clarity & Accountability</h2>
            <h3 className="text-3xl sm:text-4xl font-display font-bold text-white">Executive Briefing</h3>
          </div>
          
          <div className="space-y-4">
            {executiveFaqs.map((faq, index) => (
              <details key={faq.question} className="group glass-panel rounded-lg border border-white/10 [&_summary::-webkit-details-marker]:hidden" open={index === 0}>
                <summary className="flex items-center justify-between gap-4 p-5 sm:p-6 cursor-pointer">
                  <h4 className="text-lg font-bold text-white flex items-center gap-3">
                    {index === 0 ? <ShieldCheck className="w-5 h-5 text-brand-accent" /> : null}
                    {faq.question}
                  </h4>
                  <ChevronDown className="w-5 h-5 text-brand-accent group-open:-rotate-180 transition-transform" />
                </summary>
                <div className="px-5 pb-5 text-gray-400 leading-relaxed sm:px-6 sm:pb-6">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA Section */}
      <section id="contact" className="py-24 relative overflow-hidden bg-black/40 border-t border-white/5 sm:py-32">
        <div className="absolute inset-0 bg-brand-accent/5"></div>
        <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6">
          <div className="mb-12 max-w-3xl">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">Partnership Application</h2>
            <h3 className="mb-8 text-4xl font-display font-extrabold tracking-tight text-white md:text-6xl">Start a serious growth conversation.</h3>
            <p className="font-serif text-lg italic leading-relaxed text-gray-400 sm:text-xl">
              We partner with businesses that have at least $10K/month in marketing capacity and the operational ability to handle additional volume.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.82fr_1fr] lg:items-start">
            <div className="glass-panel rounded-lg p-6 sm:p-8">
              <div className="mb-8 flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-brand-accent" />
                <h4 className="text-2xl font-display font-bold text-white">What happens after you apply</h4>
              </div>
              <div className="space-y-5">
                {[
                  ["1", "We review your current digital footprint, offer clarity, and visible trust gaps."],
                  ["2", "We identify whether your market can support profitable acquisition scale."],
                  ["3", "If there is a fit, we invite you to a 15-minute strategic fit call."],
                ].map(([step, copy]) => (
                  <div key={step} className="flex gap-4 border-b border-white/8 pb-5 last:border-b-0 last:pb-0">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-brand-accent/40 bg-brand-accent/10 text-sm font-bold text-brand-accent">
                      {step}
                    </div>
                    <p className="leading-relaxed text-gray-300">{copy}</p>
                  </div>
                ))}
              </div>
              <div className="premium-hover-card mt-8 border border-white/8 bg-black/30 p-5">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-brand-accent">Fit Criteria</div>
                <p className="mt-3 text-sm leading-relaxed text-gray-400">
                  Established service businesses, proven demand, high customer value, and enough operational capacity to handle additional qualified opportunities.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 md:p-12 rounded-lg text-left border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-brand-accent to-brand-glow opacity-80"></div>
            <div className="mb-8">
              <h4 className="text-2xl font-display font-bold text-white">Request review</h4>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                Submit your URL. We will review the acquisition environment before recommending any engagement.
              </p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Executive Name</label>
                <input name="executiveName" required type="text" className="premium-input w-full bg-black/50 border border-white/10 rounded-lg px-5 py-4 text-white focus:outline-none" placeholder="e.g. John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Corporate Email</label>
                <input name="email" required type="email" className="premium-input w-full bg-black/50 border border-white/10 rounded-lg px-5 py-4 text-white focus:outline-none" placeholder="john@company.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Current Acquisition Investment</label>
                <select name="marketingCapacity" required className="premium-input w-full bg-black/50 border border-white/10 rounded-lg px-5 py-4 text-white focus:outline-none appearance-none">
                  <option value="under-10k">Under $10,000 / month</option>
                  <option value="10k-25k">$10,000 - $25,000 / month</option>
                  <option value="25k-50k">$25,000 - $50,000 / month</option>
                  <option value="50k-100k">$50,000 - $100,000 / month</option>
                  <option value="100k+">$100,000+ / month</option>
                  <option value="not-sure">Not sure yet</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Current Website <span className="text-gray-600">(optional)</span></label>
                <input name="websiteUrl" type="text" inputMode="url" className="premium-input w-full bg-black/50 border border-white/10 rounded-lg px-5 py-4 text-white focus:outline-none" placeholder="company.com" />
              </div>
              <button disabled={formState === "submitting"} type="submit" className="button-primary w-full text-black text-lg font-bold py-4 rounded-lg mt-4 disabled:opacity-60">
                {formState === "submitting" ? "Submitting..." : "Submit Application"}
              </button>
              {formMessage ? (
                <p className={`text-sm text-center leading-relaxed ${formState === "success" ? "text-green-400" : "text-red-400"}`}>
                  {formMessage}
                </p>
              ) : null}
              <p suppressHydrationWarning className="text-xs text-center text-gray-500 mt-6 uppercase tracking-wider leading-relaxed">
                <span className="text-brand-accent font-bold">Availability:</span> We only onboard 2 new established partners per {currentQuarter}.
              </p>
            </div>
          </form>
          </div>
        </div>
      </section>
    </main>
  );
}
