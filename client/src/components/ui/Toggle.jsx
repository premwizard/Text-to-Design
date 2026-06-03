import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function Toggle({ defaultChecked = false, onChange, className }) {
  const [isOn, setIsOn] = useState(defaultChecked);

  const toggleSwitch = () => {
    const newState = !isOn;
    setIsOn(newState);
    if (onChange) onChange(newState);
  };

  return (
    <div
      className={cn(
        "w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300",
        isOn ? "bg-violet-600 shadow-[0_0_10px_rgba(139,92,246,0.5)]" : "bg-zinc-800",
        className
      )}
      onClick={toggleSwitch}
    >
      <motion.div
        className="w-4 h-4 bg-white rounded-full shadow-md"
        layout
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 30
        }}
        initial={false}
        animate={{
          x: isOn ? 24 : 0
        }}
      />
    </div>
  );
}
