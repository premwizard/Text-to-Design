import React from 'react';

export default function InteractiveSkillsMap() {
  return (
    <section className="relative bg-stone-950 py-20 lg:py-40">
      <div className="container mx-auto flex flex-col items-center justify-center text-stone-100">
        <h2 className="text-3xl font-bold">Skills</h2>
        <div className="flex flex-wrap justify-center mt-8">
          <button className="bg-purple-500 hover:opacity-90 transition-all duration-200 cursor-pointer py-2 px-4 rounded-md mx-2 mb-4">Web Development</button>
          <button className="bg-purple-500 hover:opacity-90 transition-all duration-200 cursor-pointer py-2 px-4 rounded-md mx-2 mb-4">Digital Marketing</button>
          <button className="bg-purple-500 hover:opacity-90 transition-all duration-200 cursor-pointer py-2 px-4 rounded-md mx-2 mb-4">UX/UI Design</button>
        </div>
      </div>
    </section>
  );
}