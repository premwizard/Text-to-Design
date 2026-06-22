import React, { useState } from 'react';

export default function InteractiveStats() {
  const [stats, setStats] = useState([
    { id: 1, title: 'Teams', value: 100 },
    { id: 2, title: 'Users', value: 1000 },
    { id: 3, title: 'Tasks', value: 10000 },
  ]);

  return (
    <section className="py-12 lg:py-24">
      <div className="container mx-auto flex flex-col justify-center items-center">
        <h2 className="text-3xl lg:text-5xl font-bold mb-8">Stats</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-zinc-800 p-8 rounded-lg hover:opacity-90 transition-all duration-200 cursor-pointer">
              <h3 className="text-lg font-bold mb-2">{stat.title}</h3>
              <p className="text-lg">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}