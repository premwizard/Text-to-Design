import React, { useState, useEffect, useRef } from 'react';

const StatItem = ({ endValue, label, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000; // 2 seconds
          const increment = endValue / (duration / 10);

          const timer = setInterval(() => {
            start += increment;
            if (start > endValue) {
              start = endValue;
              clearInterval(timer);
            }
            setCount(Math.ceil(start));
          }, 10);

          observer.disconnect(); // Stop observing once animated
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the item is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [endValue]);

  return (
    <div ref={ref} className="text-center p-6 bg-zinc-800 rounded-xl shadow-lg border border-zinc-700/50 hover:border-blue-500 transition-all duration-300">
      <p className="text-5xl font-bold text-blue-500 mb-2 h3">{prefix}{count.toLocaleString()}{suffix}</p>
      <p className="text-lg text-gray-300">{label}</p>
    </div>
  );
};

export default function AnimatedStats() {
  const stats = [
    { endValue: 120000000, label: 'Transactions Processed', suffix: '+' },
    { endValue: 50000, label: 'Active Merchants', suffix: '+' },
    { endValue: 150, label: 'Countries Supported', suffix: '+' },
    { endValue: 99.99, label: 'Uptime', suffix: '%', isDecimal: true },
  ];

  return (
    <section className="py-16 md:py-24 bg-zinc-900">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6">Our Impact in Numbers</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">See how ChronoPay is making a difference globally, one transaction at a time.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}