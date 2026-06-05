import React from 'react';

export default function CustomerLogos() {
  const logos = [
    { src: 'https://cdn.svgporn.com/logos/google.svg', alt: 'Google' },
    { src: 'https://cdn.svgporn.com/logos/microsoft.svg', alt: 'Microsoft' },
    { src: 'https://cdn.svgporn.com/logos/amazon.svg', alt: 'Amazon' },
    { src: 'https://cdn.svgporn.com/logos/slack.svg', alt: 'Slack' },
    { src: 'https://cdn.svgporn.com/logos/stripe.svg', alt: 'Stripe' },
    { src: 'https://cdn.svgporn.com/logos/shopify.svg', alt: 'Shopify' },
    { src: 'https://cdn.svgporn.com/logos/notion.svg', alt: 'Notion' },
    { src: 'https://cdn.svgporn.com/logos/zoom.svg', alt: 'Zoom' },
  ];

  return (
    <section className="py-20 md:py-28 lg:py-36 bg-white/5 border-t border-b border-white/10 backdrop-blur-md relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute w-[400px] h-[400px] rounded-full bg-indigo-400 blur-[100px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-white mb-12">
          Trusted by Industry Leaders Worldwide
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-8 items-center justify-center">
          {logos.map((logo, index) => (
            <div key={index} className="flex justify-center items-center p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200 backdrop-blur-sm">
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-10 md:h-12 w-auto object-contain grayscale opacity-70 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}