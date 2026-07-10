import React from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { name: 'Features', link: '#features' },
    { name: 'How It Works', link: '#how-it-works' },
    { name: 'Testimonials', link: '#testimonials' },
    { name: 'Pricing', link: '#pricing' },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2"
        >
          <img src="https://via.placeholder.com/40x40/0000FF/FFFFFF?text=IH" alt="InnovateHub Logo" className="h-8 w-8 rounded-full" />
          <span className="text-2xl font-bold font-heading text-blue-600">InnovateHub</span>
        </motion.div>

        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              className="text-gray-700 hover:text-blue-600 transition duration-300 font-medium"
              whileHover={{ scale: 1.05, color: '#2563EB' }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {item.name}
            </motion.a>
          ))}
          <motion.button
            className="px-5 py-2 bg-blue-600 text-white rounded-md font-semibold shadow-md hover:bg-blue-700 transition duration-300"
            whileHover={{ scale: 1.05, boxShadow: '0px 5px 15px rgba(37, 99, 235, 0.4)' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
          >
            Sign Up
          </motion.button>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          className="md:hidden bg-white shadow-lg"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {navItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              className="block px-6 py-3 text-gray-700 hover:bg-blue-50 transition duration-300 font-medium"
              variants={itemVariants}
            >
              {item.name}
            </motion.a>
          ))}
          <motion.button
            className="block w-full px-6 py-3 bg-blue-600 text-white font-semibold text-center"
            variants={itemVariants}
            transition={{ delay: navItems.length * 0.1 }}
          >
            Sign Up
          </motion.button>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;