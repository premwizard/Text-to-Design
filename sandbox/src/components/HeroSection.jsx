import React from 'react';
import { Plus } from 'lucide-react-native';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [isActive, setIsActive] = React.useState(false);

  const handleMouseOver = () => {
    setIsActive(true);
  };

  const handleMouseOut = () => {
    setIsActive(false);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-zinc-900">
      <div className="container mx-auto p-4 md:p-6 lg:p-8 flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-zinc-100 font-dm-sans">
          Vestia
        </h1>
        <p className="text-lg md:text-2xl lg:text-3xl text-zinc-400 font-dm-sans mt-4 md:mt-6 lg:mt-8">
          Elevate Your Style
        </p>
        <button
          className={`bg-zinc-600 hover:bg-zinc-700 text-zinc-100 font-dm-sans rounded-md py-2 md:py-3 lg:py-4 px-4 md:px-6 lg:px-8 mt-6 md:mt-8 lg:mt-10 ${
            isActive ? 'shadow-md' : 'shadow-none'
          }`}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <Plus size={20} className="mr-2" />
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default HeroSection;