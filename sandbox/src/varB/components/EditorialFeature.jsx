import React from 'react';

export default function EditorialFeature() {
  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-5xl md:text-6xl font-['Playfair_Display'] text-center mb-16 md:mb-24 text-neutral-900">
          The Art of Slow Fashion
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
          <div className="lg:col-span-1">
            <img
              src="https://images.unsplash.com/photo-1520627581691-10c7104b901a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Close-up of fabric texture and tailoring tools"
              className="w-full h-[550px] object-cover shadow-lg"
            />
          </div>
          <div className="lg:col-span-1 text-neutral-800">
            <p className="text-xl md:text-2xl font-['Playfair_Display'] text-neutral-900 mb-6 leading-relaxed">
              At Atelier Noire, we believe in the deliberate creation of garments that transcend seasons and trends.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Our commitment to slow fashion is a conscious choice to honor the craft, the artisan, and the longevity of each piece. We partner with independent designers who prioritize ethical production, sustainable materials, and impeccable quality, ensuring that every garment tells a story of integrity and passion.
            </p>
            <p className="text-lg leading-relaxed">
              This philosophy is woven into the very fabric of Atelier Noire, offering you a wardrobe that is not only beautiful but also meaningful. Invest in pieces that are made to last, designed to be cherished, and crafted with a purpose.
            </p>
          </div>
        </div>

        <div className="bg-neutral-900 text-white p-8 md:p-12 text-center my-16">
          <p className="text-2xl md:text-4xl font-['Playfair_Display'] italic leading-snug">
            "True luxury is in the provenance and preservation of beauty, thoughtfully made and deeply felt."
          </p>
          <span className="block mt-6 text-lg opacity-80">— Atelier Noire Philosophy</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-16">
          <div>
            <img
              src="https://images.unsplash.com/photo-1628173510255-b0b9a89d3110?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Designer sketching designs"
              className="w-full h-80 object-cover mb-6 shadow-md"
            />
            <h3 className="text-3xl font-['Playfair_Display'] text-neutral-900 mb-3">The Craft Behind the Garment</h3>
            <p className="text-md leading-relaxed text-neutral-700">
              Each Atelier Noire piece begins with a vision, carefully sketched and meticulously developed. Our designers dedicate countless hours to selecting the perfect textiles, refining patterns, and ensuring every stitch meets their exacting standards. It's a journey from concept to creation, marked by an unwavering commitment to excellence.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1502444330042-ed1228515754?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Fabric samples and color swatches"
              className="w-full h-80 object-cover mb-6 shadow-md"
            />
            <h3 className="text-3xl font-['Playfair_Display'] text-neutral-900 mb-3">Sustainable Choices, Beautiful Results</h3>
            <p className="text-md leading-relaxed text-neutral-700">
              From organic cottons to recycled silks, sustainability is at the forefront of our material selection. We seek out innovative textiles that minimize environmental impact without compromising on luxury or feel. This mindful approach ensures that your Atelier Noire purchase is not just an aesthetic pleasure, but a responsible one.
            </p>
          </div>
        </div>

        <div className="text-center mt-20">
          <button className="px-10 py-4 bg-neutral-900 text-white text-lg tracking-wider uppercase font-medium
                             hover:opacity-90 transition-all duration-200 cursor-pointer">
            Learn More About Our Values
          </button>
        </div>
      </div>
    </section>
  );
}