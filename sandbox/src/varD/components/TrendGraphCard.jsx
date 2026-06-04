import React from 'react';

export default function TrendGraphCard() {
  return (
    <section className="container mx-auto py-8">
      <div className="bg-zinc-700 py-4 px-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-zinc-50">Trend Graph</h2>
        <div className="h-64 bg-zinc-600 rounded-lg"></div>
        <button className="bg-green-400 hover:opacity-90 transition-all duration-200 cursor-pointer py-2 px-4 rounded-lg">View Details</button>
      </div>
    </section>
  );
}