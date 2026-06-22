import React from 'react';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80',
    alt: 'Creative Workspace',
    caption: 'Where inspiration meets technology.'
  },
  {
    src: 'https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80',
    alt: 'Design Collaboration',
    caption: 'Collaborate seamlessly with AI.'
  },
  {
    src: 'https://images.unsplash.com/photo-1515955656498-76a744447c55?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80',
    alt: 'Digital Art Creation',
    caption: 'Push the boundaries of digital art.'
  },
  {
    src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80',
    alt: 'UI/UX Design Process',
    caption: 'Streamlining the UX/UI journey.'
  }
];

export default function ImageGallery() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">See Artisan AI in Action</h2>
          <p className="text-lg md:text-xl text-gray-600">A glimpse into the creative possibilities unlocked by our platform.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryImages.map((image, index) => (
            <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <img 
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-lg font-semibold text-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {image.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}