import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const faqs = [
  { q: "How is this different from v0 or Lovable?", a: "We use a dedicated self-healing pipeline that guarantees production-ready code with zero runtime errors, plus native Tailwind integration without obscure CSS modules." },
  { q: "Can I export the code?", a: "Yes, you have full ownership of the generated React components. Export them as a zip file or push directly to GitHub." },
  { q: "Does it support custom design systems?", a: "Absolutely. You can define your brand colors, typography, and spacing variables in the prompt, and our AI will adapt the generation." }
];

export function PricingAndFAQ() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section id="pricing" className="w-full py-40 px-6 max-w-[1400px] mx-auto bg-transparent relative z-10">
      
      {/* Pricing Header */}
      <div className="text-center mb-32 max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-6">Simple, Transparent Pricing</h2>
        <p className="text-zinc-400 text-xl font-medium">Start for free, upgrade when you need more power.</p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40 items-center">
        {/* Free */}
        <div className="bg-[#09090b]/80 backdrop-blur-2xl border border-zinc-800/80 rounded-[40px] p-12 hover:border-zinc-600 transition-colors shadow-2xl">
          <h3 className="text-2xl font-bold text-zinc-100 mb-2">Starter</h3>
          <div className="text-4xl font-bold text-white mb-6">$0<span className="text-lg text-zinc-500 font-medium">/mo</span></div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3 text-zinc-400"><Check size={18} className="text-sky-400" /> 100 Generations / month</li>
            <li className="flex items-center gap-3 text-zinc-400"><Check size={18} className="text-sky-400" /> Basic React + Tailwind</li>
            <li className="flex items-center gap-3 text-zinc-400"><Check size={18} className="text-sky-400" /> Community Support</li>
          </ul>
          <Link to="/app" className="block w-full text-center bg-zinc-900 border border-zinc-700 text-white py-3 rounded-xl font-semibold hover:bg-zinc-800 transition-colors">Get Started</Link>
        </div>

        {/* Pro */}
        <div className="bg-zinc-950/90 backdrop-blur-3xl border border-sky-500/50 rounded-[40px] p-12 relative transform md:-translate-y-8 shadow-[0_0_100px_rgba(56,189,248,0.2)] hover:shadow-[0_0_120px_rgba(56,189,248,0.3)] transition-all">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-sky-500 text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(56,189,248,0.5)]">Most Popular</div>
          <h3 className="text-2xl font-bold text-zinc-100 mb-2">Pro</h3>
          <div className="text-4xl font-bold text-white mb-6">$29<span className="text-lg text-zinc-500 font-medium">/mo</span></div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3 text-zinc-300"><Check size={18} className="text-sky-400" /> Unlimited Generations</li>
            <li className="flex items-center gap-3 text-zinc-300"><Check size={18} className="text-sky-400" /> Advanced Self-Healing AI</li>
            <li className="flex items-center gap-3 text-zinc-300"><Check size={18} className="text-sky-400" /> Priority Models (Llama 3 70B)</li>
            <li className="flex items-center gap-3 text-zinc-300"><Check size={18} className="text-sky-400" /> GitHub Integration</li>
          </ul>
          <Link to="/app" className="block w-full text-center bg-sky-500 text-white py-3 rounded-xl font-bold hover:bg-sky-400 transition-colors shadow-[0_0_20px_rgba(56,189,248,0.4)]">Upgrade to Pro</Link>
        </div>

        {/* Team */}
        <div className="bg-[#09090b]/80 backdrop-blur-2xl border border-zinc-800/80 rounded-[40px] p-12 hover:border-zinc-600 transition-colors shadow-2xl">
          <h3 className="text-2xl font-bold text-zinc-100 mb-2">Team</h3>
          <div className="text-4xl font-bold text-white mb-6">$99<span className="text-lg text-zinc-500 font-medium">/mo</span></div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3 text-zinc-400"><Check size={18} className="text-sky-400" /> 5 Team Members</li>
            <li className="flex items-center gap-3 text-zinc-400"><Check size={18} className="text-sky-400" /> Custom Design Systems</li>
            <li className="flex items-center gap-3 text-zinc-400"><Check size={18} className="text-sky-400" /> Dedicated Account Manager</li>
          </ul>
          <Link to="/app" className="block w-full text-center bg-zinc-900 border border-zinc-700 text-white py-3 rounded-xl font-semibold hover:bg-zinc-800 transition-colors">Contact Sales</Link>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto mb-32">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-zinc-800 bg-[#0c0c0e] rounded-2xl overflow-hidden transition-all">
              <button 
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full px-6 py-4 flex items-center justify-between font-bold text-lg text-left"
              >
                {faq.q}
                <span className={`transform transition-transform ${openFaq === i ? 'rotate-45 text-sky-400' : 'text-zinc-500'}`}>+</span>
              </button>
              <div className={`px-6 text-zinc-400 transition-all duration-300 overflow-hidden ${openFaq === i ? 'max-h-40 pb-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Massive CTA */}
      <div className="relative rounded-[50px] overflow-hidden bg-zinc-950/80 border border-zinc-800/50 p-20 md:p-32 text-center shadow-[0_0_100px_rgba(0,0,0,0.8)] group backdrop-blur-3xl">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/30 via-indigo-500/30 to-purple-500/30 opacity-60 group-hover:opacity-100 transition-opacity duration-1000 blur-2xl" />
        <div className="relative z-10">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-tight">Start Building With <br/> AI Today</h2>
          <p className="text-2xl text-zinc-300 mb-12 max-w-3xl mx-auto font-medium">Join thousands of developers shipping products 10x faster with SynapseAI.</p>
          <Link to="/app" className="inline-block bg-white text-black px-12 py-6 rounded-2xl text-2xl font-bold hover:scale-105 transition-transform shadow-[0_0_50px_rgba(255,255,255,0.3)] hover:shadow-[0_0_80px_rgba(255,255,255,0.5)]">
            Open the Studio
          </Link>
        </div>
      </div>

    </section>
  );
}
