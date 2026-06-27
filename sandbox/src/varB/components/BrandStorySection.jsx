import React from 'react';

export default function BrandStorySection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-['Playfair_Display'] text-center mb-16 md:mb-24 text-neutral-900">
          Our Story: The Soul of Atelier Noire
        </h2>

        {/* Section 1 */}
        <div className="flex flex-col md:flex-row items-center my-16 md:my-24 gap-10 lg:gap-20">
          <div className="w-full md:w-1/2 lg:w-3/5 overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1552590212-70b771e84605?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Elegant fabric draped, representing quality materials"
              className="w-full h-[500px] md:h-[650px] object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-2/5 px-4 text-center md:text-left">
            <h3 className="text-4xl font-['Playfair_Display'] text-neutral-900 mb-4">
              A Curated Vision
            </h3>
            <p className="text-lg leading-relaxed text-neutral-700 mb-6">
              Atelier Noire was born from a desire to celebrate the distinct voice of independent designers. We saw a need for a space where artistry, craftsmanship, and individuality converge, offering more than just clothing – but pieces that resonate with purpose and passion.
            </p>
            <p className="text-lg leading-relaxed text-neutral-700">
              Our platform is a meticulously curated collection, each item chosen for its unique design, exceptional quality, and the story it tells. We believe in building a connection between creator and wearer, fostering a community that values authenticity over trends.
            </p>
          </div>
        </div>

        {/* Section 2 (reversed) */}
        <div className="flex flex-col md:flex-row-reverse items-center my-16 md:my-24 gap-10 lg:gap-20">
          <div className="w-full md:w-1/2 lg:w-3/5 overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1628318451873-196d4218684d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Designer working with fabric and patterns in a studio"
              className="w-full h-[500px] md:h-[650px] object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-2/5 px-4 text-center md:text-left">
            <h3 className="text-4xl font-['Playfair_Display'] text-neutral-900 mb-4">
              The Art of Craftsmanship
            </h3>
            <p className="text-lg leading-relaxed text-neutral-700 mb-6">
              Every garment at Atelier Noire is a testament to meticulous craftsmanship. We champion designers who are dedicated to the highest standards of production, from the initial sketch to the final stitch. This dedication ensures not only beauty but also durability.
            </p>
            <p className="text-lg leading-relaxed text-neutral-700">
              We envision a world where fashion is cherished, not disposable. Our pieces are designed to become staples in your wardrobe, evolving with your personal style and enduring for years to come. Experience the difference that true artistry makes.
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-16 md:mt-24">
          <button className="px-10 py-4 bg-neutral-900 text-white text-lg tracking-wider uppercase font-medium
                             hover:opacity-90 transition-all duration-200 cursor-pointer">
            Discover Our Values
          </button>
        </div>
      </div>
    </section>
  );
}