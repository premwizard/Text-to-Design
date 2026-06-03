import React, { useState } from 'react';
import { ChevronDown, CheckCircle } from 'lucide-react';

export default function HeroDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Choose an option...');

  const options = [
    { id: 1, name: 'Project Management', description: 'Streamline workflows and tasks' },
    { id: 2, name: 'Customer Support', description: 'Enhance client communication' },
    { id: 3, name: 'Data Analysis', description: 'Extract insights from your data' },
    { id: 4, name: 'Content Creation', description: 'Generate engaging material' },
  ];

  const handleSelect = (option) => {
    setSelectedOption(option.name);
    setIsOpen(false);
  };

  return (
    <section className="relative flex justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="relative z-10 w-full max-w-4xl p-8 md:p-12 text-center
                      bg-white/40 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          Effortless selections at your fingertips.
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
          Selectify empowers you to make quick, precise choices,
          simplifying complex tasks with intuitive dropdown interfaces.
        </p>

        <div className="relative inline-block text-left mb-8">
          <div>
            <button
              type="button"
              className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm
                         px-6 py-3 bg-white text-lg font-medium text-gray-700
                         hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600
                         transition-all duration-200 cursor-pointer"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
              onClick={() => setIsOpen(!isOpen)}
            >
              {selectedOption}
              <ChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {isOpen && (
            <div
              className="origin-top-right absolute mt-2 w-64 rounded-md shadow-lg bg-white/70 backdrop-blur-md ring-1 ring-black ring-opacity-5 focus:outline-none z-20"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div className="py-1" role="none">
                {options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSelect(option)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
                    role="menuitem"
                  >
                    <span className="font-medium">{option.name}</span>
                    <p className="text-xs text-gray-500">{option.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center space-x-4">
          <button className="flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md
                             hover:bg-blue-700 transition-all duration-200 cursor-pointer text-lg">
            Get Started Now
            <CheckCircle className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}