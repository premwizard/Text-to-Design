import React from 'react';
import FeatureCard from './FeatureCard';
import { Lightbulb, Cloud, ShieldCheck, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const FeaturesSection = () => {
  const features = [
    {
      icon: Lightbulb,
      title: 'Creative Ideation',
      description: 'Spark new concepts with our intuitive brainstorming tools and collaborative platforms.',
      color: 'text-yellow-500',
      bg: 'bg-yellow-50',
    },
    {
      icon: Cloud,
      title: 'Seamless Deployment',
      description: 'Deploy your solutions effortlessly to the cloud with our integrated CI/CD pipelines.',
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    },
    {
      icon: ShieldCheck,
      title: 'Robust Security',
      description: 'Ensure your projects are protected with state-of-the-art security measures.',
      color: 'text-green-500',
      bg: 'bg-green-50',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Foster teamwork with real-time collaboration features and project management tools.',
      color: 'text-purple-500',
      bg: 'bg-purple-50',
    },
  ];

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold font-heading text-gray-900 mb-4">
            Unlock Your Potential with InnovateHub
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the powerful features designed to streamline your workflow and amplify your impact.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
              bg={feature.bg}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;