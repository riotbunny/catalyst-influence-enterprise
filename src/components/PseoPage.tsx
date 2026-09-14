import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import RevealOnScroll from "@/components/RevealOnScroll";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Compass, ShieldCheck, Target, Zap } from "lucide-react";

type LinkItem = {
  href: string;
  label: string;
};

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
};

const icons = {
  target: Target,
  shield: ShieldCheck,
  compass: Compass,
  zap: Zap,
};

export default function PseoPage({
  eyebrow,
  title,
  intro,
  primaryCta = "Apply For Partnership",
  sections,
  faqs,
  relatedLinks,
}: PseoPageProps) {
  return (
    <main className="min-h-screen">
      <RevealOnScroll />
      <Background />
      <Navbar />

      <section className="relative pt-32 pb-16 md:pt-48 md:pb-28 overflow-hidden">
        <div className="premium-rule absolute left-1/2 top-20 h-px w-[min(900px,calc(100%-3rem))] -translate-x-1/2" />
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="max-w-4xl">
            <p className="text-[10px] font-semibold text-brand-accent uppercase tracking-[0.18em] mb-5 sm:text-xs sm:tracking-[0.22em]">
              {eyebrow}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-black text-white leading-tight mb-7">
              {title}
            </h1>
            <p className="text-lg md:text-2xl text-gray-400 font-serif italic leading-relaxed max-w-3xl">
              {intro}
            </p>
            <div className="flex max-w-sm flex-col gap-4 mt-10 sm:max-w-none sm:flex-row">
              <Link
                href="/#contact"
                className="button-primary text-black px-7 py-4 rounded-lg font-bold tracking-wide inline-flex items-center justify-center gap-3"
              >
                {primaryCta}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services/programmatic-seo"
                className="px-7 py-4 rounded-lg font-bold tracking-wide text-white border border-white/20 hover:bg-white/10 transition-colors inline-flex items-center justify-center"
              >
                Explore PSEO
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-black/30 border-y border-white/5 sm:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 grid md:grid-cols-2 gap-6">
          {sections.map((section, index) => {
            const Icon = icons[section.icon ?? "target"];

            return (
              <article key={section.title} data-reveal="card" data-reveal-delay={index % 4} className="glass-panel p-6 sm:p-8 rounded-lg">
                <Icon className="w-8 h-8 text-brand-accent mb-6" />
                <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">
                  {section.title}
                </h2>
                {section.description ? (
                  <p className="text-gray-400 leading-relaxed mb-6">{section.description}</p>
                ) : null}
                <ul className="space-y-4">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3 text-gray-300 leading-relaxed">
                      <CheckCircle2 className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-12">
          <div>
            <p className="text-xs font-semibold text-brand-accent uppercase tracking-[0.2em] mb-4">
              Executive FAQ
            </p>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={faq.question}
                  className="group glass-panel rounded-lg border border-white/10 [&_summary::-webkit-details-marker]:hidden"
                  open={index === 0}
                >
                  <summary className="flex items-center justify-between gap-4 p-5 sm:p-6 cursor-pointer">
                    <h2 className="text-base sm:text-lg font-bold text-white">{faq.question}</h2>
                    <span className="text-brand-accent text-2xl leading-none group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="px-5 pb-5 sm:px-6 sm:pb-6 text-gray-400 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>

          <aside data-reveal="panel" className="glass-panel rounded-lg p-6 sm:p-8 h-fit">
            <h2 className="text-xl font-display font-bold text-white mb-5">Related Growth Paths</h2>
            <div className="space-y-3">
              {relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between gap-4 rounded-lg border border-white/10 px-4 py-3 text-gray-300 hover:text-white hover:border-brand-accent/60 transition-colors"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-brand-accent" />
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
