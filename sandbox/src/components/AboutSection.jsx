import React, { useState } from 'react';
import { Button } from 'react';
import { ArrowRight } from 'lucide-react-native';
import 'lucide-react-native';

const AboutSection = () => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-8 lg:px-12">
      <div className="flex flex-col items-center justify-center mb-12 text-center md:flex-row md:justify-between">
        <h2 className="mb-4 text-3xl font-bold text-zinc-200 md:mb-0 md:text-4xl md:mr-8">
          About Aura Creative
        </h2>
        <button
          className={`px-4 py-2 text-zinc-200 bg-zinc-600 rounded-md hover:bg-zinc-700 ${
            isActive ? 'bg-zinc-700' : 'bg-zinc-600'
          }`}
          onClick={handleToggle}
        >
          Read More
        </button>
      </div>
      {isActive && (
        <div className="mb-12 text-zinc-400">
          <p className="mb-4 text-lg">
            At Aura Creative, we are passionate about showcasing innovation and
            crafting brilliance. Our team of experts is dedicated to providing
            top-notch solutions that exceed our clients' expectations.
          </p>
          <p className="mb-4 text-lg">
            With a focus on minimal design and premium quality, we strive to
            deliver exceptional results that make a lasting impression. Our
            mission is to help businesses thrive in a competitive market by
            providing innovative solutions that drive growth and success.
          </p>
        </div>
      )}
      <div className="flex flex-col items-center justify-center mb-12 text-center md:flex-row md:justify-between">
        <h3 className="mb-4 text-2xl font-bold text-zinc-200 md:mb-0 md:text-3xl md:mr-8">
          Our Values
        </h3>
        <button
          className="px-4 py-2 text-zinc-200 bg-zinc-600 rounded-md hover:bg-zinc-700"
        >
          Learn More
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 mb-12 text-zinc-400 sm:grid-cols-2 md:grid-cols-3">
        <div className="flex flex-col items-center justify-center p-8 bg-zinc-800 rounded-md">
          <ArrowRight size={24} color="#fff" />
          <h4 className="mt-4 text-lg font-bold text-zinc-200">Innovation</h4>
          <p className="text-sm">
            We believe in pushing the boundaries of what is possible and
            exploring new ideas.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-8 bg-zinc-800 rounded-md">
          <ArrowRight size={24} color="#fff" />
          <h4 className="mt-4 text-lg font-bold text-zinc-200">Creativity</h4>
          <p className="text-sm">
            We encourage creativity and self-expression in everything we do.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-8 bg-zinc-800 rounded-md">
          <ArrowRight size={24} color="#fff" />
          <h4 className="mt-4 text-lg font-bold text-zinc-200">Excellence</h4>
          <p className="text-sm">
            We strive for excellence in every aspect of our work and never
            settle for mediocrity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;