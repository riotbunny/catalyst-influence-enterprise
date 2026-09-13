"use client";

import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { Target, Brain, Lock, Search, TrendingUp, Share2, BrainCircuit, BarChart3, Users, ChevronDown } from "lucide-react";

interface LandingPageProps {
  city?: string;
}

export default function LandingPage({ city }: LandingPageProps) {
  const currentQuarter = `Q${Math.floor(new Date().getMonth() / 3) + 1}`;
  
  // Format city name for display (e.g., "new-york" -> "New York")
  const formattedCity = city 
    ? city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : null;

  return (
    <main className="min-h-screen">
      <Background />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-indigo/30 rounded-full blur-[120px] -z-10 mix-blend-screen"></div>
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-brand-accent/10 rounded-full blur-[90px] -z-10 mix-blend-screen"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
          <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
          <span suppressHydrationWarning className="text-xs font-semibold tracking-widest text-gray-300 uppercase">
            Accepting 2 new clients for {currentQuarter}
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white leading-tight mb-6 tracking-tighter">
          DESIGNING <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-glow">DIGITAL INFLUENCE.</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto font-serif italic">
          {formattedCity 
            ? `Partnering with industry leaders in ${formattedCity} to blend behavioral science and premium design into experiences that establish trust.` 
            : `We blend behavioral science and premium design to build digital experiences that naturally drive conversions and establish trust.`}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6">
          <button type="button" className="group bg-brand-accent text-white px-8 py-4 rounded-full font-bold tracking-wide hover:bg-brand-glow hover:text-black transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,140,0,0.3)] hover:shadow-[0_0_40px_rgba(255,184,77,0.5)]">
            Apply For Partnership
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
          <button type="button" className="px-8 py-4 rounded-full font-bold tracking-wide text-white border border-white/20 hover:bg-white/10 transition-colors">
            Our Methodology
          </button>
        </div>
        </div>
      </section>

      {/* Enterprise Trust */}
      <section className="py-12 border-y border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-[0.2em] mb-8">
            {formattedCity 
              ? `Trusted by industry leaders in ${formattedCity} to architect their growth`
              : `Trusted by industry leaders to architect their growth`}
          </p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            <div className="text-2xl font-display font-bold text-gray-400 flex items-center">VERTEX</div>
            <div className="text-2xl font-serif font-bold text-gray-400 italic flex items-center">Lumina</div>
            <div className="text-2xl font-sans font-black text-gray-400 tracking-tighter flex items-center">NEXUS.</div>
            <div className="text-2xl font-display font-medium text-gray-400 tracking-widest uppercase flex items-center">Quantum</div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <h2 className="text-xs font-semibold text-brand-accent uppercase tracking-[0.2em] mb-4">Our Approach</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-white max-w-2xl leading-tight">We build digital environments that guide human behavior.</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-10 rounded-3xl hover:bg-white/5 transition-all duration-500 group">
              <div className="w-14 h-14 bg-brand-indigo rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Brain className="w-7 h-7 text-brand-accent" />
              </div>
              <h4 className="text-xl font-bold text-white mb-4">Subconscious Alignment</h4>
              <p className="text-gray-400 leading-relaxed">Before a user reads a single word, our design intuitively communicates trust, safety, and established expertise.</p>
            </div>
            
            <div className="glass-panel p-10 rounded-3xl hover:bg-white/5 transition-all duration-500 group">
              <div className="w-14 h-14 bg-brand-indigo rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Target className="w-7 h-7 text-brand-accent" />
              </div>
              <h4 className="text-xl font-bold text-white mb-4">The Architecture of Yes</h4>
              <p className="text-gray-400 leading-relaxed">We structure the user journey as a collaborative conversation, presenting clear options for mutual gain and resolving natural hesitation.</p>
            </div>

            <div className="glass-panel p-10 rounded-3xl hover:bg-white/5 transition-all duration-500 group">
              <div className="w-14 h-14 bg-brand-indigo rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Lock className="w-7 h-7 text-brand-accent" />
              </div>
              <h4 className="text-xl font-bold text-white mb-4">Ethical Activation</h4>
              <p className="text-gray-400 leading-relaxed">We carefully weave in reciprocity, social proof, and authentic scarcity to make reaching out feel like the natural next step.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="py-32 bg-black/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 text-center">
            <h2 className="text-xs font-semibold text-brand-accent uppercase tracking-[0.2em] mb-4">What We Do</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">Full-Service Digital Capabilities</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-12 rounded-3xl border border-white/10 hover:border-brand-accent/50 transition-colors">
              <Search className="w-10 h-10 text-brand-accent mb-6" />
              <h4 className="text-2xl font-bold text-white mb-4">Strategic SEO</h4>
              <p className="text-gray-400">We build comprehensive search architectures that capture high-intent traffic and establish your brand as the definitive authority in your space.</p>
            </div>
            
            <div className="glass-panel p-12 rounded-3xl border border-white/10 hover:border-brand-accent/50 transition-colors">
              <TrendingUp className="w-10 h-10 text-brand-accent mb-6" />
              <h4 className="text-2xl font-bold text-white mb-4">Paid Media & Growth</h4>
              <p className="text-gray-400">Data-driven ad campaigns and conversion funnels designed to scale your revenue efficiently and predictably across all major platforms.</p>
            </div>

            <div className="glass-panel p-12 rounded-3xl border border-white/10 hover:border-brand-accent/50 transition-colors">
              <BrainCircuit className="w-10 h-10 text-brand-accent mb-6" />
              <h4 className="text-2xl font-bold text-white mb-4">Behavioral Web Design</h4>
              <p className="text-gray-400">We design and develop premium, responsive websites that look incredible and are fundamentally engineered to drive user action.</p>
            </div>

            <div className="glass-panel p-12 rounded-3xl border border-white/10 hover:border-brand-accent/50 transition-colors">
              <Share2 className="w-10 h-10 text-brand-accent mb-6" />
              <h4 className="text-2xl font-bold text-white mb-4">Content & Social Authority</h4>
              <p className="text-gray-400">Engaging, high-value content ecosystems that nurture trust, educate your audience, and build long-term brand loyalty.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Proof / Case Study Section */}
      <section id="results" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 text-center">
            <h2 className="text-xs font-semibold text-brand-accent uppercase tracking-[0.2em] mb-4">Proof of Impact</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">We Don't Guess. We Engineer Results.</h3>
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
                  Home Tech Dealer required an aggressive omnichannel scaling strategy. By deploying our Programmatic SEO (pSEO) engine and pairing it with behaviorally-optimized Paid Media funnels, we scaled their customer acquisition to generate over 400 highly-qualified leads in a single 24-hour period.
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
                    {/* Simulated GSC Chart Bars based on user screenshot */}
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

      {/* The Brain Trust */}
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
                "When you partner with Catalyst, you do not get passed off to a junior intern. You get direct access to the architects building your revenue engine."
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

      {/* Executive FAQ */}
      <section className="py-32 relative">
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-xs font-semibold text-brand-accent uppercase tracking-[0.2em] mb-4">Clarity</h2>
            <h3 className="text-4xl font-display font-bold text-white">Executive Briefing</h3>
          </div>
          
          <div className="space-y-4">
            <details className="group glass-panel rounded-2xl border border-white/10 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer">
                <h4 className="text-lg font-bold text-white">Do you work with startups?</h4>
                <ChevronDown className="w-5 h-5 text-brand-accent group-open:-rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                Only if heavily funded and prepared to scale rapidly. Our methodologies are designed for established businesses looking to dominate market share, or high-velocity startups with the infrastructure to handle enterprise volume.
              </div>
            </details>

            <details className="group glass-panel rounded-2xl border border-white/10 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer">
                <h4 className="text-lg font-bold text-white">What is the typical contract structure?</h4>
                <ChevronDown className="w-5 h-5 text-brand-accent group-open:-rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                We operate on a minimum 6-month commitment. Behavioral models and Programmatic SEO require time to compound and yield exponential returns. We do not do one-off "quick fix" projects.
              </div>
            </details>

            <details className="group glass-panel rounded-2xl border border-white/10 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer">
                <h4 className="text-lg font-bold text-white">What exactly are the deliverables?</h4>
                <ChevronDown className="w-5 h-5 text-brand-accent group-open:-rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                You get a dedicated brain trust executing an omnichannel strategy. This includes custom programmatic SEO deployment, behavioral web design overhauls, neuro-optimized paid media management, and continuous conversion rate optimization.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Mutual Gain / Reciprocity CTA Section */}
      <section id="contact" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-accent/5"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-xs font-semibold text-brand-accent uppercase tracking-[0.2em] mb-4">Work With Us</h2>
          <h3 className="text-5xl md:text-6xl font-display font-extrabold text-white mb-8 tracking-tighter">Start a Conversation.</h3>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto font-serif italic">
            Whether you need a complete digital overhaul, or specific execution in SEO and Paid Media, it starts here. 
            We partner with businesses that are ready to scale and serious about their digital footprint.
          </p>
          <p className="text-lg text-white mb-12 max-w-2xl mx-auto font-medium border border-white/10 bg-white/5 py-4 px-6 rounded-xl inline-block">
            Submit your URL below. We will review your current digital footprint and invite you to a 15-minute strategic fit call.
          </p>
          
          <form className="glass-panel p-8 md:p-12 rounded-3xl max-w-lg mx-auto text-left border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-accent to-brand-glow transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Executive Name</label>
                <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-accent transition-colors" placeholder="e.g. John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Corporate Email</label>
                <input type="email" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-accent transition-colors" placeholder="john@company.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Primary Objective</label>
                <select className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-accent transition-colors appearance-none">
                  <option value="audit">Comprehensive Digital Audit</option>
                  <option value="seo">SEO & Search Visibility</option>
                  <option value="ppc">Paid Media & Lead Generation</option>
                  <option value="full">Full-Scale Agency Partnership</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Monthly Marketing Budget</label>
                <select className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-accent transition-colors appearance-none">
                  <option value="5k-10k">$5,000 - $10,000</option>
                  <option value="10k-25k">$10,000 - $25,000</option>
                  <option value="25k-50k">$25,000 - $50,000</option>
                  <option value="50k+">$50,000+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Current Website URL</label>
                <input type="url" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-accent transition-colors" placeholder="https://..." />
              </div>
              <button type="button" className="w-full bg-brand-accent text-white text-lg font-bold py-4 rounded-xl hover:bg-brand-glow hover:text-black transition-all duration-300 mt-4 shadow-[0_0_20px_rgba(255,140,0,0.2)] hover:shadow-[0_0_40px_rgba(255,184,77,0.4)]">
                Submit Application
              </button>
              <p suppressHydrationWarning className="text-xs text-center text-gray-500 mt-6 uppercase tracking-wider leading-relaxed">
                <span className="text-brand-accent font-bold">Availability:</span> To maintain our quality of work, we only onboard 2 new clients per {currentQuarter}.
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
