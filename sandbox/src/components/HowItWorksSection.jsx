import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Code, UploadCloud } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: FileText,
      title: 'Define Your Vision',
      description: 'Clearly articulate your project goals and requirements. We help you map out the strategy.',
      stepNumber: 1,
      color: 'text-blue-500',
      bg: 'bg-blue-100',
    },
    {
      icon: Code,
      title: 'Develop & Iterate',
      description: 'Our agile process ensures continuous development and feedback loops for optimal results.',
      stepNumber: 2,
      color: 'text-purple-500',
      bg: 'bg-purple-100',
    },
    {
      icon: UploadCloud,
      title: 'Launch & Scale',
      description: 'Deploy your solution with confidence and scale it to meet growing demands.',
      stepNumber: 3,
      color: 'text-green-500',
      bg: 'bg-green-100',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold font-heading text-gray-900 mb-4">
            How InnovateHub Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bringing your ideas to life is a straightforward process with our structured approach.
          </p>
        </motion.div>

        <motion.div
          className="relative grid grid-cols-1 md:grid-cols-3 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative p-8 rounded-xl bg-white shadow-lg flex flex-col items-center text-center"
              variants={itemVariants}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`rounded-full p-5 mb-6 ${step.bg} ${step.color} inline-flex items-center justify-center`}>
                <step.icon size={40} />
              </div>
              <h3 className="text-2xl font-bold font-heading text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
              <span className="absolute -top-4 -right-4 bg-gray-200 text-gray-700 font-bold rounded-full h-10 w-10 flex items-center justify-center text-lg">
                {step.stepNumber}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;