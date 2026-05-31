import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="relative flex flex-col items-center justify-center max-w-4xl mx-auto px-6 py-20 text-center">
      <div className="inline-flex items-center gap-1.5 bg-sky-500/10 border border-sky-500/20 text-[10px] uppercase font-bold tracking-widest px-3.5 py-1 rounded-full text-sky-400 mb-6">
        <Sparkles size={12} /> Live Vite Compilation
      </div>
      <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-none">
        Real-Time React Multi-File <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500">Vite Sandbox Engine</span>
      </h1>
      <p className="mt-6 text-base text-zinc-400 max-w-xl leading-relaxed">
        The server is running offline or has no API keys loaded. Set GROQ_API_KEY or OPENAI_API_KEY in your environment to stream live layout code.
      </p>
    </div>
  );
}