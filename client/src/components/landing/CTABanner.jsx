import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';

export function CTABanner() {
  const [promptText, setPromptText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (promptText.trim()) {
      navigate('/app', { state: { initialPrompt: promptText } });
    } else {
      navigate('/app');
    }
  };

  return (
    <section className="relative w-full py-28 px-6 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-sky-500/20 via-indigo-500/20 to-purple-500/20 blur-[140px] pointer-events-none rounded-full" />

      <div className="relative max-w-5xl mx-auto z-10">
        <div className="rounded-3xl border border-sky-500/30 bg-gradient-to-b from-zinc-900/90 via-zinc-950/90 to-zinc-900/90 backdrop-blur-2xl p-8 md:p-14 text-center shadow-[0_0_50px_rgba(56,189,248,0.15)] relative overflow-hidden">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-500/40 bg-sky-500/10 text-sky-300 text-xs font-semibold uppercase tracking-wider mb-8 shadow-inner">
            <Zap size={14} className="text-sky-400" />
            <span>Ready to Transform Your Workflow?</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6">
            Turn Your Next Idea Into <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400">
              Live Code Right Now
            </span>
          </h2>

          <p className="text-zinc-300 text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            No long setup, no heavy configuration. Enter a text prompt below or launch the generator to start crafting web designs in seconds.
          </p>

          {/* Interactive Quick Prompt Bar */}
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto mb-6">
            <div className="flex flex-col sm:flex-row items-center gap-3 p-2 rounded-2xl bg-zinc-950/90 border border-zinc-800 shadow-2xl focus-within:border-sky-500/60 transition-colors">
              <div className="flex items-center gap-3 px-3 w-full">
                <Sparkles size={20} className="text-sky-400 shrink-0" />
                <input
                  type="text"
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder="e.g. Dark mode crypto dashboard with transaction table..."
                  className="w-full bg-transparent text-sm text-white placeholder-zinc-500 outline-none font-sans"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm shrink-0 shadow-lg shadow-sky-500/25 transition-all"
              >
                <span>Generate</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </form>

          <p className="text-xs text-zinc-500 font-medium">
            Free forever tier • Zero credit card required • Instant clean code export
          </p>

        </div>
      </div>
    </section>
  );
}
