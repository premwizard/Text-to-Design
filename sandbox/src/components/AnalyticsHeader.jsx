import React from 'react';
import { Calendar, Filter, Search } from 'lucide-react';

export default function AnalyticsHeader() {
  return (
    <header
      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-inter"
    >
      <div>
        <h1 className="text-3xl lg:text-4xl font-extrabold font-space-grotesk text-white mb-2">
          Overview Dashboard
        </h1>
        <p className="text-gray-400 text-lg font-medium">
          Unlock Your Data's Potential
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search metrics..."
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-300 hover:bg-emerald-500 hover:text-white transition-all duration-200 whitespace-nowrap">
          <Calendar size={18} />
          Last 30 Days
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-300 hover:bg-emerald-500 hover:text-white transition-all duration-200">
          <Filter size={18} />
          Filter
        </button>
      </div>
    </header>
  );
}