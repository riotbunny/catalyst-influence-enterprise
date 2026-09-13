"use client";

import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { Brain, BarChart3, Users, ChevronDown, CheckCircle2, Compass, ShieldCheck, MousePointerClick, Zap } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";

interface LandingPageProps {
  city?: string;
  state?: string;
  marketAngle?: string;
}

export default function LandingPage({ city, state, marketAngle }: LandingPageProps) {
  const currentQuarter = `Q${Math.floor(new Date().getMonth() / 3) + 1}`;
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");
  
  // Format city name for display (e.g., "new-york" -> "New York")
  const formattedCity = city 
    ? city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : null;

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
    setFormMessage("Application received. We will review your digital footprint and follow up if there is a fit.");
  }

  return (
    <main className="min-h-screen">
      <Background />
      <Navbar />
      
      {/* 1. Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-indigo/30 rounded-full blur-[120px] -z-10 mix-blend-screen"></div>
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-brand-accent/10 rounded-full blur-[90px] -z-10 mix-blend-screen"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
          <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
          <span suppressHydrationWarning className="text-xs font-semibold tracking-widest text-gray-300 uppercase">
            Accepting 2 established partners for {currentQuarter}
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white leading-tight mb-6 tracking-tighter">
          PREDICTABLE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-glow">CUSTOMER ACQUISITION.</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto font-serif italic leading-relaxed">
          {formattedCity 
            ? `Partnering with established service businesses in ${formattedCity} to rebuild your digital acquisition system so the right prospects find you, trust you, and take action.` 
            : `We rebuild the critical parts of your digital acquisition system so more of the right prospects find you, trust you, and take action.`}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6">
          <a href="#contact" className="group bg-brand-accent text-white px-8 py-4 rounded-full font-bold tracking-wide hover:bg-brand-glow hover:text-black transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,140,0,0.3)] hover:shadow-[0_0_40px_rgba(255,184,77,0.5)]">
            Apply For Partnership
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <a href="#results" className="px-8 py-4 flex items-center justify-center rounded-full font-bold tracking-wide text-white border border-white/20 hover:bg-white/10 transition-colors">
            See The Proof
          </a>
        </div>
        </div>
      </section>

      {/* 2. Enterprise Trust */}
      <section className="py-12 border-y border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-[0.2em] mb-8">
            {formattedCity 
              ? `Trusted by industry leaders in ${formattedCity} to architect their growth`
              : `Trusted by industry leaders to architect their growth`}
          </p>
          <div className="flex flex-wrap justify-center gap-16 md:gap-32 opacity-50 hover:opacity-100 transition-all duration-700">
            <div className="text-2xl font-display font-bold text-gray-400 flex items-center">Salesnet LLC</div>
            <div className="text-2xl font-serif font-bold text-gray-400 italic flex items-center">McMaster Lawfirm</div>
            <div className="text-2xl font-sans font-black text-gray-400 tracking-tighter flex items-center">Home Tech Dealer Inc.</div>
          </div>
        </div>
      </section>

      {formattedCity ? (
        <section className="py-24 border-b border-white/5 bg-black/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
              <div>
                <h2 className="text-xs font-semibold text-brand-accent uppercase tracking-[0.2em] mb-4">
                  Local Growth Architecture
                </h2>
                <h3 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-6">
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
                </div>
              </div>

              <div className="glass-panel rounded-3xl p-8">
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
          </div>
        </section>
      ) : null}

      {/* 3. Proof of Impact */}
      <section id="results" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 text-center">
            <h2 className="text-xs font-semibold text-brand-accent uppercase tracking-[0.2em] mb-4">Proof of Impact</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">We Don&apos;t Guess. We Engineer Results.</h3>
          </div>

          <div className="glass-panel p-8 md:p-16 rounded-3xl border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[100px] -z-10"></div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
                  <span className="text-xs font-semibold tracking-widest text-brand-accent uppercase">Enterprise Case Study</span>
                </div>
                <h4 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">Home Tech Dealer</h4>
                <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                  Home Tech Dealer required an aggressive omnichannel scaling strategy. By deploying a custom programmatic SEO (pSEO) architecture alongside behaviorally-optimized paid media, we built a customer acquisition machine that generated over 400 highly-qualified leads in a single 24-hour period.
                </p>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <BarChart3 className="w-8 h-8 text-brand-accent mb-4" />
                    <div className="text-4xl font-display font-bold text-white mb-2">21.3k</div>
                    <div className="text-sm text-gray-400 font-medium leading-relaxed">New Pages Indexed<br/>(Programmatic SEO)</div>
                  </div>
                  <div>
                    <Users className="w-8 h-8 text-brand-accent mb-4" />
                    <div className="text-4xl font-display font-bold text-white mb-2">437</div>
                    <div className="text-sm text-gray-400 font-medium leading-relaxed">High-Intent Leads<br/>Generated in 24 Hours</div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-black/60 rounded-2xl p-6 border border-white/5 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 px-3 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold tracking-wider uppercase rounded-bl-lg">Verified Data</div>
                  <div className="text-sm font-semibold text-gray-400 mb-4">Google Search Console (30 Days)</div>
                  <div className="flex items-end gap-2 mb-2">
                    <div className="text-3xl font-bold text-green-500">21.3K</div>
                    <div className="text-sm text-gray-500 pb-1">Indexed Pages</div>
                  </div>
                  <div className="w-full h-24 flex items-end gap-1 mt-4">
                    {[2,3,2,4,3,2,1,2,3,45,45,47,48,48,48,48,45,45,45,35,35,35,35,34,34,34,34].map((h, i) => (
                      <div key={i} className="flex-1 bg-green-500/80 rounded-t-sm hover:bg-green-400 transition-colors" style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                </div>

                <div className="bg-black/60 rounded-2xl p-6 border border-white/5 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 px-3 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-bold tracking-wider uppercase rounded-bl-lg">Verified Data</div>
                  <div className="text-sm font-semibold text-gray-400 mb-4">Meta Ads Manager (24-Hour Yield)</div>
                  <div className="flex justify-between items-end border-b border-white/10 pb-4 mb-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Results</div>
                      <div className="text-2xl font-bold text-white">347 <span className="text-sm font-normal text-gray-500">Website Leads</span></div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Cost Per Result</div>
                      <div className="text-2xl font-bold text-white">$2.35</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-2xl font-bold text-white">90 <span className="text-sm font-normal text-gray-500">Website Leads</span></div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">$3.35</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Methodology Section (The Mechanism) */}
      <section id="methodology" className="py-32 relative bg-black/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <h2 className="text-xs font-semibold text-brand-accent uppercase tracking-[0.2em] mb-4">Our Mechanism</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-white max-w-3xl leading-tight">The Catalyst Influence Architecture™</h3>
            <p className="text-xl text-gray-400 mt-6 max-w-2xl font-serif italic">We don&apos;t just &quot;run ads&quot;. We rebuild the four layers of your customer acquisition environment.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-panel p-8 rounded-3xl hover:bg-white/5 transition-all duration-500 group border-t-2 border-t-brand-indigo/50">
              <Compass className="w-8 h-8 text-brand-accent mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-bold text-white mb-4">1. Discovery</h4>
              <p className="text-gray-400 leading-relaxed text-sm">Get the right person into the environment. We engineer targeted SEO, paid media, and content structures to capture high-value intent.</p>
            </div>
            
            <div className="glass-panel p-8 rounded-3xl hover:bg-white/5 transition-all duration-500 group border-t-2 border-t-brand-indigo/50">
              <ShieldCheck className="w-8 h-8 text-brand-accent mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-bold text-white mb-4">2. Trust</h4>
              <p className="text-gray-400 leading-relaxed text-sm">Immediately reduce uncertainty. We design your visual credibility, authority markers, and consistency to make them feel safe taking the next step.</p>
            </div>

            <div className="glass-panel p-8 rounded-3xl hover:bg-white/5 transition-all duration-500 group border-t-2 border-t-brand-indigo/50">
              <MousePointerClick className="w-8 h-8 text-brand-accent mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-bold text-white mb-4">3. Decision</h4>
              <p className="text-gray-400 leading-relaxed text-sm">Structure information so taking action feels deeply logical. We rebuild offer architecture, messaging, and proactive objection resolution.</p>
            </div>

            <div className="glass-panel p-8 rounded-3xl hover:bg-white/5 transition-all duration-500 group border-t-2 border-t-brand-accent/50 shadow-[0_-10px_30px_rgba(255,140,0,0.05)]">
              <Zap className="w-8 h-8 text-brand-accent mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-bold text-white mb-4">4. Activation</h4>
              <p className="text-gray-400 leading-relaxed text-sm">Convert intent into measurable action. We optimize forms, booking systems, automated follow-ups, and behavioral remarketing loops.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. The Flagship Offer (Execution Roadmap) */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-brand-indigo/10 blur-[100px] -z-10"></div>
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-20 text-center">
            <h2 className="text-xs font-semibold text-brand-accent uppercase tracking-[0.2em] mb-4">The Flagship Engagement</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">The 90-Day Growth Architecture</h3>
            <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">A 90-day acquisition system for established service businesses that need more qualified opportunities—not more disconnected marketing activity.</p>
          </div>

          <div className="space-y-6">
            <div className="glass-panel p-8 rounded-2xl border border-white/10 flex flex-col md:flex-row gap-8 items-start relative">
              <div className="flex-shrink-0 w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center border border-brand-accent/50">
                <span className="text-2xl font-bold text-brand-accent">1</span>
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

            <div className="glass-panel p-8 rounded-2xl border border-white/10 flex flex-col md:flex-row gap-8 items-start relative">
              <div className="flex-shrink-0 w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center border border-brand-accent/50">
                <span className="text-2xl font-bold text-brand-accent">2</span>
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

            <div className="glass-panel p-8 rounded-2xl border-brand-accent/30 bg-brand-accent/5 flex flex-col md:flex-row gap-8 items-start relative shadow-[0_0_30px_rgba(255,140,0,0.1)]">
              <div className="flex-shrink-0 w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,140,0,0.5)]">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-3">Days 61–90: Optimize & Scale</h4>
                <p className="text-gray-400 leading-relaxed mb-4">Working from real behavioral data, we identify winning traffic sources, messages, and variations. We shift resources toward what produces results and scale your profitable volume aggressively.</p>
                <div className="flex flex-wrap gap-4">
                  <span className="text-sm font-medium text-white flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-accent" /> Executive Growth Review</span>
                  <span className="text-sm font-medium text-white flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-accent" /> Aggressive Budget Scaling</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. The Brain Trust */}
      <section id="leadership" className="py-32 bg-black/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-accent/20 rounded-[3rem] blur-2xl -z-10 transform -rotate-6 scale-95"></div>
              <Image 
                src="/founder-v2.jpg" 
                alt="Principal Architect" 
                width={600} 
                height={600} 
                className="rounded-[3rem] border border-white/10 shadow-2xl object-cover"
              />
            </div>
            <div>
              <h2 className="text-xs font-semibold text-brand-accent uppercase tracking-[0.2em] mb-4">The Brain Trust</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Elite Engineering. <br/>No Account Managers.</h3>
              <p className="text-xl text-gray-400 mb-8 font-serif italic leading-relaxed">
                &quot;When you partner with Catalyst, you do not get passed off to a junior intern. You get direct access to the architects building your revenue engine.&quot;
              </p>
              <div className="space-y-6">
                <div>
                  <h4 className="text-3xl font-display font-bold text-white mb-2">Abel V.</h4>
                  <p className="text-brand-accent font-semibold tracking-wide uppercase text-sm mb-3">Principal Architect</p>
                  <p className="text-gray-500 leading-relaxed">Leading the integration of behavioral psychology, principled negotiation, and advanced digital scaling.</p>
                </div>
                <ul className="space-y-4 text-gray-300 font-medium pt-4">
                  <li className="flex items-center gap-4"><span className="w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_10px_rgba(255,140,0,0.8)]"></span> Strategic Omnichannel Growth Specialist</li>
                  <li className="flex items-center gap-4"><span className="w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_10px_rgba(255,140,0,0.8)]"></span> Authority in Subconscious CRO & Programmatic SEO</li>
                  <li className="flex items-center gap-4"><span className="w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_10px_rgba(255,140,0,0.8)]"></span> Relentless Focus on High-Ticket Conversions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Executive FAQ & Risk Reversal */}
      <section className="py-32 relative">
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-xs font-semibold text-brand-accent uppercase tracking-[0.2em] mb-4">Clarity & Accountability</h2>
            <h3 className="text-4xl font-display font-bold text-white">Executive Briefing</h3>
          </div>
          
          <div className="space-y-4">
            <details className="group glass-panel rounded-2xl border border-white/10 [&_summary::-webkit-details-marker]:hidden" open>
              <summary className="flex items-center justify-between p-6 cursor-pointer">
                <h4 className="text-lg font-bold text-white flex items-center gap-3"><ShieldCheck className="w-5 h-5 text-brand-accent" /> The 90-Day Execution Guarantee</h4>
                <ChevronDown className="w-5 h-5 text-brand-accent group-open:-rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                If Catalyst fails to complete the agreed deployment milestones during the initial 90-Day engagement, we continue working at no additional management fee until those milestones are completely satisfied. We guarantee execution and accountability.
              </div>
            </details>

            <details className="group glass-panel rounded-2xl border border-white/10 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer">
                <h4 className="text-lg font-bold text-white">Do you work with startups?</h4>
                <ChevronDown className="w-5 h-5 text-brand-accent group-open:-rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                We generally do not. We partner with established service businesses with proven demand, where the customer value is high enough to support paid acquisition and there is operational ability to handle additional volume.
              </div>
            </details>

            <details className="group glass-panel rounded-2xl border border-white/10 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer">
                <h4 className="text-lg font-bold text-white">What exactly are the deliverables?</h4>
                <ChevronDown className="w-5 h-5 text-brand-accent group-open:-rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                You are not buying &quot;SEO&quot; or &quot;Facebook Ads.&quot; You are buying a predictable customer-acquisition environment. Depending on your business, this includes landing-page architecture, technical SEO, programmatic builds, and multi-channel paid media funnels.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* 8. CTA Section */}
      <section id="contact" className="py-32 relative overflow-hidden bg-black/40 border-t border-white/5">
        <div className="absolute inset-0 bg-brand-accent/5"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-xs font-semibold text-brand-accent uppercase tracking-[0.2em] mb-4">Partnership Application</h2>
          <h3 className="text-5xl md:text-6xl font-display font-extrabold text-white mb-8 tracking-tighter">Start a Conversation.</h3>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto font-serif italic">
            We partner with businesses that have at least $10K/month in marketing capacity and the operational ability to handle additional volume.
          </p>
          <p className="text-lg text-white mb-12 max-w-2xl mx-auto font-medium border border-white/10 bg-white/5 py-4 px-6 rounded-xl inline-block">
            Submit your URL below. We will review your digital footprint and invite you to a 15-minute strategic fit call.
          </p>
          
          <form onSubmit={handleSubmit} className="glass-panel p-8 md:p-12 rounded-3xl max-w-lg mx-auto text-left border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-accent to-brand-glow transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Executive Name</label>
                <input name="executiveName" required type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-accent transition-colors" placeholder="e.g. John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Corporate Email</label>
                <input name="email" required type="email" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-accent transition-colors" placeholder="john@company.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Current Marketing Capacity</label>
                <select name="marketingCapacity" required className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-accent transition-colors appearance-none">
                  <option value="10k-25k">$10,000 - $25,000 / month</option>
                  <option value="25k-50k">$25,000 - $50,000 / month</option>
                  <option value="50k-100k">$50,000 - $100,000 / month</option>
                  <option value="100k+">$100,000+ / month</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Current Website URL</label>
                <input name="websiteUrl" required type="url" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-accent transition-colors" placeholder="https://..." />
              </div>
              <button disabled={formState === "submitting"} type="submit" className="w-full bg-brand-accent text-white text-lg font-bold py-4 rounded-xl hover:bg-brand-glow hover:text-black transition-all duration-300 mt-4 shadow-[0_0_20px_rgba(255,140,0,0.2)] hover:shadow-[0_0_40px_rgba(255,184,77,0.4)] disabled:opacity-60">
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
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black py-12 text-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-3 mb-6 md:mb-0">
            <Brain className="h-6 w-6 text-brand-accent" />
            <span className="text-lg font-display font-bold tracking-wide text-white">CATALYST</span>
          </div>
          <p className="text-gray-600 text-sm">&copy; 2026 Catalyst Influence. Engineered Success.</p>
        </div>
      </footer>
    </main>
  );
}
