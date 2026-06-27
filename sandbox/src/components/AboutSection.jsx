import React, { useState } from 'react';
import { Eye, Award, Lightbulb, ShieldCheck } from 'lucide-react';

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState('mission');

  const tabContent = {
    mission: {
      icon: <Lightbulb className="w-6 h-6 text-indigo-400 mb-2" />,
      title: "Our Mission",
      description: "To empower businesses with innovative and aesthetically pleasing digital solutions. We strive to translate your vision into a compelling online presence that resonates with your audience and drives growth."
    },
    vision: {
      icon: <Eye className="w-6 h-6 text-indigo-400 mb-2" />,
      title: "Our Vision",
      description: "To be a leading creative agency recognized for our cutting-edge design, exceptional user experiences, and unwavering commitment to client success. We aim to shape the future of digital interaction, one project at a time."
    },
    values: {
      icon: <Award className="w-6 h-6 text-indigo-400 mb-2" />,
      title: "Our Values",
      description: "Integrity, Creativity, Collaboration, Excellence, and Innovation are the cornerstones of Aura Creative. We foster a culture of continuous learning and push boundaries to deliver outstanding results."
    },
    assurance: {
      icon: <ShieldCheck className="w-6 h-6 text-indigo-400 mb-2" />,
      title: "Our Assurance",
      description: "We are committed to delivering high-quality, secure, and scalable digital products. Our rigorous quality assurance process ensures that every project meets the highest standards of performance and user satisfaction."
    }
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-gray-300 font-['Inter'] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black opacity-75"></div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight font-['Outfit', sans-serif]">
            Discover the <span className="text-indigo-400">Aura</span> Behind Our <span className="text-indigo-400">Creations</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto font-['Inter']">
            Learn more about our philosophy, what drives us, and how we bring digital dreams to life with passion and precision.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/3 lg:w-1/4">
            <div className="flex flex-col space-y-4">
              {Object.keys(tabContent).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`text-left p-4 rounded-xl transition-all duration-300 ease-in-out flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                    ${activeTab === key
                      ? 'bg-indigo-700 bg-opacity-30 text-indigo-300 shadow-lg shadow-indigo-700/30 border border-indigo-600'
                      : 'bg-gray-800 hover:bg-gray-700 hover:bg-opacity-50 text-gray-400'
                    }`}
                >
                  {tabContent[key].icon}
                  <span className="font-semibold text-lg font-['Outfit', sans-serif]">{tabContent[key].title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="md:w-2/3 lg:w-3/4 bg-gray-800 bg-opacity-50 p-8 sm:p-12 rounded-3xl shadow-xl border border-gray-700 backdrop-blur-sm">
            <div className="animate-fade-in">
              <h3 className="text-3xl font-bold text-white mb-4 flex items-center gap-3 font-['Outfit', sans-serif]">
                {tabContent[activeTab].icon}
                {tabContent[activeTab].title}
              </h3>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed font-['Inter']">
                {tabContent[activeTab].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;