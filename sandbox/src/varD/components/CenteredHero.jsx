import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CenteredHero() {
  return (
    <div className="container mx-auto p-12 pt-24 md:p-24 lg:px-32 xl:px-40">
      <h1 className="text-3xl lg:text-5xl font-bold text-zinc-100 text-center">Kryptos</h1>
      <h2 className="text-xl lg:text-3xl text-zinc-100 text-center mt-4">Secure Your Future</h2>
      <button className="bg-indigo-700 hover:opacity-90 transition-all duration-200 cursor-pointer py-2 px-4 text-zinc-100 rounded-lg mt-8">Get Started {<ArrowRight size={20} />}</button>
    </div>
  );
}