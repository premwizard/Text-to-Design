import React from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-zinc-900/50 pt-24 pb-12 px-6 relative z-10 w-full">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        
        {/* Brand */}
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white font-bold shadow-lg shadow-sky-500/20">
              <Zap size={24} fill="currentColor" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-white">SynapseAI</span>
          </Link>
          <p className="text-zinc-500 text-sm mb-6 leading-relaxed">
            The intelligent Text-to-Design platform. Building the future of frontend development with advanced AI models.
          </p>

        </div>

        {/* Links */}
        <div>
          <h4 className="text-white font-bold mb-4">Product</h4>
          <ul className="space-y-3 text-sm text-zinc-500">
            <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
            <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
            <li><a href="#showcase" className="hover:text-white transition-colors">Showcase</a></li>
            <li><Link to="/app" className="hover:text-white transition-colors">Studio</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Resources</h4>
          <ul className="space-y-3 text-sm text-zinc-500">
            <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
            <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Company</h4>
          <ul className="space-y-3 text-sm text-zinc-500">
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
          </ul>
        </div>

      </div>

      <div className="max-w-[1600px] mx-auto border-t border-zinc-900/50 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-zinc-600 font-medium">
        <p>&copy; {new Date().getFullYear()} SynapseAI Inc. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" /> All systems operational</div>
        </div>
      </div>
    </footer>
  );
}
