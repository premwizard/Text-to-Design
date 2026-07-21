import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, ShieldCheck, Zap, Users } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      name: 'Cloud Sync',
      description: 'Real-time synchronization across all your devices, ensuring you always have the latest data.',
      icon: Cloud,
    },
    {
      name: 'Secure Integration',
      description: 'Bank-level encryption protects your data, providing peace of mind with every connection.',
      icon: ShieldCheck,
    },
    {
      name: 'Lightning Fast',
      description: 'Experience unparalleled speed and responsiveness, boosting your team\'s productivity.',
      icon: Zap,
    },
    {
      name: 'Team Collaboration',
      description: 'Enhance teamwork with shared workspaces and seamless communication tools.',
      icon: Users,
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
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-extrabold text-slate-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Powerful Features for Your Business
          </motion.h2>
          <motion.p
            className="text-lg text-slate-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover how ApexConnect streamlines your workflow and enhances productivity with its robust set of tools.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              variants={cardVariants}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-6 inline-block p-4 bg-indigo-100 rounded-full text-indigo-600">
                <feature.icon className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{feature.name}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;