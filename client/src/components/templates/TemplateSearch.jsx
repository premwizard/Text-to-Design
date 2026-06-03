import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

export function TemplateSearch({ value, onChange }) {
  return (
    <div className="flex items-center gap-3 w-full max-w-md">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-zinc-500" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search templates..."
          className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-xl leading-5 bg-zinc-900/50 text-zinc-300 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 sm:text-sm transition-all"
        />
      </div>
      <button className="p-2 rounded-xl border border-white/10 bg-zinc-900/50 text-zinc-400 hover:text-zinc-200 hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500">
        <SlidersHorizontal className="h-5 w-5" />
      </button>
    </div>
  );
}
