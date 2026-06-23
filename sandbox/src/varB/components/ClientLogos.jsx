import React from 'react';

export default function ClientLogos() {
  const clients = [
    { name: 'Client 1', logo: 'https://picsum.photos/100/100' },
    { name: 'Client 2', logo: 'https://picsum.photos/101/101' },
    { name: 'Client 3', logo: 'https://picsum.photos/102/102' },
    { name: 'Client 4', logo: 'https://picsum.photos/103/103' },
    { name: 'Client 5', logo: 'https://picsum.photos/104/104' },
  ];

  return (
    <section className="relative py-12">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 xl:p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 xl:gap-10">
          {clients.map((client, index) => (
            <div key={index} className="bg-gray-900 rounded-3xl p-4 sm:p-6 lg:p-8 xl:p-10 hover:opacity-90 transition-all duration-200 cursor-pointer">
              <img src={client.logo} alt={client.name} className="w-full h-full object-cover rounded-3xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}