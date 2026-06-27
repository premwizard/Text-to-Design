import React, { useState } from 'react';
import { Browser, Square, Layers } from 'lucide-react-native';
import classNames from 'classnames';

const BentoFeatures = () => {
  const [activeTab, setActiveTab] = useState('features');
  const [isOpen, setIsOpen] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="bg-zinc-800 py-20 md:py-24 lg:py-28">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-indigo-400 font-bold mb-8 md:mb-10 lg:mb-12">Bento Features</h2>
        <div className="flex flex-wrap justify-center mb-12 md:mb-16 lg:mb-20">
          <button
            className={classNames(
              'bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-xl shadow-md mr-4 mb-4',
              { 'bg-indigo-700': activeTab === 'features' }
            )}
            onClick={() => handleTabChange('features')}
          >
            Features
          </button>
          <button
            className={classNames(
              'bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-xl shadow-md mr-4 mb-4',
              { 'bg-indigo-700': activeTab === 'technical' }
            )}
            onClick={() => handleTabChange('technical')}
          >
            Technical
          </button>
          <button
            className={classNames(
              'bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-xl shadow-md mb-4',
              { 'bg-indigo-700': activeTab === 'support' }
            )}
            onClick={() => handleTabChange('support')}
          >
            Support
          </button>
        </div>
        {activeTab === 'features' && (
          <div className="mb-12 md:mb-16 lg:mb-20">
            <div className="flex flex-wrap justify-center">
              <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-6 md:p-8 lg:p-10">
                <div className="bg-indigo-600 rounded-xl shadow-md p-8 md:p-10 lg:p-12">
                  <Browser size={48} color="#ffffff" />
                  <h3 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-4 md:mb-6 lg:mb-8">Cross-Platform</h3>
                  <p className="text-lg md:text-xl lg:text-2xl text-indigo-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-6 md:p-8 lg:p-10">
                <div className="bg-indigo-600 rounded-xl shadow-md p-8 md:p-10 lg:p-12">
                  <Square size={48} color="#ffffff" />
                  <h3 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-4 md:mb-6 lg:mb-8">Modular Design</h3>
                  <p className="text-lg md:text-xl lg:text-2xl text-indigo-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-6 md:p-8 lg:p-10">
                <div className="bg-indigo-600 rounded-xl shadow-md p-8 md:p-10 lg:p-12">
                  <Layers size={48} color="#ffffff" />
                  <h3 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-4 md:mb-6 lg:mb-8">Scalable</h3>
                  <p className="text-lg md:text-xl lg:text-2xl text-indigo-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'technical' && (
          <div className="mb-12 md:mb-16 lg:mb-20">
            <div className="flex flex-wrap justify-center">
              <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-6 md:p-8 lg:p-10">
                <div className="bg-indigo-600 rounded-xl shadow-md p-8 md:p-10 lg:p-12">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-4 md:mb-6 lg:mb-8">Technical Specifications</h3>
                  <ul>
                    <li className="text-lg md:text-xl lg:text-2xl text-indigo-200 mb-4 md:mb-6 lg:mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                    <li className="text-lg md:text-xl lg:text-2xl text-indigo-200 mb-4 md:mb-6 lg:mb-8">Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</li>
                    <li className="text-lg md:text-xl lg:text-2xl text-indigo-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'support' && (
          <div className="mb-12 md:mb-16 lg:mb-20">
            <div className="flex flex-wrap justify-center">
              <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-6 md:p-8 lg:p-10">
                <div className="bg-indigo-600 rounded-xl shadow-md p-8 md:p-10 lg:p-12">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-4 md:mb-6 lg:mb-8">Support Options</h3>
                  <p className="text-lg md:text-xl lg:text-2xl text-indigo-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
                  <button
                    className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-xl shadow-md"
                    onClick={handleToggle}
                  >
                    {isOpen ? 'Close' : 'Learn More'}
                  </button>
                  {isOpen && (
                    <div className="mt-8 md:mt-10 lg:mt-12">
                      <p className="text-lg md:text-xl lg:text-2xl text-indigo-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BentoFeatures;