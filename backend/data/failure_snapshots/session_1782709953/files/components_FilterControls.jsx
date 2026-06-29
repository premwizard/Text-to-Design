import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react-native';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const FilterControls = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState([
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  ]);

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

  const handleDataUpdate = () => {
    // Update data based on selected filter and input value
    const updatedData = data.map((item) => {
      if (selectedFilter === 'date') {
        return { ...item, uv: item.uv + Math.floor(Math.random() * 100) };
      } else if (selectedFilter === 'category') {
        return { ...item, pv: item.pv + Math.floor(Math.random() * 100) };
      } else {
        return item;
      }
    });
    setData(updatedData);
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
          onClick={handleDataUpdate}
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
      <div className="mt-4">
        <LineChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </div>
    </div>
  );
};

export default FilterControls;