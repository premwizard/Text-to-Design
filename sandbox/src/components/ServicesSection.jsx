import React, { useState } from 'react';
import { Camera, Code, Globe } from 'lucide-react-native';
import { Link } from 'react-router-dom';

const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState('webDevelopment');

  const tabs = [
    { id: 'webDevelopment', label: 'Web Development' },
    { id: 'mobileApp', label: 'Mobile App Development' },
    { id: 'digitalMarketing', label: 'Digital Marketing' },
  ];

  const services = {
    webDevelopment: [
      { id: 1, label: 'Custom Web Applications', description: 'We develop custom web applications with the latest technologies.' },
      { id: 2, label: 'E-commerce Solutions', description: 'We provide e-commerce solutions that drive sales and revenue.' },
      { id: 3, label: 'Web Maintenance', description: 'We offer web maintenance services to keep your website up-to-date and secure.' },
    ],
    mobileApp: [
      { id: 1, label: 'Native Mobile Apps', description: 'We develop native mobile apps for iOS and Android.' },
      { id: 2, label: 'Cross-Platform Apps', description: 'We develop cross-platform apps using React Native and Flutter.' },
      { id: 3, label: 'App Maintenance', description: 'We offer app maintenance services to keep your app up-to-date and secure.' },
    ],
    digitalMarketing: [
      { id: 1, label: 'SEO Services', description: 'We provide SEO services to improve your website\'s search engine ranking.' },
      { id: 2, label: 'Social Media Marketing', description: 'We offer social media marketing services to increase your online presence.' },
      { id: 3, label: 'Content Creation', description: 'We create high-quality content to engage your audience.' },
    ],
  };

  return (
    <section className="bg-zinc-600 py-20 md:py-24 lg:py-28">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-zinc-400 font-bold mb-8 md:mb-10 lg:mb-12 text-center">Our Services</h2>
        <div className="flex flex-wrap justify-center mb-8 md:mb-10 lg:mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 text-zinc-400 bg-zinc-600 hover:bg-zinc-700 rounded-md ${activeTab === tab.id ? 'bg-zinc-700' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {services[activeTab].map((service) => (
            <div
              key={service.id}
              className="bg-zinc-700 rounded-md p-4 md:p-6 lg:p-8 hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="text-2xl md:text-3xl lg:text-4xl text-zinc-400 font-bold mb-4 md:mb-6 lg:mb-8">{service.label}</h3>
              <p className="text-zinc-400 text-lg md:text-xl lg:text-2xl mb-4 md:mb-6 lg:mb-8">{service.description}</p>
              <Link
                to="#"
                className="flex items-center justify-center px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 text-zinc-400 bg-zinc-600 hover:bg-zinc-700 rounded-md"
              >
                Learn More <Camera size={20} className="ml-2" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;