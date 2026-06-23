import React, { useState } from 'react';

export default function AccordionFeatures() {
  const [open, setOpen] = useState(false);

  return (
    <div className="container mx-auto p-12 pt-24 md:p-24 lg:px-32 xl:px-40">
      <h2 className="text-2xl lg:text-3xl font-bold text-zinc-100 mb-4">Features</h2>
      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start lg:space-x-8">
        <button className="bg-indigo-700 hover:opacity-90 transition-all duration-200 cursor-pointer py-2 px-4 text-zinc-100 rounded-lg lg:w-1/2" onClick={() => setOpen(!open)}>
          Advanced Security Features
        </button>
        {open && (
          <div className="lg:w-1/2 mt-4 lg:mt-0">
            <h3 className="text-xl text-zinc-100 font-bold mb-2">Encryption</h3>
            <p className="text-zinc-100">Kryptos uses advanced encryption methods to ensure your data is secure.</p>
          </div>
        )}
      </div>
    </div>
  );
}