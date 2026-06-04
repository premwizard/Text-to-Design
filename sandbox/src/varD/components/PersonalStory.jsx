import React from 'react';

export default function PersonalStory() {
  return (
    <section className="py-20 sm:py-24 md:py-28 lg:py-32 flex flex-col justify-center items-center">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800 text-center mb-8">My Story</h2>
      <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-neutral-800 text-center mb-8">I have always been passionate about creating unique and innovative designs. With years of experience in the industry, I have developed a keen eye for detail and a deep understanding of what makes a project truly special.</p>
      <button className="bg-rose-400 text-neutral-800 py-4 px-8 rounded-lg hover:opacity-90 transition-all duration-200 cursor-pointer mt-8">Learn More</button>
    </section>
  );
}