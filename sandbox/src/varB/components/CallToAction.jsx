import React from 'react';
export default function CallToAction() {
  return (
    <div className="bg-emerald-500 text-white p-4 text-center rounded">
      <h2 className="text-3xl font-bold mb-4">Get Started Today!</h2>
      <p className="text-lg mb-8">Sign up for TravelEase and start exploring the world</p>
      <button className="bg-white hover:opacity-90 transition-all duration-200 cursor-pointer text-emerald-500 py-2 px-4 rounded">Sign Up</button>
    </div>
  );
}