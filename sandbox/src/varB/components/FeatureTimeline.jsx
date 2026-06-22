import React from 'react';
export default function FeatureTimeline() {
  const features = [
    { id: 1, title: 'Personalized Itineraries', description: 'Get customized travel plans based on your preferences' },
    { id: 2, title: 'Real-time Booking', description: 'Book flights, hotels, and activities in real-time' },
    { id: 3, title: 'Travel Community', description: 'Connect with fellow travelers and share experiences' }
  ];

  return (
    <div className="max-w-5xl mx-auto py-12">
      <h2 className="text-3xl font-bold mb-4">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature) => (
          <div key={feature.id} className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
            <p className="text-zinc-700">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}