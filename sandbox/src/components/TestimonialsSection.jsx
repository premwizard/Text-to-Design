import React from 'react';
import TestimonialCard from './TestimonialCard';
import { motion } from 'framer-motion';

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "InnovateHub transformed our concept into a market-ready product faster than we ever imagined. Their team's expertise is unparalleled.",
      name: "Alice Johnson",
      title: "CEO, TechSolutions Inc.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    },
    {
      quote: "The collaborative environment and cutting-edge tools provided by InnovateHub were crucial for our project's success. Highly recommended!",
      name: "Bob Williams",
      title: "Lead Developer, Creative Minds Co.",
      image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    },
    {
      quote: "From initial idea to final deployment, InnovateHub provided exceptional support and guidance. They are true partners in innovation.",
      name: "Carol Davis",
      title: "Product Manager, Future Forward Ltd.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    },
  ];

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold font-heading text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from satisfied innovators who have brought their visions to life with InnovateHub.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              title={testimonial.title}
              image={testimonial.image}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;