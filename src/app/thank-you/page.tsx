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

      <section className="relative overflow-hidden pb-20 pt-36 sm:pb-28 sm:pt-44">
        <div className="executive-grid absolute inset-0 -z-10" />
        <div className="site-shell">
          <div className="mb-10 inline-flex items-center gap-3 rounded-md border border-brand-accent/30 bg-brand-accent/10 px-4 py-3 text-sm font-bold text-brand-accent">
            <CheckCircle2 className="h-5 w-5" />
            Application received
          </div>

          <div className="max-w-4xl">
            <p className="page-label mb-6">Review underway</p>
            <h1 className="font-display text-5xl font-normal leading-[0.98] text-white sm:text-6xl lg:text-7xl">
              Your request is in the right hands.
            </h1>
            <p className="mt-7 max-w-3xl text-base leading-8 text-gray-400 sm:text-lg">
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
                  <h2 className="mb-3 font-display text-2xl font-normal text-white">{step.title}</h2>
                  <p className="leading-7 text-gray-400">{step.copy}</p>
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
