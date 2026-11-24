import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import RevealOnScroll from "@/components/RevealOnScroll";
import { ArrowRight, Check, CheckCircle2, Compass, Route, ShieldCheck, Target, Zap } from "lucide-react";
import Link from "next/link";

type LinkItem = { href: string; label: string };

type PseoPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  primaryCta?: string;
  sections: {
    title: string;
    description?: string;
    items: string[];
    icon?: "target" | "shield" | "compass" | "zap";
  }[];
  faqs: { question: string; answer: string }[];
  relatedLinks: LinkItem[];
  websiteSystem?: { audience: string; market?: string };
};

const icons = { target: Target, shield: ShieldCheck, compass: Compass, zap: Zap };

export default function PseoPage({
  eyebrow,
  title,
  intro,
  primaryCta = "Request an acquisition review",
  sections,
  faqs,
  relatedLinks,
  websiteSystem,
}: PseoPageProps) {
  const websiteSystemTitle = websiteSystem
    ? `A website system for ${websiteSystem.audience}${websiteSystem.market ? ` in ${websiteSystem.market}` : ""}.`
    : "";

  return (
    <main className="min-h-screen">
      <RevealOnScroll />
      <Background />
      <Navbar />

      <section className="relative overflow-hidden pb-20 pt-36 sm:pb-28 sm:pt-44">
        <div className="executive-grid absolute inset-0 -z-10" />
        <div className="site-shell">
          <p className="page-label mb-6">{eyebrow}</p>
          <h1 className="max-w-5xl font-display text-5xl font-normal leading-[0.98] text-white sm:text-6xl lg:text-7xl">{title}</h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-gray-400 sm:text-lg">{intro}</p>
          <div className="mt-9 flex max-w-md flex-col gap-3 sm:max-w-none sm:flex-row">
            <Link href="/#contact" className="button-primary inline-flex items-center justify-center gap-3 rounded-md px-7 py-4 text-sm font-extrabold">
              {primaryCta} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/services" className="button-secondary inline-flex items-center justify-center rounded-md px-7 py-4 text-sm font-extrabold">
              Review all services
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-brand-paper py-20 text-[#18201d] sm:py-28">
        <div className="site-shell grid gap-5 md:grid-cols-2">
          {sections.map((section, index) => {
            const Icon = icons[section.icon ?? "target"];
            return (
              <article key={section.title} data-reveal="card" data-reveal-delay={index % 4} className="premium-hover-card light-panel rounded-lg p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <Icon className="h-7 w-7 text-brand-forest" />
                  <span className="text-xs font-extrabold text-brand-coral">0{index + 1}</span>
                </div>
                <h2 className="mt-7 font-display text-3xl leading-tight">{section.title}</h2>
                {section.description ? <p className="mt-4 text-sm leading-7 text-[#5b6761]">{section.description}</p> : null}
                <ul className="mt-6 space-y-4 border-t border-[#d7ddd8] pt-6">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-7 text-[#37433e]">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-brand-forest" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      {websiteSystem ? (
        <section className="bg-brand-forest py-20 sm:py-28">
          <div className="site-shell">
            <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
              <div>
                <p className="page-label mb-5 text-[#ead6ad]">Website systems</p>
                <h2 className="section-display text-white">{websiteSystemTitle}</h2>
              </div>
              <p className="max-w-2xl text-base leading-8 text-[#c9d7d0]">
                The website is the acquisition layer: positioning, page architecture, proof, routing, conversion paths, forms, and measurement working together.
              </p>
            </div>

            <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-white/12 bg-white/12 md:grid-cols-2">
              {[
                { title: "Conversion architecture", copy: "Message hierarchy, objections, proof, CTA placement, and mobile decision flow.", icon: Target },
                { title: "Search infrastructure", copy: "Service, industry, market, and intent pages connected through disciplined crawl structure.", icon: Route },
                { title: "Trust and proof design", copy: "Evidence, authority signals, and case-study framing positioned where uncertainty appears.", icon: ShieldCheck },
                { title: "Performance and measurement", copy: "Fast pages, clean metadata, structured data, forms, analytics, and source context.", icon: Zap },
              ].map(({ title: itemTitle, copy, icon: Icon }, index) => (
                <article key={itemTitle} data-reveal="card" data-reveal-delay={index} className="bg-[#193a32] p-6 sm:p-8">
                  <Icon className="h-6 w-6 text-brand-accent" />
                  <h3 className="mt-6 font-display text-2xl text-white">{itemTitle}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#c9d7d0]">{copy}</p>
                </article>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-5">
              {["Homepage", "Service pages", "Industry pages", "Market pages", "Lead system"].map((step, index) => (
                <div key={step} className="border-t border-white/20 pt-4">
                  <span className="text-xs font-extrabold text-brand-accent">0{index + 1}</span>
                  <p className="mt-2 text-sm font-bold text-white">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-white py-20 text-[#18201d] sm:py-28">
        <div className="site-shell grid gap-12 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="page-label mb-5">Executive FAQ</p>
            <div className="border-t border-[#d4dcd7]">
              {faqs.map((faq, index) => (
                <details key={faq.question} className="group border-b border-[#d4dcd7]" open={index === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 [&::-webkit-details-marker]:hidden">
                    <h2 className="text-base font-extrabold sm:text-lg">{faq.question}</h2>
                    <span className="text-2xl text-brand-forest transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-3xl pb-7 text-sm leading-7 text-[#5b6761]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>

          <aside data-reveal="panel" className="h-fit rounded-lg bg-[#101513] p-6 text-white sm:p-8">
            <p className="text-xs font-extrabold uppercase text-brand-accent">Related paths</p>
            <h2 className="mt-3 font-display text-3xl">Continue the evaluation.</h2>
            <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
              {relatedLinks.map((link) => (
                <Link key={link.href} href={link.href} className="group flex items-center justify-between gap-4 py-4 text-sm font-semibold text-gray-300 transition-colors hover:text-white">
                  <span>{link.label}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-brand-accent transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
            <div className="mt-7 flex gap-3 text-sm leading-6 text-gray-400">
              <Check className="mt-1 h-4 w-4 shrink-0 text-brand-accent" />
              Every recommendation is tied to a specific acquisition role.
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
