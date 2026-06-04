import React from 'react';

export default function CustomerGallery() {
  const customers = [
    { id: 1, name: 'Emily Chen', review: 'I love AuraLuxe! The quality is amazing.', image: 'https://via.placeholder.com/100' },
    { id: 2, name: 'David Lee', review: 'The customer service is top notch. I will definitely be back.', image: 'https://via.placeholder.com/100' },
    { id: 3, name: 'Sophia Patel', review: 'The prices are so affordable and the products are beautiful.', image: 'https://via.placeholder.com/100' }
  ];

  return (
    <section className="py-20">
      <h2 className="text-4xl font-bold text-zinc-800 mb-4">What Our Customers Say</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {customers.map((customer) => (
          <div key={customer.id} className="flex flex-col justify-center items-center">
            <img src={customer.image} alt={customer.name} className="w-full h-48 object-cover mb-4" />
            <h3 className="text-2xl font-bold text-zinc-800 mb-2">{customer.name}</h3>
            <p className="text-lg text-zinc-800 mb-4">{customer.review}</p>
          </div>
        ))}
      </div>
    </section>
  );
}