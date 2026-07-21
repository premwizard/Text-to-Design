import React from 'react';
import { motion } from 'framer-motion';

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "ApexConnect has revolutionized how we manage our projects. The integration is flawless, and the team's productivity has soared.",
      name: "Alice Johnson",
      title: "CEO, Innovate Solutions",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a39597a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    },
    {
      quote: "The seamless integration with our existing tools saved us countless hours. ApexConnect is a must-have for any growing business.",
      name: "Bob Williams",
      title: "CTO, TechForward Inc.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a701c71f286?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    },
    {
      quote: "Customer support is outstanding. Whenever we had a question, the ApexConnect team responded promptly and effectively.",
      name: "Carol Davis",
      title: "Operations Manager, Global Enterprises",
      avatar: "https://images.unsplash.com/photo-1500648767791-00495469ba51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-extrabold text-slate-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            className="text-lg text-slate-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Hear from businesses that have transformed their operations with ApexConnect.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-slate-50 rounded-xl shadow-lg p-8 text-center border border-gray-200"
              variants={cardVariants}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <p className="text-xl italic text-slate-700 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-indigo-500"
              />
              <h3 className="text-lg font-bold text-slate-900 mb-1">{testimonial.name}</h3>
              <p className="text-slate-500">{testimonial.title}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;