"use client";

import AnimatedStat from "@/components/AnimatedStat";
import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import RevealOnScroll from "@/components/RevealOnScroll";
import { getExecutiveFaqs } from "@/content/faqs";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronDown,
  Compass,
  Gauge,
  MapPinned,
  MonitorSmartphone,
  MousePointerClick,
  Search,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

const capabilities = [
  {
    icon: Compass,
    title: "Acquisition architecture",
    copy: "Diagnose the buyer path, channel roles, offer, qualification, and measurement before adding more activity.",
    href: "/services/customer-acquisition-system",
  },
  {
    icon: MonitorSmartphone,
    title: "Conversion-first websites",
    copy: "Design and develop fast, credible websites that act as the operating layer for search, paid demand, and lead capture.",
    href: "/services/conversion-focused-web-design",
  },
  {
    icon: Search,
    title: "Programmatic SEO",
    copy: "Build useful service, industry, intent, and market page systems with disciplined indexation controls.",
    href: "/services/programmatic-seo",
  },
  {
    icon: MapPinned,
    title: "Local SEO systems",
    copy: "Turn priority markets into distinct demand-capture assets supported by local relevance and internal structure.",
    href: "/services/local-seo",
  },
  {
    icon: MousePointerClick,
    title: "Paid acquisition",
    copy: "Align targeting, creative, landing pages, qualification, and revenue feedback across the channels that matter.",
    href: "/services/paid-acquisition",
  },
  {
    icon: Gauge,
    title: "Conversion architecture",
    copy: "Clarify the offer, surface proof, handle objections, and make the next step feel proportionate to buyer trust.",
    href: "/services/conversion-architecture",
  },
  {
    icon: Workflow,
    title: "CRM and lead automation",
    copy: "Route, enrich, follow up, and preserve source context so qualified opportunities do not disappear after submission.",
    href: "/services/marketing-automation",
  },
  {
    icon: BarChart3,
    title: "Attribution and reporting",
    copy: "Connect acquisition activity to qualified pipeline so leadership can see what deserves the next dollar.",
    href: "/services/growth-architecture",
  },
];

const methodology = [
  {
    number: "01",
    title: "Diagnose",
    window: "Days 1-21",
    copy: "Map demand, inspect the website and funnel, define qualified action, and identify where trust or follow-up breaks.",
  },
  {
    number: "02",
    title: "Build",
    window: "Days 22-60",
    copy: "Deploy the priority pages, conversion paths, campaigns, tracking, and automation around one acquisition thesis.",
  },
  {
    number: "03",
    title: "Prove and scale",
    window: "Days 61-90",
    copy: "Read actual behavior and lead quality, reinforce what works, and stop funding activity that cannot prove its role.",
  },
];

