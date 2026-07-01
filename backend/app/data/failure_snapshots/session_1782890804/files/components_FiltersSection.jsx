import React, { useState } from 'react';
import { Calendar, Filter, Globe } from 'lucide-react';

const FiltersSection = ({ currentFilters, onFilterChange }) => {
  const [dateRange, setDateRange] = useState(currentFilters.dateRange);
  const [source, setSource] = useState(currentFilters.source);
  const [region, setRegion] = useState(currentFilters.region);

  const handleApplyFilters = () => {
    onFilterChange({ dateRange, source, region });
  };

  return (
    <div className="bg-white border border-gray-100 rounded-md shadow-sm p-4 mb-4 flex flex-wrap gap-2 items-end">
      {/* Date Range Filter */}
      <div className="flex-1 min-w-[120px] sm:min-w-[150px]">
        <label htmlFor="date-range" className="block text-xs font-medium text-zinc-700 mb-1">
          Date Range
        </label>
        <div className="relative">
          <select
            id="date-range"
            name="date-range"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="block w-full pl-7 pr-8 py-1.5 border border-gray-100 rounded-md text-sm text-zinc-900 focus:ring-zinc-500 focus:border-zinc-500 transition-colors duration-200 appearance-none bg-white"
          >
            <option>Today</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>This Year</option>
          </select>
          <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
        </div>
      </div>

      {/* Data Source Filter */}
      <div className="flex-1 min-w-[120px] sm:min-w-[150px]">
        <label htmlFor="source" className="block text-xs font-medium text-zinc-700 mb-1">
          Data Source
        </label>
        <div className="relative">
          <select
            id="source"
            name="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="block w-full pl-7 pr-8 py-1.5 border border-gray-100 rounded-md text-sm text-zinc-900 focus:ring-zinc-500 focus:border-zinc-500 transition-colors duration-200 appearance-none bg-white"
          >
            <option>All Sources</option>
            <option>Website</option>
            <option>CRM</option>
            <option>Social Media</option>
          </select>
          <Filter className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
        </div>
      </div>

      {/* Region Filter */}
      <div className="flex-1 min-w-[120px] sm:min-w-[150px]">
        <label htmlFor="region" className="block text-xs font-medium text-zinc-700 mb-1">
          Region
        </label>
        <div className="relative">
          <select
            id="region"
            name="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="block w-full pl-7 pr-8 py-1.5 border border-gray-100 rounded-md text-sm text-zinc-900 focus:ring-zinc-500 focus:border-zinc-500 transition-colors duration-200 appearance-none bg-white"
          >
            <option>Global</option>
            <option>North America</option>
            <option>Europe</option>
            <option>Asia</option>
          </select>
          <Globe className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
        </div>
      </div>

      {/* Apply Filters Button */}
      <button
        onClick={handleApplyFilters}
        className="ml-auto sm:ml-2 px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zinc-600 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 transition-colors duration-200 flex-shrink-0 mt-auto"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FiltersSection;