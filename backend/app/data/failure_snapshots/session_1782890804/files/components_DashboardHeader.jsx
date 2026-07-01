import React from 'react';
import { Plus } from 'lucide-react';

const DashboardHeader = ({ tagline }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 px-2 sm:px-0 mb-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-2 sm:mb-0">
        {tagline}
      </h1>
      <button className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zinc-600 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 transition-colors duration-200">
        <Plus className="h-4 w-4 mr-1 -ml-0.5" aria-hidden="true" />
        New Report
      </button>
    </div>
  );
};

export default DashboardHeader;