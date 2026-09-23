import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import { createMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Compass, FileSearch, ShieldCheck } from "lucide-react";

export const metadata: Metadata = createMetadata({
  title: "Request Received | Catalyst Influence",
  description:
    "Your Catalyst Influence request has been received. We will review your acquisition environment before recommending next steps.",
  path: "/thank-you",
  indexable: false,
});

const reviewSteps = [
  {
    icon: FileSearch,
    title: "Digital footprint review",
    copy: "We look at your visible trust signals, search presence, page flow, and how clearly a serious buyer can understand the offer.",
  },
  {
    icon: Compass,
    title: "Acquisition path diagnosis",
    copy: "We evaluate where demand is likely being lost across traffic, landing pages, follow-up, and measurement.",
  },
  {
    icon: ShieldCheck,
    title: "Fit-based follow-up",
    copy: "If there is a clear path to improve qualified acquisition, we will follow up with the most relevant next step.",
  },
];

export default function ThankYouPage() {
  return (
    <main className="min-h-screen">
      <Background />
      <Navbar />

      <section className="relative px-5 pb-20 pt-32 sm:px-6 md:pb-28 md:pt-48">
        <div className="premium-rule absolute left-1/2 top-20 h-px w-[min(900px,calc(100%-3rem))] -translate-x-1/2" />
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 inline-flex items-center gap-3 rounded-lg border border-brand-accent/30 bg-brand-accent/10 px-4 py-3 text-sm font-bold text-brand-accent">
            <CheckCircle2 className="h-5 w-5" />
            Application received
          </div>

          <div className="max-w-4xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
              Review underway
            </p>
            <h1 className="mb-6 font-display text-4xl font-black leading-tight text-white sm:text-5xl md:text-7xl">
              Your request is in the right hands.
            </h1>
            <p className="max-w-3xl font-serif text-lg italic leading-relaxed text-gray-400 sm:text-xl">
              We will review your acquisition environment before recommending any engagement. The goal is to determine whether Catalyst can create a meaningful path toward more qualified demand, stronger trust, and cleaner conversion.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {reviewSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className="premium-hover-card glass-panel rounded-lg p-6"
                  data-reveal="card"
                  data-reveal-delay={index}
                >
                  <Icon className="mb-5 h-7 w-7 text-brand-accent" />
                  <h2 className="mb-3 font-display text-xl font-bold text-white">{step.title}</h2>
                  <p className="leading-relaxed text-gray-400">{step.copy}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/services"
              className="button-primary inline-flex items-center justify-center gap-3 rounded-lg px-6 py-4 font-bold text-black"
            >
              Review Services <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg border border-white/16 bg-white/[0.03] px-6 py-4 font-bold text-white transition-colors hover:border-white/28 hover:bg-white/10"
            >
              Back To Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
