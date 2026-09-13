import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
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
      <Background />
      <Navbar />

      <section className="relative pt-36 pb-20 md:pt-48 md:pb-28 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[760px] bg-brand-indigo/30 rounded-full blur-[120px] -z-10 mix-blend-screen" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold text-brand-accent uppercase tracking-[0.22em] mb-5">
              {eyebrow}
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white leading-tight mb-7">
              {title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-serif italic leading-relaxed max-w-3xl">
              {intro}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link
                href="/#contact"
                className="bg-brand-accent text-white px-7 py-4 rounded-full font-bold tracking-wide hover:bg-brand-glow hover:text-black transition-all duration-300 inline-flex items-center justify-center gap-3"
              >
                {primaryCta}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services/programmatic-seo"
                className="px-7 py-4 rounded-full font-bold tracking-wide text-white border border-white/20 hover:bg-white/10 transition-colors inline-flex items-center justify-center"
              >
                Explore PSEO
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black/30 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-6">
          {sections.map((section) => {
            const Icon = icons[section.icon ?? "target"];

            return (
              <article key={section.title} className="glass-panel p-8 rounded-3xl">
                <Icon className="w-8 h-8 text-brand-accent mb-6" />
                <h2 className="text-2xl font-display font-bold text-white mb-4">
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

      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1fr_360px] gap-12">
          <div>
            <p className="text-xs font-semibold text-brand-accent uppercase tracking-[0.2em] mb-4">
              Executive FAQ
            </p>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={faq.question}
                  className="group glass-panel rounded-2xl border border-white/10 [&_summary::-webkit-details-marker]:hidden"
                  open={index === 0}
                >
                  <summary className="flex items-center justify-between gap-6 p-6 cursor-pointer">
                    <h2 className="text-lg font-bold text-white">{faq.question}</h2>
                    <span className="text-brand-accent text-2xl leading-none group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="px-6 pb-6 text-gray-400 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>

          <aside className="glass-panel rounded-3xl p-8 h-fit">
            <h2 className="text-xl font-display font-bold text-white mb-5">Related Growth Paths</h2>
            <div className="space-y-3">
              {relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 px-4 py-3 text-gray-300 hover:text-white hover:border-brand-accent/60 transition-colors"
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
