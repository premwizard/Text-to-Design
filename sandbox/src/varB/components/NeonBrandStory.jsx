import React from 'react';

export default function NeonBrandStory() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
      <h2 className="text-2xl font-bold text-gray-100">Our Story</h2>
      <p className="text-lg text-gray-100">Cybernetic Goods is a company dedicated to providing the best cybernetic enhancements to our customers. We have been in business for over 10 years and have a team of experts who are passionate about what they do.</p>
      <button className="bg-cyan-400 hover:opacity-90 transition-all duration-200 cursor-pointer py-2 px-4 rounded">Learn More</button>
    </div>
  );
}