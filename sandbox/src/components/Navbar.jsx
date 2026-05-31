import { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="border-b border-zinc-900 bg-zinc-950/40 backdrop-blur-md px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Sparkles className="text-sky-400" size={18} />
        <span className="font-bold text-sm tracking-tight">Vite Sandbox Workspace</span>
      </div>
      <div className="flex gap-6 text-xs text-zinc-400">
        <span className="hover:text-zinc-200 cursor-pointer">Preview</span>
        <span className="hover:text-zinc-200 cursor-pointer">Components</span>
        <span className="hover:text-zinc-200 cursor-pointer">Docs</span>
      </div>
    </nav>
  );
}