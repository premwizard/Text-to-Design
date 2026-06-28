import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'lucide-react';
import Button from './Button.jsx';
import Icon from './Icon.jsx';
import { useTheme } from 'tailwindcss/theme';

function BentoFeatures() {
  const theme = useTheme();
  const [tabs, setTabs] = useState({
    0: true,
    1: false,
    2: false,
    3: false,
  });

  const handleTabChange = (index) => {
    const newTabs = { ...tabs };
    for (const key in newTabs) {
      newTabs[key] = false;
    }
    newTabs[index] = true;
    setTabs(newTabs);
  };

  const features = [
    {
      title: 'Real-time Analytics',
      description:
        'Get instant insights into your business performance with real-time analytics.',
      icon: (
        <Icon name="chart-line" size={24} color={theme.colors.zinc[500]} />
      ),
    },
    {
      title: 'Automated Reporting',
      description:
        'Save time and effort with automated reporting that gives you accurate insights.',
      icon: (
        <Icon name="chart-bar" size={24} color={theme.colors.zinc[500]} />
      ),
    },
    {
      title: 'Customizable Dashboards',
      description:
        'Create dashboards that match your needs with our customizable templates.',
      icon: (
        <Icon name="dashboard" size={24} color={theme.colors.zinc[500]} />
      ),
    },
    {
      title: 'Data Integration',
      description:
        'Connect multiple data sources and get a unified view of your business performance.',
      icon: (
        <Icon name="database" size={24} color={theme.colors.zinc[500]} />
      ),
    },
  ];

  return (
    <section className="w-full md:w-4/5 lg:w-3/5 xl:w-2/5 py-20 px-10 md:px-20 lg:px-30 xl:px-40 mt-20">
      <div className="flex flex-col md:flex-row items-center justify-center">
        <h2 className="text-4xl font-bold text-zinc-600">Unlock the Power of Your Data</h2>
        <p className="text-2xl font-bold text-zinc-400">With DashSphere, you can visualize your data and unlock new insights.</p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center mt-10">
        <div className="flex flex-col md:flex-row items-center justify-center w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
          <ul className="flex flex-col md:flex-row md:space-x-10 lg:space-x-20 xl:space-x-30">
            {Object.keys(tabs).map((key, index) => (
              <li key={index} className="relative">
                <button
                  className={`flex items-center justify-center w-full md:w-40 lg:w-60 xl:w-80 h-14 md:h-16 lg:h-20 xl:h-24 py-2 md:py-4 lg:py-6 xl:py-8 rounded-md transition duration-300 hover:bg-zinc-700`}
                  onClick={() => handleTabChange(index)}
                >
                  <span className="text-2xl font-bold text-zinc-400">{features[index].title}</span>
                </button>
                {tabs[key] ? (
                  <FaChevronUp className="absolute top-6 right-6 text-zinc-400" />
                ) : (
                  <FaChevronDown className="absolute top-6 right-6 text-zinc-400" />
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-10 lg:space-x-20 xl:space-x-30 w-full md:w-1/2 lg:w-1/3 xl:w-2/3 mt-10 md:mt-0">
          {Object.keys(tabs).map((key, index) => (
            <div key={index} className={`hidden md:block lg:block xl:block md:h-64 lg:h-80 xl:h-96 md:bg-zinc-600 lg:bg-zinc-700 xl:bg-zinc-800 md:rounded-md lg:rounded-md xl:rounded-md transition duration-300 ${tabs[index] ? 'block' : 'hidden'}`}>
              <div className="flex flex-col md:flex-row md:space-x-10 lg:space-x-20 xl:space-x-30 w-full md:w-3/4 lg:w-2/3 xl:w-2/3 p-10 md:p-20 lg:p-30 xl:p-40">
                <div className="flex flex-col md:flex-row md:space-x-10 lg:space-x-20 xl:space-x-30">
                  <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 p-5 md:p-10 lg:p-20 xl:p-30 rounded-md bg-zinc-900">
                    <h3 className="text-3xl font-bold text-zinc-400">{features[index].title}</h3>
                    <p className="text-lg font-bold text-zinc-400">{features[index].description}</p>
                  </div>
                  <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 p-5 md:p-10 lg:p-20 xl:p-30 rounded-md bg-zinc-900">
                    <h3 className="text-3xl font-bold text-zinc-400">Key Benefits</h3>
                    <ul className="list-disc pl-10">
                      <li className="text-lg font-bold text-zinc-400">Improved decision-making</li>
                      <li className="text-lg font-bold text-zinc-400">Increased productivity</li>
                      <li className="text-lg font-bold text-zinc-400">Enhanced customer experience</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BentoFeatures;