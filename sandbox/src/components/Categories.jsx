import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [isActive, setIsActive] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = [
    { id: 1, name: 'Clothing' },
    { id: 2, name: 'Shoes' },
    { id: 3, name: 'Accessories' },
  ];

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setIsActive(!isActive);
  };

  return (
    <div className="bg-zinc-600 p-4 md:p-6 lg:p-8 rounded-md shadow-none">
      <h2 className="text-zinc-400 text-lg md:text-xl lg:text-2xl font-bold mb-4 md:mb-6 lg:mb-8">
        Browse Categories
      </h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id} className="mb-4 md:mb-6 lg:mb-8">
            <button
              className={`flex justify-between w-full text-zinc-400 text-lg md:text-xl lg:text-2xl font-bold p-2 md:p-4 lg:p-6 bg-zinc-600 hover:bg-zinc-700 rounded-md ${
                activeCategory === category ? 'bg-zinc-700' : ''
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category.name}
              {activeCategory === category ? (
                <ChevronUp size={20} className="text-zinc-400" />
              ) : (
                <ChevronDown size={20} className="text-zinc-400" />
              )}
            </button>
            {activeCategory === category && (
              <ul className="pl-4 md:pl-6 lg:pl-8 mt-2 md:mt-4 lg:mt-6">
                <li>
                  <Link
                    to={`/categories/${category.name}`}
                    className="text-zinc-400 text-lg md:text-xl lg:text-2xl font-bold block p-2 md:p-4 lg:p-6 hover:bg-zinc-700 rounded-md"
                  >
                    View All
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/categories/${category.name}/new-arrivals`}
                    className="text-zinc-400 text-lg md:text-xl lg:text-2xl font-bold block p-2 md:p-4 lg:p-6 hover:bg-zinc-700 rounded-md"
                  >
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/categories/${category.name}/best-sellers`}
                    className="text-zinc-400 text-lg md:text-xl lg:text-2xl font-bold block p-2 md:p-4 lg:p-6 hover:bg-zinc-700 rounded-md"
                  >
                    Best Sellers
                  </Link>
                </li>
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;