export default function LandingPage({
  city,
  state,
  marketAngle,
  localBuyerIntent,
  localSearchFocus = [],
  localServices = [],
  serviceAreaCopy,
  localMarketSummary,
  localMarketSignals = [],
  extraFaqs = [],
  relatedCityServiceLinks = [],
}: LandingPageProps) {
  const router = useRouter();
  const currentQuarter = `Q${Math.floor(new Date().getMonth() / 3) + 1}`;
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");
  const formattedCity = city
    ? city.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
    : null;
  const marketName = formattedCity ? `${formattedCity}${state ? `, ${state}` : ""}` : null;
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

      <section className="relative isolate flex min-h-[92svh] items-end overflow-hidden border-b border-white/10 pb-10 pt-36 sm:pb-12 lg:pt-44">
        <Image
          src="/proof-automation-flow-redacted-v2.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 z-0 object-cover object-center opacity-[0.48] saturate-[0.7]"
          aria-hidden="true"
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0b100e]/95 via-[#0b100e]/80 to-[#0b100e]/45" />
        <div className="executive-grid absolute inset-0 z-10" />

        <div className="site-shell relative z-20">
          <div className="max-w-5xl">
            <p className="page-label mb-7">
              {marketName ? `Acquisition systems for ${marketName}` : "Independent acquisition architecture"}
            </p>
            <h1 className="max-w-5xl font-display text-5xl font-normal leading-[0.98] text-white sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
              {formattedCity ? (
                <>Customer acquisition in {formattedCity}, engineered end to end.</>
              ) : (
                <>Customer acquisition, engineered end to end.</>
              )}
            </h1>
            <p className="mt-7 max-w-3xl text-base leading-8 text-gray-300 sm:text-lg lg:text-xl">
              {formattedCity
                ? `Catalyst connects search visibility, conversion-first websites, paid demand, automation, and attribution for established service businesses competing in ${formattedCity}.`
                : "Catalyst connects search visibility, conversion-first websites, paid demand, automation, and attribution into one accountable growth system for established service businesses."}
            </p>
            <div className="mt-9 flex max-w-md flex-col gap-3 sm:max-w-none sm:flex-row">
              <a href="#contact" className="button-primary inline-flex items-center justify-center gap-3 rounded-md px-6 py-4 text-sm font-extrabold sm:px-7">
                Request an acquisition review <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#results" className="button-secondary inline-flex items-center justify-center gap-3 rounded-md px-6 py-4 text-sm font-extrabold sm:px-7">
                Inspect the proof <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="mt-14 grid border-y border-white/14 bg-[#101513]/64 sm:grid-cols-3">
            {[
              { label: "indexed pages deployed", value: <AnimatedStat to={21.3} decimals={1} suffix="K" durationMs={1900} /> },
              { label: "qualified leads in 24 hours", value: <AnimatedStat to={437} durationMs={1900} /> },
              { label: "documented lead cost", value: <AnimatedStat from={10.57} to={2.35} decimals={2} prefix="$" durationMs={1900} /> },
            ].map((item) => (
              <div key={item.label} className="border-b border-white/10 px-5 py-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                <div className="text-2xl font-extrabold text-white sm:text-3xl">{item.value}</div>
                <div className="mt-1 text-xs font-bold uppercase text-gray-500">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-paper py-20 text-[#18201d] sm:py-28">
        <div className="site-shell">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="page-label mb-5">The operating problem</p>
              <h2 className="section-display">Revenue leaks between the channels.</h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[#53605b] sm:text-lg">
              Most businesses do not have a traffic problem in isolation. They have a system problem: search, ads, the website, sales follow-up, and reporting are optimized by different people toward different definitions of success.
            </p>
          </div>

          <div className="mt-14 grid border-y border-[#cfd7d2] md:grid-cols-3">
            {[
              ["Demand without trust", "The right buyer arrives, but the website cannot make expertise, fit, or proof clear enough to earn action."],
              ["Leads without follow-through", "Forms and calls enter a disconnected process where speed, source context, and qualification disappear."],
              ["Activity without judgment", "Reports show traffic and leads while leadership still cannot see which work is creating valuable pipeline."],
            ].map(([title, copy], index) => (
              <article key={title} data-reveal="card" data-reveal-delay={index} className="border-b border-[#cfd7d2] py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
                <span className="text-sm font-extrabold text-brand-coral">0{index + 1}</span>
                <h3 className="mt-5 font-display text-3xl leading-tight text-[#18201d]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#5b6762]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {formattedCity ? (
        <section className="border-y border-[#c9d7d0] bg-brand-sage py-20 text-[#18201d] sm:py-24">
          <div className="site-shell">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
              <div>
                <p className="page-label mb-5">Market intelligence</p>
                <h2 className="section-display">What acquisition requires in {formattedCity}.</h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-[#53605b]">{localMarketSummary ?? marketAngle}</p>
              </div>
              <div className="space-y-3">
                {(localMarketSignals.length ? localMarketSignals : localSearchFocus.slice(0, 3)).map((signal, index) => (
                  <div key={signal} data-reveal="metric" data-reveal-delay={index} className="flex gap-4 border-b border-[#b9c9c1] py-5 first:pt-0">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand-forest" />
                    <p className="leading-7 text-[#45524d]">{signal}</p>
                  </div>
                ))}
              </div>
            </div>

            {(localBuyerIntent || serviceAreaCopy) ? (
              <div className="mt-12 grid gap-6 border-t border-[#b9c9c1] pt-9 md:grid-cols-2">
                <div>
                  <h3 className="font-display text-2xl">Commercial intent</h3>
                  <p className="mt-3 text-sm leading-7 text-[#53605b]">{localBuyerIntent}</p>
                </div>
                <div>
                  <h3 className="font-display text-2xl">Service-area fit</h3>
                  <p className="mt-3 text-sm leading-7 text-[#53605b]">{serviceAreaCopy}</p>
                </div>
              </div>
            ) : null}
            {localServices.length ? (
              <div className="mt-9 flex flex-wrap gap-2">
                {localServices.map((service) => (
                  <span key={service} className="rounded-md border border-[#afc1b8] bg-white/45 px-4 py-2 text-xs font-bold text-[#3f5149]">
                    {service}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <section id="services" className="bg-[#101513] py-20 sm:py-28">
        <div className="site-shell">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="page-label mb-5">Capabilities</p>
              <h2 className="section-display text-white">One system. Every critical layer.</h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
              Catalyst works across the full buyer journey. Engagements are shaped around the actual constraint, not a predetermined channel retainer.
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map(({ icon: Icon, title, copy, href }, index) => (
              <Link key={title} href={href} data-reveal="card" data-reveal-delay={index % 4} className="group min-h-[280px] bg-[#151b18] p-6 transition-colors hover:bg-[#1b2420] sm:p-7">
                <div className="flex items-center justify-between">
                  <Icon className="h-6 w-6 text-brand-accent" />
                  <ArrowUpRight className="h-4 w-4 text-gray-600 transition-colors group-hover:text-brand-accent" />
                </div>
                <h3 className="mt-10 font-display text-2xl leading-tight text-white">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-gray-400">{copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="results" className="bg-white py-20 text-[#18201d] sm:py-28">
        <div className="site-shell">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="page-label mb-5">Documented proof</p>
              <h2 className="section-display">The work leaves evidence.</h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[#59655f] sm:text-lg">
              Real reporting from acquisition environments where search coverage, paid demand, landing pages, and follow-up were designed to work together.
            </p>
          </div>

          <div className="mt-14 grid gap-7 lg:grid-cols-[1.35fr_0.65fr]">
            <figure data-reveal="panel" className="premium-hover-image rounded-lg border border-[#d7ddd8] bg-[#edf0ed] shadow-[0_22px_60px_rgba(25,45,38,0.1)]">
              <div className="relative aspect-[1400/650]">
                <Image src="/proof-home-tech-search-console.webp" alt="Google Search Console report documenting 21.3K indexed pages" fill sizes="(min-width: 1024px) 70vw, 100vw" className="object-cover" />
              </div>
              <figcaption className="flex flex-col gap-2 border-t border-[#d7ddd8] bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm font-extrabold">Programmatic search deployment</span>
                <span className="text-xs font-bold uppercase text-[#68736e]">21.3K indexed pages</span>
              </figcaption>
            </figure>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {[
                ["437", "qualified leads generated in 24 hours"],
                ["$2.35", "documented cost per qualified lead"],
                ["18,464", "paid-media click actions documented"],
              ].map(([value, label], index) => (
                <div key={label} data-reveal="metric" data-reveal-delay={index} className="light-panel flex flex-col justify-end rounded-lg p-6">
                  <div className="font-display text-4xl text-brand-forest sm:text-5xl">{value}</div>
                  <p className="mt-3 text-sm font-semibold leading-6 text-[#5c6862]">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {[
              { src: "/proof-home-tech-meta.webp", alt: "Paid media report showing reach, impressions, spend, views, and clicks", title: "Paid acquisition" },
              { src: "/proof-whitestone-meta.webp", alt: "Paid visibility report showing reach, impressions, views, clicks, and spend", title: "Visibility at scale" },
              { src: "/proof-automation-flow-redacted-v2.webp", alt: "Redacted lead qualification and follow-up automation workflow", title: "Lead automation" },
            ].map((proof, index) => (
              <figure key={proof.src} data-reveal="card" data-reveal-delay={index} className="premium-hover-image rounded-lg border border-[#d7ddd8] bg-[#edf0ed]">
                <div className="relative aspect-[16/8]">
                  <Image src={proof.src} alt={proof.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                </div>
                <figcaption className="border-t border-[#d7ddd8] bg-white px-5 py-4 text-sm font-extrabold">{proof.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="methodology" className="bg-brand-sage py-20 text-[#18201d] sm:py-28">
        <div className="site-shell">
          <p className="page-label mb-5">The first 90 days</p>
          <h2 className="section-display">A disciplined path from diagnosis to signal.</h2>

          <div className="mt-14 border-y border-[#b9c9c1]">
            {methodology.map((phase, index) => (
              <article key={phase.number} data-reveal="panel" data-reveal-delay={index} className="roadmap-card grid gap-5 border-b border-[#b9c9c1] py-8 last:border-b-0 md:grid-cols-[90px_0.7fr_1.3fr] md:items-center">
                <div className="roadmap-marker flex h-14 w-14 items-center justify-center rounded-full text-sm font-extrabold">{phase.number}</div>
                <div>
                  <p className="text-xs font-extrabold uppercase text-brand-coral">{phase.window}</p>
                  <h3 className="mt-2 font-display text-3xl">{phase.title}</h3>
                </div>
                <p className="max-w-2xl text-sm leading-7 text-[#52605a]">{phase.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="leadership" className="bg-[#101513] py-20 sm:py-28">
        <div className="site-shell grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div data-reveal="panel" className="premium-hover-image relative mx-auto w-full max-w-[480px] overflow-hidden rounded-lg border border-white/12 bg-[#171d1a]">
            <div className="relative aspect-[4/5]">
              <Image src="/founder-v2.jpg" alt="Abel V., Principal Architect at Catalyst Influence" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover object-[52%_26%] contrast-[1.02]" />
            </div>
            <div className="border-t border-white/10 bg-[#151b18] px-6 py-5">
              <p className="text-lg font-extrabold text-white">Abel V.</p>
              <p className="mt-1 text-xs font-bold uppercase text-brand-accent">Principal Architect</p>
            </div>
          </div>

          <div>
            <p className="page-label mb-5">Founder-led delivery</p>
            <h2 className="section-display text-white">Senior judgment stays close to the work.</h2>
            <p className="mt-7 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
              Catalyst is built for operators who do not want strategy sold by one person and delegated through layers. The same principal who diagnoses the acquisition path shapes the website, search architecture, conversion logic, automation, and performance review.
            </p>

            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              {[
                "Programmatic and technical SEO architecture",
                "Conversion-first web design and development",
                "Paid acquisition and landing-page alignment",
                "CRM automation, lead routing, and attribution",
              ].map((item) => (
                <div key={item} className="flex gap-3 border-b border-white/10 py-4 text-sm font-semibold text-gray-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-paper py-20 text-[#18201d] sm:py-28">
        <div className="site-shell grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="page-label mb-5">Executive briefing</p>
            <h2 className="section-display">Questions serious buyers ask.</h2>
          </div>
          <div className="border-t border-[#cfd7d2]">
            {executiveFaqs.map((faq, index) => (
              <details key={faq.question} className="group border-b border-[#cfd7d2]" open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base font-extrabold sm:text-lg">{faq.question}</h3>
                  <ChevronDown className="h-5 w-5 shrink-0 text-brand-forest transition-transform group-open:rotate-180" />
                </summary>
                <p className="max-w-3xl pb-7 text-sm leading-7 text-[#5a6660]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-brand-forest py-20 sm:py-28">
        <div className="site-shell">
          <div className="mb-12 max-w-3xl">
            <p className="page-label mb-5 text-[#ead6ad]">Request a review</p>
            <h2 className="section-display text-white">Give us the current system. We will find the constraint.</h2>
            <p className="mt-6 text-base leading-8 text-[#c9d7d0] sm:text-lg">
              Submit the website and current investment range. Catalyst will review the visible acquisition environment before recommending an engagement.
            </p>
          </div>

          <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="rounded-lg border border-white/14 bg-[#193a32] p-6 sm:p-8">
              <h3 className="font-display text-3xl text-white">What happens next</h3>
              <div className="mt-7 space-y-6">
                {[
                  "We review the offer, visible trust, search footprint, and conversion path.",
                  "We identify whether the market and economics can support a serious acquisition system.",
                  "If there is a credible path, we respond with the most relevant next conversation.",
                ].map((copy, index) => (
                  <div key={copy} className="flex gap-4 border-b border-white/12 pb-6 last:border-b-0 last:pb-0">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#ead6ad]/55 text-xs font-extrabold text-[#ead6ad]">{index + 1}</span>
                    <p className="text-sm leading-7 text-[#d8e2dd]">{copy}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 border-l-2 border-brand-accent bg-[#102d27] px-5 py-4">
                <p className="text-xs font-extrabold uppercase text-brand-accent">Current availability</p>
                <p suppressHydrationWarning className="mt-2 text-sm leading-6 text-[#c9d7d0]">Two established partner openings for {currentQuarter}.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="rounded-lg bg-white p-6 text-[#18201d] shadow-[0_28px_80px_rgba(5,20,15,0.25)] sm:p-8 md:p-10">
              <div className="mb-8">
                <h3 className="font-display text-3xl">Acquisition review request</h3>
                <p className="mt-3 text-sm leading-7 text-[#65716b]">No sales script. We assess fit before recommending work.</p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="executiveName" className="mb-2 block text-sm font-bold">Executive name</label>
                  <input id="executiveName" name="executiveName" required type="text" className="premium-input w-full rounded-md border border-[#cbd3ce] bg-[#f7f8f6] px-4 py-4 text-[#18201d] outline-none" placeholder="John Doe" />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-bold">Corporate email</label>
                  <input id="email" name="email" required type="email" className="premium-input w-full rounded-md border border-[#cbd3ce] bg-[#f7f8f6] px-4 py-4 text-[#18201d] outline-none" placeholder="john@company.com" />
                </div>
                <div>
                  <label htmlFor="marketingCapacity" className="mb-2 block text-sm font-bold">Current acquisition investment</label>
                  <select id="marketingCapacity" name="marketingCapacity" required defaultValue="" className="premium-input w-full rounded-md border border-[#cbd3ce] bg-[#f7f8f6] px-4 py-4 text-[#18201d] outline-none">
                    <option value="" disabled>Select a range</option>
                    <option value="under-10k">Under $10,000 / month</option>
                    <option value="10k-25k">$10,000 - $25,000 / month</option>
                    <option value="25k-50k">$25,000 - $50,000 / month</option>
                    <option value="50k-100k">$50,000 - $100,000 / month</option>
                    <option value="100k+">$100,000+ / month</option>
                    <option value="not-sure">Not sure yet</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="websiteUrl" className="mb-2 block text-sm font-bold">Current website <span className="font-normal text-[#7b8580]">(optional)</span></label>
                  <input id="websiteUrl" name="websiteUrl" type="text" inputMode="url" className="premium-input w-full rounded-md border border-[#cbd3ce] bg-[#f7f8f6] px-4 py-4 text-[#18201d] outline-none" placeholder="company.com" />
                </div>
              </div>

              <button disabled={formState === "submitting"} type="submit" className="button-primary mt-7 inline-flex w-full items-center justify-center gap-3 rounded-md px-6 py-4 text-base font-extrabold disabled:opacity-60">
                {formState === "submitting" ? "Submitting..." : "Submit for review"}
                {formState !== "submitting" ? <ArrowRight className="h-4 w-4" /> : null}
              </button>
              {formMessage ? (
                <p className={`mt-4 text-center text-sm ${formState === "success" ? "text-brand-forest" : "text-red-700"}`}>{formMessage}</p>
              ) : null}
              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#77817c]">
                <ShieldCheck className="h-4 w-4" /> Your information is used only to review this request.
              </div>
            </form>
          </div>

          {formattedCity && relatedCityServiceLinks.length ? (
            <div className="mt-14 border-t border-white/14 pt-8">
              <p className="mb-4 text-xs font-extrabold uppercase text-[#a9beb5]">Related acquisition paths in {formattedCity}</p>
              <div className="flex flex-wrap gap-2">
                {relatedCityServiceLinks.slice(0, 8).map((link) => (
                  <Link key={link.href} href={link.href} className="rounded-md border border-white/14 px-4 py-2 text-xs font-semibold text-[#d8e2dd] transition-colors hover:border-brand-accent hover:text-white">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
