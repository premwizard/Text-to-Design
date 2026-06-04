import React from 'react';

export default function CustomerTestimonials() {
  const testimonials = [
    { id: 1, name: 'Emily R.', review: 'I recently purchased the Cozy Throw Blanket from Willow Creek Home and I am absolutely in love with it! The quality is top-notch and it adds such a warm touch to my living room.' },
    { id: 2, name: 'David K.', review: 'I have been searching for the perfect wooden decorative box for my office and I finally found it at Willow Creek Home. The craftsmanship is exceptional and it adds a touch of elegance to my space.' },
    { id: 3, name: 'Sarah K.', review: 'I purchased the Scented Candle Set from Willow Creek Home and it has become my new favorite thing. The fragrances are calming and the candles are made with high-quality ingredients.' }
  ];

  return (
    <div className="container mx-auto p-12 pt-12 md:p-24 lg:p-32 xl:p-40 flex flex-wrap justify-center">
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-200 cursor-pointer">
            <p className="text-lg md:text-2xl lg:text-3xl xl:text-4xl text-stone-700 mb-4">{testimonial.review}</p>
            <p className="text-lg md:text-2xl lg:text-3xl xl:text-4xl text-stone-700 mb-4">- {testimonial.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}