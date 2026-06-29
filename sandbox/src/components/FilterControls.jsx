import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react-native';

const FilterControls = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [inputValue, setInputValue] = useState('');

  const filters = [
    { label: 'Date', value: 'date' },
    { label: 'Category', value: 'category' },
    { label: 'Type', value: 'type' },
  ];

  const handleFilterSelect = (value) => {
    setSelectedFilter(value);
    setIsOpen(false);
  };

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="bg-zinc-600 p-4 rounded-md shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-zinc-400 text-lg font-medium">Filter</h2>
        <button
          className={`p-2 rounded-md ${isOpen ? 'bg-zinc-700' : 'bg-zinc-600'} hover:bg-zinc-700`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <ChevronUp size={20} color="#fff" /> : <ChevronDown size={20} color="#fff" />}
        </button>
      </div>
      {isOpen && (
        <div className="mb-4">
          <select
            className="w-full p-2 rounded-md bg-zinc-600 border border-zinc-800 text-zinc-400"
            value={selectedFilter}
            onChange={(e) => handleFilterSelect(e.target.value)}
          >
            <option value="">Select Filter</option>
            {filters.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="flex items-center mb-4">
        <input
          type="text"
          className="w-full p-2 rounded-md bg-zinc-600 border border-zinc-800 text-zinc-400"
          placeholder="Search"
          value={inputValue}
          onChange={handleInputValue}
        />
        <button
          className="p-2 rounded-md bg-zinc-600 hover:bg-zinc-700 text-zinc-400"
          onClick={() => console.log('Search button clicked')}
        >
          <Filter size={20} color="#fff" />
        </button>
      </div>
      <button
        className="w-full p-2 rounded-md bg-zinc-600 hover:bg-zinc-700 text-zinc-400"
        onClick={() => console.log('Clear filters button clicked')}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default FilterControls;