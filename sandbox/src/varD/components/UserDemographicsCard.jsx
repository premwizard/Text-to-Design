import React from 'react';

export default function UserDemographicsCard() {
  const demographics = [
    { name: 'Age 18-24', value: 20 },
    { name: 'Age 25-34', value: 30 },
    { name: 'Age 35-44', value: 25 },
    { name: 'Age 45-54', value: 15 },
    { name: 'Age 55+', value: 10 }
  ];

  return (
    <section className="container mx-auto py-8">
      <div className="bg-zinc-700 py-4 px-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-zinc-50">User Demographics</h2>
        <ul>
          {demographics.map((demographic) => (
            <li key={demographic.name} className="py-2 border-b border-zinc-600">
              <span className="text-zinc-50">{demographic.name}</span>
              <span className="text-zinc-50">{demographic.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}