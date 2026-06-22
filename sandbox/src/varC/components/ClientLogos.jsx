import React from 'react';

const logos = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Expressen_logo.svg/1280px-Expressen_logo.svg.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Images_2015_logo.svg/1280px-Google_Images_2015_logo.svg.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Logo_New_York_Times.svg/1280px-Logo_New_York_Times.svg.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Logo_National_Geographic.svg/1280px-Logo_National_Geographic.svg.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Vogue_logo.svg/1280px-Vogue_logo.svg.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Wired_logo_%282019%29.svg/1280px-Wired_logo_%282019%29.svg.png'
];

export default function ClientLogos() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Trusted by Leading Creatives</h2>
          <p className="text-lg md:text-xl text-gray-600">Join a community of innovators shaping the future of design.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 place-items-center">
          {logos.map((logo, index) => (
            <div key={index} className="flex items-center justify-center p-4">
              <img 
                src={logo}
                alt={`Client Logo ${index + 1}`}
                className="h-12 w-auto filter grayscale hover:filter-none transition-all duration-300 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}