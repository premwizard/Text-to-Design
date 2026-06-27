import React, { useState } from 'react';

export default function CategoryTabs() {
  const [activeTab, setActiveTab] = useState('Electronics');

  const categories = [
    { name: 'Electronics', description: 'Power up your life with the latest gadgets.', imageUrl: 'https://images.unsplash.com/photo-1598000570889-b003e67c87ce?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
    { name: 'Smart Home', description: 'Automate and secure your living space.', imageUrl: 'https://images.unsplash.com/photo-1616782255866-2679e0007897?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
    { name: 'Wearables', description: 'Track your health and stay connected on the go.', imageUrl: 'https://images.unsplash.com/photo-1620000617300-84c688d3e913?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
    { name: 'Accessories', description: 'Enhance your devices with essential add-ons.', imageUrl: 'https://images.unsplash.com/photo-1542393560-6b7137b01b2a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
  ];

  const getTabContent = (categoryName) => {
    const category = categories.find(cat => cat.name === categoryName);
    if (!category) return null;

    return (
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 mt-8 flex flex-col md:flex-row items-center gap-6 md:gap-8 border-t-4 border-purple-600 animate-fade-in">
        <div className="flex-shrink-0 w-full md:w-1/2 lg:w-2/5 aspect-video rounded-md overflow-hidden shadow-lg">
          <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-grow text-center md:text-left">
          <h3 className="text-3xl font-bold text-gray-900 mb-3 font-['DM Sans']">{category.name}</h3>
          <p className="text-gray-700 text-lg mb-5 font-['DM Sans']">{category.description}</p>
          <button className="bg-purple-600 text-white font-medium py-3 px-7 rounded-lg hover:opacity-90 transition-all duration-200 cursor-pointer shadow-md">
            Explore {category.name}
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12 font-['DM Sans']">Discover Our Top Categories</h2>
        <div className="flex flex-wrap justify-center gap-4 border-b border-gray-200 pb-4">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveTab(category.name)}
              className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 font-['DM Sans'] ${activeTab === category.name
                  ? 'bg-purple-600 text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}
                hover:opacity-90 transition-all duration-200 cursor-pointer`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {getTabContent(activeTab)}
      </div>
    </section>
  );
}