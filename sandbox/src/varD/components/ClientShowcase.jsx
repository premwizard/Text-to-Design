import React from 'react';

export default function ClientShowcase() {
  return (
    <section className="relative bg-stone-950 py-20 lg:py-40">
      <div className="container mx-auto flex flex-col items-center justify-center text-stone-100">
        <h2 className="text-3xl font-bold">Clients</h2>
        <div className="flex flex-wrap justify-center mt-8">
          <div className="bg-stone-950 py-4 px-6 rounded-md mx-2 mb-4">
            <h3 className="text-2xl font-bold">Client 1</h3>
            <p className="text-lg text-stone-100 mt-2">Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="bg-stone-950 py-4 px-6 rounded-md mx-2 mb-4">
            <h3 className="text-2xl font-bold">Client 2</h3>
            <p className="text-lg text-stone-100 mt-2">Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
      </div>
    </section>
  );
}