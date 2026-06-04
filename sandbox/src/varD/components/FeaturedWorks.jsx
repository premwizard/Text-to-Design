import React, { useState } from 'react';

export default function FeaturedWorks() {
  const [active, setActive] = useState(0);
  const works = [
    { title: 'Project 1', description: 'This is a project', price: 1000 },
    { title: 'Project 2', description: 'This is another project', price: 2000 },
    { title: 'Project 3', description: 'This is the final project', price: 3000 },
  ];

  return (
    <section className="py-20 sm:py-24 md:py-28 lg:py-32">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800 text-center mb-8">Featured Works</h2>
      <div className="flex flex-col items-center">
        {works.map((work, index) => (
          <button key={index} onClick={() => setActive(index)} className={`py-4 px-8 rounded-lg ${active === index ? 'bg-rose-400 text-neutral-800' : 'bg-transparent text-neutral-800 hover:opacity-90'} transition-all duration-200 cursor-pointer mb-4`}>{work.title}</button>
        ))}
        <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-neutral-800 text-center mb-8">{works[active].description}</div>
        <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-rose-400 text-center mb-8">${works[active].price}</div>
      </div>
    </section>
  );
}