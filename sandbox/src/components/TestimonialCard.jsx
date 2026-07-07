import React from 'react';

function TestimonialCard({ quote, image, name }) {
  return (
    <div className="w-full md:w-1/2 xl:w-1/3 p-4">
      <div className="bg-white rounded-md shadow-md p-4">
        <blockquote className="text-lg text-slate-900">
          {quote}
        </blockquote>
        <img src={image} alt="Testimonial Image" className="w-full h-64 object-cover" />
        <p className="text-lg text-slate-600">