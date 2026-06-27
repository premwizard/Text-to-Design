import React, { useState } from 'react';
import { ArrowDown } from 'lucide-react-native';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <section className="relative bg-indigo-600 h-screen flex items-center justify-center">
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:px-20 xl:px-40">
        <div className="flex flex-wrap justify-center text-center">
          <h1 className="text-4xl lg:text-6xl font-bold font-inter text-white mb-4">
            NexaTech
          </h1>
          <p className="text-lg lg:text-2xl font-inter text-indigo-200 mb-8 w-full lg:w-1/2 mx-auto">
            Elevate Your Digital Horizon
          </p>
        </div>
        <div className="flex justify-center mb-4">
          <Link
            to="#"
            className="bg-indigo-700 hover:bg-indigo-800 text-white font-inter py-2 px-4 rounded-xl shadow-md transition duration-200"
          >
            Explore More
          </Link>
        </div>
        <div className="flex justify-center">
          <ArrowDown
            size={40}
            color="white"
            className="animate-bounce cursor-pointer"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;