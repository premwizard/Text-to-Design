import React, { useState } from 'react';
import { ChevronDown, CheckCircle, PlusCircle, XCircle, Users, Briefcase, BarChart } from 'lucide-react';

export default function InteractiveDemo() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isMultiDropdownOpen, setIsMultiDropdownOpen] = useState(false);

  const availableTags = [
    { id: 'dev', name: 'Development', icon: Users },
    { id: 'design', name: 'Design', icon: Briefcase },
    { id: 'marketing', name: 'Marketing', icon: BarChart },
    { id: 'sales', name: 'Sales', icon: Briefcase },
    { id: 'hr', name: 'Human Resources', icon: Users },
  ];

  const toggleTag = (tag) => {
    setSelectedItems((prev) =>
      prev.includes(tag.id) ? prev.filter((id) => id !== tag.id) : [...prev, tag.id]
    );
  };

  const getTagName = (id) => availableTags.find((tag) => tag.id === id)?.name || id;
  const getTagIcon = (id) => availableTags.find((tag) => tag.id === id)?.icon;

  return (
    <section id="demo" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative p-8 md:p-12
                      bg-white/40 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl
                      text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Experience Selectify in Action
        </h2>
        <p className="text-lg text-gray-700 mb-10">
          Try out our multi-select dropdown for assigning categories or tags.
          Effortlessly manage complex selections.
        </p>

        <div className="relative inline-block text-left w-full md:w-auto">
          <div>
            <button
              type="button"
              className="inline-flex justify-between items-center w-full min-w-[280px] rounded-md border border-gray-300 shadow-sm
                         px-6 py-3 bg-white text-lg font-medium text-gray-700
                         hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600
                         transition-all duration-200 cursor-pointer"
              onClick={() => setIsMultiDropdownOpen(!isMultiDropdownOpen)}
              aria-haspopup="true"
              aria-expanded="true"
            >
              {selectedItems.length > 0 ? (
                <span className="flex flex-wrap gap-2">
                  {selectedItems.map((id) => {
                    const Icon = getTagIcon(id);
                    return (
                      <span
                        key={id}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        {Icon && <Icon size={16} className="mr-1" />}
                        {getTagName(id)}
                        <XCircle
                          size={16}
                          className="ml-1 cursor-pointer hover:text-blue-600 transition-colors"
                          onClick={(e) => { e.stopPropagation(); toggleTag({ id }); }}
                        />
                      </span>
                    );
                  })}
                </span>
              ) : (
                <span>Select relevant tags...</span>
              )}
              <ChevronDown className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
            </button>
          </div>

          {isMultiDropdownOpen && (
            <div
              className="origin-top-right absolute mt-2 w-full md:min-w-[280px] rounded-md shadow-lg bg-white/70 backdrop-blur-md ring-1 ring-black ring-opacity-5 focus:outline-none z-20"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="multi-options-menu"
            >
              <div className="py-1" role="none">
                {availableTags.map((tag) => {
                  const isSelected = selectedItems.includes(tag.id);
                  const Icon = tag.icon;
                  return (
                    <button
                      key={tag.id}
                      onClick={() => toggleTag(tag)}
                      className={`flex items-center w-full text-left px-4 py-2 text-sm
                                  ${isSelected ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}
                                  transition-colors duration-200 cursor-pointer`}
                      role="menuitem"
                    >
                      <span className="flex items-center">
                        {Icon && <Icon size={18} className="mr-2" />}
                        {tag.name}
                      </span>
                      {isSelected && <CheckCircle size={16} className="ml-auto text-blue-600" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <button className="mt-8 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md
                           hover:bg-blue-700 transition-all duration-200 cursor-pointer text-lg">
          Apply Selection
          <PlusCircle className="ml-2 h-5 w-5 inline-block" />
        </button>
      </div>
    </section>
  );
}