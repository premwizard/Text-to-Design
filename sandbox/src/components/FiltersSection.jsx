import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

const FiltersSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const categories = ['All', 'Sales', 'Marketing', 'Operations', 'Finance'];
  const dates = ['Last 7 Days', 'Last 30 Days', 'This Month', 'This Year'];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <section className="bg-gray-50 py-12 px-6 border-t border-gray-100">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          {/* Search Input */}
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search insights..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-zinc-500 focus:border-zinc-500 bg-white"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-col sm:flex-row items-center w-full md:w-2/3 space-y-4 sm:space-y-0 sm:space-x-4">
            <select
              className="w-full sm:w-auto px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-zinc-500 focus:border-zinc-500 bg-white appearance-none"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              className="w-full sm:w-auto px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-zinc-500 focus:border-zinc-500 bg-white appearance-none"
              value={selectedDate}
              onChange={handleDateChange}
            >
              {dates.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>

            {/* Apply Filters Button */}
            <button className="bg-zinc-800 text-white font-semibold px-6 py-3 rounded-md shadow-md hover:bg-zinc-700 transition-colors duration-200 flex items-center space-x-2 w-full sm:w-auto">
              <Filter className="h-5 w-5" />
              <span>Apply Filters</span>
            </button>
          </div>
        </div>

        {/* Placeholder for Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {/* Example Card - replace with actual data rendering */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200"
            >
              <h3 className="text-xl font-semibold text-zinc-800 mb-3">Insight Title {i}</h3>
              <p className="text-zinc-600 mb-4">A brief description of the data insight, highlighting key findings and potential actions.</p>
              <div className="flex justify-between items-center text-sm text-zinc-500">
                <span>Category: Sales</span>
                <span>Date: 2023-10-27</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FiltersSection;