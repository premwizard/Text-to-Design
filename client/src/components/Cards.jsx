import { motion } from 'framer-motion';
import Card from './Card';

function Cards({ items = [] }) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {items.map((item, index) => (
        <Card key={index} {...item} />
      ))}
    </motion.div>
  );
}

export default Cards;
