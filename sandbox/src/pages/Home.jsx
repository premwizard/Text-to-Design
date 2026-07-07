import React from 'react';

function Home() {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-24 lg:py-28">
      <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-zinc-900 mb-4 md:mb-6 lg:mb-8">
        Welcome to Veloce
      </h1>
      <p className="text-zinc-900 text-lg md:text-xl lg:text-2xl text-center mb-8 md:mb-10 lg:mb-12">
        Your premium shopping experience starts here
      </p>
    </div>
  );
}

export { Home };