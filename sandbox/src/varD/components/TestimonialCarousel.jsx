import React from 'react';

export default function TestimonialCarousel() {
  return (
    <div className="container mx-auto p-12 pt-24 md:p-24 lg:px-32 xl:px-40">
      <h2 className="text-2xl lg:text-3xl font-bold text-zinc-100 mb-4">What Our Customers Say</h2>
      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start lg:space-x-8">
        <div className="lg:w-1/2">
          <p className="text-zinc-100">Kryptos has been a game-changer for our company. The security features are top-notch and the support team is always available to help.</p>
          <h3 className="text-xl text-zinc-100 font-bold mt-2">- John Smith, CEO of XYZ Corporation</h3>
        </div>
        <div className="lg:w-1/2">
          <p className="text-zinc-100">We've been using Kryptos for a year now and it's been a seamless experience. The interface is user-friendly and the features are exactly what we need.</p>
          <h3 className="text-xl text-zinc-100 font-bold mt-2">- Jane Doe, CTO of ABC Inc.</h3>
        </div>
      </div>
    </div>
  );
}