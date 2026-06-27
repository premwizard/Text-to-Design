import React from 'react';
import { motion } from 'framer-motion';
import { Camera, MonitorSmartphone, Image, Webhook } from 'lucide-react';

const PortfolioGrid = () => {
  const portfolioItems = [
    {
      id: 1,
      title: 'Aura Creative Website Redesign',
      description: 'A complete overhaul of the Aura Creative brand identity and online presence.',
      image: 'https://via.placeholder.com/600x400/1e3a8a/ffffff?text=Aura+Creative+Site',
      tags: ['Web Design', 'Branding', 'UI/UX'],
      icon: <Webhook size={24} />,
    },
    {
      id: 2,
      title: 'E-commerce Mobile App UI',
      description: 'Intuitive and sleek user interface design for a new fashion e-commerce app.',
      image: 'https://via.placeholder.com/600x400/1e3a8a/ffffff?text=E-commerce+App',
      tags: ['Mobile App', 'UI Design', 'Prototyping'],
      icon: <MonitorSmartphone size={24} />,
    },
    {
      id: 3,
      title: 'Product Photography Series',
      description: 'High-quality product shots for a luxury watch brand.',
      image: 'https://via.placeholder.com/600x400/1e3a8a/ffffff?text=Product+Photography',
      tags: ['Photography', 'Commercial', 'Product'],
      icon: <Camera size={24} />,
    },
    {
      id: 4,
      title: 'Brand Identity for "Luxe Living"',
      description: 'Developing a sophisticated brand identity for a high-end real estate agency.',
      image: 'https://via.placeholder.com/600x400/1e3a8a/ffffff?text=Luxe+Living+Branding',
      tags: ['Branding', 'Logo Design', 'Marketing'],
      icon: <Image size={24} />,
    },
    {
      id: 5,
      title: 'SaaS Platform Dashboard',
      description: 'Designing a user-friendly and data-rich dashboard for a new SaaS product.',
      image: 'https://via.placeholder.com/600x400/1e3a8a/ffffff?text=SaaS+Dashboard',
      tags: ['Web Design', 'UI/UX', 'SaaS'],
      icon: <Webhook size={24} />,
    },
    {
      id: 6,
      title: 'Social Media Campaign Visuals',
      description: 'Creating engaging visual assets for a global marketing campaign.',
      image: 'https://via.placeholder.com/600x400/1e3a8a/ffffff?text=Social+Media+Visuals',
      tags: ['Graphic Design', 'Social Media', 'Marketing'],
      icon: <Image size={24} />,
    },
  ];

  return (
    <section className="bg-gray-900 text-gray-300 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-['Outfit', sans-serif]">Our Latest Work</h2>
          <p className="text-lg text-gray-400 font-['Inter'] max-w-2xl mx-auto">
            Explore a curated selection of our projects, showcasing our dedication to innovation and aesthetic excellence.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {portfolioItems.map((item) => (
            <motion.div
              key={item.id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-700 transform hover:-translate-y-2 transition-transform duration-300 ease-in-out"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70"></div>
                <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                  <span className="bg-indigo-600 p-2 rounded-full text-white shadow-lg">
                    {item.icon}
                  </span>
                  <span className="text-white text-lg font-bold font-['Outfit', sans-serif]">{item.title}</span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-400 font-['Inter'] mb-5 text-sm leading-relaxed">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-700 text-indigo-400 text-xs font-semibold px-3 py-1 rounded-full font-['Inter'] transition-colors duration-200 ease-in-out"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioGrid;