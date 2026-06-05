import React from 'react';

export default function TrustBadges() {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center py-12 md:py-20 lg:py-24">
      <div className="lg:w-1/2 md:px-8 xl:px-12 lg:px-16 flex flex-col items-center lg:items-start">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold">Trust Badges</h2>
        <p className="text-lg md:text-2xl lg:text-3xl mt-4 lg:mt-8">Trusted by thousands of customers.</p>
        <div className="flex space-x-4 mt-4 lg:mt-8">
          <img src="https://via.placeholder.com/100x50" alt="Trust Badge 1"/>
          <img src="https://via.placeholder.com/100x50" alt="Trust Badge 2"/>
          <img src="https://via.placeholder.com/100x50" alt="Trust Badge 3"/>
        </div>
      </div>
    </div>
  );
}