import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Zap, ArrowRight } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#09090b]/80 backdrop-blur-xl border-b border-zinc-800/80 shadow-2xl' : 'bg-transparent'}`}>
      <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white font-bold shadow-lg shadow-sky-500/20">
            <Zap size={24} fill="currentColor" />
          </div>
          <span className="font-bold text-2xl tracking-tight text-white">SynapseAI</span>
        </Link>


        {/* Actions */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/login" className="text-sm font-bold text-zinc-300 hover:text-white transition-colors">Log In</Link>
          <Link to="/app" className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-zinc-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            Start Building
            <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </nav>
  );
}
